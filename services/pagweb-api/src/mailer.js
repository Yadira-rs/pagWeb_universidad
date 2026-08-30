// Envío de correo del panel FECA. Elige el transporte automáticamente
// según lo que haya en el .env, en este orden:
//
//   1. RESEND_API_KEY        → API HTTP de Resend. OJO: el plan gratis de
//      Resend solo deja mandar a la propia cuenta hasta verificar un
//      dominio con DNS, así que sin dominio propio no sirve para mandarle
//      el enlace a cada admin.
//   2. SMTP_HOST + SMTP_USER + SMTP_PASS → cualquier servidor SMTP
//      (Brevo, Gmail, correo institucional…). Es la opción recomendada
//      cuando el sitio no tiene dominio: Brevo (brevo.com) da 300
//      correos/día gratis y solo pide validar un remitente por clic, sin
//      tocar DNS.
//   3. Nada configurado     → "modo consola": el correo solo se imprime
//      en la consola del servicio (`pm2 logs pagweb-api`). Útil para
//      probar en desarrollo sin depender de un proveedor.
import nodemailer from "nodemailer";

let smtpTransport = null;
function getSmtpTransport() {
  if (smtpTransport) return smtpTransport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 587;
  smtpTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = TLS directo; 587/2525 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return smtpTransport;
}

// Remitente ("from"). Con Resend suele ser el sandbox onboarding@resend.dev;
// con SMTP debe ser el remitente que ya validaste en el proveedor.
function remitente() {
  return (
    process.env.MAIL_FROM ||
    process.env.RESEND_FROM ||
    process.env.SMTP_USER ||
    "FECA <no-reply@localhost>"
  );
}

// Manda un correo por el primer transporte disponible.
// `text` es lo que se imprime en modo consola (si no se pasa, se usa el html).
async function enviarCorreo({ to, subject, html, text }) {
  if (!to) {
    console.log(`[pagweb-api] (modo consola) Sin destinatario para "${subject}": ${text || ""}`);
    return { sent: false, mode: "console" };
  }

  const from = remitente();
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
    return { sent: true, mode: "resend" };
  }

  const smtp = getSmtpTransport();
  if (smtp) {
    await smtp.sendMail({ from, to, subject, html });
    return { sent: true, mode: "smtp" };
  }

  console.log(`[pagweb-api] (modo consola) ${text || `Correo para ${to}: ${subject}`}`);
  return { sent: false, mode: "console" };
}

export async function enviarCorreoRecuperacion({ to, resetUrl }) {
  return enviarCorreo({
    to,
    subject: "Recupera tu contraseña — Panel FECA",
    text: `Enlace de recuperación para ${to}: ${resetUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #241f1d;">
        <h2 style="color:#e31313;">Recupera tu contraseña</h2>
        <p>Alguien (probablemente tú) pidió restablecer la contraseña del panel de administración FECA.</p>
        <p><a href="${resetUrl}">Haz clic aquí para elegir una contraseña nueva</a></p>
        <p style="color:#666; font-size:13px;">Si no fuiste tú, puedes ignorar este correo. El enlace expira en 30 minutos.</p>
      </div>
    `,
  });
}

export async function enviarCorreoInvitacion({ to, nombre, inviteUrl }) {
  return enviarCorreo({
    to,
    subject: "Te invitaron al panel de administración FECA",
    text: `Enlace de invitación para ${to}: ${inviteUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #241f1d;">
        <h2 style="color:#e31313;">Te invitaron al panel FECA</h2>
        <p>${nombre ? `Hola ${nombre}, alguien` : "Alguien"} del equipo te dio acceso al panel de administración del sitio.</p>
        <p><a href="${inviteUrl}">Haz clic aquí para elegir tu contraseña y entrar</a></p>
      </div>
    `,
  });
}

const ESTRELLAS = ["", "Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

// Aviso a la bandeja de staff (NOTIFY_EMAIL) cada vez que alguien responde
// la encuesta de satisfacción. Lo llama afterInsert en src/index.js.
export async function enviarAvisoOpinion({ puntuacion, comentario }) {
  return enviarCorreo({
    to: process.env.NOTIFY_EMAIL,
    subject: `Nueva opinión del sitio (${puntuacion}/5)`,
    text: `Nueva opinión: ${puntuacion}/5 — ${comentario || "sin comentario"}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #241f1d;">
        <h2 style="color:#e31313; margin-bottom:4px;">Nueva opinión sobre el sitio FECA</h2>
        <p style="margin:0 0 12px;"><strong>Calificación:</strong> ${puntuacion} / 5 (${ESTRELLAS[puntuacion] || "sin calificar"})</p>
        ${
          comentario
            ? `<p style="margin:0 0 12px;"><strong>Comentario:</strong><br>${comentario.replace(/\n/g, "<br>")}</p>`
            : `<p style="margin:0 0 12px; color:#8a7772;">Sin comentario.</p>`
        }
      </div>
    `,
  });
}
