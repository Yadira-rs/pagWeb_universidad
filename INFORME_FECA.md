# Rediseño e Implementación del Portal Web de la Facultad de Economía, Contaduría y Administración mediante Arquitectura Orientada a Servicios

**Universidad Juárez del Estado de Durango**
**Facultad de Economía, Contaduría y Administración (FECA)**

Materia: [completar]
Docente: [completar]
Fecha de entrega: [completar]

## Integrantes

- Danna Michell Robles
- Iris Yadira Santiago Santos
- Lucía Medina
- Cindy Alejandra Reyes Arce

---

## Índice

1. Antecedentes
2. Planteamiento del Problema
3. Justificación
4. Objetivos
5. Descripción del Sistema
6. Estructura del Proyecto
7. Tecnologías Utilizadas
8. Arquitectura Orientada a Servicios (SOA)
9. Administración del Sitio
10. Cumplimiento de la Rúbrica
11. Problemática Encontrada Durante el Desarrollo
12. Resultados Obtenidos
13. Conclusiones

---

## Resumen Ejecutivo

El presente proyecto consiste en el rediseño y desarrollo del nuevo portal web de la Facultad de Economía, Contaduría y Administración (FECA) de la Universidad Juárez del Estado de Durango. La iniciativa surgió a partir de la necesidad institucional de modernizar el sitio web existente, mejorar la organización de la información y ofrecer una experiencia de usuario más eficiente y atractiva.

La propuesta fue presentada a los directivos de la facultad, quienes aceptaron colaborar proporcionando información y retroalimentación para el desarrollo del sistema. Como resultado, se diseñó una plataforma moderna que integra información académica, administrativa e institucional, además de incorporar un módulo de solicitudes de admisión implementado mediante una Arquitectura Orientada a Servicios (SOA).

El sistema fue desarrollado utilizando tecnologías modernas como React, Vite, Node.js, Express y Supabase, implementando microservicios independientes para garantizar autonomía, bajo acoplamiento, escalabilidad y seguridad.

---

## Capítulo 1. Antecedentes

Antes del desarrollo de este proyecto, la FECA contaba con una página web institucional que permitía consultar información básica sobre la facultad. Sin embargo, durante el análisis realizado por el equipo se identificaron diversos problemas relacionados con la organización de la información y la experiencia de usuario.

La página presentaba una estructura tradicional donde gran parte de la información se encontraba distribuida en diferentes menús y secciones que dificultaban la navegación. Los estudiantes y visitantes debían realizar múltiples búsquedas para encontrar información relacionada con carreras, servicios, departamentos o noticias institucionales.

Además, la imagen visual del portal no reflejaba adecuadamente la identidad actual de la facultad ni aprovechaba los principios modernos de diseño web orientados a la usabilidad y accesibilidad.

A partir de reuniones con personal de la facultad se confirmó el interés institucional por contar con una plataforma más moderna, organizada y funcional, lo que permitió iniciar el desarrollo del nuevo Portal FECA.

---

## Capítulo 2. Planteamiento del Problema

La principal problemática identificada fue la dificultad para acceder rápidamente a la información institucional debido a la estructura del portal existente.

Entre las situaciones detectadas destacan:

- Organización poco intuitiva de la información.
- Dificultad para localizar carreras y servicios.
- Diseño visual limitado.
- Escasa integración de herramientas modernas.
- Falta de procesos digitales para solicitudes de admisión.
- Ausencia de una arquitectura escalable para futuras funcionalidades.

Estas limitaciones afectaban la experiencia de estudiantes, aspirantes, docentes y visitantes.

---

## Capítulo 3. Justificación

La digitalización de los procesos universitarios exige plataformas modernas que permitan una comunicación eficiente entre la institución y su comunidad.

El desarrollo del Portal FECA busca:

- Modernizar la imagen institucional.
- Facilitar la navegación.
- Centralizar la información académica.
- Digitalizar procesos administrativos.
- Mejorar la accesibilidad.
- Implementar una arquitectura tecnológica moderna.

Asimismo, el proyecto representa una oportunidad para aplicar conocimientos de desarrollo web, bases de datos, arquitectura de software y seguridad informática en un entorno real.

---

## Capítulo 4. Objetivos

### Objetivo General

Diseñar e implementar un portal web moderno para la Facultad de Economía, Contaduría y Administración mediante una arquitectura orientada a servicios que permita mejorar la gestión y acceso a la información institucional.

