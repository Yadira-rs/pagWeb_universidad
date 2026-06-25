import { useState } from "react";

const directors = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Dirección",
    degrees: ["Doctorado en Administración", "Maestría en Gestión Pública", "Lic. en Administración"],
    quote: "Comprometidos con la excelencia académica y el desarrollo integral de nuestra comunidad universitaria, guiamos a la FECA hacia un futuro de innovación y pertinencia regional.",
    image: "/imagenes/director.jpeg",
    bio: {
      trajectory: "El Dr. Jesús Guillermo Sotelo Asef cuenta con una destacada trayectoria de más de 15 años en el ámbito de la educación superior y la administración pública. Ha ocupado diversos cargos directivos y de docencia dentro de la Universidad Juárez del Estado de Durango (UJED), impulsando proyectos de reforma curricular y acreditaciones de calidad nacional.",
      focus: "Su gestión al frente de la FECA está orientada al fortalecimiento académico de los programas educativos, el fomento a la investigación científica con pertinencia regional, y la vinculación estratégica con los sectores empresarial y público.",
      contact: "direccion.feca@ujed.mx"
    }
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    degrees: ["Doctorado en Administración Pública", "Maestría en Gestión Organizacional", "Lic. en Administración"],
    quote: "La Secretaría Técnica trabaja día a día para que cada proceso institucional fluya con eficiencia, transparencia y orientación al servicio de la comunidad.",
    image: "/imagenes/inicio.png",
    bio: {
      trajectory: "El Dr. Miguel cuenta con una amplia experiencia en la administración académica, el diseño institucional y el desarrollo de proyectos de gestión gubernamental. A lo largo de su carrera en la UJED, ha coordinado procesos de planeación y evaluación institucional.",
      focus: "Como Secretario Técnico, se encarga de la planeación y del seguimiento de metas de las jefaturas de carrera, garantizando un servicio administrativo ágil, eficiente y centrado en la atención a alumnos y académicos.",
      contact: "sec.tecnica.feca@ujed.mx"
    }
  },
  {
    name: "Dr. Luis",
    role: "División de Estudios de Posgrado",
    degrees: ["Doctorado en Ciencias Contables", "Maestría en Finanzas", "Lic. en Contabilidad"],
    quote: "El posgrado de la FECA es el espacio donde la investigación y la práctica convergen para formar los líderes académicos y empresariales del mañana.",
    image: "/imagenes/aniversario.jpeg",
    bio: {
      trajectory: "El Dr. Luis es un reconocido profesor e investigador del área contable y financiera. Con más de una década de experiencia docente en posgrados, ha dirigido múltiples tesis de maestría y doctorado, participando en foros internacionales de investigación financiera.",
      focus: "Su visión para la División de Estudios de Posgrado de la FECA es la internacionalización de sus programas y la consolidación de los posgrados en el Sistema Nacional de Posgrados (SNP), promoviendo la investigación que incida en el desarrollo económico regional.",
      contact: "posgrado.feca@ujed.mx"
    }
  },
  {
    name: "Dr. Iván",
    role: "CIIEDO",
    degrees: ["Doctorado en Ciencias Económicas", "Maestría en Administración de Empresas", "Lic. en Economía"],
    quote: "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial.",
    image: "/imagenes/imagen.jpeg",
    bio: {
      trajectory: "El Dr. Iván posee una sólida experiencia en consultoría de negocios, formulación de proyectos de inversión y desarrollo local. Ha diseñado diversos programas de capacitación continua para mandos medios y directivos de organizaciones locales.",
      focus: "Al frente del Centro de Innovación, Incubación y Desarrollo Empresarial y Organizacional (CIIEDO), promueve la vinculación directa entre la academia y el sector productivo, impulsando incubadoras de empresas para estudiantes y egresados.",
      contact: "ciiedo.feca@ujed.mx"
    }
  },
  {
    name: "Dr. Juan",
    role: "Centro de Idiomas (CELCI)",
    degrees: ["Doctorado en Lingüística Aplicada", "Maestría en Enseñanza del Inglés", "Lic. en Letras Inglesas"],
    quote: "En el Centro de Idiomas creemos que el dominio de lenguas es la llave que abre las puertas al mundo. Formamos ciudadanos globales desde la FECA.",
    image: "/imagenes/cafeteria.jpeg",
    bio: {
      trajectory: "El Dr. Juan se ha especializado en la enseñanza comunicativa del inglés y en programas de certificación de dominio de idiomas. Cuenta con amplia trayectoria en capacitación docente y diseño curricular de lenguas extranjeras.",
      focus: "Su compromiso al frente de la Coordinación del Centro de Idiomas (CELCI) es expandir la oferta lingüística y facilitar certificaciones internacionales de lenguas que añadan valor curricular a los perfiles académicos de los egresados.",
      contact: "celci.feca@ujed.mx"
    }
  },
];

