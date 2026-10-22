# Admisiones API

Servicio propio, independiente de `pagweb-api`, dueño del dominio
**solicitudes de admisión**. Es el único componente del sistema con
permiso para leer o escribir directamente en la tabla
`solicitudes_admision`.

## Cómo correrlo

```
cd services/admisiones-api
cp .env.example .env   # y llena los valores reales
npm install
npm start               # http://localhost:4001
```

Se puede detener (Ctrl+C) y volver a arrancar sin afectar al frontend ni
a `pagweb-api` — no comparte proceso, memoria ni código con ellos, solo
los llama por HTTP.

## Contrato

Base URL: `http://localhost:4001` (configurable con `PORT`).

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/health` | Ninguna | `{ service, status }`, para que un monitor externo sepa si el servicio está vivo. |
| POST | `/api/solicitudes` | Ninguna (pública) | Crea una solicitud. La llama el formulario "Inicia tu solicitud" del sitio. |
| GET | `/api/solicitudes` | Bearer JWT | Lista todas las solicitudes, más nuevas primero. |
| PATCH | `/api/solicitudes/:id` | Bearer JWT | Cambia `atendida`. |
| DELETE | `/api/solicitudes/:id` | Bearer JWT | Borra una solicitud. |

### POST /api/solicitudes

Request body:

```json
{
  "nombre": "Ana Pérez",
  "telefono": "618 000 0000",
  "correo": "ana@example.com",
  "programa": "Licenciatura en Administración",
  "mensaje": "Quiero informes de horarios."
}
```

Solo `nombre` es requerido. Respuestas:

- `201` — solicitud creada: `{ id, nombre, telefono, correo, programa, mensaje, atendida, created_at }`.
- `400` — falta `nombre`.
- `502` — no se pudo guardar en la base de datos.

### GET / PATCH / DELETE `/api/solicitudes[...]`

Requieren el header:

```
Authorization: Bearer <access_token>
```

`access_token` es el mismo que emite `services/pagweb-api` al iniciar
sesión en `#/admin` (ver `src/lib/authClient.js` del frontend). Este
servicio lo valida **localmente**, verificando la firma con `JWT_SECRET`
(el mismo valor que en el `.env` de `pagweb-api`), sin llamarle a ese
servicio en cada petición.

- `401` — falta el header o el token no es válido/expiró.
- `500` — el servicio no tiene configurado `JWT_SECRET` (error de despliegue, no del cliente).

## Seguridad

Las rutas de administración (listar/editar/borrar) piden un Bearer JWT de
usuario, emitido por `pagweb-api`: tiene sentido aquí porque siempre hay
una persona identificable detrás de la petición (un administrador con
sesión iniciada en el panel).

Este servicio se conecta a Postgres directo (`PGHOST`/`PGUSER`/... en el
`.env`, mismos valores que `pagweb-api`) con un rol de base de datos de
confianza: corre en un servidor de confianza (nunca en el navegador), y es
el único componente con permiso de leer/escribir `solicitudes_admision`.

## Qué pasa si este servicio está caído

El frontend recibe un error de red al hacer `fetch` al enviar el
formulario, lo captura y muestra "No se pudo enviar tu solicitud..." — el
resto del sitio (que no depende de este servicio) sigue funcionando con
normalidad.
