import Footer from "../sections/Footer";
import Header from "../sections/Header";

function MissionVisionPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="mission-vision"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="legacy-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(227,19,19,0.2), rgba(227,19,19,0.92)), url('${content.heroImage}')`,
        }}
      >
        <div className="legacy-hero-inner">
          <div className="legacy-kicker">Nosotros</div>
          <h1>{content.heroTitle}</h1>
          <p>{content.intro}</p>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container">
          <div className="mission-vision-page-inner">
            <section className="mv-section fade-up">
              <span className="mv-badge">{content.mission.eyebrow}</span>
              <h2 className="mv-title">{content.mission.title}</h2>
              <p className="mv-body">{content.mission.body}</p>
              {content.mission.points?.length ? (
                <div className="mv-points">
                  {content.mission.points.map((point) => (
                    <div key={point} className="mv-point">
                      <span className="mv-dot"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="mv-section fade-up">
              <span className="mv-badge">{content.vision.eyebrow}</span>
              <h2 className="mv-title">{content.vision.title}</h2>
              <p className="mv-body">{content.vision.body}</p>
              {content.vision.points?.length ? (
                <div className="mv-points">
                  {content.vision.points.map((point) => (
                    <div key={point} className="mv-point">
                      <span className="mv-dot"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default MissionVisionPage;