### Objetivos Específicos

- Modernizar el sitio web institucional.
- Organizar la información académica y administrativa.
- Facilitar la consulta de servicios universitarios.
- Implementar solicitudes de admisión en línea.
- Garantizar seguridad en las comunicaciones.
- Aplicar principios de arquitectura orientada a servicios (SOA).
- Crear una plataforma escalable.

---

## Capítulo 5. Descripción del Sistema

El Portal FECA integra información relacionada con:

**Oferta Educativa**
- Contador Público.
- Licenciatura en Administración.
- Licenciatura en Economía y Negocios Internacionales.
- Posgrado.
- Centro de Idiomas.

**Departamentos**
- CIIEDO.
- CELCI.
- Posgrado.

**Servicios**
- FECA Store.
- CAFECA.
- Noticias.
- Nuevas noticias.
- Horarios.
- Ejes rectores.
- Información institucional.
- Contacto.

---

## Capítulo 6. Estructura del Proyecto

El proyecto se organiza como un **monorepo**: el sitio público (frontend) y los microservicios viven en el mismo repositorio, pero se ejecutan y despliegan de forma independiente entre sí.

```
pag_web_feca/
├── src/                        # Frontend (React + Vite)
│   ├── components/             # Componentes reutilizables (incluye admin/)
│   ├── pages/                  # Páginas/rutas del sitio (públicas y de admin)
│   ├── sections/                # Secciones de las páginas principales
│   ├── data/                   # Datos estáticos (carreras, avisos, etc.)
│   └── lib/                    # Clientes (Supabase, API de Admisiones, auth)
│
├── services/                   # Microservicios propios (SOA)
│   ├── admisiones-api/         # Dueño de la tabla solicitudes_admision
│   └── notificaciones-api/     # Envío de correos vía Resend
│
├── supabase/
│   └── functions/              # Edge Functions (ej. invitar-acceso-panel)
│
├── database/                   # Esquema SQL (tablas, políticas RLS)
├── public/                     # Recursos estáticos y PDFs institucionales
├── tests/                      # Pruebas automatizadas (Playwright)
├── dist/                       # Build de producción (generado, no se edita)
│
├── README.md                   # Cómo correr y publicar el sitio
├── ARQUITECTURA.md             # Guía de arquitectura para la exposición
└── DEPLOY.md                   # Guía de despliegue al servidor institucional
```

Cada carpeta dentro de `services/` tiene su propio `package.json`, sus propias dependencias y su propio `README.md` con el contrato del servicio (endpoints, autenticación, formato de respuesta). Esto es lo que permite que cada microservicio se instale, se ejecute y se apague de manera independiente, sin afectar al resto del sistema (ver Capítulo 8).

---

## Capítulo 7. Tecnologías Utilizadas

**Frontend**
- React
- Vite
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express

**Base de datos**
- Supabase
- PostgreSQL

**Seguridad**
- JWT (Supabase Auth)
- X-Service-Token (secreto compartido entre microservicios)

**Servicios externos**
- Resend (envío de correo)

**Herramientas**
- Git
- GitHub
- Visual Studio Code

---

## Capítulo 8. Arquitectura Orientada a Servicios (SOA)

### 8.1 Arquitectura general

El sistema utiliza una arquitectura de tres componentes principales:

- **Frontend SPA** — aplicación React/Vite utilizada por estudiantes, visitantes y administradores.
- **Admisiones API** — microservicio responsable de crear, consultar, actualizar y eliminar solicitudes de admisión.
- **Notificaciones API** — microservicio responsable del envío de correos electrónicos.

### 8.2 Diagrama de flujo

```
Visitante / Admin (navegador)
        │
        ▼
  Frontend SPA (React + Vite)
        │
        ├── REST/JSON (POST público / Bearer JWT admin) ──▶ Admisiones API
        │                                                         │
        │                                                         ├── service_role key ──▶ Supabase (Postgres)
        │                                                         │
        │                                                         └── POST /notificar + X-Service-Token ──▶ Notificaciones API
        │                                                                                                          │
        └── Auth, Storage, resto del CMS ──▶ Supabase                                                              └── API key ──▶ Resend
```

La comunicación es siempre unidireccional: ningún servicio hace *callbacks* hacia quien lo llamó. El Frontend nunca es llamado por Admisiones API, ni Admisiones API es llamado por Notificaciones API. Esto facilita razonar sobre el sistema y aislar fallas.

