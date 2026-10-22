# Migrar el sitio FECA a otro servidor

Paso a paso para mudar el sitio, las dos APIs, la base de datos y los
archivos subidos a un servidor nuevo, sin apagar el actual hasta comprobar
que el nuevo funciona. Usa AWS como ejemplo, pero los pasos sirven para
cualquier servidor con Ubuntu.

## Qué se muda

El sitio tiene cinco piezas, y cada una se pasa al servidor nuevo de una
forma distinta. Las dos primeras salen del repositorio de código. Las otras
tres solo existen en el servidor actual y hay que copiarlas de ahí.

| Pieza | En el servidor actual (`200.23.125.107`) | En el servidor nuevo | Cómo se pasa |
| --- | --- | --- | --- |
| Sitio público | `/var/www/html/facultad` | Apache + sitio | `bash scripts/deploy.sh` |
| Las dos APIs (Node) | `/opt/facultad-api/` | APIs con pm2 | `bash scripts/deploy-api.sh` |
| Configuración (`.env`) | Un `.env` por API | `.env` con datos nuevos | Copiar y editar a mano |
| Base PostgreSQL | Base `feca-ujed-web` | PostgreSQL 18 (o RDS) | `pg_dump` y `pg_restore` |
| Archivos subidos | `/var/www/html/facultad-uploads` | `facultad-uploads` | `tar` y `scp` |

La base de datos y los archivos subidos son lo único que no se puede volver
a generar. Respáldalos primero y no borres nada del servidor actual hasta
comprobar que el nuevo funciona.

## Antes de empezar

La migración se hace sin apagar el servidor actual: primero se arma el
nuevo, se prueba y solo al final se cambia. El cambio de dominio puede
tardar unas horas en verse en todas las redes, así que conviene hacerlo en
un horario de poco uso.

### Requisitos del servidor nuevo

| Pieza | Versión | Nota |
| --- | --- | --- |
| Sistema operativo | Ubuntu 24.04 LTS o más reciente | Los comandos de esta guía son para Ubuntu. |
| Node.js | 18 o más reciente (se recomienda 22 LTS) | Para las dos APIs. |
| pm2 | La más reciente | Mantiene las APIs encendidas. |
| PostgreSQL | 18 (la misma del servidor actual, 18.6) | Una versión igual o mayor evita problemas al restaurar. |
| Apache 2 | La de Ubuntu | Con los módulos `proxy`, `proxy_http`, `ssl` y `headers`. |
| Memoria y disco | 2 GB de RAM y 20 GB de disco como mínimo | El sitio es ligero; el disco crece con los archivos subidos. |

### Lo que debes tener a la mano

- [ ] Acceso SSH al servidor actual (`team3-feca@200.23.125.107`) y al nuevo
- [ ] Una copia del proyecto en tu computadora
- [ ] Los dos `.env` actuales: `/opt/facultad-api/pagweb-api/.env` y `/opt/facultad-api/admisiones-api/.env`
- [ ] Los datos de la cuenta de correo SMTP
- [ ] Acceso al dominio, si ya hay uno, para cambiar su registro DNS
- [ ] Un aviso al personal de que no edite el panel durante el cambio final

## Ejemplo en AWS

La forma más sencilla en AWS es una sola máquina **EC2** con todo dentro,
igual que el servidor actual. Si se quiere que AWS se encargue de los
respaldos de la base, se agrega **RDS** para PostgreSQL. Los pasos de esta
guía sirven para las dos opciones.

| | Opción A: todo en EC2 | Opción B: EC2 + RDS |
| --- | --- | --- |
| Dónde vive la base | En la misma máquina | En RDS, servicio aparte |
| Respaldos de la base | Los haces tú (`pg_dump`) | Automáticos, los hace AWS |
| Dificultad | Menor | Un paso más |
| Costo | Menor | Mayor |
| Recomendada para | Empezar, presupuesto ajustado | Uso a largo plazo |

