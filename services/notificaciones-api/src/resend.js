const ESTRELLAS = ["", "Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

function htmlNuevaSolicitud(s) {
  return `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313; margin-bottom:4px;">Nueva solicitud de admisión</h2>
      <p style="margin:0 0 6px;"><strong>Nombre:</strong> ${s.nombre}</p>
      <p style="margin:0 0 6px;"><strong>Teléfono:</strong> ${s.telefono || "—"}</p>
      <p style="margin:0 0 6px;"><strong>Correo:</strong> ${s.correo || "—"}</p>
      <p style="margin:0 0 6px;"><strong>Programa:</strong> ${s.programa || "—"}</p>
      ${s.mensaje ? `<p style="margin:0 0 6px;"><strong>Mensaje:</strong><br>${s.mensaje}</p>` : ""}
    </div>
  `;
}

function htmlGenerico(tipo, datos) {
  return `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313;">Notificación: ${tipo}</h2>
      <pre style="white-space:pre-wrap; font-family: monospace; font-size: 13px;">${JSON.stringify(datos, null, 2)}</pre>
    </div>
  `;
}

const PLANTILLAS = {
  nueva_solicitud_admision: {
    subject: (datos) => `Nueva solicitud de admisión: ${datos.nombre}`,
    html: htmlNuevaSolicitud,
  },
};

// Envía el correo con Resend. Si no hay RESEND_API_KEY configurada, solo
// registra el aviso en consola — así el servicio se puede correr en la
// demo sin depender de que Resend esté disponible ese día.
export async function enviarNotificacion({ tipo, datos }) {
  const plantilla = PLANTILLAS[tipo];
  const subject = plantilla ? plantilla.subject(datos) : `Notificación: ${tipo}`;
  const html = plantilla ? plantilla.html(datos) : htmlGenerico(tipo, datos);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM;

  if (!apiKey || !to) {
    console.log(`[notificaciones-api] (modo consola) ${subject}`);
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
