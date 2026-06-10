import Footer from "../sections/Footer";
import Header from "../sections/Header";

const nosotrosCards = [
  {
    title: "Historia",
    description: "Conoce los orígenes y trayectoria de nuestra facultad a lo largo de los años.",
    href: "#/historia",
    imageClass: "nos-img1",
  },
  {
    title: "Organigrama",
    description: "Consulta la estructura organizacional de la Facultad de Economía, Contaduría y Administración.",
    href: "/ORGANIGRAMA-FECA.pdf",
    imageClass: "nos-img2",
    external: true,
  },
  {
    title: "PDUA",
    description: "Plan de Desarrollo Universitario y Académico de la FECA.",
    href: "/PDUA-SILD27.pdf",
    imageClass: "nos-img3",
    external: true,
  },
  {
    title: "Misión y Visión",
    description: "Nuestra razón de ser y hacia dónde nos dirigimos como institución educativa.",
    href: "#/mision-vision",
    imageClass: "nos-img4",
  },
  {
    title: "Valores",
    description: "Los principios que guían nuestra comunidad académica y estudiantil.",
    href: "#/nosotros/valores",
    imageClass: "nos-img5",
  },
  {
    title: "Políticas",
    description: "Marco de políticas institucionales que rigen la vida académica de la facultad.",
    href: "#/nosotros/politicas",
    imageClass: "nos-img6",
  },
  {
    title: "Ejes Rectores",
    description: "Los ejes estratégicos que orientan el desarrollo y crecimiento de la FECA.",
    href: "#/nosotros/ejes-rectores",
    imageClass: "nos-img7",
  },
  {
    title: "Marco Normativo",
    description: "Reglamentos, lineamientos y normativas que regulan la institución.",
    href: "#/nosotros/marco-normativo",
    imageClass: "nos-img8",
  },
];

function NosotrosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="history"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="hero small-hero">
        <div className="hero-content">
          <div className="hero-tag">
            Facultad de Economía, Contaduría y Administración
          </div>
          <h1>Nosotros</h1>
          <p>
            Conoce nuestra historia, estructura, valores y el marco que define a la FECA.
          </p>
        </div>
      </section>

      <main className="services-page">
        <div className="section-title-block">
          <div className="section-label">La facultad</div>
          <h2 className="section-title">Quiénes somos</h2>
          <p className="section-desc">
            Todo sobre nuestra institución: historia, organización, principios y normativa.
          </p>
        </div>

        <div className="services-grid">
          {nosotrosCards.map((card) => (
            <article key={card.title} className="service-card">
              <div className={`service-image ${card.imageClass}`}></div>
              <div className="service-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noreferrer" : undefined}
                >
                  Ver más →
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default NosotrosPage;
