import Footer from "../sections/Footer";
import Header from "../sections/Header";

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="3" y="2" width="14" height="18" rx="2" fill="#951823" opacity="0.15"/>
    <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#951823" strokeWidth="1.5" fill="white"/>
    <path d="M14 2v4h4" stroke="#951823" strokeWidth="1.5" fill="none"/>
    <line x1="7" y1="10" x2="15" y2="10" stroke="#951823" strokeWidth="1.2"/>
    <line x1="7" y1="13" x2="15" y2="13" stroke="#951823" strokeWidth="1.2"/>
    <line x1="7" y1="16" x2="12" y2="16" stroke="#951823" strokeWidth="1.2"/>
  </svg>
);

function groupItems(items) {
  const groups = [];
  let current = null;
  items.forEach((item) => {
    if (item.title && item.body) {
      current = { title: item.title, rows: [] };
      groups.push(current);
      current.rows.push({ label: item.body, href: item.href });
    } else if (item.title && !item.body) {
      current = { title: null, rows: [{ label: item.title, href: item.href }] };
      groups.push(current);
    } else {
      if (!current) { current = { title: null, rows: [] }; groups.push(current); }
      current.rows.push({ label: item.body, href: item.href });
    }
  });
  return groups;
}

function DocRow({ href, label, subtitle }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="doc-row"
    >
      <span className="doc-row-icon" aria-hidden="true"><DocIcon /></span>
      <span className="doc-row-text">
        <span className="doc-row-label">{label}</span>
        {subtitle && <span className="doc-row-sub">{subtitle}</span>}
      </span>
    </a>
  );
}

function ServiceDetailPage({
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
        currentRoute="services"
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

      {content.encargado && (
        <section className="pf-section pf-section-alt">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Quién nos atiende</div>
              <h2 className="pf-section-title">{content.encargado.role}</h2>
            </div>
            <div className="encargado-card">
              <div className="encargado-card-photo">
                <img src={content.encargado.image} alt={content.encargado.role} />
              </div>
              <div className="encargado-card-body">
                <span className="encargado-card-badge">{content.encargado.role}</span>
                <h3 className="encargado-card-name">{content.encargado.name}</h3>
                {content.encargado.quote && (
                  <p className="encargado-card-quote">"{content.encargado.quote}"</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {content.gallery && content.gallery.length > 0 && (
        <section className="pf-section pf-section-light">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Nuestro equipo</div>
              <h2 className="pf-section-title">Galería</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {content.gallery.map((src) => (
                <div key={src} style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={src}
                    alt={content.heroTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="details-page doc-list-page">
        {content.coordinator && (
          <div className="coord-card">
            <div className="coord-card-photo">
              <img src={content.coordinator.image} alt={content.coordinator.badge} />
            </div>
            <div className="coord-card-body">
              <span className="coord-card-badge">{content.coordinator.badge}</span>
              {content.coordinator.name && (
                <h3 className="coord-card-name">{content.coordinator.name}</h3>
              )}
              <p className="coord-card-quote">{content.intro}</p>
            </div>
          </div>
        )}
        {content.items.length === 0 ? null : content.grouped ? (
          groupItems(content.items).map((group, gi) => (
            <div key={gi} className="doc-group">
              {group.title && <h2 className="doc-group-title">{group.title}</h2>}
              <div className="doc-group-body">
                {group.rows.map((row, ri) => (
                  <DocRow key={ri} href={row.href} label={row.label} />
                ))}
              </div>
            </div>
          ))
        ) : (
          content.items.map((item, index) => {
            const isSection = item.title && !item.href;
            const label = item.title ?? item.body;
            const subtitle = item.title && item.body ? item.body : null;
            if (isSection) {
              return <h2 key={index} className="doc-section-heading">{item.title}</h2>;
            }
            return (
              <DocRow key={index} href={item.href} label={label} subtitle={subtitle} />
            );
          })
        )}
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServiceDetailPage;