export default function DirectorsList() {
  const [selectedDirector, setSelectedDirector] = useState(null);

  return (
    <section className="el-section">
      {/* Encabezado */}
      <header className="el-header">
        <p className="el-eyebrow">Nuestro equipo</p>
        <h2 className="el-title">Directivos</h2>
        <div className="el-rule" />
        <p className="el-subtitle">
          Conoce al equipo que guía la vida académica, administrativa
          y de vinculación de nuestra facultad.
        </p>
      </header>

      {/* Lista */}
      <ol className="el-list">
        {directors.map((d, i) => (
          <li key={i} className="el-row">
            <div className="el-photo-wrap">
              <img src={d.image} alt={d.name} className="el-photo" />
            </div>

            <div className="el-body">
              <span className="el-role">{d.role}</span>
              <h3 className="el-name">{d.name}</h3>

              <div className="el-badges">
                {d.degrees.map((deg) => (
                  <span key={deg} className="el-badge">{deg}</span>
                ))}
              </div>

              <blockquote className="el-quote">
                <p>"{d.quote}"</p>
              </blockquote>

              <button className="el-bio-btn" onClick={() => setSelectedDirector(d)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Ver Información</span>
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* Modal de Biografía */}
      {selectedDirector && (
        <div className="dir-modal-overlay" onClick={() => setSelectedDirector(null)}>
          <div className="dir-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="dir-modal-close" onClick={() => setSelectedDirector(null)} aria-label="Cerrar modal">
              &times;
            </button>
            
            <div className="dir-modal-grid">
              {/* Columna Izquierda (Foto y datos) */}
              <div className="dir-modal-left">
                <div className="dir-modal-photo-wrap">
                  <img src={selectedDirector.image} alt={selectedDirector.name} className="dir-modal-photo" />
                </div>
                <span className="dir-modal-role">{selectedDirector.role}</span>
                <h3 className="dir-modal-name">{selectedDirector.name}</h3>
                
                <div className="dir-modal-contact">
                  <h4>Contacto</h4>
                  <a href={`mailto:${selectedDirector.bio.contact}`}>{selectedDirector.bio.contact}</a>
                  <p>FECA - UJED Durango</p>
                </div>
              </div>

              {/* Columna Derecha (Biografía y trayectoria) */}
              <div className="dir-modal-right">
                <span className="dir-modal-kicker">Biografía y Trayectoria</span>
                <div className="dir-modal-divider" />
                
                <blockquote className="dir-modal-quote">
                  <p>"{selectedDirector.quote}"</p>
                </blockquote>
                
                <div className="dir-modal-bio-content">
                  <section className="dir-modal-bio-section">
                    <h4>Trayectoria Académica y Profesional</h4>
                    <p>{selectedDirector.bio.trajectory}</p>
                  </section>
                  
                  <section className="dir-modal-bio-section">
                    <h4>Enfoque y Gestión</h4>
                    <p>{selectedDirector.bio.focus}</p>
                  </section>
                  
                  <section className="dir-modal-bio-section">
                    <h4>Grados Académicos</h4>
                    <ul className="dir-modal-degrees-list">
                      {selectedDirector.degrees.map((deg, idx) => (
                        <li key={idx}>
                          <span className="dir-modal-bullet">•</span> {deg}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
                
                <div className="dir-modal-footer">
                  <button className="dir-modal-close-btn" onClick={() => setSelectedDirector(null)}>
                    Cerrar Información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
