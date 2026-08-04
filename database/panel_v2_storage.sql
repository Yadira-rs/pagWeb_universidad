-- FECA CMS — Fase 3: mover el almacenamiento de archivos de Vercel Blob a
-- Supabase Storage.
--
-- Por qué: el sitio se va a hospedar en un servidor de la universidad (no
-- en Vercel), así que ya no conviene depender de un producto exclusivo de
-- Vercel (@vercel/blob) para guardar imágenes y documentos. Al mover todo
-- a Supabase Storage, el sitio queda con una sola infraestructura externa
-- (Supabase) sin importar en qué servidor corra el código.
--
-- Crea dos buckets:
--   - site-media: imágenes que suben desde el panel (anuncios, carrusel de
--     Inicio). Público, porque esas imágenes las ve cualquier visitante.
--   - egresados-docs: documentos que suben los egresados (CV, constancias,
--     fotos, testimonios). Privado — solo se descargan con una URL firmada
--     que genera el panel de administración, nunca son públicos.
--
-- También crea la tabla egresados_docs (reemplaza los archivos JSON sueltos
-- que antes se guardaban en Vercel Blob bajo egresados-docs/meta/*.json).

-- ─────────────────────────────────────────────
-- Buckets de Storage
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('egresados-docs', 'egresados-docs', false)
on conflict (id) do nothing;

-- site-media: solo alguien con sesión iniciada (el panel) puede subir,
-- reemplazar o borrar. La lectura es pública porque el bucket es público
-- (no necesita política de select: Supabase sirve /object/public/... sin
-- pasar por RLS en buckets públicos).
drop policy if exists site_media_admin_insert on storage.objects;
create policy site_media_admin_insert on storage.objects
    for insert
    with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists site_media_admin_update on storage.objects;
create policy site_media_admin_update on storage.objects
    for update
    using (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists site_media_admin_delete on storage.objects;
create policy site_media_admin_delete on storage.objects
    for delete
    using (bucket_id = 'site-media' and auth.role() = 'authenticated');

-- egresados-docs: cualquier visitante (sin sesión) puede subir su propio
-- documento, pero solo el panel (sesión iniciada) puede listar, descargar
-- o borrar — el bucket es privado, así que sin esta política nadie más
-- puede leer los archivos ni con la URL directa.
drop policy if exists egresados_docs_public_insert on storage.objects;
create policy egresados_docs_public_insert on storage.objects
    for insert
    with check (bucket_id = 'egresados-docs');

drop policy if exists egresados_docs_admin_select on storage.objects;
create policy egresados_docs_admin_select on storage.objects
    for select
    using (bucket_id = 'egresados-docs' and auth.role() = 'authenticated');

drop policy if exists egresados_docs_admin_delete on storage.objects;
create policy egresados_docs_admin_delete on storage.objects
    for delete
    using (bucket_id = 'egresados-docs' and auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Metadatos de documentos de egresados (reemplaza los .json en Blob)
-- ─────────────────────────────────────────────

create table if not exists egresados_docs (
    id bigint generated always as identity primary key,
    nombre varchar(200) not null,
    carrera varchar(200),
    generacion varchar(50),
    tipo varchar(100),
    file_path varchar(500) not null,
    file_name varchar(300) not null,
    created_at timestamptz not null default now()
);

alter table egresados_docs enable row level security;

-- Cualquier egresado puede registrar su documento sin iniciar sesión.
drop policy if exists egresados_docs_public_insert on egresados_docs;
create policy egresados_docs_public_insert on egresados_docs
    for insert
    to anon
    with check (true);

-- Solo el panel (sesión iniciada) puede ver y borrar los registros.
drop policy if exists egresados_docs_admin_all on egresados_docs;
create policy egresados_docs_admin_all on egresados_docs
    for all
    to authenticated
    using (true)
    with check (true);

create index if not exists idx_egresados_docs_created_at
    on egresados_docs (created_at desc);
