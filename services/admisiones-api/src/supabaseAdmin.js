import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

// Node 20 no trae WebSocket global (llegó nativo hasta Node 22), y
// supabase-js siempre intenta inicializar su cliente de Realtime al
// crear el cliente aunque este servicio nunca lo use (solo hace
// select/insert/update/delete vía REST). Este polyfill evita que el
// proceso truene al arrancar en Node 20/21.
if (!globalThis.WebSocket) {
  globalThis.WebSocket = WebSocket;
}

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(url && serviceRoleKey);

if (!supabaseConfigured) {
  console.error(
    "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. Copia .env.example a .env y complétalo. " +
      "El servicio sigue arrancando para poder revisar /health, pero las rutas que tocan la base de datos van a fallar con 502."
  );
}

// Cliente con la service_role key: se salta RLS a propósito porque este
// código corre en un servidor de confianza (nunca en el navegador), y este
// servicio es el único dueño de la tabla solicitudes_admision. Si falta
// configuración usamos un placeholder solo para que el proceso no truene
// al arrancar; las llamadas reales fallarán igual y las rutas las
// convierten en un 502 explicativo en vez de tumbar el servicio entero.
export const supabaseAdmin = createClient(
  url || "https://placeholder.invalid",
  serviceRoleKey || "placeholder",
  { auth: { persistSession: false } }
);
