// Contenido de las pantallas individuales de cada licenciatura presencial
// (#/licenciaturas/:slug), enlazadas desde el submenú "Licenciaturas" del
// header y desde las fotos de la página de inicio.
//
// Duración (8 semestres / 4 años) confirmada con el dato ya publicado en
// FaqPage.jsx ("¿Cuántos semestres dura cada licenciatura?").

export const licenciaturas = [
  {
    slug: "contador-publico",
    abbr: "CP",
    name: "Contador Público",
    plan: "P2021",
    heroImg: "/imagenes/Galeria_4.jpg",
    coordinador: { grado: "Dra.", nombre: "Carmen Eugenia Herrera Sánchez", foto: null },
    tagline: "Domina las finanzas, la fiscalidad y la auditoría",
    resumen: [
      "La Licenciatura en Contador Público te prepara para comprender y transformar la información financiera en decisiones que generan valor para las organizaciones.",
      "Durante tu formación desarrollarás competencias en contabilidad, finanzas, costos, auditoría, control interno, fiscalidad y proyectos de inversión, además de fortalecer tus habilidades para analizar información, resolver problemas y tomar decisiones con visión estratégica.",
      "Aprenderás a utilizar tecnologías de información, interpretar la normatividad y legislación aplicable, y comunicarte de manera efectiva en español e inglés, siempre bajo principios de ética, responsabilidad social y compromiso profesional.",
      "Prepárate para convertir los números en decisiones y las decisiones en oportunidades.",
    ],
    perfilIngreso: {
      intro: "Es deseable que el aspirante tenga:",
      items: [
        "Capacidad para analizar e interpretar información.",
        "Interés por las matemáticas, la contabilidad y las finanzas.",
        "Capacidad para resolver problemas y proponer soluciones.",
        "Facilidad para comunicar sus ideas de manera clara.",
        "Capacidad para trabajar en equipo y colaborar con diferentes personas.",
        "Pensamiento crítico y reflexivo para tomar decisiones.",
        "Disposición para aprender, innovar y adaptarse a los cambios.",
        "Interés por el entorno empresarial y económico.",
      ],
    },
    perfilEgreso: {
      intro:
        "Al concluir la Licenciatura en Contador Público, serás un profesional preparado para analizar información, resolver problemas y tomar decisiones financieras y administrativas que contribuyan al crecimiento de las organizaciones. Contarás con las competencias para:",
      items: [
        "Diseñar y gestionar sistemas de información contable y financiera conforme a la normatividad nacional e internacional.",
        "Analizar información financiera, costos y recursos para apoyar la toma de decisiones.",
        "Aplicar conocimientos en auditoría, control interno y gestión de riesgos.",
        "Interpretar y aplicar disposiciones fiscales, legales y administrativas para el cumplimiento de obligaciones.",
        "Formular y evaluar proyectos de inversión e identificar oportunidades de negocio.",
        "Utilizar tecnologías, plataformas digitales y herramientas de análisis de datos en el ejercicio profesional.",
        "Trabajar en equipos multidisciplinarios, comunicarte de manera efectiva en español e inglés y desarrollar habilidades de liderazgo.",
        "Ejercer la profesión con ética, responsabilidad social, inclusión y compromiso con el desarrollo sostenible.",
      ],
      cierre:
        "Tu formación te permitirá desempeñarte en distintos ámbitos y organizaciones del sector público y privado, adaptarte a nuevos retos y continuar desarrollándote profesionalmente.",
    },
    campoLaboral: {
      intro:
        "Como egresado de la Licenciatura en Contador Público, podrás desarrollarte en organizaciones públicas y privadas, empresas, instituciones financieras, firmas de servicios profesionales y otros sectores, en áreas como:",
      items: [
        "Contabilidad y auditoría",
        "Fiscal y cumplimiento de obligaciones",
        "Finanzas y gestión de recursos",
        "Administración y contraloría",
        "Costos y presupuestos",
        "Control interno y sistemas contables",
        "Proyectos de inversión y proyectos sociales",
        "Asesoría de negocios",
        "Capacitación y consultoría",
        "Docencia e investigación",
      ],
      cierre:
        "Podrás desempeñarte en cargos operativos, de supervisión o directivos, aplicando tus conocimientos para contribuir a la gestión y toma de decisiones de las organizaciones.",
    },
    destacados: [
      "Plan de estudios P2021 actualizado, con mapa curricular disponible para descarga.",
      "Docentes con experiencia profesional en despachos contables y financieros.",
      "Servicio social y prácticas profesionales en empresas e instituciones reales.",
      "Acompañamiento de la Secretaría Académica durante toda tu formación.",
    ],
    planEstudiosHref: "/docs/plan-de-estudios_cp_2021.pdf",
    mapaCurricularHref: "/docs/mapa-curricular_cp_2021.pdf",
    mapaCurricularImg: "/imagenes/mapas/mapa-curricular-cp-2021.jpg",
  },
  {
    slug: "licenciado-en-administracion",
    abbr: "LA",
    name: "Licenciado en Administración",
    plan: "P2021",
    heroImg: "/imagenes/Galeria_5.jpg",
    coordinador: { grado: "Dra.", nombre: "Lourdes Elena Hernández Carrillo", foto: null },
    tagline: "Lidera, planea y transforma organizaciones",
    resumen: [
      "La Licenciatura en Administración te prepara para diseñar, dirigir y transformar organizaciones, desarrollando las habilidades necesarias para gestionar personas, recursos financieros y tecnológicos de manera estratégica.",
      "Durante tu formación aprenderás a planear, organizar, dirigir y evaluar procesos, identificar oportunidades, resolver problemas y tomar decisiones que contribuyan a la eficiencia, rentabilidad y competitividad de las organizaciones.",
      "Desarrollarás competencias para desempeñarte en áreas relacionadas con la gestión empresarial, talento humano, finanzas, negocios y emprendimiento, tanto en organizaciones públicas como privadas y en diferentes contextos nacionales e internacionales.",
      "Además, fortalecerás tus habilidades de liderazgo, innovación, trabajo en equipo y responsabilidad social, preparándote para enfrentar los retos de un entorno empresarial en constante cambio.",
      "Si tienes ideas, te gustan los retos y quieres aprender a convertir oportunidades en resultados, la Administración puede ser tu camino.",
    ],
    perfilIngreso: {
      parrafos: [
        "Si te interesa el mundo de los negocios, las organizaciones y el liderazgo, la Licenciatura en Administración puede ser para ti.",
        "Es deseable que seas una persona con iniciativa, pensamiento crítico y capacidad para resolver problemas, que disfrute analizar información, proponer ideas y buscar nuevas formas de hacer las cosas.",
        "También es importante que tengas facilidad para comunicar tus ideas, trabajar en equipo, interpretar información y utilizar herramientas matemáticas para analizar diferentes situaciones.",
        "Buscamos jóvenes con curiosidad, creatividad y disposición para asumir retos, capaces de escuchar diferentes puntos de vista y convertir sus ideas en soluciones.",
        "Si te gusta tomar la iniciativa, trabajar con personas y transformar ideas en resultados, aquí puedes comenzar a construir tu futuro.",
      ],
    },
    perfilEgreso: {
      intro:
        "Al concluir la Licenciatura en Administración, serás un profesional capaz de gestionar organizaciones, desarrollar proyectos y tomar decisiones estratégicas para responder a los retos de un entorno empresarial en constante cambio. Contarás con las competencias para:",
      items: [
        "Identificar oportunidades de negocio y gestionar proyectos y riesgos para impulsar el crecimiento y permanencia de las organizaciones.",
        "Resolver problemas en áreas como capital humano, operaciones, mercadotecnia y finanzas.",
        "Analizar la situación financiera de las organizaciones y gestionar sus recursos para alcanzar sus objetivos.",
        "Gestionar procesos de producción, logística, calidad y cadena de valor.",
        "Formular y evaluar proyectos de inversión y nuevos negocios en los sectores público y privado.",
        "Utilizar tecnologías y herramientas digitales para analizar información, gestionar procesos y apoyar la toma de decisiones.",
        "Aplicar herramientas de investigación para analizar mercados, identificar necesidades y generar soluciones.",
        "Comunicarte de manera efectiva en español y otra lengua, desenvolviéndote en diferentes contextos profesionales.",
        "Integrar principios de responsabilidad social, desarrollo sustentable y ética profesional en la gestión de las organizaciones.",
      ],
      cierre:
        "Tu formación te permitirá desempeñarte en diferentes áreas de las organizaciones públicas y privadas, participar en proyectos, desarrollar negocios y asumir responsabilidades de gestión y dirección. Prepárate para liderar organizaciones, transformar ideas en proyectos y convertir los retos del entorno en oportunidades.",
    },
    campoLaboral: {
      intro:
        "El egresado de la Licenciatura en Administración puede desarrollarse en organizaciones públicas y privadas, instituciones educativas, empresas de distintos sectores o ejercer de manera independiente, en áreas como:",
      items: [
        "Administración y gestión organizacional",
        "Recursos humanos",
        "Finanzas y contraloría",
        "Mercadotecnia y relaciones públicas",
        "Sistemas y procesos administrativos",
        "Consultoría y asesoría empresarial",
        "Gestión de proyectos",
        "Emprendimiento y creación de empresas",
        "Capacitación",
        "Docencia e investigación",
      ],
    },
    destacados: [
      "Plan de estudios P2021 con enfoque en liderazgo, innovación y emprendimiento.",
      "Vinculación con el sector productivo a través de prácticas profesionales y el CIIEDO.",
      "Servicio social en organizaciones públicas y privadas.",
      "Acompañamiento académico a través de tutorías durante toda la carrera.",
    ],
    planEstudiosHref: "/docs/plan_de_estudios_la_2021.pdf",
    mapaCurricularHref: "/docs/mapas_curriculares_la_2021.pdf",
    mapaCurricularImg: "/imagenes/mapas/mapa-curricular-la-2021.jpg",
  },
  {
    slug: "economia-y-negocios-internacionales",
    abbr: "LENI",
    name: "Lic. en Economía y Negocios Internacionales",
    plan: "P2021",
    heroImg: "/imagenes/Inv_Publicaciones.jpg",
    coordinador: { grado: "Dr.", nombre: "Mario Alberto García Meza", foto: null },
    tagline: "Analiza mercados y conecta a México con el mundo",
    resumen: [
      "La Licenciatura en Economía y Negocios Internacionales te prepara para comprender cómo funcionan los mercados, las empresas y las economías, utilizando teoría económica, herramientas cuantitativas y análisis de datos para interpretar los retos del entorno y proponer soluciones.",
      "Durante tu formación desarrollarás habilidades para analizar fenómenos económicos, tomar decisiones estratégicas, negociar y responder a escenarios económicos cambiantes, tanto en empresas como en mercados financieros y en el sector público.",
      "Además, podrás participar en proyectos relacionados con los negocios internacionales, contribuyendo al crecimiento económico y al desarrollo de propuestas sustentables, innovadoras y socialmente responsables.",
      "Si te interesa entender cómo funciona la economía, analizar el mundo de los negocios y convertir los datos en decisiones, esta carrera puede ser para ti.",
    ],
    perfilIngreso: {
      parrafos: [
        "Si te interesa entender cómo funcionan la economía, los mercados y los negocios, disfrutas analizar información y buscas comprender los cambios que ocurren en México y el mundo, esta carrera puede ser para ti.",
        "Es deseable que tengas facilidad para el análisis, el razonamiento numérico y la interpretación de información, así como interés por investigar, resolver problemas y proponer soluciones.",
        "También buscamos jóvenes con iniciativa, pensamiento crítico y capacidad para tomar decisiones, que sepan comunicarse, trabajar en equipo y adaptarse a nuevos retos.",
        "Tu formación se fortalecerá con valores como la responsabilidad, honestidad, respeto, disciplina y tolerancia, fundamentales para desenvolverte en un entorno profesional global.",
        "Si quieres entender el mundo a través de los datos, analizar oportunidades y participar en los negocios del futuro, aquí puedes comenzar.",
      ],
    },
    perfilEgreso: {
      intro:
        "Al concluir la Licenciatura en Economía y Negocios Internacionales, serás un profesional capaz de analizar fenómenos económicos, interpretar datos y desarrollar estrategias para responder a los retos de los mercados y los negocios en un entorno global. Contarás con las competencias para:",
      items: [
        "Diseñar, analizar y evaluar proyectos desde una perspectiva económica.",
        "Interpretar datos estadísticos y modelos económicos para generar información que apoye la toma de decisiones.",
        "Desarrollar proyectos de inversión y estrategias de comercio exterior.",
        "Crear, emprender e innovar en negocios con una visión global y sostenible.",
        "Aplicar la normatividad económica, financiera, comercial y aduanera en contextos nacionales e internacionales.",
        "Diseñar estrategias de internacionalización de empresas, incluyendo procesos de importación, exportación e inversión extranjera.",
        "Utilizar herramientas matemáticas, estadísticas, econométricas y de investigación para analizar y resolver problemas económicos.",
        "Desarrollarte en español e inglés en contextos académicos, profesionales y de negocios.",
        "Trabajar en equipos multidisciplinarios, asumir roles de liderazgo y adaptarte a los cambios del entorno económico.",
        "Ejercer tu profesión con ética, responsabilidad social, inclusión y respeto al medio ambiente.",
      ],
      cierre:
        "Tu formación te permitirá participar en empresas, mercados financieros, organismos públicos, proyectos de inversión y negocios internacionales, así como desarrollar tus propios proyectos y emprendimientos. Convierte los datos en decisiones, las oportunidades en negocios y tu visión en impacto global.",
    },
    campoLaboral: {
      intro:
        "El egresado de la Licenciatura en Economía y Negocios Internacionales puede desarrollarse en empresas privadas, instituciones públicas, organismos nacionales e internacionales, centros de investigación y organizaciones del sector financiero, en áreas como:",
      items: [
        "Economía y análisis de mercados",
        "Comercio exterior y negocios internacionales",
        "Finanzas y mercados internacionales",
        "Consultoría y asesoría económica",
        "Gestión de recursos y políticas públicas",
        "Diseño y evaluación de proyectos de desarrollo económico",
        "Análisis del entorno económico",
        "Gestión de negocios internacionales",
        "Función pública y organismos internacionales",
        "Investigación y análisis económico",
      ],
    },
    destacados: [
      "Plan de estudios P2021 con enfoque en comercio exterior y economía global.",
      "Formación complementaria en idiomas a través del Centro de Lenguas (CELCI).",
      "Servicio social y prácticas profesionales con proyección internacional.",
      "Acompañamiento académico a través de tutorías durante toda la carrera.",
    ],
    planEstudiosHref: "/docs/plan_de_estudios_leni_2021.pdf",
    mapaCurricularHref: "/docs/mapas_curriculares_leni_2021.pdf",
    mapaCurricularImg: "/imagenes/mapas/mapa-curricular-leni-2021.jpg",
  },
];

export function getLicenciatura(slug) {
  return licenciaturas.find((l) => l.slug === slug);
}
