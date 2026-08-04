-- FECA CMS — Fase 2: Login + Panel de administración (v1)
-- Cubre solo lo que más cambia seguido: Anuncios/Noticias (carrusel "Avisos y
-- Eventos" del Inicio) y el carrusel principal del Inicio ("hero_slides").
-- El resto de las páginas se sigue editando directo desde el Table Editor
-- de Supabase por ahora (ver database/README.md).
--
-- Login: se usa Supabase Auth (auth.users), NO una tabla admin_users propia.
-- Supabase ya se encarga de encriptar contraseñas, manejar sesiones y el
-- flujo de "olvidé mi contraseña" por correo — así la persona que administre
-- el contenido no depende de que nosotros mantengamos ese código a mano.
--
-- Nota sobre `news` en schema.sql: esa tabla nunca llegó a usarse en
-- producción. El carrusel de anuncios ya se construyó apuntando a una tabla
-- `anuncios_noticias` con nombres de columna en español — este archivo la
-- formaliza (le agrega RLS, índices y el trigger de updated_at) en vez de
-- migrar todo a `news`, para no romper lo que ya está en vivo.

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─────────────────────────────────────────────
-- Anuncios y noticias (carrusel "Avisos y Eventos" del Inicio)
-- ─────────────────────────────────────────────

create table if not exists anuncios_noticias (
    id bigint generated always as identity primary key,
    tipo varchar(40) not null,
    titulo varchar(300) not null,
    resumen varchar(500),
    fecha_texto varchar(100),
    imagen_url varchar(500) not null,
    cta_label varchar(80),
    cta_href varchar(500),
    publicado boolean not null default true,
    orden integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_anuncios_noticias_updated_at on anuncios_noticias;
create trigger trg_anuncios_noticias_updated_at before update on anuncios_noticias
    for each row execute function set_updated_at();

create index if not exists idx_anuncios_publicado_orden
    on anuncios_noticias (publicado, orden);

alter table anuncios_noticias enable row level security;

-- Cualquier visitante del sitio puede leer los anuncios publicados.
drop policy if exists anuncios_public_read on anuncios_noticias;
create policy anuncios_public_read on anuncios_noticias
    for select
    using (publicado = true);

-- Solo alguien con sesión iniciada (Supabase Auth) puede crear, editar,
-- borrar o ver los anuncios que aún no están publicados (borradores).
drop policy if exists anuncios_admin_all on anuncios_noticias;
create policy anuncios_admin_all on anuncios_noticias
    for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Carrusel principal del Inicio
-- ─────────────────────────────────────────────

create table if not exists hero_slides (
    id bigint generated always as identity primary key,
    image_url varchar(500) not null,
    logo_url varchar(500),
    logo_alt varchar(200),
    logo_light_bg boolean not null default false,
    badge varchar(60),
    title_line_1 varchar(150),
    title_line_2 varchar(150),
    title_line_3 varchar(150),
    description varchar(400),
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_hero_slides_updated_at on hero_slides;
create trigger trg_hero_slides_updated_at before update on hero_slides
    for each row execute function set_updated_at();

create index if not exists idx_hero_slides_active_orden
    on hero_slides (is_active, sort_order);

alter table hero_slides enable row level security;

drop policy if exists hero_slides_public_read on hero_slides;
create policy hero_slides_public_read on hero_slides
    for select
    using (is_active = true);

drop policy if exists hero_slides_admin_all on hero_slides;
create policy hero_slides_admin_all on hero_slides
    for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Datos iniciales (los dos slides que hoy están escritos a mano en
-- HomePage.jsx), para que el sitio no se quede vacío en cuanto se conecte
-- a esta tabla. Bórralos o edítalos desde el panel cuando quieras.
-- ─────────────────────────────────────────────

insert into hero_slides (image_url, logo_url, logo_alt, logo_light_bg, sort_order)
select v.image_url, v.logo_url, v.logo_alt, v.logo_light_bg, v.sort_order
from (
    values
        ('/imagenes/inicio.png', '/imagenes/LOGO_FECA PNG.png', 'Logo FECA', true, 0),
        ('/imagenes/aniversario.jpeg', '/imagenes/logo-68-aniversario.png', 'Logo 68 aniversario FECA', false, 1)
) as v(image_url, logo_url, logo_alt, logo_light_bg, sort_order)
where not exists (select 1 from hero_slides);
