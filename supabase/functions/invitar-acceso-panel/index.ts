// Edge Function: invitar-acceso-panel
//
// La llama el panel de administración (src/components/admin/AccesoManager.jsx)
// cuando alguien con sesión iniciada le da clic a "Aprobar" sobre una fila de
// `solicitudes_acceso_panel`. Crea la cuenta en Supabase Auth y le manda a la
// persona un correo de invitación con un enlace para elegir su propia
// contraseña — reemplaza el paso manual de crear el usuario en
// Supabase → Authentication → Users y compartirle una contraseña por fuera.
//
// Secretos necesarios además de los que Supabase inyecta solo
// (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY):
//   SITE_URL — origen público del sitio (ej. "https://feca.ujed.mx/"), para
//              que el enlace del correo caiga en la pantalla de
//              "elige tu contraseña" (#access_token=...&type=invite).
//              Configúralo con: supabase secrets set SITE_URL=https://...

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "http://localhost:5173/";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  // Quien llama debe tener sesión válida en el panel (cualquier admin puede
  // invitar a otro) — verificamos el token explícitamente en vez de confiar
  // solo en verify_jwt de la plataforma, para poder responder un mensaje
  // claro en vez de un 401 genérico.
  const authHeader = req.headers.get("Authorization") ?? "";
  const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: callerData, error: callerError } = await callerClient.auth.getUser();
  if (callerError || !callerData?.user) {
    return new Response(JSON.stringify({ error: "No autorizado." }), { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido." }), { status: 400 });
  }

  const correo = (body?.correo || "").toString().trim().toLowerCase();
  const nombre = (body?.nombre || "").toString().trim();

  if (!correo || !correo.endsWith("@ujed.mx")) {
    return new Response(
      JSON.stringify({ error: "Se requiere un correo institucional (@ujed.mx)." }),
      { status: 400 },
    );
  }

  // service_role key: nunca llega al navegador, solo vive aquí. Es lo que
  // permite crear cuentas de Auth sin que la persona invitada se autoregistre.
  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(correo, {
    data: nombre ? { nombre } : undefined,
    redirectTo: SITE_URL,
  });

  if (error) {
    const yaExiste = error.message?.toLowerCase().includes("already registered");
    return new Response(
      JSON.stringify({ error: yaExiste ? "Ya existe una cuenta con ese correo." : error.message }),
      { status: yaExiste ? 409 : 502 },
    );
  }

  return new Response(JSON.stringify({ ok: true, userId: data.user?.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
