// Cliente hacia el servicio de Notificaciones (segundo microservicio).
// Deliberadamente "best effort": si Notificaciones no responde o está
// caído, la solicitud de admisión YA se guardó en la base de datos antes
// de llegar aquí, así que una falla de notificación no debe tirar la
// petición del visitante. Esto es lo que demuestra que Admisiones API
// sigue funcionando (con una degradación explicable) cuando Notificaciones
// no está disponible.
export async function notifyNuevaSolicitud(solicitud) {
  const url = process.env.NOTIFICACIONES_API_URL;
  const serviceToken = process.env.SERVICE_TOKEN;

  if (!url || !serviceToken) {
    console.warn("NOTIFICACIONES_API_URL o SERVICE_TOKEN no configurados; se omite la notificación.");
    return { notified: false, reason: "not_configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${url}/notificar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Service-Token": serviceToken,
      },
      body: JSON.stringify({
        tipo: "nueva_solicitud_admision",
        datos: solicitud,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.warn(`Notificaciones API respondió ${res.status}; la solicitud igual quedó guardada.`);
      return { notified: false, reason: `http_${res.status}` };
    }

    return { notified: true };
  } catch (err) {
    console.warn("No se pudo contactar a Notificaciones API; la solicitud igual quedó guardada.", err.message);
    return { notified: false, reason: "unreachable" };
  } finally {
    clearTimeout(timeout);
  }
}
