import { useEffect, useRef, useState } from "react";

const teachers = [
  {
    slug: "director-general",
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
    slug: "ciiedo",
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
    slug: "celci",
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
    slug: "posgrado",
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
    slug: "secretaria-tecnica",
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

function DirectorsCarousel() {
  const [trackIndex, setTrackIndex] = useState(10);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(10);
  const pausedRef = useRef(false);

  const goToProfile = (teacher) => {
    window.location.hash = `#/directivos/${teacher.slug}`;
  };

  // 5 copies × 5 teachers = 25 items. Start in the middle (idx=10).
  // No snap before animation — the reset happens AFTER animation ends
  // via handleTransitionEnd, when the carousel is idle and the snap is invisible.
  const clonedTeachers = [
    ...teachers, ...teachers, ...teachers, ...teachers, ...teachers,
  ];

  const moveTo = (newIdx, animated) => {
    if (!trackRef.current) return;
    if (!animated && carouselRef.current) {
      carouselRef.current.classList.add("no-card-transition");
    }
    trackRef.current.style.transition = animated
      ? "transform 1.2s cubic-bezier(0.45, 0, 0.55, 1)"
      : "none";
    void trackRef.current.getBoundingClientRect();
    trackRef.current.style.transform =
      `translateX(calc(50% - 120px - ${newIdx * 338}px - 155px))`;
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

  const handleNext = () => advance(1);
  const handlePrev = () => advance(-1);

  // After each animation ends, silently re-center if near boundary.
  // The carousel is idle so the instant snap is completely invisible.
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
  }, [trackIndex]);

  return (
    <>
    <div
      ref={carouselRef}
      className="teacher-carousel"
    >
      <div className="teacher-carousel-wrapper">
        <div
          ref={trackRef}
          className="teacher-carousel-track"
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedTeachers.map((teacher, idx) => {
            const dist = idx - trackIndex;
            let statusClass = "";
            if (dist === 0) statusClass = "is-center";
            else if (dist === -1) statusClass = "is-prev";
            else if (dist === 1) statusClass = "is-next";
            else if (dist === -2) statusClass = "is-far-prev";
            else if (dist === 2) statusClass = "is-far-next";

            return (
              <article
                key={`${teacher.name}-${idx}`}
                className={`teacher-card ${statusClass}`}
                onClick={() => {
                  if (dist === 0) goToProfile(teacher);
                  else moveTo(idx, true);
                }}
              >
                <div className="teacher-card-img">
                  <img src={teacher.image} alt={teacher.name} />
                  <div className="teacher-card-hover-overlay">
                    <h4 className="teacher-hover-name">{teacher.name}</h4>
                    <p className="teacher-hover-desc">{teacher.description}</p>
                  </div>
                </div>
                <div className="teacher-card-body">
                  <h4 className="teacher-card-name">{teacher.name}</h4>
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
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="teacher-arrow teacher-next"
          aria-label="Siguiente"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </div>
    </>
  );
}

export default DirectorsCarousel;
