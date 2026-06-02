import Footer from "../sections/Footer";
import Header from "../sections/Header";

function LegacyAdmissionPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  if (!content) return null;

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute={content.routeGroup}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="legacy-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(123,18,24,0.18), rgba(123,18,24,0.94)), url('${content.heroImage}')`,
        }}
      >
        <div className="legacy-hero-inner">
          <div className="legacy-kicker">{content.kicker}</div>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </section>

      <section className="legacy-section">
        <div className="container legacy-admission-grid">
          <aside className="legacy-panel">
            <h2>Proceso</h2>
            <div className="legacy-steps">
              {content.steps.map((step) => (
                <div key={step.title} className="legacy-step">
                  <strong>{step.title}</strong>
                  <span>{step.body}</span>
                </div>
              ))}
            </div>

            <h3 className="legacy-subheading">Requisitos sugeridos</h3>
            <ul className="legacy-list">
              {content.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <section className="legacy-panel">
            <h2>Datos de solicitud</h2>
            <p>
              Este formulario es una maqueta visual por ahora; después puede
              conectarse a correo, base de datos o sistema de admisiones.
            </p>

            <form className="legacy-form">
              <div className="legacy-form-grid">
                {content.formFields.map((field) => (
                  <label key={field.name} className="legacy-field">
                    {field.label}
                    {field.type === "select" ? (
                      <select name={field.name} defaultValue={field.options[0]}>
                        {field.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                      />
                    )}
                  </label>
                ))}
              </div>

              <button className="legacy-btn" type="button">
                Enviar solicitud
              </button>
              <p className="legacy-note">
                También puedes solicitar informes al (618) 827-13-65.
              </p>
            </form>
          </section>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyAdmissionPage;
