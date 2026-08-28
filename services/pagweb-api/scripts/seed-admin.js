// Crea (o actualiza la contraseña de) la primera cuenta de admin_users,
// para poder entrar al panel por primera vez sin depender de Supabase.
//
// Uso:
//   npm run seed-admin -- correo@ujed.mx "contraseña temporal" "Nombre visible"
import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../src/db.js";

const [, , email, password, displayName] = process.argv;

if (!email || !password) {
  console.error('Uso: npm run seed-admin -- correo@ujed.mx "contraseña" "Nombre visible"');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 10);

const { rows } = await pool.query(
  `insert into admin_users (email, password_hash, display_name)
   values ($1, $2, $3)
   on conflict (email) do update
     set password_hash = excluded.password_hash, is_active = true, failed_attempts = 0, locked_until = null
   returning id, email, display_name`,
  [email.trim().toLowerCase(), passwordHash, displayName || email]
);

console.log("Cuenta lista:", rows[0]);
await pool.end();
