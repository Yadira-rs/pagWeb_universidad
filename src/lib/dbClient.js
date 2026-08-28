import { getToken } from "./authClient";

const API_URL = import.meta.env.VITE_PAGWEB_API_URL || "http://localhost:4000";

async function request(path, { method = "GET", body, query } = {}) {
  const url = new URL(`${API_URL}/api/${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  }

  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(url, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch (err) {
    return { data: null, error: { message: err.message || "No se pudo conectar con el servidor." } };
  }

  if (res.status === 204) return { data: null, error: null };

  const json = await res.json().catch(() => null);
  if (!res.ok) return { data: null, error: { message: json?.error || `Error ${res.status}` } };
  return { data: json, error: null };
}

// Mini query-builder que imita el subsecuente de supabase-js que usa este
// proyecto (.from().select()/.insert()/.update()/.delete().eq().order()),
// pero habla con nuestra API propia (services/pagweb-api) en vez de con
// Supabase/PostgREST. Es "thenable": se puede hacer
// `const { data, error } = await supabase.from(t).select()...` igual que
// antes, sin tener que reescribir cada componente que ya usa ese patrón.
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.method = "GET";
    this.query = {};
    this.body = undefined;
    this.id = undefined;
  }

  select() {
    this.method = "GET";
    return this;
  }

  insert(payload) {
    this.method = "POST";
    this.body = payload;
    return this;
  }

  update(payload) {
    this.method = "PATCH";
    this.body = payload;
    return this;
  }

  delete() {
    this.method = "DELETE";
    return this;
  }

  eq(column, value) {
    if (this.method === "PATCH" || this.method === "DELETE") {
      this.id = value;
    } else {
      this.query[column] = value;
    }
    return this;
  }

  order() {
    // El orden ya lo fija services/pagweb-api por tabla (ver src/index.js);
    // se acepta la llamada para no tener que tocar cada componente.
    return this;
  }

  single() {
    this._single = true;
    return this;
  }

  async _exec() {
    const path = this.id !== undefined ? `${this.table}/${this.id}` : this.table;
    const { data, error } = await request(path, { method: this.method, body: this.body, query: this.query });
    if (error) return { data: null, error };
    if (this._single && Array.isArray(data)) return { data: data[0] ?? null, error: null };
    return { data, error: null };
  }

  then(resolve, reject) {
    return this._exec().then(resolve, reject);
  }
}

export const supabase = {
  from(table) {
    return new QueryBuilder(table);
  },
};
