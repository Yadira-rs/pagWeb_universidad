import "dotenv/config";
import pg from "pg";

// Mismo Postgres que services/pagweb-api (ver PGHOST/PGPORT/... en
// .env.example) — este servicio sigue siendo el único dueño de la tabla
// solicitudes_admision, pero ahora habla con Postgres directo en vez de
// hacerlo a través de Supabase con la service_role key.
export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
