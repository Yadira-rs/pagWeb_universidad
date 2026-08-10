# Admisiones API

Microservicio propio (no es Supabase) dueño del dominio **solicitudes de
admisión**. Es el único componente del sistema con permiso para leer o
escribir directamente en la tabla `solicitudes_admision`.

## Cómo correrlo

```
cd services/admisiones-api
cp .env.example .env   # y llena los valores reales
npm install
npm start               # http://localhost:4001
```

Se puede arrancar, detener (Ctrl+C) y volver a arrancar sin afectar a
Notificaciones API ni al frontend — no comparte proceso, memoria ni código
con ellos, solo los llama por HTTP.

## Contrato

Base URL: `http://localhost:4001` (configurable con `PORT`).

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/health` | Ninguna | `{ service, status }`, para comprobar que el servicio está vivo. |
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

- `201` — solicitud creada: `{ id, nombre, telefono, correo, programa, mensaje, atendida, created_at, notified }`. `notified` indica si Notificaciones API confirmó el envío del correo (ver más abajo qué pasa si no).
- `400` — falta `nombre`.
- `502` — no se pudo guardar en la base de datos (p. ej. credenciales de Supabase mal configuradas).

### GET / PATCH / DELETE `/api/solicitudes[...]`

Requieren el header:

```
Authorization: Bearer <access_token>
```

`access_token` es el mismo que genera Supabase Auth al iniciar sesión en
`#/admin` (`supabase.auth.getSession()` en el frontend). El servicio lo
valida **localmente**, verificando la firma con `SUPABASE_JWT_SECRET`, sin
llamar a Supabase Auth en cada petición.

- `401` — falta el header o el token no es válido/expiró.
- `500` — el servicio no tiene configurado `SUPABASE_JWT_SECRET` (error de despliegue, no del cliente).

## Seguridad

Dos mecanismos distintos, a propósito:

1. **Frontend → Admisiones API** (rutas de administración): Bearer JWT de
   usuario, emitido por Supabase Auth. Tiene sentido aquí porque hay una
   persona identificable detrás de la petición (un admin con sesión
   iniciada).
2. **Admisiones API → Notificaciones API**: secreto compartido
   (`X-Service-Token`), no un JWT de usuario. Es una llamada máquina a
   máquina sin usuario detrás, así que un token estático simple —
   comparado con `crypto.timingSafeEqual` del lado de Notificaciones para
   evitar ataques de temporización— es proporcional al riesgo.

`SUPABASE_SERVICE_ROLE_KEY` vive solo en el `.env` de este servicio
(nunca en el navegador): es lo que le permite escribir sin pasar por las
políticas RLS pensadas para el navegador (`anon`/`authenticated`).

## Qué pasa si Notificaciones API está caída

`POST /api/solicitudes` primero guarda la solicitud en la base de datos;
**solo después** intenta avisarle a Notificaciones API, con un timeout de
3&nbsp;segundos. Si esa llamada falla (servicio caído, tarda demasiado,
responde error), se captura el error, se registra en el log y la
respuesta al visitante sigue siendo `201` con `"notified": false` — el
usuario ve "recibimos tu solicitud" igual, porque su dato ya quedó a
salvo. Nada se pierde; solo no se manda el correo de aviso en el momento
(se puede consultar en la tabla de todos modos, u
 reintentar el aviso manualmente).

## Qué pasa si Admisiones API está caída

El frontend recibe un error de red al hacer `fetch`, lo captura y muestra
"No se pudo enviar tu solicitud..." — Supabase y Notificaciones API no se
enteran de nada, siguen funcionando con normalidad para el resto del
sitio (que no depende de este servicio).
