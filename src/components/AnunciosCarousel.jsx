import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    tipo: "Evento",
    numero: "01",
    titulo: "Taller de Innovación y Emprendimiento",
    desc: "Aprende metodologías ágiles para validar y lanzar tu idea de negocio. Cupo limitado a 30 participantes.",
    fecha: "15 de julio, 2026 · 10:00 hrs · Sala CIIEDO",
    ctaLabel: "Registrarme ahora",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    grad: "linear-gradient(135deg, #7b0000 0%, #C0392B 50%, #e74c3c 100%)",
    accentColor: "#ff8a80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    tipo: "Convocatoria",
    numero: "02",
    titulo: "Prácticas Profesionales y Servicio Social CIIEDO 2026",
    desc: "Gana experiencia real trabajando en proyectos de innovación. Postúlate antes del cierre de inscripciones.",
    fecha: "Cierre: 30 de julio, 2026",
    ctaLabel: "Ver requisitos",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    grad: "linear-gradient(135deg, #4a0080 0%, #8e24aa 50%, #ab47bc 100%)",
    accentColor: "#ce93d8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    tipo: "Aviso Importante",
    numero: "03",
    titulo: "Nuevo horario de atención CIIEDO a partir de agosto",
    desc: "El CIIEDO ajusta su horario presencial. Lunes a viernes de 9:00 a 14:00 hrs. Para citas fuera de horario escríbenos.",
    fecha: "Vigente a partir del 1 de agosto, 2026",
    ctaLabel: "Contactar",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    grad: "linear-gradient(135deg, #004d40 0%, #00796b 50%, #26a69a 100%)",
    accentColor: "#80cbc4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    tipo: "Noticia",
    numero: "04",
    titulo: "CIIEDO firma convenio con empresas líderes de Durango",
    desc: "Nuevas alianzas para conectar a estudiantes con el ecosistema empresarial regional. Más oportunidades de vinculación.",
    fecha: "Publicado: junio 2026",
    ctaLabel: "Leer más",
    ctaHref: "mailto:ciiedo.feca@ujed.mx",
    grad: "linear-gradient(135deg, #1a237e 0%, #1565c0 50%, #1e88e5 100%)",
    accentColor: "#90caf9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
      </svg>
    ),
  },
];

const INTERVAL = 5500;

export default function AnunciosCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const pausedRef = useRef(false);
  const animatingRef = useRef(false);

  const goTo = useCallback((idx) => {
    if (animatingRef.current || idx === current) return;
    animatingRef.current = true;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => {
      setAnimating(false);
      setPrev(null);
      animatingRef.current = false;
    }, 500);
  }, [current]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prevSlide = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  return (
    <div
      className="anc-root"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.tipo}
          className={`anc-slide ${i === current ? "anc-active" : ""} ${animating && i === prev ? "anc-exit" : ""}`}
          style={{ background: s.grad }}
          aria-hidden={i !== current}
        >
          {/* Decorative circles */}
          <div className="anc-deco anc-deco-1" style={{ background: s.accentColor }} />
          <div className="anc-deco anc-deco-2" style={{ background: s.accentColor }} />
          <div className="anc-deco anc-deco-3" style={{ background: s.accentColor }} />

          <div className="anc-content">
            {/* Left block */}
            <div className="anc-left">
              <div className="anc-icon-box" style={{ boxShadow: `0 0 40px ${s.accentColor}55` }}>
                {s.icon}
              </div>
              <div className="anc-numero" style={{ color: s.accentColor }}>{s.numero}</div>
            </div>

            {/* Right block */}
            <div className="anc-right">
              <span className="anc-tipo" style={{ background: `${s.accentColor}30`, color: s.accentColor, border: `1px solid ${s.accentColor}60` }}>
                {s.tipo}
              </span>
              <h2 className="anc-title">{s.titulo}</h2>
              <p className="anc-desc">{s.desc}</p>
              <div className="anc-footer">
                <span className="anc-fecha">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {s.fecha}
                </span>
                <a href={s.ctaHref} className="anc-cta" style={{ background: s.accentColor, color: "#111" }}>
                  {s.ctaLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button className="anc-arrow anc-arrow-l" onClick={prevSlide} aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button className="anc-arrow anc-arrow-r" onClick={next} aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
          <path d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="anc-dots">
        {slides.map((s, i) => (
          <button
            key={s.tipo}
            className={`anc-dot ${i === current ? "anc-dot-on" : ""}`}
            style={i === current ? { background: slide.accentColor, width: 28 } : {}}
            onClick={() => goTo(i)}
            aria-label={s.tipo}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="anc-bar">
        <div
          key={current}
          className="anc-bar-fill"
          style={{ animationDuration: `${INTERVAL}ms`, background: slide.accentColor }}
        />
      </div>
    </div>
  );
}
