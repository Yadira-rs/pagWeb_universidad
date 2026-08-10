import "dotenv/config";
import express from "express";
import { enviarNotificacion } from "./resend.js";
import { requireServiceToken } from "./serviceAuth.js";

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

// A propósito NO tiene middleware de CORS: este servicio solo debe
// recibir peticiones servidor-a-servidor (de admisiones-api), nunca
// directo desde un navegador. Sin cabecera Access-Control-Allow-Origin,
// cualquier intento de llamarlo con fetch() desde un sitio web es
// bloqueado por el navegador antes de llegar aquí — una capa extra de
// bajo acoplamiento con el frontend.
app.get("/health", (_req, res) => {
  res.json({ service: "notificaciones-api", status: "ok" });
});

// Contrato: POST /notificar
// Interno — requiere header X-Service-Token: <secreto compartido>.
// Body: { tipo: string, datos: object }
// Respuesta 200: { sent: boolean, mode: "email" | "console" }
// Respuesta 401: falta o es inválido el token de servicio.
// Respuesta 502: Resend rechazó el envío.
app.post("/notificar", requireServiceToken, async (req, res) => {
  const { tipo, datos } = req.body || {};

  if (!tipo || !datos) {
    return res.status(400).json({ error: "Se requieren 'tipo' y 'datos' en el body." });
  }

  try {
    const result = await enviarNotificacion({ tipo, datos });
    res.json(result);
  } catch (err) {
    console.error("Error al enviar notificación:", err.message);
    res.status(502).json({ error: "No se pudo enviar la notificación." });
  }
});

app.listen(PORT, () => {
  console.log(`notificaciones-api escuchando en http://localhost:${PORT}`);
});
