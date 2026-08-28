// Llamadas a services/pagweb-api que no encajan en el patrón
// .from(tabla) genérico de dbClient.js (ver su README, sección
// "Recursos CRUD genéricos" vs. rutas propias como esta).
const API_URL = import.meta.env.VITE_PAGWEB_API_URL || "http://localhost:4000";

// Reemplaza a supabase.functions.invoke("invitar-acceso-panel", ...).
export async function invitarAccesoPanel({ correo, nombre }, token) {
  const res = await fetch(`${API_URL}/api/admin-users/invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ correo, nombre }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error || `Error ${res.status}`);
  return json;
}
