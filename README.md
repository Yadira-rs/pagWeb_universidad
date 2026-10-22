# Portal FECA

Sitio web institucional de la Facultad de Economía, Contaduría y
Administración (FECA), Universidad Juárez del Estado de Durango.

El sitio público es una aplicación React compilada a archivos estáticos.
Lo que cambia seguido (noticias, avisos, carrusel, agenda, documentos) se
edita desde un panel de administración en `#/admin`, que guarda en un
PostgreSQL propio a través de dos APIs en Node.js.

## Cómo está construido

```
Navegador
   │
   ▼
Apache (HTTPS) ──────────► sitio estático: dist/  (HTML, CSS, JS, imágenes, PDFs)
   │
   │  /api/solicitudes/*         /api/*  (todo lo demás)
   ▼                             ▼
admisiones-api :4001         pagweb-api :4000 ───► archivos subidos (UPLOADS_DIR)
   │                             │
   └──────────► PostgreSQL ◄─────┘
               (feca-ujed-web)
```

- **Sitio público:** todas las páginas se resuelven en el navegador con
  rutas por hash (`#/oferta-educativa`, `#/admin`, …). Apache solo sirve
  archivos; no hay PHP ni lógica de servidor para las páginas.
- **pagweb-api:** login del panel, lectura y escritura del contenido
  editable, subida de imágenes y documentos, encuesta de satisfacción y
  envío de correos (recuperar contraseña, invitaciones, avisos).
- **admisiones-api:** recibe y administra las solicitudes de admisión.
  Valida la sesión del panel con el mismo `JWT_SECRET` que `pagweb-api`.
- **PostgreSQL:** guarda todo el contenido editable y las cuentas del
  panel. Solo acepta conexiones desde el propio servidor.
- **Apache** reenvía `/api/solicitudes/*` a `admisiones-api` y el resto
  de `/api/*` a `pagweb-api`, así el sitio y las APIs comparten dominio.

Cada API es un proceso independiente, con sus propias dependencias, y se
comunica con el resto solo por HTTP.

## Herramientas

| Parte                   | Herramienta                       | Versión                           |
| ----------------------- | --------------------------------- | --------------------------------- |
| Interfaz                | React                             | 19                                |
| Compilación del sitio   | Vite (con `@vitejs/plugin-react`) | 8                                 |
| Estilos                 | CSS propio en `src/App.css`       | —                                 |
| APIs                    | Node.js + Express                 | Node 18 o más reciente, Express 4 |
| Base de datos           | PostgreSQL (cliente `pg`)         | 18                                |
| Sesiones                | JSON Web Tokens (`jsonwebtoken`)  | —                                 |
| Contraseñas             | `bcryptjs`                        | —                                 |
| Correo                  | `nodemailer` (SMTP) o Resend      | —                                 |
| Procesos en el servidor | pm2                               | —                                 |
| Servidor web            | Apache 2 (proxy y HTTPS)          | —                                 |
| Pruebas                 | Playwright                        | 1.61                              |
| Revisión de código      | ESLint                            | 10                                |

El sitio no usa librería de rutas ni framework de CSS: el enrutamiento
está en `src/App.jsx` y los estilos en una sola hoja.

## Arrancarlo en una computadora

Requisitos: Node.js 18 o más reciente, PostgreSQL 18 y Git.

### 1. Base de datos

La base se arranca a partir de un respaldo del servidor de producción
(exportado desde phpPgAdmin con "Estructura y datos" en formato SQL, o
con `pg_dump`). Así queda con las mismas tablas y el mismo contenido:

```bash
createdb feca-ujed-web
psql -d feca-ujed-web -f respaldo.sql          # exportado desde phpPgAdmin
# o, si el respaldo es de pg_dump -F c:
pg_restore -d feca-ujed-web --no-owner --no-privileges respaldo.dump
```

Los archivos de `database/` documentan cómo se fue creando cada tabla,
pero no reconstruyen la base completa por sí solos: varios son de una
versión anterior del sitio que usaba Supabase.

### 2. APIs

Cada una en su propia terminal:

