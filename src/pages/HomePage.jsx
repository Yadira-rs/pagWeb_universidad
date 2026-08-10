import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import AnunciosCarousel from "../components/AnunciosCarousel";
import { supabase } from "../lib/supabaseClient";

// Se usa solo si todavía no hay diapositivas en la tabla hero_slides de
// Supabase (o si falla la consulta), para que el Inicio nunca se quede vacío.
const FALLBACK_HERO_SLIDES = [
  {
    image: "/imagenes/inicio.png",
    logo: "/imagenes/LOGO_FECA PNG.png",
    logoAlt: "Logo FECA",
    logoLightBg: true,
  },
  {
    image: "/imagenes/aniversario.jpeg",
    logo: "/imagenes/logo-68-aniversario.png",
    logoAlt: "Logo 68 aniversario FECA",
  },
];

const programs = [
  {
    title: "POSGRADO",
    description:
      "Formación académica de especialización, maestría y doctorado posterior a la licenciatura.",
    image: "/imagenes/logo-posgrado.png",
    href: "https://posgradofeca.ujed.mx/",
  },
  {
    title: "CELCI",
    description:
      "Cursos de idiomas para adultos, niños y jóvenes en la Facultad de Economía, Contaduría y Administración.",
    image: "/imagenes/logo-celci.png",
    href: "#/lenguas",
  },
  {
    title: "CIIEDO",
    description:
      "En CIIEDO te asesoramos, acompañamos y conectamos con oportunidades de innovación y emprendimiento.",
    image: "/imagenes/logo-ciiedo.png",
    href: "#/ciiedo",
  },
  {
    title: "CONTRALORÍA INTERNA",
    description:
      "Órgano de control interno de la FECA encargado de vigilar la transparencia, el uso correcto de los recursos y el cumplimiento de la normatividad institucional.",
    image: "/imagenes/contraloria_feca.png",
    imageClass: "program-card-img--photo",
    href: "#/servicios/contraloria-interna",
  },
];


