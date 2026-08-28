// Envío de correo minimalista con Resend, mismo patrón de "modo consola"
// que ya usa services/notificaciones-api: si no hay RESEND_API_KEY, el
// correo solo se imprime en la consola del servicio, para poder probar
// sin depender de que Resend esté disponible. A diferencia de
// notificaciones-api (que siempre manda a una sola bandeja fija de
// staff), este envío va dirigido al correo de la propia persona admin,
// así que necesita su propio `to` por llamada.
export async function enviarCorreoRecuperacion({ to, resetUrl }) {
  const subject = "Recupera tu contraseña — Panel FECA";
  const html = `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313;">Recupera tu contraseña</h2>
      <p>Alguien (probablemente tú) pidió restablecer la contraseña del panel de administración FECA.</p>
      <p><a href="${resetUrl}">Haz clic aquí para elegir una contraseña nueva</a></p>
      <p style="color:#666; font-size:13px;">Si no fuiste tú, puedes ignorar este correo.</p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey) {
    console.log(`[pagweb-api] (modo consola) Enlace de recuperación para ${to}: ${resetUrl}`);
    return { sent: false, mode: "console" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend respondió ${res.status}: ${detail}`);
  }

  return { sent: true, mode: "email" };
}

// Reemplaza a la Edge Function invitar-acceso-panel: mismo enlace
// #access_token=...&type=invite que usaba Supabase Auth (App.jsx ya lo
// reconoce, junto con type=recovery, sin necesitar cambios).
export async function enviarCorreoInvitacion({ to, nombre, inviteUrl }) {
  const subject = "Te invitaron al panel de administración FECA";
  const html = `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313;">Te invitaron al panel FECA</h2>
      <p>${nombre ? `Hola ${nombre}, alguien` : "Alguien"} del equipo te dio acceso al panel de administración del sitio.</p>
      <p><a href="${inviteUrl}">Haz clic aquí para elegir tu contraseña y entrar</a></p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey) {
    console.log(`[pagweb-api] (modo consola) Enlace de invitación para ${to}: ${inviteUrl}`);
    return { sent: false, mode: "console" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });
  if (!res.ok) throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
  return { sent: true, mode: "email" };
}

const ESTRELLAS = ["", "Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

// Reemplaza al Database Webhook + Edge Function notify-satisfaccion: en
// vez de que Supabase le avise a una función aparte cuando se inserta en
// calificaciones, la propia ruta que hace el insert llama esto en el
// momento (ver afterInsert en src/index.js). Manda siempre a la misma
// bandeja de staff (NOTIFY_EMAIL), no a un correo por request.
export async function enviarAvisoOpinion({ puntuacion, comentario }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313; margin-bottom:4px;">Nueva opinión sobre el sitio FECA</h2>
      <p style="margin:0 0 12px;"><strong>Calificación:</strong> ${puntuacion} / 5 (${ESTRELLAS[puntuacion] || "sin calificar"})</p>
      ${comentario ? `<p style="margin:0 0 12px;"><strong>Comentario:</strong><br>${comentario.replace(/\n/g, "<br>")}</p>` : `<p style="margin:0 0 12px; color:#8a7772;">Sin comentario.</p>`}
    </div>
  `;

  if (!apiKey || !to) {
    console.log(`[pagweb-api] (modo consola) Nueva opinión: ${puntuacion}/5 — ${comentario || "sin comentario"}`);
    return { sent: false, mode: "console" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Nueva opinión del sitio (${puntuacion}/5)`, html }),
  });
  if (!res.ok) throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
  return { sent: true, mode: "email" };
}
