import Footer from "../sections/Footer";
import Header from "../sections/Header";

function SingleSectionPage({
  content,
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

      <section className="section mission-vision-section">
        <div className="container">
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
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SingleSectionPage;
