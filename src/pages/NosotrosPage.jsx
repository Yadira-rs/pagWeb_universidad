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
    href: "#/nosotros/organigrama",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/>
        <rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3h12V9"/><path d="M12 12v3"/>
      </svg>
    ),
  },
  {
    title: "Ejes rectores",
    description: "Las prioridades estratégicas que guían la planeación institucional de la facultad.",
    href: "#/nosotros/ejes-rectores",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 3.5"/>
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
              Los ejes rectores articulan la planeación institucional del Plan de Desarrollo 2025-2031 de la FECA y definen las prioridades para consolidar la innovación, pertinencia académica y vinculación de la facultad con el entorno.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 40, maxWidth: 980, marginLeft: "auto", marginRight: "auto" }}>
            {[
              {
                title: "Eje Transversal: Identidad Universitaria",
                desc: "Alineado estrechamente a la visión y los ejes estratégicos de la Universidad Juárez del Estado de Durango (UJED), el eje transversal \"Identidad Universitaria\" del Plan de Desarrollo 2025-2031 de la FECA busca consolidar el sentido de pertenencia y compromiso de estudiantes, docentes y administrativos mediante el impulso prioritario a la cultura y el deporte. Esta estrategia asume ambos pilares como herramientas fundamentales para fomentar el posicionamiento institucional, los valores éticos, la sana convivencia y la equidad, estableciendo metas plurianuales de difusión artística, vinculación local y creación de programas deportivos inclusivos. De esta manera, y tomando como base los Objetivos de Desarrollo Sostenible (ODS) desde una perspectiva global a local, la Facultad refrenda su misión de ofrecer una formación integral, innovadora y de calidad ante los retos de las ciencias económicas y administrativas.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22V4a1 1 0 0 1 1-1h11l3 3v16"/><path d="M4 22h15"/><path d="M9 8h6M9 12h6"/>
                  </svg>
                )
              },
              {
                title: "Eje 1: Educación integral de calidad e innovación educativa",
                desc: "El \"Eje 1: Educación integral de calidad e innovación educativa\", busca consolidar la excelencia académica a través de una formación holística, pertinente y basada en el pensamiento crítico. Para lograrlo, este eje establece metas plurianuales enfocadas en la actualización y acreditación continua de los planes de estudio, el desarrollo de nueva oferta educativa y la capacitación docente, asegurando una fuerte vinculación con las necesidades sociales y del mercado laboral. Asimismo, prioriza la equidad y la reducción de desigualdades mediante el fortalecimiento de programas de tutorías e inclusión, a la par que impulsa la internacionalización a través de la movilidad académica y la certificación en estándares de competencias laborales para estudiantes y personal. En su conjunto, estas estrategias, respaldadas por mecanismos de evaluación institucional continua, garantizan un proceso de enseñanza-aprendizaje innovador que prepara a la comunidad universitaria para responder con eficacia a los retos locales y globales.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                )
              },
              {
                title: "Eje 2: Promoción e impulso a la investigación y la innovación",
                desc: "El \"Eje 2: Promoción e impulso a la investigación y la innovación\" busca fortalecer la generación de conocimiento aplicado en las ciencias económicas, administrativas y contables para vincularlo estratégicamente con el entorno social y productivo. Con el propósito de resolver problemáticas organizacionales y de política pública, este eje prioriza el fortalecimiento de los Cuerpos Académicos (CA) alineando sus líneas de investigación con los ODS, fomenta la procuración de financiamiento a través de convocatorias y promueve la creación de redes de colaboración multidisciplinaria a nivel local, nacional e internacional. Asimismo, establece metas contundentes para garantizar la transferencia tecnológica y la democratización del conocimiento, impulsando la publicación en revistas de alto impacto, la organización de congresos y coloquios, la conformación de un comité editorial propio y el lanzamiento de una nueva revista especializada que eleve significativamente la visibilidad y el impacto científico de la Facultad.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                )
              },
              {
                title: "Eje 3: Vinculación y extensión con impacto social",
                desc: "El \"Eje 3: Vinculación y extensión con impacto social\" busca consolidar alianzas estratégicas con los sectores público, privado y social para dinamizar el desarrollo regional y la transformación económica. Para lograrlo, establece metas enfocadas en la firma permanente de convenios multisectoriales, la divulgación científica aplicada y la diversificación de la educación continua mediante programas flexibles, digitales y con proyección internacional que incrementen la empleabilidad. A la par, este eje fortalece la responsabilidad social universitaria y el tejido social mediante esquemas de acompañamiento integral para estudiantes vulnerables o foráneos, orientación vocacional continua y acciones sostenidas de voluntariado, inclusión y respeto a la diversidad.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )
              },
              {
                title: "Eje 4: Promoción de la cultura de la paz con responsabilidad social y atención a la diversidad e inclusión",
                desc: "El \"Eje 4: Promoción de la cultura de la paz con responsabilidad social y atención a la diversidad e inclusión\" busca afianzar un entorno universitario seguro, libre de violencia y fundamentado en la equidad sustantiva. Para lograrlo, el eje establece estrategias para transversalizar la perspectiva de género, aplicar protocolos de prevención y sanción de la violencia e impulsar una cultura institucional incluyente libre de discriminación. A la par, prioriza el bienestar físico, mental y emocional mediante campañas de salud integral, alianzas de atención psicológica y la capacitación docente en gestión de crisis emocionales. Finalmente, el eje fortalece la Responsabilidad Social Universitaria (RSU), la seguridad física de la comunidad mediante un Plan Maestro de Protección Civil y la integración del desarrollo sostenible en las unidades de aprendizaje, asegurando una convivencia armónica, ética y sustentable.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                )
              },
              {
                title: "Eje 5: Infraestructura y equipamiento para un espacio digno, armónico y sustentable con el ambiente",
                desc: "El \"Eje 5: Infraestructura y equipamiento para un espacio digno, armónico y sustentable con el ambiente\" busca transformar el entorno físico de la Facultad hacia un modelo ecológico, seguro e incluyente. Para lograrlo, establece metas orientadas a la eficiencia energética mediante tecnologías limpias como paneles solares, la captación y reutilización de agua, y el impulso a programas de economía circular, reciclaje y cultura ecológica. A la par, el eje moderniza los ambientes de aprendizaje a través de la conversión de salones en aulas interactivas, la adecuación de espacios abiertos de convivencia, la renovación del mobiliario y el fortalecimiento de la seguridad con sistemas de videovigilancia. Finalmente, garantiza la accesibilidad universal mediante la rehabilitación de elevadores y rampas para personas con discapacidad, junto con la actualización continua del acervo bibliográfico físico y digital.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
                  </svg>
                )
              },
              {
                title: "Eje 6: Gestión ética y transformadora",
                desc: "El \"Eje 6: Gestión ética y transformadora\" busca consolidar una administración íntegra, transparente, eficiente y fundamentada en la rendición de cuentas. Para lograrlo, el eje impulsa la modernización institucional a través de la reingeniería de procesos, la digitalización del 100% de los expedientes del personal y la automatización de trámites y servicios en línea. Asimismo, fortalece la sostenibilidad financiera mediante la optimización del presupuesto, la revisión de tarifas y la diversificación en la generación de ingresos propios. Finalmente, garantiza el estricto cumplimiento normativo y la mejora continua mediante tableros de control digitales, sistemas de alerta en tiempo real para auditorías y la automatización de la gestión de riesgos dentro del Sistema Universitario de Calidad y Control Interno.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                )
              }
            ].map((eje, idx) => (
              <div key={idx} className="pf-card" style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: "rgba(227,19,19,0.08)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(227,19,19,0.15)" }}>
                    {eje.icon}
                  </div>
                  <h3 className="pf-card-title" style={{ fontSize: "18px", margin: 0 }}>{eje.title}</h3>
                </div>
                <p className="pf-card-desc" style={{ fontSize: "14px", color: "#5c5c6d", lineHeight: 1.7 }}>{eje.desc}</p>
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
                  style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff", fontSize: "15px", padding: "14px 30px", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s" }}
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
