import Footer from "../sections/Footer";
import Header from "../sections/Header";

export default function Biblioteca({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="hero small-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.35)), url('/imagenes/imagen.jpeg')",
        }}
      >
        <div className="hero-content">
          <div className="hero-tag">Biblioteca</div>
          <h1>Biblioteca FECA</h1>
          <p>
            Un espacio dedicado al conocimiento, la investigación y el acceso libre
            a la información para estudiantes y académicos.
          </p>
        </div>
      </section>

      <main className="services-page">
        <div className="section-title-block">
          <div className="section-label">Biblioteca FECA</div>
          <h2 className="section-title">Servicios, colecciones y recursos digitales</h2>
          <p className="section-desc">
            Conoce la historia, misión, visión y los servicios que hacen de esta
            biblioteca un apoyo fundamental para la comunidad universitaria.
          </p>
        </div>

        <div className="container">
          <div className="info-box">
            <h2>Historia</h2>
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

          <div className="info-box">
            <h2>Misión</h2>
            <p>
              La misión del sistema bibliotecario de la universidad es apoyar a la
              docencia, la investigación y la difusión de la cultura, administrando
              los recursos informativos y brindando servicios bibliotecarios de
              excelencia.
            </p>
          </div>

          <div className="info-box">
            <h2>Visión</h2>
            <p>
              El sistema bibliotecario será una organización líder capaz de atender
              todas las demandas de información de sus usuarios, ofreciendo
              asesorías permanentes para transformar la información en conocimiento.
            </p>
          </div>

          <div className="info-box">
            <h2>Política de calidad</h2>
            <p>
              La Universidad Juárez del Estado de Durango está comprometida en
              ofrecer servicios académicos, de investigación, administrativos y
              culturales de calidad, eficientes y transparentes, con un proceso de
              mejora continua basado en ISO 9001:2015.
            </p>
          </div>

          <div className="info-box">
            <h2>Colecciones</h2>
            <ul>
              <li>Colección de consulta.</li>
              <li>Colección de consulta general.</li>
              <li>Colección UJED.</li>
              <li>Colección Durango.</li>
              <li>Colección Antigua.</li>
            </ul>
          </div>

          <div className="info-box">
            <h2>Servicios disponibles</h2>
            <ul>
              <li>Préstamo interno.</li>
              <li>Préstamo externo.</li>
              <li>Préstamo inter bibliotecario.</li>
              <li>Área de cómputo.</li>
              <li>Préstamo de cubículos.</li>
              <li>Recursos digitales y libros electrónicos.</li>
            </ul>
            <p>
              Aunque es una biblioteca compacta, cuenta con todos los recursos
              necesarios para apoyar el aprendizaje, la investigación y el trabajo
              académico de nuestros estudiantes.
            </p>
          </div>

          <div className="info-box">
            <h2>Biblioteca digital</h2>
            <p>
              La Biblioteca FECA ofrece recursos digitales accesibles mediante códigos
              QR para descargar libros completos y material académico desde cualquier
              dispositivo.
            </p>
            <div className="qr-grid">
              <div className="qr-card">
                <h3>Investigación Económico Administrativa Aplicada</h3>
                <img src="/imagenes/qr1.png" alt="Código QR 1 Biblioteca FECA" />
              </div>
              <div className="qr-card">
                <h3>Gestión Financiera y Desarrollo Económico</h3>
                <img src="/imagenes/qr2.png" alt="Código QR 2 Biblioteca FECA" />
              </div>
              <div className="qr-card">
                <h3>este fallaaaaaa</h3>
                <img src="/imagenes/qr3.png" alt="Código QR 3 Biblioteca FECA" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}
