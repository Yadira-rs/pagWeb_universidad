import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const nosotrosCards = [
  {
    title: "Historia",
    description: "Conoce los orígenes y trayectoria de nuestra facultad a lo largo de los años.",
    href: "#/historia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Organigrama",
    description: "Consulta la estructura organizacional de la Facultad de Economía, Contaduría y Administración.",
    href: "/ORGANIGRAMA-FECA.pdf",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/>
        <rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3h12V9"/><path d="M12 12v3"/>
      </svg>
    ),
  },
  {
    title: "PDUA",
    description: "Plan de Desarrollo Universitario y Académico de la FECA.",
    href: "/PDUA-SILD27.pdf",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: "Misión y Visión",
    description: "Nuestra razón de ser y hacia dónde nos dirigimos como institución educativa.",
    href: "#/mision-vision",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      </svg>
    ),
  },
  {
    title: "Valores",
    description: "Los principios que guían nuestra comunidad académica y estudiantil.",
    href: "#/nosotros/valores",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Políticas",
    description: "Marco de políticas institucionales que rigen la vida académica de la facultad.",
    href: "#/nosotros/politicas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: "Ejes Rectores",
    description: "Los ejes estratégicos que orientan el desarrollo y crecimiento de la FECA.",
    href: "#/nosotros/ejes-rectores",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    title: "Marco Normativo",
    description: "Reglamentos, lineamientos y normativas que regulan la institución.",
    href: "#/nosotros/marco-normativo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
];

const STATS = [
  { num: "1973", label: "Año de fundación" },
  { num: "3", label: "Licenciaturas" },
  { num: "+50", label: "Años de historia" },
  { num: "UJED", label: "Universidad" },
];

function NosotrosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        currentRoute="history"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/feca-plaza-1.jpg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración</div>
          <h1 className="pf-hero-title">Nosotros</h1>
          <p className="pf-hero-sub">
            Conoce nuestra historia, estructura, valores y el marco que define a la FECA como
            institución de excelencia académica de la UJED.
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

      {/* ── QUIÉNES SOMOS ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">La facultad</div>
            <h2 className="pf-section-title">Quiénes somos</h2>
            <p className="pf-section-desc">
              Todo sobre nuestra institución: historia, organización, principios y normativa.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {nosotrosCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="pf-card pf-card-top"
              >
                <div className="pf-card-icon">
                  {card.icon}
                </div>
                <h3 className="pf-card-title">{card.title}</h3>
                <p className="pf-card-desc">{card.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>


      <Footer logoImage={logoImage} />
    </div>
  );
}

export default NosotrosPage;
