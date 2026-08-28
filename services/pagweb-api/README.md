# Pagweb API

Microservicio propio (no es Supabase) que reemplaza lo que antes daba la
plataforma Supabase sobre el mismo PostgreSQL: login del panel de
administración (`admin_users`) y CRUD de las tablas de contenido, con las
mismas reglas de acceso que antes vivían como políticas RLS.

Sigue el mismo patrón que `services/admisiones-api`: proceso y
dependencias propias, solo se comunica con el resto del sistema por HTTP.

## Cómo correrlo

```
cd services/pagweb-api
cp .env.example .env   # y llena los valores reales (conexión a Postgres, JWT_SECRET)
npm install
npm start               # http://localhost:4000
```

Antes de poder iniciar sesión hace falta:

1. Correr `database/admin_users.sql` en phpPgAdmin (crea la tabla, es
   seguro correrlo más de una vez).
2. Sembrar la primera cuenta:
   `npm run seed-admin -- correo@ujed.mx "contraseña temporal" "Nombre visible"`

## Contrato

Base URL: `http://localhost:4000` (configurable con `PORT`).

### Auth (`/api/auth`)

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/auth/login` | Ninguna | `{email, password}` → `{token, user}`. `401` credenciales incorrectas, `423` cuenta bloqueada temporalmente tras varios intentos fallidos. |
| GET | `/api/auth/session` | Bearer JWT | `{user}` si el token es válido. |
| POST | `/api/auth/logout` | Ninguna | `204`, sin estado — el frontend solo descarta el token. |
| POST | `/api/auth/forgot-password` | Ninguna | `{email}` → siempre `{ok:true}` (no revela si la cuenta existe). Si existe, manda un correo con un enlace de recuperación. |
| POST | `/api/auth/reset-password` | Ninguna (usa el token del enlace) | `{token, password}` → `{ok:true}` o `401` si el enlace expiró/no es válido. |

El token de sesión dura `JWT_EXPIRES_MINUTES` (default 8 h). El de
recuperación de contraseña dura 30 min y solo sirve para
`reset-password` (tiene `purpose: "password_reset"`, no
`"session"`, así que no funciona como Bearer normal).

### Recursos CRUD genéricos

Cada tabla montada con `createTableRouter` (`src/tableRouter.js`) expone:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/<tabla>` | Lista. Con sesión ve todo; sin sesión, solo lo que permite `publicFilter` (si la tabla es de lectura pública) o `401` si es solo para admins. |
| POST | `/api/<tabla>` | Crea una fila. Según configuración, público o solo con sesión. |
| PATCH | `/api/<tabla>/:id` | Actualiza los campos presentes en el body. Solo con sesión. |
| DELETE | `/api/<tabla>/:id` | Borra por id. Solo con sesión. |

Tablas montadas (ver `src/index.js`), todas ya migradas en su manager del
panel (`AnunciosManager`, `HeroSlidesManager`, `TestimoniosManager`,
`GaleriaManager`, `NoticiasManager`, `OpinionesManager`,
`EgresadosDocsManager`) y en `AdminLoginPage`/`SatisfactionWidget`/
`EgresadoUploadModal` para las que insertan público:

- `anuncios_noticias`, `hero_slides`, `testimonios`, `galeria_fotos`,
  `noticias_recientes` — lectura pública filtrada
  (`publicado`/`is_active`, según la tabla); escritura solo con sesión.
- `solicitudes_acceso_panel` — creación pública (formulario del login);
  lectura/edición/borrado solo con sesión.
- `calificaciones` — creación pública (encuesta de satisfacción), lectura
  y borrado solo con sesión, sin edición.
- `egresados_docs` — creación pública (formulario de egresados), lectura/
  borrado solo con sesión.

### Archivos (`/api/uploads`, `src/uploads.js`)

Reemplaza a Supabase Storage con carpetas en disco (`UPLOADS_DIR`, ver
`.env.example` — **debe vivir fuera de `/var/www/html/facultad`**, ese
docroot se borra en cada deploy del sitio):

- `site-media` (público, solo con sesión puede subir) — imágenes del
  panel. Se sirve como archivo estático en `/api/uploads/site-media/...`.
- `egresados-docs` (privado, cualquiera puede subir sin sesión — es el
  formulario público de egresados) — solo se descarga con un enlace
  firmado de corta duración (`POST .../sign`, solo con sesión).

Migrados: `ImageUploadField`, `DocumentUploadField`,
`EgresadosDocsManager`, `EgresadoUploadModal`.

## Qué queda pendiente a propósito

- **Lecturas públicas** (`HomePage.jsx`, `EgresadosPage.jsx`,
  `AvisoDetailPage.jsx`, `AnunciosCarousel.jsx`, `App.jsx` — el panel de
  noticias del header): siguen leyendo del Supabase real, para no
  arriesgar el sitio público mientras se termina de migrar el panel.
- **`AccesoManager.jsx`**: su lectura/aprobación/borrado de
  `solicitudes_acceso_panel` ya podría migrar, pero el botón "Aprobar"
  llama a la Edge Function `invitar-acceso-panel` (Supabase). Se deja
  entero en `supabaseClient` hasta reemplazar esa función.
- **`SolicitudesManager.jsx`**: solo usa `supabase.auth.getSession()`
  para mandarle el JWT a `admisiones-api`, que todavía valida tokens de
  Supabase (`SUPABASE_JWT_SECRET`). Migra junto con `admisiones-api`
  (siguiente hito), no antes — si no, sus peticiones empezarían a fallar
  con 401 (token de otra firma).

## Seguridad

- `JWT_SECRET` es el mismo tipo de secreto que antes era
  `SUPABASE_JWT_SECRET` en `admisiones-api` — cuando se migre ese
  servicio, va a validar los mismos tokens que emite este.
- Los nombres de tabla/columna que arma el SQL de `tableRouter.js` siempre
  vienen de la configuración fija en `src/index.js`, nunca del request —
  lo único que llega parametrizado desde el cliente son los valores.
- El login bloquea la cuenta `LOGIN_MAX_ATTEMPTS` intentos fallidos
  seguidos, por `LOGIN_LOCK_MINUTES` minutos (columnas `failed_attempts`/
  `locked_until` de `admin_users`).
