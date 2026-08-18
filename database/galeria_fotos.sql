-- FECA CMS — Galería "Momentos que enorgullecen" (sección "Así se vive" de
-- la página de Egresados, #/egresados). Antes las fotos vivían escritas a
-- mano en EgresadosPage.jsx (GALLERY); esta tabla las mueve a Supabase para
-- que se puedan subir/editar/borrar desde el panel, igual que el carrusel
-- de Inicio (hero_slides).
--
-- IMPORTANTE — "Automatically expose new tables" está desactivado en el
-- proyecto, así que además de las políticas RLS hace falta el GRANT
-- explícito de abajo. Sin él, las consultas fallan con "permission denied
-- for table" aunque la política ya lo permita.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists galeria_fotos (
    id bigint generated always as identity primary key,
    imagen_url varchar(500) not null,
    titulo varchar(200) not null,
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_galeria_fotos_updated_at on galeria_fotos;
create trigger trg_galeria_fotos_updated_at before update on galeria_fotos
    for each row execute function set_updated_at();

create index if not exists idx_galeria_fotos_active_orden
    on galeria_fotos (is_active, sort_order);

alter table galeria_fotos enable row level security;

-- Cualquier visitante puede leer las fotos activas.
drop policy if exists galeria_fotos_public_read on galeria_fotos;
create policy galeria_fotos_public_read on galeria_fotos
    for select
    using (is_active = true);

-- Solo alguien con sesión iniciada (el panel) puede crear, editar, borrar o
-- ver las fotos ocultas.
drop policy if exists galeria_fotos_admin_all on galeria_fotos;
create policy galeria_fotos_admin_all on galeria_fotos
    for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

grant usage on schema public to anon, authenticated;
grant select on galeria_fotos to anon, authenticated;
grant insert, update, delete on galeria_fotos to authenticated;
grant usage, select on galeria_fotos_id_seq to authenticated;

-- Las fotos de imágenes se suben al bucket "site-media" (ya creado por
-- database/panel_v2_storage.sql), igual que el carrusel de Inicio — no hace
-- falta ningún bucket nuevo.

-- Datos iniciales: las 8 fotos que hoy están escritas a mano en
-- EgresadosPage.jsx, para que la galería no se quede vacía en cuanto se
-- conecte a esta tabla. Bórralas o edítalas desde el panel cuando quieras.
insert into galeria_fotos (imagen_url, titulo, sort_order)
select v.imagen_url, v.titulo, v.sort_order
from (
    values
        ('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80', 'Ceremonias de graduación', 0),
        ('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=700&q=80', 'Generaciones FECA', 1),
        ('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=700&q=80', 'Entrega de reconocimientos', 2),
        ('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80', 'Momentos que se quedan', 3),
        ('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80', 'Lazos que trascienden', 4),
        ('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80', 'Celebrando logros', 5),
        ('https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=80', 'Familias FECA', 6),
        ('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80', 'Un nuevo comienzo', 7)
) as v(imagen_url, titulo, sort_order)
where not exists (select 1 from galeria_fotos);
