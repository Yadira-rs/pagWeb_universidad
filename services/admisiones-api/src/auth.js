import jwt from "jsonwebtoken";

// Valida el JWT de sesión que emite services/pagweb-api cuando un admin
// inicia sesión en el panel (#/admin). Mismo JWT_SECRET que ese servicio
// (antes era SUPABASE_JWT_SECRET) — se verifica localmente en vez de
// llamarle a pagweb-api en cada request, para que este servicio siga
// funcionando aunque pagweb-api esté lento o caído en ese instante,
// siempre que el token todavía sea válido.
export function requireAuth(req, res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Falta el header Authorization: Bearer <token>." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Falta JWT_SECRET en el entorno del servicio.");
    return res.status(500).json({ error: "Servicio mal configurado." });
  }

  try {
    const payload = jwt.verify(token, secret);
    if (payload.purpose !== "session") throw new Error("wrong_purpose");
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}