> Nota: Supabase no se cuenta como "uno de los servicios propios" para efectos de la arquitectura — es infraestructura de base de datos administrada que usan ambos microservicios, igual que cualquier proyecto usa un clúster de Postgres compartido. Los dos servicios que sí construyó el equipo (Admisiones API y Notificaciones API) no comparten código ni proceso entre sí, solo se hablan por HTTP con un contrato documentado.

### 8.3 Principios SOA cumplidos

| Principio | Cómo se cumple |
|---|---|
| **Autonomía** | Cada servicio tiene `package.json`, dependencias y proceso propios; se puede apagar uno sin afectar al otro. |
| **Contrato bien definido** | Cada servicio documenta endpoints, verbos HTTP, autenticación y formato de request/response en su `README.md`. |
| **Bajo acoplamiento** | Admisiones API no importa nada de Notificaciones API ni conoce cómo envía el correo — solo conoce el contrato `POST /notificar`. |
| **Seguridad entre servicios** | Usuario → servicio: JWT de Supabase Auth. Servicio → servicio: `X-Service-Token` comparado con `crypto.timingSafeEqual`. |
| **Escalabilidad** | Nuevos servicios pueden agregarse sin modificar los existentes, siempre que respeten el contrato HTTP acordado. |

(El detalle de cómo se verifica cada criterio contra la rúbrica de la materia se retoma en el Capítulo 10.)

---

## Capítulo 9. Administración del Sitio

### 9.1 Quién entra al panel

El panel de administración (`#/admin`) usa **Supabase Auth**: solo puede entrar quien tiene una cuenta creada ahí. No hay usuarios ni contraseñas hardcodeados en el código.

Un maestro o directivo que necesite acceso lo solicita desde la misma pantalla de inicio de sesión del panel. Esa solicitud se guarda como un registro pendiente de revisión, junto con su nombre, correo, cargo y área.

### 9.2 Roles

- **Administrador principal.** Una única cuenta, identificada por su correo, es la que puede revisar la pestaña "Solicitudes de acceso" del panel y aprobar, rechazar, reabrir o borrar solicitudes de otras personas.
- **Administradores invitados.** Maestros o directivos cuya solicitud fue aprobada. Pueden ver y editar el contenido del panel (anuncios, noticias, solicitudes de admisión, etc.), pero no pueden gestionar el acceso de otras personas — solo consultar la lista de solicitudes.

### 9.3 Flujo de aprobación de acceso

1. La persona solicita acceso desde la pantalla de login del panel; queda registrada como solicitud "pendiente".
2. El administrador principal revisa la solicitud en la pestaña "Solicitudes de acceso".
3. Al aprobarla, el panel invoca una Edge Function (`invitar-acceso-panel`) que crea la cuenta en Supabase Auth y envía automáticamente un correo de invitación — ya no es necesario dar de alta la cuenta a mano ni compartir una contraseña por fuera del sistema.
4. La persona invitada abre el enlace del correo, define su propia contraseña (mínimo 6 caracteres) y queda lista para entrar al panel con su cuenta.

### 9.4 Dónde se edita el contenido del sitio

Existen dos lugares distintos para editar contenido, y la diferencia es relevante para entender qué pasa por un microservicio propio y qué no:

1. **Panel propio del sitio** (`#/admin`) — pantallas hechas a medida para el contenido que cambia con más frecuencia: anuncios y noticias, últimas noticias, carrusel de inicio, documentos de egresados, testimonios, solicitudes de admisión, opiniones del sitio y solicitudes de acceso. De estas secciones, **solo "Solicitudes de admisión" pasa por un microservicio propio** (Admisiones API); el resto habla directo con Supabase desde el navegador, protegido por políticas de seguridad a nivel de fila (RLS).
2. **Supabase Table Editor** (fuera del sitio, en el panel de Supabase) — edición manual directa sobre la base de datos, usada para el contenido que todavía no tiene una pantalla dedicada en el panel propio.

Esta distinción también es honesta de cara a la arquitectura: no se forzó a los ocho dominios del panel a pasar por microservicios propios sin una razón real para cada uno — solo se separó en un microservicio el dominio que efectivamente lo necesitaba (solicitudes de admisión, con su flujo de notificación asociado).

---

## Capítulo 10. Cumplimiento de la Rúbrica

