import { useState } from "react";

// Contenido único de los ejes rectores (Plan de Desarrollo 2025-2031 de la FECA).
// Se centraliza aquí para que la página "Nosotros" y la página dedicada
// muestren exactamente la misma información.

const EJE_TRANSVERSAL = {
  kicker: "Eje Transversal",
  title: "Identidad Universitaria",
  desc: `Alineado estrechamente a la visión y los ejes estratégicos de la Universidad Juárez del Estado de Durango (UJED), el eje transversal "Identidad Universitaria" del Plan de Desarrollo 2025-2031 de la FECA busca consolidar el sentido de pertenencia y compromiso de estudiantes, docentes y administrativos mediante el impulso prioritario a la cultura y el deporte. Esta estrategia asume ambos pilares como herramientas fundamentales para fomentar el posicionamiento institucional, los valores éticos, la sana convivencia y la equidad, estableciendo metas plurianuales de difusión artística, vinculación local y creación de programas deportivos inclusivos. De esta manera, y tomando como base los Objetivos de Desarrollo Sostenible (ODS) desde una perspectiva global a local, la Facultad refrenda su misión de ofrecer una formación integral, innovadora y de calidad ante los retos de las ciencias económicas y administrativas.`,
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22V4a1 1 0 0 1 1-1h11l3 3v16" /><path d="M4 22h15" /><path d="M9 8h6M9 12h6" />
    </svg>
  ),
};

