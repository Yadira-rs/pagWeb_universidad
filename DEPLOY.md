# Desplegar el sitio en el servidor Ubuntu de la universidad

El sitio en sí (`dist/`) es HTML/CSS/JS estático: se construye en tu
computadora (`npm run build`) y se sube con `scripts/deploy.sh` — el
servidor solo necesita Apache para servirlo, nada de Node para esa parte
(ver sección 1). Aparte, desde que el sitio dejó Supabase, el servidor sí
necesita Node para correr las dos APIs propias que le dan login, CRUD del
panel y archivos (ver sección 3, `services/pagweb-api/README.md`).

## Datos del servidor (ya preparado por los administradores de la FECA)

Los administradores del servidor ya dejaron todo listo — no hay que
instalar ni configurar Apache, eso ya está hecho en el servidor:

- **Servidor:** `200.23.125.107`
- **Usuario SSH:** `team3-feca` (cuenta compartida del equipo — si
  cambian la contraseña, avisen antes al resto del equipo/profesor)
- **Carpeta donde vive el sitio:** `/var/www/html/facultad` — el usuario
  `team3-feca` ya tiene permisos de escritura ahí (verificado con
  `getfacl`: el grupo `www-data` tiene acceso vía ACL por defecto, así
  que cualquier archivo que suban queda automáticamente legible por
  Apache).
