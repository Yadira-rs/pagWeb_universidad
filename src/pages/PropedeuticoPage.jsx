import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

/* ────────── datos ────────── */
const STATS = [
  { num: "1989", label: "Año de fundación" },
  { num: "2", label: "Modalidades disponibles" },
  { num: "3", label: "Carreras que atiende" },
  { num: "+35", label: "Años de trayectoria" },
];

const TIMELINE = [
  {
    year: "1989",
    title: "Nace el Propedéutico",
    desc: "Se establece el primer curso propedéutico semestral en la FECA, como respuesta a los altos índices de reprobación en los primeros semestres.",
  },
  {
    year: "1990s",
    title: "Consolidación y seguimiento",
    desc: "A través de estudios de seguimiento de egresados se confirma la efectividad del curso como puente académico para aspirantes.",
  },
  {
    year: "2008",
    title: "Expansión a Economía",
    desc: "Se integra la Licenciatura en Economía y Negocios Internacionales, completando la oferta actual de tres carreras.",
  },
  {
    year: "Hoy",
    title: "Modalidad presencial y virtual",
    desc: "El curso ofrece dos modalidades para adaptarse a las necesidades de todos los aspirantes.",
  },
];

const BENEFICIOS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Preparación académica",
    desc: "Refuerza tus bases en materias clave para que entres con ventaja a tu licenciatura.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M12 13v4m0 0-2-2m2 2 2-2"/>
      </svg>
    ),
    title: "Orientación profesional",
    desc: "Descubre cuál licenciatura se adapta mejor a tu perfil: Contaduría, Administración o Economía.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Comunidad universitaria",
    desc: "Vive la experiencia universitaria antes de comenzar tu licenciatura y conoce a tus futuros compañeros.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Mejor rendimiento",
    desc: "Los estudios de seguimiento comprueban que los egresados del propedéutico tienen mayor éxito en su licenciatura.",
  },
];

const MODALIDADES = [
  {
    tag: "Presencial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Modalidad Presencial",
    desc: "Clases de lunes a viernes en las instalaciones de la Facultad. Siete materias para una preparación integral.",
    horario: "Lunes a Viernes",
    materias: [
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, name: "Contabilidad" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, name: "Administración" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>, name: "Matemáticas" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, name: "Computación" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, name: "Métodos de Estudio" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, name: "Economía" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, name: "Inglés" },
    ],
  },
  {
    tag: "En línea",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Modalidad Virtual",
    desc: "A través de la plataforma Moodle desde cualquier lugar. Seis materias en formato flexible.",
    horario: "Plataforma Moodle",
    materias: [
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, name: "Contabilidad" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, name: "Administración" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>, name: "Matemáticas" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>, name: "Desarrollo de TIC's" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, name: "Métodos de Estudio" },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, name: "Inglés" },
    ],
  },
];

const PASOS = [
  { num: "01", title: "Contáctanos", desc: "Comunícate por teléfono, correo o visítanos directamente en la Facultad." },
  { num: "02", title: "Elige tu modalidad", desc: "Decide si prefieres la modalidad presencial o virtual según tu disponibilidad." },
  { num: "03", title: "Completa tu solicitud", desc: "Llena el formulario de inscripción con tus datos personales y académicos." },
  { num: "04", title: "¡Comienza!", desc: "Inicia tu camino hacia la licenciatura con el respaldo de la FECA." },
];

const LICENCIATURAS = [
  {
    color: "#c0000c",
    initial: "CP",
    name: "Contaduría Pública",
    desc: "Finanzas, auditoría y gestión fiscal",
  },
  {
    color: "#d10a0a",
    initial: "AD",
    name: "Administración",
    desc: "Gestión empresarial y liderazgo",
  },
  {
    color: "#e31313",
    initial: "ENI",
    name: "Economía y Negocios Internacionales",
    desc: "Comercio exterior y mercados globales",
  },
];

