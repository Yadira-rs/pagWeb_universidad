import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const objetivos = [
  "Calidad Educativa: Maximizar el aprovechamiento escolar y el desarrollo de competencias de los alumnos.",
  "Retención: Disminuir los índices de deserción, rezago y reprobación escolar mediante el seguimiento personalizado y oportuno.",
  "Eficiencia Terminal Exitosa: Asegurar que los estudiantes concluyan sus estudios profesionales en tiempo y forma.",
];

const accionesTutor = [
  "Académicas: Identifica riesgos académicos, promociona hábitos de estudio efectivos, canaliza de manera oportuna a las áreas de apoyo y facilita tu integración al entorno de la facultad.",
  "Administrativas: Orienta en trámites escolares y procesos institucionales dentro de la FECA y la Administración Central de la UJED.",
  "Personales: Espacio de escucha y canalización al área de psicopedagogía en caso de enfrentar problemas emocionales, sociales o familiares que impacten negativamente en tu vida universitaria, cuidando en todo momento la confidencialidad.",
];

const compromisos = [
"Asistir a las sesiones programadas por tu tutor (grupales o individuales).",
"Cumplir con las acciones y metas acordadas con tu tutor.",
"Mantener comunicación con tu tutor",
"Validar las sesiones de tutoría recibidas, asi como evaluar el desempeño de tu tutor al finalizar cada semestre desde tu acceso personal a “mi portal UJED https://miportal.ujed.mx/” "
];

const pasos = [
  "Todos los alumnos desde primer hasta noveno semestre y en ambas modalidades (presencial y virtual); tienen un tutor asignado, para conocer su identidad debes consultar tu cuenta en la Plataforma “SUMA”  https://sumafeca.ujed.mx/ de igual manera el tutor asignado establecerá contacto contigo al iniciar cada semestre.",
  "Les recordamos que el programa de tutorías constituye un derecho y un apoyo institucional fundamental, donde obtienen beneficios formativos, personales y sociales.",
];

const sumaUrl = "https://sumafeca.ujed.mx/";
const miPortalUrl = "https://miportal.ujed.mx/";

function TutorIcon({ children }) {
  return <div className="pf-card-icon" aria-hidden="true">{children}</div>;
}

function TutoriasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="tutorias"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="pf-hero pf-hero-sm"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(80,12,18,0.78), rgba(227,19,19,0.22)), url('/imagenes/feca-entrada.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Programa Institucional</div>
          <h1 className="pf-hero-title">Tutorías<br />FECA</h1>
          <p className="pf-hero-sub">
            Acompañamiento académico para fortalecer tu trayectoria universitaria, resolver dudas y orientar decisiones durante tu formación.
          </p>
        </div>
      </section>

      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Coordinación</div>
            <h2 className="pf-section-title">Responsable del programa</h2>
            <p className="pf-section-desc">
              Coordinadora de Tutorías: <strong>Mtra. Ana Karen Salas Name  </strong>. Docente con 10 años de antigüedad
            </p>
          </div>

          <div className="pf-cards-grid pf-fade">
            <div className="pf-card">
              <TutorIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M12 6.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
                  <path d="M19 5l2 2-4 4" />
                </svg>
              </TutorIcon>
              <h3 className="pf-card-title">¿Qué es la Tutoría Universitaria?</h3>
              <p className="pf-card-desc">
               La tutoría es un proceso integral de acompañamiento que busca potenciar tu desarrollo académico, profesional 
               y personal durante tu estancia en nuestra facultad. Consiste en recibir asesoría, acompañamiento y orientación 
               académica por parte de maestros formados como tutores para guiar tu trayectoria universitaria,
              la cual se concreta mediante el tipo de atención individual o grupal; en sus modalidades presencial, virtual o mixta
              </p>
            </div>

            <div className="pf-card">
              <TutorIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </TutorIcon>
              <h3 className="pf-card-title">¿Qué hace un tutor?</h3>
              <p>Tu tutor asignado te brindará un respaldo en tres vertientes clave:</p>
              <ul style={{ margin: "12px 0 0", padding: "0 0 0 18px", listStyle: "disc" }}>
                {accionesTutor.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "#5f5552", marginBottom: 7, lineHeight: 1.55 }}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pf-card">
              <TutorIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </TutorIcon>
              <h3 className="pf-card-title">Tu compromiso como tutorado</h3>
              <p> Como estudiante y tutorado, adquieres la responsabilidad de;</p>
              <ul style={{ margin: "12px 0 0", padding: "0 0 0 18px", listStyle: "disc" }}>
                {compromisos.map((item) => {
                  const hasMiPortalLink = item.includes(miPortalUrl);

                  return (
                    <li key={item} style={{ fontSize: 14, color: "#5f5552", marginBottom: 7, lineHeight: 1.55 }}>
                      {hasMiPortalLink ? (
                        <>
                          {item.split(miPortalUrl)[0]}
                          <a href={miPortalUrl} target="_blank" rel="noreferrer" style={{ color: "#c0000c", fontWeight: 700, textDecoration: "underline" }}>
                            {miPortalUrl}
                          </a>
                          {item.split(miPortalUrl)[1]}
                        </>
                      ) : item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Planeación académica</div>
            <h2 className="pf-section-title pf-title-white">Objetivos estratégicos del programa</h2>
            <p className="pf-section-desc pf-desc-white">
              El programa de tutorías de la FECA se instituyo  en el año 2006, siendo pionera en la UJED; se rige bajo tres pilares fundamentales para el éxito estudiantil:
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {objetivos.map((objetivo, index) => (
              <div key={objetivo} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{String(index + 1).padStart(2, "0")}</div>
                <p className="pf-card-desc" style={{ color: "rgba(255,255,255,0.78)" }}>{objetivo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Solicitud de tutor</div>
            <h2 className="pf-section-title">¿Qué debo hacer para tener un tutor?</h2>
            <p className="pf-section-desc">
              El proceso es sencillo y se realiza directamente con el área responsable de Tutorías.
            </p>
          </div>
          <div className="pf-fade" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {pasos.map((paso, index) => (
              <div key={paso} className="pf-contact-item" style={{ background: "#fff", borderRadius: 12, padding: "22px 24px", alignItems: "flex-start" }}>
                <div className="pf-contact-icon">{index + 1}</div>
                <div>
                  <span className="pf-contact-label">Paso {index + 1}</span>
                  <span className="pf-contact-value">
                    {index === 0 ? paso.split(sumaUrl)[0] : paso}
                    {index === 0 && (
                      <>
                        {" "}
                        <a href={sumaUrl} target="_blank" rel="noreferrer" style={{ color: "#c0000c", fontWeight: 700, textDecoration: "underline" }}>
                          {sumaUrl}
                        </a>
                        {paso.split(sumaUrl)[1]}
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Contacto</div>
            <h2 className="pf-section-title">Ubicación y medios de contacto</h2>
            <p className="pf-section-desc">
              Ante cualquier duda, aclaración o necesidad, puedes acudir directamente a la Coordinación de Tutorías o comunicarte por las vías institucionales:
            </p>
          </div>
          <div className="pf-fade" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { label: "Ubicación", value: "Edificio D (Ubicada exactamente detrás del elevador)." },
              { label: "Teléfono de oficina", value: "618-827-13-65 | Extensión: 5735 ", href: "Extensión: 5735" },
              { label: "Correo electrónico", value: "tutorias.feca@ujed.mx", href: "mailto:tutorias@feca.ujed.mx" },
            ].map((item) => (
              item.href ? (
                <a key={item.label} href={item.href} className="pf-contact-item" style={{ background: "#fff", borderRadius: 12, padding: "24px 28px" }}>
                  <div className="pf-contact-icon">•</div>
                  <div><span className="pf-contact-label">{item.label}</span><span className="pf-contact-value">{item.value}</span></div>
                </a>
              ) : (
                <div key={item.label} className="pf-contact-item" style={{ background: "#fff", borderRadius: 12, padding: "24px 28px" }}>
                  <div className="pf-contact-icon">•</div>
                  <div><span className="pf-contact-label">{item.label}</span><span className="pf-contact-value">{item.value}</span></div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default TutoriasPage;
