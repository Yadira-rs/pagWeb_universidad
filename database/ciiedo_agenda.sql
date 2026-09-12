-- FECA CMS — Agenda/Calendario de CIIEDO (#/ciiedo).
-- Antes era una imagen fija (/imagenes/CIIEDO_calendario.jpeg) que solo se
-- podía actualizar pidiéndole a alguien que editara el código. Ahora el
-- CIIEDO puede publicar sus eventos, talleres y certificaciones desde el
-- panel, sin ayuda técnica.
--
-- Mismo patrón que avisos_escolares (database/avisos_escolares.sql): sin
-- RLS ni GRANT, porque en la arquitectura actual (services/pagweb-api
-- sobre Postgres propio) el control de acceso lo hace la API por
-- Express, no Postgres — ver database/admin_users.sql.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists ciiedo_agenda (
    id bigint generated always as identity primary key,
    tipo varchar(40) not null,
    titulo varchar(200) not null,
    fecha_texto varchar(100) not null,
    descripcion varchar(500),
    publicado boolean not null default true,
    orden integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_ciiedo_agenda_updated_at on ciiedo_agenda;
create trigger trg_ciiedo_agenda_updated_at before update on ciiedo_agenda
    for each row execute function set_updated_at();

create index if not exists idx_ciiedo_agenda_publicado_orden
    on ciiedo_agenda (publicado, orden);

-- No se insertan filas de ejemplo a propósito: mientras la tabla esté
-- vacía, la página de CIIEDO sigue mostrando la imagen fija de respaldo
-- (ver CiiedoPage.jsx), hasta que el CIIEDO publique su primer evento
-- real desde el panel.
