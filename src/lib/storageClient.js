import { getToken } from "./authClient";

const API_URL = import.meta.env.VITE_PAGWEB_API_URL || "http://localhost:4000";

function authHeaders(extra) {
  const token = getToken();
  return { ...extra, ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function parse(res) {
  if (res.status === 204) return { data: null, error: null };
  const json = await res.json().catch(() => null);
  if (!res.ok) return { data: null, error: { message: json?.error || `Error ${res.status}` } };
  return { data: json, error: null };
}

// Imita el subconjunto de supabase.storage que usa este proyecto
// (upload/getPublicUrl/remove/createSignedUrl), respaldado por
// services/pagweb-api/src/uploads.js (archivos en disco) en vez de
// Supabase Storage.
class BucketClient {
  constructor(bucket) {
    this.bucket = bucket;
  }

  async upload(path, file) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/uploads/${this.bucket}/${encodeURIComponent(path)}`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": file.type || "application/octet-stream" }),
        body: file,
      });
    } catch (err) {
      return { data: null, error: { message: err.message || "No se pudo subir el archivo." } };
    }
    return parse(res);
  }

  // Igual que en supabase-js: no hace ninguna llamada de red, solo arma la
  // URL — el backend construye la misma ruta al servir el bucket público
  // (ver uploadsRouter.use("/site-media", ...) en services/pagweb-api).
  getPublicUrl(path) {
    return { data: { publicUrl: `${API_URL}/api/uploads/${this.bucket}/${encodeURIComponent(path)}` } };
  }

  async remove(paths) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/uploads/${this.bucket}`, {
        method: "DELETE",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ paths }),
      });
    } catch (err) {
      return { data: null, error: { message: err.message || "No se pudo borrar el archivo." } };
    }
    return parse(res);
  }

  async createSignedUrl(path, expiresIn) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/uploads/${this.bucket}/${encodeURIComponent(path)}/sign`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ expiresIn }),
      });
    } catch (err) {
      return { data: null, error: { message: err.message || "No se pudo generar el enlace." } };
    }
    return parse(res);
  }
}

export const supabase = {
  storage: {
    from(bucket) {
      return new BucketClient(bucket);
    },
  },
};
