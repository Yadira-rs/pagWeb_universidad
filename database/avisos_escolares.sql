-- FECA CMS — Apartado "Avisos" de Servicios Escolares (#/servicios/servicios-escolares).
-- Se pidió que Control Escolar pueda publicar sin ayuda técnica:
--   - Fechas de periodo de inscripción
--   - Fechas de protocolos
--   - Fechas de exámenes ordinarios y extraordinarios
--
-- Sigue el mismo patrón que noticias_recientes (categoria + titulo +
-- fecha_texto libre + descripción opcional + publicado + orden), pero sin
-- imagen obligatoria. No lleva RLS ni GRANT: en la arquitectura actual
-- (services/pagweb-api sobre Postgres propio) el control de acceso lo hace
-- la API por Express, no Postgres — ver database/admin_users.sql.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists avisos_escolares (
    id bigint generated always as identity primary key,
    categoria varchar(60) not null,
    titulo varchar(200) not null,
    fecha_texto varchar(100) not null,
    descripcion varchar(500),
    publicado boolean not null default true,
    orden integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_avisos_escolares_updated_at on avisos_escolares;
create trigger trg_avisos_escolares_updated_at before update on avisos_escolares
    for each row execute function set_updated_at();

create index if not exists idx_avisos_escolares_publicado_orden
    on avisos_escolares (publicado, orden);

-- No se insertan filas de ejemplo a propósito: mientras la tabla esté
-- vacía, la sección "Avisos" de Servicios Escolares simplemente no se
-- muestra (igual que el carrusel de Inicio cuando no hay anuncios), hasta
-- que Control Escolar publique la primera fecha real desde el panel.
