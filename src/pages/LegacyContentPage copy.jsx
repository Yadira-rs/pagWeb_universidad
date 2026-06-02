import Footer from "../sections/Footer";
import Header from "../sections/Header";

function LegacyContentPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  if (!content) return null;

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute={content.routeGroup}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="legacy-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(123,18,24,0.2), rgba(123,18,24,0.92)), url('${content.heroImage}')`,
        }}
      >
        <div className="legacy-hero-inner">
          <div className="legacy-kicker">{content.kicker}</div>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container">
          {content.stats ? (
            <div className="legacy-stats">
              {content.stats.map((stat) => (
                <div key={`${stat.label}-${stat.value}`} className="legacy-stat">
                  <strong>{stat.label}</strong>
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="legacy-content-grid">
            {content.panels?.map((panel) => (
              <article
                key={panel.title}
                className={`legacy-panel ${
                  panel.variant === "contact" ? "legacy-panel-contact" : ""
                }`}
              >
                <h2>{panel.title}</h2>
                {panel.body ? <p>{panel.body}</p> : null}
                {panel.items ? (
                  <ul className="legacy-list">
                    {panel.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyContentPage;