const EJES = [
  {
    num: "01",
    title: "Educación integral de calidad e innovación educativa",
    desc: `El "Eje 1: Educación integral de calidad e innovación educativa", busca consolidar la excelencia académica a través de una formación holística, pertinente y basada en el pensamiento crítico. Para lograrlo, este eje establece metas plurianuales enfocadas en la actualización y acreditación continua de los planes de estudio, el desarrollo de nueva oferta educativa y la capacitación docente, asegurando una fuerte vinculación con las necesidades sociales y del mercado laboral. Asimismo, prioriza la equidad y la reducción de desigualdades mediante el fortalecimiento de programas de tutorías e inclusión, a la par que impulsa la internacionalización a través de la movilidad académica y la certificación en estándares de competencias laborales para estudiantes y personal. En su conjunto, estas estrategias, respaldadas por mecanismos de evaluación institucional continua, garantizan un proceso de enseñanza-aprendizaje innovador que prepara a la comunidad universitaria para responder con eficacia a los retos locales y globales.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Promoción e impulso a la investigación y la innovación",
    desc: `El "Eje 2: Promoción e impulso a la investigación y la innovación" busca fortalecer la generación de conocimiento aplicado en las ciencias económicas, administrativas y contables para vincularlo estratégicamente con el entorno social y productivo. Con el propósito de resolver problemáticas organizacionales y de política pública, este eje prioriza el fortalecimiento de los Cuerpos Académicos (CA) alineando sus líneas de investigación con los ODS, fomenta la procuración de financiamiento a través de convocatorias y promueve la creación de redes de colaboración multidisciplinaria a nivel local, nacional e internacional. Asimismo, establece metas contundentes para garantizar la transferencia tecnológica y la democratización del conocimiento, impulsando la publicación en revistas de alto impacto, la organización de congresos y coloquios, la conformación de un comité editorial propio y el lanzamiento de una nueva revista especializada que eleve significativamente la visibilidad y el impacto científico de la Facultad.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Vinculación y extensión con impacto social",
    desc: `El "Eje 3: Vinculación y extensión con impacto social" busca consolidar alianzas estratégicas con los sectores público, privado y social para dinamizar el desarrollo regional y la transformación económica. Para lograrlo, establece metas enfocadas en la firma permanente de convenios multisectoriales, la divulgación científica aplicada y la diversificación de la educación continua mediante programas flexibles, digitales y con proyección internacional que incrementen la empleabilidad. A la par, este eje fortalece la responsabilidad social universitaria y el tejido social mediante esquemas de acompañamiento integral para estudiantes vulnerables o foráneos, orientación vocacional continua y acciones sostenidas de voluntariado, inclusión y respeto a la diversidad.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Promoción de la cultura de la paz con responsabilidad social y atención a la diversidad e inclusión",
    desc: `El "Eje 4: Promoción de la cultura de la paz con responsabilidad social y atención a la diversidad e inclusión" busca afianzar un entorno universitario seguro, libre de violencia y fundamentado en la equidad sustantiva. Para lograrlo, el eje establece estrategias para transversalizar la perspectiva de género, aplicar protocolos de prevención y sanción de la violencia e impulsar una cultura institucional incluyente libre de discriminación. A la par, prioriza el bienestar físico, mental y emocional mediante campañas de salud integral, alianzas de atención psicológica y la capacitación docente en gestión de crisis emocionales. Finalmente, el eje fortalece la Responsabilidad Social Universitaria (RSU), la seguridad física de la comunidad mediante un Plan Maestro de Protección Civil y la integración del desarrollo sostenible en las unidades de aprendizaje, asegurando una convivencia armónica, ética y sustentable.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Infraestructura y equipamiento para un espacio digno, armónico y sustentable con el ambiente",
    desc: `El "Eje 5: Infraestructura y equipamiento para un espacio digno, armónico y sustentable con el ambiente" busca transformar el entorno físico de la Facultad hacia un modelo ecológico, seguro e incluyente. Para lograrlo, establece metas orientadas a la eficiencia energética mediante tecnologías limpias como paneles solares, la captación y reutilización de agua, y el impulso a programas de economía circular, reciclaje y cultura ecológica. A la par, el eje moderniza los ambientes de aprendizaje a través de la conversión de salones en aulas interactivas, la adecuación de espacios abiertos de convivencia, la renovación del mobiliario y el fortalecimiento de la seguridad con sistemas de videovigilancia. Finalmente, garantiza la accesibilidad universal mediante la rehabilitación de elevadores y rampas para personas con discapacidad, junto con la actualización continua del acervo bibliográfico físico y digital.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Gestión ética y transformadora",
    desc: `El "Eje 6: Gestión ética y transformadora" busca consolidar una administración íntegra, transparente, eficiente y fundamentada en la rendición de cuentas. Para lograrlo, el eje impulsa la modernización institucional a través de la reingeniería de procesos, la digitalización del 100% de los expedientes del personal y la automatización de trámites y servicios en línea. Asimismo, fortalece la sostenibilidad financiera mediante la optimización del presupuesto, la revisión de tarifas y la diversificación en la generación de ingresos propios. Finalmente, garantiza el estricto cumplimiento normativo y la mejora continua mediante tableros de control digitales, sistemas de alerta en tiempo real para auditorías y la automatización de la gestión de riesgos dentro del Sistema Universitario de Calidad y Control Interno.`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export default function EjesRectores() {
  // El primer eje estratégico abierto por omisión; -1 = todo cerrado.
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="ejes-rr">
      {/* Eje transversal — pilar que atraviesa a todos los demás */}
      <article className="ejes-rr-transversal">
        <div className="ejes-rr-tv-icon">{EJE_TRANSVERSAL.icon}</div>
        <div className="ejes-rr-tv-body">
          <span className="ejes-rr-tv-kicker">{EJE_TRANSVERSAL.kicker}</span>
          <h3 className="ejes-rr-tv-title">{EJE_TRANSVERSAL.title}</h3>
          <p className="ejes-rr-tv-desc">{EJE_TRANSVERSAL.desc}</p>
        </div>
      </article>

      {/* Seis ejes estratégicos en acordeón */}
      <ol className="ejes-rr-list">
        {EJES.map((eje, i) => {
          const isOpen = openIdx === i;
          return (
            <li key={eje.num} className={`ejes-rr-item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="ejes-rr-head"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
              >
                <span className="ejes-rr-num">{eje.num}</span>
                <span className="ejes-rr-icon">{eje.icon}</span>
                <span className="ejes-rr-title">{eje.title}</span>
                <svg className="ejes-rr-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="ejes-rr-panel">
                <div className="ejes-rr-panel-inner">
                  <p>{eje.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
