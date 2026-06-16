import Header from "../sections/Header";
import Footer from "../sections/Footer";

export default function TutoriasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="hero small-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('/imagenes/inicio.png')",
        }}
      >
        <div className="hero-content">
          <div className="hero-tag">Servicios</div>
          <h1>Tutorías</h1>
          <p>
            Acompañamiento académico personalizado para el éxito y permanencia
            de nuestros estudiantes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Programa Institucional de Tutorías</div>
            <h2 className="section-title">¿Qué son las Tutorías?</h2>
            <p className="section-desc">
              El Programa Institucional de Tutorías de la FECA brinda orientación
              y acompañamiento personalizado a los estudiantes durante su trayectoria
              académica, contribuyendo a su formación integral y favoreciendo su
              permanencia y egreso oportuno.
            </p>
          </div>

          <div className="fade-up" style={{ marginTop: "48px" }}>
            <div className="info-box">
              <h2>Objetivo</h2>
              <p>
                Contribuir al desarrollo integral del estudiante mediante el
                acompañamiento académico, orientándolo en su proceso de aprendizaje,
                detectando problemáticas oportunamente y canalizándolo a las instancias
                de apoyo correspondientes para favorecer su permanencia y egreso en
                tiempo y forma.
              </p>
            </div>

            <div className="info-box">
              <h2>Modalidades de Tutoría</h2>
              <ul>
                <li><strong>Tutoría Individual:</strong> Sesiones personalizadas entre tutor y estudiante para atender necesidades académicas específicas.</li>
                <li><strong>Tutoría Grupal:</strong> Sesiones colectivas orientadas a grupos de estudiantes con problemáticas similares.</li>
                <li><strong>Tutoría en Línea:</strong> Atención virtual para estudiantes que requieran orientación a distancia.</li>
                <li><strong>Tutoría entre Pares:</strong> Apoyo académico entre estudiantes de semestres avanzados y de nuevo ingreso.</li>
              </ul>
            </div>

            <div className="info-box">
              <h2>Actividades del Tutor</h2>
              <ul>
                <li>Seguimiento del desempeño académico del estudiante.</li>
                <li>Orientación sobre la trayectoria escolar y opciones de titulación.</li>
                <li>Canalización a servicios de apoyo psicológico, médico o administrativo.</li>
                <li>Apoyo en la elaboración del plan de estudios personalizado.</li>
                <li>Identificación oportuna de riesgo de deserción.</li>
              </ul>
            </div>

            <div className="info-box">
              <h2>¿A quién va dirigido?</h2>
              <p>
                El programa está dirigido a todos los estudiantes de licenciatura de
                la Facultad de Economía, Contaduría y Administración, con especial
                atención a los alumnos de nuevo ingreso y aquellos en situación de
                riesgo académico.
              </p>
            </div>

            <div className="info-box">
              <h2>Contacto</h2>
              <p>
                Para mayor información o para solicitar una sesión de tutoría,
                acude a la Coordinación Académica de la FECA o comunícate con nosotros:
              </p>
              <ul>
                <li><strong>Teléfono:</strong> (618) 827-13-65</li>
                <li><strong>Correo:</strong> tutorias@feca.ujed.mx</li>
                <li><strong>Ubicación:</strong> Edificio FECA, planta baja, Coordinación Académica</li>
                <li><strong>Horario de atención:</strong> Lunes a viernes de 8:00 a 15:00 hrs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
