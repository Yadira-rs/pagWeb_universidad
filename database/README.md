> **Actualización:** el sitio ya no usa Supabase — corre sobre un
> PostgreSQL propio (servidor de la universidad, phpPgAdmin) con una API
> propia encima (`services/pagweb-api`). Las fases de abajo describen la
> historia real de cómo se construyó cada parte (en su momento, sí, con
> Supabase) y los archivos `.sql` de esquema siguen siendo la referencia
> vigente de las tablas — pero las instrucciones de "pégalo en el SQL
> Editor de Supabase" y "Supabase Auth" ya no aplican. Para el estado
> actual, ver `services/pagweb-api/README.md` y `database/admin_users.sql`.

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

## Fase 2 — Login y panel de administración (ya construido)

Este esquema original (`schema.sql`) fue el cimiento. Lo que ya está
**construido y funcionando** ahora es un primer panel de administración,
enfocado en lo que más cambia seguido: **Anuncios/Noticias** (el carrusel
"Avisos y Eventos" del Inicio) y el **carrusel principal de Inicio**. El
resto de las páginas (Directivos, Grupos, páginas institucionales) se
sigue editando directo desde el Table Editor de Supabase por ahora.

Archivos nuevos relevantes:
- `database/panel_v1_schema.sql` — crea `anuncios_noticias` y `hero_slides`,
  con seguridad a nivel de fila (RLS) para que el sitio público solo lea lo
  publicado/activo, y solo alguien con sesión iniciada pueda editar.
- `src/pages/AdminLoginPage.jsx`, `src/pages/AdminPanelPage.jsx`,
  `src/components/admin/*` — el login y el panel en sí, dentro del sitio,
  en `#/admin`.

**Importante:** el login usa **Supabase Auth** (`auth.users`), no la tabla
`admin_users` de `schema.sql`. Se decidió así porque Supabase Auth ya
resuelve el encriptado de contraseñas, las sesiones y el "olvidé mi
contraseña" por correo — necesario para que la persona de la FECA que
administre el contenido (no técnica) nunca dependa de que alguien le
resetee la contraseña a mano en la base de datos. La tabla `admin_users`
queda documentada en `schema.sql` como referencia, pero no se usa.

### Cómo dar de alta al administrador que va a usar el panel

1. En el panel de Supabase, ve a **Authentication → Users → Add user**
   (o **Invite user** si quieres que reciba un correo para poner su propia
   contraseña).
2. Captura su correo. Si usas "Add user", define tú una contraseña inicial
   y pídele que la cambie luego desde **Authentication → Users → (su
   usuario) → Reset password** si algún día la olvida.
3. Comparte con esa persona la dirección `https://<tu-dominio>/#/admin` (o
   el enlace "Administración" que aparece al final de cualquier página del
   sitio) y su correo/contraseña. No necesita nada más para entrar.

### Qué hacer si el proyecto de Supabase aparece "pausado"

El plan gratis de Supabase pausa un proyecto si pasa **una semana completa
sin ninguna actividad**. Para que esto casi nunca ocurra, el repositorio ya
incluye `.github/workflows/keep-supabase-alive.yml`: un workflow de GitHub
Actions que consulta la base cada 3 días automáticamente, sin que nadie
tenga que hacer nada. Puedes ver si corrió bien en la pestaña **Actions**
del repositorio en GitHub.

Si aun así algún día el sitio deja de mostrar noticias/carrusel o el panel
no carga:

