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
          <div className="history-breadcrumbs">
            <a href="#/">Inicio</a>
            <span>/</span>
            <span>{content.heroTitle}</span>
          </div>
          <h1 className="history-page-title">{content.heroTitle}</h1>
          <p className="mission-vision-hero-copy">{content.intro}</p>
        </div>
      </section>

      <section
        className={`section mission-vision-section ${
          content.valueGroups ? "values-section" : ""
        }`}
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
            <div className="teacher-carousel-heading">
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
