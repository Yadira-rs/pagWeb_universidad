-- =========================================================
-- FECA UJED — esquema inicial
-- =========================================================

-- ---------------------------------------------------------
-- A. NÚCLEO DEL SITIO
-- ---------------------------------------------------------

CREATE TABLE secciones (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(60) UNIQUE NOT NULL,
  nombre        VARCHAR(120) NOT NULL,
  orden_menu    INT DEFAULT 0,
  activa        BOOLEAN DEFAULT TRUE
);

CREATE TABLE bloques_contenido (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id) ON DELETE CASCADE,
  tipo_bloque   VARCHAR(30) NOT NULL,
  orden         INT DEFAULT 0,
  datos         JSONB NOT NULL,
  publicado     BOOLEAN DEFAULT TRUE
);

CREATE TABLE documentos (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id),
  categoria     VARCHAR(60),
  titulo        VARCHAR(200) NOT NULL,
  url_archivo   TEXT NOT NULL,
  es_externo    BOOLEAN DEFAULT FALSE,
  orden         INT DEFAULT 0
);

CREATE TABLE configuracion_sitio (
  clave         VARCHAR(60) PRIMARY KEY,
  valor         TEXT NOT NULL
);

-- ---------------------------------------------------------
-- B. DIRECTIVOS / PERSONAL
-- ---------------------------------------------------------

CREATE TABLE directivos (
  id                  SERIAL PRIMARY KEY,
  slug                VARCHAR(80) UNIQUE NOT NULL,
  nombre              VARCHAR(150) NOT NULL,
  cargo               VARCHAR(120),
  area                VARCHAR(120),
  enfoque             TEXT,
  cita                TEXT,
  mensaje_bienvenida  TEXT,
  foto_url            TEXT,
  bio_trayectoria     TEXT,
  bio_enfoque         TEXT,
  contacto_email      VARCHAR(150),
  orden               INT DEFAULT 0
);

CREATE TABLE directivo_grados (
  id            SERIAL PRIMARY KEY,
  directivo_id  INT REFERENCES directivos(id) ON DELETE CASCADE,
  titulo        VARCHAR(150),
  institucion   VARCHAR(150)
);

-- ---------------------------------------------------------
-- C. OFERTA ACADÉMICA
-- ---------------------------------------------------------

CREATE TABLE programas_academicos (
  id                    SERIAL PRIMARY KEY,
  nombre                VARCHAR(150) NOT NULL,
  tipo                  VARCHAR(30) NOT NULL,
  mapa_curricular_url   TEXT,
  plan_estudios_url     TEXT,
  descripcion           TEXT
);

CREATE TABLE cursos_servicios (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id),
  nombre        VARCHAR(150) NOT NULL,
  nivel_edad    VARCHAR(60),
  horarios      TEXT,
  pdf_url       TEXT,
  activo        BOOLEAN DEFAULT TRUE
);

CREATE TABLE calendario_eventos (
  id                SERIAL PRIMARY KEY,
  seccion_id        INT REFERENCES secciones(id),
  curso_id          INT REFERENCES cursos_servicios(id),
  nombre_evento     VARCHAR(150) NOT NULL,
  fecha_inicio      DATE NOT NULL,
  fecha_fin         DATE,
  etiqueta_periodo  VARCHAR(50)
);

-- Estructura lista, sin datos: los precios/descuentos aún no son reales (confirmado con el cliente).
CREATE TABLE conceptos_pago (
  id              SERIAL PRIMARY KEY,
  seccion_id      INT REFERENCES secciones(id),
  curso_id        INT REFERENCES cursos_servicios(id),
  concepto        VARCHAR(150) NOT NULL,
  monto           NUMERIC(10,2) NOT NULL,
  moneda          VARCHAR(5) DEFAULT 'MXN',
  descuento_pct   NUMERIC(5,2),
  vigente_desde   DATE,
  vigente_hasta   DATE
);

-- ---------------------------------------------------------
-- D. CONTENIDO DINÁMICO
-- ---------------------------------------------------------

CREATE TABLE anuncios_noticias (
  id              SERIAL PRIMARY KEY,
  tipo            VARCHAR(20) NOT NULL,
  titulo          VARCHAR(200) NOT NULL,
  resumen         TEXT,
  cuerpo          TEXT,
  fecha           DATE,
  imagen_url      TEXT,
  pdf_url         TEXT,
  cta_label       VARCHAR(80),
  cta_href        TEXT,
  orden           INT DEFAULT 0,
  publicado       BOOLEAN DEFAULT TRUE
);

