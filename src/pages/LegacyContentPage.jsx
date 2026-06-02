import { useEffect, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

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
            <nav className="legacy-tabs" aria-label="Secciones de la pagina">
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
                  }`}
                >
                  <div className="legacy-kicker legacy-section-label">
                    {section.label}
                  </div>
                  <h2>{section.title}</h2>
                  {section.variant === "wide" ? (
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
          <div className="legacy-content-grid">
            {content.panels.map((panel) => (
              <article
                key={panel.title}
                className={`legacy-panel ${
                  panel.variant === "contact" ? "legacy-panel-contact" : ""
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
          ) : null}
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyContentPage;
