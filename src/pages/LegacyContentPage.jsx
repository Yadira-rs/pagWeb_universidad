import { useEffect, useRef, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

/* ── Carrusel de historia ── */
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

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, slides.length, animating]);

  const slide = slides[current];
  const dotPercent = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 0;

  return (
    <div className="hc-wrap">
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
      <div className={`hc-body ${animating ? "hc-fade" : ""}`}>
        <div className="hc-collage">
          {slide.images.map((src, i) => (
            <div key={i} className={`hc-photo hc-photo-${i + 1}`}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="hc-center">
          <span className="hc-tag">{slide.tag}</span>
          <div className="hc-big-year">{slide.year}</div>
          <h3 className="hc-title">{slide.title}</h3>
          <p className="hc-text">{slide.text}</p>
        </div>
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

/* ── Componente principal ── */
function LegacyContentPage({ content, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [activeTab, setActiveTab] = useState(content?.tabs?.[0]?.href ?? "");
  const observerRef = useRef(null);

  useEffect(() => {
    setActiveTab(content?.tabs?.[0]?.href ?? "");
  }, [content]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [content, activeTab]);

  if (!content) return null;

  const sections =
    content.tabMode === "switch"
      ? content.sections?.filter((s) => s.id === activeTab)
      : content.sections;

  /* ── Renderiza una sección interna ── */
  const renderSection = (section) => {
    if (section.variant === "carousel") {
      return <HistoryCarousel slides={section.slides} />;
    }

    if (section.variant === "programs") {
      return (
        <>
          {section.note && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", marginBottom: 28, lineHeight: 1.75 }}>
              {section.note}
            </p>
          )}
          <div className="pf-cards-grid">
            {section.cards?.map((card) => (
              <div
                key={card.title}
                className="pf-card"
                style={{ borderTop: `4px solid ${card.color ?? "var(--navy)"}` }}
              >
                <div
                  className="pf-card-icon"
                  style={{ background: card.color ?? "linear-gradient(135deg,#c0000c,#e31313)" }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "#fff" }}>
                    {card.abbr}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-mid)" }}>
                  {card.plan}
                </div>
                <h3 className="pf-card-title">{card.title}</h3>
                <p className="pf-card-desc">{card.body}</p>
                {card.actions && (
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
                    {card.actions.map((action, i) => (
                      <a
                        key={action.href}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={i === 0 ? "pf-btn-primary" : ""}
                        style={i !== 0 ? {
                          display: "inline-flex", alignItems: "center", gap: 8,
                          fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
                          color: "var(--navy)", textDecoration: "none",
                          border: "1.5px solid var(--navy)", borderRadius: 999,
                          padding: "10px 20px",
                        } : { background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff" }}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      );
    }

    if (section.variant === "wide") {
      return (
        <div className="pf-info-box">
          {section.paragraphs?.map((p) => (
            <p key={p} style={{ marginBottom: 12 }}>{p}</p>
          ))}
          {section.contacts && (
            <div className="pf-contact-list" style={{ marginTop: 20 }}>
              {section.contacts.map((contact) => (
                <div key={contact.label} className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">{contact.label}</span>
                    {contact.href
                      ? <a href={contact.href} className="pf-contact-value" style={{ color: "var(--navy)" }}>{contact.value}</a>
                      : <span className="pf-contact-value">{contact.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
          {section.cards && (
            <div className="pf-cards-grid" style={{ marginTop: 28 }}>
              {section.cards.map((card) => (
                <div key={card.title} className="pf-card pf-card-top">
                  <h3 className="pf-card-title">{card.title}</h3>
                  {card.price && (
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>
                      {card.price}
                    </div>
                  )}
                  <p className="pf-card-desc">{card.body}</p>
                  {card.items && (
                    <div className="pf-chips">
                      {card.items.map((item) => <span key={item} className="pf-chip">{item}</span>)}
                    </div>
                  )}
                  {card.actions && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                      {card.actions.map((action) => (
                        <a
                          key={action.href}
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-btn-primary"
                          style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff", justifyContent: "center" }}
                        >
                          {action.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (section.faq) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {section.faq.map((item) => (
            <div key={item.question} className="pf-info-box">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn-primary"
                  style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff", marginTop: 16, width: "fit-content" }}
                >
                  {item.hrefLabel ?? "Abrir enlace"}
                </a>
              )}
            </div>
          ))}
        </div>
      );
    }

    /* Default: cards grid */
    return (
      <div className="pf-cards-grid">
        {section.cards?.map((card) => (
          <div key={card.title} className="pf-card pf-card-top">
            <h3 className="pf-card-title">{card.title}</h3>
            {card.price && (
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>
                {card.price}
              </div>
            )}
            <p className="pf-card-desc">{card.body}</p>
            {card.items && (
              <div className="pf-chips">
                {card.items.map((item) => <span key={item} className="pf-chip">{item}</span>)}
              </div>
            )}
            {card.actions && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                {card.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-btn-primary"
                    style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff", justifyContent: "center" }}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  /* ── Renderiza panels (modo legacy sin sections) ── */
  const renderPanels = () => {
    if (!content.panels) return null;

    if (content.listStyle) {
      return (
        <>
          {content.panels.filter((p) => !p.actions && !p.items).map((panel) => (
            <p key={panel.title} style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#555", lineHeight: 1.75, marginBottom: 20 }}>
              {panel.body}
            </p>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {content.panels.filter((p) => p.actions || p.items).map((panel) => (
              <div key={panel.title} className="pf-info-box" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--navy)", margin: "0 0 8px" }}>{panel.title}</h2>
                  {panel.body && <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", margin: 0 }}>{panel.body}</p>}
                </div>
                {panel.actions && (
                  <div style={{ display: "flex", gap: 10 }}>
                    {panel.actions.map((action) => (
                      <a
                        key={action.href}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pf-btn-primary"
                        style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff" }}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <div className="pf-cards-grid">
        {content.panels.map((panel) => (
          <div
            key={panel.title}
            className={`pf-card pf-card-top ${panel.variant === "contact" ? "" : ""}`}
          >
            <h3 className="pf-card-title">{panel.title}</h3>
            {panel.body && <p className="pf-card-desc">{panel.body}</p>}
            {panel.paragraphs && (
              <div>
                {panel.paragraphs.map((p) => <p key={p} className="pf-card-desc">{p}</p>)}
              </div>
            )}
            {panel.items && (
              <div className="pf-chips">
                {panel.items.map((item) => {
                  if (panel.variant === "contact" && item.startsWith("email:")) {
                    const value = item.slice(6);
                    return (
                      <a key={item} href={`mailto:${value}`} className="pf-chip" style={{ textDecoration: "none" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" style={{ flexShrink: 0 }}>
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <polyline points="2,4 12,13 22,4" />
                        </svg>
                        {value}
                      </a>
                    );
                  }
                  if (panel.variant === "contact" && item.startsWith("phone:")) {
                    const value = item.slice(6);
                    return (
                      <a key={item} href={`tel:${value.replace(/\s/g, "")}`} className="pf-chip" style={{ textDecoration: "none" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" style={{ flexShrink: 0 }}>
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.72 2.9a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.96-.96a2 2 0 0 1 2.11-.45c.93.35 1.9.59 2.9.72a2 2 0 0 1 1.72 2.02z" />
                        </svg>
                        {value}
                      </a>
                    );
                  }
                  return <span key={item} className="pf-chip">{item}</span>;
                })}
              </div>
            )}
            {panel.actions && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                {panel.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-btn-primary"
                    style={{ background: "linear-gradient(135deg,#c0000c,#e31313)", color: "#fff", justifyContent: "center" }}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute={content.routeGroup}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className={`legacy-hero ${content.title?.toLowerCase().includes("celci") ? "legacy-hero-centered" : ""}`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(123,18,24,0.2), rgba(123,18,24,0.92)), url('${content.heroImage}')`,
        }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">{content.kicker}</div>
          <h1 className="pf-hero-title">{content.title}</h1>
          <p className="pf-hero-sub">{content.intro}</p>
          {content.heroCtas && (
            <div className="pf-hero-ctas">
              {content.heroCtas.map((cta, i) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                  className={i === 0 ? "pf-btn-primary" : "pf-btn-outline"}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {content.stats && (
          <div className="pf-stats" style={{ "--pf-stats-cols": content.stats.length }}>
            {content.stats.map((stat) => (
              <div key={stat.label} className="pf-stat">
                <span className="pf-stat-num">{stat.label}</span>
                <span className="pf-stat-label">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── TABS ── */}
      {content.tabs && (
        <div style={{ position: "sticky", top: 64, zIndex: 80, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8e6e2" }}>
          <div className="pf-container" style={{ overflowX: "auto" }}>
            <nav style={{ display: "flex" }} aria-label="Secciones de la página">
              {content.tabs.map((tab) => (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => {
                    if (content.tabMode === "switch") {
                      setActiveTab(tab.href);
                    } else {
                      document.getElementById(tab.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  style={{
                    padding: "18px 22px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    fontWeight: activeTab === tab.href ? 700 : 500,
                    color: activeTab === tab.href ? "#c0000c" : "var(--gray-mid)",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === tab.href ? "3px solid #c0000c" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                    whiteSpace: "nowrap",
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
            content.planStyle ? (
              <div className="plan-style-section">
                <div className="legacy-kicker plan-section-label">Planes de estudio</div>
                {content.panels.filter(p => !p.actions).map(panel => (
                  <p key={panel.title} className="plan-style-intro">{panel.body}</p>
                ))}
                <div className="plan-cards-grid">
                  {content.panels.filter(p => p.actions).map(panel => (
                    <article key={panel.title} className="plan-card">
                      <div className="plan-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                          <rect x="3" y="2" width="14" height="18" rx="2" fill="#951823" opacity="0.12"/>
                          <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#951823" strokeWidth="1.5" fill="white"/>
                          <path d="M14 2v4h4" stroke="#951823" strokeWidth="1.5" fill="none"/>
                          <line x1="7" y1="10" x2="15" y2="10" stroke="#951823" strokeWidth="1.2"/>
                          <line x1="7" y1="13" x2="15" y2="13" stroke="#951823" strokeWidth="1.2"/>
                          <line x1="7" y1="16" x2="12" y2="16" stroke="#951823" strokeWidth="1.2"/>
                        </svg>
                      </div>
                      <h2 className="plan-card-title">{panel.title}</h2>
                      <p className="plan-card-body">{panel.body}</p>
                      <div className="plan-card-actions">
                        {panel.actions.map(action => (
                          <a
                            key={action.href}
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="plan-card-btn"
                          >
                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
                              <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            {action.label}
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : content.listStyle ? (
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
        </div>
      )}

      {/* ── SECTIONS ── */}
      {sections && (
        <>
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={`pf-section pf-fade ${idx % 2 === 0 ? "pf-section-light" : "pf-section-alt"}`}
            >
              <div className="pf-container">
                <div className="pf-section-head">
                  <div className="pf-label">{section.label}</div>
                  <h2 className="pf-section-title">{section.title}</h2>
                </div>
                {renderSection(section)}
              </div>
            </section>
          ))}
        </>
      )}

      {/* ── PANELS ── */}
      {content.panels && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            {renderPanels()}
          </div>
        </section>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyContentPage;
