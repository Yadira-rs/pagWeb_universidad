# Guía de la base de datos FECA — para quien la vaya a montar

## Contexto

El sitio web de la FECA (React) hoy no tiene base de datos: todo el
contenido está escrito directamente en el código. La idea es crear una
base de datos para que un administrador de la institución pueda editar
el contenido de: **Inicio, Noticias, Directivos, Grupos representativos,
y las páginas institucionales/de servicios**, sin tocar código.

**Quedan fuera a propósito:** Historia, Misión y Visión, y Valores — esas
tres páginas se dejan como están, no llevan base de datos.

El archivo `schema.sql` (en esta misma carpeta) ya tiene las tablas
listas y **probadas** — solo hay que ejecutarlo. Está escrito en
PostgreSQL porque es el motor que usa Supabase (el destino final probable
de esta base), pero funciona igual en cualquier Postgres.

## Qué hay que hacer (resumen)

1. Crear una base de datos PostgreSQL (local con DBeaver para probar, o
   directo en Supabase).
2. Ejecutar `schema.sql` completo contra esa base.
3. Verificar que aparezcan las 14 tablas.
4. (Más adelante, no es parte de este entregable) conectar esas tablas a
   un panel de administración y al sitio público — eso todavía no existe,
   solo la base de datos.

Instrucciones detalladas de cómo ejecutarlo en DBeaver/Supabase están en
`README.md`, en esta misma carpeta. El detalle campo por campo de cada
tabla (qué guarda cada columna, cuáles son obligatorias) está en
`CAMPOS_TABLAS.md`.

## Las 14 tablas, explicadas en simple

### Administración
- **`admin_users`** — las cuentas de quienes pueden entrar al panel a
  editar contenido (correo, contraseña encriptada, nombre). Por ahora se
  piensa en un solo administrador, pero la tabla admite varios.
- **`media`** — un registro de cada imagen o PDF que se suba desde el
  panel (dónde quedó guardado el archivo, de qué tipo es, quién lo subió).
  Las demás tablas apuntan aquí cuando necesitan mostrar una imagen.

### Inicio
- **`hero_slides`** — las imágenes grandes del carrusel principal de la
  página de inicio (título, descripción, imagen de fondo).
- **`programs`** — las tarjetas de "Departamentos" del inicio (Posgrado,
  CELCI, CIIEDO, Contraloría Interna, etc.).
- **`highlights`** — las tarjetas de "Por qué elegirnos" (4 tarjetas con
  ícono, título y descripción).
- **`teachers`** — el carrusel de directores que aparece en el inicio
  (nombre, cargo, foto, mensaje de bienvenida).
- **`teacher_education`** — los grados académicos de cada persona de
  `teachers` (una persona puede tener varios: doctorado, maestría,
  licenciatura). Está separada porque es una lista dentro de cada perfil.
- **`faq_items`** — las preguntas frecuentes que aparecen al final del
  inicio.
- **`stats`** — los números grandes de la barra de estadísticas (alumnos
  activos, programas, empleabilidad, años de excelencia).

### Noticias
- **`news`** — **una sola tabla para las tres formas de "noticias" que
  hoy existen regadas en el código**: el panel lateral de noticias, el
  carrusel de "Avisos y Eventos" del inicio, y la grilla de noticias.
  Cada nota tiene banderas (`show_on_home`, `show_in_panel`) para decidir
  en cuáles de esos lugares aparece. Así, editar una noticia una sola vez
  la actualiza en todos lados donde deba aparecer.

### Directivos
- **`director_profiles`** — los perfiles completos de los directivos
  (los que tienen su propia página, ej. `/directivos/nombre-slug`):
  nombre, cargo, foto, cita, biografía.
- **`director_degrees`** — los grados académicos de cada directivo (igual
  idea que `teacher_education`, pero para esta tabla).

### Grupos representativos
- **`representative_groups`** — cada grupo estudiantil (fútbol, danza,
  club de debate, etc.) con su categoría, nombre, apodo, descripción,
  ícono, color, número de miembros, logros y contacto.

### Páginas institucionales, de servicios y heredadas ("legacy")
- **`pages`** — una tabla flexible para todas las páginas que no encajan
  en una tabla fija: organigrama, políticas, ejes rectores, marco
  normativo, las páginas de servicios (finanzas, servicios escolares,
  etc.) y las páginas más antiguas del sitio (licenciaturas, CELCI,
  campus, solicitud de admisión...). Cada página es una fila, identificada
  por su `slug` (la parte de la URL, ej. `organigrama`), y guarda su
  contenido en una columna especial (`content`) que acepta cualquier
  estructura de texto/listas — así no hace falta crear una tabla nueva
  por cada página distinta.

## Cómo se relacionan entre sí

```
admin_users ─┬─ news (quién editó la última vez)
             └─ pages (quién editó la última vez)

media ─┬─ hero_slides (imagen / logo)
        ├─ programs (imagen)
        ├─ teachers (foto)
        ├─ news (imagen / documento adjunto)
        ├─ director_profiles (foto)
        └─ pages (imagen del encabezado)

teachers ── teacher_education (1 profesor → varios grados)
director_profiles ── director_degrees (1 directivo → varios grados)
```

El resto de las tablas (`highlights`, `faq_items`, `stats`,
`representative_groups`) son independientes, no dependen de otra tabla.

## Qué NO incluye este entregable

- El panel de administración (la pantalla donde el admin realmente
  edita el contenido) — todavía no está construido.
- La conexión entre estas tablas y el sitio público (hoy el sitio sigue
  leyendo su contenido del código, no de esta base de datos).
- Las páginas de Historia, Misión y Visión, y Valores — excluidas a
  propósito por instrucción del cliente.

Esto es solo el cimiento: la base de datos lista y validada para que,
cuando se retome el proyecto, se construya el panel y la conexión con el
sitio sobre algo ya probado.
