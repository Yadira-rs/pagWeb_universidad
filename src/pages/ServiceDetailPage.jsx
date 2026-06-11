import Footer from "../sections/Footer";
import Header from "../sections/Header";

function getLinkTarget(href) {
  return href?.startsWith("http") ? "_blank" : undefined;
}

function getLinkRel(href) {
  return href?.startsWith("http") ? "noreferrer" : undefined;
}

const schoolServiceActions = {
  "Contador P": [
    { href: "/docs/plan-de-estudios_cp_2021.pdf", label: "Descargar plan" },
    { href: "/docs/mapa-curricular_cp_2021.pdf", label: "Mapa curricular" },
  ],
  Administraci: [
    { href: "/docs/plan_de_estudios_la_2021.pdf", label: "Descargar plan" },
    { href: "/docs/mapas_curriculares_la_2021.pdf", label: "Mapa curricular" },
  ],
  "Econom": [
    { href: "/docs/plan_de_estudios_leni_2021.pdf", label: "Descargar plan" },
    { href: "/docs/mapas_curriculares_leni_2021.pdf", label: "Mapa curricular" },
  ],
};

function getActions(item, content) {
  if (item.actions?.length) return item.actions;

  if (content.heroTitle === "Servicios Escolares") {
    const schoolActions = Object.entries(schoolServiceActions).find(([title]) =>
      item.title?.includes(title),
    )?.[1];

    if (schoolActions) return schoolActions;
  }

  return item.href
    ? [{ href: item.href, label: item.label ?? "Abrir enlace" }]
    : [];
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

      <main className="details-page service-card-grid">
        {content.items.map((item, index) => {
          const actions = getActions(item, content);

          return (
            <article
              key={`${item.title ?? item.body ?? index}`}
              className="info-box service-download-card"
            >
              {item.title ? <h2>{item.title}</h2> : null}
              {item.body ? <p>{item.body}</p> : null}
              {item.note ? <p>{item.note}</p> : null}
              {actions.length ? (
                <div className="info-actions">
                  {actions.map((action) => (
                    <a
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      target={getLinkTarget(action.href)}
                      rel={getLinkRel(action.href)}
                      className="pdf-btn"
                    >
                      {action.label ?? "Abrir enlace"}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServiceDetailPage;
