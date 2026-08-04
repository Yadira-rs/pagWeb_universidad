import { useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const FAQ_DATA = [
  {
    q: "¿Qué licenciaturas ofrece la FECA?",
    a: "Ofrecemos tres licenciaturas: Contador Público, Licenciado en Administración y Licenciado en Economía y Negocios Internacionales. Además contamos con programas de posgrado (maestría y doctorado) a través del área de Posgrado.",
  },
  {
    q: "¿Cuáles son los requisitos para ingresar?",
    a: "Necesitas certificado de bachillerato con promedio mínimo de 7.0, CURP, identificación oficial, 4 fotografías tamaño infantil y presentar el examen de admisión de la UJED. Los resultados se publican en menos de 72 horas.",
  },
  {
    q: "¿Cuándo son las fechas de inscripción?",
    a: "Las inscripciones para el ciclo julio–agosto 2026 están abiertas hasta el 31 de julio. Para el ciclo enero–febrero, las fechas se publican en diciembre. Puedes consultar nuestra sección de noticias o llamar al (618) 827-13-65.",
  },
  {
    q: "¿La FECA ofrece modalidad en línea?",
    a: "Sí. Algunos programas cuentan con modalidad híbrida o en línea. Para conocer la disponibilidad actual por carrera y ciclo escolar comunícate con la Secretaría Académica al (618) 827-13-65 o escríbenos a informes@feca.ujed.mx.",
  },
  {
    q: "¿Cuántos semestres dura cada licenciatura?",
    a: "Las licenciaturas tienen una duración de 8 semestres (4 años) en modalidad presencial regular. La maestría dura 4 semestres y el doctorado entre 6 y 8 semestres.",
  },
  {
    q: "¿Hay programas de intercambio internacional?",
    a: "Sí. La FECA tiene convenios con más de 80 universidades en 25 países. A través del Centro de Lenguas e Internacionalización (CELCI) puedes aplicar a intercambios académicos con nivel intermedio-avanzado de inglés y promedio mínimo de 8.5.",
  },
  {
    q: "¿Existen becas o apoyos económicos?",
    a: "Sí. La UJED y la FECA ofrecen becas por promedio de excelencia, becas deportivas y culturales, apoyos del programa Bécalos y convenios con el gobierno estatal. Acude a Control Escolar para conocer requisitos y fechas.",
  },
  {
    q: "¿Cómo funciona la Bolsa de Trabajo?",
    a: "Es un servicio gratuito para estudiantes y egresados donde puedes registrar tu currículum, consultar vacantes y asistir a ferias de empleo organizadas por la facultad. Las empresas también pueden publicar vacantes sin costo.",
  },
  {
    q: "¿Qué modalidades de titulación existen?",
    a: "La FECA ofrece tesis, examen general de conocimientos (CENEVAL-EGEL), promedio de excelencia, titulación por posgrado y proyecto de investigación aplicada. Consulta los requisitos en la Secretaría Académica.",
  },
  {
    q: "¿Cómo obtengo mi certificado o constancia de estudios?",
    a: "Los documentos de egreso se tramitan en Control Escolar sin adeudos académicos ni administrativos. El tiempo de entrega varía entre 15 y 30 días hábiles según el documento.",
  },
];

function FaqPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [abierto, setAbierto] = useState(null);
  const toggle = (idx) => setAbierto((prev) => (prev === idx ? null : idx));

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="faq" newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />

      <section
        className="pf-hero pf-hero-sm"
        style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1 className="pf-hero-title">Preguntas<br />Frecuentes</h1>
          <p className="pf-hero-sub">
            Resolvemos las dudas más comunes sobre admisión, trámites y vida universitaria en la FECA.
          </p>
        </div>
      </section>

      <section className="faq-section fade-up">
        <div className="faq-inner">
          <div className="faq-lista">
            {FAQ_DATA.map((item, idx) => {
              const open = abierto === idx;
              return (
                <div key={idx} className={`faq-fila${open ? " faq-fila--open" : ""}`}>
                  <button
                    type="button"
                    className="faq-fila-btn"
                    onClick={() => toggle(idx)}
                    aria-expanded={open}
                  >
                    <span className="faq-fila-q">{item.q}</span>
                    <span className="faq-fila-icono" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-fila-body">
                    <p className="faq-fila-a">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default FaqPage;
