import Footer from "../sections/Footer";
import Header from "../sections/Header";

const serviceCards = [
  {
    title: "Servicios Escolares",
    description: "Consulta mapas curriculares y planes académicos.",
    href: "#/servicios/servicios-escolares",
    imageClass: "img1",
  },
  {
    title: "Servicio Social",
    description: "Información, reglamentos y formatos necesarios.",
    href: "#/servicios/servicio-social",
    imageClass: "img2",
  },
  {
    title: "Prácticas Profesionales",
    description: "Consulta información sobre experiencia recepcional.",
    href: "#/servicios/practicas-profesionales",
    imageClass: "img3",
  },
  {
    title: "Contraloría Interna FECA",
    description: "Espacio de transparencia, auditoría y atención de quejas y sugerencias.",
    href: "#/servicios/contraloria-interna",
    imageClass: "img_contraloria",
  },
  {
    title: "Coordinación de Planeación y Evaluación Institucional",
    shortTitle: "CPEI",
    description: "Planeación estratégica, evaluación y seguimiento del desarrollo institucional.",
    href: "#/servicios/cpei",
    imageClass: "img_cpei",
  },
  {
    title: "Biblioteca",
    description: "Accede a los servicios y recursos disponibles en la Biblioteca.",
    href: "#/biblioteca",
    imageClass: "img6",
  },
];

function ServicesPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="hero small-hero">
        <div className="hero-content">
          <div className="hero-tag">
            Facultad de Economía, Contaduría y Administración
          </div>
          <h1>Servicios</h1>
          <p>
            Explora información académica, profesional y estudiantil en una
            plataforma moderna y organizada.
          </p>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Servicios</div>
            <h2 className="section-title">Todo lo que necesitas en un solo lugar</h2>
            <p className="section-desc">
              Consulta información estudiantil, formatos y procesos importantes.
            </p>
          </div>

          <div className="services-grid fade-up">
            {serviceCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                className="service-card"
              >
                <div className={`service-image ${card.imageClass}`}></div>
                <div className="service-content">
                  <h3>{card.shortTitle ?? card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServicesPage;
