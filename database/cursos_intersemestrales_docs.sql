-- FECA CMS — Documentos de "Cursos Intersemestrales" (#/cursos-intersemestrales).
-- La tarjeta "Oferta Intersemestral" (materias, horarios y docentes del
-- periodo) enlazaba a un PDF fijo (/docs/CUSRSOS INTERSEMESTRALES.pdf) que
-- solo se podía reemplazar editando código. Cambia cada periodo, así que
-- ahora se puede subir/editar el documento desde el panel.
--
-- Mismo patrón que avisos_escolares / ciiedo_agenda: sin RLS ni GRANT,
-- porque en la arquitectura actual (services/pagweb-api sobre Postgres
-- propio) el control de acceso lo hace la API por Express, no Postgres —
-- ver database/admin_users.sql.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists cursos_intersemestrales_docs (
    id bigint generated always as identity primary key,
    titulo varchar(200) not null,
    descripcion varchar(500),
    boton_label varchar(80) not null default 'Descargar oferta',
    archivo_url varchar(500) not null,
    publicado boolean not null default true,
    orden integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_cursos_intersemestrales_docs_updated_at on cursos_intersemestrales_docs;
create trigger trg_cursos_intersemestrales_docs_updated_at before update on cursos_intersemestrales_docs
    for each row execute function set_updated_at();

create index if not exists idx_cursos_intersemestrales_docs_publicado_orden
    on cursos_intersemestrales_docs (publicado, orden);

-- No se insertan filas de ejemplo a propósito: mientras la tabla esté
-- vacía, la página sigue mostrando la tarjeta "Oferta Intersemestral" fija
-- (ver src/data/legacyPages.js), con el PDF que ya está en /docs, hasta
-- que alguien publique el documento actualizado desde el panel.
