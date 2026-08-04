# Desplegar el sitio en el servidor Ubuntu de la universidad

El sitio ya no depende de Vercel ni de Node.js en el servidor (ver
`database/README.md`, sección "Nota sobre desplegar en un servidor Node
propio"): es HTML/CSS/JS estático que solo necesita un servidor web
sirviendo archivos. El flujo elegido es: **construir en tu computadora
(`npm run build`) y subir la carpeta `dist/` resultante** — el servidor
Ubuntu solo necesita Nginx, nada de Node instalado ahí.

Por ahora se configura por **HTTP simple** (todavía no hay dominio, solo
IP). Al final de este archivo está el paso para agregar HTTPS gratis en
cuanto tengan un dominio apuntando al servidor.

## 1. Preparar el servidor (una sola vez)

Conéctate por SSH al servidor y corre esto:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx

# Carpeta donde van a vivir los archivos del sitio
sudo mkdir -p /var/www/feca/dist
sudo chown -R $USER:$USER /var/www/feca

# Firewall: abre SSH (para no perder el acceso) y HTTP
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx HTTP'
sudo ufw enable   # si ya estaba activo, no pasa nada al repetirlo
sudo ufw status
```

## 2. Configurar el sitio en Nginx

Crea el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/feca
```

Pega esto (reemplaza `SERVER_IP_O_DOMINIO` por la IP del servidor, o el
dominio cuando lo tengan):

```nginx
server {
    listen 80;
    server_name SERVER_IP_O_DOMINIO;

    root /var/www/feca/dist;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    # El sitio usa rutas tipo #/algo (hash), así que el servidor casi
    # siempre solo entrega index.html; el ruteo real ocurre en el navegador.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Los archivos dentro de /assets/ llevan un hash en el nombre (los
    # genera Vite), así que es seguro cachearlos "para siempre": si cambia
    # el contenido, cambia el nombre del archivo.
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # index.html sí debe revisarse siempre, para que la próxima subida se
    # vea de inmediato sin que el navegador lo tenga cacheado.
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

Actívalo y recarga Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/feca /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # quita el sitio de bienvenida por defecto
sudo nginx -t                                  # valida que la configuración esté bien escrita
sudo systemctl reload nginx
```

En este punto, si entras a `http://SERVER_IP_O_DOMINIO/` en el navegador
deberías ver el mensaje "Bienvenido a nginx" reemplazado por un 404 (aún
no hay nada en `/var/www/feca/dist` — eso se resuelve en el siguiente
paso).

## 3. Subir el sitio (cada vez que haya cambios)

Desde tu computadora, dentro de la carpeta del proyecto, usa
`scripts/deploy.sh` (ver ese archivo — edítalo una sola vez con el
usuario, la IP y la ruta de tu servidor). Después, cada despliegue es:

```bash
bash scripts/deploy.sh
```

Eso corre `npm run build` y sube el contenido de `dist/` al servidor por
SCP. Al terminar, recarga `http://SERVER_IP_O_DOMINIO/` — deberías ver el
sitio.

## 4. Variables de entorno

Como el sitio es estático, las variables `VITE_SUPABASE_URL` y
`VITE_SUPABASE_ANON_KEY` (ver `.env.example`) **ya quedan incluidas dentro
del código JavaScript generado por `npm run build`** — no se configuran en
el servidor Ubuntu como sí se haría en Vercel. Asegúrate de tener un
archivo `.env.local` con esos valores en tu computadora *antes* de correr
`npm run build`, o el sitio se subirá sin conexión a Supabase.

## 5. Cuando tengan un dominio: agregar HTTPS gratis

Una vez que `SERVER_IP_O_DOMINIO` en la configuración de Nginx sea un
dominio real apuntando a este servidor (registro DNS tipo A), corre:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
sudo ufw allow 'Nginx Full'   # abre también 443 (HTTPS)
sudo ufw delete allow 'Nginx HTTP'   # ya no hace falta el puerto 80 solo
```

Certbot edita la configuración de Nginx solo, agrega el certificado y deja
todo sirviendo por HTTPS con renovación automática. No hace falta tocar
`server_name` a mano: certbot lo hace.
