# Guion de Exposición — Rediseño del Portal FECA mediante SOA

**14 diapositivas · 4 partes · un integrante por parte**

> Versión final: incorpora las correcciones sobre el flujo de acceso ya automatizado (antes decía "manual") y la URL real de producción. El resto del contenido ya se verificó contra el código y los servicios corriendo en vivo — no necesita cambios.

---

## Parte 1 — Lucia Medina
### Contexto del proyecto · Diapositivas 1–4

**Idea central de esta parte:** presentarnos, y dejar claro *qué problema* existía antes de tocar cualquier tema técnico.

**#1 — Título**
> Buenas tardes. Nosotras somos: Cindy Reyes, Iris Santiago, Danna Robles y Lucia Medina, del grupo 6°B. Hoy les presentamos el rediseño e implementación del portal de la FECA, enfocado en la arquitectura: cómo lo construimos usando una Arquitectura Orientada a Servicios, o SOA.

**#2 — Contexto del Proyecto**
> Este proyecto nació como una iniciativa real de modernización institucional, con el respaldo y la retroalimentación directa de los directivos de la facultad. La propuesta de valor se resume en tres cosas: centralizar toda la información académica y administrativa en un solo lugar, digitalizar el módulo de solicitudes de admisión, y construir todo esto con una arquitectura de microservicios independientes en vez de un solo bloque de código monolítico.

**#3 — Problema Actual**
> Antes de este proyecto, el sitio anterior de la FECA tenía tres problemas claros: la navegación no era intuitiva, no existía ningún proceso digital para las solicitudes de admisión —todo era presencial— y la arquitectura que tenían no estaba pensada para crecer. Ese diagnóstico fue justo el punto de partida para todo lo que van a ver después.

**#4 — Justificación y Objetivos (divisor)**
> Con eso claro, pasamos a la justificación y los objetivos del proyecto.

---

## Parte 2 — Cindy Alejandra Reyes Arce
### Análisis y estructura · Diapositivas 5–7

**Idea central de esta parte:** por qué vale la pena el proyecto, qué contiene, y con qué herramientas se construyó.

**#5 — Análisis de la Idea**
> La justificación es doble: por un lado había una necesidad real de digitalizar y mejorar la comunicación entre la comunidad y la facultad; por otro, era una oportunidad de aplicar en un entorno real todo lo que hemos visto de desarrollo web, SOA y seguridad informática. De ahí sale el objetivo general: diseñar e implementar un portal moderno usando Arquitectura Orientada a Servicios. Y los objetivos específicos se resumen en cuatro: modernizar la imagen, centralizar servicios y oferta educativa, digitalizar el proceso de admisión, e implementar SOA con comunicaciones seguras y escalables.

**#6 — Estructura del Sistema y Contenido**
> El portal integra toda la oferta educativa de la facultad —Contador Público, Administración, Economía y Negocios Internacionales, Posgrado y el Centro de Idiomas—, además de departamentos como CIIEDO y CELCI, y servicios como FECA Store o CAFECA. Y del lado del código, el proyecto está organizado en cuatro carpetas principales: `src` para el frontend en React, `services` donde viven nuestros dos microservicios propios —admisiones-api y notificaciones-api—, `supabase` para las Edge Functions y la base de datos, y `tests` para las pruebas automatizadas con Playwright.

**#7 — Stack Tecnológico**
> En cuanto a tecnologías: el frontend es React con Vite, el backend de los microservicios está en Node.js con Express, y usamos Supabase para base de datos PostgreSQL, autenticación y Edge Functions. La seguridad se maneja con dos capas: JWT de Supabase Auth para los usuarios, y un token de servicio, X-Service-Token, para la comunicación entre nuestros propios microservicios. Y para el envío de correos usamos Resend.

---

## Parte 3 — Iris Yadira Santiago Santos
### Arquitectura y seguridad (parte técnica) · Diapositivas 8–10

**Idea central de esta parte:** el corazón técnico — cómo están armados los microservicios, cómo se protegen entre sí, y cómo eso cumple la rúbrica punto por punto. Aquí es donde más preguntas de defensa técnica pueden llegar.

**#8 — Arquitectura Orientada a Servicios (SOA)**
> Aquí está el corazón técnico del proyecto: la Arquitectura Orientada a Servicios. Este es nuestro diagrama de arquitectura [mostrar diapositiva con el diagrama de `ARQUITECTURA.md`] — las flechas muestran la dirección real en la que se comunica cada parte, no es un esquema aspiracional.
>
> Tenemos cinco piezas. El **Frontend**, que es todo lo que ven en pantalla, incluido el panel de administración, vive en la carpeta `src` del repositorio. Dos microservicios propios, construidos por nosotras: **Admisiones API**, en el puerto 4001, que vive en `services/admisiones-api`, y es la única dueña de la tabla de solicitudes de admisión; y **Notificaciones API**, en el puerto 4002, en `services/notificaciones-api`, dueña exclusiva del envío de correos de aviso. Y dos piezas de infraestructura externa que no contamos como servicios propios: **Supabase**, que nos da base de datos, autenticación y almacenamiento; y **Resend**, que es quien realmente manda el correo.
>
> Cada microservicio tiene su propio `package.json` y su propio proceso — se comunican entre sí únicamente por HTTP, usando un token compartido, X-Service-Token, que se valida con una función criptográfica elegida específicamente para evitar ataques de temporización, `crypto.timingSafeEqual`. Y todo esto es escalable: podemos agregar más microservicios sin tener que tocar los que ya existen.

