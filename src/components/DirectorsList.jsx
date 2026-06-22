import { useEffect, useRef, useState } from 'react';

const directors = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Director FECA",
    area: "Gestión institucional · Liderazgo académico",
    quote: "Comprometidos con la excelencia académica y el desarrollo integral de nuestra comunidad universitaria, guiamos a la FECA hacia un futuro de innovación y pertinencia regional.",
    image: "/imagenes/director.jpeg",
  },
  {
    name: "Dr. Iván",
    role: "Director CIIEDO",
    area: "Vinculación empresarial · Programas ejecutivos",
    quote: "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial.",
    image: "/imagenes/imagen.jpeg",
  },
  {
    name: "Dr. Juan",
    role: "Director CELCI",
    area: "Formación internacional · Inglés práctico",
    quote: "En el CELCI creemos que el dominio de idiomas es la llave que abre las puertas al mundo. Formamos ciudadanos globales desde la FECA.",
    image: "/imagenes/cafeteria.jpeg",
  },
  {
    name: "Dr. Luis",
    role: "Director de Posgrado",
    area: "Investigación aplicada · Formación avanzada",
    quote: "El posgrado de la FECA es el espacio donde la investigación y la práctica convergen para formar los líderes académicos y empresariales del mañana.",
    image: "/imagenes/aniversario.jpeg",
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    area: "Gestión operativa · Excelencia institucional",
    quote: "La Secretaría Técnica trabaja día a día para que cada proceso institucional fluya con eficiencia, transparencia y orientación al servicio de la comunidad.",
    image: "/imagenes/inicio.png",
  },
];

function getCardClass(index, active, total) {
  const fwd = ((index - active) + total) % total;
  const bwd = ((active - index) + total) % total;
  const dist = Math.min(fwd, bwd);
  const isAfter = fwd <= bwd;
  if (dist === 0) return 'is-center';
  if (dist === 1) return isAfter ? 'is-next' : 'is-prev';
  return isAfter ? 'is-far-next' : 'is-far-prev';
}

export default function DirectorsList() {
  const [active, setActive] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const total = directors.length;

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const card = cardRefs.current[0];
      if (!wrapper || !card) return;
      const wrapperWidth = wrapper.offsetWidth;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 28;
      const centerOffset = (wrapperWidth - cardWidth) / 2;
      const next = active * (cardWidth + gap) - centerOffset;
      setTranslateX(Math.max(next, 0));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  const d = directors[active];

  return (
    <section className="dl-section">
      <header className="dl-header">
        <p className="dl-eyebrow">Nuestro equipo</p>
        <h2 className="dl-title">Directivos</h2>
        <div className="dl-rule" />
        <p className="dl-subtitle">
          Conoce al equipo que guía la vida académica, administrativa y de
          vinculación de nuestra facultad.
        </p>
      </header>

      <div className="teacher-carousel dl-carousel-override">
        {/* Flecha izquierda */}
        <button
          className="teacher-arrow teacher-prev"
          aria-label="Directivo anterior"
          onClick={() => setActive((active - 1 + total) % total)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Track de fotos */}
        <div className="teacher-carousel-wrapper" ref={wrapperRef}>
          <div
            className="teacher-carousel-track"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {directors.map((dir, i) => (
              <article
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`teacher-card ${getCardClass(i, active, total)}`}
                onClick={() => setActive(i)}
              >
                <div className="teacher-card-img">
                  <img src={dir.image} alt={dir.name} />
                </div>
                <div className="teacher-card-body">
                  <h4 className="teacher-card-name">{dir.name}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <button
          className="teacher-arrow teacher-next"
          aria-label="Siguiente directivo"
          onClick={() => setActive((active + 1) % total)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Info del directivo activo */}
        <div className="dl-active-info">
          <span className="dl-active-role">{d.role}</span>
          <p className="dl-active-quote">"{d.quote}"</p>
          <span className="dl-active-area">{d.area}</span>
        </div>
      </div>
    </section>
  );
}
