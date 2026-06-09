import Footer from "../sections/Footer";
import Header from "../sections/Header";

const identityCards = [
  {
    title: "Misión",
    text:
      "La misión del sistema bibliotecario de la universidad es apoyar a la docencia, la investigación y la difusión de la cultura, administrando los recursos informativos y brindando servicios bibliotecarios de excelencia.",
  },
  {
    title: "Visión",
    text:
      "El sistema bibliotecario será una organización líder capaz de atender todas las demandas de información de sus usuarios, ofreciendo asesorías permanentes para transformar la información en conocimiento.",
  },
  {
    title: "Política de calidad",
    text:
      "La Universidad Juárez del Estado de Durango está comprometida en ofrecer servicios académicos, de investigación, administrativos y culturales de calidad, eficientes y transparentes, con un proceso de mejora continua basado en ISO 9001:2015.",
  },
];

const collections = [
  "Colección de consulta",
  "Colección de consulta general",
  "Colección UJED",
  "Colección Durango",
  "Colección Antigua",
];

const services = [
  "Préstamo interno",
  "Préstamo externo",
  "Préstamo interbibliotecario",
  "Área de cómputo",
  "Préstamo de cubículos",
  "Recursos digitales y libros electrónicos",
];

const digitalResources = [
  {
    title: "Investigación Económico Administrativa Aplicada",
    image: "/imagenes/qr1.png",
    alt: "Código QR 1 Biblioteca",
  },
  {
    title: "Gestión Financiera y Desarrollo Económico",
    image: "/imagenes/qr2.png",
    alt: "Código QR 2 Biblioteca",
  },
  {
    title: "Recursos digitales Biblioteca",
    image: "/imagenes/qr3.png",
    alt: "Código QR 3 Biblioteca",
  },
];

export default function Biblioteca({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="hero small-hero biblioteca-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.38)), url('/imagenes/imagen.jpeg')",
        }}
      >
        <div className="hero-content">
          <div className="hero-tag">Biblioteca</div>
          <h1>Biblioteca</h1>
          <p>
            Un espacio dedicado al conocimiento, la investigación y el acceso libre
            a la información para estudiantes y académicos.
          </p>
        </div>
      </section>

      <main className="services-page biblioteca-page">
        <div className="section-title-block">
          <div className="section-label">Biblioteca</div>
          <h2 className="section-title">Servicios, colecciones y recursos digitales</h2>
          <p className="section-desc">
            Conoce la historia, misión, visión y los servicios que hacen de esta
            biblioteca un apoyo fundamental para la comunidad universitaria.
          </p>
        </div>

        <div className="biblioteca-layout">
          <section className="section biblioteca-section">
            <article className="wide-card biblioteca-history">
              <div>
                <div className="section-label">Origen</div>
                <h3>Historia</h3>
              </div>
              <div>
                <p>
                  En el año de 1972, el Sr. C.P. Guillermo Garza Calderón entrega la
                  dirección de la Escuela al Sr. C.P. Rubén Vargas Quiñones. Así se
                  llegó a un acto de gran importancia: la inauguración del nuevo
                  edificio de la Escuela el 12 de junio de 1973.
                </p>
                <p>
                  El programa inició con una emotiva despedida del antiguo edificio
                  de la Escuela, ubicado en el caserón de la Universidad Juárez del
                  Estado de Durango, después de la última clase impartida por el
                  C.P. José Félix Rodríguez.
                </p>
                <p>
                  Posteriormente, el nuevo edificio se inauguró a cargo del
                  Gobernador del Estado, Ing. Alejandro Páez Urquidi, con la presencia
                  del Lic. Ángel Rodríguez Solórzano, el Rector Carlos Galindo, y el
                  Director Rubén Vargas Quiñones.
                </p>
              </div>
            </article>
          </section>

          <section className="section biblioteca-section">
            <div className="grid">
              {identityCards.map((card) => (
                <article className="card biblioteca-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section biblioteca-section">
            <div className="biblioteca-two-column">
              <article className="card biblioteca-card">
                <div className="section-label">Acervo</div>
                <h3>Colecciones</h3>
                <ul className="pill-list biblioteca-list">
                  {collections.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card biblioteca-card">
                <div className="section-label">Atención</div>
                <h3>Servicios disponibles</h3>
                <ul className="pill-list biblioteca-list">
                  {services.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Aunque es una biblioteca compacta, cuenta con los recursos
                  necesarios para apoyar el aprendizaje, la investigación y el trabajo
                  académico de nuestros estudiantes.
                </p>
              </article>
            </div>
          </section>

          <section className="section biblioteca-section">
            <div className="section-label">Recursos</div>
            <h2 className="section-title">Biblioteca digital</h2>
            <p className="section-desc">
              La Biblioteca ofrece recursos digitales accesibles mediante códigos
              QR para descargar libros completos y material académico desde cualquier
              dispositivo.
            </p>
            <div className="qr-grid">
              {digitalResources.map((resource) => (
                <article className="qr-card" key={resource.title}>
                  <h3>{resource.title}</h3>
                  <img src={resource.image} alt={resource.alt} />
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}
