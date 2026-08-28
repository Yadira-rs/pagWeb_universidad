const API_URL = import.meta.env.VITE_PAGWEB_API_URL || "http://localhost:4000";
const STORAGE_KEY = "pagweb_token";

let currentToken = localStorage.getItem(STORAGE_KEY) || null;
const listeners = new Set();

function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function sessionFromToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  return { access_token: token, user: { id: payload.sub, email: payload.email } };
}

function setToken(token, { persist = true } = {}) {
  currentToken = token;
  if (persist) {
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  }
}

function notify(event, session) {
  for (const cb of listeners) cb(event, session);
}

export function getToken() {
  return currentToken;
}

async function request(path, body) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
    });
  } catch (err) {
    return { data: null, error: { message: err.message || "No se pudo conectar con el servidor." } };
  }
  const json = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) return { data: null, error: { message: json?.error || `Error ${res.status}` } };
  return { data: json, error: null };
}

// Detecta el enlace de recuperación (#access_token=...&type=recovery),
// mismo formato que usaba Supabase Auth — así App.jsx no necesita cambios
// para reconocer esa ruta. El token vive solo en memoria (no en
// localStorage): es de un solo uso y de corta duración.
function recoverySessionFromUrl() {
  const hash = window.location.hash || "";
  if (!hash.startsWith("#access_token=")) return null;
  const params = new URLSearchParams(hash.slice(1));
  const token = params.get("access_token");
  const type = params.get("type");
  if (!token || (type !== "recovery" && type !== "invite")) return null;
  return sessionFromToken(token);
}

let recoverySession = recoverySessionFromUrl();

async function getSession() {
  if (recoverySession) return { data: { session: recoverySession } };

  if (!currentToken) return { data: { session: null } };

  const res = await fetch(`${API_URL}/api/auth/session`, {
    headers: { Authorization: `Bearer ${currentToken}` },
  });
  if (!res.ok) {
    setToken(null);
    return { data: { session: null } };
  }
  return { data: { session: sessionFromToken(currentToken) } };
}

function onAuthStateChange(callback) {
  listeners.add(callback);
  return { data: { subscription: { unsubscribe: () => listeners.delete(callback) } } };
}

async function signInWithPassword({ email, password }) {
  const { data, error } = await request("login", { email, password });
  if (error) return { data: null, error };
  setToken(data.token);
  const session = sessionFromToken(data.token);
  notify("SIGNED_IN", session);
  return { data: { session, user: session.user }, error: null };
}

async function signOut() {
  recoverySession = null;
  setToken(null);
  notify("SIGNED_OUT", null);
  request("logout").catch(() => {});
  return { error: null };
}

async function resetPasswordForEmail(email) {
  const { error } = await request("forgot-password", { email });
  return { error };
}

async function updateUser({ password }) {
  const token = recoverySession?.access_token;
  if (!token) return { error: { message: "No hay una sesión de recuperación activa." } };
  const { error } = await request("reset-password", { token, password });
  if (!error) recoverySession = null;
  return { error };
}

export const supabase = {
  auth: {
    getSession,
    onAuthStateChange,
    signInWithPassword,
    signOut,
    resetPasswordForEmail,
    updateUser,
  },
};
