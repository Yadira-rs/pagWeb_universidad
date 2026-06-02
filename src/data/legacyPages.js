export const legacyPages = {
  licenciaturas: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/lic.jpg",
    kicker: "Oferta académica",
    title: "Licenciaturas FECA",
    intro:
      "Conoce los programas presenciales de la Facultad de Economía, Contaduría y Administración.",
    panels: [
      {
        title: "Planes disponibles",
        body:
          "Consulta y descarga los documentos disponibles para cada programa.",
      },
      {
        title: "Contador Público P2021",
        body:
          "Formación en información financiera, fiscal, administrativa, auditoría, costos y finanzas para la toma de decisiones.",
        actions: [
          {
            href: "/docs/plan-de-estudios_cp_2021.pdf",
            label: "Descargar plan",
          },
          {
            href: "/docs/mapa-curricular_cp_2021.pdf",
            label: "Mapa curricular",
          },
        ],
      },
      {
        title: "Licenciado en Administración P2021",
        body:
          "Formación para planear, dirigir y evaluar organizaciones con visión estratégica, flexible y emprendedora.",
        actions: [
          {
            href: "/docs/plan_de_estudios_la_2021.pdf",
            label: "Descargar plan",
          },
          {
            href: "/docs/mapas_curriculares_la_2021.pdf",
            label: "Mapa curricular",
          },
        ],
      },
      {
        title: "Licenciado en Economía y Negocios Internacionales P2021",
        body:
          "Formación en análisis económico, comercio exterior, finanzas, mercados y negocios internacionales.",
        actions: [
          {
            href: "/docs/plan_de_estudios_leni_2021.pdf",
            label: "Descargar plan",
          },
          {
            href: "/docs/mapas_curriculares_leni_2021.pdf",
            label: "Mapa curricular",
          },
        ],
      },
      {
        title: "Contador Público P2014",
        body:
          "Objetivo: formar profesionales capaces de aplicar técnicas y conocimientos de contabilidad financiera y administrativa, fiscal y financiera para generar, analizar y emitir opiniones sobre información confiable, con carácter emprendedor y responsabilidad social. Plan anterior disponible para consulta académica y administrativa.",
        actions: [
          {
            href: "/docs/cp_plan_de_estudio_2014.pdf",
            label: "Contenido",
          },
          {
            href: "/docs/cp_plan_de_estudio_2014.pdf",
            label: "Descargar plan",
          },
        ],
      },
      {
        title: "Licenciado en Administración P2014",
        body:
          "Objetivo: diseñar organizaciones y garantizar su funcionamiento mediante la gestión de recursos financieros, tecnológicos y de talento humano, con enfoque en efectividad, rentabilidad, competitividad y responsabilidad social. Plan anterior disponible para consulta académica y administrativa.",
        actions: [
          {
            href: "/docs/cp_plan_de_estudio_2014.pdf",
            label: "Contenido",
          },
          {
            href: "/docs/la_plan_de_estudio_2014.pdf",
            label: "Descargar plan",
          },
        ],
      },
      {
        title: "Licenciado en Economía y Negocios Internacionales P2014",
        body:
          "Objetivo: dotar a los egresados de una formación equilibrada en teoría económica, finanzas y comercio internacional, con capacidad para diseñar y evaluar escenarios de competitividad global. Plan anterior disponible para consulta académica y administrativa.",
        actions: [
          {
            href: "/docs/cp_plan_de_estudio_2014.pdf",
            label: "Contenido",
          },
          {
            href: "/docs/leni_plan_de_estudio_2014.pdf",
            label: "Descargar plan",
          },
        ],
      },
    ],
  },
  administracion: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/aniversario.jpeg",
    kicker: "Licenciatura",
    title: "Administración",
    intro:
      "Desarrolla habilidades para planear, organizar y dirigir empresas, proyectos y equipos con enfoque estratégico, innovador y humano.",
    stats: [
      { label: "Duración", value: "4 años aproximadamente" },
      { label: "Modalidad", value: "Presencial" },
      { label: "Perfil", value: "Liderazgo, estrategia y gestión" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "La Licenciatura en Administración forma profesionales capaces de gestionar recursos, procesos y personas para lograr objetivos organizacionales. Combina estrategia, finanzas, mercadotecnia, talento humano y emprendimiento.",
      },
      {
        title: "Contacto",
        body:
          "Informes en FECA al teléfono (618) 827-13-65 o en informes@universidad.edu.mx.",
        variant: "contact",
      },
      {
        title: "Lo que aprenderás",
        items: [
          "Diseñar planes estratégicos y modelos de negocio.",
          "Gestionar equipos, recursos humanos y procesos administrativos.",
          "Analizar finanzas, mercadotecnia y operaciones.",
          "Desarrollar proyectos emprendedores y de mejora organizacional.",
        ],
      },
      {
        title: "Campo laboral",
        items: [
          "Dirección y coordinación administrativa",
          "Recursos humanos y desarrollo organizacional",
          "Emprendimiento y consultoría",
          "Gestión de proyectos y operaciones",
        ],
      },
    ],
  },
  contabilidad: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/imagen.jpeg",
    kicker: "Licenciatura",
    title: "Contabilidad",
    intro:
      "Prepara profesionales para interpretar información financiera, cumplir obligaciones fiscales, auditar procesos y apoyar la toma de decisiones empresariales.",
    stats: [
      { label: "Duración", value: "4 años aproximadamente" },
      { label: "Modalidad", value: "Presencial" },
      { label: "Perfil", value: "Finanzas, auditoría y responsabilidad fiscal" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "La Licenciatura en Contabilidad forma profesionistas capaces de registrar, analizar y comunicar información financiera confiable. Integra contabilidad, auditoría, fiscal, costos, finanzas y control interno con sentido ético.",
      },
      {
        title: "Contacto",
        body:
          "Informes en FECA al teléfono (618) 827-13-65 o en informes@universidad.edu.mx.",
        variant: "contact",
      },
      {
        title: "Lo que aprenderás",
        items: [
          "Elaborar e interpretar estados financieros.",
          "Aplicar normas contables, fiscales y de auditoría.",
          "Diseñar controles para proteger recursos de una organización.",
          "Analizar costos y presupuestos para apoyar decisiones.",
        ],
      },
      {
        title: "Campo laboral",
        items: [
          "Despachos contables y auditoría",
          "Áreas fiscales y financieras",
          "Contraloría y control interno",
          "Consultoría empresarial",
        ],
      },
    ],
  },
  economia: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/inicio.png",
    kicker: "Licenciatura",
    title: "Economía",
    intro:
      "Forma especialistas capaces de analizar mercados, políticas públicas, finanzas y desarrollo regional para proponer soluciones con base en datos.",
    stats: [
      { label: "Duración", value: "4 años aproximadamente" },
      { label: "Modalidad", value: "Presencial" },
      { label: "Perfil", value: "Análisis, datos y pensamiento crítico" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "La Licenciatura en Economía prepara estudiantes para interpretar fenómenos económicos, evaluar escenarios y diseñar propuestas para organizaciones públicas, privadas y sociales. Integra teoría económica, estadística, finanzas y análisis regional.",
      },
      {
        title: "Contacto",
        body:
          "Informes en FECA al teléfono (618) 827-13-65 o en informes@universidad.edu.mx.",
        variant: "contact",
      },
      {
        title: "Lo que aprenderás",
        items: [
          "Analizar mercados, precios, empleo, inflación y crecimiento económico.",
          "Usar herramientas estadísticas para interpretar datos y tendencias.",
          "Evaluar políticas públicas y proyectos de desarrollo.",
          "Construir diagnósticos económicos para empresas e instituciones.",
        ],
      },
      {
        title: "Campo laboral",
        items: [
          "Sector público y planeación económica",
          "Consultoría y análisis de mercados",
          "Instituciones financieras",
          "Investigación económica y social",
        ],
      },
    ],
  },
  "licenciaturas-distancia": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/distancia.jpg",
    kicker: "Modalidad en linea",
    title: "Licenciaturas a Distancia",
    intro:
      "Programas disenados para estudiar desde casa con apoyo academico y herramientas digitales.",
    panels: [
      {
        title: "Planes de estudio",
        body:
          "Consulta y descarga los planes de estudio disponibles para modalidad a distancia.",
      },
      {
        title: "Contador Publico P2018",
        body:
          "Formación en análisis financiero, gestión contable, fiscal y auditoría en modalidad a distancia.",
        actions: [
          {
            href: "/docs/Plan_estudios_LA_2018_distancia.pdf",
            label: "Descargar plan",
          },
        ],
      },
      {
        title: "Licenciado en Administración P2018",
        body:
          "Formación para planear, dirigir y evaluar organizaciones con visión estratégica y flexible.",
        actions: [
          {
            href: "/docs/Plan_estudios_LA_2018_distancia (1).pdf",
            label: "Descargar plan",
          },
        ],
      },
    ],
  },
  posgrado: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/lic.jpg",
    kicker: "Oferta academica",
    title: "Posgrado",
    intro:
      "Programas de formación avanzada para fortalecer la investigación, la gestión y el desarrollo profesional.",
    panels: [
      {
        title: "Programas de posgrado",
        body:
          "Selecciona un programa para descargar su documento informativo.",
      },
      {
        title: "Especialidad en Administracion de Hospitales",
        body: "Documento del programa de especialidad.",
        actions: [
          {
            href: "/docs/Plan_estudio_Especialidad_de_Administracion_de_Hospitales.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Gestión Pública",
        body: "Documento del programa de maestría.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Gestion_Publica.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Gestión de Negocios",
        body: "Documento del programa de maestría.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Gestion_de_Negocios.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Estrategias Contables",
        body: "Documento del programa de maestría.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Estrategias_Contables.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Mercadotecnia",
        body: "Documento del programa de maestría.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Mercadotecnia.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Economía",
        body: "Documento del programa de maestria.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Economia.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Maestría en Auditoría Gubernamental",
        body: "Documento del programa de maestría.",
        actions: [
          {
            href: "/docs/Plan_estudio_Maestria_en_Auditoria_Gubernamental.pdf",
            label: "Descargar documento",
          },
        ],
      },
      {
        title: "Doctorado en Gestion de las Organizaciones",
        body:
          "Documento del programa de doctorado. El archivo PDF no se encontro en la carpeta de documentos del proyecto.",
      },
      {
        title: "Contacto",
        body:
          "Facultad de Economía, Contaduría y Administración. Teléfono: (618) 827-13-65. Ubicación: Fanny Anitua y Priv. Loza s/n, C.P. 34000, Durango, Dgo.",
        variant: "contact",
        items: [
          "Facultad: Facultad de Economía, Contaduría y Administración",
          "Telefono: (618) 827-13-65",
          "Ubicacion: Fanny Anitua y Priv. Loza s/n, C.P. 34000, Durango, Dgo.",
        ],
      },
    ],
  },
  "curso-propedeutico": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/objetivo1.jpg",
    kicker: "Nuevo ingreso",
    title: "Curso Propedeutico",
    intro:
      "Preparacion academica para aspirantes a ingresar a la Facultad de Economia, Contaduria y Administracion.",
    stats: [
      { label: "Modalidades", value: "Presencial y virtual" },
      { label: "Dirigido a", value: "Aspirantes de nuevo ingreso" },
      { label: "Contacto", value: "propedeuticofeca@ujed.mx" },
    ],
    panels: [
      {
        title: "Historia",
        paragraphs: [
          "Desde sus inicios, la Facultad de Economia, Contaduria y Administracion ha tenido como proposito fundamental preparar profesionistas de la contaduria publica y la administracion con un alto nivel academico.",
          "A partir del analisis de los resultados del examen de seleccion y de los indices de reprobacion en materias de primeros semestres, se identifico la necesidad de mejorar la preparacion de los aspirantes para elevar su desempeno academico.",
          "Durante el ciclo B 1989 se establecio en la propia facultad el primer curso propedeutico semestral, el cual ha demostrado su efectividad a traves de estudios de seguimiento de egresados.",
          "Actualmente conserva el mismo proposito en Contaduria Publica, Administracion y, desde 2008, Economia y Negocios Internacionales.",
        ],
      },
      {
        title: "Mision",
        body:
          "Formamos a nuestros alumnos para ingresar en la FECA, proporcionandoles herramientas para mejorar su desempeno academico y orientarlos en su definicion profesional.",
      },
      {
        title: "Vision",
        body:
          "Posicionarnos como un propedeutico de licenciatura reconocido por su calidad, orientando al aspirante a una eleccion adecuada de carrera y culminacion exitosa de estudios.",
      },
      {
        title: "Modalidad presencial",
        body: "Los alumnos asisten de lunes a viernes a clases.",
        items: [
          "Contabilidad",
          "Administracion",
          "Matematicas",
          "Computacion",
          "Metodos de Estudio",
          "Economia",
          "Ingles",
        ],
      },
      {
        title: "Modalidad virtual",
        body: "El curso se ofrece a traves de la plataforma Moodle.",
        items: [
          "Contabilidad",
          "Administracion",
          "Matematicas",
          "Desarrollo de TIC's",
          "Metodos de Estudio",
          "Ingles",
        ],
      },
      {
        title: "Contacto",
        body:
          "Telefono: (618) 8 27 13 65. Correo: propedeuticofeca@ujed.mx. Oficinas: instalaciones de la Facultad.",
        variant: "contact",
        actions: [
          {
            href: "mailto:propedeuticofeca@ujed.mx",
            label: "Enviar correo",
          },
        ],
      },
    ],
  },
  "curso-propedeutico": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/objetivo1.jpg",
    kicker: "Nuevo ingreso",
    title: "Curso Propedeutico",
    intro:
      "Preparacion academica para aspirantes a ingresar a la Facultad de Economia, Contaduria y Administracion.",
    tabs: [
      { href: "historia", label: "Historia" },
      { href: "mision", label: "Mision y vision" },
      { href: "modalidades", label: "Modalidades" },
      { href: "contacto", label: "Contacto" },
    ],
    sections: [
      {
        id: "historia",
        label: "Antecedentes",
        title: "Historia",
        variant: "wide",
        paragraphs: [
          "Desde sus inicios, la Facultad de Economia, Contaduria y Administracion ha tenido como proposito fundamental preparar profesionistas de la contaduria publica y la administracion con un alto nivel academico.",
          "A partir del analisis de los resultados del examen de seleccion y de los indices de reprobacion en materias de primeros semestres, se identifico la necesidad de mejorar la preparacion de los aspirantes para elevar su desempeno academico.",
          "Durante el ciclo B 1989 se establecio en la propia facultad el primer curso propedeutico semestral, el cual ha demostrado su efectividad a traves de estudios de seguimiento de egresados.",
          "Actualmente conserva el mismo proposito en Contaduria Publica, Administracion y, desde 2008, Economia y Negocios Internacionales.",
        ],
      },
      {
        id: "mision",
        label: "Identidad",
        title: "Mision y vision",
        cards: [
          {
            title: "Mision",
            body:
              "Formamos a nuestros alumnos para ingresar en la FECA, proporcionandoles herramientas para mejorar su desempeno academico y orientarlos en su definicion profesional.",
          },
          {
            title: "Vision",
            body:
              "Posicionarnos como un propedeutico de licenciatura reconocido por su calidad, orientando al aspirante a una eleccion adecuada de carrera y culminacion exitosa de estudios.",
          },
          {
            title: "Proposito",
            body:
              "Fortalecer conocimientos y facilitar la integracion a la vida universitaria.",
          },
        ],
      },
      {
        id: "modalidades",
        label: "Oferta",
        title: "Modalidades que se cursan",
        cards: [
          {
            title: "Modalidad Presencial",
            body: "Los alumnos asisten de lunes a viernes a clases.",
            items: [
              "Contabilidad",
              "Administracion",
              "Matematicas",
              "Computacion",
              "Metodos de Estudio",
              "Economia",
              "Ingles",
            ],
          },
          {
            title: "Modalidad Virtual",
            body: "El curso se ofrece a traves de la plataforma Moodle.",
            items: [
              "Contabilidad",
              "Administracion",
              "Matematicas",
              "Desarrollo de TIC's",
              "Metodos de Estudio",
              "Ingles",
            ],
          },
        ],
      },
      {
        id: "contacto",
        label: "Informes",
        title: "Contacto",
        variant: "wide",
        contacts: [
          { label: "Telefono", value: "(618) 8 27 13 65" },
          {
            label: "Correo",
            value: "propedeuticofeca@ujed.mx",
            href: "mailto:propedeuticofeca@ujed.mx",
          },
          { label: "Oficinas", value: "Instalaciones de la Facultad" },
        ],
      },
    ],
  },
  "cursos-intersemestrales": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/objetivo1.jpg",
    kicker: "Oferta academica",
    title: "Cursos Intersemestrales",
    intro:
      "Espacio academico para consultar la oferta de cursos intersemestrales de la Facultad de Economia, Contaduria y Administracion.",
    panels: [
      {
        title: "Proximamente",
        body:
          "Esta pagina ya comparte el diseno institucional de FECA. Cuando tengas la informacion de cursos intersemestrales, la integramos aqui.",
      },
      {
        title: "Oferta disponible",
        body:
          "Consulta posteriormente las materias, horarios, docentes y requisitos de inscripcion.",
        actions: [
          {
            href: "/docs/CUSRSOS INTERSEMESTRALES.pdf",
            label: "Descargar plan",
          },
        ],
      },
      {
        title: "Contacto",
        body:
          "Facultad de Economia, Contaduria y Administracion. Tel. (618) 827-13-65.",
        variant: "contact",
      },
    ],
  },
  celci: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/lic.jpg",
    kicker: "Ciclo A-2025 | Modalidad presencial",
    title: "Centro de Lenguas e Internacionalizacion",
    intro:
      "Cursos de idiomas para adultos, niños y jóvenes en la Facultad de Economía, Contaduría y Administración.",
    tabMode: "switch",
    tabs: [
      { href: "cursos", label: "Cursos" },
      { href: "costos", label: "Costos" },
      { href: "inscripcion", label: "Proceso inscripcion" },
      { href: "diagnostico", label: "Examen de diagnostico" },
      { href: "preguntas", label: "Preguntas frecuentes" },
      { href: "informacion", label: "Información general" },
      { href: "contacto", label: "Contacto" },
    ],
    sections: [
      {
        id: "cursos",
        label: "Oferta",
        title: "Cursos",
        cards: [
          {
            title: "Ingles para adultos",
            body: "Mayores de 15 años.",
            items: [
              "Lunes a viernes: 1 hora diaria.",
              "Sabatinos: 9:00 a.m. a 2:00 p.m.",
            ],
            actions: [
              {
                href: "/docs/horarios_ingles_adultos.pdf",
                label: "Ver horarios",
              },
            ],
          },
          {
            title: "Inglés para niños",
            body:
              "Edad: 8 a 11 años. En febrero-junio solamente hay inscripciones de reingreso.",
            items: ["Sabatinos: 9:00 a.m. a 2:00 p.m."],
            actions: [
              {
                href: "/docs/horarios_ingles_ninos.pdf",
                label: "Ver horarios",
              },
            ],
          },
          {
            title: "Inglés para jóvenes",
            body: "Edad: 12 a 15 años.",
            items: ["Sabatinos: 9:00 a.m. a 2:00 p.m."],
            actions: [
              {
                href: "/docs/horarios_ingles_jovenes.pdf",
                label: "Ver horarios",
              },
            ],
          },
          {
            title: "Frances",
            body: "15 años en adelante.",
            items: ["Lunes a viernes: 1 hora diaria."],
            actions: [
              {
                href: "/docs/horarios_frances.pdf",
                label: "Ver horarios",
              },
            ],
          },
          {
            title: "Italiano",
            body: "15 años en adelante.",
            items: ["Lunes a viernes: 1 hora diaria."],
            actions: [
              {
                href: "/docs/horarios_italiano.pdf",
                label: "Ver horarios",
              },
            ],
          },
          {
            title: "Japones",
            body: "15 años en adelante.",
            items: ["Lunes a viernes: 1 hora diaria."],
            actions: [
              {
                href: "/docs/horarios_japones.pdf",
                label: "Ver horarios",
              },
            ],
          },
        ],
      },
      {
        id: "costos",
        label: "Ciclo A-2025",
        title: "Costos",
        cards: [
          {
            title: "Ingles",
            price: "$1,100",
            body:
              "Estudiantes UJED: 10% de descuento. Estudiantes FECA: 25% de descuento.",
          },
          {
            title: "Frances, italiano y japones",
            price: "$700",
            body: "Precio unico. No hay descuentos.",
          },
        ],
      },
      {
        id: "inscripcion",
        label: "Tramite",
        title: "Proceso inscripcion",
        variant: "wide",
        paragraphs: [
          "Para realizar tu inscripcion, comunicate al Centro de Lenguas e Internacionalizacion o acude a las instalaciones de la Facultad. Ahi podran orientarte sobre horarios disponibles, costos, requisitos y grupos abiertos.",
        ],
        contacts: [
          { label: "Modalidad", value: "Presencial" },
          { label: "Ciclo", value: "A-2025" },
          { label: "Atencion", value: "Oficinas del Centro de Lenguas" },
        ],
      },
      {
        id: "diagnostico",
        label: "Ubicacion de nivel",
        title: "Examen de diagnostico",
        variant: "wide",
        paragraphs: [
          "El examen de diagnostico para ubicarte en el nivel correcto, si tienes conocimientos del idioma, esta disponible en el modulo de inscripciones del SUMA.",
        ],
      },
      {
        id: "preguntas",
        label: "Ayuda",
        title: "Preguntas frecuentes",
        faq: [
          {
            question:
              "1. Soy alumno de reingreso y no se cual es mi matricula. Como puedo conseguirla?",
            answer:
              "Puedes solicitarla enviando tu nombre completo a cli.feca@ujed.mx, por Facebook en facebook/CLI.FECA.UJED o por telefono al 827-13-65 ext. 5725, lunes, miercoles y viernes de 10:00 a.m. a 2:00 p.m.",
          },
          {
            question:
              "2. Ya tengo mi matricula pero no se mi contrasena. Como puedo conseguirla?",
            answer:
              "La primera vez que entres al SUMA+ usa tu matricula como contrasena. Al entrar, el sistema te pedira que la cambies por una nueva.",
          },
          {
            question: "3. Cual es el numero de cuenta al que debo hacer mi pago?",
            answer:
              "Una vez que selecciones tu clase, el sistema te dara datos de cuenta, monto y referencia. Incluye la referencia correcta para identificar tu pago automaticamente.",
          },
          {
            question: "4. Soy trabajador de la UJED. Como tramito mi exencion de pago?",
            answer:
              "El tramite se hace con la Coordinacion de Finanzas y Planeacion y no sustituye la inscripcion del CLI. Despues de enviarlo, recibiras tu folio entre 24 y 48 horas; la validacion puede demorar hasta 72 horas adicionales.",
            href: "https://forms.gle/cQmnVdiDu1ujkQKq6",
            hrefLabel: "Formulario de exencion",
          },
        ],
      },
      {
        id: "informacion",
        label: "Identidad",
        title: "Información general",
        variant: "wide",
        paragraphs: [
          "El Centro de Idiomas de la FECA de la UJED fue fundado formalmente en 1975 bajo la dirección del C.P. Mtro. Rubén Vargas Quiñones. Desde sus inicios ha desempeñado un papel fundamental en la enseñanza de lenguas extranjeras.",
          "Actualmente atiende a más de mil alumnos, ofreciendo formación de calidad en inglés, italiano, francés y japonés para estudiantes universitarios y público en general.",
        ],
        cards: [
          {
            title: "Mision",
            body:
              "Ofrecer programas educativos en lengua extranjera y servicios especializados de alta calidad que sumen ventajas competitivas en un entorno global.",
          },
          {
            title: "Visión",
            body:
              "Ser un centro reconocido por la excelencia en la enseñanza de lenguas extranjeras y por contribuir al desarrollo integral e intercultural.",
          },
          {
            title: "Normativa",
            body: "Reglamentos aplicables para grupos infantiles y juveniles.",
            items: ["Reglamento de niños", "Reglamento de jóvenes"],
          },
        ],
      },
      {
        id: "contacto",
        label: "Informes",
        title: "Ubicacion y contacto",
        variant: "wide",
        contacts: [
          {
            label: "Direccion",
            value:
              "Fanny Anitua y Privada de Loza s/n. C.P. 34000 Durango, Dgo., Mexico",
          },
          { label: "Telefono", value: "827-13-65 ext. 5725" },
          {
            label: "Correo",
            value: "cli.feca@ujed.mx",
            href: "mailto:cli.feca@ujed.mx",
          },
        ],
      },
    ],
  },
  ciiedo: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/inicio.png",
    kicker: "Centro de innovación",
    title: "CIIEDO",
    intro:
      "Espacio enfocado en impulsar proyectos, estrategias y acompañamiento para el desarrollo organizacional, emprendedor y académico.",
    stats: [
      { label: "Proyectos", value: "Innovación y emprendimiento" },
      { label: "Modalidad", value: "Acompañamiento práctico" },
      { label: "Enfoque", value: "Desarrollo organizacional" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "CIIEDO promueve la vinculación entre estudiantes, docentes y proyectos aplicados para fortalecer la cultura emprendedora y la mejora continua.",
      },
      {
        title: "Contacto",
        body:
          "Atención en coordinación de vinculación y actividades académicas FECA.",
        variant: "contact",
      },
      {
        title: "Servicios y actividades",
        items: [
          "Asesoría para proyectos de innovación.",
          "Acompañamiento a ideas de negocio.",
          "Talleres de desarrollo organizacional.",
          "Vinculación con iniciativas institucionales.",
        ],
      },
      {
        title: "Áreas de apoyo",
        items: [
          "Innovación",
          "Emprendimiento",
          "Consultoría",
          "Desarrollo institucional",
        ],
      },
    ],
  },
  "campus-central-archivo": {
    routeGroup: "legacy-campus",
    heroImage: "/imagenes/aniversario.jpeg",
    kicker: "Vida universitaria",
    title: "Campus central",
    intro:
      "El punto de encuentro de la comunidad FECA: aulas, espacios de estudio, áreas verdes y zonas para convivir entre clases.",
    stats: [
      { label: "Aulas", value: "Espacios para clases y talleres" },
      { label: "Ambiente", value: "Convivencia y aprendizaje" },
      { label: "Apoyo", value: "Biblioteca y áreas académicas" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "El campus central concentra la vida diaria de la facultad. Es un espacio pensado para estudiar, reunirse con compañeros, asistir a clases y participar en actividades académicas.",
      },
      {
        title: "Ubicación",
        body:
          "Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo., México.",
        variant: "contact",
      },
      {
        title: "Espacios disponibles",
        items: [
          "Aulas para clases presenciales",
          "Áreas verdes y zonas de descanso",
          "Biblioteca y espacios de consulta",
          "Auditorio para conferencias y eventos",
        ],
      },
      {
        title: "Actividades frecuentes",
        items: [
          "Conferencias académicas",
          "Presentaciones de proyectos",
          "Reuniones estudiantiles",
          "Eventos institucionales",
        ],
      },
    ],
  },
  cafeteria: {
    routeGroup: "legacy-campus",
    heroImage: "/imagenes/cafeteria.jpeg",
    kicker: "Vida universitaria",
    title: "Cafetería",
    intro:
      "Un espacio para descansar, conversar y recargar energía durante la jornada universitaria.",
    stats: [
      { label: "Ambiente", value: "Convivencia entre estudiantes" },
      { label: "Servicio", value: "Alimentos y bebidas" },
      { label: "Uso", value: "Descanso entre clases" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "La cafetería es un punto de reunión para estudiantes y docentes. Aquí se comparten ideas, se preparan tareas rápidas y se construye parte de la vida cotidiana de la comunidad FECA.",
      },
      {
        title: "Horario sugerido",
        body:
          "Lunes a viernes durante la jornada académica. Los horarios pueden variar por periodo escolar.",
        variant: "contact",
      },
      {
        title: "Servicios",
        items: [
          "Venta de alimentos y bebidas",
          "Mesas para convivencia",
          "Espacio para pausas entre clases",
          "Ambiente cercano a las aulas",
        ],
      },
      {
        title: "Recomendaciones",
        items: [
          "Cuidar la limpieza del espacio",
          "Respetar horarios de mayor afluencia",
          "Usar el área para convivir de forma responsable",
          "Apoyar el consumo local dentro del campus",
        ],
      },
    ],
  },
  "cultura-campus": {
    routeGroup: "legacy-campus",
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
    kicker: "Vida universitaria",
    title: "Cultura y actividades",
    intro:
      "Experiencias extracurriculares para convivir, participar, crear comunidad y desarrollar habilidades más allá del salón.",
    stats: [
      { label: "Eventos", value: "Actividades durante el semestre" },
      { label: "Comunidad", value: "Participación estudiantil" },
      { label: "Formación", value: "Habilidades sociales y liderazgo" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "Las actividades culturales y extracurriculares complementan la formación académica. Son espacios para expresar ideas, convivir, participar en proyectos y fortalecer el sentido de pertenencia a la facultad.",
      },
      {
        title: "Participación",
        body:
          "Consulta convocatorias y fechas con coordinación académica o en los canales oficiales de FECA.",
        variant: "contact",
      },
      {
        title: "Actividades",
        items: [
          "Eventos culturales y académicos",
          "Conferencias y encuentros estudiantiles",
          "Clubes, talleres y dinámicas de integración",
          "Participación en campañas institucionales",
        ],
      },
      {
        title: "Beneficios",
        items: [
          "Desarrollo de liderazgo",
          "Trabajo en equipo",
          "Convivencia universitaria",
          "Identidad y pertenencia FECA",
        ],
      },
    ],
  },
  directores: {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/director.jpeg",
    kicker: "Equipo directivo",
    title: "Directores FECA",
    intro:
      "Autoridades y responsables institucionales que coordinan la planeacion academica, administrativa y de vinculacion de la Facultad de Economia, Contaduria y Administracion.",
    stats: [
      { label: "Gestion", value: "Direccion institucional" },
      { label: "Enfoque", value: "Atencion a estudiantes" },
      { label: "Trabajo", value: "Academia y administracion" },
    ],
    panels: [
      {
        title: "Dirección",
        body:
          "La Direccion encabeza la toma de decisiones estrategicas de la facultad, promueve el desarrollo academico y fortalece la vinculacion con la comunidad universitaria.",
      },
      {
        title: "Subdirecciones y coordinaciones",
        body:
          "Las areas directivas acompanan procesos academicos, administrativos, de investigacion, extension y servicios para apoyar el trabajo de estudiantes, docentes y personal administrativo.",
      },
      {
        title: "Atencion institucional",
        body:
          "Para informacion sobre tramites, citas o seguimiento academico, acercate a las oficinas de la facultad o a los canales oficiales de FECA.",
        variant: "contact",
      },
      {
        title: "Areas de trabajo",
        items: [
          "Planeacion academica y seguimiento estudiantil",
          "Gestion administrativa y servicios escolares",
          "Vinculacion, extension e investigacion",
          "Comunicacion institucional y mejora continua",
        ],
      },
    ],
  },
  "lucia-herrera": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/inicio.png",
    kicker: "Marketing estratégico",
    title: "Dra. Lucía Herrera",
    intro:
      "Docente enfocada en investigación de mercados, posicionamiento de marcas y proyectos comerciales aplicados a empresas locales.",
    stats: [
      { label: "15 años", value: "Experiencia profesional" },
      { label: "Área", value: "Marketing e investigación" },
      { label: "Enfoque", value: "Casos reales" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "La Dra. Lucía Herrera acompaña a estudiantes en el análisis del comportamiento del consumidor y el diseño de estrategias de posicionamiento. Integra trabajo de campo, datos y creatividad para que cada proyecto llegue a una propuesta clara.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Marketing estratégico",
          "Investigación de mercados",
          "Gestión de marca",
          "Plan comercial aplicado",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Consumo local y tendencias",
          "Diseño de campañas",
          "Emprendimiento comercial",
          "Vinculación con empresas",
        ],
      },
    ],
  },
  "jorge-salinas": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/imagen.jpeg",
    kicker: "Finanzas corporativas",
    title: "Mtro. Jorge Salinas",
    intro:
      "Profesor dedicado al análisis financiero, presupuestos, evaluación de inversiones y toma de decisiones con ejercicios de empresas reales.",
    stats: [
      { label: "12 años", value: "Formando líderes" },
      { label: "Área", value: "Finanzas corporativas" },
      { label: "Enfoque", value: "Casos prácticos" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "El Mtro. Jorge Salinas fortalece la comprensión financiera mediante modelos, indicadores y simulaciones. Su clase combina análisis técnico con conversaciones sobre decisiones reales de inversión.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Finanzas corporativas",
          "Evaluación de proyectos",
          "Presupuestos",
          "Análisis financiero",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Planeación financiera",
          "Valoración de inversiones",
          "Indicadores de desempeño",
          "Educación financiera",
        ],
      },
    ],
  },
  "elena-cruz": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/aniversario.jpeg",
    kicker: "Economía internacional",
    title: "Mtra. Elena Cruz",
    intro:
      "Docente con visión global que trabaja comercio, indicadores internacionales y análisis de tendencias para conectar el aula con el mundo.",
    stats: [
      { label: "18 años", value: "Experiencia docente" },
      { label: "Área", value: "Economía internacional" },
      { label: "Enfoque", value: "Visión global" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "La Mtra. Elena Cruz acompaña a los estudiantes en el análisis de mercados internacionales, integración económica y escenarios globales. Sus clases combinan actualidad, datos y discusión crítica.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Economía internacional",
          "Comercio exterior",
          "Análisis de coyuntura",
          "Negociación global",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Competitividad regional",
          "Mercados globales",
          "Indicadores económicos",
          "Movilidad académica",
        ],
      },
    ],
  },
  "mario-torres": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/logo.png",
    kicker: "Liderazgo empresarial",
    title: "Dr. Mario Torres",
    intro:
      "Profesor orientado a liderazgo, estrategia y toma de decisiones en entornos empresariales complejos.",
    stats: [
      { label: "+20 años", value: "Experiencia profesional" },
      { label: "Área", value: "Liderazgo y estrategia" },
      { label: "Enfoque", value: "Mentoría cercana" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "El Dr. Mario Torres trabaja con metodologías de análisis estratégico, simulaciones directivas y proyectos de mejora. Su objetivo es que cada estudiante gane confianza para dirigir equipos y tomar decisiones.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Liderazgo empresarial",
          "Planeación estratégica",
          "Dirección de equipos",
          "Gestión del cambio",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Desarrollo directivo",
          "Estrategia organizacional",
          "Habilidades gerenciales",
          "Mentoría profesional",
        ],
      },
    ],
  },
  "ana-perez": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/inicio.png",
    kicker: "Investigación aplicada",
    title: "Mtra. Ana Pérez",
    intro:
      "Docente dedicada a guiar proyectos de investigación que se traducen en soluciones para empresas, instituciones y comunidades.",
    stats: [
      { label: "10 años", value: "Proyectos aplicados" },
      { label: "Área", value: "Investigación" },
      { label: "Enfoque", value: "Innovación práctica" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "La Mtra. Ana Pérez ayuda a estudiantes a convertir preguntas en proyectos claros, con metodología, evidencia y resultados útiles. Su trabajo combina investigación, diagnóstico y mejora continua.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Metodología de investigación",
          "Proyectos aplicados",
          "Innovación empresarial",
          "Seminario de titulación",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Diagnóstico organizacional",
          "Innovación social",
          "Investigación regional",
          "Mejora continua",
        ],
      },
    ],
  },
  "luis-gomez": {
    routeGroup: "legacy-teacher",
    heroImage: "/imagenes/imagen.jpeg",
    kicker: "Gestión de operaciones",
    title: "Prof. Luis Gómez",
    intro:
      "Profesor enfocado en procesos, productividad, planeación operativa y coordinación de equipos para lograr resultados medibles.",
    stats: [
      { label: "14 años", value: "Experiencia en industria" },
      { label: "Área", value: "Operaciones" },
      { label: "Enfoque", value: "Ejecución efectiva" },
    ],
    panels: [
      {
        title: "Perfil académico",
        body:
          "El Prof. Luis Gómez trabaja con ejemplos de procesos reales para enseñar planeación, control y mejora operativa. Sus clases ayudan a convertir ideas en planes de ejecución claros.",
      },
      {
        title: "Contacto",
        body: "Atención previa cita en coordinación académica FECA.",
        variant: "contact",
      },
      {
        title: "Materias y talleres",
        items: [
          "Gestión de operaciones",
          "Administración de procesos",
          "Logística básica",
          "Productividad empresarial",
        ],
      },
      {
        title: "Líneas de trabajo",
        items: [
          "Optimización de procesos",
          "Indicadores operativos",
          "Coordinación de equipos",
          "Mejora continua",
        ],
      },
    ],
  },
  solicitud: {
    routeGroup: "legacy-admission",
    heroImage: "/imagenes/inicio.png",
    kicker: "Admisiones FECA",
    title: "Inicia tu solicitud",
    intro:
      "Comienza tu proceso de admision con un registro sencillo. Nuestro equipo puede orientarte sobre carreras, requisitos y fechas importantes.",
    steps: [
      {
        title: "1. Registro",
        body: "Comparte tus datos y la carrera de interes.",
      },
      {
        title: "2. Orientacion",
        body: "Recibe informacion sobre requisitos, fechas y documentos.",
      },
      {
        title: "3. Seguimiento",
        body: "Un asesor te acompana hasta completar tu inscripcion.",
      },
    ],
    requirements: [
      "Acta de nacimiento",
      "CURP",
      "Certificado o constancia de bachillerato",
      "Correo y telefono de contacto",
    ],
    formFields: [
      { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Tu nombre" },
      { label: "Teléfono", name: "telefono", type: "tel", placeholder: "(618) 000-0000" },
      { label: "Correo", name: "correo", type: "email", placeholder: "correo@ejemplo.com" },
      {
        label: "Programa de interés",
        name: "programa",
        type: "select",
        options: [
          "Licenciatura en Economía",
          "Licenciatura en Contabilidad",
          "Licenciatura en Administración",
          "Posgrado",
        ],
      },
      {
        label: "Mensaje",
        name: "mensaje",
        type: "textarea",
        placeholder: "Cuentanos si tienes dudas sobre horarios, requisitos o proceso.",
      },
    ],
  },
  "campus-central": {
    routeGroup: "legacy-campus",
    heroImage: "/imagenes/aniversario.jpeg",
    kicker: "Vida universitaria",
    title: "Campus central",
    intro:
      "El punto de encuentro de la comunidad FECA: aulas, espacios de estudio, áreas verdes y zonas para convivir entre clases.",
    stats: [
      { label: "Aulas", value: "Espacios para clases y talleres" },
      { label: "Ambiente", value: "Convivencia y aprendizaje" },
      { label: "Apoyo", value: "Biblioteca y áreas académicas" },
    ],
    panels: [
      {
        title: "Información general",
        body:
          "El campus central concentra la vida diaria de la facultad. Es un espacio pensado para estudiar, reunirse con compañeros, asistir a clases y participar en actividades académicas que fortalecen la experiencia universitaria.",
      },
      {
        title: "Ubicación",
        body:
          "Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo., México.",
        variant: "contact",
      },
      {
        title: "Espacios disponibles",
        items: [
          "Aulas para clases presenciales",
          "Áreas verdes y zonas de descanso",
          "Biblioteca y espacios de consulta",
          "Auditorio para conferencias y eventos",
        ],
      },
      {
        title: "Actividades frecuentes",
        items: [
          "Conferencias académicas",
          "Presentaciones de proyectos",
          "Reuniones estudiantiles",
          "Eventos institucionales",
        ],
      },
    ],
  },
};
