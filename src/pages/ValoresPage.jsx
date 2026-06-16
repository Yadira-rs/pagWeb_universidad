import Footer from "../sections/Footer";
import Header from "../sections/Header";

const valueSections = [
  {
    eyebrow: "PRINCIPIOS ESENCIALES",
    title: "Valores Fundamentales",
    body: "La base ética que orienta el comportamiento, las decisiones y las relaciones de toda nuestra comunidad universitaria.",
    items: ["Ética", "Honestidad", "Respeto a la dignidad humana"],
    image: "/imagenes/aniversario.jpeg",
    imageAlt: "Comunidad universitaria FECA",
    reverse: false,
  },
  {
    eyebrow: "IDENTIDAD Y COMPROMISO",
    title: "Valores de Pertenencia y Compromiso",
    body: "El orgullo de ser FECA se refleja en el compromiso social, la integridad académica y el liderazgo responsable de cada integrante de nuestra comunidad.",
    items: ["Responsabilidad social", "Sentido de pertenencia", "Compromiso social", "Integridad académica", "Liderazgo"],
    image: "/imagenes/feca-plaza-1.jpg",
    imageAlt: "Plaza de la Facultad FECA",
    reverse: true,
  },
  {
    eyebrow: "EXCELENCIA E INCLUSIÓN",
    title: "Valores Sociales y de Excelencia",
    body: "Impulsamos un entorno inclusivo y transformador donde la innovación, la calidad y el respeto a la diversidad son motores de crecimiento.",
    items: ["Equidad", "Igualdad", "Interculturalidad", "Cultura de la paz", "Innovación", "Calidad", "Cultura del emprendimiento"],
    image: "/imagenes/feca-entrada.jpg",
    imageAlt: "Entrada de la Facultad FECA",
    reverse: false,
  },
];

function ValoresPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="nosotros"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="legacy-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(227,19,19,0.18), rgba(12,24,64,0.88)), url('/imagenes/aniversario.jpeg')`,
        }}
      >
        <div className="legacy-hero-inner">
          <div className="legacy-kicker">Nosotros</div>
          <h1>Valores Institucionales</h1>
          <p>
            Los principios que guían la vida académica, el trabajo institucional
            y la convivencia de toda la comunidad FECA.
          </p>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container">
          <div className="mission-vision-page-inner">
            {valueSections.map((sec) => (
              <section
                key={sec.title}
                className={`mv-section${sec.reverse ? " mv-section-reverse" : ""} fade-up`}
              >
                <div className="mv-image">
                  <img src={sec.image} alt={sec.imageAlt} />
                </div>
                <div className="mv-content">
                  <span className="mv-badge">{sec.eyebrow}</span>
                  <h2 className="mv-title">{sec.title}</h2>
                  <p className="mv-body">{sec.body}</p>
                  <div className="valores-pills">
                    {sec.items.map((item) => (
                      <span key={item} className="valores-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ValoresPage;