Los precios cambian según la región y el tipo de cuenta. Consúltalos en la
[calculadora de AWS](https://calculator.aws/) antes de crear nada.

### Crear la máquina EC2

1. En la consola de AWS abre **EC2** y elige **Launch instance**.
2. Imagen: **Ubuntu Server 24.04 LTS**.
3. Tipo: una instancia con al menos 2 GB de RAM, por ejemplo `t3.small`.
4. Par de llaves: crea uno nuevo y guarda el archivo `.pem`. Sin ese archivo no se puede entrar por SSH.
5. Disco: 20 GB o más, tipo `gp3`.
6. Crea un **Security Group** con las reglas de la tabla de abajo.
7. Después de crearla, asígnale una **Elastic IP**. Así la IP no cambia cuando la máquina se reinicia.

Para entrar: `ssh -i llave.pem ubuntu@<ELASTIC_IP>`. En AWS el usuario de
Ubuntu es `ubuntu`, no `team3-feca`.

### Puertos del Security Group

| Puerto | Para qué | Quién puede entrar |
| --- | --- | --- |
| 22 | SSH | Solo tu IP (opción "My IP") |
| 80 | HTTP (redirige a HTTPS) | Cualquiera (`0.0.0.0/0`) |
| 443 | HTTPS, el sitio | Cualquiera (`0.0.0.0/0`) |

No abras los puertos 4000, 4001 ni 5432. Las APIs y la base solo deben ser
accesibles desde dentro de la máquina; Apache es la única puerta de entrada.

### Si usas RDS (opción B)

1. En **RDS** elige **Create database**, motor **PostgreSQL 18**.
2. Desactívale el acceso público (**Public access: No**).
3. En su Security Group, permite el puerto 5432 **solo desde el Security Group de la EC2**.
4. Anota el *endpoint* que muestra RDS: va en `PGHOST` de los dos `.env`.
5. En el Paso 2 ya no instales PostgreSQL en la EC2, solo el cliente: `sudo apt install -y postgresql-client`.

RDS pide conexiones cifradas por defecto. Las APIs aún no activan SSL al
conectarse, así que hay que agregar `ssl: { rejectUnauthorized: false }` en
`services/pagweb-api/src/db.js` y `services/admisiones-api/src/db.js`, o
desactivar `rds.force_ssl` en el grupo de parámetros de RDS.

## Paso 1: respaldar el servidor actual

Se necesitan cuatro cosas del servidor actual: la base de datos, los
archivos subidos desde el panel y los dos `.env`. El código no hace falta
copiarlo, porque viene del repositorio.

Entra por SSH al servidor actual y corre:

```bash
mkdir -p ~/migracion
cd /opt/facultad-api/pagweb-api && set -a && . ./.env && set +a

# 1. Base de datos completa (formato comprimido de pg_dump)
pg_dump -h "$PGHOST" -U "$PGUSER" -d "$PGDATABASE" -F c --no-owner --no-privileges -f ~/migracion/feca-ujed-web.dump

# 2. Archivos subidos desde el panel
tar -czf ~/migracion/uploads.tar.gz -C /var/www/html facultad-uploads

# 3. Los dos archivos de configuración
cp /opt/facultad-api/pagweb-api/.env ~/migracion/pagweb-api.env
cp /opt/facultad-api/admisiones-api/.env ~/migracion/admisiones-api.env

ls -lh ~/migracion
```

`--no-owner` y `--no-privileges` hacen que el respaldo no dependa del
usuario `team3feca` de la base actual, así se puede restaurar con cualquier
usuario en el servidor nuevo.

Después, desde tu computadora, bájalos:

```bash
scp -r team3-feca@200.23.125.107:~/migracion ./migracion-feca
```

La carpeta `migracion-feca` contiene contraseñas. Guárdala en un lugar
privado, **fuera de la carpeta del proyecto**, y bórrala cuando termine la
migración.

Si no tienes SSH, la base también se puede exportar desde phpPgAdmin:
"Estructura y datos", formato SQL, "Eliminar" sin marcar, "Descargar". En
ese caso se restaura con `psql` en vez de `pg_restore` (Paso 3).

## Paso 2: preparar el servidor nuevo

Entra por SSH al servidor nuevo y corre estos bloques en orden. Donde dice
`$USER` se usa el usuario con el que entraste (en AWS, `ubuntu`).

### Node.js y pm2

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v   # debe mostrar v22.x
```

### PostgreSQL 18

Omite este bloque si usas RDS. Ubuntu no trae la versión 18 por defecto,
así que se agrega el repositorio oficial de PostgreSQL:

```bash
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
sudo apt install -y postgresql-18
```

Crea el usuario y la base. Cambia `CONTRASEÑA_SEGURA` por una nueva y
anótala, va en los `.env` del Paso 4:

```bash
sudo -u postgres psql -c "create user feca_app with password 'CONTRASEÑA_SEGURA';"
sudo -u postgres psql -c "create database \"feca-ujed-web\" owner feca_app;"
```

Con RDS, la base y el usuario se crean desde la consola de RDS, o con
`psql -h <endpoint> -U postgres` y los mismos dos comandos.

### Apache y carpetas

```bash
sudo apt install -y apache2
sudo a2enmod proxy proxy_http ssl headers rewrite

sudo mkdir -p /opt/facultad-api /var/www/html/facultad /var/www/html/facultad-uploads
sudo chown -R $USER:$USER /opt/facultad-api /var/www/html/facultad /var/www/html/facultad-uploads
```

Los archivos subidos van en `facultad-uploads`, fuera de la carpeta del
sitio, porque el script de despliegue borra de `facultad` todo lo que no
venga en la nueva versión del sitio.

## Paso 3: restaurar la base de datos

Desde tu computadora, sube el respaldo al servidor nuevo:

```bash
scp -i llave.pem -r ./migracion-feca ubuntu@<IP_NUEVA>:~/migracion
```

En el servidor nuevo, restáuralo con el usuario que creaste en el Paso 2.
Te pedirá su contraseña:

```bash
pg_restore -h localhost -U feca_app -d feca-ujed-web --no-owner --no-privileges ~/migracion/feca-ujed-web.dump
```

Con RDS, cambia `localhost` por el endpoint de RDS. Si exportaste desde
phpPgAdmin en formato SQL, usa en su lugar
`psql -h localhost -U feca_app -d feca-ujed-web -f archivo.sql`.

Comprueba que llegaron los datos:

```bash
psql -h localhost -U feca_app -d feca-ujed-web -c "select count(*) from admin_users;"
```

Debe mostrar el mismo número de cuentas que el servidor actual.

### Corregir las direcciones de los archivos subidos

Cuando alguien sube una imagen o documento desde el panel, la base guarda
su dirección completa con la IP del servidor, por ejemplo
`http://200.23.125.107/api/uploads/site-media/foto.jpg`. En el servidor
nuevo esas direcciones seguirían apuntando al viejo, y las imágenes
dejarían de verse cuando se apague.

Esta consulta revisa todas las columnas de texto de la base y cambia la
dirección vieja por la nueva. Cambia `https://NUEVO-DOMINIO` por el dominio
o la IP nueva, sin `/` al final, y córrela una sola vez:

```sql
do $$
declare r record; n int;
begin
  for r in select table_name, column_name from information_schema.columns
           where table_schema = 'public' and data_type in ('text', 'character varying') loop
    execute format(
      'update %I set %I = replace(replace(%I, %L, %L), %L, %L) where %I like %L',
      r.table_name, r.column_name, r.column_name,
      'https://200.23.125.107', 'https://NUEVO-DOMINIO',
      'http://200.23.125.107', 'https://NUEVO-DOMINIO',
      r.column_name, '%200.23.125.107%');
    get diagnostics n = row_count;
    if n > 0 then raise notice '%.%: % filas cambiadas', r.table_name, r.column_name, n; end if;
  end loop;
end $$;
```

Para correrla: `psql -h localhost -U feca_app -d feca-ujed-web`, pega el
bloque y presiona Enter. Al final muestra qué tablas cambió. Si no muestra
nada, ningún archivo tenía la IP vieja.

Si la migración es a otra IP sin dominio, cambia `https://NUEVO-DOMINIO`
por `https://<IP_NUEVA>`.

## Paso 4: instalar las APIs

### Que los scripts de despliegue apunten al servidor nuevo

Los scripts del proyecto ya saben subir el código; solo hay que decirles a
qué servidor. En tu computadora, edita la parte de arriba de
`scripts/deploy.sh` y `scripts/deploy-api.sh`:

```bash
SERVER_USER="ubuntu"
SERVER_HOST="<IP_NUEVA o dominio>"
```

En AWS se entra con el archivo `.pem`. Para que los scripts lo usen solos,
agrega esto a `~/.ssh/config` en tu computadora:

```
Host <IP_NUEVA o dominio>
  User ubuntu
  IdentityFile ~/ruta/a/llave.pem
```

Luego sube el código de las APIs (instala dependencias y las arranca con
pm2):

```bash
bash scripts/deploy-api.sh
```

La primera vez van a fallar al arrancar, porque todavía no tienen `.env`.
Es normal.

### Crear los .env

En el servidor nuevo, copia los `.env` del respaldo:

```bash
cp ~/migracion/pagweb-api.env /opt/facultad-api/pagweb-api/.env
cp ~/migracion/admisiones-api.env /opt/facultad-api/admisiones-api/.env
nano /opt/facultad-api/pagweb-api/.env
```

Cambia estos valores en los dos archivos:

| Variable | Valor nuevo |
| --- | --- |
| `PGHOST` | `localhost`, o el endpoint de RDS |
| `PGUSER` | `feca_app` (el usuario del Paso 2) |
| `PGPASSWORD` | La contraseña nueva del Paso 2 |
| `CORS_ORIGIN` | `https://NUEVO-DOMINIO` |
| `SITE_URL` (solo pagweb-api) | `https://NUEVO-DOMINIO` |
| `UPLOADS_DIR` (solo pagweb-api) | `/var/www/html/facultad-uploads` |

Deja igual `JWT_SECRET` (el mismo en las dos APIs), los datos `SMTP_*`,
`MAIL_FROM` y `NOTIFY_EMAIL`.

### Arrancar y dejar fijas las APIs

```bash
pm2 restart pagweb-api admisiones-api
pm2 ls                 # las dos deben decir "online"
pm2 logs pagweb-api    # no debe haber errores de conexión a la base
pm2 save
pm2 startup            # copia y corre el comando sudo que imprime
```

`pm2 startup` hace que las APIs se enciendan solas si el servidor se
reinicia. Las cuentas del panel ya vienen en la base restaurada, así que no
hace falta `seed-admin`.

## Paso 5: el sitio, los archivos y Apache

### Subir el sitio

En tu computadora, confirma que existe `.env.production.local` con las dos
variables vacías. Así el sitio llama a `/api` en el mismo servidor desde el
que se abre, sin importar su IP o dominio:

```
VITE_PAGWEB_API_URL=
VITE_ADMISIONES_API_URL=
```

Después:

```bash
bash scripts/deploy.sh
```

### Restaurar los archivos subidos

En el servidor nuevo:

```bash
tar -xzf ~/migracion/uploads.tar.gz -C /var/www/html
sudo chgrp -R www-data /var/www/html/facultad-uploads
ls /var/www/html/facultad-uploads    # deben aparecer las carpetas de archivos
```

### Configurar Apache

En el servidor actual esto lo configuraron los administradores de la FECA.
En el nuevo hay que hacerlo a mano. Crea el archivo del sitio:

```bash
sudo nano /etc/apache2/sites-available/facultad.conf
```

Pega esto y cambia `NUEVO-DOMINIO`:

```apache
<VirtualHost *:80>
    ServerName NUEVO-DOMINIO
    DocumentRoot /var/www/html/facultad

    <Directory /var/www/html/facultad>
        Require all granted
        AllowOverride None
    </Directory>

    ProxyPreserveHost On
    # admisiones-api (:4001): solo /api/solicitudes
    ProxyPassMatch ^/api/solicitudes(/.*)?$ http://localhost:4001/api/solicitudes$1
    # pagweb-api (:4000): el resto de /api
    ProxyPass /api/ http://localhost:4000/api/
    ProxyPassReverse /api/ http://localhost:4000/api/

    # Que el navegador siempre pida la versión nueva de la página
    <FilesMatch "index\.html$">
        Header set Cache-Control "no-cache"
    </FilesMatch>
</VirtualHost>
```

El orden de las reglas importa: la de `/api/solicitudes` va antes que la
general de `/api/`. Actívalo:

```bash
sudo a2dissite 000-default
sudo a2ensite facultad
sudo apache2ctl configtest    # debe decir "Syntax OK"
sudo systemctl reload apache2
```

Prueba en el navegador `http://<IP_NUEVA>/`. Debe abrir el sitio, y
`http://<IP_NUEVA>/api/auth/session` debe responder un error 401 en formato
JSON.

## Paso 6: dominio, HTTPS y cambio definitivo

### Apuntar el dominio y activar HTTPS

1. En el proveedor del dominio, crea o cambia un registro **tipo A** que apunte a la IP nueva (la Elastic IP en AWS).
2. Espera a que el dominio ya abra el servidor nuevo. Se puede revisar con `nslookup NUEVO-DOMINIO`.
3. En el servidor nuevo, saca un certificado gratuito de Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d NUEVO-DOMINIO
```

Certbot crea la versión HTTPS del sitio, redirige HTTP a HTTPS y renueva el
certificado solo. Ya no aparecerá la advertencia de seguridad del
navegador.

Sin dominio no se puede sacar un certificado de Let's Encrypt. En ese caso
usa un certificado autofirmado, como en el servidor actual:
`sudo a2ensite default-ssl` y copia ahí las líneas del proxy `/api` del
Paso 5.

### El cambio final

Entre el Paso 1 y hoy pudieron cambiar cosas en el panel. Para no
perderlas:

1. Avisa al personal que no edite el panel durante el cambio.
2. Repite el **Paso 1** en el servidor actual: un respaldo nuevo de la base y de los archivos.
3. En el servidor nuevo, vuelve a restaurar la base reemplazando la que había:

```bash
pm2 stop pagweb-api admisiones-api
pg_restore -h localhost -U feca_app -d feca-ujed-web --no-owner --no-privileges --clean --if-exists ~/migracion/feca-ujed-web.dump
tar -xzf ~/migracion/uploads.tar.gz -C /var/www/html
pm2 start pagweb-api admisiones-api
```

4. Vuelve a correr la consulta que corrige las direcciones de archivos (Paso 3).
5. Revisa la lista de verificación de abajo.
6. Si el sitio también está en Vercel, cambia ahí las variables `VITE_PAGWEB_API_URL` y `VITE_ADMISIONES_API_URL` a `https://NUEVO-DOMINIO`, agrega el dominio de Vercel a `CORS_ORIGIN` en los dos `.env` y vuelve a desplegar en Vercel.

No apagues el servidor viejo de inmediato. Déjalo encendido unas semanas
por si hay que regresar a él, y guarda su último respaldo fuera de los dos
servidores.

Cuando todo funcione, actualiza en la Guía de administración y en
`DEPLOY.md` la IP, el usuario SSH y el dominio nuevos.

## Verificación y problemas comunes

### Lista de verificación

- [ ] `https://NUEVO-DOMINIO/` abre el sitio sin advertencia de seguridad
- [ ] El carrusel, las noticias y los avisos muestran el mismo contenido que el servidor viejo
- [ ] Las imágenes subidas desde el panel se ven (clic derecho, "Abrir imagen": la dirección debe ser la nueva)
- [ ] El login del panel funciona con una cuenta existente
- [ ] Se puede crear, editar y borrar un aviso de prueba desde el panel
- [ ] Se puede subir una imagen nueva desde el panel
- [ ] "¿Olvidaste tu contraseña?" manda el correo y el enlace abre el dominio nuevo
- [ ] La encuesta de satisfacción guarda la opinión y llega el aviso a `NOTIFY_EMAIL`
- [ ] La página de Egresados recibe un documento de prueba
- [ ] `pm2 ls` muestra las dos APIs "online" después de reiniciar el servidor (`sudo reboot`)
- [ ] Hay un respaldo programado de la base en el servidor nuevo

### Problemas comunes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| El sitio abre pero el login dice "No se pudo conectar con el servidor" | Falta el proxy `/api` en Apache o las APIs están apagadas | Revisa el Paso 5 y `pm2 ls`. |
| Error 502 o 503 al usar el panel | Apache no encuentra la API en el puerto 4000 o 4001 | `pm2 logs pagweb-api`; casi siempre es un dato mal escrito en el `.env`. |
| `pm2 logs` dice `password authentication failed` | Usuario o contraseña de PostgreSQL incorrectos | Revisa `PGUSER` y `PGPASSWORD` en los dos `.env`. |
| Con RDS: `no pg_hba.conf entry` o error de SSL | RDS exige conexión cifrada | Aplica el ajuste de SSL de la sección de AWS. |
| `pg_restore` marca errores de `owner` o `role` | El respaldo se hizo sin `--no-owner` | Vuelve a correr `pg_restore` con `--no-owner --no-privileges`. |
| Las imágenes viejas no se ven | Las direcciones en la base siguen con la IP vieja, o faltan los archivos | Corre la consulta del Paso 3 y revisa `/var/www/html/facultad-uploads`. |
| `admisiones-api` responde "Token inválido" | `JWT_SECRET` distinto en las dos APIs | Pon el mismo valor en los dos `.env` y reinicia ambas. |
| Los correos llevan al dominio viejo | `SITE_URL` no se actualizó | Cámbialo en `pagweb-api/.env` y reinicia. |
| No se puede entrar por SSH a la máquina de AWS | La regla del puerto 22 solo permite tu IP anterior, o falta el `.pem` | Actualiza la regla en el Security Group con "My IP". |