Este capítulo sigue el mismo orden y los mismos pesos de la rúbrica de la materia ("Exposición Aplicaciones Web Orientadas a Servicios"), respondiendo punto por punto qué se evaluará y cómo lo cumple el proyecto.

### 10.1 Autonomía del servicio — 25%

*Qué evalúa la rúbrica: que cada servicio pueda ejecutarse y desplegarse de forma independiente, sin depender del código interno o del proceso del otro.*

- Cada servicio vive en su propia carpeta (`services/admisiones-api`, `services/notificaciones-api`) con `package.json`, `node_modules` y proceso propios (`npm start` independiente, en puertos distintos: 4001 y 4002).
- No hay `import` cruzado entre `admisiones-api/src` y `notificaciones-api/src` — ninguno de los dos lee ni ejecuta código del otro.
- Prueba realizada: al apagar Notificaciones API (Ctrl+C) y enviar una solicitud de admisión, Admisiones API la sigue guardando con normalidad; solo cambia `"notified": false` en la respuesta. Ningún servicio "toma prestado" código ni estado del otro para funcionar.

### 10.2 Contrato de servicio bien definido — 20%

*Qué evalúa la rúbrica: que quede claro qué expone cada servicio, qué espera recibir y qué responde, y que el equipo pueda explicarlo con precisión.*

**Admisiones API** (`services/admisiones-api`, puerto 4001):

| Endpoint | Auth | Body esperado | Respuesta |
|---|---|---|---|
| `POST /api/solicitudes` | Pública | `{ nombre (requerido), telefono?, correo?, programa?, mensaje? }` | `201` con la solicitud creada, `400` si falta `nombre`, `502` si falla Supabase |
| `GET /api/solicitudes` | `Bearer <JWT>` | — | `200` con arreglo de solicitudes |
| `PATCH /api/solicitudes/:id` | `Bearer <JWT>` | `{ atendida: boolean }` | `200` con la solicitud actualizada |
| `DELETE /api/solicitudes/:id` | `Bearer <JWT>` | — | `204` sin contenido |

**Notificaciones API** (`services/notificaciones-api`, puerto 4002):

| Endpoint | Auth | Body esperado | Respuesta |
|---|---|---|---|
| `POST /notificar` | `X-Service-Token` | `{ tipo: string, datos: object }` | `200` con `{ sent, mode }`, `401` si falta/es inválido el token, `502` si Resend rechaza el envío |

Ambos servicios también exponen `GET /health` para verificar en vivo que están arriba.

### 10.3 Bajo acoplamiento — 10%

*Qué evalúa la rúbrica: que la comunicación entre servicios se dé únicamente a través de su interfaz pública.*

Admisiones API llama a Notificaciones API solo por HTTP (`POST /notificar`), como cualquier cliente externo lo haría. No conoce cómo se arma el correo, ni qué plantilla usa, ni que el proveedor es Resend — si eso cambiara, Admisiones API no se entera ni se modifica.

### 10.4 Mecanismo de seguridad entre servicios — 10%

*Qué evalúa la rúbrica: autenticación/autorización correctamente implementada, sin credenciales expuestas, con manejo explícito de los casos en que la autenticación falla.*

- **Usuario → Admisiones API**: `Bearer <JWT>` de Supabase Auth, verificado localmente con `SUPABASE_JWT_SECRET` (no se re-consulta a Supabase en cada request).
- **Admisiones API → Notificaciones API**: header `X-Service-Token`, comparado con `crypto.timingSafeEqual` para evitar fugas por tiempo de comparación. Nunca se expone al navegador ni se envía al frontend.
- **Manejo explícito de fallos** (verificado en el código de ambos servicios):
  - Falta el header `Authorization` o `X-Service-Token` → `401` con mensaje específico ("Falta el header...").
  - Token presente pero inválido o expirado → `401` ("Token inválido o expirado" / "Falta o es inválido el header X-Service-Token").
  - Al servicio le falta su propia variable de entorno (`SUPABASE_JWT_SECRET` o `SERVICE_TOKEN`) → `500` ("Servicio mal configurado"), para no confundir "no autorizado" con "mal desplegado".
  - Notificaciones API además no habilita CORS: una petición hecha con `fetch()` desde un navegador nunca llega al servicio, solo acepta tráfico servidor-a-servidor.

### 10.5 Recursos y calidad de la exposición — 10%

