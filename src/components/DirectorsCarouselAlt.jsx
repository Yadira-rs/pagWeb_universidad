import { useEffect, useRef, useState } from "react";

const teachers = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Director FECA",
    area: "Gestión institucional",
    enfoque: "Liderazgo académico",
    description: "Liderando el desarrollo académico y administrativo de la facultad.",
    image: "/imagenes/director.jpeg",
    welcomeMessage:
      "Bienvenidos a la Facultad de Economía, Contaduría y Administración. Es un honor recibirlos en esta comunidad comprometida con la excelencia, la innovación y la formación de profesionistas que transformen su entorno. Aquí encontrarán el apoyo, los recursos y el ambiente necesarios para alcanzar sus metas.",
    education: [
      { degree: "Doctorado en Administración", institution: "UJED" },
      { degree: "Maestría en Gestión Pública", institution: "UNAM" },
      { degree: "Licenciatura en Administración", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Iván",
    role: "Director CIIEDO",
    area: "Vinculación empresarial",
    enfoque: "Programas ejecutivos",
    description: "Impulsa CIIEDO con innovación empresarial, proyectos ejecutivos y equipos directivos.",
    image: "/imagenes/imagen.jpeg",
    welcomeMessage:
      "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial. Les doy la bienvenida a un programa diseñado para desarrollar líderes capaces de tomar decisiones estratégicas con visión global y compromiso social.",
    education: [
      { degree: "Doctorado en Ciencias Económicas", institution: "UNAM" },
      { degree: "Maestría en Administración de Empresas", institution: "ITESM" },
      { degree: "Licenciatura en Economía", institution: "UJED" },
    ],
  },
  {
    name: "M.G.P. Carlos Elier Martínez Sifuentes",
    role: "Director CELCI",
    area: "Formación internacional",
    enfoque: "Inglés práctico",
    description: "Fortalece CELCI con aprendizaje de inglés práctico y experiencias internacionales.",
    image: "/imagenes/cafeteria.jpeg",
    welcomeMessage:
      "El CELCI les abre las puertas a un mundo sin fronteras. Aquí aprenderán inglés con un enfoque práctico y vivencial, preparándose para participar en intercambios, colaboraciones internacionales y oportunidades globales que ampliarán su horizonte profesional y personal.",
    education: [
      { degree: "Doctorado en Lingüística Aplicada", institution: "UNAM" },
      { degree: "Maestría en Enseñanza del Inglés", institution: "BUAP" },
      { degree: "Licenciatura en Letras Inglesas", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Luis",
    role: "Director de Posgrado",
    area: "Investigación aplicada",
    enfoque: "Formación avanzada",
    description: "Impulsa posgrado con investigación aplicada y formación académica avanzada.",
    image: "/imagenes/aniversario.jpeg",
    welcomeMessage:
      "El posgrado de la FECA representa el nivel más alto de nuestra oferta académica. Los invito a ser parte de una comunidad de investigadores y especialistas que generan conocimiento con impacto real. Aquí su desarrollo académico no tiene límites.",
    education: [
      { degree: "Doctorado en Ciencias Contables", institution: "UNAM" },
      { degree: "Maestría en Finanzas", institution: "UJED" },
      { degree: "Licenciatura en Contabilidad", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    area: "Gestión operativa",
    enfoque: "Excelencia institucional",
    description: "Fortalece la Secretaría Técnica con gestión interna y atención operativa.",
    image: "/imagenes/inicio.png",
    welcomeMessage:
      "La Secretaría Técnica está aquí para garantizar que su experiencia en la FECA sea fluida, organizada y de calidad. Mi compromiso es brindarles el apoyo administrativo que necesitan para que puedan enfocarse plenamente en su formación académica.",
    education: [
      { degree: "Doctorado en Administración Pública", institution: "UJED" },
      { degree: "Maestría en Gestión Organizacional", institution: "IPN" },
      { degree: "Licenciatura en Administración", institution: "UJED" },
    ],
  },
];

function DirectorsCarouselAlt() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const selectedTeacherRef = useRef(null);

  const openModal = (teacher) => {
    selectedTeacherRef.current = teacher;
    setSelectedTeacher(teacher);
    window.history.pushState({ teacherModal: true }, "", window.location.hash);
  };

  const closeModal = () => {
    selectedTeacherRef.current = null;
    setSelectedTeacher(null);
  };

  useEffect(() => {
    const handlePop = () => {
      if (selectedTeacherRef.current) {
        selectedTeacherRef.current = null;
        setSelectedTeacher(null);
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return (
    <>
      <div className="directors-list">
        {teachers.map((teacher) => (
          <article key={teacher.name} className="director-row">
            <div className="director-row-photo">
              <img src={teacher.image} alt={teacher.name} />
            </div>
            <div className="director-row-info">
              <span className="director-row-role">{teacher.role}</span>
              <h4 className="director-row-name">{teacher.name}</h4>
              <div className="director-row-tags">
                <span>{teacher.area}</span>
                <span>{teacher.enfoque}</span>
              </div>
              <p className="director-row-quote">
                "{teacher.welcomeMessage.slice(0, 120)}…"
              </p>
              <button
                type="button"
                className="director-row-btn"
                onClick={() => openModal(teacher)}
              >
                Ver perfil completo
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedTeacher && (
        <div className="teacher-modal-overlay">
          <div className="teacher-modal">
            <button className="teacher-modal-close" onClick={closeModal} aria-label="Cerrar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="teacher-modal-media">
              <img src={selectedTeacher.image} alt={selectedTeacher.name} />
              <div className="teacher-modal-play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <span className="teacher-modal-play-label">Próximamente</span>
              <div className="teacher-modal-media-overlay">
                <h2 className="teacher-modal-name">{selectedTeacher.name}</h2>
                <span className="teacher-modal-role-badge">{selectedTeacher.role}</span>
              </div>
            </div>
            <div className="teacher-modal-body">
              <div className="teacher-modal-welcome">
                <svg className="teacher-modal-quote-icon" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
                <p className="teacher-modal-welcome-text">{selectedTeacher.welcomeMessage}</p>
              </div>
              <div className="teacher-modal-section">
                <h3 className="teacher-modal-section-title">Formación académica</h3>
                <div className="teacher-modal-education">
                  {selectedTeacher.education.map((item, i) => (
                    <div key={i} className="teacher-modal-edu-item">
                      <span className="teacher-modal-edu-degree">{item.degree}</span>
                      <span className="teacher-modal-edu-institution">{item.institution}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="teacher-modal-meta">
                <div className="teacher-modal-meta-item">
                  <span className="teacher-modal-meta-label">Área</span>
                  <span className="teacher-modal-meta-value">{selectedTeacher.area}</span>
                </div>
                <div className="teacher-modal-meta-item">
                  <span className="teacher-modal-meta-label">Enfoque</span>
                  <span className="teacher-modal-meta-value">{selectedTeacher.enfoque}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DirectorsCarouselAlt;
