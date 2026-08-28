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
    // PENDIENTE: foto individual del responsable.
    image: null,
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
      { title: "Maestría en Administración", institution: "Maestría" },
    ],
    emails: [
      { label: "Correo institucional", value: "tomas.diaz@ujed.mx" },
      { label: "Correo del área", value: "academica.feca@ujed.mx" },
    ],
    // Fotos del equipo — se usan en AcademicosPage, no en el organigrama.
    teamMembers: [
      { photo: "/imagenes/directivos/secretaria-academica/DSC_5054.JPG", name: "Integrante 1" },
      { photo: "/imagenes/directivos/secretaria-academica/DSC_5095.JPG", name: "Integrante 3" },
      { photo: "/imagenes/directivos/secretaria-academica/DSC_5113.JPG", name: "Integrante 4" },
      { photo: "/imagenes/directivos/secretaria-academica/DSC_5134.JPG", name: "Integrante 5" },
      { photo: "/imagenes/directivos/secretaria-academica/DSC_5318.JPG", name: "Integrante 6" },
    ],
    teamGroupPhotos: [
      "/imagenes/directivos/secretaria-academica/DSC_5267.JPG",
      "/imagenes/directivos/secretaria-academica/DSC_5273.JPG",
      "/imagenes/directivos/secretaria-academica/DSC_5291.JPG",
      "/imagenes/directivos/secretaria-academica/DSC_5294.JPG",
    ],
  },
  {
    slug: "secretaria-administrativa",
    name: "Dra. Marcela Rodríguez Martínez",
    role: "Secretaría Administrativa",
    roleLabel: "Secretaría Administrativa",
    area: "Administración y recursos",
    enfoque: "Gestión operativa",
    // PENDIENTE: foto individual del responsable.
    image: null,
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
    // Fotos del equipo — se usan en AdministrativosPage, no en el organigrama.
    teamMembers: [
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_4991.JPG", name: "Integrante 1" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5002.JPG", name: "Integrante 2" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5004.JPG", name: "Integrante 3" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5024.JPG", name: "Integrante 4" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5029.JPG", name: "Integrante 5" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5189.JPG", name: "Integrante 6" },
      { photo: "/imagenes/directivos/secretaria-administrativa/DSC_5356.JPG", name: "Integrante 7" },
    ],
    teamGroupPhotos: [
      "/imagenes/directivos/secretaria-administrativa/DSC_5006.JPG",
      "/imagenes/directivos/secretaria-administrativa/DSC_5018.JPG",
      "/imagenes/directivos/secretaria-administrativa/DSC_5267.JPG",
      "/imagenes/directivos/secretaria-administrativa/DSC_5334.JPG",
    ],
  },
  {
    slug: "posgrado",
    name: "Dr. Eliu Jahaziel Reyes Reyes",
    role: "División de Estudios de Posgrado",
    roleLabel: "División de Estudios de Posgrado",
    area: "Investigación y posgrado",
    enfoque: "Formación avanzada",
    image: "/imagenes/directivos/posgrado/DSC_5267.JPG",
    // PENDIENTE: confirmar formación académica con el área.
    degrees: [
      { title: "Licenciatura en Administración", institution: "Licenciatura" },
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
    image: "/imagenes/directivos/celci/DSC_5323.JPG",
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
