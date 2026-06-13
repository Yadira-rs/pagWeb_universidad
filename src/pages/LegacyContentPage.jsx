import { useEffect, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

function HistoryCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 350);
  };

  const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1);
  const next = () => goTo(current === slides.length - 1 ? 0 : current + 1);

  const slide = slides[current];
  const dotPercent = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 0;

  return (
    <div className="hc-wrap">
      {/* Timeline nav */}
      <div className="hc-topbar">
        <button className="hc-arrow-btn" onClick={prev} aria-label="Anterior">‹</button>
        <div className="hc-years-row">
          {slides.map((s, i) => (
            <button
              key={s.year}
              className={`hc-year-btn ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            >
              {s.year}
            </button>
          ))}
        </div>
        <button className="hc-arrow-btn" onClick={next} aria-label="Siguiente">›</button>
      </div>

      <div className="hc-timeline-bar">
        <div className="hc-timeline-line" />
        <div className="hc-timeline-dot" style={{ left: `${dotPercent}%` }} />
      </div>

      {/* Main content */}
      <div className={`hc-body ${animating ? "hc-fade" : ""}`}>
        {/* Left collage */}
        <div className="hc-collage">
          {slide.images.map((src, i) => (
            <div key={i} className={`hc-photo hc-photo-${i + 1}`}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Center text */}
        <div className="hc-center">
          <span className="hc-tag">{slide.tag}</span>
          <div className="hc-big-year">{slide.year}</div>
          <h3 className="hc-title">{slide.title}</h3>
          <p className="hc-text">{slide.text}</p>
        </div>

        {/* Right photo */}
        <div className="hc-side">
          <div className="hc-side-img-wrap">
            <img src={slide.sideImage} alt="" loading="lazy" />
          </div>
          <span className="hc-side-tag">{slide.tag}</span>
        </div>
      </div>
    </div>
  );
}

function LegacyContentPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  const [activeTab, setActiveTab] = useState(content?.tabs?.[0]?.href ?? "");

  useEffect(() => {
    setActiveTab(content?.tabs?.[0]?.href ?? "");
  }, [content]);

  if (!content) return null;

  const sections =
    content.tabMode === "switch"
      ? content.sections?.filter((section) => section.id === activeTab)
      : content.sections;

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
          {content.tabs ? (
            <nav className="legacy-tabs" aria-label="Secciones de la página">
              {content.tabs.map((tab) => (
                <button
                  key={tab.href}
                  type="button"
                  className={activeTab === tab.href ? "active" : ""}
                  onClick={() => {
                    if (content.tabMode === "switch") {
                      setActiveTab(tab.href);
                    } else {
                      document
                        .getElementById(tab.href)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          ) : null}

          {sections ? (
            <div className="legacy-section-stack">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`legacy-inner-section fade-up ${
                    content.tabMode === "switch" ? "visible" : ""
                  }${section.variant === "programs" ? " programs-section" : ""}`}
                >
                  <div className="legacy-kicker legacy-section-label">
                    {section.label}
                  </div>
                  <h2>{section.title}</h2>
                  {section.variant === "programs" ? (
                    <>
                      {section.note ? (
                        <p className="program-section-note">{section.note}</p>
                      ) : null}
                      <div className="programs-grid">
                        {section.cards?.map((card) => (
                          <article
                            key={card.title}
                            className="program-card"
                            style={{ "--program-color": card.color }}
                          >
                            <div className="program-card-header">
                              <div className="program-card-icon">{card.abbr}</div>
                              <div>
                                <div className="program-card-plan">{card.plan}</div>
                                <h3>{card.title}</h3>
                              </div>
                            </div>
                            <div className="program-card-body">
                              <p>{card.body}</p>
                              {card.actions ? (
                                <div className="legacy-actions">
                                  {card.actions.map((action, i) => (
                                    <a
                                      key={action.href}
                                      className={i === 0 ? "btn-program-primary" : "btn-program-outline"}
                                      href={action.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {action.label}
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </article>
                        ))}
                      </div>
                    </>
                  ) : section.variant === "carousel" ? (
                    <HistoryCarousel slides={section.slides} />
                  ) : section.variant === "wide" ? (
                    <article className="legacy-panel legacy-wide-card">
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.contacts ? (
                        <div className="legacy-contact-grid">
                          {section.contacts.map((contact) => (
                            <div key={contact.label} className="legacy-contact-item">
                              <strong>{contact.label}</strong>
                              {contact.href ? (
                                <a href={contact.href}>{contact.value}</a>
                              ) : (
                                <span>{contact.value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {section.cards ? (
                        <div className="legacy-content-grid legacy-card-grid legacy-nested-grid">
                          {section.cards.map((card) => (
                            <article key={card.title} className="legacy-panel">
                              <h3>{card.title}</h3>
                              {card.price ? (
                                <div className="legacy-price">{card.price}</div>
                              ) : null}
                              <p>{card.body}</p>
                              {card.items ? (
                                <ul className="legacy-list legacy-pill-list">
                                  {card.items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              ) : null}
                              {card.actions ? (
                                <div className="legacy-actions">
                                  {card.actions.map((action) => (
                                    <a
                                      key={action.href}
                                      className="btn-primary"
                                      href={action.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {action.label}
                                    </a>
                                  ))}
                                </div>
                              ) : null}
                            </article>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ) : section.faq ? (
                    <div className="legacy-faq">
                      {section.faq.map((item) => (
                        <article key={item.question} className="legacy-panel">
                          <h3>{item.question}</h3>
                          <p>{item.answer}</p>
                          {item.href ? (
                            <div className="legacy-actions">
                              <a
                                className="btn-primary"
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.hrefLabel ?? "Abrir enlace"}
                              </a>
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="legacy-content-grid legacy-card-grid">
                      {section.cards?.map((card) => (
                        <article key={card.title} className="legacy-panel">
                          <h3>{card.title}</h3>
                          {card.price ? (
                            <div className="legacy-price">{card.price}</div>
                          ) : null}
                          <p>{card.body}</p>
                          {card.items ? (
                            <ul className="legacy-list legacy-pill-list">
                              {card.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                          {card.actions ? (
                            <div className="legacy-actions">
                              {card.actions.map((action) => (
                                <a
                                  key={action.href}
                                  className="btn-primary"
                                  href={action.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {action.label}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : null}

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

          {content.panels ? (
            content.listStyle ? (
              <>
                {content.panels.filter(p => !p.actions && !p.items).map(panel => (
                  <p key={panel.title} className="legacy-list-intro">{panel.body}</p>
                ))}
                <div className="legacy-content-list">
                  {content.panels.filter(p => p.actions || p.items).map((panel) => (
                    <article key={panel.title} className="legacy-panel legacy-panel-row">
                      <div className="legacy-panel-row-info">
                        <h2>{panel.title}</h2>
                        {panel.body ? <p>{panel.body}</p> : null}
                      </div>
                      {panel.actions ? (
                        <div className="legacy-actions legacy-actions-row">
                          {panel.actions.map((action) => (
                            <a
                              key={action.href}
                              className="btn-primary"
                              href={action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {action.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </>
            ) : (
          <div className="legacy-content-grid">
            {content.panels.map((panel) => (
              <article
                key={panel.title}
                className={`legacy-panel ${
                  panel.variant === "contact" ? "legacy-panel-contact" :
                  panel.variant === "docs" ? "legacy-panel-docs" : ""
                }`}
              >
                <h2>{panel.title}</h2>
                {panel.body ? <p>{panel.body}</p> : null}
                {panel.paragraphs ? (
                  <div className="legacy-paragraphs">
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
                {panel.items ? (
                  <ul className="legacy-list">
                    {panel.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {panel.actions ? (
                  <div className="legacy-actions">
                    {panel.actions.map((action) => (
                      <a
                        key={action.href}
                        className="btn-primary"
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
            )
          ) : null}
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyContentPage;
