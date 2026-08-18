# Declaración de Originalidad y Uso de Inteligencia Artificial

**Proyecto:** Portal Web FECA — Rediseño e implementación mediante Arquitectura Orientada a Servicios
**Producto de investigación:** Evaluación de la calidad percibida del Portal Web FECA mediante el instrumento WebQual
**Actividad:** 4.3 — Artículo científico definitivo y cartel · Unidad IV
**Evidencia:** EV-Congreso-3 / EV-Cierre-3
**Institución:** Universidad Juárez del Estado de Durango (UJED) — Facultad de Economía, Contaduría y Administración

> **[completar antes de entregar]** Esta declaración documenta con precisión el uso de IA dentro de las sesiones de Claude Code que trabajaron sobre este repositorio. Si algún integrante usó otra herramienta de IA (ChatGPT, Copilot, Gemini, etc.) en alguna parte del proyecto —incluido lo escrito antes de esta declaración, como partes de `INFORME_FECA.md`—, agréguenlo en la sección 2 antes de firmar. Declarar de más es tan importante como no declarar de menos.
>
> **Pendiente de una segunda pasada:** las filas de "Artículo científico definitivo" y "Cartel científico" en la sección 2.2 quedan abiertas porque todavía no se han escrito — complétenlas (o pídanmelo) cuando estén terminados, antes de la firma final.

---

## 1. Declaración de originalidad

Los integrantes que firman al final de este documento declaramos que:

1. El artículo científico definitivo y el cartel científico entregados en esta actividad son producto original del equipo. El sistema evaluado (Portal Web FECA), el instrumento aplicado (WebQual), la recolección de respuestas y su interpretación fueron desarrollados por nosotros.
2. Todas las fuentes consultadas están citadas en el texto y referenciadas en formato APA 7.ª edición, con correspondencia bidireccional: cada cita del texto tiene su entrada en la lista de referencias y cada entrada de la lista está citada al menos una vez en el texto.
3. No hemos incurrido en plagio ni en autoplagio no declarado. **El artículo definitivo es la primera y única versión completa entregada por el equipo** — la Actividad 4.1 no se completó como borrador independiente, por lo que este artículo no incorpora una ronda previa de retroalimentación del comité editorial sobre una versión anterior propia; sí incorpora, en cambio, el protocolo metodológico validado en la Actividad 2.6 y el ajuste metodológico explicado en la sección de Limitaciones del artículo (cambio de instrumento planeado —SUS, pretest-postest— al instrumento efectivamente aplicado —WebQual, medición única—).
4. Los datos publicados son verificables de forma independiente: el código del sitio y los microservicios está versionado en el repositorio público `github.com/Yadira-rs/pagWeb_universidad` (visibilidad pública confirmada), y las respuestas crudas de la encuesta WebQual están disponibles en **[completar: enlace o nombre del archivo de la hoja de cálculo de Google Forms]**.

## 2. Uso de inteligencia artificial generativa

¿Se usó IA generativa en este trabajo? Sí. A continuación se detalla en qué partes, con qué herramienta y para qué propósito específico.

### 2.1 Desarrollo del sistema evaluado (Portal Web FECA)

| Parte del trabajo | Herramienta | Propósito específico |
|---|---|---|
| Panel de administración (`src/pages/AdminPanelPage.jsx`, `src/App.jsx`, `src/App.css`) | Claude (Anthropic), mediante Claude Code | Navegación de vuelta al sitio y ocultar widgets flotantes solo dentro del panel |
| Contenido de directivos (`src/data/directorsData.js`) y galería de fotos (`src/App.css`) | Claude (Anthropic), mediante Claude Code | Corrección de una foto del equipo administrativo y del recorte de imágenes en la galería |
| Navegación (`src/sections/Header.jsx`) | Claude (Anthropic), mediante Claude Code | Diagnóstico por historial de git y restauración de un enlace de navegación (Egresados) perdido en un cambio anterior |
| Diseño responsivo (`src/App.css`) | Claude (Anthropic), mediante Claude Code | Auditoría con Playwright en anchos de móvil/tablet/laptop y corrección de una regla CSS del menú móvil |
| Microservicios `services/admisiones-api` y `services/notificaciones-api` | Claude (Anthropic), mediante Claude Code | Revisión de código, ejecución local y pruebas en vivo (salud, autenticación, autonomía entre procesos) contra los criterios de arquitectura orientada a servicios |
| Flujo de acceso al panel: `supabase/functions/invitar-acceso-panel/index.ts`, `src/components/admin/AccesoManager.jsx`, enrutamiento de invitación en `src/App.jsx`, `src/pages/AdminResetPasswordPage.jsx` | Claude (Anthropic), mediante Claude Code | Diseño e implementación de una Edge Function que automatiza la creación de cuentas e invitación por correo, reemplazando un paso manual |