CREATE TABLE historia_eventos (
  id            SERIAL PRIMARY KEY,
  anio          VARCHAR(20) NOT NULL,
  tag           VARCHAR(60),
  titulo        VARCHAR(200) NOT NULL,
  cuerpo        TEXT,
  imagen_url    TEXT,
  orden         INT DEFAULT 0
);

CREATE TABLE preguntas_frecuentes (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id),
  pregunta      TEXT NOT NULL,
  respuesta     TEXT NOT NULL,
  orden         INT DEFAULT 0
);

-- ---------------------------------------------------------
-- E. COMUNIDAD
-- ---------------------------------------------------------

CREATE TABLE grupos_estudiantiles (
  id              SERIAL PRIMARY KEY,
  categoria       VARCHAR(60),
  nombre          VARCHAR(150) NOT NULL,
  apodo           VARCHAR(100),
  descripcion     TEXT,
  num_miembros    INT,
  logros          TEXT,
  contacto_email  VARCHAR(150),
  destacado       BOOLEAN DEFAULT FALSE,
  es_nuevo        BOOLEAN DEFAULT FALSE
);

CREATE TABLE testimonios (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id),
  nombre        VARCHAR(150) NOT NULL,
  generacion    VARCHAR(20),
  carrera       VARCHAR(120),
  foto_url      TEXT,
  testimonio    TEXT,
  publicado     BOOLEAN DEFAULT TRUE
);

-- ---------------------------------------------------------
-- F. INTERACCIÓN DEL USUARIO
-- ---------------------------------------------------------

CREATE TABLE calificaciones (
  id            SERIAL PRIMARY KEY,
  puntuacion    SMALLINT CHECK (puntuacion BETWEEN 1 AND 5),
  comentario    TEXT,
  seccion_id    INT REFERENCES secciones(id),
  creado_en     TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE visitas (
  id            SERIAL PRIMARY KEY,
  seccion_id    INT REFERENCES secciones(id),
  sesion_id     VARCHAR(64),
  creado_en     TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- G. CAFECA
-- ---------------------------------------------------------

CREATE TABLE menu_cafeteria (
  id            SERIAL PRIMARY KEY,
  categoria     VARCHAR(80) NOT NULL,
  nombre        VARCHAR(150) NOT NULL,
  precio        NUMERIC(8,2) NOT NULL
);

-- =========================================================
-- SEGURIDAD (RLS)
-- El proyecto se creó con "Automatically expose new tables" desactivado
-- y "Enable automatic RLS" activado, así que estas tablas ya nacen con
-- RLS activo. Aquí se agregan las políticas explícitas:
--   - Contenido informativo: lectura pública, sin escritura pública
--     (la escritura la hará más adelante un panel de administración
--     con la service_role key, que nunca vive en el frontend).
--   - calificaciones / visitas: el público puede INSERTAR pero no
--     leer, editar ni borrar lo que otros enviaron.
-- =========================================================

ALTER TABLE secciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloques_contenido ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_sitio ENABLE ROW LEVEL SECURITY;
ALTER TABLE directivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE directivo_grados ENABLE ROW LEVEL SECURITY;
ALTER TABLE programas_academicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos_servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendario_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conceptos_pago ENABLE ROW LEVEL SECURITY;
ALTER TABLE anuncios_noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE historia_eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas_frecuentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos_estudiantiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;
ALTER TABLE calificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_cafeteria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lectura_publica" ON secciones FOR SELECT USING (activa = true);
CREATE POLICY "lectura_publica" ON bloques_contenido FOR SELECT USING (publicado = true);
CREATE POLICY "lectura_publica" ON documentos FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON configuracion_sitio FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON directivos FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON directivo_grados FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON programas_academicos FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON cursos_servicios FOR SELECT USING (activo = true);
CREATE POLICY "lectura_publica" ON calendario_eventos FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON conceptos_pago FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON anuncios_noticias FOR SELECT USING (publicado = true);
CREATE POLICY "lectura_publica" ON historia_eventos FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON preguntas_frecuentes FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON grupos_estudiantiles FOR SELECT USING (true);
CREATE POLICY "lectura_publica" ON testimonios FOR SELECT USING (publicado = true);
CREATE POLICY "lectura_publica" ON menu_cafeteria FOR SELECT USING (true);

CREATE POLICY "insercion_publica" ON calificaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "insercion_publica" ON visitas FOR INSERT WITH CHECK (true);
