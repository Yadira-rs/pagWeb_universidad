# Diccionario de campos — qué lleva cada tabla

Este documento complementa a `EXPLICACION_TABLAS.md` (que explica *para
qué* es cada tabla) con el detalle de *qué columnas tiene cada una*, en
lenguaje simple. Útil para quien vaya a construir los formularios del
panel de administración o a cargar datos a mano.

Leyenda:
- **Obligatorio**: no puede quedar vacío.
- **Opcional**: puede quedar vacío (`NULL`).
- **Se llena solo**: la base de datos lo genera sola, nadie lo escribe a mano.

---

## admin_users — cuentas del panel

| Campo | Tipo | ¿Obligatorio? | Qué guarda |
|---|---|---|---|
| id | número | se llena solo | identificador único |
| email | texto | obligatorio, único | correo con el que inicia sesión |
| password_hash | texto | obligatorio | la contraseña, ya encriptada (nunca se guarda en texto plano) |
| display_name | texto | obligatorio | nombre que se muestra en el panel |
| role | texto | obligatorio (por defecto `admin`) | pensado para el futuro, si algún día hay roles distintos |
| is_active | sí/no | obligatorio (por defecto sí) | si está en `no`, esa cuenta no puede entrar |
| failed_attempts | número | se llena solo | intentos fallidos de contraseña seguidos |
| locked_until | fecha y hora | opcional | hasta cuándo queda bloqueada la cuenta tras varios intentos fallidos |
| last_login_at | fecha y hora | opcional | último inicio de sesión exitoso |
| created_at | fecha y hora | se llena solo | cuándo se creó la cuenta |

## media — imágenes y documentos subidos

| Campo | Tipo | ¿Obligatorio? | Qué guarda |
|---|---|---|---|
| id | número | se llena solo | identificador único |
| file_path | texto | obligatorio | dónde quedó guardado el archivo (ruta o URL) |
| original_filename | texto | obligatorio | nombre del archivo tal como lo subió el admin |
| mime_type | texto | obligatorio | tipo real del archivo (ej. `image/png`, `application/pdf`) |
| size_bytes | número | obligatorio | peso del archivo |
| width / height | número | opcional | ancho y alto en píxeles (solo si es imagen) |
| alt_text | texto | opcional | texto alternativo de la imagen (accesibilidad) |
| uploaded_by | referencia a `admin_users` | opcional | quién lo subió |
| created_at | fecha y hora | se llena solo | cuándo se subió |

---

## hero_slides — carrusel principal del Inicio

| Campo | Qué guarda |
|---|---|
| title_line_1 / 2 / 3 | las hasta 3 líneas del título grande (opcional, algunas diapositivas no llevan texto, solo logo) |
| description | el párrafo debajo del título (opcional) |
| badge | una etiqueta pequeña tipo "NUEVO" (opcional) |
| image_media_id / image_url | la imagen de fondo (una u otra, según venga de la biblioteca de medios o de una URL externa) |
| logo_media_id / logo_url / logo_alt | para las diapositivas tipo "aniversario" que muestran un logo en vez de texto |
| sort_order | en qué orden aparece esta diapositiva respecto a las demás |
| is_active | si está apagada, no se muestra en el sitio (sin borrarla) |

## programs — tarjetas de "Departamentos"

| Campo | Qué guarda |
|---|---|
| title | nombre del programa (ej. "POSGRADO") |
| description | texto descriptivo de la tarjeta |
| image_media_id / image_url | la imagen/logo de la tarjeta |
| image_variant | ajuste visual opcional para casos especiales (no lo necesita tocar el admin normalmente) |
| duration | ej. "6 años" |
| mode | ej. "Presencial", "En línea" |
| href | a dónde lleva la tarjeta al hacer clic (otra página del sitio o un link externo) |
| sort_order / is_active | orden y si está visible |

## highlights — tarjetas "Por qué elegirnos"

| Campo | Qué guarda |
|---|---|
| title | título de la tarjeta |
| description | texto de la tarjeta |
| icon_key | qué ícono mostrar; se elige de una lista fija predefinida (no se sube un ícono libre, por seguridad y consistencia visual) |
| sort_order / is_active | orden y si está visible |

## teachers — carrusel de directores en el Inicio

| Campo | Qué guarda |
|---|---|
| name | nombre completo |
| role | cargo (ej. "Director FECA") |
| area | área de enfoque institucional |
| enfoque | una frase corta de especialidad |
| description | descripción breve que aparece en la tarjeta |
| welcome_message | mensaje largo de bienvenida que se ve al abrir su perfil emergente |
| image_media_id / image_url | su foto |
| sort_order / is_active | orden y si está visible |

## teacher_education — grados académicos de cada persona de `teachers`

| Campo | Qué guarda |
|---|---|
| teacher_id | a qué persona de `teachers` pertenece este grado |
| degree | ej. "Doctorado en Administración" |
| institution | ej. "UJED" |
| sort_order | orden en que se listan los grados de esa persona |

Una persona puede tener varias filas aquí (una por cada grado académico).

## faq_items — preguntas frecuentes

| Campo | Qué guarda |
|---|---|
| question | la pregunta |
| answer | la respuesta |
| page_key | en qué página aparece (por defecto `home`; se deja preparado por si en el futuro se quiere FAQ en otra página) |
| sort_order / is_active | orden y si está visible |

## stats — barra de estadísticas del Inicio

