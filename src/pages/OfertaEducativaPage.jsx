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
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            background: "#fff",
            border: "1px solid #e8e6e2",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
          }}>
            {/* Lado izquierdo */}
            <div style={{ padding: "52px 48px" }}>
              <div className="pf-label">¿Listo para comenzar?</div>
              <h2 className="pf-section-title" style={{ marginBottom: 16 }}>
                Inicia tu proceso<br />de admisión
              </h2>
              <p style={{ fontSize: 16, color: "var(--gray-mid)", lineHeight: 1.75, marginBottom: 32 }}>
                Ponte en contacto con nosotros y un asesor te orientará sobre el programa ideal para tu perfil profesional.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="tel:6188271365" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#e31313", color: "#fff",
                  fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                  padding: "13px 26px", borderRadius: 999,
                  textDecoration: "none", boxShadow: "0 6px 20px rgba(227,19,19,0.28)",
                  transition: "background 0.2s, transform 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  (618) 827-1365
                </a>
                <a href="mailto:informes@feca.ujed.mx" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "transparent", color: "#e31313",
                  fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14,
                  padding: "13px 26px", borderRadius: 999,
                  border: "2px solid #e31313", textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}>
                  Enviar correo
                </a>
              </div>
            </div>
            {/* Lado derecho — tarjetas de contacto */}
            <div style={{
              background: "linear-gradient(135deg, #9b0000 0%, #e31313 100%)",
              padding: "52px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: "100%",
            }}>
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Correo electrónico", value: "informes@feca.ujed.mx" },
                { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l.93-.93a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z", label: "Teléfono", value: "(618) 827-1365" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Ubicación", value: "Fanny Anitua y Priv. Loza s/n, Durango" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: "rgba(255,255,255,0.15)", borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-ui)" }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 500, marginTop: 2 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
