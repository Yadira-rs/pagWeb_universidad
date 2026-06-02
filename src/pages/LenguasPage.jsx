import { useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

function LenguasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [activeTab, setActiveTab] = useState("cursos");

  const tabs = [
    { id: "cursos", label: "Cursos" },
    { id: "costos", label: "Costos" },
    { id: "inscripcion", label: "Proceso inscripción" },
    { id: "diagnostico", label: "Examen de diagnóstico" },
    { id: "preguntas", label: "Preguntas frecuentes" },
    { id: "informacion", label: "Información general" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <main className="page-wrap">
        <section className="page-hero" style={{ "--hero-image": "url('/imagenes/lic.jpg')" }}>
          <div className="page-hero-inner">
            <div className="page-label">Ciclo A-2025 · Modalidad presencial</div>
            <h1 className="page-title">Centro de Lenguas e Internacionalización</h1>
            <p className="page-desc">
              Cursos de idiomas para adultos, niños y jóvenes en la Facultad de Economía, Contaduría y Administración.
            </p>
          </div>
        </section>

        <nav className="tabs" aria-label="Secciones del Centro de Lenguas">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "cursos" && (
          <section className="section tab-content" id="cursos">
            <div className="section-label">Oferta</div>
            <h2 className="section-title">Cursos</h2>
            <div className="grid">
              <article className="card">
                <h3>Inglés para adultos</h3>
                <p>Mayores de 15 años.</p>
                <ul className="horario">
                  <li>Lunes a viernes - 1 hr. diaria</li>
                  <li>Sabatinos - 9:00 a.m. a 2:00 p.m.</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_ingles_adultos.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>

              <article className="card">
                <h3>Inglés para niños</h3>
                <p>Edad: 8 a 11 años. En febrero-junio solamente hay inscripciones de reingreso.</p>
                <ul className="horario">
                  <li>Sabatinos - 9:00 a.m. a 2:00 p.m.</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_ingles_ninos.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>

              <article className="card">
                <h3>Inglés para jóvenes</h3>
                <p>Edad: 12 a 15 años.</p>
                <ul className="horario">
                  <li>Sabatinos - 9:00 a.m. a 2:00 p.m.</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_ingles_jovenes.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>

              <article className="card">
                <h3>Francés</h3>
                <p>15 años en adelante.</p>
                <ul className="horario">
                  <li>Lunes a viernes - 1 hr. diaria</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_frances.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>

              <article className="card">
                <h3>Italiano</h3>
                <p>15 años en adelante.</p>
                <ul className="horario">
                  <li>Lunes a viernes - 1 hr. diaria</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_italiano.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>

              <article className="card">
                <h3>Japonés</h3>
                <p>15 años en adelante.</p>
                <ul className="horario">
                  <li>Lunes a viernes - 1 hr. diaria</li>
                </ul>
                <div className="download-row">
                  <a className="btn-primary" href="/docs/horarios_japones.pdf" target="_blank" rel="noreferrer">
                    Ver horarios
                  </a>
                </div>
              </article>
            </div>
          </section>
        )}

        {activeTab === "costos" && (
          <section className="section tab-content" id="costos">
            <div className="section-label">Ciclo A-2025</div>
            <h2 className="section-title">Costos</h2>
            <div className="grid">
              <article className="card">
                <h3>Inglés</h3>
                <div className="price">$1,100</div>
                <p>Estudiantes UJED: 10% de descuento.</p>
                <p>Estudiantes FECA: 25% de descuento.</p>
              </article>
              <article className="card">
                <h3>Francés, italiano y japonés</h3>
                <div className="price">$700</div>
                <p>Precio único. No hay descuentos.</p>
              </article>
            </div>
          </section>
        )}

        {activeTab === "inscripcion" && (
          <section className="section tab-content" id="inscripcion">
            <div className="section-label">Trámite</div>
            <h2 className="section-title">Proceso inscripción</h2>
            <article className="wide-card">
              <p>
                Para realizar tu inscripción, comunícate al Centro de Lenguas e Internacionalización o acude a las
                instalaciones de la Facultad. Ahí podrán orientarte sobre horarios disponibles, costos, requisitos y
                grupos abiertos.
              </p>
              <div className="info-grid">
                <div>
                  <strong>Modalidad</strong>
                  Presencial
                </div>
                <div>
                  <strong>Ciclo</strong>
                  A-2025
                </div>
                <div>
                  <strong>Atención</strong>
                  En oficinas del Centro de Lenguas
                </div>
              </div>
            </article>
          </section>
        )}

        {activeTab === "diagnostico" && (
          <section className="section tab-content" id="diagnostico">
            <div className="section-label">Ubicación de nivel</div>
            <h2 className="section-title">Examen de diagnóstico</h2>
            <article className="wide-card">
              <p>
                El examen de diagnóstico para ubicarte en el nivel correcto, si tienes conocimientos del idioma, está
                disponible en el módulo de inscripciones del SUMA.
              </p>
            </article>
          </section>
        )}

        {activeTab === "preguntas" && (
          <section className="section tab-content" id="preguntas">
            <div className="section-label">Ayuda</div>
            <h2 className="section-title">Preguntas frecuentes</h2>
            <div className="faq">
              <article className="faq-item">
                <h3>1. Soy alumno de reingreso y no sé cuál es mi matrícula. ¿Cómo puedo conseguirla?</h3>
                <p>
                  Puedes solicitarla enviando tu nombre completo a{" "}
                  <a href="mailto:cli.feca@ujed.mx">cli.feca@ujed.mx</a>, por Facebook (facebook/CLI.FECA.UJED) o por
                  teléfono al 827-13-65 ext. 5725, lunes, miércoles y viernes de 10:00 a.m. a 2:00 p.m.
                </p>
              </article>
              <article className="faq-item">
                <h3>2. Ya tengo mi matrícula pero no sé mi contraseña. ¿Cómo puedo conseguirla?</h3>
                <p>
                  La primera vez que entres al SUMA+ usa tu matrícula como contraseña. Al entrar, el sistema te pedirá
                  que la cambies por una nueva.
                </p>
              </article>
              <article className="faq-item">
                <h3>3. ¿Cuál es el número de cuenta al que debo hacer mi pago?</h3>
                <p>
                  Una vez que selecciones tu clase, el sistema te dará datos de cuenta, monto y referencia. Incluye la
                  referencia correcta para identificar tu pago automáticamente.
                </p>
              </article>
              <article className="faq-item">
                <h3>4. Soy trabajador de la UJED. ¿Cómo tramito mi exención de pago?</h3>
                <p>
                  El trámite se hace con la Coordinación de Finanzas y Planeación y no sustituye la inscripción del CLI.
                  Llena el formulario:{" "}
                  <a href="https://forms.gle/cQmnVdiDu1ujkQKq6" target="_blank" rel="noreferrer">
                    https://forms.gle/cQmnVdiDu1ujkQKq6
                  </a>
                  . Después de enviarlo, recibirás tu folio entre 24 y 48 hrs.; la validación puede demorar hasta 72 hrs.
                  adicionales.
                </p>
              </article>
            </div>
          </section>
        )}

        {activeTab === "informacion" && (
          <section className="section tab-content" id="informacion">
            <div className="section-label">Identidad</div>
            <h2 className="section-title">Información general</h2>
            <article className="wide-card">
              <h3>Historia</h3>
              <p>
                El Centro de Idiomas de la FECA de la UJED fue fundado formalmente en 1975 bajo la dirección del C.P.
                Mtro. Rubén Vargas Quiñones. Desde sus inicios ha desempeñado un papel fundamental en la enseñanza de
                lenguas extranjeras.
              </p>
              <p>
                Actualmente atiende a más de mil alumnos, ofreciendo formación de calidad en inglés, italiano, francés y
                japonés para estudiantes universitarios y público en general.
              </p>
            </article>
            <div className="grid" style={{ marginTop: "22px" }}>
              <article className="card">
                <h3>Misión</h3>
                <p>
                  Ofrecer programas educativos en lengua extranjera y servicios especializados de alta calidad que sumen
                  ventajas competitivas en un entorno global.
                </p>
              </article>
              <article className="card">
                <h3>Visión</h3>
                <p>
                  Ser un centro reconocido por la excelencia en la enseñanza de lenguas extranjeras y por contribuir al
                  desarrollo integral e intercultural.
                </p>
              </article>
              <article className="card">
                <h3>Normativa</h3>
                <ul className="pill-list">
                  <li>Reglamento de niños</li>
                  <li>Reglamento de jóvenes</li>
                </ul>
              </article>
            </div>
          </section>
        )}

        {activeTab === "contacto" && (
          <section className="section tab-content" id="contacto">
            <div className="section-label">Informes</div>
            <h2 className="section-title">Ubicación y contacto</h2>
            <article className="wide-card">
              <div className="contacto">
                <div>
                  <strong>Dirección</strong>
                  Fanny Anitua y Privada de Loza s/n
                  <br />
                  C.P. 34000 Durango, Dgo., México
                </div>
                <div>
                  <strong>Teléfono</strong>
                  827-13-65 ext. 5725
                </div>
                <div>
                  <strong>Correo</strong>
                  <a href="mailto:cli.feca@ujed.mx">cli.feca@ujed.mx</a>
                </div>
              </div>
            </article>
          </section>
        )}
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LenguasPage;
