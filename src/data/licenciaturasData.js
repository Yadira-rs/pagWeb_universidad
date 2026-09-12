// Contenido de las pantallas individuales de cada licenciatura presencial
// (#/licenciaturas/:slug), enlazadas desde el submenú "Licenciaturas" del
// header y desde las tarjetas de #/licenciaturas.
//
// Duración (8 semestres / 4 años) confirmada con el dato ya publicado en
// FaqPage.jsx ("¿Cuántos semestres dura cada licenciatura?"). Los enlaces
// de plan de estudios y mapa curricular son los mismos que ya usa la
// tarjeta de cada carrera en legacyPages.js (licenciaturas.sections[0]).

export const licenciaturas = [
  {
    slug: "contador-publico",
    abbr: "CP",
    name: "Contador Público",
    plan: "P2021",
    tagline: "Domina las finanzas, la fiscalidad y la auditoría",
    resumen:
      "Formación en información financiera, fiscal, administrativa, auditoría, costos y finanzas para la toma de decisiones empresariales e institucionales. Te preparamos para ser la persona en quien las organizaciones confían su contabilidad, su cumplimiento fiscal y la salud de sus finanzas.",
    perfilEgreso: [
      "Elaborar, analizar e interpretar estados financieros para la toma de decisiones.",
      "Diseñar y aplicar sistemas de costos y de control interno.",
      "Cumplir y asesorar en materia fiscal, laboral y de seguridad social.",
      "Planear y ejecutar auditorías financieras, fiscales y administrativas.",
      "Participar en la planeación financiera y presupuestal de organizaciones públicas y privadas.",
    ],
    campoLaboral: [
      "Despachos de contaduría y auditoría",
      "Departamentos de finanzas, contabilidad y tesorería",
      "Instituciones públicas y organismos de gobierno",
      "Consultoría fiscal y financiera independiente",
      "Docencia e investigación contable",
    ],
    destacados: [
      "Plan de estudios P2021 actualizado, con mapa curricular disponible para descarga.",
      "Docentes con experiencia profesional en despachos contables y financieros.",
      "Servicio social y prácticas profesionales en empresas e instituciones reales.",
      "Acompañamiento de la Secretaría Académica durante toda tu formación.",
    ],
    planEstudiosHref: "/docs/plan-de-estudios_cp_2021.pdf",
    mapaCurricularHref: "/docs/mapa-curricular_cp_2021.pdf",
  },
  {
    slug: "licenciado-en-administracion",
    abbr: "LA",
    name: "Licenciado en Administración",
    plan: "P2021",
    tagline: "Lidera, planea y transforma organizaciones",
    resumen:
      "Formación para planear, dirigir y evaluar organizaciones con visión estratégica, flexible y emprendedora orientada al liderazgo. Aprenderás a gestionar personas, recursos y proyectos para que cualquier organización —desde una startup hasta una gran empresa— funcione mejor.",
    perfilEgreso: [
      "Diseñar y aplicar estrategias de planeación, organización, dirección y control.",
      "Gestionar el talento humano, la mercadotecnia, las operaciones y las finanzas de una organización.",
      "Detectar oportunidades de negocio y desarrollar proyectos emprendedores.",
      "Tomar decisiones basadas en el análisis de información administrativa y de mercado.",
      "Impulsar la mejora continua y la innovación dentro de las organizaciones.",
    ],
    campoLaboral: [
      "Dirección y gerencia de empresas públicas y privadas",
      "Áreas de recursos humanos, mercadotecnia y operaciones",
      "Consultoría y emprendimiento propio",
      "Instituciones gubernamentales y organismos no lucrativos",
      "Docencia e investigación en administración",
    ],
    destacados: [
      "Plan de estudios P2021 con enfoque en liderazgo, innovación y emprendimiento.",
      "Vinculación con el sector productivo a través de prácticas profesionales y el CIIEDO.",
      "Servicio social en organizaciones públicas y privadas.",
      "Acompañamiento académico a través de tutorías durante toda la carrera.",
    ],
    planEstudiosHref: "/docs/plan_de_estudios_la_2021.pdf",
    mapaCurricularHref: "/docs/mapas_curriculares_la_2021.pdf",
  },
  {
    slug: "economia-y-negocios-internacionales",
    abbr: "LENI",
    name: "Lic. en Economía y Negocios Internacionales",
    plan: "P2021",
    tagline: "Analiza mercados y conecta a México con el mundo",
    resumen:
      "Formación en análisis económico, comercio exterior, finanzas, mercados y negocios internacionales con visión global. Es la carrera para quienes quieren entender cómo se mueve la economía y participar en el comercio entre países y empresas.",
    perfilEgreso: [
      "Analizar el comportamiento de mercados, precios e indicadores económicos.",
      "Diseñar estrategias de comercio exterior, importación y exportación.",
      "Evaluar proyectos de inversión y negocios internacionales.",
      "Interpretar el impacto de políticas económicas y tratados comerciales.",
      "Aplicar herramientas cuantitativas para la toma de decisiones económicas y financieras.",
    ],
    campoLaboral: [
      "Comercio exterior, importación y exportación",
      "Instituciones financieras y de análisis económico",
      "Organismos públicos de planeación y política económica",
      "Empresas con operaciones internacionales",
      "Consultoría económica y de negocios internacionales",
    ],
    destacados: [
      "Plan de estudios P2021 con enfoque en comercio exterior y economía global.",
      "Formación complementaria en idiomas a través del Centro de Lenguas (CELCI).",
      "Servicio social y prácticas profesionales con proyección internacional.",
      "Acompañamiento académico a través de tutorías durante toda la carrera.",
    ],
    planEstudiosHref: "/docs/plan_de_estudios_leni_2021.pdf",
    mapaCurricularHref: "/docs/mapas_curriculares_leni_2021.pdf",
  },
];

export function getLicenciatura(slug) {
  return licenciaturas.find((l) => l.slug === slug);
}
