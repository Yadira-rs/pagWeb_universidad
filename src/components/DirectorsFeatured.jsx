import { useEffect, useRef, useState } from "react";

const teachers = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Director FECA",
    area: "Gestión institucional",
    enfoque: "Liderazgo académico",
    description: "Liderando el desarrollo académico y administrativo de la facultad.",
    image: "/imagenes/director.jpeg",
  },
  {
    name: "Dr. Iván",
    role: "Director CIIEDO",
    area: "Vinculación empresarial",
    enfoque: "Programas ejecutivos",
    description: "Impulsa CIIEDO con innovación empresarial, proyectos ejecutivos y equipos directivos.",
    image: "/imagenes/imagen.jpeg",
  },
  {
    name: "Dr. Juan",
    role: "Director CELCI",
    area: "Formación internacional",
    enfoque: "Inglés práctico",
    description: "Fortalece CELCI con aprendizaje de inglés práctico y experiencias internacionales.",
    image: "/imagenes/cafeteria.jpeg",
  },
  {
    name: "Dr. Luis",
    role: "Director de Posgrado",
    area: "Investigación aplicada",
    enfoque: "Formación avanzada",
    description: "Impulsa posgrado con investigación aplicada y formación académica avanzada.",
    image: "/imagenes/aniversario.jpeg",
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    area: "Gestión operativa",
    enfoque: "Excelencia institucional",
    description: "Fortalece la Secretaría Técnica con gestión interna y atención operativa.",
    image: "/imagenes/inicio.png",
  },
];

function DirectorsFeatured() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const pausedRef = useRef(false);
  const currentRef = useRef(0);

  const goTo = (idx) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      currentRef.current = idx;
      setVisible(true);
    }, 280);
  };

  const handleNext = () => {
    goTo((currentRef.current + 1) % teachers.length);
  };
  const handlePrev = () => {
    goTo((currentRef.current - 1 + teachers.length) % teachers.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) handleNext();
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const t = teachers[current];

  return (
    <div
      className="df-wrap"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className={`df-card ${visible ? "df-card--in" : "df-card--out"}`}>
        <div className="df-img-col">
          <img src={t.image} alt={t.name} className="df-img" />
          <div className="df-img-overlay" />
        </div>

        <div className="df-info-col">
          <span className="df-role-badge">{t.role}</span>
          <h3 className="df-name">{t.name}</h3>
          <p className="df-desc">{t.description}</p>

          <dl className="df-meta">
            <div className="df-meta-item">
              <dt>Área</dt>
              <dd>{t.area}</dd>
            </div>
            <div className="df-meta-item">
              <dt>Enfoque</dt>
              <dd>{t.enfoque}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="df-footer">
        <div className="df-dots">
          {teachers.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`df-dot ${i === current ? "df-dot--active" : ""}`}
              aria-label={`Director ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="df-arrows">
          <button type="button" className="df-arrow" aria-label="Anterior" onClick={handlePrev}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="df-arrow" aria-label="Siguiente" onClick={handleNext}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectorsFeatured;
