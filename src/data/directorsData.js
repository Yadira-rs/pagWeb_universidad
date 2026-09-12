// Responsables del organigrama de la FECA.
//
// ESTRUCTURA (trabajo en proceso):
//  - name .......... nombre completo con grado
//  - role/roleLabel  cargo dentro del organigrama
//  - image ......... foto individual del responsable (null = PENDIENTE)
//  - degrees ....... formación académica -> se muestra en "Ver información"
//  - emails ........ correos institucionales -> se muestran en "Ver información"
//
// NOTA: la formación académica y algunos correos están PENDIENTES de
// confirmación con cada área; se capturan aquí como marcador de posición
// para dejar lista la estructura de la pantalla.

export const directors = [
  {
    slug: "direccion",
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Dirección",
    roleLabel: "Dirección",
    area: "Gestión institucional",
    enfoque: "Liderazgo académico",
    image: "/imagenes/directivos/direccion/director.jpeg",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
      { title: "Maestría en Administración Pública", institution: "Maestría" },
      { title: "Doctorado en Gobierno y Administración Pública", institution: "Doctorado" },
    ],
    emails: [
      { label: "Correo institucional", value: "jesus.sotelo@ujed.mx" },
      { label: "Correo del área", value: "direccion.feca@ujed.mx" },
    ],
  },
  {
    slug: "secretaria-tecnica",
    name: "M.G.N. Stephani Guadalupe Sierra Bonilla",
    role: "Secretaría Técnica",
    roleLabel: "Secretaría Técnica",
    area: "Planeación y seguimiento",
    enfoque: "Coordinación institucional",
    image: "/imagenes/directivos/secretaria-tecnica/DSC_5246.JPG",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
      { title: "Maestría en Gestión de Negocios", institution: "Maestría" },
    ],
    emails: [
      { label: "Correo institucional", value: "stephani.sierra@ujed.mx" },
      { label: "Correo del área", value: "sec.tecnica.feca@ujed.mx" },
    ],
  },
  {
    slug: "secretaria-academica",
    name: "M.A. Tomás Díaz García",
    role: "Secretario Académico",
    roleLabel: "Secretario Académico",
    area: "Desarrollo académico",
    enfoque: "Calidad educativa",
    image: "/imagenes/directivos/secretaria-academica/DSC_5054.JPG",
    // Tarjeta de bienvenida (Secretaría Académica).
    // BORRADOR — pendiente de que el área envíe su mensaje.
    welcomeTitle: "Secretario Académico",
    welcomeText:
      "Desde la Secretaría Académica acompañamos a estudiantes y docentes en cada etapa de su trayectoria en la FECA. Trabajamos por programas educativos de calidad, un servicio social y prácticas profesionales con impacto real, y un acompañamiento cercano a través de las tutorías.",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
      { title: "Maestría en Administración", institution: "Maestría" },
    ],
    emails: [
      { label: "Correo institucional", value: "tomas.diaz@ujed.mx" },
      { label: "Correo del área", value: "sacademica.feca@ujed.mx" },
    ],
  },
  {
    slug: "secretaria-administrativa",
    name: "Dra. Marcela Rodríguez Martínez",
    role: "Secretaría Administrativa",
    roleLabel: "Secretaría Administrativa",
    area: "Administración y recursos",
    enfoque: "Gestión operativa",
    image: "/imagenes/directivos/secretaria-administrativa/DSC_4991.JPG",
    // Tarjeta de bienvenida (Secretaría Administrativa).
    // BORRADOR — pendiente de que el área envíe su mensaje.
    welcomeTitle: "Secretaria Administrativa",
    welcomeText:
      "En la Secretaría Administrativa damos soporte a toda la vida académica de la FECA. Nuestro compromiso es una gestión eficiente y transparente de los recursos humanos, materiales y financieros, para que docentes y estudiantes cuenten con lo necesario para cumplir su labor.",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Contador Público", institution: "Licenciatura" },
      { title: "Maestría en Administración Pública", institution: "Maestría" },
      { title: "Doctorado en Gobierno y Administración Pública", institution: "Doctorado" },
    ],
    emails: [
      { label: "Correo institucional", value: "marcela.rodriguez@ujed.mx" },
      { label: "Correo del área", value: "administrativa.feca@ujed.mx" },
    ],
  },
  {
    slug: "posgrado",
    name: "Dr. Eliu Jahaziel Reyes Reyes",
    role: "División de Estudios de Posgrado",
    roleLabel: "División de Estudios de Posgrado",
    area: "Investigación y posgrado",
    enfoque: "Formación avanzada",
    image: "/imagenes/directivos/posgrado/eliu-reyes.jpg",
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
      { title: "Maestría en Gestión de Negocios", institution: "Maestría" },
      { title: "Doctorado en Gestión de las Organizaciones", institution: "Doctorado" },
    ],
    emails: [
      { label: "Correo institucional", value: "eliu.reyes@ujed.mx" },
      { label: "Correo del área", value: "posgrado.feca@ujed.mx" },
    ],
  },
  {
    slug: "ciiedo",
    name: "Dr. Israel Iván Gutiérrez Muñoz",
    role: "Centro de Innovación, Investigación, Emprendimiento y Desarrollo Organizacional",
    roleLabel: "CIIEDO",
    area: "Innovación y emprendimiento",
    enfoque: "Vinculación con el sector productivo",
    image: "/imagenes/directivos/ciiedo/DSC_5202.JPG",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Ingeniería en Electrónica", institution: "Ingeniería" },
      { title: "Maestría en Planificación de Empresas y Desarrollo Regional", institution: "Maestría" },
      { title: "Maestría en Pedagogía", institution: "Maestría" },
      { title: "Doctorado en Administración y Desarrollo Empresarial", institution: "Doctorado" },
    ],
    emails: [
      { label: "Correo institucional", value: "israel.gutierrez@ujed.mx" },
      { label: "Correo del área", value: "ciiedo.feca@ujed.mx" },
    ],
  },
  {
    slug: "celci",
    name: "M.G.P. Carlos Elier Martínez Sifuentes",
    role: "Centro de Lenguas y Competitividad Internacional",
    roleLabel: "CELCI",
    area: "Lenguas y comunicación",
    enfoque: "Certificaciones internacionales",
    image: "/imagenes/directivos/celci/carlos-elier.jpg",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Enseñanza del Inglés", institution: "Licenciatura" },
      { title: "Maestría en Gestión Pública", institution: "Maestría" },
    ],
    emails: [
      { label: "Correo institucional", value: "elier.martinez@ujed.mx" },
      { label: "Correo del área", value: "celci.feca@ujed.mx" },
    ],
  },
];
