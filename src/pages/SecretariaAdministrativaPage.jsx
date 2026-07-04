import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const queHacemos = [
  {
    title: "Recursos Financieros",
    desc: "Control de presupuesto, pagos a proveedores y nómina del personal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="2" y="6" width="20" height="13" rx="2"/>
        <path d="M2 10h20"/>
        <circle cx="12" cy="15" r="2"/>
      </svg>
    ),
  },
  {
    title: "Recursos Materiales",
    desc: "Compra y mantenimiento de equipo, mobiliario e insumos para aulas y laboratorios.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: "Recursos Humanos",
    desc: "Gestión de contratos, incidencias y prestaciones del personal administrativo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const tramites = [
  {
    title: "Solicitud de constancias administrativas",
    desc: "Constancias de adscripción, nombramiento y demás documentos oficiales para el personal.",
  },
  {
    title: "Comprobación de gastos para eventos académicos",
    desc: "Trámite de reembolsos y comprobantes de gastos generados en actividades académicas institucionales.",
  },
  {
    title: "Reporte de fallas / mantenimiento en instalaciones",
    desc: "Solicitud de reparaciones, mantenimiento preventivo y correctivo en aulas, laboratorios y oficinas.",
  },
  {
    title: "Requisiciones de material para profesores",
    desc: "Solicitud de insumos, papelería y materiales didácticos para el desarrollo de actividades académicas.",
  },
];

function SecretariaAdministrativaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
      <section className="pf-hero pf-hero-sm" style={{ background: "linear-gradient(135deg, #9b0000 0%, #e31313 55%, #e31313 100%)" }}>
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Secretaría<br />Administrativa</h1>
          <p className="pf-hero-sub">
            Brindar soporte administrativo eficiente y transparente para garantizar la operación académica de la FECA.
          </p>
        </div>
      </section>

      {/* ¿QUÉ HACEMOS? */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Nuestra función</div>
            <h2 className="pf-section-title">¿Qué hacemos?</h2>
            <p className="pf-section-desc">
              Coordinamos los recursos de la facultad para garantizar el funcionamiento eficiente de todas sus actividades.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {queHacemos.map((item) => (
              <div key={item.title} className="pf-card">
                <div className="pf-card-icon pf-card-icon-light">{item.icon}</div>
                <h3 className="pf-card-title" style={{ color: "var(--navy)" }}>{item.title}</h3>
                <p className="pf-card-desc" style={{ color: "#666" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRÁMITES */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Lo más solicitado</div>
            <h2 className="pf-section-title pf-title-white">Trámites que atendemos</h2>
            <p className="pf-section-desc pf-desc-white">
              Acércate directamente a la Secretaría Administrativa para gestionar cualquiera de estos procesos.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {tramites.map((t) => (
              <div key={t.title} className="pf-card pf-card-dark" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flexGrow: 1 }}>
                  <h3 className="pf-card-title">{t.title}</h3>
                  <p className="pf-card-desc">{t.desc}</p>
                </div>
                <div style={{ marginTop: 20 }}>
                  <a
                    href="mailto:secadmin.feca@ujed.mx"
                    className="pf-chip"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", color: "inherit" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                    Más info
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-two-col" style={{ gap: 48, alignItems: "center" }}>
            <div>
              <div className="pf-label">¿Necesitas ayuda?</div>
              <h2 className="pf-section-title">Contacto directo</h2>
              <p className="pf-section-desc" style={{ marginBottom: 28 }}>
                Puedes acercarte directamente con la Secretaría Administrativa para cualquier trámite o consulta institucional.
              </p>
              <div className="pf-contact-list">
                <div className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Titular</span>
                    <span className="pf-contact-value">Lic. María Elena Torres Rodríguez</span>
                  </div>
                </div>
                <div className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Horario</span>
                    <span className="pf-contact-value">Lunes a Viernes · 8:00 – 15:00 h</span>
                  </div>
                </div>
                <a href="tel:+526188271365,1234" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.5 19.5 0 0 1 5 12 19.79 19.79 0 0 1 1.14 4.16 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11l-.91.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Teléfono</span>
                    <span className="pf-contact-value">Ext. 1234</span>
                  </div>
                </a>
                <a href="mailto:secadmin.feca@ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Correo</span>
                    <span className="pf-contact-value">secadmin.feca@ujed.mx</span>
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
                    <span className="pf-contact-value">Edificio FECA · Planta Baja · Cubículo 05</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pf-card pf-card-top" style={{ padding: "40px 32px" }}>
              <div className="pf-card-icon" style={{ margin: "0 auto 20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 className="pf-card-title" style={{ textAlign: "center" }}>Atención presencial</h3>
              <p className="pf-card-desc" style={{ textAlign: "center", marginBottom: 20 }}>
                Para la mayoría de los trámites administrativos se requiere presencia física.
                Te recomendamos traer identificación oficial y tu número de empleado o matrícula.
              </p>
              <div className="pf-chips" style={{ justifyContent: "center" }}>
                <span className="pf-chip">Lun–Vie · 8–15 h</span>
                <span className="pf-chip">Cubículo 05</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SecretariaAdministrativaPage;