*Qué evalúa la rúbrica: diagrama de arquitectura con la dirección real de la comunicación, y demostración en vivo con petición y respuesta reales.*

- Diagrama de arquitectura: Capítulo 8.2 de este informe y `ARQUITECTURA.md`.
- Guion de demo en vivo (detallado en `ARQUITECTURA.md`, sección 5): levantar los tres procesos, enviar una solicitud real desde `#/solicitud`, mostrar en las herramientas de red del navegador el `POST` a `localhost:4001/api/solicitudes` y la respuesta `201`, y verla aparecer en `#/admin`.
- Recomendación de la rúbrica pendiente de preparar: grabar un **video de respaldo** de esa misma demo por si algo falla en vivo el día de la exposición.

### 10.6 Defensa técnica — 25%

*Qué evalúa la rúbrica: explicar el porqué de las decisiones de diseño, no solo el qué, incluyendo qué pasa si un servicio deja de estar disponible.*

- *Caída de Notificaciones API*: Admisiones API detecta el fallo (timeout de 3 s), lo registra y responde igual al usuario — la solicitud ya estaba guardada antes de intentar notificar. Es degradación controlada, no un error en cascada.
- *Caída de Admisiones API*: el frontend recibe un error de red y lo muestra al visitante; el resto del sitio no se ve afectado porque no depende de este servicio.
- *Caída de Supabase*: aquí sí existe un punto de dependencia compartido, tanto para el resto del sitio como para Admisiones API — es una limitación real y consciente, no un servicio más con el que se negocia degradación.
- *Por qué un secreto compartido y no OAuth/mTLS*: es una llamada interna, sin usuario detrás, entre dos servicios que confían uno en el otro por configuración; un secreto compartido bien manejado es proporcional al riesgo real de un proyecto de este tamaño.
- *Por qué el JWT se valida localmente*: para no encadenar la disponibilidad de Admisiones API a que Supabase Auth responda rápido en cada petición.
- *Por qué Admisiones API usa la `service_role key` y no las políticas RLS del resto del sitio*: porque corre en un servidor de confianza, nunca en el navegador, y es el único dueño de esa tabla.

### 10.7 Preparación del equipo para la exposición

La rúbrica pide explícitamente poder repartir la explicación entre integrantes ("se puede preguntar a cualquier integrante sobre cualquier parte del sistema") y estar listos para que se detenga un servicio en vivo durante la defensa. Pendiente de acordar entre el equipo antes de la exposición:

- Asignar a cada integrante al menos una parte del sistema que domine a fondo (frontend, Admisiones API, Notificaciones API, seguridad/JWT), sin que eso signifique que solo esa persona puede hablar de ese tema.
- Ensayar la demo completa al menos una vez apagando cada servicio en vivo (como en el Capítulo 5 de `ARQUITECTURA.md`), para que cualquiera del equipo pueda narrar qué se ve en pantalla y por qué.
- Tener a la mano las respuestas del punto 10.6 en un lenguaje que cualquier integrante pueda repetir con sus propias palabras, no solo quien escribió el código.

---

## Capítulo 11. Problemática Encontrada Durante el Desarrollo

El desarrollo del Portal Web FECA representó un reto importante para el equipo debido a diversos factores técnicos, organizacionales y de comunicación que surgieron durante el proyecto.

Uno de los principales desafíos fue la organización del trabajo entre los integrantes del equipo. Debido a las diferencias de horarios académicos y personales, no siempre fue posible coincidir para trabajar de manera presencial, por lo que en diversas ocasiones fue necesario coordinar actividades a distancia. Esto implicó establecer mecanismos de comunicación constantes para mantener actualizado el avance del proyecto y evitar retrasos en el desarrollo.

Otro reto importante fue la definición de los requerimientos del sistema. Durante las reuniones con los directivos de la facultad surgieron cambios en las necesidades y expectativas del proyecto. Conforme se mostraban avances, se solicitaban modificaciones relacionadas con la organización de la información, el diseño visual, la ubicación de determinados elementos y la incorporación de nuevas funcionalidades.

Asimismo, la obtención de información institucional representó una dificultad adicional. En varias ocasiones no se contaba con toda la información necesaria para completar determinadas secciones del portal debido a que algunos responsables de los departamentos no se encontraban disponibles o la información aún no estaba completamente organizada. Esto obligó al equipo a realizar ajustes constantes en la estructura del sitio y a modificar componentes ya desarrollados para adaptarlos a los nuevos requerimientos.

