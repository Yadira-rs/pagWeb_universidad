-- Tabla de cuentas del panel de administración, para services/pagweb-api.
-- Reemplaza a Supabase Auth (auth.users). El diseño ya existía, sin usarse,
-- en database/schema.sql — este archivo solo lo aplica solo (create table
-- if not exists, seguro de correr más de una vez) para no depender de todo
-- el esquema de esa fase 1.

create table if not exists admin_users (
    id bigint generated always as identity primary key,
    email varchar(190) not null unique,
    password_hash varchar(255) not null,
    display_name varchar(150) not null,
    role varchar(30) not null default 'admin',
    is_active boolean not null default true,
    failed_attempts smallint not null default 0,
    locked_until timestamptz,
    last_login_at timestamptz,
    created_at timestamptz not null default now()
);

-- Sembrar la primera cuenta: usa `npm run seed-admin` dentro de
-- services/pagweb-api (genera el hash de la contraseña con bcrypt; no se
-- puede pegar una contraseña en texto plano aquí).
