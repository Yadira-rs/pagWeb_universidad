-- FECA CMS — esquema completo (PostgreSQL, compatible con Supabase)
-- Cubre: administradores, medios, Inicio, Noticias, Directivos,
-- Grupos representativos y páginas institucionales/servicios/legacy.
-- Quedan fuera a propósito: Historia, Misión y Visión, Valores.

-- Función auxiliar: actualiza updated_at automáticamente en cada UPDATE.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─────────────────────────────────────────────
-- Administración y medios
-- ─────────────────────────────────────────────

create table admin_users (
    id bigint generated always as identity primary key,
    email varchar(190) not null unique,
    password_hash varchar(255) not null,
    display_name varchar(150) not null,
    role varchar(30) not null default 'admin',
    is_active boolean not null default true,
    failed_attempts smallint not null default 0,
    locked_until timestamptz,
    last_login_at timestamptz,
    created_at timestamptz not null default now()
);

create table media (
    id bigint generated always as identity primary key,
    file_path varchar(255) not null,
    original_filename varchar(255) not null,
    mime_type varchar(100) not null,
    size_bytes integer not null,
    width smallint,
    height smallint,
    alt_text varchar(255),
    uploaded_by bigint references admin_users(id) on delete set null,
    created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- Inicio
-- ─────────────────────────────────────────────

create table hero_slides (
    id bigint generated always as identity primary key,
    title_line_1 varchar(150),
    title_line_2 varchar(150),
    title_line_3 varchar(150),
    description varchar(400),
    badge varchar(60),
    image_media_id bigint references media(id) on delete set null,
    image_url varchar(255),
    logo_media_id bigint references media(id) on delete set null,
    logo_url varchar(255),
    logo_alt varchar(150),
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_hero_slides_updated_at before update on hero_slides
    for each row execute function set_updated_at();

create table programs (
    id bigint generated always as identity primary key,
    title varchar(150) not null,
    description varchar(500) not null,
    image_media_id bigint references media(id) on delete set null,
    image_url varchar(255),
    image_variant varchar(60),
    duration varchar(60),
    mode varchar(100),
    href varchar(255),
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_programs_updated_at before update on programs
    for each row execute function set_updated_at();

create table highlights (
    id bigint generated always as identity primary key,
    title varchar(150) not null,
    description varchar(500) not null,
    icon_key varchar(40) not null default 'graduation',
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_highlights_updated_at before update on highlights
    for each row execute function set_updated_at();

create table teachers (
    id bigint generated always as identity primary key,
    name varchar(150) not null,
    role varchar(150) not null,
    area varchar(150),
    enfoque varchar(150),
    description varchar(500),
    welcome_message text,
    image_media_id bigint references media(id) on delete set null,
    image_url varchar(255),
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_teachers_updated_at before update on teachers
    for each row execute function set_updated_at();

create table teacher_education (
    id bigint generated always as identity primary key,
    teacher_id bigint not null references teachers(id) on delete cascade,
    degree varchar(200) not null,
    institution varchar(150) not null,
    sort_order integer not null default 0
);

create table faq_items (
    id bigint generated always as identity primary key,
    question varchar(300) not null,
    answer text not null,
    page_key varchar(60) not null default 'home',
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_faq_items_updated_at before update on faq_items
    for each row execute function set_updated_at();

create table stats (
    id bigint generated always as identity primary key,
    target_value integer not null,
    format_key varchar(20) not null default 'plain'
        check (format_key in ('plus_es_mx', 'plus_prefix', 'percent', 'plain')),
    label varchar(100) not null,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_stats_updated_at before update on stats
    for each row execute function set_updated_at();

-- ─────────────────────────────────────────────
-- Noticias
-- Unifica: panel lateral de noticias, carrusel "Avisos y Eventos"
-- del Inicio, y la grilla de noticias — todo en una sola tabla.
-- ─────────────────────────────────────────────

create table news (
    id bigint generated always as identity primary key,
    badge varchar(40),
    category varchar(80),
    title varchar(300) not null,
    summary varchar(500),
    body text,
    event_label varchar(200),
    cta_label varchar(80),
    cta_href varchar(255),
    type varchar(20) not null default 'article' check (type in ('article', 'document')),
    image_media_id bigint references media(id) on delete set null,
    document_media_id bigint references media(id) on delete set null,
    published_at date not null default current_date,
    is_published boolean not null default true,
    show_on_home boolean not null default true,
    show_in_panel boolean not null default true,
    sort_order integer not null default 0,
    updated_by bigint references admin_users(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_news_updated_at before update on news
    for each row execute function set_updated_at();

-- ─────────────────────────────────────────────
-- Directivos
-- ─────────────────────────────────────────────

create table director_profiles (
    id bigint generated always as identity primary key,
    slug varchar(120) not null unique,
    name varchar(150) not null,
    role varchar(150) not null,
    role_label varchar(150),
    area varchar(150),
    enfoque varchar(150),
    quote text,
    image_media_id bigint references media(id) on delete set null,
    image_url varchar(255),
    bio_trajectory text,
    bio_focus text,
    bio_contact varchar(190),
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_director_profiles_updated_at before update on director_profiles
    for each row execute function set_updated_at();

create table director_degrees (
    id bigint generated always as identity primary key,
    director_profile_id bigint not null references director_profiles(id) on delete cascade,
    title varchar(200) not null,
    institution varchar(150) not null,
    sort_order integer not null default 0
);

-- ─────────────────────────────────────────────
-- Grupos representativos
-- ─────────────────────────────────────────────

create table representative_groups (
    id bigint generated always as identity primary key,
    categoria varchar(80) not null,
    nombre varchar(150) not null,
    apodo varchar(150),
    descripcion varchar(500),
    icono varchar(20),
    color varchar(20),
    gradient_start varchar(20),
    gradient_end varchar(20),
    miembros integer,
    logros varchar(255),
    contacto_email varchar(190),
    destacado boolean not null default false,
    nuevo boolean not null default false,
    sort_order integer not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_representative_groups_updated_at before update on representative_groups
    for each row execute function set_updated_at();

-- ─────────────────────────────────────────────
-- Páginas institucionales / servicios / legacy (esquema flexible)
-- Cubre organigrama, políticas, ejes rectores, marco normativo,
-- servicios (contraloría, finanzas, etc.) y las páginas heredadas
-- (licenciaturas, CELCI, campus, solicitud de admisión, etc.).
-- NO incluye historia, misión-visión ni valores (se excluyen a propósito).
-- ─────────────────────────────────────────────

create table pages (
    id bigint generated always as identity primary key,
    slug varchar(150) not null unique,
    route_group varchar(60),
    template varchar(60) not null,
    title varchar(200),
    hero_image_media_id bigint references media(id) on delete set null,
    hero_image_url varchar(255),
    content jsonb not null default '{}'::jsonb,
    is_published boolean not null default true,
    updated_by bigint references admin_users(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create trigger trg_pages_updated_at before update on pages
    for each row execute function set_updated_at();

-- Índices de apoyo para las consultas más comunes del sitio público.
create index idx_news_published on news (is_published, published_at desc);
create index idx_pages_published on pages (is_published);
create index idx_representative_groups_categoria on representative_groups (categoria);