Desde el punto de vista técnico, uno de los mayores desafíos fue diseñar una arquitectura que permitiera separar responsabilidades y mantener el sistema organizado conforme creciera el proyecto, lo que llevó a implementar la Arquitectura Orientada a Servicios descrita en el Capítulo 8. La implementación de los microservicios también implicó retos relacionados con la comunicación entre servicios, la autenticación de usuarios, la protección de datos y el manejo de errores cuando alguno de los componentes no estuviera disponible.

Finalmente, la integración de distintas tecnologías (React, Vite, Node.js, Express, Supabase, Resend) dentro de una misma solución requirió comprender cómo interactuaban entre sí para garantizar un funcionamiento estable y eficiente.

A pesar de las dificultades encontradas, el equipo logró adaptarse a los cambios, mantener una comunicación constante y construir una solución funcional que responde a las necesidades planteadas por la facultad.

---

## Capítulo 12. Resultados Obtenidos

El resultado final del proyecto fue el desarrollo de un nuevo Portal Web FECA que mejora significativamente la experiencia de usuario respecto al sitio institucional anterior.

**Mejora de la experiencia de usuario.** La nueva interfaz permite localizar información de forma más rápida y sencilla, reduciendo el número de pasos necesarios para acceder a la información.

**Modernización de la imagen institucional.** El portal incorpora una identidad visual más moderna mediante colores institucionales, imágenes representativas de la facultad y una estructura visual organizada.

**Organización de la información.** La información académica, administrativa e institucional fue reorganizada para facilitar su consulta: oferta educativa, noticias institucionales, horarios, información de departamentos, servicios universitarios, contacto institucional y ejes rectores.

**Integración de nuevos servicios.** El nuevo portal incorpora servicios que no se encontraban claramente integrados en la página anterior, tales como FECA Store, CAFECA, el sistema de solicitudes de admisión, un buscador de contenido y secciones especializadas para departamentos.

**Arquitectura Orientada a Servicios.** Se implementó la arquitectura descrita en el Capítulo 8, cumpliendo los principios de autonomía, bajo acoplamiento y escalabilidad para el dominio de solicitudes de admisión.

**Administración del sitio.** Se implementó un flujo completo de gestión de accesos al panel (solicitud → aprobación → invitación por correo → definición de contraseña propia), descrito en el Capítulo 9, que elimina la necesidad de compartir credenciales manualmente.

**Escalabilidad.** La arquitectura desarrollada permite incorporar nuevas funcionalidades en el futuro sin afectar significativamente el funcionamiento de los servicios existentes.

En términos generales, el proyecto logró satisfacer los objetivos planteados inicialmente y proporcionar una solución moderna, organizada y preparada para futuras ampliaciones.

---

## Conclusiones

El desarrollo del Portal Web FECA permitió aplicar de manera práctica conocimientos adquiridos a lo largo de la formación académica en áreas como desarrollo web, bases de datos, arquitectura de software, seguridad informática y gestión de proyectos.

Uno de los principales logros fue la modernización de la imagen digital de la Facultad de Economía, Contaduría y Administración mediante una plataforma que mejora significativamente la organización de la información y la experiencia de navegación de los usuarios.

Desde el punto de vista técnico, la implementación de una Arquitectura Orientada a Servicios permitió desarrollar un sistema más organizado y escalable. La separación de responsabilidades entre Frontend SPA, Admisiones API y Notificaciones API facilitó el mantenimiento del proyecto y permitió cumplir con los principios de autonomía, bajo acoplamiento y seguridad entre servicios. La incorporación de mecanismos de autenticación basados en JWT y tokens de servicio fortaleció la seguridad de la aplicación, mientras que el flujo de administración de accesos garantiza que solo personal autorizado pueda gestionar el contenido del sitio.

Además de los aspectos técnicos, el proyecto representó una experiencia valiosa de trabajo colaborativo. El equipo enfrentó desafíos relacionados con la coordinación de actividades, cambios constantes en los requerimientos y la obtención de información institucional, lo que permitió desarrollar habilidades de comunicación, organización y adaptación fundamentales en proyectos reales de desarrollo de software.

Finalmente, se concluye que el Portal Web FECA constituye una solución tecnológica capaz de responder a las necesidades actuales de la facultad, al mismo tiempo que proporciona una base sólida para futuras ampliaciones y mejoras.
