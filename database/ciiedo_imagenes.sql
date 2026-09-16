-- FECA CMS — Imágenes de CIIEDO (#/ciiedo): "Información institucional" y
-- "Calendarios y actividades". Son carteles/flyers de diseño gráfico que
-- CIIEDO reemplaza cada cuatrimestre (certificaciones, calendario del
-- periodo, etc.) — antes había que pedirle a alguien que reemplazara el
-- archivo en el código. Ahora se sube la imagen nueva desde el panel y
-- el sitio la toma en automático.
--
-- Dos filas fijas (slug 'institucional' y 'calendario'), identificadas por
-- slug — la página busca por ese nombre, no por posición/orden. Se
-- siembran con las imágenes que ya estaban escritas a mano en
-- CiiedoPage.jsx para que nada se rompa ni quede en blanco antes de que
-- CIIEDO suba las suyas desde el panel.
--
-- Sin RLS ni GRANT: en la arquitectura actual (services/pagweb-api sobre
-- Postgres propio) el control de acceso lo hace la API por Express, no
-- Postgres — ver database/admin_users.sql.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists ciiedo_imagenes (
    id bigint generated always as identity primary key,
    slug varchar(40) not null unique,
    titulo varchar(200) not null,
    imagen_url varchar(500) not null,
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_ciiedo_imagenes_updated_at on ciiedo_imagenes;
create trigger trg_ciiedo_imagenes_updated_at before update on ciiedo_imagenes
    for each row execute function set_updated_at();

insert into ciiedo_imagenes (slug, titulo, imagen_url)
select v.slug, v.titulo, v.imagen_url
from (
    values
        ('institucional', 'Información institucional', '/imagenes/CIIEDO.jpg'),
        ('calendario', 'Calendarios y actividades', '/imagenes/CIIEDO_calendario.jpeg')
) as v(slug, titulo, imagen_url)
where not exists (select 1 from ciiedo_imagenes where ciiedo_imagenes.slug = v.slug);
