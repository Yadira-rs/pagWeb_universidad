import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const termsSections = [
  {
    title: "Aceptación de los términos",
    content: "Al acceder y utilizar el sitio web de la Facultad de Economía, Contaduría y Administración (FECA) de la UJED, usted acepta quedar obligado por los presentes términos y condiciones de uso.",
    list: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: "Uso del sitio",
    content: "Este sitio web es de uso exclusivamente informativo. Usted se compromete a:",
    list: [
      "Utilizar el sitio únicamente con fines lícitos",
      "No reproducir, distribuir ni modificar el contenido sin autorización expresa",
      "No realizar acciones que puedan dañar, deshabilitar o sobrecargar el sitio",
      "No intentar acceder a áreas restringidas sin autorización",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Propiedad intelectual",
    content: "Todo el contenido publicado en este sitio — incluyendo textos, imágenes, logotipos y diseño — es propiedad de la FECA-UJED o de sus respectivos titulares, y está protegido por las leyes de propiedad intelectual vigentes en México.",
    list: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>
      </svg>
    ),
  },
  {
    title: "Exactitud de la información",
    content: "La FECA-UJED procura que la información publicada sea precisa y actualizada, pero no garantiza la exactitud, integridad ni vigencia de todos los contenidos. Le recomendamos verificar información importante directamente con las oficinas de la facultad.",
    list: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    title: "Enlaces a terceros",
    content: "Este sitio puede contener enlaces a sitios web de terceros. La FECA-UJED no se hace responsable del contenido, políticas de privacidad ni prácticas de dichos sitios externos.",
    list: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    title: "Modificaciones",
    content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios implica la aceptación de los nuevos términos.",
    list: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.47"/>
      </svg>
    ),
  },
];

function TermsPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        className="pf-hero pf-hero-sm"
        style={{ background: "linear-gradient(135deg, #9b0000 0%, #e31313 55%, #e31313 100%)" }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1 className="pf-hero-title">Términos<br />de Uso</h1>
          <p className="pf-hero-sub">
            Conoce las condiciones de uso de este sitio web y las responsabilidades de los usuarios.
          </p>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container" style={{ maxWidth: 860 }}>
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Condiciones legales</div>
            <h2 className="pf-section-title">Condiciones de uso del sitio</h2>
            <p className="pf-section-desc">
              Al navegar en este sitio, aceptas las siguientes condiciones establecidas por la FECA-UJED.
            </p>
          </div>
          <div className="pf-fade" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {termsSections.map((sec) => (
              <div key={sec.title} className="pf-info-box" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div className="pf-card-icon pf-card-icon-light" style={{ flexShrink: 0 }}>
                  {sec.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--navy)", margin: "0 0 10px" }}>
                    {sec.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>
                    {sec.content}
                  </p>
                  {sec.list && (
                    <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                      {sec.list.map((item) => (
                        <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", lineHeight: 1.75, marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Contacto al final */}
          <div className="pf-info-box" style={{ marginTop: 0 }}>
            <h3>Contacto</h3>
            <p>Para cualquier duda relacionada con estos términos, puede contactarnos en:</p>
            <div className="pf-contact-list" style={{ marginTop: 16 }}>
              <a href="mailto:informes@feca.ujed.mx" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">informes@feca.ujed.mx</span></div>
              </a>
              <a href="tel:6188271365" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Teléfono</span><span className="pf-contact-value">(618) 827-13-65</span></div>
              </a>
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--gray-mid)", marginTop: 32, textAlign: "center" }}>
            Última actualización: junio 2026
          </p>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default TermsPage;
