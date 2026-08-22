import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const ofertaCards = [
  {
    title: "Licenciaturas",
    description: "Programas presenciales de Contaduría Pública, Administración y Economía y Negocios Internacionales.",
    href: "#/licenciaturas",
    image: "/imagenes/lic.jpg",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    title: "Licenciaturas a distancia",
    description: "Estudia en modalidad en línea con la misma calidad académica y flexibilidad de horarios.",
    href: "#/licenciaturas-distancia",
    image: "/imagenes/distancia.jpg",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M2 10h20"/></svg>,
  },
  {
    title: "Posgrado",
    description: "Maestrías y especializaciones para potenciar tu desarrollo profesional en el área.",
    href: "https://posgradofeca.ujed.mx/",
    external: true,
    image: "/imagenes/logo-posgrado.png",
    imageFit: "contain",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l9 4-9 4-9-4z"/><path d="M5 10v5l7 3 7-3v-5"/></svg>,
  },
  {
    title: "Curso Propedéutico",
    description: "Prepárate para el ingreso a la facultad con nuestro curso introductorio de dos modalidades.",
    href: "#/curso-propedeutico",
    image: "/imagenes/feca-entrada.jpg",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    title: "Cursos Intersemestrales",
    description: "Avanza en tu carrera durante los periodos entre semestres con cursos intensivos.",
    href: "#/cursos-intersemestrales",
    image: "/imagenes/inicio.png",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    title: "Centro de Lenguas",
    description: "Centro de Lenguas y Competitividad Internacional: inglés, francés, italiano y japonés.",
    href: "#/lenguas",
    image: "/imagenes/logo-celci.png",
    imageFit: "contain",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    title: "CIIEDO",
    description: "Centro de innovación, emprendimiento y desarrollo organizacional de la FECA.",
    href: "#/ciiedo",
    image: "/imagenes/logo-ciiedo.png",
    imageFit: "contain",
    imagePad: "24px 40px",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
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
          <div className="highlights-grid fade-up" style={{ marginTop: 40 }}>
            {ofertaCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="highlight-card"
                style={{ display: "flex", flexDirection: "column", alignItems: "stretch", textDecoration: "none", color: "inherit", padding: 0, overflow: "hidden" }}
              >
                {/* Imagen */}
                <div style={{ height: 160, overflow: "hidden", background: "#f0eded", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: card.imageFit ?? "cover", objectPosition: "center", padding: card.imagePad ?? 0, transition: "transform 0.4s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""}
                  />
                </div>
                {/* Contenido */}
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div className="highlight-icon" style={{ marginBottom: 14 }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent)", margin: "0 0 8px", fontFamily: "var(--font-display)", lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--gray-dark)", lineHeight: 1.65, margin: 0, flex: 1 }}>{card.description}</p>
                  <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 5, color: "#e31313", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700 }}>
                    Ver más
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
