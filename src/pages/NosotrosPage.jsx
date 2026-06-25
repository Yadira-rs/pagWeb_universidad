import { useEffect, useRef, useState } from "react";
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

const ALUMNI_COLLAGES = [
  [
    {
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      name: "Sofía Martínez",
      career: "Lic. en Economía - Egresada 2018",
      size: "large",
    },
    {
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      name: "Carlos Mendoza",
      career: "Contador Público - Egresado 2015",
      size: "medium-top",
    },
    {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      name: "Dra. Ana Rosa Ortiz",
      career: "Docente y Egresada de Posgrado",
      size: "medium-bottom",
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      name: "Mtro. Javier Reyes",
      career: "Lic. en Administración - Egresado 2012",
      size: "small",
    },
  ],
  [
    {
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      name: "Gabriela Flores",
      career: "Lic. en Administración - Egresada 2019",
      size: "large",
    },
    {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      name: "Lic. Daniel Silva",
      career: "Lic. en Economía - Egresado 2014",
      size: "medium-top",
    },
    {
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      name: "Mtra. Patricia Garza",
      career: "Maestría en Finanzas - Egresada 2017",
      size: "medium-bottom",
    },
    {
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      name: "Ing. Roberto Esquivel",
      career: "Contador Público - Egresado 2011",
      size: "small",
    },
  ]
];

function NosotrosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  const [collageIdx, setCollageIdx] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCollageIdx((prev) => (prev + 1) % ALUMNI_COLLAGES.length);
        setFadeState("fade-in");
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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

      {/* ── GALERÍA DE EXALUMNOS ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Nuestra comunidad</div>
            <h2 className="pf-section-title">Galería de Exalumnos</h2>
            <p className="pf-section-desc">
              Nuestros egresados son el reflejo de la excelencia académica de la FECA. Conoce a algunos de nuestros destacados exalumnos en sus trayectorias profesionales.
            </p>
          </div>
          <div className={`alumni-collage-wrapper ${fadeState}`}>
            <div className="alumni-collage-grid">
              {ALUMNI_COLLAGES[collageIdx].map((alumnus, idx) => (
                <div key={idx} className={`alumni-collage-item alumni-size-${alumnus.size}`}>
                  <img src={alumnus.url} alt={alumnus.name} className="alumni-image" />
                  <div className="alumni-info-overlay">
                    <span className="alumni-name">{alumnus.name}</span>
                    <span className="alumni-career">{alumnus.career}</span>
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

export default NosotrosPage;
