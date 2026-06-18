import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const modalidades = [
  {
    tag: "Individual",
    title: "Tutoría Individual",
    desc: "Sesiones personalizadas entre tutor y estudiante para atender necesidades académicas específicas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>
      </svg>
    ),
  },
  {
    tag: "Grupal",
    title: "Tutoría Grupal",
    desc: "Sesiones colectivas orientadas a grupos de estudiantes con problemáticas similares.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    tag: "En línea",
    title: "Tutoría Virtual",
    desc: "Atención virtual para estudiantes que requieran orientación académica a distancia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    tag: "Entre pares",
    title: "Tutoría entre Pares",
    desc: "Apoyo académico entre estudiantes de semestres avanzados y alumnos de nuevo ingreso.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
      </svg>
    ),
  },
];

const actividades = [
  "Seguimiento del desempeño académico del estudiante.",
  "Orientación sobre la trayectoria escolar y opciones de titulación.",
  "Canalización a servicios de apoyo psicológico, médico o administrativo.",
  "Apoyo en la elaboración del plan de estudios personalizado.",
  "Identificación oportuna de riesgo de deserción.",
];

const STATS = [
  { num: "4", label: "Modalidades de tutoría" },
  { num: "100%", label: "Gratuito para alumnos" },
  { num: "8-15hrs", label: "Horario de atención" },
  { num: "FECA", label: "Coordinación académica" },
];

export default function TutoriasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/inicio.png')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Tutorías</h1>
          <p className="pf-hero-sub">
            Acompañamiento académico personalizado para el éxito y permanencia de nuestros estudiantes durante toda su trayectoria universitaria.
          </p>
          <div className="pf-hero-ctas">
            <a href="mailto:tutorias@feca.ujed.mx" className="pf-btn-primary">Solicitar tutoría</a>
            <a href="tel:6188271365" className="pf-btn-outline">(618) 827-1365</a>
          </div>
        </div>
        <div className="pf-stats">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ¿QUÉ ES? ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Programa Institucional de Tutorías</div>
            <h2 className="pf-section-title">¿Qué son las Tutorías?</h2>
            <p className="pf-section-desc">
              El Programa Institucional de Tutorías de la FECA brinda orientación y acompañamiento
              personalizado a los estudiantes durante su trayectoria académica, contribuyendo a su
              formación integral y favoreciendo su permanencia y egreso oportuno.
            </p>
          </div>
          <div className="pf-info-box pf-fade">
            <h3>Objetivo del Programa</h3>
            <p>
              Contribuir al desarrollo integral del estudiante mediante el acompañamiento académico,
              orientándolo en su proceso de aprendizaje, detectando problemáticas oportunamente y
              canalizándolo a las instancias de apoyo correspondientes para favorecer su permanencia
              y egreso en tiempo y forma.
            </p>
          </div>
        </div>
      </section>

      {/* ── MODALIDADES ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Tipos de apoyo</div>
            <h2 className="pf-section-title pf-title-white">Modalidades de Tutoría</h2>
            <p className="pf-section-desc pf-desc-white">
              Ofrecemos distintas formas de acompañamiento adaptadas a las necesidades de cada estudiante.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {modalidades.map((m) => (
              <div key={m.title} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{m.icon}</div>
                <h3 className="pf-card-title">{m.title}</h3>
                <p className="pf-card-desc">{m.desc}</p>
                <span className="pf-chip pf-chip-light">{m.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVIDADES + CONTACTO ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <div className="pf-label">Rol del tutor</div>
            <h2 className="pf-section-title">Actividades del Tutor</h2>
            <div className="pf-info-box">
              <ul>
                {actividades.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="pf-label">Contáctanos</div>
            <h2 className="pf-section-title">Información de Contacto</h2>
            <div className="pf-contact-list">
              <a href="tel:6188271365" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Teléfono</span><span className="pf-contact-value">(618) 827-13-65</span></div>
              </a>
              <a href="mailto:tutorias@feca.ujed.mx" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">tutorias@feca.ujed.mx</span></div>
              </a>
              <div className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Ubicación</span><span className="pf-contact-value">Coordinación Académica, planta baja FECA</span></div>
              </div>
              <div className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Horario</span><span className="pf-contact-value">Lunes a Viernes · 8:00 – 15:00 hrs</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
