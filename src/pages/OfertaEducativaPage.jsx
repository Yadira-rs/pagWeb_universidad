import Footer from "../sections/Footer";
import Header from "../sections/Header";

const ofertaCards = [
  {
    title: "Licenciaturas",
    description: "Programas presenciales de Contaduría, Administración y Economía.",
    href: "#/licenciaturas",
    imageClass: "oe-img1",
  },
  {
    title: "Licenciaturas a distancia",
    description: "Estudia en modalidad en línea con la misma calidad académica.",
    href: "#/licenciaturas-distancia",
    imageClass: "oe-img2",
  },
  {
    title: "Posgrado",
    description: "Maestrías y especializaciones para potenciar tu desarrollo profesional.",
    href: "https://posgradofeca.ujed.mx/",
    imageClass: "oe-img3",
    external: true,
  },
  {
    title: "Curso Propedéutico",
    description: "Prepárate para el ingreso a la facultad con nuestro curso introductorio.",
    href: "#/curso-propedeutico",
    imageClass: "oe-img4",
  },
  {
    title: "Cursos Intersemestrales",
    description: "Avanza en tu carrera durante los periodos entre semestres.",
    href: "#/cursos-intersemestrales",
    imageClass: "oe-img5",
  },
  {
    title: "CELCI",
    description: "Centro de Lenguas e Internacionalización: inglés, francés, italiano y japonés.",
    href: "#/celci",
    imageClass: "oe-img6",
  },
  {
    title: "CIIEDO",
    description: "Centro de innovación, emprendimiento y desarrollo organizacional.",
    href: "#/ciiedo",
    imageClass: "oe-img7",
  },
];

function OfertaEducativaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="hero small-hero">
        <div className="hero-content">
          <div className="hero-tag">
            Facultad de Economía, Contaduría y Administración
          </div>
          <h1>Oferta Educativa</h1>
          <p>
            Explora todos nuestros programas académicos, cursos y centros de formación.
          </p>
        </div>
      </section>

      <main id="oferta-educativa" className="services-page">
        <div className="section-title-block">
          <div className="section-label">Programas y centros</div>
          <h2 className="section-title">Todo lo que tenemos para ti</h2>
          <p className="section-desc">
            Desde licenciaturas hasta idiomas y cursos de innovación, encuentra el programa que impulse tu futuro.
          </p>
        </div>

        <div className="services-grid">
          {ofertaCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              className="service-card"
            >
              <div className={`service-image ${card.imageClass}`}></div>
              <div className="service-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default OfertaEducativaPage;
