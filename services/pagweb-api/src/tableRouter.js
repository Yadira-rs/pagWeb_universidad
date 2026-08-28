import express from "express";
import { ah } from "./asyncHandler.js";
import { optionalAuth, requireAuth } from "./auth.js";
import { pool } from "./db.js";

const passthrough = (_req, _res, next) => next();

// Fábrica de un router CRUD genérico por tabla — reemplaza tanto el CRUD
// automático que daba PostgREST como las políticas RLS que existían antes
// en Supabase (auth.role() = 'authenticated').
//
// `table`, `columns` y `orderBy` SIEMPRE vienen de la configuración fija
// de este archivo (nunca del request), así que interpolarlos directo en
// el SQL es seguro — lo único que llega parametrizado ($1, $2...) son los
// valores que manda quien usa la API.
//
// permissions.read: "public" (con publicFilter para quien no tiene
//   sesión; sin filtro para quien sí) | "auth" (solo con sesión).
// permissions.insert / update / delete: "public" | "auth".
// `afterInsert(row)`, si se da, corre DESPUÉS de responder al cliente y
// nunca puede tumbar la petición (mismo criterio "best effort" que ya
// usa services/admisiones-api al avisarle a Notificaciones API): sirve
// para reemplazar los Database Webhooks de Supabase con una llamada
// directa desde la propia ruta, sin bloquear la respuesta al visitante.
export function createTableRouter({ table, columns, orderBy, permissions, publicFilter, afterInsert }) {
  const router = express.Router();
  // perm puede ser "public", "auth", o un middleware propio (ej. para
  // restringir una operación a una sola cuenta — ver solicitudes_acceso_panel
  // en src/index.js).
  const guard = (perm) => {
    if (perm === "public") return passthrough;
    if (perm === "auth") return requireAuth;
    return [requireAuth, perm];
  };

  router.get("/", optionalAuth, ah(async (req, res) => {
    const isAdmin = !!req.user;
    if (!isAdmin && permissions.read !== "public") {
      return res.status(401).json({ error: "Se requiere sesión." });
    }

    // Filtros de igualdad opcionales por query string (equivalente al
    // .eq(columna, valor) del builder del frontend), solo sobre columnas
    // de la lista blanca de la tabla.
    const conditions = [];
    const values = [];
    if (!isAdmin && publicFilter) conditions.push(publicFilter);
    for (const col of columns) {
      if (req.query[col] !== undefined) {
        values.push(req.query[col]);
        conditions.push(`${col} = $${values.length}`);
      }
    }

    const where = conditions.length ? ` where ${conditions.join(" and ")}` : "";
    const order = orderBy ? ` order by ${orderBy}` : "";
    const { rows } = await pool.query(`select * from ${table}${where}${order}`, values);
    res.json(rows);
  }));

  router.post("/", guard(permissions.insert), async (req, res) => {
    const present = columns.filter((c) => req.body?.[c] !== undefined);
    if (present.length === 0) {
      return res.status(400).json({ error: "El body no trae ningún campo válido." });
    }
    const values = present.map((c) => req.body[c]);
    const placeholders = present.map((_, i) => `$${i + 1}`);
    const sql = `insert into ${table} (${present.join(", ")}) values (${placeholders.join(", ")}) returning *`;
    try {
      const { rows } = await pool.query(sql, values);
      res.status(201).json(rows[0]);
      if (afterInsert) {
        Promise.resolve(afterInsert(rows[0])).catch((err) =>
          console.error(`afterInsert de ${table} falló (no afecta al cliente):`, err.message)
        );
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.patch("/:id", guard(permissions.update), async (req, res) => {
    const present = columns.filter((c) => req.body?.[c] !== undefined);
    if (present.length === 0) {
      return res.status(400).json({ error: "El body no trae ningún campo válido." });
    }
    const values = present.map((c) => req.body[c]);
    const setClause = present.map((c, i) => `${c} = $${i + 1}`).join(", ");
    const sql = `update ${table} set ${setClause} where id = $${present.length + 1} returning *`;
    try {
      const { rows } = await pool.query(sql, [...values, req.params.id]);
      if (!rows[0]) return res.status(404).json({ error: "No encontrado." });
      res.json(rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete("/:id", guard(permissions.delete), ah(async (req, res) => {
    const { rowCount } = await pool.query(`delete from ${table} where id = $1`, [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "No encontrado." });
    res.status(204).end();
  }));

  return router;
}
