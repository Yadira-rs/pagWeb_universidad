import Footer from "../sections/Footer";
import Header from "../sections/Header";

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

      <main className="details-page">
        {content.items.map((item, index) => (
          <div key={`${item.title ?? item.body ?? index}`} className="info-box">
            {item.title ? <h2>{item.title}</h2> : null}
            {item.body ? <p>{item.body}</p> : null}
            {item.note ? <p>{item.note}</p> : null}
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="pdf-btn"
              >
                {item.label ?? "Abrir enlace →"}
              </a>
            ) : null}
          </div>
        ))}
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServiceDetailPage;
