import { useEffect, useRef, useState } from "react";

const slides = [
  {
    tipo: "Evento",
    titulo: "Taller de Innovación y Emprendimiento",
    desc: "Aprende metodologías ágiles para validar y lanzar tu idea de negocio. Cupo limitado a 30 participantes.",
    fecha: "15 de julio, 2026 · 10:00 hrs · Sala CIIEDO",
    ctaLabel: "Registrarme",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
  },
  {
    tipo: "Convocatoria",
    titulo: "Prácticas Profesionales y Servicio Social CIIEDO 2026",
    desc: "Gana experiencia real trabajando en proyectos de innovación. Postúlate antes del cierre de inscripciones.",
    fecha: "Cierre: 30 de julio, 2026",
    ctaLabel: "Ver requisitos",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
  },
  {
    tipo: "Aviso",
    titulo: "Nuevo horario de atención CIIEDO a partir de agosto",
    desc: "El CIIEDO ajusta su horario presencial. Lunes a viernes de 9:00 a 14:00 hrs.",
    fecha: "Vigente a partir del 1 de agosto, 2026",
    ctaLabel: "Contactar",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
  },
  {
    tipo: "Noticia",
    titulo: "CIIEDO firma convenio con empresas líderes de Durango",
    desc: "Nuevas alianzas para conectar a estudiantes con el ecosistema empresarial regional.",
    fecha: "Publicado: junio 2026",
    ctaLabel: "Leer más",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
  },
];

const STEP = 320;
const N = slides.length;
const extended = [...slides, ...slides, ...slides];

export default function AnunciosCarousel() {
  const trackRef = useRef(null);
  const idxRef = useRef(N);
  const [dotIdx, setDotIdx] = useState(0);

  const moveFn = useRef(null);
  moveFn.current = (idx, animated = true) => {
    const track = trackRef.current;
    if (!track) return;
    idxRef.current = idx;
    track.style.transition = animated
      ? "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)"
      : "none";
    if (!animated) track.getBoundingClientRect();
    track.style.transform = `translateX(-${idx * STEP}px)`;
    if (animated) setDotIdx(((idx % N) + N) % N);
  };

  useEffect(() => {
    moveFn.current(N, false);
    const id = setInterval(() => {
      moveFn.current(idxRef.current + 1);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const onTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    const idx = idxRef.current;
    if (idx >= N * 2) moveFn.current(idx - N, false);
    else if (idx < N) moveFn.current(idx + N, false);
  };

  return (
    <section className="anc2-section">
      <div className="anc2-bg-circle" aria-hidden="true" />

      <div className="anc2-header">
        <div>
          <span className="anc2-label">Tablero de anuncios</span>
          <h2 className="anc2-title">Avisos y Eventos</h2>
        </div>
        <div className="anc2-arrows">
          <button className="anc2-arrow" onClick={() => moveFn.current(idxRef.current - 1)} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button className="anc2-arrow" onClick={() => moveFn.current(idxRef.current + 1)} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="anc2-viewport">
        <div ref={trackRef} className="anc2-track" onTransitionEnd={onTransitionEnd}>
          {extended.map((s, i) => (
            <div key={i} className="anc2-card">
              <div className="anc2-card-top">
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
                  <a href={s.ctaHref} className="anc2-cta">{s.ctaLabel} →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="anc2-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`anc2-dot ${i === dotIdx ? "anc2-dot-on" : ""}`}
            onClick={() => moveFn.current(N + i)}
            aria-label={`Ir al anuncio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
