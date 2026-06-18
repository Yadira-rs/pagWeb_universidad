import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const funciones = [
  {
    title: "Fiscalización y Auditoría",
    desc: "Vigilamos y auditamos periódicamente la correcta ejecución de los recursos asignados e ingresos propios de la facultad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: "Control de Procesos",
    desc: "Evaluamos el cumplimiento de los reglamentos internos para optimizar la gestión de trámites y servicios académicos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Rendición de Cuentas",
    desc: "Impulsamos la transparencia en las actividades y decisiones de la administración escolar con reportes periódicos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Atención Ciudadana",
    desc: "Facilitamos la recepción de comentarios, quejas y sugerencias para resolver dudas o inconformidades en nuestros servicios.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

const STATS = [
  { num: "100%", label: "Transparencia" },
  { num: "8-15hrs", label: "Horario de atención" },
  { num: "UJED", label: "Normativa aplicable" },
  { num: "FECA", label: "Órgano interno" },
];

function ContraloriaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/contraloria_feca.png')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Contraloría<br />Interna</h1>
          <p className="pf-hero-sub">
            Órgano de control, fiscalización y transparencia de la Facultad de Economía, Contaduría y Administración de la UJED.
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

      {/* ── ¿QUÉ ES? ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, alignItems: "start" }}>
            <div>
              <div className="pf-label">Transparencia y Legalidad</div>
              <h2 className="pf-section-title">¿Qué es la Contraloría Interna?</h2>
              <p className="pf-section-desc" style={{ marginBottom: 32 }}>
                Es la instancia encargada de promover e implementar mecanismos de control, supervisión,
                transparencia y rendición de cuentas dentro de la FECA. Trabajamos para asegurar el uso
                eficiente y honesto de los recursos, impulsando el cumplimiento normativo y abriendo canales
                de comunicación directa con nuestra comunidad.
              </p>
              <div className="pf-info-box">
                <h3>Nuestra Misión</h3>
                <p>
                  Garantizar la correcta aplicación de los lineamientos administrativos y normativos vigentes
                  de la UJED dentro de nuestra facultad. Fomentamos una cultura de legalidad, ética y honestidad
                  que brinde certeza a estudiantes, personal académico y administrativo.
                </p>
              </div>
            </div>
            {/* Sidebar */}
            <div>
              <div className="pf-card pf-card-top" style={{ marginBottom: 20 }}>
                <img
                  src="/imagenes/contraloria_feca.png"
                  alt="Contraloría Interna FECA"
                  style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
                />
                <h3 className="pf-card-title">Atención al Usuario</h3>
                <p className="pf-card-desc">La Contraloría Interna está a tu servicio para resolver cualquier inquietud sobre la gestión de trámites y la transparencia institucional.</p>
                <div className="pf-chips">
                  <span className="pf-chip">Lun–Vie</span>
                  <span className="pf-chip">8:00–15:00 hrs</span>
                </div>
              </div>
              <div className="pf-contact-list">
                <div className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Ubicación</span><span className="pf-contact-value">Edificio Administrativo FECA</span></div>
                </div>
                <a href="mailto:contraloria@feca.ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">contraloria@feca.ujed.mx</span></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNCIONES ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Nuestro trabajo</div>
            <h2 className="pf-section-title pf-title-white">Funciones Principales</h2>
            <p className="pf-section-desc pf-desc-white">
              Cuatro áreas de acción que garantizan la transparencia y el buen funcionamiento de la FECA.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {funciones.map((f) => (
              <div key={f.title} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{f.icon}</div>
                <h3 className="pf-card-title">{f.title}</h3>
                <p className="pf-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUEJAS Y SUGERENCIAS ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div className="pf-label">Tu voz importa</div>
              <h2 className="pf-section-title">Quejas y Sugerencias</h2>
              <p className="pf-section-desc" style={{ marginBottom: 28 }}>
                Tu opinión es indispensable para mejorar nuestra facultad. Si tienes alguna queja,
                sugerencia o comentario respecto al servicio académico o administrativo, puedes
                hacerlo llegar de manera confidencial y segura.
              </p>
              <a
                href="https://www.youtube.com/watch?v=w7w59Zp8bEM"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn-primary"
                style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff", fontSize: "17px", padding: "18px 40px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Buzón de Quejas y Sugerencias
              </a>
            </div>
            <div className="pf-card pf-card-top" style={{ padding: "44px 36px", textAlign: "center" }}>
              <div className="pf-card-icon" style={{ margin: "0 auto 20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="pf-card-title">Canal de comunicación directo</h3>
              <p className="pf-card-desc" style={{ marginBottom: 20 }}>
                Todas las comunicaciones son tratadas con total confidencialidad y son atendidas en un plazo máximo de 5 días hábiles.
              </p>
              <div className="pf-chips" style={{ justifyContent: "center" }}>
                <span className="pf-chip">Confidencial</span>
                <span className="pf-chip">5 días hábiles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ContraloriaPage;
