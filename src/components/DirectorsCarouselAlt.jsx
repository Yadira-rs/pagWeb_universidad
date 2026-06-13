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
    name: "Dr. Juan",
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

// 5 copies × 5 = 25 items, start at idx 10 (copy 3 = middle)
const SLOT = 388; // card-width-alt (360) + gap (28)

function DirectorsCarouselAlt() {
  const [trackIndex, setTrackIndex] = useState(10);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(10);
  const pausedRef = useRef(false);
  const selectedTeacherRef = useRef(null);

  const clonedTeachers = [
    ...teachers, ...teachers, ...teachers, ...teachers, ...teachers,
  ];

  const openModal = (teacher) => {
    selectedTeacherRef.current = teacher;
    setSelectedTeacher(teacher);
    pausedRef.current = true;
    window.history.pushState({ teacherModal: true }, "", window.location.hash);
  };

  const closeModal = () => {
    selectedTeacherRef.current = null;
    setSelectedTeacher(null);
    pausedRef.current = false;
  };

  useEffect(() => {
    const handlePop = () => {
      if (selectedTeacherRef.current) {
        selectedTeacherRef.current = null;
        setSelectedTeacher(null);
        pausedRef.current = false;
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const moveTo = (newIdx, animated) => {
    if (!trackRef.current) return;
    if (!animated && carouselRef.current) {
      carouselRef.current.classList.add("no-card-transition");
    }
    trackRef.current.style.transition = animated
      ? "transform 1.2s cubic-bezier(0.45, 0, 0.55, 1)"
      : "none";
    void trackRef.current.getBoundingClientRect();
    // 50% - padding(120) - halfCard(180) = 50% - 300px
    trackRef.current.style.transform =
      `translateX(calc(50% - 300px - ${newIdx * SLOT}px))`;
    trackIdxRef.current = newIdx;
    setTrackIndex(newIdx);
    if (!animated && carouselRef.current) {
      setTimeout(() => {
        carouselRef.current?.classList.remove("no-card-transition");
      }, 100);
    }
  };

  const advance = (dir) => {
    const idx = trackIdxRef.current;
    const next = idx + dir;
    if (next < 0 || next >= 25) return;
    moveTo(next, true);
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    const idx = trackIdxRef.current;
    if (idx >= 20) moveTo(idx - 10, false);
    else if (idx <= 4) moveTo(idx + 10, false);
  };

  useEffect(() => {
    moveTo(10, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) advance(1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div ref={carouselRef} className="teacher-carousel-alt">
        <div className="teacher-carousel-wrapper">
          <div
            ref={trackRef}
            className="teacher-carousel-track-alt"
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedTeachers.map((teacher, idx) => {
              const dist = idx - trackIndex;
              let statusClass = "";
              if (dist === 0) statusClass = "is-center-alt";
              else if (dist === -1) statusClass = "is-prev-alt";
              else if (dist === 1) statusClass = "is-next-alt";
              else if (dist === -2 || dist === 2) statusClass = "is-edge-alt";

              return (
                <article
                  key={`${teacher.name}-${idx}`}
                  className={`card-alt ${statusClass}`}
                  onClick={() => {
                    if (dist === 0) openModal(teacher);
                    else moveTo(idx, true);
                  }}
                >
                  <div className="card-alt-img">
                    <img src={teacher.image} alt={teacher.name} />
                    <div className="card-alt-overlay">
                      <p className="card-alt-desc">{teacher.description}</p>
                    </div>
                  </div>
                  <div className="card-alt-body">
                    <span className="card-alt-role">{teacher.role}</span>
                    <h4 className="card-alt-name">{teacher.name}</h4>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="teacher-carousel-controls">
          <button
            type="button"
            className="teacher-arrow teacher-prev"
            aria-label="Anterior"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); advance(-1); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="teacher-arrow teacher-next"
            aria-label="Siguiente"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); advance(1); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
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
