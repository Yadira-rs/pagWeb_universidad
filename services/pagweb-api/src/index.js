import "dotenv/config";
import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRouter, requireAuth } from "./auth.js";
import { pool } from "./db.js";
import { enviarAvisoOpinion, enviarCorreoInvitacion } from "./mailer.js";
import { createTableRouter } from "./tableRouter.js";
import { uploadsRouter } from "./uploads.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "pagweb-api", status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadsRouter);

// Anuncios/noticias (carrusel "Avisos y Eventos" del Inicio). Antes eran
// las políticas RLS anuncios_admin_all (auth.role()) y la lectura pública
// filtrada por `publicado = true`.
app.use(
  "/api/anuncios_noticias",
  createTableRouter({
    table: "anuncios_noticias",
    columns: ["tipo", "titulo", "resumen", "fecha_texto", "imagen_url", "cta_label", "cta_href", "publicado", "orden"],
    orderBy: "orden asc",
    permissions: { read: "public", insert: "auth", update: "auth", delete: "auth" },
    publicFilter: "publicado = true",
  })
);

// Solo el administrador principal puede aprobar/rechazar/borrar una
// solicitud de acceso (database/acceso_panel_admin_principal.sql). Los
// demás admins con sesión pueden verlas, pero no modificarlas — ver
// MAIN_ADMIN_EMAIL en src/components/admin/AccesoManager.jsx, que debe
// coincidir con este valor si se cambia.
const MAIN_ADMIN_EMAIL = "comunicacionsocial.feca@ujed.mx";
function requireMainAdmin(req, res, next) {
  if (req.user?.email !== MAIN_ADMIN_EMAIL) {
    return res.status(403).json({ error: "Solo el administrador principal puede hacer esto." });
  }
  next();
}

// Solicitudes de acceso al panel: cualquier visitante puede mandar una
// (formulario de AdminLoginPage); cualquier admin con sesión puede
// listarlas; solo el administrador principal puede aprobarlas/
// rechazarlas/borrarlas.
app.use(
  "/api/solicitudes_acceso_panel",
  createTableRouter({
    table: "solicitudes_acceso_panel",
    columns: ["nombre", "correo", "cargo", "area", "mensaje", "estado"],
    orderBy: "created_at desc",
    permissions: { read: "auth", insert: "public", update: requireMainAdmin, delete: requireMainAdmin },
  })
);

// Carrusel principal de Inicio. Antes: hero_slides_admin_all (auth.role())
// + lectura pública filtrada por is_active.
app.use(
  "/api/hero_slides",
  createTableRouter({
    table: "hero_slides",
    columns: [
      "image_url",
      "logo_url",
      "logo_alt",
      "logo_light_bg",
      "badge",
      "title_line_1",
      "title_line_2",
      "title_line_3",
      "description",
      "sort_order",
      "is_active",
    ],
    orderBy: "sort_order asc",
    permissions: { read: "public", insert: "auth", update: "auth", delete: "auth" },
    publicFilter: "is_active = true",
  })
);

// Testimonios (página de Egresados). Antes: testimonios_admin_all
// (auth.role()) + lectura pública filtrada por publicado.
app.use(
  "/api/testimonios",
  createTableRouter({
    table: "testimonios",
    columns: ["nombre", "generacion", "carrera", "foto_url", "testimonio", "publicado"],
    orderBy: "id desc",
    permissions: { read: "public", insert: "auth", update: "auth", delete: "auth" },
    publicFilter: "publicado = true",
  })
);

// Galería de fotos de Egresados. Antes: sin política propia (se agregó
// después de las 14 originales) — mismo patrón que hero_slides.
app.use(
  "/api/galeria_fotos",
  createTableRouter({
    table: "galeria_fotos",
    columns: ["imagen_url", "titulo", "sort_order", "is_active"],
    orderBy: "sort_order asc",
    permissions: { read: "public", insert: "auth", update: "auth", delete: "auth" },
    publicFilter: "is_active = true",
  })
);

