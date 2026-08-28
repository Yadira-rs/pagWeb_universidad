import "dotenv/config";
import cors from "cors";
import express from "express";
import { ah } from "./asyncHandler.js";
import { requireAuth } from "./auth.js";
import { pool } from "./db.js";
import { notifyNuevaSolicitud } from "./notifyClient.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Salud del servicio: útil para la demo (mostrar que responde) y para
// que Notificaciones API o cualquier monitor sepa si está vivo.
app.get("/health", (_req, res) => {
  res.json({ service: "admisiones-api", status: "ok" });
});

// Contrato: POST /api/solicitudes
// Público — lo llama el formulario "Inicia tu solicitud" del sitio, sin
// sesión iniciada (un aspirante no tiene cuenta).
// Body: { nombre: string (requerido), telefono?, correo?, programa?, mensaje? }
// Respuesta 201: { id, nombre, ..., created_at }
// Respuesta 400: { error } si falta "nombre".
// Respuesta 502: { error } si Postgres no responde.
app.post("/api/solicitudes", async (req, res) => {
  const nombre = (req.body?.nombre || "").toString().trim();
  if (!nombre) {
    return res.status(400).json({ error: "El campo 'nombre' es requerido." });
  }

  const solicitud = {
    nombre,
    telefono: req.body?.telefono?.toString().trim() || null,
    correo: req.body?.correo?.toString().trim() || null,
    programa: req.body?.programa?.toString() || null,
    mensaje: req.body?.mensaje?.toString().trim() || null,
  };

  let data;
  try {
    const { rows } = await pool.query(
      `insert into solicitudes_admision (nombre, telefono, correo, programa, mensaje)
       values ($1, $2, $3, $4, $5) returning *`,
      [solicitud.nombre, solicitud.telefono, solicitud.correo, solicitud.programa, solicitud.mensaje]
    );
    data = rows[0];
  } catch (err) {
    console.error("Error al guardar solicitud:", err.message);
    return res.status(502).json({ error: "No se pudo guardar la solicitud." });
  }

  // Best effort: no bloquea ni condiciona la respuesta al visitante.
  const notifyResult = await notifyNuevaSolicitud(data);

  res.status(201).json({ ...data, notified: notifyResult.notified });
});

// Contrato: GET /api/solicitudes
// Protegido — requiere Authorization: Bearer <token de sesión emitido por
// services/pagweb-api> (la misma sesión que usa #/admin). Solo personal
// con cuenta puede listar.
// Respuesta 200: solicitud[]
app.get("/api/solicitudes", requireAuth, ah(async (_req, res) => {
  const { rows } = await pool.query("select * from solicitudes_admision order by created_at desc");
  res.json(rows);
}));

// Contrato: PATCH /api/solicitudes/:id
// Protegido. Body: { atendida: boolean }
// Respuesta 200: solicitud actualizada.
app.patch("/api/solicitudes/:id", requireAuth, ah(async (req, res) => {
  const { id } = req.params;
  const { atendida } = req.body || {};

  if (typeof atendida !== "boolean") {
    return res.status(400).json({ error: "El campo 'atendida' debe ser boolean." });
  }

  const { rows } = await pool.query(
    "update solicitudes_admision set atendida = $1 where id = $2 returning *",
    [atendida, id]
  );
  if (!rows[0]) return res.status(404).json({ error: "No encontrada." });
  res.json(rows[0]);
}));

// Contrato: DELETE /api/solicitudes/:id
// Protegido. Respuesta 204 sin body.
app.delete("/api/solicitudes/:id", requireAuth, ah(async (req, res) => {
  const { rowCount } = await pool.query("delete from solicitudes_admision where id = $1", [req.params.id]);
  if (!rowCount) return res.status(404).json({ error: "No encontrada." });
  res.status(204).end();
}));

// Red de seguridad: cualquier error no atrapado en una ruta (ej. Postgres
// no responde) cae acá en vez de tumbar el proceso.
app.use((err, _req, res, _next) => {
  console.error("Error no manejado:", err);
  res.status(502).json({ error: "El servicio tuvo un problema (revisa la conexión a la base de datos)." });
});

app.listen(PORT, () => {
  console.log(`admisiones-api escuchando en http://localhost:${PORT}`);
});
