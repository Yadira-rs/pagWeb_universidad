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
      </section>

      {/* ── ENCARGADO ── */}
      <section className="pf-section pf-section-alt">
        <div className="pf-container">
          <div className="encargado-welcome-card">
            <div className="encargado-welcome-pattern" aria-hidden="true" />
            <div className="contraloria-logo-tile">
              <img
                src="/imagenes/contraloria/logocontraluria.jpeg"
                alt="Coordinación de Contraloría · FECA"
              />
            </div>
            <span className="encargado-welcome-greeting">Te damos la bienvenida</span>
            <div className="encargado-welcome-divider" aria-hidden="true" />
            <span className="encargado-welcome-badge">Contralor Interno</span>
            <h2 className="encargado-welcome-name">M.G.P. Iván Alfredo González de la Cruz</h2>
            <p className="encargado-welcome-sub">Facultad de Economía, Contaduría y Administración · UJED</p>
          </div>
        </div>
      </section>

      {/* ── ¿QUÉ ES? ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-content-sidebar" style={{ gap: 56, alignItems: "start" }}>
            <div>
              <div className="pf-label">Transparencia y Legalidad</div>
              <h2 className="pf-section-title">¿Qué es la Contraloría Interna?</h2>
              <p className="pf-section-desc" style={{ marginBottom: 32 }}>
                Es la instancia encargada de promover e implementar mecanismos de control, supervisión,
                transparencia y rendición de cuentas dentro de la FECA. Trabajamos para asegurar el uso
                eficiente y honesto de los recursos, impulsando el cumplimiento normativo y abriendo canales
                de comunicación directa con nuestra comunidad.
              </p>
              {/* Quejas y Sugerencias */}
              <div className="pf-info-box" style={{ borderLeftColor: "#e31313" }}>
                <h3 style={{ color: "#e31313" }}>Quejas y Sugerencias</h3>
                <p style={{ marginBottom: 24 }}>
                  Tu opinión es indispensable para mejorar nuestra facultad. Si tienes alguna queja,
                  sugerencia o comentario respecto al servicio académico o administrativo, puedes
                  hacerlo llegar de manera confidencial y segura.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
                  {[
                    {
                      title: "Garantía de Confidencialidad",
                      desc: "Toda la información es tratada de manera anónima y protegida para tu tranquilidad.",
                      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                    },
                    {
                      title: "Respuesta en 5 Días Hábiles",
                      desc: "Nos comprometemos a revisar y dar puntual seguimiento a tu caso a la brevedad.",
                      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                    {
                      title: "Impacto en la Mejora Continua",
                      desc: "Tus comentarios llegan directamente a la Contraloría Interna para optimizar nuestros procesos.",
                      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 14, alignItems: "start" }}>
                      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "9px", background: "rgba(227,19,19,0.08)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(227,19,19,0.15)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 700, color: "#1a1a2e", fontFamily: "var(--font-display)" }}>{item.title}</h4>
                        <p style={{ margin: 0, fontSize: "13px", color: "#5c5c6d", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", background: "#faf7f5", borderRadius: 14, padding: 18 }}>
                  <div style={{ flexShrink: 0, width: 110, background: "#fff", padding: 8, borderRadius: 10, border: "1px solid #eae7e2" }}>
                    <img
                      src="/imagenes/buzon_quejas_qr.png"
                      alt="Código QR Buzón de Quejas"
                      style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }}
                    />
                  </div>
                  <div style={{ flex: "1 1 160px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>QR para Quejas y Sugerencias</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "#6a6a7c", lineHeight: 1.5 }}>
                      Escanea con la cámara de tu teléfono para enviar tu queja, sugerencia o comentario de forma directa.
                    </div>
                  </div>
                </div>

                <a
                  href="https://docs.google.com/forms/d/12tIL7xltY53SGuAgLSBYthOg0HNjFUwnFmXF5wGZ9mU/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    marginTop: 16, width: "100%", boxSizing: "border-box",
                    background: "#e31313", color: "#fff",
                    fontFamily: "var(--font-ui)", fontWeight: 800, fontSize: 14,
                    padding: "14px 20px", borderRadius: 12, textDecoration: "none",
                    boxShadow: "0 6px 18px rgba(227,19,19,0.28)",
                    transition: "transform 0.18s, box-shadow 0.18s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 26px rgba(227,19,19,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 18px rgba(227,19,19,0.28)"; }}
                >
                  Enviar queja o sugerencia
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
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
                <a href="mailto:contraloria.feca@ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">contraloria.feca@ujed.mx</span></div>
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
          <div className="pf-cards-grid-4">
            {funciones.map((f) => (
              <div key={f.title} className="pf-card pf-card-dark pf-fade">
                <div className="pf-card-icon">{f.icon}</div>
                <h3 className="pf-card-title">{f.title}</h3>
                <p className="pf-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DECLARACIÓN PATRIMONIAL ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Obligaciones del servidor público</div>
            <h2 className="pf-section-title">Declaración Patrimonial</h2>
            <p className="pf-section-desc">
              Consulta los avisos oficiales y el material informativo para cumplir con tu declaración patrimonial.
            </p>
          </div>

          {/* Avisos en imagen */}
          <div className="pf-two-col" style={{ gap: 28, marginBottom: 28 }}>
            {[
              { label: "Declaración Patrimonial UJED", src: "/docs/Declaraci%C3%B3n%20Patrimonial%20UJED.jpg", alt: "Declaración Patrimonial UJED" },
              { label: "Declaración Anual FECA", src: "/docs/Declaraci%C3%B3n%20Anual%20FECA%20.jpg", alt: "Declaración Anual FECA" },
            ].map((item) => (
              <div key={item.label} className="pf-card pf-card-top" style={{ overflow: "hidden", padding: 0 }}>
                <div style={{ background: "#f5f0f0", padding: "12px 20px", borderBottom: "1px solid #e8e6e2" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "#e31313", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</span>
                </div>
                <a href={item.src} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: 420 }}
                    onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                  />
                  <div style={{ display: "none", height: 180, alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 14, fontFamily: "var(--font-body)", flexDirection: "column", gap: 8 }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    Archivo pendiente de subir
                  </div>
                </a>
                <div style={{ padding: "10px 20px 14px" }}>
                  <a href={item.src} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#e31313", fontWeight: 700, fontFamily: "var(--font-ui)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Ver en tamaño completo
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Video informativo */}
          <div className="pf-card pf-card-top" style={{ marginBottom: 28, padding: 0, overflow: "hidden" }}>
            <div style={{ background: "#f5f0f0", padding: "12px 20px", borderBottom: "1px solid #e8e6e2" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "#e31313", textTransform: "uppercase", letterSpacing: "0.08em" }}>Video Informativo</span>
            </div>
            <div style={{ padding: "24px 28px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 320px", borderRadius: 10, overflow: "hidden", aspectRatio: "16/9" }}>
                <iframe
                  src="https://www.youtube.com/embed/xhhvHKKI8k4"
                  title="Video Informativo Declaración Patrimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>
              <div style={{ flex: "1 1 260px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>
                  ¿Cómo realizar tu Declaración Patrimonial?
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#7a6a64", lineHeight: 1.7 }}>
                  Conoce el proceso paso a paso para cumplir con tu obligación de declaración patrimonial de forma correcta y oportuna.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MARCO NORMATIVO ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Documentos oficiales</div>
            <h2 className="pf-section-title pf-title-white">Marco Normativo</h2>
            <p className="pf-section-desc pf-desc-white">
              Reglamentos y contratos colectivos vigentes que rigen la vida institucional de la UJED y la FECA.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Ley Orgánica de la UJED", href: "/docs/LEY%20ORGANICA%20DE%20LA%20UJED%20(1).pdf", desc: "Ley que establece la estructura y funcionamiento de la UJED." },
              { label: "Reglamento General UJED", href: "/docs/Reglamento%20General%20UJED.pdf", desc: "Normativa interna de la Universidad Juárez del Estado de Durango." },
              { label: "Contrato Colectivo SPAUJED 2025", href: "/docs/CONTRATO%20COLECTIVO%20SPAUJED%202025.pdf", desc: "Sindicato del Personal Académico de la UJED." },
              { label: "CCT STEUJED 2025", href: "/docs/CCT%20STEUJED%202025%20(1).pdf", desc: "Contrato Colectivo de Trabajo del Sindicato de Trabajadores y Empleados de la UJED." },
            ].map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 18, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "18px 24px", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
              >
                <div style={{ flexShrink: 0, width: 44, height: 44, background: "rgba(255,255,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 2 }}>{doc.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{doc.desc}</div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENLACES INSTITUCIONALES ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center" style={{ marginBottom: 36 }}>
            <div className="pf-label">Portales oficiales</div>
            <h2 className="pf-section-title">Enlaces Institucionales</h2>
          </div>
          <div className="pf-two-col" style={{ gap: 24 }}>
            {[
              {
                label: "Transparencia UJED",
                desc: "Portal oficial de transparencia y acceso a la información de la Universidad Juárez del Estado de Durango.",
                href: "http://transparencia.ujed.mx/",
                icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
              },
              {
                label: "Contraloría General UJED",
                desc: "Órgano rector de control y fiscalización de la Universidad Juárez del Estado de Durango.",
                href: "https://contraloria.ujed.mx/",
                icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "#fff", border: "1px solid #e8e6e2", borderRadius: 16, padding: "28px 28px", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(227,19,19,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ flexShrink: 0, width: 48, height: 48, background: "linear-gradient(135deg,#e31313,#9b0000)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                    <path d={link.icon}/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#1a1a2e", marginBottom: 6 }}>{link.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#7a6a64", lineHeight: 1.65, marginBottom: 12 }}>{link.desc}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#e31313", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13 }}>
                    Visitar portal
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ContraloriaPage;
