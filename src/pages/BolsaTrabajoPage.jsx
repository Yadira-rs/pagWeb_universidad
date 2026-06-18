import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const estudiantesOps = [
  "Registrar tu currículum en nuestra base de datos",
  "Consultar las vacantes disponibles",
  "Recibir orientación para entrevistas y desarrollo profesional",
  "Asistir a ferias de empleo organizadas por la facultad",
];
const empresasOps = [
  "Publicación gratuita de vacantes",
  "Acceso a egresados con perfil en economía, finanzas, contabilidad y administración",
  "Participación en ferias de empleo presenciales",
  "Vinculación con programas de prácticas profesionales",
];

const STATS = [
  { num: "100%", label: "Servicio gratuito" },
  { num: "3", label: "Áreas profesionales" },
  { num: "SUMA+", label: "Plataforma de egresados" },
  { num: "FECA", label: "Respaldo universitario" },
];

function BolsaTrabajoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/feca-plaza-1.jpg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Bolsa de<br />Trabajo</h1>
          <p className="pf-hero-sub">
            Conectamos el talento FECA con las mejores oportunidades laborales en la región y el país.
          </p>
          <div className="pf-hero-ctas">
            <a href="mailto:informes@feca.ujed.mx" className="pf-btn-primary">Registrar currículum</a>
            <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer" className="pf-btn-outline">SUMA+ FECA</a>
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

      {/* ── ¿QUÉ ES? ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Vinculación laboral</div>
            <h2 className="pf-section-title">¿Qué es la Bolsa de Trabajo FECA?</h2>
            <p className="pf-section-desc">
              Un servicio gratuito que conecta a estudiantes y egresados con empresas e instituciones
              que buscan talento profesional en las áreas de economía, contaduría y administración.
            </p>
          </div>

          <div className="pf-cards-grid-2 pf-fade">
            {/* Estudiantes */}
            <div className="pf-card pf-card-top">
              <div className="pf-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <h3 className="pf-card-title">Para estudiantes y egresados</h3>
              <p className="pf-card-desc">Si buscas empleo o prácticas profesionales, puedes:</p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {estudiantesOps.map((op) => (
                  <li key={op} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gray-mid)", lineHeight: 1.7, marginBottom: 6 }}>{op}</li>
                ))}
              </ul>
            </div>
            {/* Empresas */}
            <div className="pf-card pf-card-top">
              <div className="pf-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 className="pf-card-title">Para empresas</h3>
              <p className="pf-card-desc">Si tu empresa busca talento, ofrecemos:</p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {empresasOps.map((op) => (
                  <li key={op} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gray-mid)", lineHeight: 1.7, marginBottom: 6 }}>{op}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMA+ Y CONTACTO ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* SUMA+ */}
            <div>
              <div className="pf-label pf-label-light">Plataforma de egresados</div>
              <h2 className="pf-section-title pf-title-white">SUMA+ FECA</h2>
              <p className="pf-section-desc pf-desc-white" style={{ marginBottom: 28 }}>
                Regístrate como egresado en SUMA+ FECA para acceder a más oportunidades de vinculación laboral,
                noticias del sector y red de exalumnos.
              </p>
              <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer" className="pf-btn-primary">
                Ir a SUMA+ FECA
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            {/* Contacto */}
            <div>
              <div className="pf-label pf-label-light">¿Tienes dudas?</div>
              <h2 className="pf-section-title pf-title-white">Contáctanos</h2>
              <div className="pf-contact-list" style={{ marginTop: 20 }}>
                <a href="tel:6188271365" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Teléfono</span><span className="pf-contact-value">(618) 827-13-65</span></div>
                </a>
                <a href="mailto:informes@feca.ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">informes@feca.ujed.mx</span></div>
                </a>
                <div className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Dirección</span><span className="pf-contact-value">Fanny Anitúa y Priv. Loza s/n, Durango</span></div>
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

export default BolsaTrabajoPage;
