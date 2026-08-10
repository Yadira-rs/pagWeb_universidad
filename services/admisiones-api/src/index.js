import "dotenv/config";
import cors from "cors";
import express from "express";
import { requireAuth } from "./auth.js";
import { notifyNuevaSolicitud } from "./notifyClient.js";
import { supabaseAdmin } from "./supabaseAdmin.js";

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
// Respuesta 502: { error } si Supabase no responde.
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

  const { data, error } = await supabaseAdmin
    .from("solicitudes_admision")
    .insert(solicitud)
    .select()
    .single();

  if (error) {
    console.error("Error al guardar solicitud:", error.message);
    return res.status(502).json({ error: "No se pudo guardar la solicitud." });
  }

  // Best effort: no bloquea ni condiciona la respuesta al visitante.
  const notifyResult = await notifyNuevaSolicitud(data);

  res.status(201).json({ ...data, notified: notifyResult.notified });
});

// Contrato: GET /api/solicitudes
// Protegido — requiere Authorization: Bearer <access_token de Supabase Auth>
// (la misma sesión que usa #/admin). Solo personal con cuenta puede listar.
// Respuesta 200: solicitud[]
app.get("/api/solicitudes", requireAuth, async (_req, res) => {
  const { data, error } = await supabaseAdmin
    .from("solicitudes_admision")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(502).json({ error: error.message });
  res.json(data);
});

// Contrato: PATCH /api/solicitudes/:id
// Protegido. Body: { atendida: boolean }
// Respuesta 200: solicitud actualizada.
app.patch("/api/solicitudes/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { atendida } = req.body || {};

  if (typeof atendida !== "boolean") {
    return res.status(400).json({ error: "El campo 'atendida' debe ser boolean." });
  }

  const { data, error } = await supabaseAdmin
    .from("solicitudes_admision")
    .update({ atendida })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(502).json({ error: error.message });
  res.json(data);
});

// Contrato: DELETE /api/solicitudes/:id
// Protegido. Respuesta 204 sin body.
app.delete("/api/solicitudes/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin.from("solicitudes_admision").delete().eq("id", id);

  if (error) return res.status(502).json({ error: error.message });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`admisiones-api escuchando en http://localhost:${PORT}`);
});