**#9 — Administración del Sitio y Seguridad** *(corregida)*
> La autenticación está implementada con Supabase Auth, sin ninguna credencial escrita directamente en el código. Tenemos un administrador principal que aprueba o rechaza accesos, y administradores invitados que solo pueden editar contenido y consultar solicitudes. El flujo completo de alta de un nuevo administrador ya está automatizado de punta a punta: la persona pide acceso desde el login, el administrador principal aprueba con un clic, y en ese momento una Edge Function crea la cuenta en Supabase Auth y le manda un correo de invitación para que elija su propia contraseña — ya no hace falta darla de alta a mano ni compartir credenciales por fuera del sistema.

**#10 — Evaluación de la Rúbrica de la Materia**
> Y para cerrar la parte técnica, así es como cubrimos los criterios de la rúbrica de la materia. En autonomía, que vale 25%, demostramos que si apagamos Notificaciones API, Admisiones API sigue funcionando: solo registra `notified` en falso, sin tumbar la respuesta al usuario. En contratos HTTP, exponemos claramente los verbos GET, POST, PATCH y DELETE, más un endpoint de salud. El acoplamiento es bajo: la comunicación es estrictamente servidor a servidor. Y en seguridad, validamos el JWT localmente, los tokens de servicio nunca se exponen al cliente, y Notificaciones API ni siquiera tiene configurado CORS, porque no lo necesita: nunca la llama un navegador.

**Demo en vivo** *(sin número de diapositiva — se hace en pantalla, justo después de la #10)*
> Y para no quedarnos solo en la explicación, se los mostramos funcionando. [Abrir `#/solicitud` en el sitio, llenar el formulario con datos de prueba y enviarlo.] Lo que acaba de pasar es una petición POST real hacia nuestra Admisiones API, en el puerto 4001 — la pueden ver aquí mismo, en las herramientas de red del navegador, junto con la respuesta 201 confirmando que la solicitud quedó guardada. [Cambiar a `#/admin`, entrar con la sesión ya iniciada, abrir la pestaña "Solicitudes de admisión".] Y aquí está esa misma solicitud que acabamos de mandar, ya visible para el administrador — esta vista se trae con una petición GET protegida por el token de sesión, la misma autenticación que les explicamos hace un momento.
>
> *(Si algo falla en vivo: tenemos un video grabado de este mismo flujo como respaldo — ver `ARQUITECTURA.md`, sección 5.)*

---

## Parte 4 — Danna Michell Robles
### Retos, resultados y cierre · Diapositivas 11–14

**Idea central de esta parte:** bajar del tema técnico a la experiencia humana del equipo, y cerrar con lo que se logró.

**#11 — Retos Encontrados**
> Como en todo proyecto en equipo, tuvimos retos. Coordinarnos a distancia con horarios distintos fue un reto constante. Los requerimientos cambiaron sobre la marcha conforme tuvimos más reuniones con los directivos. También hubo demoras en que nos entregaran cierta información institucional, y tuvimos que adaptarnos. Y técnicamente, el reto más grande fue diseñar bien la arquitectura SOA desde cero, y manejar de forma segura la autenticación y los posibles fallos entre servicios.

**#12 — Resultados Obtenidos** *(corregida)*
> ¿Qué logramos? Una interfaz modernizada y coherente con la identidad visual de la FECA. Un sistema funcional para digitalizar las solicitudes de admisión. Una arquitectura robusta, con microservicios independientes, autónomos y escalables. Y un flujo de gestión de accesos completamente automatizado: de la solicitud a la cuenta creada e invitada, sin ningún paso manual.

**#13 — Conclusiones**
> En conclusión: le entregamos a la FECA una herramienta real, moderna y escalable, no un ejercicio de salón de clases. A nivel técnico, esto nos dejó experiencia real aplicando arquitecturas orientadas a servicios, seguridad en APIs, e integración entre backend y frontend. Y a nivel de equipo, nos dejó mucho aprendizaje en comunicación, adaptación al cambio, y resolución de problemas técnicos complejos.

**#14 — Cierre** *(corregida)*
> Muchas gracias por su atención. Quedamos abiertas a sus preguntas, y les dejamos el link al sitio en producción, **pag-web-universidad.vercel.app**, y al repositorio en GitHub por si quieren revisar el código.

---

## Antes de exponer

- **Ensayen la transición entre partes** — cada quien debe saber con qué frase termina la persona anterior, para no encimarse ni dejar silencios.
- **Cualquiera puede recibir preguntas de cualquier parte** — la rúbrica lo pide explícitamente en Defensa técnica (25%): "se puede preguntar a cualquier integrante sobre cualquier parte del sistema".
- **Lleven la demo en vivo lista** (`#/solicitud` → ver la petición real en las herramientas de red → verla aparecer en `#/admin`) y un video de respaldo por si algo falla — ver [ARQUITECTURA.md, sección 5](ARQUITECTURA.md).
- **Preparen que alguien apague un servicio en vivo** durante la defensa y pidan explicar qué pasa con el resto del sistema — ver [ARQUITECTURA.md, sección 6](ARQUITECTURA.md) para las respuestas ya redactadas.
