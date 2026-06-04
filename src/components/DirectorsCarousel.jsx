import { useEffect, useRef, useState } from "react";

const teachers = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Dirección FECA",
    description: "Liderando el desarrollo académico y administrativo de la facultad",
    image: "/imagenes/director.jpeg",
  },
  {
    name: "Dr. Iván",
    role: "CIIEDO",
    description: "Impulsa CIIEDO con innovación empresarial, proyectos ejecutivos y equipos directivos.",
    image: "/imagenes/imagen.jpeg",
  },
  {
    name: "Dr. Juan",
    role: "CELCI",
    description: "Fortalece CELCI con aprendizaje de inglés práctico y experiencias internacionales.",
    image: "/imagenes/cafeteria.jpeg",
  },
  {
    name: "Dr. Luis",
    role: "Posgrado",
    description: "Impulsa posgrado con investigación aplicada y formación académica avanzada.",
    image: "/imagenes/aniversario.jpeg",
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    description: "Fortalece la Secretaría Técnica con gestión interna y atención operativa.",
    image: "/imagenes/inicio.png",
  },
];

function DirectorsCarousel() {
  const [trackIndex, setTrackIndex] = useState(2);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(2);
  const pausedRef = useRef(false);
  const hoverIntervalRef = useRef(null);

  const clonedTeachers = [
    teachers[3], teachers[4],
    ...teachers,
    teachers[0], teachers[1],
  ];

  const moveTo = (newIdx, animated) => {
    if (!trackRef.current) return;
    if (!animated && carouselRef.current) {
      carouselRef.current.classList.add("no-card-transition");
    }
    trackRef.current.style.transition = animated
      ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
      : "none";
    trackRef.current.style.transform =
      `translateX(calc(50% - 120px - ${newIdx * 338}px - 155px))`;
    trackIdxRef.current = newIdx;
    setTrackIndex(newIdx);
    if (!animated && carouselRef.current) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          carouselRef.current?.classList.remove("no-card-transition")
        )
      );
    }
  };

  const handleNext = () => moveTo(trackIdxRef.current + 1, true);
  const handlePrev = () => moveTo(trackIdxRef.current - 1, true);

  const handleTransitionEnd = () => {
    const idx = trackIdxRef.current;
    if (idx >= 7) moveTo(idx - 5, false);
    else if (idx <= 1) moveTo(idx + 5, false);
  };

  useEffect(() => {
    moveTo(2, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) moveTo(trackIdxRef.current + 1, true);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="teacher-carousel"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
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
                onClick={() => moveTo(idx, true)}
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
          onClick={handlePrev}
          onMouseEnter={() => { hoverIntervalRef.current = setInterval(handlePrev, 600); }}
          onMouseLeave={() => { clearInterval(hoverIntervalRef.current); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="teacher-arrow teacher-next"
          aria-label="Siguiente"
          onClick={handleNext}
          onMouseEnter={() => { hoverIntervalRef.current = setInterval(handleNext, 600); }}
          onMouseLeave={() => { clearInterval(hoverIntervalRef.current); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DirectorsCarousel;
