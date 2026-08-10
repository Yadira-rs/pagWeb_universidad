-- FECA CMS — Panel "Últimas noticias" (la ventana emergente del botón de
-- notificaciones, distinta del carrusel "Avisos y Eventos" que ya maneja
-- anuncios_noticias). Antes esta lista vivía escrita a mano en App.jsx;
-- esta tabla la mueve a Supabase para que se pueda editar desde el panel.
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

create table if not exists noticias_recientes (
    id bigint generated always as identity primary key,
    badge varchar(40),
    fecha_texto varchar(60) not null,
    categoria varchar(60) not null,
    titulo varchar(300) not null,
    resumen varchar(500) not null,
    tipo varchar(20) not null default 'article' check (tipo in ('article', 'document')),
    cuerpo text not null,
    documento_url varchar(500),
    publicado boolean not null default true,
    orden integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

drop trigger if exists trg_noticias_recientes_updated_at on noticias_recientes;
create trigger trg_noticias_recientes_updated_at before update on noticias_recientes
    for each row execute function set_updated_at();

create index if not exists idx_noticias_recientes_publicado_orden
    on noticias_recientes (publicado, orden);

alter table noticias_recientes enable row level security;

-- Cualquier visitante puede leer las noticias publicadas.
drop policy if exists noticias_recientes_public_read on noticias_recientes;
create policy noticias_recientes_public_read on noticias_recientes
    for select
    using (publicado = true);

-- Solo alguien con sesión iniciada (el panel) puede crear, editar, borrar o
-- ver los borradores no publicados.
drop policy if exists noticias_recientes_admin_all on noticias_recientes;
create policy noticias_recientes_admin_all on noticias_recientes
    for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

grant usage on schema public to anon, authenticated;
grant select on noticias_recientes to anon, authenticated;
grant insert, update, delete on noticias_recientes to authenticated;
grant usage, select on noticias_recientes_id_seq to authenticated;

-- Datos iniciales: las 4 noticias que hoy están escritas a mano en
-- App.jsx, para que el panel no se quede vacío en cuanto se conecte a
-- esta tabla. Bórralas o edítalas desde el panel cuando quieras.
insert into noticias_recientes (badge, fecha_texto, categoria, titulo, resumen, tipo, cuerpo, documento_url, orden)
select v.badge, v.fecha_texto, v.categoria, v.titulo, v.resumen, v.tipo, v.cuerpo, v.documento_url, v.orden
from (
    values
        (
            'NUEVO',
            '9 jun 2026',
            'Admisión',
            'Convocatoria de inscripción julio – agosto 2026',
            'Abierta la inscripción para nuevos ingresos a todos los programas de licenciatura y posgrado.',
            'article',
            E'La Facultad de Economía, Contaduría y Administración (FECA) de la UJED abre su convocatoria de inscripción para el ciclo julio – agosto 2026.\n\nPueden participar egresados de bachillerato con promedio mínimo de 7.0. El proceso incluye examen de admisión, entrega de documentos y pago de arancel.\n\nFecha límite de registro: 31 de julio de 2026.\nMayores informes al (618) 827-13-65 o en las instalaciones de la facultad.',
            null,
            0
        ),
        (
            'NUEVO',
            '6 jun 2026',
            'Eventos',
            'Semana Cultural FECA 2026',
            'Del 16 al 20 de junio: exposiciones, conferencias y actividades artísticas abiertas a toda la comunidad.',
            'article',
            E'La Semana Cultural FECA 2026 se llevará a cabo del 16 al 20 de junio en las instalaciones de la facultad.\n\nActividades programadas:\n• Lunes 16 — Exposición de arte universitario\n• Martes 17 — Conferencia: Economía global y México\n• Miércoles 18 — Concurso de oratoria\n• Jueves 19 — Noche cultural y música en vivo\n• Viernes 20 — Clausura y premiación\n\nEntrada libre para toda la comunidad universitaria.',
            null,
            1
        ),
        (
            null,
            '2 jun 2026',
            'Académico',
            'Taller de titulación: guía para egresados',
            'Sesiones informativas sobre modalidades de titulación. Inscripción gratuita hasta el 12 de junio.',
            'document',
            'Consulta el documento oficial con todos los requisitos, modalidades y fechas del proceso de titulación 2026.',
            '/PDUA-SILD27.pdf',
            2
        ),
        (
            null,
            '28 may 2026',
            'Deportes',
            'Jornadas deportivas interfacultades',
            'Calendario de actividades y resultados de la participación de FECA en los juegos universitarios UJED.',
            'article',
            E'FECA participó en los Juegos Universitarios UJED 2026 con equipos en las disciplinas de fútbol, basquetbol y voleibol.\n\nResultados destacados:\n• Fútbol varonil — 2.° lugar\n• Basquetbol femenil — 1.er lugar\n• Voleibol mixto — participación\n\nFelicitamos a todos los estudiantes y representantes deportivos de nuestra facultad.',
            null,
            3
        )
) as v(badge, fecha_texto, categoria, titulo, resumen, tipo, cuerpo, documento_url, orden)
where not exists (select 1 from noticias_recientes);