En todos los casos, las decisiones de arquitectura, la selección de tecnologías y qué construir fueron decisiones del equipo dirigidas explícitamente en cada sesión; el código generado fue revisado antes de aceptarse.

### 2.2 Redacción y revisión de documentos

| Parte del trabajo | Herramienta | Propósito específico |
|---|---|---|
| `ARQUITECTURA.md`, sección "Quién administra el sitio y dónde se edita el contenido" | Claude (Anthropic), mediante Claude Code | Redacción a partir de la revisión directa del código del panel y las políticas de base de datos |
| Esta declaración de originalidad | Claude (Anthropic), mediante Claude Code | Redacción del formato y de la sección 2, a partir del registro real de las tareas realizadas en estas sesiones |
| **[completar]** `INFORME_FECA.md` | **[completar: si se usó IA para escribirlo y cuál]** | **[completar]** |
| **[completar]** Artículo científico definitivo (Actividad 4.3) | **[completar]** | **[completar]** |
| **[completar]** Cartel científico (Actividad 4.3) | **[completar]** | **[completar]** |

### 2.3 Partes del trabajo en las que no se usó IA generativa

Se declara de forma explícita, porque delimita el alcance de lo anterior:

- **Los datos.** Ninguna respuesta del instrumento WebQual fue generada, estimada o completada por una herramienta de IA. Las 20 respuestas se recolectaron mediante un formulario de Google Forms aplicado a una muestra por conveniencia, ya con el sitio rediseñado en funcionamiento.
- **El diseño de la investigación.** Las decisiones sobre qué evaluar, con qué instrumento (WebQual) y bajo qué protocolo (Misión 2.6) fueron decisiones del equipo, no de una herramienta de IA.
- **La aplicación del instrumento y la captura de respuestas**, realizadas por los integrantes responsables. **[completar: confirmar si lo aplicó específicamente Cindy Alejandra Reyes Arce, como estaba asignado en el protocolo 2.6, o si cambió.]**
- **El análisis estadístico de los resultados de WebQual** (medias y frecuencias por dimensión) — pendiente de realizarse; se hará a partir de los datos crudos, no estimando desde las gráficas resumen de Google Forms.

## 3. Limitaciones reconocidas del estudio

1. **Muestra reducida y no representativa de todos los perfiles de usuario.** La muestra final (N = 20) fue menor a la planeada en el protocolo (30 participantes) y no incluyó a ningún docente; se concentró en aspirantes (50 %) y personal administrativo (30 %), con una participación menor de estudiantes (20 %). Esto limita la posibilidad de generalizar los hallazgos a toda la comunidad universitaria, en particular al personal docente.
2. **Ausencia de comparación pretest-postest.** El protocolo original (Misión 2.6) planteaba comparar la plataforma anterior contra el sitio rediseñado. En la ejecución final solo se evaluó el sitio ya rediseñado, en un único momento, por lo que los resultados describen la percepción de calidad del sitio actual, pero no permiten cuantificar cuánto mejoró respecto a la versión anterior.
3. **Cambio de instrumento respecto al protocolo validado.** Se sustituyó el cuestionario SUS (planeado en la Misión 2.6, con un umbral de referencia de 68 puntos) por el instrumento WebQual (efectivamente aplicado), lo cual impide comparar los resultados directamente con ese umbral original y con estudios que reporten específicamente puntuaciones SUS.

## 4. Firmas de los integrantes

Los firmantes declaramos que lo asentado en este documento es veraz y completo, y que conocemos y asumimos el contenido del artículo definitivo y del cartel entregados.

| Integrante | Rol en el proyecto de investigación | Firma |
|---|---|---|
| Danna Michell Robles | Responsable ético-legal (consentimiento y aviso de privacidad) | ____________________ |
| Iris Yadira Santiago Santos | Coordinación de campo y análisis de datos de la encuesta WebQual | ____________________ |
| Lucía Medina | Análisis técnico del sitio y redacción académica | ____________________ |
| Cindy Alejandra Reyes Arce | Diseño del instrumento y aplicación digital de la encuesta | ____________________ |

*(Roles según lo asignado en el protocolo de la Misión 2.6 — ajusten cualquiera que haya cambiado en la práctica antes de firmar.)*

Lugar y fecha: Durango, Dgo., a ______ de ________________ de 2026.
