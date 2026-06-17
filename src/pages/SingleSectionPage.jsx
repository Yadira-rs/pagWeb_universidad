import Footer from "../sections/Footer";
import Header from "../sections/Header";
import DirectorsCarousel from "../components/DirectorsCarousel";

function SingleSectionPage({
  content,
  slug,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="single-section"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="history-page-hero institutional-hero">
        <div className="history-page-overlay"></div>
        <div className="history-page-inner">
          <h1 className="history-page-title">{content.heroTitle}</h1>
          <p className="mission-vision-hero-copy">{content.intro}</p>
        </div>
      </section>

      <section
        className={`section mission-vision-section ${
          content.valueGroups ? "values-section" : ""
        } ${slug === "ejes-rectores" ? "ejes-section-bg" : ""}`}
      >
        <div className="container">
          {content.valueGroups ? (
            <article className="values-poster fade-up">
              <div className="values-poster-bg values-poster-bg-left"></div>
              <div className="values-poster-bg values-poster-bg-right"></div>
              <h2 className="values-poster-title">{content.heroTitle}</h2>
              <div className="values-poster-content">
                <div className="values-red-triangle" aria-hidden="true"></div>
                <div className="values-groups">
                  {content.valueGroups.map((group) => (
                    <div key={group.title} className="values-group">
                      <h3>{group.title}</h3>
                      <p>{group.items.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ) : slug === "ejes-rectores" ? (
            <div className="ejes-rectores-container fade-up">
              <div className="ejes-rectores-header" style={{ textAlign: "center", marginBottom: "48px" }}>
                <span className="legacy-kicker">{content.eyebrow}</span>
                <h2 className="mission-vision-title" style={{ marginTop: "12px" }}>{content.title}</h2>
                <p className="mission-vision-body" style={{ margin: "0 auto", maxWidth: "800px" }}>{content.body}</p>
              </div>
              <div className="highlights-grid">
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

      {slug === "ejes-rectores" && (
        <section className="section section-alt">
          <div className="container">
            <div className="teacher-carousel-heading ejes-dirs-heading">
              <div className="section-label">Nuestro equipo</div>
              <h3 className="section-title">Directores</h3>
              <p className="section-desc">
                Conoce al equipo que guía la vida académica, administrativa y de vinculación de nuestra facultad.
              </p>
            </div>
          </div>
          <DirectorsCarousel />
        </section>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SingleSectionPage;