/* ────────── componente ────────── */
function PropedeuticoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".prop2-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="prop2-hero"
        style={{
          backgroundImage: `url('/imagenes/feca-entrada.jpg')`,
        }}
      >
        <div className="prop2-hero-overlay" />
        <div className="prop2-hero-inner">
          <div className="prop2-hero-badge">Nuevo Ingreso · FECA</div>
          <h1 className="prop2-hero-title">Curso<br />Propedéutico</h1>
          <p className="prop2-hero-sub">
            Tu primer paso hacia la universidad. Prepárate académicamente y
            elige con confianza la licenciatura que marcará tu futuro.
          </p>
          <div className="prop2-hero-ctas">
            <a href="mailto:propedeuticofeca@ujed.mx" className="prop2-cta-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Solicitar información
            </a>
            <a href="tel:6188271365" className="prop2-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              (618) 827-1365
            </a>
          </div>
        </div>

        {/* Stats flotantes */}
        <div className="prop2-stats">
          {STATS.map((s) => (
            <div key={s.label} className="prop2-stat">
              <span className="prop2-stat-num">{s.num}</span>
              <span className="prop2-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LICENCIATURAS ── */}
      <section className="prop2-section prop2-section-light prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head">
            <div className="prop2-label">¿Para quién es?</div>
            <h2 className="prop2-section-title">Tres carreras, un solo propedéutico</h2>
            <p className="prop2-section-desc">
              El curso propedéutico de la FECA te prepara para ingresar a cualquiera de estas licenciaturas.
            </p>
          </div>
          <div className="prop2-lic-grid">
            {LICENCIATURAS.map((lic) => (
              <div key={lic.name} className="prop2-lic-card">
                <div className="prop2-lic-initial" style={{ background: lic.color }}>{lic.initial}</div>
                <div className="prop2-lic-info">
                  <strong>{lic.name}</strong>
                  <span>{lic.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="prop2-section prop2-section-dark prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head prop2-section-head-center">
            <div className="prop2-label prop2-label-light">¿Por qué cursarlo?</div>
            <h2 className="prop2-section-title prop2-title-white">Beneficios del Propedéutico</h2>
            <p className="prop2-section-desc prop2-desc-white">
              Más que un requisito, es una ventaja real para tu desempeño universitario.
            </p>
          </div>
          <div className="prop2-benefits-grid">
            {BENEFICIOS.map((b) => (
              <div key={b.title} className="prop2-benefit-card">
                <div className="prop2-benefit-icon">{b.icon}</div>
                <h3 className="prop2-benefit-title">{b.title}</h3>
                <p className="prop2-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA TIMELINE ── */}
      <section className="prop2-section prop2-section-light prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head">
            <div className="prop2-label">Antecedentes</div>
            <h2 className="prop2-section-title">Historia del Propedéutico</h2>
            <p className="prop2-section-desc">
              Desde 1989 hemos formado a miles de estudiantes que hoy son profesionistas exitosos.
            </p>
          </div>
          <div className="prop2-timeline">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className={`prop2-timeline-item ${i % 2 === 0 ? "prop2-tl-left" : "prop2-tl-right"}`}>
                <div className="prop2-timeline-dot" />
                <div className="prop2-timeline-card">
                  <div className="prop2-tl-year">{item.year}</div>
                  <h3 className="prop2-tl-title">{item.title}</h3>
                  <p className="prop2-tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="prop2-timeline-line" />
          </div>
        </div>
      </section>

      {/* ── MISIÓN Y VISIÓN ── */}
      <section className="prop2-section prop2-section-alt prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head prop2-section-head-center">
            <div className="prop2-label">Identidad institucional</div>
            <h2 className="prop2-section-title">Misión y Visión</h2>
            <p className="prop2-section-desc">Los principios que guían cada ciclo escolar del Curso Propedéutico.</p>
          </div>
          <div className="prop2-mv-grid">
            <div className="prop2-mv-card">
              <div className="prop2-mv-header">
                <div className="prop2-mv-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Misión</h3>
              </div>
              <p>
                Formamos a nuestros alumnos para ingresar en la Facultad de Economía, Contaduría y Administración,
                con el compromiso de proporcionarles las herramientas necesarias para mejorar su desempeño académico
                en el transcurso de su licenciatura, así como también los orientamos sobre su definición profesional
                a través de la calidad de nuestros programas y en cada una de nuestras actividades.
              </p>
            </div>
            <div className="prop2-mv-card">
              <div className="prop2-mv-header">
                <div className="prop2-mv-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                  </svg>
                </div>
                <h3>Visión</h3>
              </div>
              <p>
                Posicionarnos como un propedéutico de licenciatura de las carreras de Contaduría, Economía y
                Administración reconocido por su calidad, a través de desarrollar programas académicos que orienten
                al aspirante a una elección adecuada de su carrera y una culminación exitosa de sus estudios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALIDADES ── */}
      <section className="prop2-section prop2-section-light prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head prop2-section-head-center">
            <div className="prop2-label">Oferta académica</div>
            <h2 className="prop2-section-title">Elige tu modalidad</h2>
            <p className="prop2-section-desc">
              Adaptamos el curso a tu estilo de vida. Elige la modalidad que mejor se ajuste a tus tiempos.
            </p>
          </div>
          <div className="prop2-modal-grid">
            {MODALIDADES.map((m) => (
              <div key={m.title} className="prop2-modal-card">
                <div className="prop2-modal-header">
                  <div className="prop2-modal-icon">{m.icon}</div>
                  <div>
                    <span className="prop2-modal-tag">{m.tag}</span>
                    <h3 className="prop2-modal-title">{m.title}</h3>
                    <p className="prop2-modal-subtitle">{m.desc}</p>
                  </div>
                </div>
                <div className="prop2-modal-schedule">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {m.horario}
                </div>
                <div className="prop2-modal-materias">
                  <p className="prop2-modal-materias-label">Materias del curso</p>
                  <div className="prop2-modal-materias-grid">
                    {m.materias.map((mat) => (
                      <div key={mat.name} className="prop2-materia-chip">
                        <span>{mat.icon}</span>
                        {mat.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO DE INSCRIPCIÓN ── */}
      <section className="prop2-section prop2-section-dark prop2-fade">
        <div className="prop2-container">
          <div className="prop2-section-head prop2-section-head-center">
            <div className="prop2-label prop2-label-light">¿Cómo inscribirme?</div>
            <h2 className="prop2-section-title prop2-title-white">Proceso de inscripción</h2>
            <p className="prop2-section-desc prop2-desc-white">
              Cuatro pasos simples para comenzar tu camino universitario en la FECA.
            </p>
          </div>
          <div className="prop2-steps">
            {PASOS.map((paso, i) => (
              <div key={paso.num} className="prop2-step">
                <div className="prop2-step-num">{paso.num}</div>
                {i < PASOS.length - 1 && <div className="prop2-step-connector" />}
                <div className="prop2-step-content">
                  <h3>{paso.title}</h3>
                  <p>{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section className="prop2-section prop2-section-light prop2-fade">
        <div className="prop2-container">
          <div className="prop2-contact-box">
            <div className="prop2-contact-left">
              <div className="prop2-label">¿Tienes dudas?</div>
              <h2>Estamos aquí para ayudarte</h2>
              <p>Comunícate con nosotros y recibe orientación personalizada sobre el Curso Propedéutico.</p>
              <div className="prop2-contact-items">
                <a href="tel:6188271365" className="prop2-contact-item">
                  <div className="prop2-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Teléfono</strong>
                    <span>(618) 8 27 13 65</span>
                  </div>
                </a>
                <a href="mailto:propedeuticofeca@ujed.mx" className="prop2-contact-item">
                  <div className="prop2-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Correo electrónico</strong>
                    <span>propedeuticofeca@ujed.mx</span>
                  </div>
                </a>
                <div className="prop2-contact-item">
                  <div className="prop2-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Ubicación</strong>
                    <span>Oficinas dentro de la Facultad FECA · UJED</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="prop2-contact-right">
              <div className="prop2-contact-cta-card">
                <div className="prop2-cta-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3>¿Listo para inscribirte?</h3>
                <p>Inicia tu solicitud en línea o visítanos directamente en la Facultad.</p>
                <a href="#/solicitud" className="prop2-cta-primary prop2-cta-full">
                  Iniciar mi solicitud
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <p className="prop2-cta-note">Sin costo adicional para aspirantes de la UJED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PropedeuticoPage;
