import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const servicios = [
  {
    title: "Asesoría para proyectos de innovación",
    desc: "Acompañamos la estructuración y validación de tu idea con metodologías de innovación aplicada y enfoque práctico.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      </svg>
    ),
  },
  {
    title: "Acompañamiento a ideas de negocio",
    desc: "Orientamos tu proyecto desde la idea inicial hasta el modelo de negocio: validación, plan y primeros pasos reales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: "Talleres de desarrollo organizacional",
    desc: "Formación práctica en habilidades gerenciales, trabajo en equipo y mejora continua para el mundo profesional.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Vinculación con iniciativas institucionales",
    desc: "Conectamos a estudiantes y proyectos con convocatorias, redes y programas de la FECA, UJED y dependencias externas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  },
];

const areas = [
  {
    label: "Innovación",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    label: "Emprendimiento",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
  {
    label: "Consultoría",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: "Desarrollo institucional",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
];

const documentos = [
  {
    href: "/FOLLETO-GENERAL-CERTIFICACIONES.pdf",
    download: "Folleto-General-Certificaciones-CIIEDO.pdf",
    label: "Folleto general de certificaciones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
  {
    href: "/calendario-ciiedo.html",
    download: "Certificado-SEP-CONOCER-STPS-CIIEDO.html",
    label: "Certificado con validez nacional SEP-CONOCER-STPS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    href: "/diagrama-coordinacion.jpeg",
    download: "Diagrama-Coordinacion-CIIEDO.jpeg",
    label: "Diagrama de coordinación",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
];

const porQueCiiedo = [
  {
    title: "100% gratuito para alumnos FECA",
    body: "Todos nuestros servicios son accesibles sin costo para los estudiantes activos de la facultad. Tu único compromiso es querer crecer.",
  },
  {
    title: "Acompañamiento personalizado",
    body: "No eres un número. Cada proyecto recibe atención directa del equipo del CIIEDO: desde la primera idea hasta los siguientes pasos.",
  },
  {
    title: "Vinculación con aval institucional",
    body: "Conectamos tu proyecto con redes, convocatorias y programas dentro de la UJED y con dependencias externas de innovación.",
  },
];

const STATS = [
  { num: "4", label: "Servicios especializados" },
  { num: "100%", label: "Gratuito para alumnos" },
  { num: "UJED", label: "Aval institucional" },
  { num: "FECA", label: "Centro de innovación" },
];

export default function CiiedoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToServicios = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* HERO */}
      <section
        className="pf-hero"
        style={{ backgroundImage: "url('/imagenes/feca-plaza-1.jpg')" }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">CIIEDO · FECA · UJED</div>
          <h1 className="pf-hero-title" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            Centro de Innovación,<br />Investigación, Emprendimiento<br />y Desarrollo Organizacional
          </h1>
          <p className="pf-hero-sub">
            En CIIEDO te asesoramos, acompañamos y conectamos con oportunidades
            de innovación y emprendimiento dentro de la FECA.
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

      {/* ABOUT — logo + texto + imagen */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="ciiedo-about-grid">

            {/* Columna izquierda: identidad + descripción + áreas */}
            <div className="ciiedo-about-text">
              <img
                src="/imagenes/logo-ciiedo.png"
                alt="Logo CIIEDO"
                className="ciiedo-about-logo"
              />
              <div className="pf-label" style={{ marginTop: 28 }}>¿Quiénes somos?</div>
              <h2 className="pf-section-title" style={{ marginTop: 8 }}>
                El centro de innovación<br />y emprendimiento de la{" "}
                <span style={{ color: "var(--navy)" }}>FECA</span>
              </h2>
              <p className="pf-section-desc" style={{ marginTop: 12, marginBottom: 28 }}>
                El CIIEDO es el espacio dentro de la facultad donde los estudiantes
                encuentran dirección, metodología y conexión real con el ecosistema
                de innovación. Si tienes una idea —por pequeña que sea— este es tu lugar.
              </p>
              <div className="pf-chips" style={{ gap: 12 }}>
                {areas.map((a) => (
                  <span key={a.label} className="pf-chip" style={{ fontSize: 14, padding: "10px 20px" }}>
                    {a.icon}{a.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Columna derecha: foto grande + mini fotos */}
            <div className="ciiedo-about-gallery">
              <div className="ciiedo-about-img-main">
                <img src="/imagenes/feca-plaza-1.jpg" alt="Campus FECA" />
                <div className="ciiedo-about-img-caption">Donde las ideas cobran vida</div>
              </div>
              <div className="ciiedo-about-img-side">
                <img src="/imagenes/feca-entrada.jpg" alt="Entrada FECA" />
                <img src="/imagenes/aniversario.jpeg" alt="FECA UJED" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POR QUÉ CIIEDO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">¿Por qué elegirnos?</div>
            <h2 className="pf-section-title">Razones para confiar en el CIIEDO</h2>
          </div>
          <div className="pf-cards-grid">
            {porQueCiiedo.map((item) => (
              <div key={item.title} className="pf-card pf-card-top">
                <div className="pf-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="pf-card-title">{item.title}</h3>
                <p className="pf-card-desc">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Lo que hacemos por ti</div>
            <h2 className="pf-section-title pf-title-white">Nuestros servicios</h2>
            <p className="pf-section-desc pf-desc-white">
              Desde la primera idea hasta la conexión con el ecosistema de innovación, el{" "}
              <strong>CIIEDO</strong> te acompaña en cada etapa.
            </p>
          </div>
          <div className="pf-cards-grid-4 pf-fade">
            {servicios.map((s) => (
              <div key={s.title} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{s.icon}</div>
                <h3 className="pf-card-title">{s.title}</h3>
                <p className="pf-card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFORMACIÓN INSTITUCIONAL — flyer CIIEDO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Conócenos</div>
            <h2 className="pf-section-title">Información institucional</h2>
            <p className="pf-section-desc">
              Material oficial del <strong>CIIEDO</strong> para estudiantes de la FECA.
            </p>
          </div>
          <div
            className="pf-fade"
            style={{
              maxWidth: 680,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(192,57,43,0.15)",
              border: "1px solid #f0e0e0",
            }}
          >
            <img
              src="/imagenes/CIIEDO.jpg"
              alt="Prácticas Profesionales y Servicio Social CIIEDO"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* CALENDARIOS DE ACTIVIDADES */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Agenda</div>
            <h2 className="pf-section-title">Calendarios y actividades</h2>
            <p className="pf-section-desc">
              Consulta los calendarios de eventos, talleres y certificaciones del <strong>CIIEDO</strong>.
            </p>
          </div>
          <div
            className="pf-fade"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              { src: "/imagenes/CIIEDO_calendario.jpeg", alt: "Calendario CIIEDO" },
              { src: "/calendario-ciiedo.jpeg",          alt: "Calendario de actividades" },
              { src: "/calendario-ciiedo-2.jpeg",        alt: "Calendario 2" },
            ].map((img) => (
              <div
                key={img.src}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
                  border: "1px solid #ece8e8",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGRAMA DE COORDINACIÓN */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Estructura</div>
            <h2 className="pf-section-title">Diagrama de coordinación</h2>
            <p className="pf-section-desc">
              Organización interna del <strong>CIIEDO</strong> dentro de la Facultad de Economía,
              Contaduría y Administración.
            </p>
          </div>
          <div
            className="pf-fade"
            style={{
              background: "#fff",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(192,57,43,0.14)",
              border: "1px solid #f0e0e0",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <img
              src="/diagrama-coordinacion.jpeg"
              alt="Diagrama de coordinación CIIEDO"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* FRANJA CIIEDO — degradado puro, sin imagen de fondo */}
      <div
        className="pf-fade"
        style={{
          width: "100%",
          padding: "64px 24px",
          background: "linear-gradient(135deg, #9b0000 0%, #C0392B 55%, #e31313 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 10vw, 110px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-3px",
            lineHeight: 1,
            textShadow: "0 6px 32px rgba(0,0,0,0.25)",
          }}
        >
          CIIEDO
        </div>
        <p
          style={{
            margin: "14px 0 0",
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          FECA · UJED · Durango
        </p>
      </div>

      {/* CTA BANNER */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-cta-banner">
            <div className="pf-cta-banner-text">
              <h2>¿Tienes un proyecto en mente?</h2>
              <p>
                El primer paso es el más fácil: acércate al <strong>CIIEDO</strong>, cuéntanos tu idea
                y nosotros te guiamos desde ahí.
              </p>
            </div>
            <div className="pf-cta-banner-actions">
              <a href="mailto:ciiedo.feca@ujed.mx" className="pf-btn-outline">
                Escríbenos ahora
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div className="pf-label">¿Tienes una idea?</div>
              <h2 className="pf-section-title">Contáctanos</h2>
              <p className="pf-section-desc" style={{ marginBottom: 28 }}>
                El equipo del <strong>CIIEDO</strong> está disponible para resolver tus dudas,
                escuchar tu proyecto o guiarte hacia los recursos que necesitas.
              </p>
              <div className="pf-contact-list">
                <a href="mailto:ciiedo.feca@ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Correo electrónico</span>
                    <span className="pf-contact-value">ciiedo.feca@ujed.mx</span>
                  </div>
                </a>
                <a href="tel:6181544657" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.5 19.5 0 0 1 5 12 19.79 19.79 0 0 1 1.14 4.16 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11l-.91.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Teléfono</span>
                    <span className="pf-contact-value">618 154 4657</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Tarjeta con logo real */}
            <div
              className="pf-card"
              style={{ padding: "40px 32px", borderTop: "4px solid #C0392B", textAlign: "center" }}
            >
              <img
                src="/imagenes/logo-ciiedo.png"
                alt="Logo CIIEDO"
                style={{ height: 80, objectFit: "contain", display: "block", margin: "0 auto 20px" }}
              />
              <p className="pf-card-desc">
                Centro de Innovación, Emprendimiento y Desarrollo Organizacional de la Facultad de
                Economía, Contaduría y Administración — UJED.
              </p>
              <div className="pf-chips" style={{ justifyContent: "center", marginTop: 16 }}>
                <span className="pf-chip">Coordinación FECA</span>
                <span className="pf-chip">UJED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTOS */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Recursos disponibles</div>
            <h2 className="pf-section-title">Documentos</h2>
            <p className="pf-section-desc">
              Descarga los materiales informativos y de certificación disponibles para
              estudiantes y egresados de la FECA.
            </p>
          </div>
          <div
            className="pf-fade"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {documentos.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                download={doc.download}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  padding: "32px 20px",
                  background: "#fff",
                  border: "1.5px solid #f0e0e0",
                  borderTop: "4px solid #C0392B",
                  borderRadius: 16,
                  boxShadow: "0 4px 20px rgba(192,57,43,0.09)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(192,57,43,0.18)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,57,43,0.09)";
                }}
              >
                {/* Ícono grande */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "linear-gradient(135deg,#C0392B,#e31313)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="26" height="26">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                {/* Texto */}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#1a1a1a",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {doc.label}
                </span>
                {/* Badge descarga */}
                <span
                  style={{
                    marginTop: "auto",
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C0392B",
                    background: "rgba(192,57,43,0.07)",
                    padding: "5px 14px",
                    borderRadius: 999,
                  }}
                >
                  Descargar
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
