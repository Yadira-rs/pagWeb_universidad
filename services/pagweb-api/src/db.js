import "dotenv/config";
import pg from "pg";

// Pool compartido por todo el servicio. Un solo lugar para configurar la
// conexión, igual que supabaseAdmin.js hacía con el cliente de Supabase.
export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
