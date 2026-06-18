import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const ofertaCards = [
  {
    title: "Licenciaturas",
    description: "Programas presenciales de Contaduría Pública, Administración y Economía y Negocios Internacionales.",
    href: "#/licenciaturas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Licenciaturas a distancia",
    description: "Estudia en modalidad en línea con la misma calidad académica y flexibilidad de horarios.",
    href: "#/licenciaturas-distancia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    title: "Posgrado",
    description: "Maestrías y especializaciones para potenciar tu desarrollo profesional en el área.",
    href: "https://posgradofeca.ujed.mx/",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    title: "Curso Propedéutico",
    description: "Prepárate para el ingreso a la facultad con nuestro curso introductorio de dos modalidades.",
    href: "#/curso-propedeutico",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Cursos Intersemestrales",
    description: "Avanza en tu carrera durante los periodos entre semestres con cursos intensivos.",
    href: "#/cursos-intersemestrales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    title: "CELCI",
    description: "Centro de Lenguas e Internacionalización: inglés, francés, italiano y japonés.",
    href: "#/lenguas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: "CIIEDO",
    description: "Centro de innovación, emprendimiento y desarrollo organizacional de la FECA.",
    href: "#/ciiedo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

const STATS = [
  { num: "3", label: "Licenciaturas presenciales" },
  { num: "2", label: "Modalidades de estudio" },
  { num: "4", label: "Idiomas disponibles" },
  { num: "+35", label: "Años de trayectoria" },
];

export default function OfertaEducativaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/feca-entrada.jpg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración</div>
          <h1 className="pf-hero-title">Oferta<br />Educativa</h1>
          <p className="pf-hero-sub">
            Explora todos nuestros programas académicos, cursos y centros de formación diseñados para tu éxito profesional.
          </p>
          <div className="pf-hero-ctas">
            <a href="#/curso-propedeutico" className="pf-btn-primary">Curso Propedéutico</a>
            <a href="https://posgradofeca.ujed.mx/" target="_blank" rel="noreferrer" className="pf-btn-outline">Posgrado</a>
          </div>
        </div>
        <div className="pf-stats">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMAS ── */}
      <section className="pf-section pf-section-light pf-fade" id="oferta-educativa">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Programas y centros</div>
            <h2 className="pf-section-title">Todo lo que tenemos para ti</h2>
            <p className="pf-section-desc">
              Desde licenciaturas hasta idiomas y cursos de innovación, encuentra el programa que impulse tu futuro.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {ofertaCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="pf-card pf-card-top"
              >
                <div className="pf-card-icon">{card.icon}</div>
                <h3 className="pf-card-title">{card.title}</h3>
                <p className="pf-card-desc">{card.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <div className="pf-label pf-label-light">¿Listo para comenzar?</div>
            <h2 className="pf-section-title pf-title-white">Inicia tu proceso de admisión</h2>
            <p className="pf-section-desc pf-desc-white" style={{ marginBottom: 32 }}>
              Ponte en contacto con nosotros y un asesor te orientará sobre el programa ideal para tu perfil profesional.
            </p>
            <div className="pf-hero-ctas" style={{ justifyContent: "center" }}>
              <a href="tel:6188271365" className="pf-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (618) 827-1365
              </a>
              <a href="mailto:informes@feca.ujed.mx" className="pf-btn-outline">Enviar correo</a>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
