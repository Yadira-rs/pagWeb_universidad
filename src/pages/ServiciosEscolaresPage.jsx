import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const mapas = [
  {
    title: "Contador Público P2021",
    subtitle: "Mapa curricular y documentos oficiales de Contador Público.",
    href: "/docs/Mapas curriculares plan 2021-CP.pdf",
  },
  {
    title: "Administración de Empresas P2021",
    subtitle: "Mapa curricular y documentos oficiales de Administración de Empresas.",
    href: "/docs/Mapas curriculares plan 2021-LA.pdf",
  },
  {
    title: "Economía y Negocios Internacionales P2021",
    subtitle: "Mapa curricular y documentos oficiales de Economía y Negocios Internacionales.",
    href: "/docs/Mapas curriculares plan 2021-LENI.pdf",
  },
];

const tramites = [
  {
    key: "kardex",
    title: "Kardex",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    desc: "Historial académico oficial con calificaciones y créditos cursados por semestre. Indispensable para trámites de titulación, becas y acreditaciones.",
    items: ["Kardex no oficial (para uso personal)", "Kardex oficial con sello y firma", "Kardex en inglés (por solicitud)"],
  },
  {
    key: "constancias",
    title: "Constancias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    desc: "Documentos oficiales que acreditan tu situación académica ante instituciones externas, empleadores o trámites gubernamentales.",
    items: ["Constancia de estudios", "Constancia de calificaciones", "Constancia de no adeudo", "Constancia de término de materias"],
  },
  {
    key: "altas-bajas",
    title: "Altas y Bajas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    desc: "Gestión de cambios en tu carga académica durante el período habilitado. Consulta fechas en el calendario escolar vigente.",
    items: ["Alta de materias", "Baja de materias", "Baja temporal de semestre", "Cambio de grupo"],
  },
];

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <rect x="3" y="2" width="14" height="18" rx="2" fill="#951823" opacity="0.15"/>
      <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#951823" strokeWidth="1.5" fill="white"/>
      <path d="M14 2v4h4" stroke="#951823" strokeWidth="1.5" fill="none"/>
      <line x1="7" y1="10" x2="15" y2="10" stroke="#951823" strokeWidth="1.2"/>
      <line x1="7" y1="13" x2="15" y2="13" stroke="#951823" strokeWidth="1.2"/>
      <line x1="7" y1="16" x2="12" y2="16" stroke="#951823" strokeWidth="1.2"/>
    </svg>
  );
}

function ServiciosEscolaresPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* HERO */}
      <section className="pf-hero pf-hero-sm" style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}>
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Servicios<br />Escolares</h1>
          <p className="pf-hero-sub">
            Consulta mapas curriculares, realiza trámites académicos y accede a documentos oficiales de la FECA‑UJED.
          </p>
        </div>
      </section>

      {/* COORDINACIÓN */}
      <section className="pf-section pf-fade" style={{ paddingBottom: 0 }}>
        <div className="pf-container">
          <div className="coord-card">
            <div className="coord-card-photo">
              <img src="/imagenes/servicios-escolares.jpg" alt="Coordinación de Servicios Escolares" />
            </div>
            <div className="coord-card-body">
              <span className="coord-card-badge">Coordinación de Servicios Escolares</span>
              <h3 className="coord-card-name">Mtra. Norma Diaz Navar</h3>
              <p className="coord-card-quote">
                Consulta mapas curriculares, realiza trámites académicos y accede a documentos oficiales de la FECA‑UJED.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAPAS CURRICULARES */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Documentos académicos</div>
            <h2 className="pf-section-title">Mapas Curriculares</h2>
            <p className="pf-section-desc">
              Planes de estudio y mapas curriculares oficiales por programa educativo.
            </p>
          </div>
          <div className="pf-fade doc-group-body">
            {mapas.map((doc) => (
              <a key={doc.title} href={doc.href} target="_blank" rel="noreferrer" className="doc-row">
                <span className="doc-row-icon" aria-hidden="true"><DocIcon /></span>
                <span className="doc-row-text">
                  <span className="doc-row-label">{doc.title}</span>
                  <span className="doc-row-sub">{doc.subtitle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRÁMITES */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Control escolar</div>
            <h2 className="pf-section-title pf-title-white">Trámites Escolares</h2>
            <p className="pf-section-desc pf-desc-white">
              Todo lo que necesitas gestionar durante tu trayectoria académica en la FECA.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {tramites.map((t) => (
              <div key={t.key} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{t.icon}</div>
                <h3 className="pf-card-title">{t.title}</h3>
                <p className="pf-card-desc">{t.desc}</p>
                <ul style={{ margin: "12px 0 0", padding: "0 0 0 18px", listStyle: "disc" }}>
                  {t.items.map((item) => (
                    <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Atención presencial</div>
            <h2 className="pf-section-title">¿Dudas sobre tu trámite?</h2>
            <p className="pf-section-desc">
              Acércate directamente a la ventanilla de Servicios Escolares de la FECA.
            </p>
          </div>
          <div className="pf-fade" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { label: "Horario", value: "Lunes a Viernes · 8:00 – 15:00 h", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
              { label: "Ubicación", value: "Edificio FECA · Planta Baja", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
              { label: "Correo", value: "escolares@feca.ujed.mx", href: "mailto:escolares@feca.ujed.mx", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            ].map((c) => (
              c.href
                ? <a key={c.label} href={c.href} className="pf-contact-item" style={{ background: "#fff", borderRadius: 12, padding: "24px 28px", textDecoration: "none" }}>
                    <div className="pf-contact-icon">{c.icon}</div>
                    <div><span className="pf-contact-label">{c.label}</span><span className="pf-contact-value">{c.value}</span></div>
                  </a>
                : <div key={c.label} className="pf-contact-item" style={{ background: "#fff", borderRadius: 12, padding: "24px 28px" }}>
                    <div className="pf-contact-icon">{c.icon}</div>
                    <div><span className="pf-contact-label">{c.label}</span><span className="pf-contact-value">{c.value}</span></div>
                  </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServiciosEscolaresPage;
