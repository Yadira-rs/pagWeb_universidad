// Edge Function: notify-satisfaccion
//
// Se llama desde un Database Webhook de Supabase (Database → Webhooks) cada
// vez que se inserta una fila en `calificaciones` (tabla ya existente,
// creada en db/migrations/001_initial_schema.sql). Supabase manda un
// POST con el payload estándar { type, table, record, schema, old_record }.
// Esta función toma ese `record` y manda un correo con Resend.
//
// Secretos necesarios (configurar con `supabase secrets set`):
//   RESEND_API_KEY  — API key de https://resend.com
//   NOTIFY_EMAIL    — correo que debe recibir el aviso (ej. el de la FECA)
//   NOTIFY_FROM     — remitente verificado en Resend
//                     (ej. "FECA <avisos@tu-dominio.mx>")

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");
const NOTIFY_FROM = Deno.env.get("NOTIFY_FROM") ?? "FECA Sitio Web <onboarding@resend.dev>";

const ESTRELLAS = ["", "Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.error("Faltan RESEND_API_KEY o NOTIFY_EMAIL como secretos de la función.");
    return new Response("Function not configured", { status: 500 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const record = payload?.record;
  if (!record) {
    return new Response("Missing record", { status: 400 });
  }

  const puntuacion = Number(record.puntuacion) || 0;
  const comentario = (record.comentario || "").toString().trim();

  const html = `
    <div style="font-family: Arial, sans-serif; color: #241f1d;">
      <h2 style="color:#e31313; margin-bottom:4px;">Nueva opinión sobre el sitio FECA</h2>
      <p style="margin:0 0 12px;">
        <strong>Calificación:</strong> ${puntuacion} / 5 (${ESTRELLAS[puntuacion] || "sin calificar"})
      </p>
      ${comentario
        ? `<p style="margin:0 0 12px;"><strong>Comentario:</strong><br>${comentario.replace(/\n/g, "<br>")}</p>`
        : `<p style="margin:0 0 12px; color:#8a7772;">Sin comentario.</p>`}
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_EMAIL],
      subject: `Nueva opinión del sitio (${puntuacion}/5)`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", res.status, detail);
    return new Response("Failed to send email", { status: 502 });
  }

  return new Response("ok", { status: 200 });
});
