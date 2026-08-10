import { useState, useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { IconGlobe } from "../components/Icons";

const TAB_ICONS = {
  cursos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  costos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="22" height="14" rx="3"/>
      <path d="M1 10h22"/>
      <path d="M7 15h2M11 15h4"/>
    </svg>
  ),
  inscripcion: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  preguntas: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  contacto: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  equipo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

const tabs = [
  { id: "cursos",      label: "Cursos"              },
  { id: "costos",      label: "Costos"               },
  { id: "inscripcion", label: "Inscripción"          },
  { id: "preguntas",   label: "Preguntas frecuentes" },
  { id: "contacto",    label: "Contacto"             },
  { id: "equipo",      label: "Equipo"               },
];

const cursos = [
  {
    title: "Inglés para adultos",
    flag: <IconGlobe size={32} />,
    age: "Mayores de 15 años",
    horarios: ["Lunes a viernes · 1 hr. diaria", "Sabatinos · 9:00 a.m. – 2:00 p.m."],
    pdf: "/docs/horarios_ingles_adultos.pdf",
    color: "#951823",
    gradient: "linear-gradient(135deg, #4a0810 0%, #951823 100%)",
    bg: "#fff5f5",
  },
  {
    title: "Inglés para niños",
    flag: <IconGlobe size={32} />,
    age: "8 a 11 años",
    horarios: ["Sabatinos · 9:00 a.m. – 2:00 p.m."],
    note: "Solo reingreso en el periodo feb–jun.",
    pdf: "/docs/horarios_ingles_ninos.pdf",
    color: "#a87f3d",
    gradient: "linear-gradient(135deg, #6b4a1a 0%, #a87f3d 100%)",
    bg: "#fdf8ee",
  },
  {
    title: "Inglés para jóvenes",
    flag: <IconGlobe size={32} />,
    age: "12 a 15 años",
    horarios: ["Sabatinos · 9:00 a.m. – 2:00 p.m."],
    pdf: "/docs/horarios_ingles_jovenes.pdf",
    color: "#e31313",
    gradient: "linear-gradient(135deg, #951823 0%, #e31313 100%)",
    bg: "#fff5f5",
  },
  {
    title: "Francés",
    flag: <IconGlobe size={32} />,
    age: "15 años en adelante",
    horarios: ["Lunes a viernes · 1 hr. diaria"],
    pdf: "/docs/horarios_frances.pdf",
    color: "#6b0f18",
    gradient: "linear-gradient(135deg, #3d0009 0%, #6b0f18 100%)",
    bg: "#fff5f5",
  },
  {
    title: "Italiano",
    flag: <IconGlobe size={32} />,
    age: "15 años en adelante",
    horarios: ["Lunes a viernes · 1 hr. diaria"],
    pdf: "/docs/horarios_italiano.pdf",
    color: "#b79a63",
    gradient: "linear-gradient(135deg, #3d2800 0%, #b79a63 100%)",
    bg: "#fdf8ee",
  },
  {
    title: "Japonés",
    flag: <IconGlobe size={32} />,
    age: "15 años en adelante",
    horarios: ["Lunes a viernes · 1 hr. diaria"],
    pdf: "/docs/horarios_japones.pdf",
    color: "#e31313",
    gradient: "linear-gradient(135deg, #e31313 0%, #f87171 100%)",
    bg: "#fff1f2",
  },
];

const faqs = [
  {
    q: "Soy alumno de reingreso y no sé cuál es mi matrícula. ¿Cómo puedo conseguirla?",
    a: "Puedes solicitarla enviando tu nombre completo a celci.feca@ujed.mx, por Facebook (facebook/CLI.FECA.UJED) o por teléfono al 827-13-65 ext. 5725, lunes, miércoles y viernes de 10:00 a.m. a 2:00 p.m.",
  },
  {
    q: "Ya tengo mi matrícula pero no sé mi contraseña. ¿Cómo puedo conseguirla?",
    a: "La primera vez que entres al SUMA+ usa tu matrícula como contraseña. Al entrar, el sistema te pedirá que la cambies por una nueva.",
  },
  {
    q: "¿Cuál es el número de cuenta al que debo hacer mi pago?",
    a: "Una vez que selecciones tu clase, el sistema te dará datos de cuenta, monto y referencia. Incluye la referencia correcta para identificar tu pago automáticamente.",
  },
  {
    q: "Soy trabajador de la UJED. ¿Cómo tramito mi exención de pago?",
    a: "El trámite se hace con la Coordinación de Finanzas y Planeación y no sustituye la inscripción del CLI. Llena el formulario en forms.gle/cQmnVdiDu1ujkQKq6. Después de enviarlo, recibirás tu folio entre 24 y 48 hrs; la validación puede demorar hasta 72 hrs adicionales.",
  },
];

const STATS = [
  {
    num: "1975", label: "Año de fundación",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V10l9-8 9 8v12"/><path d="M9 22V12h6v10"/></svg>,
  },
  {
    num: "+1,000", label: "Alumnos activos",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    num: "4", label: "Idiomas disponibles",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    num: "FECA", label: "Respaldo universitario",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
];

const steps = [
  { n: "01", title: "Elige tu idioma", desc: "Selecciona el idioma y nivel que deseas estudiar según tu perfil." },
  { n: "02", title: "Realiza tu pago", desc: "El sistema SUMA+ te proporcionará los datos bancarios y tu referencia única." },
  { n: "03", title: "Confirma tu lugar", desc: "Una vez validado el pago, queda registrada tu inscripción en el grupo elegido." },
];

// Accordeon FAQ item component — mismo estilo y comportamiento que el FAQ de inicio
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-fila${open ? " faq-fila--open" : ""}`}>
      <button
        className="faq-fila-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="faq-fila-q">{faq.q}</span>
        <span className="faq-fila-icono" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className="faq-fila-body">
        <p className="faq-fila-a">{faq.a}</p>
      </div>
    </div>
  );
}

function LenguasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [activeTab, setActiveTab] = useState("cursos");
  const observerRef = useRef(null);
  const tabBarRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll(".pf-fade:not(.visible)").forEach((el) => {
        observerRef.current?.observe(el);
      });
    }, 50);
  }, [activeTab]);

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
        className="pf-hero celci-hero"
        style={{ backgroundImage: "url('/imagenes/celci_hero_equipo.jpg')" }}
      >
        <div className="pf-hero-overlay celci-hero-overlay" />

        <div className="pf-hero-inner celci-hero-inner">
          <img
            src="/imagenes/logo-celci.png"
            alt="Logo CELCI"
            className="celci-hero-logo"
          />
          <h1 className="pf-hero-title celci-hero-title">
            Centro de<br />
            <span className="celci-title-accent">Lenguas</span>{" "}
            <span className="celci-title-light">CELCI</span>
          </h1>
          <p className="pf-hero-sub">
            Cursos de idiomas para adultos, niños y jóvenes en la Facultad de Economía, Contaduría y Administración.
          </p>
        </div>

        {/* Stats bar */}
        <div className="pf-stats celci-stats">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat celci-stat">
              <span className="celci-stat-icon" style={{ color: "var(--navy)" }}>{s.icon}</span>
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COORDINADOR ── */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Te damos la bienvenida</div>
            <h2 className="pf-section-title">Coordinador del CELCI</h2>
          </div>
          <div className="df-wrap" style={{ padding: 0 }}>
            <div className="df-card df-card--in">
              <div className="df-img-col">
                <img
                  src="/imagenes/celci_coordinador.jpg"
                  alt="Dr. Juan"
                  className="df-img"
                />
                <div className="df-img-overlay" />
              </div>
              <div className="df-info-col">
                <span className="df-role-badge">Coordinador del CELCI</span>
                <h3 className="df-name">Dr. Juan</h3>
                <p className="df-desc">
                  "El CELCI les abre las puertas a un mundo sin fronteras. Aquí aprenderán inglés
                  con un enfoque práctico y vivencial, preparándose para participar en
                  intercambios, colaboraciones internacionales y oportunidades globales que
                  ampliarán su horizonte profesional y personal."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS NAVIGATION ── */}
      <div
        ref={tabBarRef}
        className="celci-tabbar"
      >
        <div className="pf-container celci-tabbar-inner">
          <nav aria-label="Secciones CELCI">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`celci-tab${activeTab === tab.id ? " celci-tab--active" : ""}`}
              >
                <span className="celci-tab-icon">{TAB_ICONS[tab.id]}</span>
                <span className="celci-tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── TAB: CURSOS ── */}
      {activeTab === "cursos" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Oferta académica</div>
              <h2 className="pf-section-title">Cursos disponibles</h2>
              <p className="pf-section-desc">Inglés, Francés, Italiano y Japonés para todos los perfiles y edades.</p>
            </div>

            <div className="celci-courses-grid">
              {cursos.map((c) => (
                <div key={c.title} className="celci-course-card" style={{ "--course-color": c.color, "--course-bg": c.bg }}>
                  <div className="celci-course-header" style={{ background: c.gradient }}>
                    <span className="celci-course-flag">{c.flag}</span>
                    <h3 className="celci-course-title">{c.title}</h3>
                    <span className="celci-course-age">{c.age}</span>
                  </div>
                  <div className="celci-course-body">
                    <ul className="celci-course-list">
                      {c.horarios.map((h) => (
                        <li key={h}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                    {c.note && (
                      <div className="celci-course-note">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                        </svg>
                        {c.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: COSTOS ── */}
      {activeTab === "costos" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container" style={{ maxWidth: 860 }}>
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Ciclo A-2025</div>
              <h2 className="pf-section-title">Costos de los cursos</h2>
              <p className="pf-section-desc">Precios vigentes con descuentos exclusivos para la comunidad FECA y UJED.</p>
            </div>

            <div className="celci-pricing-grid">
              {/* Card Inglés */}
              <div className="celci-pricing-card celci-pricing-featured">
                <div className="celci-pricing-lang">
                  <span style={{ color: "#e31313" }}><IconGlobe size={32} /></span>
                  <h3>Inglés</h3>
                </div>
                <div className="celci-pricing-amount">
                  <span className="celci-price-currency">$</span>
                  <span className="celci-price-num">1,700</span>
                </div>
              </div>

              {/* Card Otros idiomas */}
              <div className="celci-pricing-card">
                <div className="celci-pricing-lang celci-pricing-lang--multi">
                  <div className="celci-flags-row" style={{ color: "var(--text)" }}>
                    <IconGlobe size={28} />
                  </div>
                  <h3>Francés, Italiano y Japonés</h3>
                </div>
                <div className="celci-pricing-amount celci-pricing-amount--alt">
                  <span className="celci-price-currency">$</span>
                  <span className="celci-price-num">1,700</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: INSCRIPCIÓN ── */}
      {activeTab === "inscripcion" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container" style={{ maxWidth: 860 }}>
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Trámite</div>
              <h2 className="pf-section-title">Proceso de inscripción</h2>
              <p className="pf-section-desc">Sigue estos sencillos pasos para asegurar tu lugar en el grupo de tu elección.</p>
            </div>

            {/* Steps */}
            <div className="celci-steps">
              {steps.map((step, i) => (
                <div key={step.n} className="celci-step">
                  <div className="celci-step-num">{step.n}</div>
                  <div className="celci-step-connector" style={{ visibility: i < steps.length - 1 ? "visible" : "hidden" }} />
                  <div className="celci-step-body">
                    <h3 className="celci-step-title">{step.title}</h3>
                    <p className="celci-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pf-info-box" style={{ marginTop: 40 }}>
              <h3>¿Tienes dudas sobre tu inscripción?</h3>
              <p>Comunícate al Centro de Lenguas y Competitividad Internacional o acude directamente a las instalaciones de la Facultad. Nuestro equipo te orientará sobre horarios disponibles, costos, requisitos y grupos abiertos.</p>
              <div className="pf-chips" style={{ marginTop: 16 }}>
                <span className="pf-chip">Modalidad presencial</span>
                <span className="pf-chip">Ciclo A-2025</span>
                <span className="pf-chip">Atención en oficinas</span>
              </div>
            </div>

            <div className="pf-contact-list" style={{ marginTop: 24 }}>
              <a href="tel:8271365" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Teléfono</span><span className="pf-contact-value">827-13-65 ext. 5725</span></div>
              </a>
              <a href="mailto:celci.feca@ujed.mx" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">celci.feca@ujed.mx</span></div>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: PREGUNTAS ── */}
      {activeTab === "preguntas" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container" style={{ maxWidth: 820 }}>
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Ayuda</div>
              <h2 className="pf-section-title">Preguntas frecuentes</h2>
              <p className="pf-section-desc">Respuestas rápidas a las dudas más comunes del Centro de Lenguas.</p>
            </div>
            <div className="faq-lista">
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: CONTACTO ── */}
      {activeTab === "contacto" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container" style={{ maxWidth: 720 }}>
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Informes</div>
              <h2 className="pf-section-title">Ubicación y contacto</h2>
            </div>
            <div className="pf-contact-list">
              <div className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className="pf-contact-label">Dirección</span>
                  <span className="pf-contact-value">Fanny Anitua y Privada de Loza s/n · C.P. 34000 Durango, Dgo., México</span>
                </div>
              </div>
              <a href="tel:8271365" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Teléfono</span><span className="pf-contact-value">827-13-65 ext. 5725</span></div>
              </a>
              <a href="mailto:celci.feca@ujed.mx" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Correo</span><span className="pf-contact-value">celci.feca@ujed.mx</span></div>
              </a>
              <a href="https://facebook.com/CLI.FECA.UJED" target="_blank" rel="noreferrer" className="pf-contact-item">
                <div className="pf-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <div><span className="pf-contact-label">Facebook</span><span className="pf-contact-value">facebook/CLI.FECA.UJED</span></div>
              </a>
            </div>

          </div>
        </section>
      )}

      {activeTab === "equipo" && (
        <section className="pf-section pf-section-light pf-fade">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Nuestra gente</div>
              <h2 className="pf-section-title">Equipo del CELCI</h2>
              <p className="pf-section-desc">
                El equipo docente y administrativo que hace posible la formación en lenguas de la FECA.
              </p>
            </div>
            <div className="cesa-team-grid" style={{ maxWidth: 780, margin: "0 auto" }}>
              <div className="cesa-team-card">
                <div className="cesa-team-avatar">
                  <img src="/imagenes/celci_coordinador.jpg" alt="Dr. Juan" />
                </div>
                <h3 className="cesa-team-name">Dr. Juan</h3>
                <span className="cesa-team-role cesa-team-role-lead">Coordinador del CELCI</span>
              </div>
              <div className="cesa-team-card">
                <div className="cesa-team-avatar">
                  <img src="/imagenes/celci_equipo_1.jpg" alt="Mtra. Fernanda López" />
                </div>
                <h3 className="cesa-team-name">Mtra. Fernanda López</h3>
                <span className="cesa-team-role">Instructora de Inglés</span>
              </div>
              <div className="cesa-team-card">
                <div className="cesa-team-avatar">
                  <img src="/imagenes/celci_equipo_2.jpg" alt="Mtra. Rosa Elena Vargas" />
                </div>
                <h3 className="cesa-team-name">Mtra. Rosa Elena Vargas</h3>
                <span className="cesa-team-role">Coordinadora Administrativa</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default LenguasPage;
