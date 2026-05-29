import Footer from "../sections/Footer";
import Header from "../sections/Header";

function BolsaTrabajoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="bolsa-trabajo"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="hero small-hero">
        <div className="hero-content">
          <div className="hero-tag">FECA · Bolsa de Trabajo</div>
          <h1>Bolsa de Trabajo</h1>
          <p>Oportunidades laborales para egresados y estudiantes FECA.</p>
        </div>
      </section>

      <main className="details-page">
        <div className="info-box">
          <h2>Empresas</h2>
          <p>
            Si su empresa tiene disponible alguna vacante para nuestros
            egresados, puede compartirla con nosotros.
          </p>
          <p>
            Favor de enviar sus vacantes con la información completa, como los
            requerimientos del perfil a cubrir por los candidatos y cualquier
            otro dato relevante, al correo electrónico <b>bolsafeca@ujed.mx</b>
            , con el asunto: Vacante para bolsa de trabajo FECA. Nosotros nos
            encargaremos de vincular dicha información con nuestros egresados
            inscritos en la bolsa de trabajo.
          </p>
        </div>

        <div className="info-box">
          <h2>Egresados o alumnos que estén por egresar</h2>
          <p>
            Para registrarse en la bolsa de trabajo, es importante enviar su
            currículum vitae en formato PDF y, además, llenar y enviar el
            formato de inscripción al correo electrónico{" "}
            <b>bolsafeca@ujed.mx</b>.
          </p>
          <p>
            <b>FORMATO INSCRIPCIÓN BOLSA DE TRABAJO FECA UJED</b>
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSecG1sqmCO5Mykq1BwI1qOwCDvjibppRI7WccfrczOGt78NdA/viewform"
            target="_blank"
            rel="noreferrer"
            className="pdf-btn"
          >
            Ir al formulario →
          </a>
        </div>

        <div className="info-box">
          <h2>Facebook</h2>
          <p>
            Para conocer las vacantes vigentes de la bolsa de trabajo visita:
          </p>
          <p>
            <b>FECAUJEDMX</b>
          </p>
          <a
            href="https://www.facebook.com/FECAUJEDMX"
            target="_blank"
            rel="noreferrer"
            className="pdf-btn"
          >
            Ir a Facebook →
          </a>
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default BolsaTrabajoPage;
