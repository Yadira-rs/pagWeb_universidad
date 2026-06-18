import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const typeIcons = {
  Especialidad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Maestría: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Doctorado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
};

function PosgradoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);

  const posgradoPrograms = [
    {
      title: "Especialidad en Administración de Hospitales",
      type: "Especialidad",
      pdf: "/docs/Plan_estudio_Especialidad_de_Administracion_de_Hospitales.pdf",
    },
    {
      title: "Maestría en Gestión Pública",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Gestion_Publica.pdf",
    },
    {
      title: "Maestría en Gestión de Negocios",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Gestion_de_Negocios.pdf",
    },
    {
      title: "Maestría en Estrategias Contables",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Estrategias_Contables.pdf",
    },
    {
      title: "Maestría en Mercadotecnia",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Mercadotecnia.pdf",
    },
    {
      title: "Maestría en Economía",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Economia.pdf",
    },
    {
      title: "Maestría en Auditoría Gubernamental",
      type: "Maestría",
      pdf: "/docs/Plan_estudio_Maestria_en_Auditoria_Gubernamental.pdf",
    },
    {
      title: "Doctorado en Gestión de las Organizaciones",
      type: "Doctorado",
      pdf: "/docs/Plan_estudio_Doctorado_en_Gestion_de_las_Organizaciones.pdf",
    },
  ];

  const especialidades = posgradoPrograms.filter((p) => p.type === "Especialidad");
  const maestrias     = posgradoPrograms.filter((p) => p.type === "Maestría");
  const doctorados    = posgradoPrograms.filter((p) => p.type === "Doctorado");

  const STATS = [
    { num: `${maestrias.length}`, label: "Maestrías" },
    { num: `${especialidades.length}`, label: "Especialidades" },
    { num: `${doctorados.length}`, label: "Doctorado" },
    { num: "UJED", label: "Respaldo" },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const renderGroup = (programs) => (
    <div className="pf-cards-grid pf-fade">
      {programs.map((program) => (
        <div key={program.title} className="pf-card pf-card-top" style={{ justifyContent: "space-between" }}>
          <div className="pf-card-icon">
            {typeIcons[program.type]}
          </div>
          <div>
            <span className="pf-chip" style={{ marginBottom: 10, display: "inline-flex" }}>{program.type}</span>
            <h3 className="pf-card-title">{program.title}</h3>
          </div>
          <a
            href={program.pdf}
            download
            className="pf-btn-primary"
            style={{
              background: "linear-gradient(135deg, #c0000c, #e31313)",
              color: "#fff",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar plan
          </a>
        </div>
      ))}
    </div>
  );

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
        style={{ backgroundImage: `url('/imagenes/lic.jpg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Oferta académica · FECA</div>
          <h1 className="pf-hero-title">Posgrado</h1>
          <p className="pf-hero-sub">
            Programas de formación avanzada para fortalecer la investigación, la gestión
            y el desarrollo profesional en las áreas de economía, contaduría y administración.
          </p>
          <div className="pf-hero-ctas">
            <a href="https://posgradofeca.ujed.mx/" target="_blank" rel="noreferrer" className="pf-btn-primary">
              Sitio de Posgrado
            </a>
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

      {/* ── ESPECIALIDADES ── */}
      {especialidades.length > 0 && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            <div className="pf-section-head">
              <div className="pf-label">Posgrado</div>
              <h2 className="pf-section-title">Especialidades</h2>
              <p className="pf-section-desc">Programas de especialización para profundizar en áreas específicas de tu carrera.</p>
            </div>
            {renderGroup(especialidades)}
          </div>
        </section>
      )}

      {/* ── MAESTRÍAS ── */}
      <section className={`pf-section pf-fade ${especialidades.length > 0 ? "pf-section-alt" : "pf-section-light"}`}>
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Posgrado</div>
            <h2 className="pf-section-title">Maestrías</h2>
            <p className="pf-section-desc">
              Selecciona un programa para descargar su documento informativo con plan de estudios.
            </p>
          </div>
          {renderGroup(maestrias)}
        </div>
      </section>

      {/* ── DOCTORADO ── */}
      {doctorados.length > 0 && (
        <section className="pf-section pf-section-dark pf-fade">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label pf-label-light">Máximo grado académico</div>
              <h2 className="pf-section-title pf-title-white">Doctorado</h2>
              <p className="pf-section-desc pf-desc-white">
                Programa de doctorado para la formación de investigadores y académicos de alto nivel.
              </p>
            </div>
            <div className="pf-cards-grid-2 pf-fade" style={{ maxWidth: 700, margin: "0 auto" }}>
              {doctorados.map((program) => (
                <div key={program.title} className="pf-card pf-card-dark" style={{ justifyContent: "space-between" }}>
                  <div className="pf-card-icon">{typeIcons[program.type]}</div>
                  <h3 className="pf-card-title">{program.title}</h3>
                  <a
                    href={program.pdf}
                    download
                    className="pf-btn-primary"
                    style={{ justifyContent: "center", marginTop: 8 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Descargar plan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACTO ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container" style={{ maxWidth: 720 }}>
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Informes</div>
            <h2 className="pf-section-title">Contacto</h2>
          </div>
          <div className="pf-contact-list">
            <div className="pf-contact-item">
              <div className="pf-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <span className="pf-contact-label">Facultad</span>
                <span className="pf-contact-value">Facultad de Economía, Contaduría y Administración — UJED</span>
              </div>
            </div>
            <a href="tel:6188271365" className="pf-contact-item">
              <div className="pf-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <span className="pf-contact-label">Teléfono</span>
                <span className="pf-contact-value">(618) 827-13-65</span>
              </div>
            </a>
            <div className="pf-contact-item">
              <div className="pf-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <span className="pf-contact-label">Ubicación</span>
                <span className="pf-contact-value">Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PosgradoPage;
