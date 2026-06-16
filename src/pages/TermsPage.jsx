import Header from "../sections/Header";
import Footer from "../sections/Footer";

function TermsPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      <section
        className="hero small-hero"
        style={{ background: "linear-gradient(135deg, #e31313 0%, #951823 100%)" }}
      >
        <div className="hero-content">
          <div className="hero-tag">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1>Términos de uso</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fade-up">
            <div className="legal-section">
              <h2>Aceptación de los términos</h2>
              <p>
                Al acceder y utilizar el sitio web de la Facultad de Economía, Contaduría y Administración (FECA) de la UJED, usted acepta quedar obligado por los presentes términos y condiciones de uso.
              </p>
            </div>

            <div className="legal-section">
              <h2>Uso del sitio</h2>
              <p>Este sitio web es de uso exclusivamente informativo. Usted se compromete a:</p>
              <ul>
                <li>Utilizar el sitio únicamente con fines lícitos</li>
                <li>No reproducir, distribuir ni modificar el contenido sin autorización expresa</li>
                <li>No realizar acciones que puedan dañar, deshabilitar o sobrecargar el sitio</li>
                <li>No intentar acceder a áreas restringidas sin autorización</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Propiedad intelectual</h2>
              <p>
                Todo el contenido publicado en este sitio — incluyendo textos, imágenes, logotipos y diseño — es propiedad de la FECA-UJED o de sus respectivos titulares, y está protegido por las leyes de propiedad intelectual vigentes en México.
              </p>
            </div>

            <div className="legal-section">
              <h2>Exactitud de la información</h2>
              <p>
                La FECA-UJED procura que la información publicada sea precisa y actualizada, pero no garantiza la exactitud, integridad ni vigencia de todos los contenidos. Le recomendamos verificar información importante directamente con las oficinas de la facultad.
              </p>
            </div>

            <div className="legal-section">
              <h2>Enlaces a terceros</h2>
              <p>
                Este sitio puede contener enlaces a sitios web de terceros. La FECA-UJED no se hace responsable del contenido, políticas de privacidad ni prácticas de dichos sitios externos.
              </p>
            </div>

            <div className="legal-section">
              <h2>Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios implica la aceptación de los nuevos términos.
              </p>
            </div>

            <div className="legal-section">
              <h2>Contacto</h2>
              <p>Para cualquier duda relacionada con estos términos, puede contactarnos en:</p>
              <ul>
                <li>Correo: <a href="mailto:informes@feca.ujed.mx">informes@feca.ujed.mx</a></li>
                <li>Teléfono: (618) 827-13-65</li>
              </ul>
            </div>

            <p className="legal-date">Última actualización: junio 2026</p>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default TermsPage;