// Opiniones (encuesta de satisfacción). Antes: inserción pública
// (db/migrations/003_grants.sql) + lectura solo con sesión
// (004_admin_panel_permisos.sql); nadie puede editar, solo borrar.
app.use(
  "/api/calificaciones",
  createTableRouter({
    table: "calificaciones",
    columns: ["puntuacion", "comentario", "seccion_id"],
    orderBy: "creado_en desc",
    permissions: { read: "auth", insert: "public", update: "auth", delete: "auth" },
    // Reemplaza al Database Webhook + Edge Function notify-satisfaccion.
    afterInsert: (row) => enviarAvisoOpinion({ puntuacion: row.puntuacion, comentario: row.comentario }),
  })
);

// Contrato: POST /api/admin-users/invite — Bearer JWT (cualquier admin
// puede invitar a otro). Body: { correo, nombre? }. Reemplaza a la Edge
// Function invitar-acceso-panel + Supabase Auth admin.inviteUserByEmail:
// crea la cuenta con una contraseña temporal inutilizable y manda un
// correo con el mismo tipo de enlace (#access_token=...&type=invite) que
// ya reconoce App.jsx, para elegir la contraseña real.
app.post("/api/admin-users/invite", requireAuth, async (req, res) => {
  const correo = (req.body?.correo || "").toString().trim().toLowerCase();
  const nombre = (req.body?.nombre || "").toString().trim();

  // Se acepta cualquier dominio: la aprobación real la hace una persona a
  // mano desde el panel, así que restringir a @ujed.mx solo estorbaba a
  // quien pedía acceso con un correo personal (ver
  // database/acceso_panel_admin_principal.sql, que también quitó el CHECK).
  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return res.status(400).json({ error: "Se requiere un correo electrónico válido." });
  }

  const placeholderHash = await bcrypt.hash(`invite:${Date.now()}:${Math.random()}`, 10);
  let user;
  try {
    const { rows } = await pool.query(
      `insert into admin_users (email, password_hash, display_name) values ($1, $2, $3) returning id, email`,
      [correo, placeholderHash, nombre || correo]
    );
    user = rows[0];
  } catch (err) {
    const yaExiste = err.code === "23505"; // unique_violation
    return res.status(yaExiste ? 409 : 502).json({ error: yaExiste ? "Ya existe una cuenta con ese correo." : err.message });
  }

  const inviteToken = jwt.sign(
    { sub: user.id, email: user.email, purpose: "password_reset" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const inviteUrl = `${process.env.SITE_URL}/#access_token=${inviteToken}&type=invite`;
  try {
    await enviarCorreoInvitacion({ to: user.email, nombre, inviteUrl });
  } catch (err) {
    console.error("No se pudo enviar el correo de invitación:", err.message);
  }

  res.json({ ok: true, userId: user.id });
});

// Noticias recientes (encontrado al migrar: usa el mismo patrón que
// anuncios_noticias, con su propia tabla noticias_recientes).
app.use(
  "/api/noticias_recientes",
  createTableRouter({
    table: "noticias_recientes",
    columns: ["badge", "fecha_texto", "categoria", "titulo", "resumen", "tipo", "cuerpo", "documento_url", "publicado", "orden"],
    orderBy: "orden asc",
    permissions: { read: "public", insert: "auth", update: "auth", delete: "auth" },
    publicFilter: "publicado = true",
  })
);

// Documentos de egresados: el CRUD queda listo, pero EgresadosDocsManager
// todavía no se cambia de import — depende de Supabase Storage, que se
// migra en el siguiente hito (src/lib/storageClient.js).
app.use(
  "/api/egresados_docs",
  createTableRouter({
    table: "egresados_docs",
    columns: ["nombre", "carrera", "generacion", "tipo", "file_path", "file_name"],
    orderBy: "created_at desc",
    permissions: { read: "auth", insert: "public", update: "auth", delete: "auth" },
  })
);

// Red de seguridad: cualquier error no atrapado en una ruta (ej. Postgres
// no responde por credenciales/host mal configurados) cae acá en vez de
// tumbar el proceso — antes de esto, un solo login con el .env sin
// terminar de llenar bastaba para que el servicio entero dejara de
// responder hasta reiniciarlo a mano.
app.use((err, _req, res, _next) => {
  console.error("Error no manejado:", err);
  res.status(502).json({ error: "El servicio tuvo un problema (revisa la conexión a la base de datos)." });
});

app.listen(PORT, () => {
  console.log(`pagweb-api escuchando en http://localhost:${PORT}`);
});
