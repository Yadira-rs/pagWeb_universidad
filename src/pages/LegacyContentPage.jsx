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
        <button className="hc-arrow-btn" onClick={prev} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
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
        <button className="hc-arrow-btn" onClick={next} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
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
        </div>
        <div className="hc-side">
          <div className="hc-side-img-wrap">
            <img src={slide.sideImage} alt="" loading="lazy" />
          </div>
          <span className="hc-side-tag">{slide.tag}</span>
        </div>
        <p className="hc-text">{slide.text}</p>
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
          <div className="pf-cards-grid">
            {section.cards?.map((card) => (
              <div
                key={card.title}
                className="pf-card"
                style={{ borderTop: `4px solid ${card.color ?? "var(--navy)"}` }}
              >
                <div
                  className="pf-card-icon"
                  style={{ background: card.color ?? "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}
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
                        } : { background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff" }}
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
          {section.image && (
            <img
              src={section.image}
              alt={section.imageAlt || section.title}
              style={{
                width: "100%",
                maxWidth: section.imageMaxWidth || "100%",
                display: "block",
                margin: section.imageMaxWidth ? "0 auto 24px" : "0 0 24px",
                borderRadius: 14,
              }}
            />
          )}
          {section.paragraphs?.map((p) => (
            <p key={p} style={{ marginBottom: 12 }}>{p}</p>
          ))}
          {section.quote && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 36px)",
                color: "#2b2b2b",
                textAlign: "center",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {section.quote}
            </p>
          )}
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
                          style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff", justifyContent: "center" }}
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

    if (section.variant === "team") {
      const [lead, ...rest] = section.cards ?? [];
      return (
        <div className="cesa-team">
          {lead && (
            <div className="cesa-team-lead">
              <div className="cesa-team-lead-avatar">
                {lead.image && <img src={lead.image} alt={lead.title} />}
              </div>
              <h3 className="cesa-team-name">{lead.title}</h3>
              {lead.body && <span className="cesa-team-role cesa-team-role-lead">{lead.body}</span>}
            </div>
          )}
          {rest.length > 0 && (
            <div className="cesa-team-grid">
              {rest.map((card) => (
                <div key={card.title} className="cesa-team-card">
                  <div className="cesa-team-avatar">
                    {card.image && <img src={card.image} alt={card.title} />}
                  </div>
                  <h3 className="cesa-team-name">{card.title}</h3>
                  {card.body && <span className="cesa-team-role">{card.body}</span>}
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
                  style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff", marginTop: 16, width: "fit-content" }}
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
      <div className={section.columns === 2 ? "pf-cards-grid-2" : "pf-cards-grid"}>
        {section.cards?.map((card) => (
          <div key={card.title} className="pf-card pf-card-top" style={card.wide ? { gridColumn: "1 / -1" } : undefined}>
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: 108, height: 108, borderRadius: "50%",
                  objectFit: "cover", objectPosition: "center 15%",
                  margin: "0 auto", display: "block",
                  border: "3px solid rgba(192,0,12,0.12)",
                }}
              />
            )}
            <h3 className="pf-card-title" style={card.image ? { textAlign: "center" } : undefined}>{card.title}</h3>
            {card.price && (
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>
                {card.price}
              </div>
            )}
            {card.body && <p className="pf-card-desc" style={card.image ? { textAlign: "center" } : undefined}>{card.body}</p>}
            {card.list && (
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {card.list.map((item) => (
                  <li key={item} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gray-mid)", lineHeight: 1.65 }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
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
                    style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff", justifyContent: "center" }}
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

    if (content.planStyle) {
      return (
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
      );
    }

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
                        style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff" }}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
                {panel.items && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {panel.items.map((item) => {
                      if (item.startsWith("phone:")) {
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
                      if (item.startsWith("email:")) {
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
                      return <span key={item} className="pf-chip">{item}</span>;
                    })}
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
                    style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff", justifyContent: "center" }}
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
            <nav style={{ display: "flex", justifyContent: "center", minWidth: "max-content" }} aria-label="Secciones de la página">
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
                    color: activeTab === tab.href ? "#e31313" : "var(--gray-mid)",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === tab.href ? "3px solid #e31313" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
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
                <div className={section.headCenter ? "pf-section-head pf-section-head-center" : "pf-section-head"}>
                  <div className="pf-label">{section.label}</div>
                  <h2 className="pf-section-title">{section.title}</h2>
                  {section.note && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", margin: 0, lineHeight: 1.75, fontStyle: "italic" }}>
                      {section.note}
                    </p>
                  )}
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
