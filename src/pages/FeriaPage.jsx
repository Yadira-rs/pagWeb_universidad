import Footer from "../sections/Footer";
import Header from "../sections/Header";

const servicioSocialPartners = [
  { name: "CEDDU", image: "/imagenes/CEDDU.jpeg" },
  { name: "CIIEDO", image: "/imagenes/CIIEDO.jpg" },
  { name: "Coordinación de Investigación", image: "/imagenes/inicio.png" },
  { name: "DIF Municipal", image: "/imagenes/aniversario.jpeg" },
  { name: "Instituto Estatal de las Mujeres", image: "/imagenes/logo.png" },
  { name: "Instituto Municipal de la Mujer", image: "/imagenes/imagen.jpeg" },
];

const practicasProfesionales = [
  { name: "ARAUCO", image: "/imagenes/ARAUCO.jpg" },
  { name: "CEDDU", image: "/imagenes/CEDDU.jpeg" },
  { name: "CIIEDO", image: "/imagenes/CIIEDO.jpg" },
  { name: "Despacho Contable", image: "/imagenes/inicio.png" },
  { name: "NEUMATICS Tool", image: "/imagenes/aniversario.jpeg" },
  { name: "Jefatura de las Carreras", image: "/imagenes/logo.png" },
];

function FeriaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell feria-page">
      <Header
        logoImage={logoImage}
        currentRoute="feria"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="feria-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('/imagenes/aniversario.jpeg')",
        }}
      >
        <div className="feria-hero-copy">
          <span className="feria-badge">Micrositio 2025</span>
          <h1>Feria del Servicio Social y Experiencia Recepcional</h1>
          <p>Programa 2025 para Servicio Social y Prácticas Profesionales.</p>
        </div>

        <nav className="feria-anchor-nav">
          <a href="#dinamica">Dinámica</a>
          <a href="#servicio-social">Servicio social</a>
          <a href="#practicas-profesionales">Experiencia Recepcional</a>
        </nav>
      </section>

      <main className="feria-content">
        <section id="dinamica" className="feria-section">
          <div className="section-heading">
            <span>Programa de la Feria</span>
            <h2>Programa de la Feria del Servicio Social y Experiencia Recepcional (Prácticas Profesionales) 2025</h2>
          </div>

          <ol className="feria-list">
            <li>
              <h3>Inauguración y oferta de vacantes</h3>
              <p>
                Fecha: 26 de agosto 2025<br />
                Inauguración: 9:30 a.m.<br />
                Horario de la oferta de vacantes: 10:00 a.m. a 12:00 p.m.<br />
                Lugar: Patio cívico de la FECA.
              </p>
              <p className="feria-note">
                * Evento obligatorio para alumnos de 7mo, 8vo y 9no semestre, requisito para iniciar los trámites del Servicio Social de Pasante o de las Prácticas Profesionales.
              </p>
            </li>
            <li>
              <h3>Foro informativo</h3>
              <p>
                Foro “Los Servicios Sociales y la Experiencia Recepcional, requisitos, pasos a seguir y toda la información al respecto”.<br />
                Fecha: 26 de agosto 2025<br />
                Horario: 12:00 hrs.<br />
                Lugar: Auditorio de la FECA “C.P. José Félix Rodríguez Frías”.
              </p>
              <p className="feria-note">
                * Foro obligatorio para alumnos de 1er semestre, requisito para iniciar el Servicio Social de Pasante.
              </p>
            </li>
            <li>
              <h3>Explora el micrositio</h3>
              <p>
                Te invitamos a explorar este micrositio donde podrás consultar durante todo el ciclo escolar las diversas vacantes ofertadas por entidades y empresas para realizar el Servicio Social y la Experiencia Recepcional.
              </p>
            </li>
          </ol>
        </section>

        <section id="servicio-social" className="feria-section feria-light">
          <div className="section-heading">
            <span>Área de Servicio Social</span>
            <h2>Entidades participantes</h2>
          </div>

          <div className="feria-cards">
            {servicioSocialPartners.map((item) => (
              <article key={item.name} className="feria-card">
                <img src={item.image} alt={item.name} />
                <div className="feria-card-body">
                  <h3>{item.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="practicas-profesionales" className="feria-section">
          <div className="section-heading">
            <span>Experiencia Recepcional</span>
            <h2>Prácticas Profesionales</h2>
          </div>

          <p className="feria-text">
            Consulta las empresas participantes y los proyectos disponibles para realizar tu experiencia recepcional.
          </p>

          <div className="feria-cards">
            {practicasProfesionales.map((item) => (
              <article key={item.name} className="feria-card">
                <img src={item.image} alt={item.name} />
                <div className="feria-card-body">
                  <h3>{item.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default FeriaPage;