```bash
# Terminal 1
cd services/pagweb-api
cp .env.example .env        # llena PGUSER, PGPASSWORD y JWT_SECRET
npm install
npm run seed-admin -- correo@ejemplo.com "contraseña" "Nombre"   # solo la primera vez
npm run dev                 # http://localhost:4000

# Terminal 2
cd services/admisiones-api
cp .env.example .env        # mismos datos de PostgreSQL y el mismo JWT_SECRET
npm install
npm run dev                 # http://localhost:4001
```

`JWT_SECRET` puede ser cualquier texto largo; se genera uno con
`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
Sin datos de SMTP en el `.env`, los correos no se envían y su enlace se
imprime en la consola de `pagweb-api`.

### 3. Sitio

```bash
# Terminal 3, en la raíz del proyecto
cp .env.example .env.local
npm install
npm run dev                 # http://localhost:5173
```

El panel queda en `http://localhost:5173/#/admin`, con la cuenta creada
por `seed-admin`.

### Comandos

| Comando                   | Qué hace                                                                       |
| ------------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`             | Sitio en modo desarrollo, con recarga automática                               |
| `npm run build`           | Genera `dist/`, lista para publicar                                            |
| `npm run preview`         | Sirve `dist/` en local para revisarla antes de publicar                        |
| `npm run lint`            | Revisa el código con ESLint                                                    |
| `npx playwright test`     | Corre las pruebas de `tests/` (levanta el sitio solo)                          |
| `npm run seed-admin -- …` | En `services/pagweb-api`: crea una cuenta del panel o restablece su contraseña |

Cada API documenta sus endpoints en su propio README:
[`services/pagweb-api`](services/pagweb-api) ·
[`services/admisiones-api`](services/admisiones-api).

## Publicar

El sitio de producción corre en un servidor Ubuntu con Apache, pm2 y
PostgreSQL. Se publica desde una computadora con el proyecto:

```bash
bash scripts/deploy.sh        # compila el sitio y sube dist/
bash scripts/deploy-api.sh    # sube las APIs y las reinicia con pm2
```

Antes de compilar para producción debe existir `.env.production.local`
con `VITE_PAGWEB_API_URL=` y `VITE_ADMISIONES_API_URL=` vacías, para que
el sitio llame a `/api` en su mismo dominio. La guía completa está en
[`DEPLOY.md`](DEPLOY.md).

Una copia del sitio también se publica en Vercel; ahí las URLs de las
APIs se configuran en las variables de entorno del proyecto en Vercel.

## Estructura del repositorio

```
src/                    Sitio (React)
  App.jsx                 Rutas por hash y armado de cada página
  App.css                 Estilos de todo el sitio
  pages/                  Una pantalla por archivo
  components/             Piezas reutilizables
    admin/                Pestañas del panel de administración
  sections/               Encabezado y pie de página
  data/                   Contenido fijo (textos, directivos, menús, búsqueda)
  lib/                    Clientes HTTP hacia las dos APIs
services/
  pagweb-api/             Login, contenido del panel, archivos, correos
  admisiones-api/         Solicitudes de admisión
database/               Historial del esquema SQL y descripción de cada tabla
public/                 Imágenes, fuentes y documentos descargables
tests/                  Pruebas de Playwright
scripts/                deploy.sh y deploy-api.sh
DEPLOY.md               Despliegue en el servidor, paso a paso
MIGRACION.md            Mudar el sitio completo a otro servidor (ej. AWS)
```

## Documentación

| Documento                                                | Para quién                          | Qué explica                                                                                    |
| -------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`DEPLOY.md`](DEPLOY.md)                                 | Quien publica cambios               | Preparar el servidor y desplegar el sitio y las APIs.                                          |
| [`database/README.md`](database/README.md)               | Quien modifica la base              | Notas de diseño de las tablas y de las cuentas del panel.                                      |
| [`database/CAMPOS_TABLAS.md`](database/CAMPOS_TABLAS.md) | Quien modifica la base              | Qué guarda cada columna de cada tabla.                                                         |
| Guía de administración                                   | Quien administra el sitio           | Acceso al servidor, cuentas del panel, respaldos, APIs y problemas comunes. Se entrega aparte. |
| [`MIGRACION.md`](MIGRACION.md)                           | Quien mude el sitio a otro servidor | Paso a paso para mudar sitio, APIs, base y archivos, con AWS como ejemplo.                     |

Las contraseñas (SSH, PostgreSQL, correo) y los archivos `.env` no están
en el repositorio: se entregan aparte.
