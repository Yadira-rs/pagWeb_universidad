# Desplegar el sitio en el servidor Ubuntu de la universidad

El sitio ya no depende de Vercel ni de Node.js en el servidor (ver
`database/README.md`, sección "Nota sobre desplegar en un servidor Node
propio"): es HTML/CSS/JS estático que solo necesita un servidor web
sirviendo archivos. El flujo elegido es: **construir en tu computadora
(`npm run build`) y subir la carpeta `dist/` resultante** — el servidor
Ubuntu solo necesita Apache, nada de Node instalado ahí.

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

Como el sitio es estático, las variables `VITE_SUPABASE_URL` y
`VITE_SUPABASE_ANON_KEY` (ver `.env.example`) **ya quedan incluidas dentro
del código JavaScript generado por `npm run build`** — no se configuran en
el servidor Ubuntu como sí se haría en Vercel. Asegúrate de tener un
archivo `.env.local` con esos valores en tu computadora *antes* de correr
`npm run build`, o el sitio se subirá sin conexión a Supabase.

## 3. Cuando tengan un dominio propio: certificado real (Let's Encrypt)

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
