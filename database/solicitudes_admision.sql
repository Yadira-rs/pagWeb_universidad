-- FECA CMS — Solicitudes de admisión
-- El formulario "Inicia tu solicitud" (#/solicitud) era solo una maqueta
-- visual: el botón "Enviar solicitud" no guardaba nada en ningún lado.
-- Este archivo crea la tabla donde ahora sí se guardan esas solicitudes.
--
-- No lleva RLS de "solo autenticado puede insertar" porque quien llena este
-- formulario es un visitante público (aspirante) sin sesión iniciada — por
-- eso se permite insert anónimo, pero NUNCA lectura anónima: nadie debe
-- poder ver los datos de contacto de otro aspirante desde el navegador.
-- Para revisar las solicitudes, quien administre el sitio entra al
-- Table Editor de Supabase con su cuenta (o, más adelante, una pestaña
-- nueva dentro de #/admin).

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists solicitudes_admision (
    id bigint generated always as identity primary key,
    nombre varchar(200) not null,
    telefono varchar(40),
    correo varchar(190),
    programa varchar(150),
    mensaje text,
    origen varchar(60) not null default 'solicitud',
    atendida boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_solicitudes_admision_updated_at on solicitudes_admision;
create trigger trg_solicitudes_admision_updated_at before update on solicitudes_admision
    for each row execute function set_updated_at();

create index if not exists idx_solicitudes_admision_created_at
    on solicitudes_admision (created_at desc);

alter table solicitudes_admision enable row level security;

-- Cualquier visitante puede enviar su solicitud (insert), pero no leerlas,
-- editarlas ni borrarlas.
drop policy if exists solicitudes_admision_public_insert on solicitudes_admision;
create policy solicitudes_admision_public_insert on solicitudes_admision
    for insert
    with check (true);

-- Solo alguien con sesión iniciada (Supabase Auth, el mismo login del
-- panel) puede ver, marcar como atendida o borrar solicitudes.
drop policy if exists solicitudes_admision_admin_manage on solicitudes_admision;
create policy solicitudes_admision_admin_manage on solicitudes_admision
    for select
    using (auth.role() = 'authenticated');

drop policy if exists solicitudes_admision_admin_update on solicitudes_admision;
create policy solicitudes_admision_admin_update on solicitudes_admision
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

drop policy if exists solicitudes_admision_admin_delete on solicitudes_admision;
create policy solicitudes_admision_admin_delete on solicitudes_admision
    for delete
    using (auth.role() = 'authenticated');