const highlights = [
  {
    title: "Docentes con experiencia real",
    description:
      "El 80% de nuestros profesores trabajan activamente en la industria, trayendo casos reales al salón.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Movilidad internacional",
    description:
      "Convenios con más de 80 universidades en 25 países para intercambios académicos y prácticas profesionales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Tecnología de punta",
    description:
      "Laboratorios equipados con la última tecnología: IA, robótica, simuladores y espacios de innovación.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Red de egresados activa",
    description:
      "Conectamos a nuestros alumnos con una red de más de 40,000 egresados en empresas líderes del país y el mundo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const news = [
  {
    tag: "Logros",
    title:
      "La facultad fortalece su vinculación académica con nuevos proyectos de certificación y mejora continua.",
    date: "15 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Eventos",
    title:
      "Feria de empleo 2025: más de 80 empresas buscan talento universitario.",
    date: "10 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Investigación",
    title:
      "Equipos docentes y estudiantiles impulsan proyectos aplicados con impacto regional.",
    date: "3 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=900&q=80",
  },
];

const STATS_CFG = [
  { target: 2000, fmt: (n) => n.toLocaleString("es-MX") + "+", label: "Alumnos activos" },
  { target: 5,    fmt: (n) => "+" + n,                          label: "Programas" },
  { target: 95,   fmt: (n) => n + "%",                          label: "Empleabilidad" },
  { target: 68,   fmt: (n) => String(n),                        label: "Años de excelencia" },
];

function HomePage({ logoImage, setNewsPanelOpen }) {
  const [heroSlides, setHeroSlides] = useState(FALLBACK_HERO_SLIDES);
  const [heroCurrentSlide, setHeroCurrentSlide] = useState(0);
  const [counters, setCounters] = useState(STATS_CFG.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("hero_slides")
      .select("image_url, logo_url, logo_alt, logo_light_bg")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data || data.length === 0) {
          if (error) console.error("Error cargando carrusel de inicio:", error);
          return;
        }
        setHeroSlides(
          data.map((row) => ({
            image: row.image_url,
            logo: row.logo_url,
            logoAlt: row.logo_alt,
            logoLightBg: row.logo_light_bg,
          })),
        );
        setHeroCurrentSlide(0);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [heroCurrentSlide, heroSlides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".fade-up, .fade-left, .fade-right, .zoom-in")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1800;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCounters(STATS_CFG.map((s) => Math.floor(s.target * ease)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="home"
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="hero">
        <div className="carousel" aria-label="Carrusel de aniversario FECA">
          <div className="carousel-track">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.title ?? slide.logo ?? index}
                className={`carousel-slide ${index === heroCurrentSlide ? "is-active" : ""}${slide.logo ? " carousel-slide--anniversary" : ""}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                {slide.logoLightBg ? <div className="hero-logo-light-wrap" /> : null}
                <div className="carousel-slide-content">
                  {slide.logo ? (
                    <img
                      className="anniversary-hero-logo"
                      src={slide.logo}
                      alt={slide.logoAlt}
                    />
                  ) : (
                    <>
                      {slide.badge ? (
                        <div className="carousel-badge">{slide.badge}</div>
                      ) : null}
                      <h1 className="hero-title">
                        {slide.titleLines
                          ? slide.titleLines.map((line, lineIndex) => (
                              <span key={line}>
                                {line}
                                {lineIndex < slide.titleLines.length - 1 ? (
                                  <br />
                                ) : null}
                              </span>
                            ))
                          : slide.title}
                      </h1>
                      <p className="hero-desc">{slide.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === heroCurrentSlide ? "active" : ""}`}
                type="button"
                aria-label={`Slide ${index + 1}`}
                onClick={() => setHeroCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="statsbar" ref={statsRef}>
        <div className="statsbar-inner">
          {STATS_CFG.map((s, i) => (
            <div key={s.label} className="statsbar-item">
              <div className="statsbar-num">{s.fmt(counters[i])}</div>
              <div className="statsbar-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <AnunciosCarousel />

      <section className="section" id="departamentos">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Oferta académica</div>
            <h2 className="section-title">Departamentos</h2>
            <p className="section-desc">
              Nuestros programas combinan teoría sólida con práctica
              profesional, impulsados por tecnología y vinculación empresarial.
            </p>
          </div>

          <div className="programs-grid fade-up">
            {programs.map((program) => (
              <a
                key={program.title}
                className="program-card"
                href={program.href}
              >
                <div className={`program-card-img${program.imageClass ? ` ${program.imageClass}` : ""}`}>
                  <img src={program.image} alt={program.title} />
                  <span className="program-level">Departamentos</span>
                </div>
                <div className="program-card-body">
                  <div className="program-card-title">{program.title}</div>
                  <div className="program-card-desc">{program.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="licenciaturas-showcase" id="carreras">
        <div className="container">
          <div className="licenciaturas-content fade-left">
            <div className="section-label">Oferta Educativa</div>
            <h2 className="section-title">Licenciaturas</h2>
            <p className="section-desc">
              Formamos profesionales en Contaduría, Administración y Economía con visión estratégica y compromiso social.
            </p>
          </div>
          <div className="licenciaturas-cta-wrap fade-right">
            <a href="#/licenciaturas" className="licenciaturas-cta">
              Conoce nuestras licenciaturas
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className="licenciaturas-img-strip zoom-in">
            <div className="licenciaturas-img-item" style={{ backgroundImage: "url('/imagenes/aniversario.jpeg')" }}>
<div className="licenciaturas-img-label">Contador Público</div>
            </div>
            <div className="licenciaturas-img-item" style={{ backgroundImage: "url('/imagenes/feca-entrada.jpg')" }}>
<div className="licenciaturas-img-label">Licenciado en Administración</div>
            </div>
            <div className="licenciaturas-img-item" style={{ backgroundImage: "url('/imagenes/feca-plaza-1.jpg')" }}>
<div className="licenciaturas-img-label">Lic. en Economía y Negocios Internacionales</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Por qué elegirnos</div>
            <h2 className="section-title">
              Una experiencia
              <br />
              educativa completa
            </h2>
          </div>

          <div className="highlights-grid">
            {highlights.map((highlight) => (
              <article key={highlight.title} className="highlight-card fade-up">
                <div className="highlight-icon">{highlight.icon}</div>
                <div className="highlight-title">{highlight.title}</div>
                <div className="highlight-desc">{highlight.description}</div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Vida universitaria</div>
            <h2 className="section-title">
              Un campus que
              <br />
              inspira cada día
            </h2>
            <p className="section-desc">
              Más de 40 hectáreas de espacios diseñados para el aprendizaje, la
              convivencia y el deporte.
            </p>
          </div>

          <div className="campus-grid fade-up">
            <a className="campus-main" href="#/campus-central">
              <img src="/imagenes/aniversario.jpeg" alt="Campus central" />
              <div className="campus-main-overlay">
                <h3>Campus central</h3>
                <p>
                  Biblioteca, auditorio, laboratorios y áreas verdes en un
                  entorno ideal para estudiar
                </p>
              </div>
            </a>

            <a className="campus-main" href="#/cultura-campus">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=75"
                alt="Cultura"
              />
              <div className="campus-main-overlay">
                <h3>Cultura y actividades extracurriculares</h3>
                <p>
                  Espacios de convivencia, arte, deporte y crecimiento
                  personal para toda la comunidad
                </p>
              </div>
            </a>
          </div>

          <div className="admissions-banner zoom-in">
            <div>
              <h2>¿Listo para dar el siguiente paso?</h2>
              <p>
                Proceso de admisión sencillo y en línea. Resultados en menos de
                72 horas.
              </p>
            </div>
            <a href="#/solicitud" className="btn-primary">
              Iniciar mi solicitud
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Mural institucional */}
      <section className="mural-section fade-up">
        <div className="mural-content">
          <div className="mural-eyebrow">
            <span className="mural-badge-dot" />
            Orgullo FECA &nbsp;·&nbsp; Reconocimiento
          </div>
          <h2 className="mural-title">Muro de la<br />Calidad Institucional</h2>
          <p className="mural-desc">
            Representa el compromiso permanente de la FECA con la excelencia académica.
            Muestra las certificaciones y acreditaciones nacionales e internacionales
            otorgadas por organismos de alto prestigio a lo largo de nuestra historia.
          </p>
          <div className="mural-info-grid">
            <article className="mural-info-card">
              <span className="mural-org-mark">CIEES</span>
              <h3>Evaluación académica</h3>
              <p>
                Los Comités Interinstitucionales para la Evaluación de la Educación Superior reconocen programas que cumplen criterios de calidad, pertinencia y mejora continua.
              </p>
            </article>
            <article className="mural-info-card">
              <span className="mural-org-mark">CACECA</span>
              <h3>Acreditación especializada</h3>
              <p>
                El Consejo de Acreditación en Ciencias Administrativas, Contables y Afines avala la calidad de programas en las áreas económico-administrativas.
              </p>
            </article>
            <article className="mural-info-card">
              <span className="mural-org-mark">CACSLA</span>
              <h3>Acreditación internacional</h3>
              <p>
                El Consejo de Acreditación en Ciencias Sociales Latinoamericano certifica programas con estándares de calidad reconocidos en la región.
              </p>
            </article>
            <article className="mural-info-card">
              <span className="mural-org-mark">ANFECA RSU</span>
              <h3>Responsabilidad social universitaria</h3>
              <p>
                La Asociación Nacional de Facultades y Escuelas de Contaduría y Administración distingue a la facultad por su compromiso con la comunidad y el entorno.
              </p>
            </article>
            <article className="mural-info-card">
              <span className="mural-org-mark">CONACYT</span>
              <h3>Calidad en posgrado</h3>
              <p>
                El Consejo Nacional de Ciencia y Tecnología reconoce a nuestros posgrados dentro del Programa Nacional de Posgrados de Calidad.
              </p>
            </article>
          </div>
        </div>

        <div className="mural-image-col">
          <img src="/imagenes/mural.jfif" alt="Muro de la Calidad Institucional FECA" className="mural-img" />
        </div>
      </section>

      <section className="section section-alt feca-store-wrapper fade-up">
        <div className="feca-store-section">
          <div className="feca-store-inner">
            <article className="feca-store-card">
              <div className="feca-store-logo-wrap">
                <img src="/imagenes/feca_store.png" alt="FECA Store" className="feca-store-logo" />
              </div>
              <div className="feca-store-content">
                <div className="section-label feca-store-label">Tienda oficial</div>
                <h2 className="feca-store-title">Lleva la FECA contigo</h2>
                <p className="feca-store-desc">
                  Encuentra playeras, sudaderas, accesorios y más con el sello oficial de la Facultad de Economía, Contaduría y Administración.
                </p>
                <a
                  href="https://fecastore.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="feca-store-btn"
                >
                  Visitar FECA Store
                </a>
              </div>
            </article>

            <article className="feca-store-card">
              <div className="feca-store-logo-wrap feca-store-logo-wrap--photo">
                <img src="/imagenes/cafeca.png" alt="CAFECA" className="feca-store-logo feca-store-logo--cafeca" />
              </div>
              <div className="feca-store-content">
                <div className="section-label feca-store-label">CAFECA</div>
                <h2 className="feca-store-title">Sabores para tu día</h2>
                <p className="feca-store-desc">
                  Disfruta alimentos, bebidas y un espacio cómodo para convivir entre clases dentro de la facultad.
                </p>
                <a href="#/cafeteria" className="feca-store-btn">
                  Ver CAFECA
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
