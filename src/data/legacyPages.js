export const legacyPages = {
  licenciaturas: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/lic.jpg",
    kicker: "Oferta académica",
    title: "Licenciaturas",
    intro:
      "Conoce los programas presenciales de la Facultad de Economía, Contaduría y Administración.",
    tabMode: "switch",
    tabs: [
      { href: "vigentes", label: "Planes 2021" },
      { href: "anteriores", label: "Planes 2014" },
    ],
    sections: [
      {
        id: "vigentes",
        label: "Planes vigentes",
        title: "Programas Plan 2021",
        variant: "programs",
        cards: [
          {
            title: "Contador Público",
            plan: "P2021",
            abbr: "CP",
            color: "#e31313",
            body: "Formación en información financiera, fiscal, administrativa, auditoría, costos y finanzas para la toma de decisiones empresariales e institucionales.",
            actions: [
              { href: "/docs/plan-de-estudios_cp_2021.pdf", label: "Descargar plan" },
              { href: "/docs/mapa-curricular_cp_2021.pdf", label: "Mapa curricular" },
            ],
          },
          {
            title: "Licenciado en Administración",
            plan: "P2021",
            abbr: "LA",
            color: "#e31313",
            body: "Formación para planear, dirigir y evaluar organizaciones con visión estratégica, flexible y emprendedora orientada al liderazgo.",
            actions: [
              { href: "/docs/plan_de_estudios_la_2021.pdf", label: "Descargar plan" },
              { href: "/docs/mapas_curriculares_la_2021.pdf", label: "Mapa curricular" },
            ],
          },
          {
            title: "Lic. en Economía y Negocios Internacionales",
            plan: "P2021",
            abbr: "LENI",
            color: "#e31313",
            body: "Formación en análisis económico, comercio exterior, finanzas, mercados y negocios internacionales con visión global.",
            actions: [
              { href: "/docs/plan_de_estudios_leni_2021.pdf", label: "Descargar plan" },
              { href: "/docs/mapas_curriculares_leni_2021.pdf", label: "Mapa curricular" },
            ],
          },
        ],
      },
      {
        id: "anteriores",
        label: "Planes anteriores",
        title: "Programas Plan 2014",
        variant: "programs",
        note: "Planes anteriores disponibles para consulta académica y administrativa.",
        cards: [
          {
            title: "Contador Público",
            plan: "P2014",
            abbr: "CP",
            color: "#e31313",
            body: "Profesionales capaces de aplicar técnicas de contabilidad financiera, fiscal y administrativa para generar y analizar información confiable con responsabilidad social.",
            actions: [
              { href: "/docs/cp_plan_de_estudio_2014.pdf", label: "Descargar plan" },
            ],
          },
          {
            title: "Licenciado en Administración",
            plan: "P2014",
            abbr: "LA",
            color: "#e31313",
            body: "Diseñar organizaciones y garantizar su funcionamiento mediante la gestión de recursos financieros, tecnológicos y de talento humano con enfoque en competitividad.",
            actions: [
              { href: "/docs/la_plan_de_estudio_2014.pdf", label: "Descargar plan" },
            ],
          },
          {
            title: "Lic. en Economía y Negocios Internacionales",
            plan: "P2014",
            abbr: "LENI",
            color: "#e31313",
            body: "Formación equilibrada en teoría económica, finanzas y comercio internacional con capacidad para diseñar y evaluar escenarios de competitividad global.",
            actions: [
              { href: "/docs/leni_plan_de_estudio_2014.pdf", label: "Descargar plan" },
            ],
          },
        ],
      },
    ],
  },
  "licenciaturas-distancia": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/distancia.jpg",
    kicker: "Modalidad en línea",
    title: "Licenciaturas a Distancia",
    intro:
      "Programas diseñados para estudiar desde casa con apoyo académico y herramientas digitales.",
    planStyle: true,
    panels: [
      {
        title: "Planes de estudio",
        body:
          "Consulta y descarga los planes de estudio disponibles para modalidad a distancia.",
      },
      {
        title: "Contador Público P2018",
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
  "curso-propedeutico": {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/objetivo1.jpg",
    kicker: "Nuevo ingreso",
    title: "Curso Propedéutico",
    intro:
      "Preparación académica para aspirantes a ingresar a la Facultad de Economía, Contaduría y Administración.",
    stats: [
      { label: "Modalidades", value: "Presencial y virtual" },
      { label: "Dirigido a", value: "Aspirantes de nuevo ingreso" },
      { label: "Contacto", value: "propedeuticofeca@ujed.mx" },
    ],
    panels: [
      {
        title: "Historia",
        paragraphs: [
          "Desde sus inicios, la Facultad de Economía, Contaduría y Administración ha tenido como propósito fundamental preparar profesionistas de la contaduría pública y la administración con un alto nivel académico.",
          "A partir del análisis de los resultados del examen de selección y de los índices de reprobación en materias de primeros semestres, se identificó la necesidad de mejorar la preparación de los aspirantes para elevar su desempeño académico.",
          "Durante el ciclo B 1989 se estableció en la propia facultad el primer curso propedéutico semestral, el cual ha demostrado su efectividad a través de estudios de seguimiento de egresados.",
          "Actualmente conserva el mismo propósito en Contaduría Pública, Administración y, desde 2008, Economía y Negocios Internacionales.",
        ],
      },
      {
        title: "Misión",
        body:
          "Formamos a nuestros alumnos para ingresar en la FECA, proporcionándoles herramientas para mejorar su desempeño académico y orientarlos en su definición profesional.",
      },
      {
        title: "Visión",
        body:
          "Posicionarnos como un propedéutico de licenciatura reconocido por su calidad, orientando al aspirante a una elección adecuada de carrera y culminación exitosa de estudios.",
      },
      {
        title: "Modalidad presencial",
        body: "Los alumnos asisten de lunes a viernes a clases.",
        items: [
          "Contabilidad",
          "Administración",
          "Matemáticas",
          "Computación",
          "Métodos de Estudio",
          "Economía",
          "Inglés",
        ],
      },
      {
        title: "Modalidad virtual",
        body: "El curso se ofrece a través de la plataforma Moodle.",
        items: [
          "Contabilidad",
          "Administración",
          "Matemáticas",
          "Desarrollo de TIC's",
          "Métodos de Estudio",
          "Inglés",
        ],
      },
      {
        title: "Contacto",
        body:
          "Teléfono: (618) 8 27 13 65. Correo: propedeuticofeca@ujed.mx. Oficinas: instalaciones de la Facultad.",
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
    title: "Curso Propedéutico",
    intro:
      "Preparación académica para aspirantes a ingresar a la Facultad de Economía, Contaduría y Administración.",
    sections: [
      {
        id: "historia",
        label: "Antecedentes",
        title: "Historia",
        variant: "wide",
        paragraphs: [
          "Desde sus inicios, la Facultad de Economía, Contaduría y Administración ha tenido como propósito fundamental preparar profesionistas de la contaduría pública y la administración con un alto nivel académico.",
          "A partir del análisis de los resultados del examen de selección y de los índices de reprobación en materias de primeros semestres, se identificó la necesidad de mejorar la preparación de los aspirantes para elevar su desempeño académico.",
          "Durante el ciclo B 1989 se estableció en la propia facultad el primer curso propedéutico semestral, el cual ha demostrado su efectividad a través de estudios de seguimiento de egresados.",
          "Actualmente conserva el mismo propósito en Contaduría Pública, Administración y, desde 2008, Economía y Negocios Internacionales.",
        ],
      },
      {
        id: "mision",
        label: "Identidad",
        title: "Misión y visión",
        cards: [
          {
            title: "Misión",
            body:
              "Formamos a nuestros alumnos para ingresar en la FECA, proporcionándoles herramientas para mejorar su desempeño académico y orientarlos en su definición profesional.",
          },
          {
            title: "Visión",
            body:
              "Posicionarnos como un propedéutico de licenciatura reconocido por su calidad, orientando al aspirante a una elección adecuada de carrera y culminación exitosa de estudios.",
          },
          {
            title: "Propósito",
            body:
              "Fortalecer conocimientos y facilitar la integración a la vida universitaria.",
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
              "Administración",
              "Matemáticas",
              "Computación",
              "Métodos de Estudio",
              "Economía",
              "Inglés",
            ],
          },
          {
            title: "Modalidad Virtual",
            body: "El curso se ofrece a través de la plataforma Moodle.",
            items: [
              "Contabilidad",
              "Administración",
              "Matemáticas",
              "Desarrollo de TIC's",
              "Métodos de Estudio",
              "Inglés",
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
          { label: "Teléfono", value: "(618) 8 27 13 65" },
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
    kicker: "Oferta académica",
    title: "Cursos Intersemestrales",
    intro:
      "Consulta la oferta de materias, horarios, docentes y requisitos de inscripción para los periodos intersemestrales de la FECA.",
    listStyle: true,
    panels: [
      {
        title: "Oferta Intersemestral",
        body:
          "Descarga el documento con las materias disponibles, horarios y docentes para el periodo intersemestral.",
        actions: [
          {
            href: "/docs/CUSRSOS INTERSEMESTRALES.pdf",
            label: "Descargar oferta",
          },
        ],
      },
      {
        title: "Contacto",
        variant: "contact",
        items: [
          "phone:(618) 827-13-65",
        ],
      },
    ],
  },
  cesa: {
    routeGroup: "cesa",
    heroImage: "/imagenes/feca-plaza-1.jpg",
    kicker: "Vida universitaria · Gestión 2025-2027",
    title: "CESA · UNE FECA",
    intro:
      "El Comité Ejecutivo de la Sociedad de Alumnos (CESA) es el equipo de estudiantes que representa a la comunidad estudiantil y trabaja para impulsar iniciativas que beneficien el desarrollo académico, cultural, deportivo y social de nuestra facultad.",
    tabMode: "switch",
    tabs: [
      { href: "quienes-somos", label: "Nosotros" },
      { href: "integrantes", label: "Integrantes" },
      { href: "logros", label: "Logros de la gestión" },
      { href: "proyectos", label: "Proyectos destacados" },
      { href: "identidad", label: "Logo y lema" },
      { href: "contacto", label: "Contacto" },
    ],
    sections: [
      {
        id: "quienes-somos",
        label: "Nuestra identidad",
        title: "¿Quiénes somos?",
        variant: "wide",
        image: "/imagenes/cesa-equipo.png",
        imageAlt: "Comité Ejecutivo de la Sociedad de Alumnos CESA UNE FECA 2025-2027",
        paragraphs: [
          "El Comité Ejecutivo de la Sociedad de Alumnos (CESA) es el equipo de estudiantes que representa a la comunidad estudiantil y trabaja para impulsar iniciativas que beneficien el desarrollo académico, cultural, deportivo y social de nuestra facultad.",
          "Bajo el lema UNE, creemos que las mejores ideas nacen cuando trabajamos juntos. Nuestro compromiso es unir a los estudiantes, fortalecer el sentido de pertenencia y construir un espacio donde cada voz sea escuchada y cada alumno tenga la oportunidad de participar.",
          "A través de la gestión, el trabajo en equipo y la cercanía con la comunidad universitaria, buscamos generar proyectos, actividades y oportunidades que contribuyan al crecimiento de todos, porque estamos convencidos de que cuando nos unimos, logramos más.",
        ],
      },
      {
        id: "integrantes",
        label: "Cartera",
        title: "Integrantes",
        variant: "team",
        cards: [
          {
            title: "Francisco Javier Estrada García",
            body: "Presidente",
            image: "/imagenes/cesa-presidente.png",
          },
          {
            title: "Dulce Sofía Barrios Saucedo",
            body: "Vicepresidenta",
            image: "/imagenes/cesa-vicepresidenta.png",
          },
          {
            title: "Ana Luisa Cervantes González",
            body: "Secretaria General",
            image: "/imagenes/cesa-secretaria.png",
          },
          {
            title: "Alondra Valenzuela Alvarado",
            body: "Tesorera",
            image: "/imagenes/cesa-tesorera.png",
          },
          {
            title: "Gerardo Gámiz Pérez",
            body: "Oficial Mayor",
            image: "/imagenes/cesa-oficial-mayor.png",
          },
        ],
      },
      {
        id: "logros",
        label: "Resultados",
        title: "¿Qué hemos realizado durante la gestión?",
        note:
          "\"Desde el inicio de nuestra administración nos propusimos reactivar proyectos importantes y crear nuevas iniciativas para beneficio de las y los estudiantes. Entre las principales acciones destacan:\"",
        columns: 2,
        cards: [
          {
            title: "Representación estudiantil",
            list: [
              "Reactivación de la entrega de descuentos de cuota interna.",
              "Nombramiento de jefes de grupo.",
              "Mesas de diálogo con la Dirección.",
              "Mesas de diálogo con jefes de grupo y grupos representativos.",
              "Creación del buzón físico y digital para recibir propuestas e inquietudes.",
            ],
          },
          {
            title: "Eventos y vida estudiantil",
            list: [
              "Gala Yaka.",
              "Reactivación del Rally Yaka.",
              "Bienvenida a estudiantes de nuevo ingreso.",
              "Yakavalentín.",
              "Torneo interno.",
              "Participación en la Carrera Neón.",
              "Participación en la Semana del Economista.",
              "Participación en el Desfile de la Identidad.",
              "Mural YAKA por el 68 aniversario de la Facultad.",
            ],
          },
          {
            title: "Salud, inclusión y responsabilidad social",
            list: [
              "Campaña de pruebas gratuitas de VIH.",
              "Actividades por el Día Internacional de la Mujer.",
              "Primera y segunda edición de ECOFECA.",
              "Realización de ECOFAMEN.",
              "Campaña DESAYUNE.",
              "Curso de primeros auxilios.",
              "Programa Sendero Seguro.",
            ],
          },
          {
            title: "Gestión institucional",
            list: [
              "Primera Macro Toma de Protesta.",
              "Nombramientos CESA.",
              "Más de 10 convenios en beneficio de los estudiantes.",
              "Lanzamiento de la Tarjeta UNE.",
              "Recorridos con Servicios Generales para detectar y gestionar necesidades de infraestructura.",
            ],
          },
        ],
      },
      {
        id: "proyectos",
        label: "Lo más significativo",
        title: "Proyectos más destacados",
        columns: 2,
        cards: [
          {
            title: "Mural YAKA (68.º Aniversario)",
            body:
              "Uno de los proyectos más significativos fue la realización del Mural YAKA con motivo del 68.º aniversario de la Facultad. Más que una obra artística, representa la identidad, la historia y el sentido de pertenencia de toda la comunidad FECA.",
          },
          {
            title: "Sendero Seguro",
            body:
              "También implementamos el programa Sendero Seguro, una iniciativa enfocada en brindar mayor seguridad a los estudiantes en los alrededores de la Facultad, trabajando en coordinación con las autoridades correspondientes.",
          },
          {
            title: "ECOFECA",
            body:
              "Otro proyecto muy importante fue ECOFECA, nuestra campaña de reciclaje, que incluso tuvo una segunda edición y dio paso a ECOFAMEN. Con estas acciones buscamos fomentar una cultura de responsabilidad ambiental entre los estudiantes.",
          },
          {
            title: "Primera Macro Toma de Protesta",
            body:
              "Uno de los eventos más representativos de nuestra gestión fue la Primera Macro Toma de Protesta, realizada en colaboración con las sociedades de alumnos de FAMEN y FADER. Fue un evento sin precedentes que reunió a autoridades universitarias y gubernamentales, entre ellas el Gobernador del Estado y el Presidente Municipal. Más que una ceremonia, representó la unión entre facultades y el fortalecimiento de la representación estudiantil.",
          },
          {
            title: "Nombramiento de Jefes de Grupo",
            body:
              "Además, fortalecimos la representación estudiantil mediante el primer nombramiento de jefes de grupo y la creación de espacios permanentes de diálogo entre ellos, la Dirección y la Sociedad de Alumnos, permitiendo que las necesidades de los estudiantes lleguen de forma más directa.",
            wide: true,
          },
        ],
      },
      {
        id: "identidad",
        label: "Nuestra marca",
        title: "Logo y lema",
        variant: "wide",
        image: "/imagenes/cesa-logo.png",
        imageAlt: "Logo CESA UNE FECA 2025-2027",
        imageMaxWidth: 380,
        quote: "“No hay fuerza más grande que la que nos UNE”",
      },
      {
        id: "contacto",
        label: "Informes",
        title: "Contacto",
        variant: "wide",
        contacts: [
          {
            label: "Correo",
            value: "cesa@feca.ujed.mx",
            href: "mailto:cesa@feca.ujed.mx",
          },
          { label: "Oficinas", value: "Instalaciones de la Facultad" },
        ],
      },
    ],
  },
  celci: {
    routeGroup: "legacy-program",
    heroImage: "/imagenes/lic.jpg",
    kicker: "Modalidad presencial",
    title: "CELCI - Centro de Lenguas e Internacionalización",
    intro:
      "Cursos de idiomas para adultos, niños y jóvenes en la Facultad de Economía, Contaduría y Administración.",
    tabMode: "switch",
    tabs: [
      { href: "historia", label: "Historia" },
      { href: "mision", label: "Misión y Visión" },
      { href: "cursos", label: "Cursos" },
      { href: "costos", label: "Costos" },
      { href: "inscripcion", label: "Proceso inscripción" },
      { href: "diagnostico", label: "Examen de diagnóstico" },
      { href: "preguntas", label: "Preguntas frecuentes" },
      { href: "contacto", label: "Contacto" },
    ],
    sections: [
      {
        id: "historia",
        label: "Nuestra historia",
        title: "Historia",
        variant: "carousel",
        slides: [
          {
            year: "1975",
            tag: "FUNDACIÓN",
            title: "Nace el Centro de Idiomas FECA",
            text: "El Centro de Idiomas de la FECA de la UJED fue fundado formalmente en el año 1975, bajo la dirección del C.P. Mtro. Rubén Vargas Quiñones. Desde sus inicios, el Centro ha desempeñado un papel fundamental en la enseñanza de lenguas extranjeras, contribuyendo de manera significativa al desarrollo académico y profesional de nuestra comunidad.",
            images: [
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80",
            ],
            sideImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=80",
          },
          {
            year: "1981",
            tag: "NUEVOS LIDERAZGOS",
            title: "Primeros coordinadores",
            text: "El primer coordinador del Centro fue el Mtro. Jack Hanlon, quien inició esta labor educativa con apenas treinta alumnos. En 1981, la coordinación quedó a cargo del Dr. José Ninahualpa Lucano (q.e.p.d.), dando continuidad al proyecto con un enfoque académico sólido y creciente.",
            images: [
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80",
            ],
            sideImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
          },
          {
            year: "1994",
            tag: "NUEVA ETAPA",
            title: "Lic. Leticia Moreno Elizalde asume la coordinación",
            text: "A partir de 1994, la Lic. Leticia Moreno Elizalde asumió la coordinación del Centro, etapa en la que se vivieron cambios significativos tanto en estructura como en oferta académica, consolidando al Centro como un referente en la enseñanza de idiomas dentro de la Universidad Juárez del Estado de Durango.",
            images: [
              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=400&q=80",
            ],
            sideImage: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=600&q=80",
          },
          {
            year: "2000",
            tag: "CRECIMIENTO",
            title: "Expansión de la oferta académica",
            text: "Con el inicio del nuevo milenio, el Centro amplió su catálogo de idiomas incorporando italiano, francés y japonés. La matrícula creció sostenidamente, consolidando a la FECA como el centro de idiomas universitario más completo del estado de Durango.",
            images: [
              "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
            ],
            sideImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
          },
          {
            year: "2024",
            tag: "ACTUALIDAD",
            title: "Casi cinco décadas de excelencia",
            text: "Hoy el Centro de Idiomas de la FECA atiende a más de mil alumnos, ofreciendo formación de calidad en inglés, italiano, francés y japonés. A lo largo de casi cinco décadas se ha distinguido por su compromiso con la excelencia académica y la inclusión de nuevas culturas, consolidándose como un pilar de la UJED.",
            images: [
              "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
            ],
            sideImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
          },
        ],
      },
      {
        id: "mision",
        label: "Misión y Visión",
        title: "Misión y Visión",
        cards: [
          {
            title: "Misión",
            body: "Ofrecer a la comunidad programas educativos en la lengua extranjera y servicios especializados de alta calidad que permitan sumar ventajas competitivas a nuestros alumnos y clientes dentro de un entorno global.",
          },
          {
            title: "Visión",
            body: "Ser un centro de idiomas reconocido por la excelencia en la enseñanza de lenguas extranjeras, formando profesionales capaces de interactuar eficazmente en un entorno global y contribuyendo al desarrollo integral, intercultural y profesional de la comunidad y sociedad en general.",
          },
        ],
      },
      {
        id: "cursos",
        label: "Oferta",
        title: "Cursos",
        cards: [
          {
            title: "Inglés para adultos",
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
            title: "Francés",
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
            title: "Japonés",
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
            title: "Inglés",
            price: "$1,100",
            body:
              "Estudiantes UJED: 10% de descuento. Estudiantes FECA: 25% de descuento.",
          },
          {
            title: "Francés, italiano y japonés",
            price: "$700",
            body: "Precio único. No hay descuentos.",
          },
        ],
      },
      {
        id: "inscripcion",
        label: "Trámite",
        title: "Proceso inscripción",
        variant: "wide",
        paragraphs: [
          "Para realizar tu inscripción, comunícate al Centro de Lenguas e Internacionalización o acude a las instalaciones de la Facultad. Ahí podrán orientarte sobre horarios disponibles, costos, requisitos y grupos abiertos.",
        ],
        contacts: [
          { label: "Modalidad", value: "Presencial" },
          { label: "Ciclo", value: "A-2025" },
          { label: "Atención", value: "Oficinas del Centro de Lenguas" },
        ],
      },
      {
        id: "diagnostico",
        label: "Ubicación de nivel",
        title: "Examen de diagnóstico",
        variant: "wide",
        paragraphs: [
          "El examen de diagnóstico para ubicarte en el nivel correcto, si tienes conocimientos del idioma, está disponible en el módulo de inscripciones del SUMA.",
        ],
      },
      {
        id: "preguntas",
        label: "Ayuda",
        title: "Preguntas frecuentes",
        faq: [
          {
            question:
              "1. Soy alumno de reingreso y no sé cuál es mi matrícula. ¿Cómo puedo conseguirla?",
            answer:
              "Puedes solicitarla enviando tu nombre completo a cli.feca@ujed.mx, por Facebook en facebook/CLI.FECA.UJED o por teléfono al 827-13-65 ext. 5725, lunes, miércoles y viernes de 10:00 a.m. a 2:00 p.m.",
          },
          {
            question:
              "2. Ya tengo mi matrícula pero no sé mi contraseña. ¿Cómo puedo conseguirla?",
            answer:
              "La primera vez que entres al SUMA+ usa tu matrícula como contraseña. Al entrar, el sistema te pedirá que la cambies por una nueva.",
          },
          {
            question: "3. ¿Cuál es el número de cuenta al que debo hacer mi pago?",
            answer:
              "Una vez que selecciones tu clase, el sistema te dará datos de cuenta, monto y referencia. Incluye la referencia correcta para identificar tu pago automáticamente.",
          },
          {
            question: "4. Soy trabajador de la UJED. ¿Cómo tramito mi exención de pago?",
            answer:
              "El trámite se hace con la Coordinación de Finanzas y Planeación y no sustituye la inscripción del CLI. Después de enviarlo, recibirás tu folio entre 24 y 48 horas; la validación puede demorar hasta 72 horas adicionales.",
            href: "https://forms.gle/cQmnVdiDu1ujkQKq6",
            hrefLabel: "Formulario de exención",
          },
        ],
      },
      {
        id: "contacto",
        label: "Informes",
        title: "Ubicación y contacto",
        variant: "wide",
        contacts: [
          {
            label: "Dirección",
            value:
              "Fanny Anitúa y Privada de Loza s/n. C.P. 34000 Durango, Dgo., México",
          },
          { label: "Teléfono", value: "827-13-65 ext. 5725" },
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
        items: [
          "email:ciiedo.feca@ujed.mx",
          "phone:618 154 4657",
        ],
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
      {
        title: "Documentos",
        variant: "docs",
        actions: [
          {
            href: "/FOLLETO-GENERAL-CERTIFICACIONES.pdf",
            label: "Folleto general de certificaciones",
          },
          {
            href: "/calendario-ciiedo.html",
            label: "Certificate con validez nacional SEP-CONOCER-STPS",
          },
          {
            href: "/diagrama-coordinacion.jpeg",
            label: "Diagrama coordinación",
          },
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
    heroImage: "/imagenes/cafeca.png",
    kicker: "Vida universitaria",
    title: "CAFECA",
    intro:
      "Un espacio para descansar, conversar y recargar energía durante la jornada universitaria.",
    stats: [
      { label: "Ambiente", value: "Convivencia entre estudiantes" },
      { label: "Servicio", value: "Alimentos y bebidas" },
      { label: "Uso", value: "Descanso entre clases" },
    ],
    gallery: [
      {
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
        title: "Café recién hecho",
      },
      {
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
        title: "Comida fresca cada día",
      },
      {
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
        title: "Snacks y antojos",
      },
      {
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=700&q=80",
        title: "Un espacio para convivir",
      },
    ],
    menuNote: "Menú de ejemplo, precios sujetos a cambio.",
    menu: [
      {
        categoria: "Bebidas",
        items: [
          { nombre: "Café americano", precio: 20 },
          { nombre: "Café con leche", precio: 25 },
          { nombre: "Té / infusión", precio: 18 },
          { nombre: "Jugo natural", precio: 25 },
          { nombre: "Agua fresca", precio: 15 },
          { nombre: "Refresco", precio: 20 },
        ],
      },
      {
        categoria: "Comida",
        items: [
          { nombre: "Torta", precio: 35 },
          { nombre: "Sándwich", precio: 30 },
          { nombre: "Plato del día", precio: 55 },
          { nombre: "Ensalada", precio: 40 },
        ],
      },
      {
        categoria: "Snacks",
        items: [
          { nombre: "Papas fritas", precio: 18 },
          { nombre: "Galletas", precio: 12 },
          { nombre: "Fruta picada", precio: 20 },
          { nombre: "Barra de granola", precio: 15 },
        ],
      },
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
      "Autoridades y responsables institucionales que coordinan la planeación académica, administrativa y de vinculación de la Facultad de Economía, Contaduría y Administración.",
    stats: [
      { label: "Gestión", value: "Dirección institucional" },
      { label: "Enfoque", value: "Atención a estudiantes" },
      { label: "Trabajo", value: "Academia y administración" },
    ],
    panels: [
      {
        title: "Dirección",
        body:
          "La Dirección encabeza la toma de decisiones estratégicas de la facultad, promueve el desarrollo académico y fortalece la vinculación con la comunidad universitaria.",
      },
      {
        title: "Subdirecciones y coordinaciones",
        body:
          "Las áreas directivas acompañan procesos académicos, administrativos, de investigación, extensión y servicios para apoyar el trabajo de estudiantes, docentes y personal administrativo.",
      },
      {
        title: "Atención institucional",
        body:
          "Para información sobre trámites, citas o seguimiento académico, acércate a las oficinas de la facultad o a los canales oficiales de FECA.",
        variant: "contact",
      },
      {
        title: "Áreas de trabajo",
        items: [
          "Planeación académica y seguimiento estudiantil",
          "Gestión administrativa y servicios escolares",
          "Vinculación, extensión e investigación",
          "Comunicación institucional y mejora continua",
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
      "Comienza tu proceso de admisión con un registro sencillo. Nuestro equipo puede orientarte sobre carreras, requisitos y fechas importantes.",
    steps: [
      {
        title: "1. Registro",
        body: "Comparte tus datos y la carrera de interés.",
      },
      {
        title: "2. Orientación",
        body: "Recibe información sobre requisitos, fechas y documentos.",
      },
      {
        title: "3. Seguimiento",
        body: "Un asesor te acompañará hasta completar tu inscripción.",
      },
    ],
    requirements: [
      "Acta de nacimiento",
      "CURP",
      "Certificado o constancia de bachillerato",
      "Correo y teléfono de contacto",
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
        placeholder: "Cuéntanos si tienes dudas sobre horarios, requisitos o proceso.",
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