- **Apache ya sirve esa carpeta** tanto por HTTP (puerto 80, que
  redirige automático a HTTPS) como por HTTPS (puerto 443, con un
  certificado **autofirmado** — no es de una autoridad certificadora
  real, así que el navegador va a mostrar una advertencia de seguridad
  la primera vez; hay que darle "Avanzado" → "Continuar de todos modos".
  Esto es normal mientras no tengan un dominio propio con certificado de
  Let's Encrypt).
- No hay que tocar `/etc/apache2/` para nada de esto — esa parte es
  responsabilidad de los administradores del servidor.

## 1. Subir el sitio (cada vez que haya cambios)

Desde tu computadora, dentro de la carpeta del proyecto, usa
`scripts/deploy.sh` — ya tiene los datos de arriba precargados. Cada
despliegue es simplemente:

```bash
bash scripts/deploy.sh
```

Eso corre `npm run build` y sube el contenido de `dist/` a
`/var/www/html/facultad` en el servidor (por `rsync` si está disponible,
o por `scp` si no). Al terminar, entra a `https://200.23.125.107/`
(acepta la advertencia del certificado autofirmado) — deberías ver el
sitio actualizado.

**Nota:** `rsync --delete` borra en el servidor cualquier archivo que ya
no exista en tu `dist/` local — así no se van acumulando versiones
viejas de los archivos con hash que genera Vite.

## 2. Variables de entorno

Como el sitio es estático, `VITE_PAGWEB_API_URL` y `VITE_ADMISIONES_API_URL`
(ver `.env.example`) **quedan incluidas dentro del código JavaScript
generado por `npm run build`** — no se configuran en el servidor Ubuntu
como sí se haría en Vercel. Antes de construir para producción, pon en tu
`.env.local` la URL pública real de las APIs (ej.
`https://200.23.125.107:4000` sin el proxy de Apache de la sección 3, o
una ruta relativa si sí lo configuraste), o el sitio se subirá apuntando
a `localhost`.

## 3. Desplegar las APIs propias (pagweb-api y admisiones-api)

El sitio (`dist/`) sigue siendo estático — esto es aparte: dos procesos
Node pequeños que le dan al sitio login, CRUD del panel y archivos (ver
`services/pagweb-api/README.md`), corriendo en el mismo servidor porque
Postgres solo acepta conexiones locales ahí (`localhost`, el mismo que usa
phpPgAdmin).

### Preparación de una sola vez

Por SSH (`ssh team3-feca@200.23.125.107`):

```bash
# 1. Instalar Node (si no está) y pm2 (mantiene los procesos vivos y los
#    reinicia solos si el servidor se reinicia).
sudo apt update && sudo apt install -y nodejs npm
sudo npm install -g pm2

# 2. Carpeta para el código de las APIs — FUERA de /var/www/html/facultad,
#    porque ahí rsync --delete borra todo lo que no venga en el próximo
#    npm run build del sitio.
sudo mkdir -p /opt/facultad-api
sudo chown team3-feca:team3-feca /opt/facultad-api

# 3. Carpeta para los archivos subidos desde el panel (imágenes,
#    documentos de egresados) — misma razón, fuera del docroot.
sudo mkdir -p /var/www/html/facultad-uploads
sudo chown team3-feca:team3-feca /var/www/html/facultad-uploads
```

Después de correr `scripts/deploy-api.sh` la primera vez (sube el código a
`/opt/facultad-api/pagweb-api` y `/opt/facultad-api/admisiones-api`), crea
el `.env` de cada uno directo en el servidor (nunca por git — son
secretos):

```bash
cd /opt/facultad-api/pagweb-api && cp .env.example .env && nano .env
cd /opt/facultad-api/admisiones-api && cp .env.example .env && nano .env
```

En ambos `.env`: mismas credenciales de Postgres (`PGHOST=localhost`,
etc.) y el **mismo** `JWT_SECRET` en los dos (así `admisiones-api` puede
validar la sesión que emite `pagweb-api`). En `pagweb-api`, además:
`UPLOADS_DIR=/var/www/html/facultad-uploads` y `SITE_URL=https://200.23.125.107`.

```bash
# Sembrar la primera cuenta de administrador
cd /opt/facultad-api/pagweb-api && npm run seed-admin -- correo@ujed.mx "contraseña" "Nombre"

# Arrancar ambos con pm2 y dejarlos sobreviviendo a un reinicio
cd /opt/facultad-api/pagweb-api && pm2 start src/index.js --name pagweb-api
cd /opt/facultad-api/admisiones-api && pm2 start src/index.js --name admisiones-api
pm2 save
pm2 startup   # sigue la instrucción que imprime (un sudo <comando> de una sola línea)
```

### Cada vez que haya cambios en las APIs

```bash
bash scripts/deploy-api.sh
```

El script usa `rsync` si está disponible; si no (p. ej. Git Bash en
Windows, que no lo trae), cae a `tar | ssh`. Pedirá la contraseña SSH
varias veces (una por conexión).

### Apache: proxy `/api` (ya configurado en el servidor)

Para que el sitio llame a las APIs por el **mismo origen**
(`https://200.23.125.107/api/...`) y no por un puerto aparte con otro
certificado, el `VirtualHost *:443` de `/etc/apache2/sites-available/default-ssl.conf`
tiene estas líneas (requiere `sudo a2enmod proxy proxy_http` una vez):

```apache
ProxyPreserveHost On
# admisiones-api (:4001): solo /api/solicitudes y /api/solicitudes/<id>
ProxyPassMatch ^/api/solicitudes(/.*)?$ http://localhost:4001/api/solicitudes$1
# pagweb-api (:4000): el resto de /api/*
ProxyPass /api/ http://localhost:4000/api/
ProxyPassReverse /api/ http://localhost:4000/api/
```

El orden importa: la regla específica de `/api/solicitudes` va **antes**
de la general `/api/`. Tras editar: `sudo apache2ctl configtest` y
`sudo systemctl reload apache2`.

### Rebuild del sitio apuntando a las APIs del servidor

El sitio es estático, así que las URLs de las APIs quedan **horneadas en
el bundle** al construir. En local existe `.env.production.local` (no se
sube a git) con:

```
VITE_PAGWEB_API_URL=https://200.23.125.107
VITE_ADMISIONES_API_URL=https://200.23.125.107
```

`npm run build` lo usa (y `npm run dev` NO — ese sigue con `.env.local` y
`localhost`). Después: `bash scripts/deploy.sh` para subir `dist/`.

> **Caché del navegador:** quien ya haya abierto el sitio antes tendrá el
> `index.html`/JS viejo hasta hacer `Ctrl+Shift+R`. Si molesta, agregar
> al vhost `<FilesMatch "index\.html$"><Header set Cache-Control "no-cache"></FilesMatch>`
> (`sudo a2enmod headers`), dejando que los `assets/` con hash se
> cacheen normal.

## 4. Cuando tengan un dominio propio: certificado real (Let's Encrypt)

El certificado autofirmado actual sirve para probar, pero siempre va a
mostrar advertencia en el navegador. Si en algún momento apuntan un
dominio real a `200.23.125.107` (registro DNS tipo A), pídanle a quien
administra el servidor que corra esto (requiere acceso a
`/etc/apache2/`, que el usuario `team3-feca` no tiene):

```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d tu-dominio.com
```

Certbot edita la configuración de Apache solo, agrega el certificado real
y deja todo sirviendo por HTTPS con renovación automática.
