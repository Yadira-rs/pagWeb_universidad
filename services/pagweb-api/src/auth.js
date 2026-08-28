import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { ah } from "./asyncHandler.js";
import { pool } from "./db.js";
import { enviarCorreoRecuperacion } from "./mailer.js";

const MAX_ATTEMPTS = Number(process.env.LOGIN_MAX_ATTEMPTS) || 5;
const LOCK_MINUTES = Number(process.env.LOGIN_LOCK_MINUTES) || 15;
const SESSION_MINUTES = Number(process.env.JWT_EXPIRES_MINUTES) || 480;
const RESET_MINUTES = 30;

function signSessionToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role, purpose: "session" },
    process.env.JWT_SECRET,
    { expiresIn: `${SESSION_MINUTES}m` }
  );
}

function toPublicUser(row) {
  return { id: row.id, email: row.email, display_name: row.display_name, role: row.role };
}

// Verifica el JWT de sesión (no uno de recuperación) y adjunta req.user.
// Mismo rol que cumplía requireAuth en admisiones-api, pero validando
// nuestro propio JWT en vez del que emitía Supabase Auth.
export function requireAuth(req, res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Falta el header Authorization: Bearer <token>." });
  }

  if (!process.env.JWT_SECRET) {
    console.error("Falta JWT_SECRET en el entorno del servicio.");
    return res.status(500).json({ error: "Servicio mal configurado." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.purpose !== "session") throw new Error("wrong_purpose");
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}

// Como requireAuth, pero nunca rechaza la petición: si no hay token o es
// inválido, sigue adelante sin req.user. Sirve para rutas de lectura que
// muestran más contenido (ej. borradores sin publicar) a quien tiene
// sesión, y una versión filtrada a quien no.
export function optionalAuth(req, _res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");
  if (scheme === "Bearer" && token && process.env.JWT_SECRET) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.purpose === "session") {
        req.user = { id: payload.sub, email: payload.email, role: payload.role };
      }
    } catch {
      // token inválido/expirado: se ignora, la petición sigue sin req.user.
    }
  }
  next();
}

export const authRouter = express.Router();

// Contrato: POST /api/auth/login
// Body: { email, password } → 200 { token, user } | 401 { error } | 423 { error } (cuenta bloqueada)
authRouter.post("/login", ah(async (req, res) => {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  const password = (req.body?.password || "").toString();
  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña son requeridos." });
  }

  const { rows } = await pool.query("select * from admin_users where email = $1", [email]);
  const user = rows[0];

  // Mismo mensaje genérico exista o no la cuenta, para no revelar qué
  // correos están dados de alta.
  const invalidCreds = () => res.status(401).json({ error: "Correo o contraseña incorrectos." });

  if (!user || !user.is_active) return invalidCreds();

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    const minutos = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
    return res.status(423).json({ error: `Cuenta bloqueada temporalmente. Intenta de nuevo en ${minutos} min.` });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    const attempts = user.failed_attempts + 1;
    const lock = attempts >= MAX_ATTEMPTS;
    await pool.query(
      `update admin_users set failed_attempts = $1, locked_until = $2 where id = $3`,
      [lock ? 0 : attempts, lock ? new Date(Date.now() + LOCK_MINUTES * 60000) : null, user.id]
    );
    return invalidCreds();
  }

  await pool.query(
    `update admin_users set failed_attempts = 0, locked_until = null, last_login_at = now() where id = $1`,
    [user.id]
  );

  res.json({ token: signSessionToken(user), user: toPublicUser(user) });
}));

// Contrato: GET /api/auth/session — Bearer JWT → 200 { user } | 401 { error }
authRouter.get("/session", requireAuth, ah(async (req, res) => {
  const { rows } = await pool.query("select * from admin_users where id = $1", [req.user.id]);
  if (!rows[0] || !rows[0].is_active) return res.status(401).json({ error: "Cuenta no disponible." });
  res.json({ user: toPublicUser(rows[0]) });
}));

// Contrato: POST /api/auth/logout — sin estado, siempre 204.
authRouter.post("/logout", (_req, res) => res.status(204).end());

// Contrato: POST /api/auth/forgot-password
// Body: { email } → siempre 200 { ok: true }, exista o no la cuenta (evita
// revelar qué correos están dados de alta). Si existe, manda un correo con
// un enlace #access_token=<jwt-de-recuperación>&type=recovery, mismo
// formato que usaba Supabase Auth, para no tener que tocar el router del
// frontend (App.jsx ya sabe reconocer esa forma de URL).
authRouter.post("/forgot-password", ah(async (req, res) => {
  const email = (req.body?.email || "").toString().trim().toLowerCase();
  if (!email) return res.status(400).json({ error: "El correo es requerido." });

  const { rows } = await pool.query("select * from admin_users where email = $1 and is_active", [email]);
  const user = rows[0];

  if (user) {
    const resetToken = jwt.sign(
      { sub: user.id, email: user.email, purpose: "password_reset" },
      process.env.JWT_SECRET,
      { expiresIn: `${RESET_MINUTES}m` }
    );
    const resetUrl = `${process.env.SITE_URL}/#access_token=${resetToken}&type=recovery`;
    try {
      await enviarCorreoRecuperacion({ to: user.email, resetUrl });
    } catch (err) {
      console.error("No se pudo enviar el correo de recuperación:", err.message);
    }
  }

  res.json({ ok: true });
}));

// Contrato: POST /api/auth/reset-password
// Body: { token, password } → 200 { ok: true } | 401 { error } (token
// inválido/expirado) | 400 { error } (contraseña muy corta)
authRouter.post("/reset-password", ah(async (req, res) => {
  const token = (req.body?.token || "").toString();
  const password = (req.body?.password || "").toString();
  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.purpose !== "password_reset") throw new Error("wrong_purpose");
  } catch {
    return res.status(401).json({ error: "El enlace de recuperación no es válido o ya expiró." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await pool.query(
    `update admin_users set password_hash = $1, failed_attempts = 0, locked_until = null where id = $2`,
    [passwordHash, payload.sub]
  );

  res.json({ ok: true });
}));
