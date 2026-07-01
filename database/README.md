# Base de datos FECA — esquema y cómo usarlo

`schema.sql` crea las 14 tablas necesarias para que el administrador edite:
Inicio, Noticias, Directivos, Grupos representativos y las páginas
institucionales/de servicios/legacy. **No** incluye Historia, Misión y
Visión, ni Valores (quedan tal como están, sin base de datos).

Está escrito en PostgreSQL porque es el motor que usa Supabase — así el
mismo archivo sirve para probar local y para el destino final, sin tener
que convertir nada.

## 1. Probarlo local con DBeaver

1. Instala PostgreSQL en tu PC si no lo tienes (ya lo tienes instalado en
   este equipo: PostgreSQL 18).
2. En DBeaver, crea una nueva conexión a PostgreSQL:
   - Host: `localhost`, puerto `5432`
   - Usuario/contraseña: los que hayas definido al instalar Postgres.
3. Crea una base nueva vacía, por ejemplo `feca_cms`.
4. Abre `schema.sql` dentro de DBeaver (con esa base seleccionada) y
   ejecútalo completo (botón "Execute SQL Script", no solo "Execute
   statement").
5. En el panel de la izquierda deberías ver las 14 tablas creadas.

## 2. Moverlo a Supabase (o a otro proveedor de Postgres)

Supabase **es** PostgreSQL por dentro, así que no hay conversión que hacer:

1. Crea un proyecto gratis en [supabase.com](https://supabase.com).
2. En el panel del proyecto ve a **Project Settings → Database** y copia
   los datos de conexión (host, puerto, usuario, contraseña, nombre de
   base).
3. En DBeaver crea una nueva conexión con esos datos (o simplemente edita
   la conexión local para que apunte al host de Supabase).
4. Corre `schema.sql` contra esa conexión, igual que en el paso local.
5. Alternativa aún más simple: copia y pega el contenido de `schema.sql`
   directamente en el **SQL Editor** que trae Supabase en su panel web,
   sin pasar por DBeaver.

Si en vez de Supabase terminan usando otro proveedor (Neon, Railway, RDS,
un servidor institucional con Postgres, etc.), el mismo `schema.sql`
funciona igual, porque no tiene nada específico de Supabase.

## Notas sobre el diseño

- Las tablas de "colecciones" (`hero_slides`, `programs`, `highlights`,
  `teachers`, `faq_items`, `stats`, `news`, `director_profiles`,
  `representative_groups`) tienen `sort_order` e `is_active` para poder
  reordenar y ocultar contenido sin borrarlo.
- `pages` es una tabla flexible (con una columna `content` en formato
  JSON) que cubre todas las páginas institucionales, de servicios y
  heredadas ("legacy") que no encajan en una tabla fija — evita crear
  15-20 tablas distintas para páginas que casi no se repiten.
- `admin_users` es una tabla propia (no depende del sistema de
  autenticación de Supabase) para que este esquema funcione igual sin
  importar dónde termine alojada la base. Si deciden quedarse en Supabase
  y prefieren usar su sistema de autenticación integrado (Supabase Auth)
  en vez de esta tabla, se puede ajustar después sin tocar el resto del
  esquema.
- Todas las tablas con `updated_at` la actualizan solas mediante un
  trigger (`set_updated_at()`), igual que pasaría automáticamente en
  MySQL — en Postgres hay que declararlo explícitamente.
