import { useEffect, useRef, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import DirectorsList from "../components/DirectorsList";

function SingleSectionPage({ content, slug, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="single-section"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero pf-hero-sm"
        style={
          slug === "ejes-rectores"
            ? { backgroundImage: `url('/imagenes/feca-entrada.jpg')` }
            : { background: "linear-gradient(135deg, #9b0000 0%, #e31313 55%, #e31313 100%)" }
        }
      >
        {slug === "ejes-rectores" && <div className="pf-hero-overlay" />}
        <div className="pf-hero-inner" style={{ paddingBottom: 72 }}>
          <div className="pf-hero-badge">FECA · UJED</div>
          <h1 className="pf-hero-title">{content.heroTitle}</h1>
          {content.intro && <p className="pf-hero-sub">{content.intro}</p>}
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      {content.valueGroups ? (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Identidad institucional</div>
              <h2 className="pf-section-title">{content.heroTitle}</h2>
            </div>
            <div className="pf-cards-grid pf-fade">
              {content.valueGroups.map((group) => (
                <div key={group.title} style={{ background: "#fff", border: "1px solid #e8e6e2", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column" }}>
                  {group.image && (
                    <div style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={group.image}
                        alt={group.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px", lineHeight: 1.3 }}>{group.title}</h3>
                    <div className="pf-chips">
                      {group.items.map((item) => (
                        <span key={item} className="pf-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="pf-section pf-section-light pf-fade" style={slug === "ejes-rectores" ? { paddingTop: 48 } : {}}>
          <div className="pf-container">
            {slug === "ejes-rectores" ? (
              <>
                {/* ── ORGANIGRAMA Visor interactivo ── */}
                <div className="pf-section-head pf-fade" style={{ marginBottom: 24 }}>
                  <div className="pf-label">Estructura institucional</div>
                  <h2 className="pf-section-title">Organigrama</h2>
                </div>
                
                <div className="ejes-org-container pf-fade">
                  <div className="ejes-org-card" onClick={() => setIsLightboxOpen(true)}>
                    <img 
                      src="/imagenes/organigrama.jfif" 
                      alt="Organigrama FECA" 
                      className="ejes-org-img"
                    />
                    <div className="ejes-org-overlay">
                      <div className="ejes-org-overlay-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Hacer clic para ampliar organigrama</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fila de botones de acción */}
                  <div className="ejes-org-actions">
                    <button className="ejes-org-btn btn-secondary" onClick={() => setIsLightboxOpen(true)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Ampliar Imagen</span>
                    </button>
                    
                    <a 
                      href="/ORGANIGRAMA-FECA.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ejes-org-btn btn-primary"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span>Ver PDF Oficial</span>
                    </a>
                    
                    <a 
                      href="/ORGANIGRAMA-FECA.pdf" 
                      download="ORGANIGRAMA-FECA.pdf" 
                      className="ejes-org-btn btn-outline"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Descargar PDF</span>
                    </a>
                  </div>
                </div>

                {/* Lightbox Modal del Organigrama */}
                {isLightboxOpen && (
                  <div className="org-lightbox" onClick={() => setIsLightboxOpen(false)}>
                    <button className="org-lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Cerrar vista">
                      &times;
                    </button>
                    <div className="org-lightbox-content" onClick={(e) => e.stopPropagation()}>
                      <img 
                        src="/imagenes/organigrama.jfif" 
                        alt="Organigrama Completo FECA" 
                        className="org-lightbox-img"
                      />
                      <div className="org-lightbox-footer">
                        <h4>Organigrama Institucional - FECA UJED</h4>
                        <div className="org-lightbox-actions">
                          <a href="/ORGANIGRAMA-FECA.pdf" target="_blank" rel="noopener noreferrer">
                            Ver PDF Original
                          </a>
                          <span className="org-lightbox-separator">|</span>
                          <a href="/ORGANIGRAMA-FECA.pdf" download="ORGANIGRAMA-FECA.pdf">
                            Descargar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DIRECTIVOS lista ejecutiva ── */}
                <DirectorsList />

                <div className="ejes-rectores-container fade-up" style={{ marginTop: 64 }}>
                  <div className="ejes-rectores-header" style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span className="legacy-kicker">{content.eyebrow}</span>
                    <h2 className="mission-vision-title" style={{ marginTop: "12px" }}>{content.title}</h2>
                    <p className="mission-vision-body" style={{ margin: "0 auto", maxWidth: "800px" }}>{content.body}</p>
                  </div>
                  <div className="highlights-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", justifyContent: "center" }}>
                    {content.points.map((point, index) => {
                      let icon = null;
                      let title = "";
                      let description = "";

                      if (index === 0) {
                        title = "Excelencia Académica";
                        description = point;
                        icon = (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 10v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 10l10-5 10 5-10 5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        );
                      } else if (index === 1) {
                        title = "Innovación y Tecnología";
                        description = point;
                        icon = (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 17v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        );
                      } else {
                        title = "Vinculación y Proyección";
                        description = point;
                        icon = (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12h20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        );
                      }

                      return (
                        <article key={point} className="highlight-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                          <div className="highlight-icon" style={{ background: "var(--navy)", color: "#fff" }}>
                            {icon}
                          </div>
                          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--navy)", marginBottom: "8px", fontFamily: "var(--font-display)" }}>{title}</h3>
                          <p style={{ fontSize: "0.95rem", color: "var(--gray-dark)", lineHeight: "1.6", margin: 0 }}>{description}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>

              </>
            ) : (
              <article className="mission-vision-card single-section-card fade-up">
                <div className="mission-vision-eyebrow">{content.eyebrow}</div>
                <h2 className="mission-vision-title">{content.title}</h2>
                <p className="mission-vision-body">{content.body}</p>
                <div className="mission-vision-points">
                  {content.points.map((point) => (
                    <div key={point} className="mission-vision-point">
                      <span className="mission-vision-dot"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>
        </section>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SingleSectionPage;