| Campo | Qué guarda |
|---|---|
| target_value | el número final al que llega el contador (ej. 2000, 95, 68) |
| format_key | cómo se muestra ese número: `plus_es_mx` → "2,000+", `plus_prefix` → "+5", `percent` → "95%", `plain` → "68" tal cual |
| label | el texto debajo del número (ej. "Alumnos activos") |
| sort_order | orden de las estadísticas |

---

## news — noticias (unifica panel, carrusel de avisos y grilla)

| Campo | Qué guarda |
|---|---|
| badge | etiqueta pequeña opcional (ej. "NUEVO") |
| category | categoría de la noticia (ej. "Admisión", "Eventos", "Evento", "Convocatoria") |
| title | título de la noticia |
| summary | resumen corto |
| body | texto completo/largo (opcional; se usa en el detalle de la noticia) |
| event_label | texto libre de fecha/lugar para el carrusel de avisos del Inicio (ej. "15 de julio, 2026 · 10:00 hrs · Sala CIIEDO"); si se deja vacío, se puede mostrar `published_at` en su lugar |
| cta_label / cta_href | texto y link del botón de la tarjeta (ej. "Registrarme" → un correo o página); opcional |
| type | `article` (noticia normal) o `document` (trae un PDF adjunto) |
| image_media_id | imagen de la noticia (opcional) |
| document_media_id | el PDF adjunto, solo si `type` es `document` |
| published_at | fecha formal de publicación (se usa para ordenar y para el panel lateral) |
| is_published | si está en `no`, no se muestra en ningún lado aunque exista en la base |
| show_on_home | si aparece en el carrusel de "Avisos y Eventos" del Inicio |
| show_in_panel | si aparece en el panel lateral de noticias del sitio |
| sort_order | para fijar el orden manualmente si hace falta |
| updated_by | qué administrador la editó por última vez |

Una misma noticia puede aparecer en el Inicio, en el panel lateral, en
ambos o en ninguno — se controla con `show_on_home` y `show_in_panel`.

---

## director_profiles — perfiles completos de directivos

| Campo | Qué guarda |
|---|---|
| slug | la parte de la URL de su página (ej. `jesus-sotelo`), debe ser único |
| name | nombre completo |
| role | cargo |
| role_label | una versión alterna/corta del cargo para mostrar en ciertos lugares |
| area | área de enfoque |
| enfoque | frase corta de especialidad |
| quote | una cita textual del directivo |
| image_media_id / image_url | su foto |
| bio_trajectory | texto de su trayectoria profesional |
| bio_focus | texto de su enfoque de trabajo |
| bio_contact | correo de contacto |
| sort_order / is_active | orden y si está visible |

## director_degrees — grados académicos de cada directivo

Igual estructura que `teacher_education`, pero ligada a
`director_profiles` en vez de a `teachers`.

| Campo | Qué guarda |
|---|---|
| director_profile_id | a qué directivo pertenece |
| title | nombre del grado (ej. "Doctorado en Administración") |
| institution | institución donde lo obtuvo |
| sort_order | orden en la lista |

---

## representative_groups — grupos representativos (deportes, arte, académicos)

| Campo | Qué guarda |
|---|---|
| categoria | "Deportes", "Arte y Cultura" o "Académico" |
| nombre | nombre oficial del grupo (ej. "Fútbol Varonil") |
| apodo | apodo del equipo/grupo (ej. "Lobos FECA") |
| descripcion | texto descriptivo |
| icono | un emoji o ícono corto representativo |
| color | color principal del grupo (para la tarjeta) |
| gradient_start / gradient_end | los dos colores del degradado de fondo de la tarjeta |
| miembros | número de integrantes |
| logros | texto libre con el logro más destacado |
| contacto_email | correo de contacto del grupo |
| destacado | si se marca como grupo destacado (le pone una estrella) |
| nuevo | si se marca como "nuevos cupos" |
| sort_order / is_active | orden y si está visible |

---

## pages — páginas institucionales, de servicios y heredadas

| Campo | Qué guarda |
|---|---|
| slug | identifica la página (la parte de la URL, ej. `organigrama`, `servicios-escolares`), debe ser único |
| route_group | a qué familia de páginas pertenece (ayuda a saber qué diseño/plantilla usar) |
| template | qué "molde" visual usa esta página (ej. página con secciones simples, página de servicio con lista de trámites, página con pestañas, formulario de admisión...) |
| title | título de la página, para el encabezado y la pestaña del navegador |
| hero_image_media_id / hero_image_url | imagen del encabezado, si esa página lleva una |
| content | **todo el contenido específico de esa página** (textos, listas, secciones), guardado en un formato flexible (JSON) porque cada tipo de página tiene una estructura distinta |
| is_published | si está en `no`, la página no se muestra |
| updated_by | qué administrador la editó por última vez |

`content` es la única columna "especial": en vez de columnas fijas de
texto, guarda una estructura tipo lista/diccionario (similar a como se
llena un formulario con varios campos y listas dentro). El panel de
administración, cuando se construya, sabrá qué campos mostrar según el
valor de `template`.

---

## Columnas que se repiten en casi todas las tablas

- **id**: identificador único, se genera solo, nunca se edita a mano.
- **created_at / updated_at**: cuándo se creó y cuándo se editó por
  última vez cada fila; se llenan y actualizan solas.
- **sort_order**: un número para controlar el orden en que aparece cada
  elemento en una lista (menor número = aparece primero).
- **is_active / is_published**: para "apagar" un elemento sin borrarlo
  (deja de mostrarse en el sitio, pero sigue en la base de datos por si
  se quiere reactivar después).
