import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const planesEstudio = [
  {
    title: "Contador Público P2021",
    subtitle: "Plan de estudios oficial de Contador Público.",
    href: "/docs/plan-de-estudios_cp_2021.pdf",
  },
  {
    title: "Administración de Empresas P2021",
    subtitle: "Plan de estudios oficial de Administración de Empresas.",
    href: "/docs/plan_de_estudios_la_2021.pdf",
  },
  {
    title: "Economía y Negocios Internacionales P2021",
    subtitle: "Plan de estudios oficial de Economía y Negocios Internacionales.",
    href: "/docs/plan_de_estudios_leni_2021.pdf",
  },
];

const tramites = [
  {
    key: "examen-profesional",
    title: "Proceso de Examen Profesional",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M22 10L12 5 2 10l10 5 10-5z"/>
        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>
        <path d="M22 10v6"/>
      </svg>
    ),
    desc: "Licenciatura y posgrado.",
    items: [],
  },
  {
    key: "kardex",
    title: "Impresión de Kardex",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    desc: "Licenciatura y posgrado.",
    items: [],
  },
  {
    key: "boletas",
    title: "Impresión de Boletas de Calificaciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M9 15l2 2 4-4"/>
      </svg>
    ),
    desc: "Licenciatura y posgrado.",
    items: [],
  },
  {
    key: "cargas-horarias",
    title: "Impresión de Cargas Horarias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M12 14v3l2 1"/>
      </svg>
    ),
    desc: "",
    items: [],
  },
  {
    key: "inscripciones",
    title: "Inscripciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z"/>
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    desc: "",
    items: [
      "Inscripciones de nuevo ingreso (licenciatura y posgrado)",
      "Inscripciones de reingreso (licenciatura y posgrado)",
    ],
  },
  {
    key: "carta-pasante",
    title: "Carta de Pasante",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 6l10 7 10-7"/>
      </svg>
    ),
    desc: "Licenciatura y posgrado.",
    items: [],
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

      {/* PLANES DE ESTUDIO */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Documentos académicos</div>
            <h2 className="pf-section-title">Planes de Estudio</h2>
            <p className="pf-section-desc">
              Planes de estudio oficiales por programa educativo.
            </p>
          </div>
          <div className="pf-fade doc-group-body">
            {planesEstudio.map((doc) => (
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
                {t.desc && <p className="pf-card-desc">{t.desc}</p>}
                {t.items.length > 0 && (
                  <ul style={{ margin: "12px 0 0", padding: "0 0 0 18px", listStyle: "disc" }}>
                    {t.items.map((item) => (
                      <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
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
