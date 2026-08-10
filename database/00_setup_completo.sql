-- FECA CMS — Script único para dejar el panel de administración
-- completamente funcional, sin importar qué tanto de los otros archivos
-- .sql ya se haya corrido antes.
--
-- Por qué existe: el proyecto de Supabase tiene desactivado
-- "Automatically expose new tables" (más seguro), así que cada tabla que se
-- crea por SQL Editor necesita, además de sus políticas RLS, un GRANT
-- explícito — si falta, las consultas fallan con "permission denied for
-- table" aunque la política ya lo permita. Varias tablas del panel se
-- fueron creando en sesiones distintas y algunas se quedaron sin ese paso.
--
-- Este archivo es seguro de correr las veces que sea: usa "if not exists",
-- "drop policy if exists" y "on conflict do nothing" en todo, así que no
-- rompe nada que ya esté bien configurado.
--
-- Cubre las 8 tablas que usa el panel (#/admin):
--   anuncios_noticias, noticias_recientes, hero_slides, egresados_docs,
--   testimonios, solicitudes_admision, calificaciones,
--   solicitudes_acceso_panel
-- más los buckets de Storage (site-media, egresados-docs).

grant usage on schema public to anon, authenticated;

-- ─────────────────────────────────────────────
-- anuncios_noticias (pestaña "Anuncios y noticias")
-- ─────────────────────────────────────────────
alter table anuncios_noticias enable row level security;

drop policy if exists anuncios_public_read on anuncios_noticias;
create policy anuncios_public_read on anuncios_noticias
    for select using (publicado = true);

drop policy if exists anuncios_admin_all on anuncios_noticias;
create policy anuncios_admin_all on anuncios_noticias
    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select on anuncios_noticias to anon, authenticated;
grant insert, update, delete on anuncios_noticias to authenticated;
grant usage, select on anuncios_noticias_id_seq to authenticated;

-- ─────────────────────────────────────────────
-- hero_slides (pestaña "Carrusel de Inicio")
-- ─────────────────────────────────────────────
alter table hero_slides enable row level security;

drop policy if exists hero_slides_public_read on hero_slides;
create policy hero_slides_public_read on hero_slides
    for select using (is_active = true);

drop policy if exists hero_slides_admin_all on hero_slides;
create policy hero_slides_admin_all on hero_slides
    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select on hero_slides to anon, authenticated;
grant insert, update, delete on hero_slides to authenticated;
grant usage, select on hero_slides_id_seq to authenticated;

-- ─────────────────────────────────────────────
-- egresados_docs (pestaña "Documentos de egresados") + Storage
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('egresados-docs', 'egresados-docs', false)
on conflict (id) do nothing;

drop policy if exists site_media_admin_insert on storage.objects;
create policy site_media_admin_insert on storage.objects
    for insert with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists site_media_admin_update on storage.objects;
create policy site_media_admin_update on storage.objects
    for update using (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists site_media_admin_delete on storage.objects;
create policy site_media_admin_delete on storage.objects
    for delete using (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists egresados_docs_public_insert on storage.objects;
create policy egresados_docs_public_insert on storage.objects
    for insert with check (bucket_id = 'egresados-docs');

drop policy if exists egresados_docs_admin_select on storage.objects;
create policy egresados_docs_admin_select on storage.objects
    for select using (bucket_id = 'egresados-docs' and auth.role() = 'authenticated');

drop policy if exists egresados_docs_admin_delete on storage.objects;
create policy egresados_docs_admin_delete on storage.objects
    for delete using (bucket_id = 'egresados-docs' and auth.role() = 'authenticated');

alter table egresados_docs enable row level security;

drop policy if exists egresados_docs_public_insert on egresados_docs;
create policy egresados_docs_public_insert on egresados_docs
    for insert to anon with check (true);

drop policy if exists egresados_docs_admin_all on egresados_docs;
create policy egresados_docs_admin_all on egresados_docs
    for all to authenticated using (true) with check (true);

grant insert on egresados_docs to anon, authenticated;
grant select, update, delete on egresados_docs to authenticated;
grant usage, select on egresados_docs_id_seq to anon, authenticated;

-- ─────────────────────────────────────────────
-- solicitudes_admision (pestaña "Solicitudes de admisión")
-- ─────────────────────────────────────────────
alter table solicitudes_admision enable row level security;

drop policy if exists solicitudes_admision_public_insert on solicitudes_admision;
create policy solicitudes_admision_public_insert on solicitudes_admision
    for insert with check (true);

drop policy if exists solicitudes_admision_admin_manage on solicitudes_admision;
create policy solicitudes_admision_admin_manage on solicitudes_admision
    for select using (auth.role() = 'authenticated');

drop policy if exists solicitudes_admision_admin_update on solicitudes_admision;
create policy solicitudes_admision_admin_update on solicitudes_admision
    for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists solicitudes_admision_admin_delete on solicitudes_admision;
create policy solicitudes_admision_admin_delete on solicitudes_admision
    for delete using (auth.role() = 'authenticated');

grant insert on solicitudes_admision to anon, authenticated;
grant select, update, delete on solicitudes_admision to authenticated;
grant usage, select on solicitudes_admision_id_seq to anon, authenticated;

-- ─────────────────────────────────────────────
-- solicitudes_acceso_panel (pestaña "Solicitudes de acceso")
-- ─────────────────────────────────────────────
alter table solicitudes_acceso_panel enable row level security;

drop policy if exists solicitudes_acceso_panel_public_insert on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_public_insert on solicitudes_acceso_panel
    for insert with check (true);

drop policy if exists solicitudes_acceso_panel_admin_select on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_select on solicitudes_acceso_panel
    for select using (auth.role() = 'authenticated');

drop policy if exists solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel
    for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel
    for delete using (auth.role() = 'authenticated');

grant insert on solicitudes_acceso_panel to anon, authenticated;
grant select, update, delete on solicitudes_acceso_panel to authenticated;
grant usage, select on solicitudes_acceso_panel_id_seq to anon, authenticated;

-- ─────────────────────────────────────────────
-- testimonios (pestaña "Testimonios") — tabla ya existente, solo se
-- refuerzan políticas y permisos por si se creó desde el Table Editor
-- sin RLS o sin grant.
-- ─────────────────────────────────────────────
alter table testimonios enable row level security;

drop policy if exists testimonios_public_read on testimonios;
create policy testimonios_public_read on testimonios
    for select using (publicado = true);

drop policy if exists testimonios_admin_all on testimonios;
create policy testimonios_admin_all on testimonios
    for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select on testimonios to anon, authenticated;
grant insert, update, delete on testimonios to authenticated;
grant usage, select on testimonios_id_seq to authenticated;

-- ─────────────────────────────────────────────
-- calificaciones (pestaña "Opiniones del sitio") — cualquier visitante
-- puede enviar su calificación desde el sitio (SatisfactionWidget), solo
-- el panel puede verlas y borrarlas.
-- ─────────────────────────────────────────────
alter table calificaciones enable row level security;

drop policy if exists calificaciones_public_insert on calificaciones;
create policy calificaciones_public_insert on calificaciones
    for insert with check (true);

drop policy if exists calificaciones_admin_select on calificaciones;
create policy calificaciones_admin_select on calificaciones
    for select using (auth.role() = 'authenticated');

drop policy if exists calificaciones_admin_delete on calificaciones;
create policy calificaciones_admin_delete on calificaciones
    for delete using (auth.role() = 'authenticated');

grant insert on calificaciones to anon, authenticated;
grant select, delete on calificaciones to authenticated;
grant usage, select on calificaciones_id_seq to anon, authenticated;