1. Entra a [supabase.com](https://supabase.com) e inicia sesión con la
   cuenta del proyecto.
2. Si el proyecto está pausado, verás un botón **"Restore project"** (o
   "Restaurar proyecto") — haz clic ahí.
3. Espera 1-2 minutos y recarga el sitio. Los datos no se pierden al
   pausarse ni al restaurarse.

Si prefieren no depender nunca de esto, la alternativa es pasar a un plan
de pago de Supabase (Pro, ~$25 USD/mes) que no pausa proyectos por
inactividad.

### Cómo aplicar `panel_v1_schema.sql`

Igual que con `schema.sql`: pégalo en el **SQL Editor** de Supabase y
ejecútalo completo. Es seguro correrlo más de una vez (usa
`create table if not exists`), y ya incluye como datos iniciales las dos
diapositivas que hoy están escritas a mano en `HomePage.jsx`, para que el
carrusel no se quede vacío en cuanto el sitio empiece a leer de la base de
datos.

## Fase 3 — Storage: se retiró Vercel Blob (ya construido)

El sitio se va a hospedar en un servidor de la universidad, no en Vercel,
así que dejó de tener sentido depender de Vercel Blob (un producto
exclusivo de esa plataforma) para guardar imágenes y documentos. Ahora
todo el almacenamiento de archivos vive en **Supabase Storage**, junto con
el resto de la base de datos — una sola infraestructura externa, sin
importar en qué servidor corra el código del sitio.

Qué cambió:
- **`database/panel_v2_storage.sql`** crea dos buckets:
  - `site-media` (público): las imágenes que se suben desde el panel
    (anuncios, carrusel de Inicio).
  - `egresados-docs` (privado): los documentos que suben los egresados.
    Solo se leen mediante una URL firmada que genera el panel — nadie más
    puede acceder a ellos directamente, ni con el link.
  - También crea la tabla `egresados_docs`, que reemplaza los archivos
    `.json` sueltos que antes se guardaban en Vercel Blob como metadatos.
- Se eliminaron `api/blob-upload.js`, `api/save-doc-meta.js`,
  `api/egresados-docs-list.js`, `api/admin-upload.js` y la página
  `AdminEgresadosDocsPage.jsx` (con su contraseña única `ADMIN_PASSWORD`).
  La carpeta `/api` queda vacía — ya no hace falta ningún endpoint propio,
  todo (subir archivos, listarlos, borrarlos) se hace directo desde el
  navegador contra Supabase, protegido por las políticas RLS y por
  Supabase Auth.
- "Documentos de egresados" ahora es una tercera pestaña dentro de
  `#/admin` (protegida por el mismo login), en vez de una pantalla aparte
  con contraseña compartida.
- Se quitó la dependencia `@vercel/blob` de `package.json`.

### Cómo aplicar `panel_v2_storage.sql`

Igual que los anteriores: pégalo completo en el **SQL Editor** de Supabase
y ejecútalo. Es seguro correrlo más de una vez.

## Fase 4 — Solicitudes de admisión (ya construido)

El formulario "Inicia tu solicitud" (`#/solicitud`) era una maqueta visual:
el botón "Enviar solicitud" no guardaba nada. Ahora guarda cada solicitud en
la tabla `solicitudes_admision` (creada por `database/solicitudes_admision.sql`)
usando el mismo proyecto de Supabase que el resto del sitio.

Cualquier visitante puede insertar su solicitud sin iniciar sesión (así
funciona el formulario público), pero **nadie puede leer las solicitudes de
otra persona desde el navegador** — solo alguien con sesión iniciada
(Supabase Auth, el mismo login del panel) puede verlas, desde el **Table
Editor** de Supabase por ahora (no tiene todavía una pestaña propia dentro
de `#/admin`).

### Cómo aplicar `solicitudes_admision.sql`

Igual que los anteriores: pégalo completo en el **SQL Editor** de Supabase y
ejecútalo. Es seguro correrlo más de una vez.

## Fase 5 — Aviso por correo de la encuesta de satisfacción (ya construido)

El widget "¿Cómo fue tu experiencia?" (esquina inferior derecha, en todo el
sitio) era decorativo: mostraba una animación de "gracias" pero la
calificación y el comentario nunca salían del navegador. Ahora sí se
guardan, y además llega un correo cada vez que alguien responde.

**No se creó ninguna tabla nueva.** El sitio ya tenía, desde antes, la
tabla `calificaciones` (`puntuacion`, `comentario`, `creado_en`) creada en
`db/migrations/001_initial_schema.sql`, con permisos de insert público ya
configurados (`db/migrations/003_grants.sql`) — solo hacía falta que el
widget realmente la usara, cosa que ahora hace
(`src/components/SatisfactionWidget.jsx`).

Para el correo se agregó:
- **`supabase/functions/notify-satisfaccion`** — una Edge Function que recibe
  el aviso de una respuesta nueva y manda el correo usando
  [Resend](https://resend.com) (su plan gratis alcanza para esto de sobra:
  3000 correos/mes).
- Un **Database Webhook** (se configura en el dashboard de Supabase, no por
  SQL) que llama a esa función cada vez que se inserta una fila en
  `calificaciones`.

### Cómo terminar de activar el correo

1. **Crea una cuenta gratis en [resend.com](https://resend.com)** y genera
   una API key (Dashboard → API Keys → Create API Key).
2. **Instala la CLI de Supabase** si no la tienes:
   `npm install -g supabase`, luego `supabase login`.
3. **Enlaza el proyecto** (una sola vez):
   `supabase link --project-ref <tu-project-ref>` (el project ref se ve en
   la URL del proyecto en el dashboard de Supabase).
4. **Despliega la función**:
   `supabase functions deploy notify-satisfaccion`
5. **Configura los secretos** que usa la función:
   ```
   supabase secrets set RESEND_API_KEY=re_xxxxxxxx
   supabase secrets set NOTIFY_EMAIL=correo-que-debe-recibir-el-aviso@ejemplo.com
   ```
   (`NOTIFY_FROM` es opcional; si no lo configuras, los correos llegan desde
   `onboarding@resend.dev`, el remitente de prueba de Resend — funciona sin
   verificar dominio, pero si prefieres que llegue desde un correo propio,
   verifica tu dominio en Resend y define
   `supabase secrets set NOTIFY_FROM="FECA <avisos@tu-dominio.mx>"`).
6. **Crea el webhook** en el dashboard de Supabase: **Database → Webhooks →
   Create a new webhook**.
   - Tabla: `calificaciones`.
   - Eventos: solo **Insert**.
   - Tipo: **Supabase Edge Functions**.
   - Función: `notify-satisfaccion`.

Con eso, cada respuesta nueva de la encuesta llega por correo en segundos.

### Nota

Al construir y probar esto se insertó una fila de prueba en `calificaciones`
(comentario "prueba automatica - se puede borrar") para confirmar que el
insert público funciona. Puedes borrarla desde el **Table Editor** de
Supabase — el rol público no tiene permiso de borrar filas, así que hay que
hacerlo desde ahí.

## Fase 6 — Más pestañas en el panel: Testimonios, Solicitudes, Opiniones (ya construido)

El panel (`#/admin`) solo cubría Anuncios/noticias, Carrusel de Inicio y
Documentos de egresados. El resto (Testimonios, Solicitudes de admisión,
Opiniones del sitio) había que revisarlo a mano en el Table Editor de
Supabase. Ahora tienen su propia pestaña dentro de `#/admin`:

- **Testimonios** — alta/edición/borrado completo, igual que Anuncios
  (`src/components/admin/TestimoniosManager.jsx`, tabla `testimonios`).
- **Solicitudes de admisión** — lista de quienes llenaron "Inicia tu
  solicitud", con un botón para marcarlas como atendidas y borrarlas
  (`src/components/admin/SolicitudesManager.jsx`, tabla `solicitudes_admision`).
- **Opiniones del sitio** — lista de respuestas de la encuesta de
  satisfacción, con el promedio de calificación y opción de borrar
  (`src/components/admin/OpinionesManager.jsx`, tabla `calificaciones`).

### Por qué hace falta correr `db/migrations/004_admin_panel_permisos.sql`

`calificaciones` y `testimonios` ya existían (`db/migrations/001_initial_schema.sql`),
pero sus permisos originales no alcanzan para las pestañas nuevas:

- `calificaciones` solo tenía permiso de **insertar** (para que el visitante
  pudiera responder la encuesta) — nadie podía **leerlas** por la API, ni
  siquiera con sesión iniciada. La pestaña de Opiniones no mostraría nada
  sin este archivo.
- `testimonios` solo tenía **lectura pública** de los publicados — nadie
  podía crear, editar ni borrar desde fuera del Table Editor. La pestaña de
  Testimonios no podría guardar nada sin este archivo.

`db/migrations/004_admin_panel_permisos.sql` agrega esos permisos
únicamente para el rol `authenticated` (quien inició sesión en el panel);
no cambia nada de lo que ve un visitante normal del sitio.

### Cómo aplicar `004_admin_panel_permisos.sql`

Igual que los demás: pégalo completo en el **SQL Editor** de Supabase y
ejecútalo. A diferencia de los otros archivos, este usa `CREATE POLICY`
sin `IF NOT EXISTS` (Postgres no lo soporta para políticas), así que si
alguna vez necesitas volver a correrlo, borra antes las políticas
`panel_lectura_calificaciones`, `panel_borrado_calificaciones` y
`panel_gestion_testimonios` desde el Table Editor (Authentication →
Policies) o agrégales un `DROP POLICY IF EXISTS` antes de cada `CREATE
POLICY`.

## Fase 7 — Solicitudes de acceso al panel (ya construido)

La pantalla de login del panel (`#/admin`) ahora tiene un enlace "¿Eres
maestro o directivo? Solicitar acceso" que abre un formulario (nombre,
correo, cargo, área y un mensaje opcional). Se guarda en la tabla nueva
`solicitudes_acceso_panel` (creada por
`database/solicitudes_acceso_panel.sql`).

**Esto NO crea una cuenta ni da acceso automáticamente.** No hay forma de
verificar desde un formulario público que quien lo llenó de verdad es
personal de la facultad, así que llenar el formulario solo dice "aquí
estoy, quiero acceso" — queda pendiente en la pestaña **"Solicitudes de
acceso"** dentro de `#/admin` (`src/components/admin/AccesoManager.jsx`),
donde alguien que ya tiene acceso al panel la revisa y la marca como
aprobada o rechazada. Aprobarla es solo para llevar el control de quién
fue revisado — la cuenta real todavía hay que crearla a mano en
**Authentication → Users → Add user** del dashboard de Supabase, con el
correo capturado en la solicitud, siguiendo el mismo procedimiento de la
sección "Cómo dar de alta al administrador que va a usar el panel" más
arriba. (Crear la cuenta automáticamente desde el formulario requeriría la
service_role key de Supabase, que nunca debe vivir en el navegador.)

Dos filtros más, para que no sea tan fácil de abusar (ninguno reemplaza la
revisión humana, solo reducen el ruido):
- **Correo institucional obligatorio (`@ujed.mx`)** — se valida tanto en el
  formulario como con un `CHECK` en la tabla. No es infalible (cualquiera
  puede escribir un correo `@ujed.mx` que no le pertenece), pero saca de
  la jugada a quien no tenga acceso a ese dominio.
- **Campo trampa (honeypot)** — un campo invisible para personas que los
  bots de spam automático sí llenan; si llega lleno, la solicitud se
  descarta sin guardarse ni avisarle al bot.

### Cómo aplicar `solicitudes_acceso_panel.sql`

Igual que los demás: pégalo completo en el **SQL Editor** de Supabase y
ejecútalo. Es seguro correrlo más de una vez.

## Fase 8 — Galería de la página de Egresados (ya construido)

La sección "Así se vive → Momentos que enorgullecen" de `#/egresados` (el
grid de fotos entre el hero y "Títulos y reconocimientos") tenía sus 8 fotos
escritas a mano en `EgresadosPage.jsx` (constante `GALLERY`). Ahora se
pueden subir/editar/reordenar/ocultar desde una pestaña nueva del panel:
**"Galería de egresados"** (`src/components/admin/GaleriaManager.jsx`, tabla
`galeria_fotos`, creada por `database/galeria_fotos.sql`).

Mismo patrón que "Carrusel de Inicio": cada foto tiene `imagen_url`,
`titulo`, `sort_order` (para las flechas ↑/↓) e `is_active` (para
ocultarla sin borrarla). Las imágenes se suben al bucket `site-media`
(el mismo que ya usa el carrusel), a través del campo reutilizable
`ImageUploadField` — no hace falta ningún bucket nuevo.

La página pública (`EgresadosPage.jsx`) lee `galeria_fotos` por
Supabase al cargar; si la tabla todavía está vacía (antes de correr la
migración), sigue mostrando el arreglo `GALLERY` escrito a mano como
respaldo, igual que ya hacía la sección de Testimonios.

### Cómo aplicar `galeria_fotos.sql`

Igual que los demás: pégalo completo en el **SQL Editor** de Supabase y
ejecútalo. Es seguro correrlo más de una vez, e incluye como datos
iniciales las 8 fotos que ya estaban escritas a mano, para que la galería
no se quede vacía en cuanto el sitio empiece a leer de la base de datos.

### Nota sobre desplegar en un servidor Node propio (no Vercel)

Como ya no depende de `/api` ni de Vercel Blob, el sitio ahora es un caso
más simple: es una aplicación de React (Vite) que solo necesita servir los
archivos estáticos que genera `npm run build` (carpeta `dist/`), sin
necesitar Node.js corriendo del lado del servidor para nada del contenido
ni del panel — todo el trabajo de datos ocurre en el navegador de cada
visitante, hablando directo con Supabase. El único requisito del servidor
de la universidad es servir esos archivos estáticos y, como el sitio usa
rutas con `#/` (hash), no hace falta ninguna configuración especial de
reescritura de rutas del lado del servidor.
