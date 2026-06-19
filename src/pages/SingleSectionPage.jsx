import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

function SingleSectionPage({ content, slug, logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        style={{ background: "linear-gradient(135deg, #9b0000 0%, #c0000c 55%, #e31313 100%)" }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 72 }}>
          <div className="pf-hero-badge">FECA · UJED</div>
          <h1 className="pf-hero-title">{content.heroTitle}</h1>
          {content.intro && <p className="pf-hero-sub">{content.intro}</p>}
        </div>
      </section>

      {/* ── CONTENIDO: VALUE GROUPS ── */}
      {content.valueGroups ? (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Identidad institucional</div>
              <h2 className="pf-section-title">{content.heroTitle}</h2>
            </div>
            <div className="pf-cards-grid pf-fade">
              {content.valueGroups.map((group) => (
                <div key={group.title} className="pf-card pf-card-top">
                  <div className="pf-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="pf-card-title">{group.title}</h3>
                  <div className="pf-chips">
                    {group.items.map((item) => (
                      <span key={item} className="pf-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* ── CONTENIDO: SINGLE CARD ── */
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container" style={{ maxWidth: 820 }}>
            <div className="pf-info-box" style={{ padding: "44px 48px" }}>
              {content.eyebrow && (
                <div className="pf-label" style={{ marginBottom: 12 }}>{content.eyebrow}</div>
              )}
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,36px)", color: "var(--navy)", margin: "0 0 20px", lineHeight: 1.2 }}>
                {content.title}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#555", lineHeight: 1.8, margin: "0 0 28px" }}>
                {content.body}
              </p>
              {content.points && content.points.length > 0 && (
                <div className="pf-chips">
                  {content.points.map((point) => (
                    <span key={point} className="pf-chip">{point}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SingleSectionPage;
