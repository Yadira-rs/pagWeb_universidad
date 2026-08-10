import { useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { crearSolicitud } from "../lib/admisionesApiClient";

function LegacyAdmissionPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState("");

  if (!content) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    const data = new FormData(e.target);

    try {
      await crearSolicitud({
        nombre: data.get("nombre")?.toString().trim() || "",
        telefono: data.get("telefono")?.toString().trim() || null,
        correo: data.get("correo")?.toString().trim() || null,
        programa: data.get("programa")?.toString() || null,
        mensaje: data.get("mensaje")?.toString().trim() || null,
      });
    } catch {
      setStatus("error");
      setErrorMsg("No se pudo enviar tu solicitud. Intenta de nuevo o llama al (618) 827-13-65.");
      return;
    }

    setStatus("done");
    e.target.reset();
  };

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

            {status === "done" ? (
              <div className="legacy-form-success">
                <p>
                  <strong>¡Listo, recibimos tu solicitud!</strong> Un asesor de
                  admisiones se pondrá en contacto contigo pronto.
                </p>
                <button
                  type="button"
                  className="legacy-btn"
                  onClick={() => setStatus("idle")}
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <p>
                  Completa tus datos y un asesor de admisiones te contactará
                  para continuar tu proceso.
                </p>

                <form className="legacy-form" onSubmit={handleSubmit}>
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
                            required={field.name === "nombre"}
                            placeholder={field.placeholder}
                          />
                        )}
                      </label>
                    ))}
                  </div>

                  {status === "error" && (
                    <p className="legacy-note legacy-note-error">{errorMsg}</p>
                  )}

                  <button
                    className="legacy-btn"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Enviando…" : "Enviar solicitud"}
                  </button>
                  <p className="legacy-note">
                    También puedes solicitar informes al (618) 827-13-65.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LegacyAdmissionPage;
