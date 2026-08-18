-- FECA CMS — Solicitudes de acceso al panel de administración
--
-- El login del panel (#/admin) usa Supabase Auth, y hoy la única forma de
-- dar de alta a un maestro o directivo es que alguien con acceso al
-- dashboard de Supabase le cree la cuenta a mano (ver database/README.md,
-- "Cómo dar de alta al administrador que va a usar el panel"). Esta tabla
-- agrega un formulario "Solicitar acceso" en la pantalla de login para que
-- un maestro o directivo capture sus datos directamente, en vez de tener
-- que pedirlo por fuera del sitio (correo, WhatsApp, etc.).
--
-- IMPORTANTE — llenar este formulario NO crea una cuenta ni da acceso al
-- panel, solo registra "aquí soy fulano y quiero acceso". No existe forma
-- de verificar solo con los datos de un formulario público que quien lo
-- llenó de verdad sea personal de la facultad y no, por ejemplo, un
-- alumno — así que la cuenta real la sigue creando a mano quien ya tiene
-- acceso al panel (pestaña "Solicitudes de acceso" dentro de #/admin, para
-- revisar y marcar como aprobada/rechazada), siguiendo el mismo
-- procedimiento ya documentado en database/README.md. Crear la cuenta
-- automáticamente requeriría la service_role key de Supabase, que nunca
-- debe vivir en el navegador.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Se acepta cualquier correo (no solo @ujed.mx): la aprobación real la
-- sigue haciendo una persona a mano (ver nota arriba), así que restringir
-- el dominio aquí solo estorbaba a quien pedía acceso desde un correo
-- personal.
create table if not exists solicitudes_acceso_panel (
    id bigint generated always as identity primary key,
    nombre varchar(200) not null,
    correo varchar(190) not null,
    cargo varchar(30) not null check (cargo in ('Docente', 'Directivo')),
    area varchar(150),
    mensaje text,
    estado varchar(20) not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_solicitudes_acceso_panel_updated_at on solicitudes_acceso_panel;
create trigger trg_solicitudes_acceso_panel_updated_at before update on solicitudes_acceso_panel
    for each row execute function set_updated_at();

create index if not exists idx_solicitudes_acceso_panel_created_at
    on solicitudes_acceso_panel (created_at desc);

alter table solicitudes_acceso_panel enable row level security;

-- Cualquier visitante puede enviar su solicitud (insert), pero no leerlas,
-- editarlas ni borrarlas — así nadie puede ver los correos de otros
-- solicitantes desde el navegador.
drop policy if exists solicitudes_acceso_panel_public_insert on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_public_insert on solicitudes_acceso_panel
    for insert
    with check (true);

-- Cualquiera con sesión iniciada en el panel puede VER la lista de
-- solicitudes...
drop policy if exists solicitudes_acceso_panel_admin_select on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_select on solicitudes_acceso_panel
    for select
    using (auth.role() = 'authenticated');

-- ...pero solo el administrador principal puede aprobar/rechazar o borrar
-- una solicitud. Para cambiar quién es el administrador principal, edita
-- el correo de abajo (en las dos políticas) y vuelve a correr este
-- archivo.
drop policy if exists solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel
    for update
    using (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx')
    with check (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx');

drop policy if exists solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel
    for delete
    using (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx');

-- "Automatically expose new tables" está desactivado a propósito en el
-- proyecto (más seguro), así que las políticas de RLS de arriba nunca se
-- llegan a evaluar sin este GRANT explícito: sin él, el rol "anon" (un
-- visitante sin sesión) no tiene ni siquiera permiso de tocar la tabla, y
-- el formulario público falla con "permission denied for table" aunque la
-- política de INSERT ya lo permita.
grant usage on schema public to anon, authenticated;
grant insert on solicitudes_acceso_panel to anon, authenticated;
grant select, update, delete on solicitudes_acceso_panel to authenticated;

-- El id es "generated always as identity" (usa una secuencia interna);
-- insertar una fila nueva requiere permiso sobre esa secuencia también,
-- no solo sobre la tabla.
grant usage, select on solicitudes_acceso_panel_id_seq to anon, authenticated;
