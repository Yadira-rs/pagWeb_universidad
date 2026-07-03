# Sitio web FECA (UJED)

Sitio web de la Facultad de Economía, Contaduría y Administración de la
Universidad Juárez del Estado de Durango, hecho con React + Vite.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior.

## Desarrollo local

```
npm install
npm run dev
```

Esto levanta el sitio en `http://localhost:5173` (o el siguiente puerto
libre) con recarga automática al guardar cambios.

## Generar la versión de producción

```
npm run build
```

Esto crea una carpeta `dist/` con el sitio ya optimizado y listo para
publicar (HTML, CSS, JavaScript, imágenes y los PDFs de `public/docs/`).

Puedes revisar cómo se ve ese resultado localmente antes de publicarlo:

```
npm run preview
```

---

## Cómo publicar el sitio en el servidor institucional

Este sitio es **100% estático**: no tiene backend activo, no necesita PHP
ni base de datos para funcionar. Además, todas sus rutas usan `#` (por
ejemplo `#/grupos-representativos`), así que el navegador las maneja
solo — **no se necesita configurar reglas de redirección en el
servidor**, algo que sí hace falta en la mayoría de los sitios hechos en
React.

En resumen: cualquier servidor web (Apache, Nginx, IIS, cPanel
compartido, etc.) puede publicarlo sin configuración especial.

### Paso 1: Generar la build

```
npm run build
```

La carpeta `dist/` es lo único que hay que subir al servidor.

### Paso 2: Preguntar al área de sistemas de la institución

Antes de subir nada, hay que pedir tres datos:

1. **Cómo se van a subir los archivos**: ¿panel tipo cPanel con
   administrador de archivos? ¿FTP/SFTP (te dan host, usuario y
   contraseña)? ¿acceso por SSH?
2. **Cuál es la carpeta raíz pública** del servidor, donde hay que
   colocar el sitio (comúnmente se llama `public_html`, `htdocs` o
   `www`).
3. **En qué dominio o subdominio** va a quedar publicado (por ejemplo
   `feca.ujed.mx` o `www.ujed.mx/feca`).

### Paso 3: Subir el contenido de `dist/`

Importante: se sube el **contenido** de la carpeta `dist/` (los archivos
que están adentro), **no la carpeta `dist` en sí**. Es decir,
`index.html` debe quedar directamente dentro de la carpeta raíz pública
del servidor, no dentro de una subcarpeta llamada `dist`.

**Si te dan acceso a cPanel / Administrador de archivos:**
1. Comprime el contenido de `dist/` en un `.zip` (todo lo que está
   *dentro* de `dist/`, no la carpeta en sí).
2. Entra al Administrador de Archivos de cPanel y navega hasta
   `public_html` (o la subcarpeta que te indiquen).
3. Sube el `.zip` y usa la opción "Extraer" ahí mismo.
4. Verifica que `index.html` haya quedado directamente en esa carpeta.

**Si te dan acceso por FTP/SFTP:**
1. Usa un programa como [FileZilla](https://filezilla-project.org/) o
   WinSCP.
2. Conéctate con el host, usuario y contraseña que te dieron.
3. Arrastra todo el contenido de `dist/` hacia la carpeta pública del
   servidor.

**Si te dan acceso por SSH:**
```
scp -r dist/* usuario@servidor:/ruta/a/public_html/
```
o, si prefieres `rsync` (más rápido en subidas posteriores, porque solo
copia lo que cambió):
```
rsync -avz dist/ usuario@servidor:/ruta/a/public_html/
```

### Algo a tener en cuenta

La carpeta `public/docs/` tiene muchos PDFs (organigramas, reglamentos,
planes de estudio, avisos de privacidad, etc.) que se incluyen tal cual
dentro de `dist/docs/`. En total pesa varios MB, así que la primera
subida puede tardar más de lo esperado, especialmente por FTP.

### Actualizaciones futuras

Cada vez que se haga un cambio de contenido o diseño en el código:

1. `npm run build` de nuevo (genera un `dist/` actualizado).
2. Volver a subir el contenido de `dist/`, reemplazando lo que ya estaba
   en el servidor.

---

## Base de datos (trabajo a futuro)

En la carpeta [`database/`](database/) hay un esquema de base de datos
(PostgreSQL, compatible con Supabase) ya diseñado y probado para cuando
se retome el proyecto del panel de administración, que permitirá editar
el contenido del sitio sin tocar código. Ese panel todavía no existe —
por ahora el sitio sigue siendo estático, como se describe arriba.
