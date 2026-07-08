import { useEffect, useRef, useState } from "react";

const slides = [
  {
    tipo: "Evento",
    titulo: "Taller de Innovación y Emprendimiento",
    desc: "Aprende metodologías ágiles para validar y lanzar tu idea de negocio. Cupo limitado a 30 participantes.",
    fecha: "15 de julio, 2026 · 10:00 hrs · Sala CIIEDO",
    ctaLabel: "Registrarme",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    imagen: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80",
  },
  {
    tipo: "Convocatoria",
    titulo: "Prácticas Profesionales y Servicio Social CIIEDO 2026",
    desc: "Gana experiencia real trabajando en proyectos de innovación. Postúlate antes del cierre de inscripciones.",
    fecha: "Cierre: 30 de julio, 2026",
    ctaLabel: "Ver requisitos",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80",
  },
  {
    tipo: "Aviso",
    titulo: "Nuevo horario de atención CIIEDO a partir de agosto",
    desc: "El CIIEDO ajusta su horario presencial. Lunes a viernes de 9:00 a 14:00 hrs.",
    fecha: "Vigente a partir del 1 de agosto, 2026",
    ctaLabel: "Contactar",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    imagen: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=700&q=80",
  },
  {
    tipo: "Noticia",
    titulo: "CIIEDO firma convenio con empresas líderes de Durango",
    desc: "Nuevas alianzas para conectar a estudiantes con el ecosistema empresarial regional.",
    fecha: "Publicado: junio 2026",
    ctaLabel: "Leer más",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    imagen: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=700&q=80",
  },
];

const N = slides.length;
// 2 clones al inicio + reales + 2 clones al final, para el loop infinito
const extended = [slides[N - 2], slides[N - 1], ...slides, slides[0], slides[1]];

export default function AnunciosCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIndexRef = useRef(2);
  const pausedRef = useRef(false);

  const moveTo = (newIdx, animated = true) => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const card = cardRefs.current[0];
    if (!wrapper || !track || !card) return;

    const wrapperWidth = wrapper.offsetWidth;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    const centerOffset = (wrapperWidth - cardWidth) / 2;
    const translate = newIdx * (cardWidth + gap) - centerOffset;

    track.style.transition = animated
      ? "transform 1.1s cubic-bezier(0.45, 0, 0.2, 1)"
      : "none";
    if (!animated) track.getBoundingClientRect();
    track.style.transform = `translateX(-${translate}px)`;

    activeIndexRef.current = newIdx;
    setActiveIndex(newIdx);
  };

  const handlePrev = () => moveTo(activeIndexRef.current - 1);
  const handleNext = () => moveTo(activeIndexRef.current + 1);

  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    const idx = activeIndexRef.current;
    if (idx >= N + 2) moveTo(idx - N, false);
    else if (idx <= 1) moveTo(idx + N, false);
  };

  useEffect(() => {
    moveTo(2, false);
    const onResize = () => moveTo(activeIndexRef.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) moveTo(activeIndexRef.current + 1);
    }, 3200);
    return () => clearInterval(id);
  }, [activeIndex]);

  const dotIndex = (((activeIndex - 2) % N) + N) % N;

  return (
    <section className="anc2-section">
      <div className="anc2-header">
        <span className="anc2-label">Tablero de anuncios</span>
        <h2 className="anc2-title">Avisos y Eventos</h2>
      </div>

      <div
        className="anc2-carousel"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="anc2-viewport" ref={wrapperRef}>
          <div ref={trackRef} className="anc2-track" onTransitionEnd={handleTransitionEnd}>
            {extended.map((s, idx) => {
              const dist = idx - activeIndex;
              let statusClass = "";
              if (dist === 0) statusClass = "is-center";
              else if (dist === -1) statusClass = "is-prev";
              else if (dist === 1) statusClass = "is-next";
              else if (dist === -2) statusClass = "is-far-prev";
              else if (dist === 2) statusClass = "is-far-next";

              return (
                <div
                  key={idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className={`anc2-card ${statusClass}`}
                  onClick={() => { if (dist !== 0) moveTo(idx, true); }}
                >
                  <div className="anc2-card-img">
                    <img src={s.imagen} alt={s.titulo} loading="lazy" />
                    <span className="anc2-tipo">{s.tipo}</span>
                  </div>
                  <div className="anc2-card-body">
                    <h3 className="anc2-card-title">{s.titulo}</h3>
                    <p className="anc2-card-desc">{s.desc}</p>
                    <div className="anc2-card-footer">
                      <span className="anc2-fecha">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {s.fecha}
                      </span>
                      <a
                        href={s.ctaHref}
                        className="anc2-cta"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.ctaLabel} →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="anc2-controls">
          <button className="anc2-arrow anc2-prev" onClick={handlePrev} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="anc2-arrow anc2-next" onClick={handleNext} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="anc2-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`anc2-dot ${i === dotIndex ? "anc2-dot-on" : ""}`}
            onClick={() => moveTo(2 + i)}
            aria-label={`Ir al anuncio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
