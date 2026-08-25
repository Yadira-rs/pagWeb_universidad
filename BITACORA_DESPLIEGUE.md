# Bitácora de despliegue — sitio FECA en el servidor de la universidad

Resumen de lo hecho para subir el sitio (`pagWeb_universidad`) al servidor
Ubuntu de la universidad, para usar en el informe/exposición del equipo.

## 1. Objetivo

El sitio, hasta ahora, se probaba solo en local (`npm run dev`). Se necesitaba
publicarlo en un servidor real de la universidad para que cualquier persona
pudiera entrar desde internet.

## 2. Preparar el entorno de trabajo (WSL)

Los administradores del servidor pidieron conectarse y desplegar desde un
entorno Linux, no directamente desde Windows. Se instaló **WSL (Windows
Subsystem for Linux) con Ubuntu** en la computadora del equipo:

- Se activó con `wsl --install -d Ubuntu` (requirió reiniciar Windows para
  que el componente de Windows quedara activo).
- Se resolvió un error de instalación (`0x80080005`) reactivando los
  servicios de Windows `wuauserv` (Windows Update) y `ClipSVC`, que estaban
  detenidos y son necesarios para que WSL pueda registrarse.
- Dentro de Ubuntu se instaló `rsync` (`sudo apt install -y rsync`), la
  herramienta usada para subir los archivos del sitio al servidor.

## 3. Conexión al servidor

- **Servidor:** `200.23.125.107`
- **Usuario:** `team3-feca` (cuenta del equipo, con acceso `sudo`)
- Conexión por SSH: `ssh team3-feca@200.23.125.107`

Al revisar el servidor se confirmó que ya estaba preparado de antemano por
los administradores:

- **Apache 2.4.66** ya instalado y corriendo.
- El sitio se sirve desde **`/var/www/html/facultad`**, con permisos ya
  configurados (vía ACL) para que el usuario `team3-feca` pueda escribir ahí.
- Ya existía un `VirtualHost` para HTTP (puerto 80, redirige automático a
  HTTPS) y otro para HTTPS (puerto 443, con un **certificado
  autofirmado** — genera una advertencia de seguridad en el navegador hasta
  que la universidad conecte un dominio real con un certificado de una
  autoridad reconocida, como Let's Encrypt).

## 4. Proceso de despliegue

Se dejaron listos dos archivos del proyecto con los datos reales del
servidor para que publicar cambios futuros sea un proceso repetible:

- **`scripts/deploy.sh`** — automatiza construir y subir el sitio.
- **`DEPLOY.md`** — documentación completa del proceso, actualizada con
  Apache (el servidor usa Apache, no Nginx como se había planeado
  originalmente) y con los datos reales del servidor.

Cada vez que hay cambios nuevos en el sitio, el proceso es:

```bash
# 1. Construir el sitio (recoge los cambios de código más recientes)
npm run build

# 2. Subir la carpeta dist/ generada al servidor
rsync -avz --delete dist/ team3-feca@200.23.125.107:/var/www/html/facultad/
```

El sitio quedó publicado y accesible en:

```
https://200.23.125.107/
```

(con la advertencia de certificado autofirmado mencionada arriba, mientras
no haya un dominio propio).

## 5. Base de datos — pendiente de definir alcance

En paralelo, otro grupo de compañeras copió el esquema y los datos de la
base de datos de **Supabase** (`feca-ujed-web`, proyecto
`zyxmpbgcwlrncsecpzjb`) hacia un **PostgreSQL instalado directamente en el
servidor de la universidad**, administrado vía phpPgAdmin. La copia se hizo
con `pg_dump` (respaldo limpio del esquema `public`) y se importó
exitosamente en phpPgAdmin.

**Punto importante para la siguiente etapa:** el sitio actualmente no habla
con PostgreSQL directamente — usa el paquete `@supabase/supabase-js`, que
depende de tres servicios que Supabase agrega sobre PostgreSQL: una API
REST automática, el sistema de autenticación (login del panel de
administración) y el almacenamiento de archivos (imágenes, documentos de
egresados). Un PostgreSQL "normal" no incluye nada de eso.

Si la instrucción del profesor es que el sitio deje de depender de Supabase
y use esta base de datos propia, el camino recomendado (sin tener que
reescribir el código del sitio) es instalar **Supabase self-hosted**
(la misma plataforma, pero corriendo con Docker en el servidor de la
universidad en vez de en la nube de Supabase) — queda pendiente de
confirmar el alcance exacto y el tiempo disponible antes de emprender esa
parte.
