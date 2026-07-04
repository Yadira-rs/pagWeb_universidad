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
    href: "#/nosotros/ejes-rectores",
    external: false,
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

      {/* ── EJES RECTORES ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Rumbo estratégico</div>
            <h2 className="pf-section-title">Ejes Rectores</h2>
            <p className="pf-section-desc" style={{ maxWidth: 800, margin: "0 auto" }}>
              Los ejes rectores articulan la planeación institucional y definen las prioridades para consolidar la innovación, pertinencia académica y vinculación de la FECA con el entorno.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 40 }}>
            {[
              {
                title: "Excelencia Académica",
                desc: "Fortalecimiento curricular, mejora constante en la práctica docente y programas acreditados que aseguran la máxima calidad formativa.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                )
              },
              {
                title: "Innovación y Tecnología",
                desc: "Investigación aplicada de alto impacto, modernización de espacios educativos y transformación digital para enfrentar los retos del entorno actual.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                )
              },
              {
                title: "Vinculación y Proyección",
                desc: "Estrecha relación con sectores sociales, empresariales y gubernamentales a nivel nacional e internacional para potenciar el egreso exitoso.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )
              }
            ].map((eje, idx) => (
              <div key={idx} className="pf-card" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(227,19,19,0.08)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(227,19,19,0.15)" }}>
                  {eje.icon}
                </div>
                <h3 className="pf-card-title" style={{ fontSize: "18px" }}>{eje.title}</h3>
                <p className="pf-card-desc" style={{ fontSize: "14px", color: "#5c5c6d", lineHeight: 1.6 }}>{eje.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN DE DESARROLLO (PDUA) ── */}
      <section className="pf-section pf-section-alt pf-fade" style={{ background: "linear-gradient(180deg, #fbfaf8 0%, #f5f0eb 100%)" }}>
        <div className="pf-container">
          <div className="pf-two-col" style={{ gap: 56, alignItems: "center" }}>
            <div>
              <div className="pf-label">Planeación institucional</div>
              <h2 className="pf-section-title">PDUA (Plan de Desarrollo Universitario y Académico)</h2>
              <p className="pf-section-desc" style={{ marginBottom: 24, fontSize: "15px", lineHeight: 1.7 }}>
                El Plan de Desarrollo Universitario y Académico (PDUA) es la guía rectora de la FECA que define nuestros objetivos a mediano y largo plazo. Este documento detalla las estrategias pedagógicas, organizacionales y operativas diseñadas para consolidar el crecimiento sostenido de la facultad.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <a
                  href="/PDUA-SILD27.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn-primary"
                  style={{ background: "linear-gradient(135deg,#e31313,#9b0000)", color: "#fff", fontSize: "15px", padding: "14px 30px", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(227,19,19,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                  Visualizar Plan Completo (PDF)
                </a>
                <a
                  href="/PDUA-SILD27.pdf"
                  download="PDUA-FECA-UJED.pdf"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "14px", color: "#e31313", textDecoration: "none", fontWeight: 700, fontFamily: "var(--font-ui)", padding: "12px 24px", borderRadius: 10, background: "rgba(227,19,19,0.05)", border: "1px solid rgba(227,19,19,0.12)", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(227,19,19,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(227,19,19,0.05)"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Descargar Documento
                </a>
              </div>
            </div>
            
            {/* Visual preview card for PDUA */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="pf-card pf-card-top" style={{ width: "100%", maxWidth: "380px", borderTopColor: "#e31313", padding: "28px 24px", background: "#fff", display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 12px 36px rgba(0,0,0,0.06)", borderRadius: 18, border: "1px solid #e8e6e2" }}>
                {/* PDF Icon / Mock Document Representation */}
                <div style={{ height: "180px", background: "linear-gradient(135deg, #fdfbf7 0%, #f4f0eb 100%)", borderRadius: "12px", border: "1px dashed #d5ced0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="1.5" style={{ marginBottom: 12 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#1a1a2e", fontFamily: "var(--font-display)" }}>DOCUMENTO OFICIAL</span>
                  <span style={{ fontSize: "11px", color: "#7a7a8d", marginTop: 4, fontFamily: "var(--font-ui)", letterSpacing: "0.05em" }}>PDF · 2.5 MB</span>
                  {/* Subtle red tag */}
                  <div style={{ position: "absolute", top: 12, right: 12, background: "#e31313", color: "#fff", fontSize: "10px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px", fontFamily: "var(--font-ui)" }}>PDUA</div>
                </div>
                
                <div>
                  <h3 className="pf-card-title" style={{ fontSize: "17px", color: "var(--navy)", marginBottom: 8 }}>Planeación de Desarrollo 2024-2027</h3>
                  <p className="pf-card-desc" style={{ fontSize: "13px", lineHeight: 1.5, color: "#6a6a7c" }}>
                    Este plan fue desarrollado de manera colaborativa por el personal docente, administrativo y la dirección general de la FECA, avalado por la Universidad Juárez del Estado de Durango.
                  </p>
                </div>
                
                <div style={{ borderTop: "1px solid #f2eff1", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#8a8a9d", fontWeight: "500" }}>Vigente hasta 2027</span>
                  <a href="/PDUA-SILD27.pdf" target="_blank" rel="noreferrer" style={{ fontSize: "13px", fontWeight: "700", color: "#e31313", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    Ver online
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default NosotrosPage;
