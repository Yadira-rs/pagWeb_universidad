import Header from "../sections/Header";
import Footer from "../sections/Footer";

function BolsaTrabajoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      <div className="legal-hero">
        <div className="container">
          <h1 className="legal-title">Bolsa de trabajo</h1>
          <p className="legal-subtitle">Conectamos el talento FECA con las mejores oportunidades laborales</p>
        </div>
      </div>

      <main className="legal-body container">
        <section className="legal-section">
          <h2>¿Qué es la Bolsa de Trabajo FECA?</h2>
          <p>
            La Bolsa de Trabajo de la Facultad de Economía, Contaduría y Administración es un servicio gratuito que conecta a estudiantes y egresados con empresas e instituciones que buscan talento profesional en las áreas de economía, contaduría y administración.
          </p>
        </section>

        <section className="legal-section">
          <h2>Para estudiantes y egresados</h2>
          <p>Si buscas empleo o prácticas profesionales, puedes:</p>
          <ul>
            <li>Registrar tu currículum en nuestra base de datos</li>
            <li>Consultar las vacantes disponibles</li>
            <li>Recibir orientación para entrevistas y desarrollo profesional</li>
            <li>Asistir a ferias de empleo organizadas por la facultad</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Para empresas</h2>
          <p>Si tu empresa busca talento, ofrecemos:</p>
          <ul>
            <li>Publicación gratuita de vacantes</li>
            <li>Acceso a egresados con perfil en economía, finanzas, contabilidad y administración</li>
            <li>Participación en ferias de empleo presenciales</li>
            <li>Vinculación con programas de prácticas profesionales</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Contacto</h2>
          <p>Para registrar tu currículum o publicar una vacante, comunícate con nosotros:</p>
          <ul>
            <li>Teléfono: (618) 827-13-65</li>
            <li>Correo: <a href="mailto:informes@feca.ujed.mx">informes@feca.ujed.mx</a></li>
            <li>Dirección: Fanny Anitúa y Priv. Loza s/n, Durango, Dgo.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>También visita</h2>
          <p>
            Puedes registrarte como egresado en{" "}
            <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
              SUMA+ FECA
            </a>{" "}
            para acceder a más oportunidades de vinculación laboral.
          </p>
        </section>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default BolsaTrabajoPage;
