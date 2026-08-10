// Cliente del microservicio Admisiones API (services/admisiones-api).
// A diferencia de supabaseClient.js (que habla directo con Supabase), este
// servicio es código propio del equipo: expone su propio contrato HTTP
// documentado en services/admisiones-api/README.md.
const BASE_URL = import.meta.env.VITE_ADMISIONES_API_URL || "http://localhost:4001";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Admisiones API respondió ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // sin body JSON, se usa el mensaje genérico
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function crearSolicitud(solicitud) {
  return request("/api/solicitudes", { method: "POST", body: solicitud });
}

export function listarSolicitudes(token) {
  return request("/api/solicitudes", { token });
}

export function actualizarSolicitud(id, cambios, token) {
  return request(`/api/solicitudes/${id}`, { method: "PATCH", body: cambios, token });
}

export function borrarSolicitud(id, token) {
  return request(`/api/solicitudes/${id}`, { method: "DELETE", token });
}
