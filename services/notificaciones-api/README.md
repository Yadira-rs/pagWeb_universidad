# Notificaciones API

Microservicio propio dueño del dominio **envío de notificaciones por
correo**. No sabe nada de "solicitudes de admisión" como concepto de
negocio: solo sabe recibir `{ tipo, datos }` y mandar un correo con la
plantilla que corresponda a `tipo`.

## Cómo correrlo

```
cd services/notificaciones-api
cp .env.example .env   # y llena los valores reales
npm install
npm start               # http://localhost:4002
```

Se puede detener en cualquier momento sin tumbar Admisiones API ni el
sitio — ver en `services/admisiones-api/README.md` la sección "Qué pasa
si Notificaciones API está caída" para el comportamiento exacto que se
puede demostrar en vivo apagando este proceso.

## Contrato

Base URL: `http://localhost:4002` (configurable con `PORT`).

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/health` | Ninguna | `{ service, status }`. |
| POST | `/notificar` | `X-Service-Token` | Envía (o registra) una notificación. |

### POST /notificar

Solo pensado para ser llamado por otro servicio interno, nunca desde el
navegador — por eso este servicio no tiene configurado CORS: un intento
de `fetch()` desde un sitio web es bloqueado por el navegador antes de
llegar aquí.

Headers:

```
X-Service-Token: <secreto compartido con admisiones-api>
Content-Type: application/json
```

Body:

```json
{
  "tipo": "nueva_solicitud_admision",
  "datos": { "nombre": "Ana Pérez", "correo": "ana@example.com", "...": "..." }
}
```

Respuestas:

- `200` — `{ sent: true, mode: "email" }` si Resend confirmó el envío, o
  `{ sent: false, mode: "console" }` si no hay `RESEND_API_KEY`
  configurada (el aviso solo se imprime en la consola del servicio —
  útil para la demo sin depender de que Resend esté disponible ese día).
- `400` — falta `tipo` o `datos`.
- `401` — falta o es inválido `X-Service-Token`.
- `502` — Resend rechazó el envío.

## Seguridad

`X-Service-Token` es un secreto compartido (no un JWT de usuario, no hay
usuario en una llamada máquina-a-máquina). Se compara con
`crypto.timingSafeEqual` (`src/serviceAuth.js`) en vez de `===` para no
filtrar por temporización cuánto del token coincide byte a byte —
mismo principio que usar un `Authorization` header en vez de un query
param: el secreto nunca queda en logs de acceso ni en el historial del
navegador (aquí no hay navegador de por medio, pero es la misma idea).
