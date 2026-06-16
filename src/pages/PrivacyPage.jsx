import Header from "../sections/Header";
import Footer from "../sections/Footer";

function PrivacyPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      <section
        className="hero small-hero"
        style={{ background: "linear-gradient(135deg, #e31313 0%, #951823 100%)" }}
      >
        <div className="hero-content">
          <div className="hero-tag">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1>Aviso de privacidad</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fade-up">
            <div className="legal-section">
              <h2>Responsable del tratamiento de datos</h2>
              <p>
                La Facultad de Economía, Contaduría y Administración (FECA) de la Universidad Juárez del Estado de Durango (UJED), con domicilio en Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo., México, es responsable del uso y protección de sus datos personales.
              </p>
            </div>

            <div className="legal-section">
              <h2>Datos personales que recabamos</h2>
              <p>Para las finalidades señaladas en este aviso, podemos recabar los siguientes datos personales:</p>
              <ul>
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número telefónico</li>
                <li>Matrícula o número de expediente</li>
                <li>Información académica y laboral</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Finalidades del tratamiento</h2>
              <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
              <ul>
                <li>Gestión de trámites escolares y académicos</li>
                <li>Envío de información sobre programas, eventos y convocatorias</li>
                <li>Atención de solicitudes y dudas</li>
                <li>Cumplimiento de obligaciones legales y reglamentarias</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Transferencia de datos</h2>
              <p>
                Sus datos no serán transferidos a terceros sin su consentimiento, salvo en los casos previstos por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás normativa aplicable.
              </p>
            </div>

            <div className="legal-section">
              <h2>Derechos ARCO</h2>
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercerlos, puede comunicarse a:
              </p>
              <ul>
                <li>Correo: <a href="mailto:informes@feca.ujed.mx">informes@feca.ujed.mx</a></li>
                <li>Teléfono: (618) 827-13-65</li>
                <li>Domicilio: Fanny Anitúa y Priv. Loza s/n, Durango, Dgo.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Cambios al aviso de privacidad</h2>
              <p>
                Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente aviso en cualquier momento. Los cambios serán publicados en este sitio web.
              </p>
            </div>

            <p className="legal-date">Última actualización: junio 2026</p>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PrivacyPage;
