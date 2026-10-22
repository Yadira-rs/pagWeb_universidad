# Base de datos

El sitio corre sobre un PostgreSQL propio, alojado en el mismo servidor
Ubuntu de la universidad donde corren `services/pagweb-api` y
`services/admisiones-api` (ver `DEPLOY.md`). No depende de Supabase ni de
ningún proveedor externo de base de datos.

Esta carpeta contiene el esquema SQL: un archivo por tabla o por grupo de
tablas relacionadas, pensado para poder aplicarse de forma incremental.

## Aplicar un archivo `.sql`

Contra el servidor real, por `psql` (conectado por SSH) o por phpPgAdmin,
que ya está instalado ahí. En local, cualquier cliente de PostgreSQL
(DBeaver, `psql`, TablePlus, etc.) sirve igual.

La mayoría de los archivos usan `create table if not exists` y son
seguros de correr más de una vez. Cuando no es así (por ejemplo, un
archivo que usa `create policy` sin `if not exists`), el propio archivo lo
indica en un comentario al inicio.

## Cuentas de administrador del panel

`admin_users.sql` crea la tabla que usa `services/pagweb-api` para el
login del panel (`#/admin`) — reemplaza por completo cualquier sistema de
autenticación externo. Para dar de alta la primera cuenta:

```
cd services/pagweb-api
npm run seed-admin -- correo@ujed.mx "contraseña temporal" "Nombre visible"
```

Cuentas siguientes se dan de alta desde el panel mismo (pestaña
"Solicitudes de acceso"), sin tocar la base de datos a mano.

## Notas de diseño

- Las tablas de "colecciones" (`hero_slides`, `anuncios_noticias`,
  `noticias_recientes`, `testimonios`, `galeria_fotos`, etc.) usan
  `sort_order` e `is_active` para poder reordenar y ocultar contenido sin
  borrarlo.
- Todas las tablas con `updated_at` la actualizan solas mediante un
  trigger (`set_updated_at()`), declarado una sola vez y reutilizado por
  el resto de las tablas.
- El control de acceso (qué puede leer o escribir cada visitante) lo hace
  `pagweb-api` en la capa de aplicación (ver su README, sección
  "Recursos CRUD genéricos"), no Postgres directamente — no hay RLS ni
  roles especiales de base de datos para el sitio público.

## Otros documentos de esta carpeta

- `CAMPOS_TABLAS.md` — referencia detallada de columnas por tabla, útil
  al escribir una migración nueva o al depurar un formulario del panel.
