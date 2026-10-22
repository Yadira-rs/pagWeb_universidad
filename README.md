# Portal FECA

Sitio web institucional de la Facultad de Economía, Contaduría y
Administración (FECA), Universidad Juárez del Estado de Durango.

Frontend en React servido como sitio estático, con dos servicios propios
en Node/Express sobre un PostgreSQL dedicado para el login, el panel de
administración y las solicitudes de admisión.

## Stack

| Pieza | Tecnología |
| --- | --- |
| Frontend | React 19 + Vite. Enrutamiento propio por hash (`#/ruta`), sin librería de router. Estilos en una única hoja (`src/App.css`), sin framework de CSS. |
| `services/pagweb-api` | Node.js + Express sobre PostgreSQL (`pg`). Login (JWT + bcrypt), CRUD del panel de administración, subida de archivos, correo (Resend o SMTP). |
| `services/admisiones-api` | Node.js + Express. Único dueño de la tabla `solicitudes_admision`; valida localmente los JWT que emite `pagweb-api`. |
| Base de datos | PostgreSQL propio (sin Supabase ni ningún otro proveedor externo). |

Cada servicio es un proceso independiente, con sus propias dependencias,
y solo se comunica con el resto por HTTP.

## Desarrollo local

Requiere Node.js 18+.

```
npm install
npm run dev
```

Levanta el sitio en `http://localhost:5173` con recarga automática.

Por defecto el frontend apunta a `http://localhost:4000` y
`http://localhost:4001` (ver `.env.local`, basado en `.env.example`), así
que para probar login, panel o el formulario de admisión hace falta tener
corriendo también los dos servicios:

```
# Terminal 2
cd services/pagweb-api && cp .env.example .env && npm install && npm run dev

# Terminal 3
cd services/admisiones-api && cp .env.example .env && npm install && npm run dev
```

Cada servicio tiene su propio README con el contrato completo
(endpoints, autenticación, formato de request/response):
[`services/pagweb-api`](services/pagweb-api) ·
[`services/admisiones-api`](services/admisiones-api).

El esquema de base de datos está en [`database/`](database/).

## Build de producción

```
npm run build
```

Genera `dist/`: HTML, CSS, JS e imágenes listos para publicar, más los
PDFs de `public/docs/`. Para revisar el resultado localmente antes de
publicar:

```
npm run preview
```

## Despliegue

El sitio está publicado en dos lugares a la vez:

- **Vercel** (`pag-web-universidad.vercel.app`) — espejo estático,
  se actualiza solo en cada `git push` a `main`.
- **Servidor propio de la universidad** (`https://200.23.125.107`) — sirve
  el sitio estático *y* corre las dos APIs y la base de datos. Se publica
  con `bash scripts/deploy.sh` (sitio) y `bash scripts/deploy-api.sh`
  (APIs).

Ambas entradas llaman siempre al mismo backend. Guía completa, con los
datos reales del servidor, en [`DEPLOY.md`](DEPLOY.md).

## Estructura del repositorio

```
src/                   Frontend (React)
  pages/                 Pantallas
  components/            Piezas reutilizables, incl. components/admin/ (panel)
  sections/               Header, Footer
  data/                  Contenido editorial fijo
  lib/                   Clientes HTTP hacia las dos APIs
  App.css                Estilos del sitio completo
services/
  pagweb-api/            Login, CRUD del panel, archivos
  admisiones-api/        Solicitudes de admisión
database/               Esquema SQL y documentación de tablas
public/                 Imágenes, fuentes y documentos descargables
scripts/                deploy.sh, deploy-api.sh
DEPLOY.md               Guía de despliegue, paso a paso
```
