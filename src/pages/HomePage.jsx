import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const heroSlides = [
  {
    image: "/imagenes/inicio.png",
    logo: "/imagenes/LOGO_FECA PNG.png",
    logoAlt: "Logo FECA",
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
      "Programa con vinculación académica, proyectos aplicados y desarrollo de investigación para perfiles de alto nivel.",
    image: "/imagenes/aniversario.jpeg",
    duration: "6 años",
    mode: "Presencial",
    href: "https://posgradofeca.ujed.mx/",
  },
  {
    title: "CELCI",
    description:
      "Desarrolla soluciones tecnológicas de alto impacto con enfoque en inteligencia artificial y ciberseguridad.",
    image: "/imagenes/inicio.png",
    duration: "4 años",
    mode: "Presencial",
    href: "#/celci",
  },
  {
    title: "CIIEDO",
    description:
      "Forma líderes empresariales con visión estratégica, finanzas, marketing y habilidades directivas.",
    image: "/imagenes/CIIEDO.jpeg",
    duration: "4 años",
    mode: "Presencial / En línea",
    href: "#/ciiedo",
  },
];

const careers = [
  {
    tag: "Economía",
    title: "Licenciatura en Economía",
    description:
      "Forma especialistas capaces de estudiar mercados, políticas públicas, finanzas y desarrollo regional con análisis de datos y pensamiento crítico.",
    image: "/imagenes/cafeteria.jpeg",
    href: "#/economia",
    points: [
      "Duración aproximada: 4 años",
      "Modalidad presencial",
      "Campo laboral: análisis económico, sector público, consultoría y finanzas",
    ],
  },
  {
    tag: "Contabilidad",
    title: "Licenciatura en Contabilidad",
    description:
      "Prepara profesionales para interpretar información financiera, realizar auditorías, cumplir obligaciones fiscales y apoyar decisiones empresariales.",
    image: "/imagenes/aniversario.jpeg",
    href: "#/contabilidad",
    points: [
      "Duración aproximada: 4 años",
      "Modalidad presencial",
      "Campo laboral: auditoría, impuestos, finanzas, costos y contraloría",
    ],
  },
  {
    tag: "Administración",
    title: "Licenciatura en Administración",
    description:
      "Desarrolla habilidades para planear, organizar y dirigir empresas, proyectos y equipos con enfoque estratégico, innovador y humano.",
    image: "/imagenes/goffyymikimause.jpg",
    href: "#/administracion",
    points: [
      "Duración aproximada: 4 años",
      "Modalidad presencial",
      "Campo laboral: dirección, recursos humanos, emprendimiento y gestión de proyectos",
    ],
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

const teachers = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Dirección FECA",
    years: "Gestión institucional",
    focus: "Liderazgo académico",
    description:
      "Liderando el desarrollo académico y administrativo de la facultad",
    image: "/imagenes/director.jpeg",
    profile: "#/directores",
  },
  {
    name: "Dr. Iván",
    role: "CIIEDO",
    years: "Vinculación empresarial",
    focus: "Programas ejecutivos",
    description:
      "Impulsa CIIEDO con innovación empresarial, proyectos ejecutivos y equipos directivos.",
    image: "/imagenes/imagen.jpeg",
    profile: "#/directores",
  },
  {
    name: "Dr. Juan",
    role: "CELCI",
    years: "Formación internacional",
    focus: "Inglés práctico",
    description:
      "Fortalece CELCI con aprendizaje de inglés práctico y experiencias internacionales.",
    image: "/imagenes/cafeteria.jpeg",
    profile: "#/directores",
  },
  {
    name: "Dr. Luis",
    role: "Posgrado",
    years: "Investigación aplicada",
    focus: "Formación avanzada",
    description:
      "Impulsa posgrado con investigación aplicada y formación académica avanzada.",
    image: "/imagenes/aniversario.jpeg",
    profile: "#/directores",
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    years: "Gestión operativa",
    focus: "Excelencia institucional",
    description:
      "Fortalece la Secretaría Técnica con gestión interna y atención operativa.",
    image: "/imagenes/inicio.png",
    profile: "#/directores",
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

function HomePage({ logoImage, setNewsPanelOpen }) {
  const [heroCurrentSlide, setHeroCurrentSlide] = useState(0);
  const [trackIndex, setTrackIndex] = useState(2);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(2);
  const pausedRef = useRef(false);
  const hoverIntervalRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

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
      .querySelectorAll(".fade-up")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // 2 clones al inicio + 5 reales + 2 clones al final = 9 items
  // trackIndex real: 2-6, clones: 0-1 y 7-8
  const clonedTeachers = [
    teachers[3],
    teachers[4],
    ...teachers,
    teachers[0],
    teachers[1],
  ];

  const moveTo = (newIdx, animated) => {
    if (!trackRef.current) return;
    if (!animated && carouselRef.current) {
      carouselRef.current.classList.add("no-card-transition");
    }
    trackRef.current.style.transition = animated
      ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
      : "none";
    trackRef.current.style.transform = `translateX(calc(50% - 120px - ${newIdx * 338}px - 155px))`;
    trackIdxRef.current = newIdx;
    setTrackIndex(newIdx);
    if (!animated && carouselRef.current) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          carouselRef.current?.classList.remove("no-card-transition"),
        ),
      );
    }
  };

  const handleNext = () => moveTo(trackIdxRef.current + 1, true);
  const handlePrev = () => moveTo(trackIdxRef.current - 1, true);

  const handleTransitionEnd = () => {
    const idx = trackIdxRef.current;
    if (idx >= 7) moveTo(idx - 5, false);
    else if (idx <= 1) moveTo(idx + 5, false);
  };

  // Posición inicial sin animación
  useEffect(() => {
    moveTo(2, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay cada 3 segundos
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) moveTo(trackIdxRef.current + 1, true);
    }, 3000);
    return () => clearInterval(id);
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
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${heroCurrentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div
                key={slide.title ?? slide.logo ?? index}
                className={`carousel-slide ${index === heroCurrentSlide ? "is-active" : ""}${slide.logo ? " carousel-slide--anniversary" : ""}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
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

      <div className="statsbar fade-up">
        <div className="statsbar-inner">
          <div className="statsbar-item">
            <div className="statsbar-num">2,000+</div>
            <div className="statsbar-label">Alumnos activos</div>
          </div>
          <div className="statsbar-item">
            <div className="statsbar-num">+5</div>
            <div className="statsbar-label">Programas</div>
          </div>
          <div className="statsbar-item">
            <div className="statsbar-num">95%</div>
            <div className="statsbar-label">Empleabilidad</div>
          </div>
          <div className="statsbar-item">
            <div className="statsbar-num">68</div>
            <div className="statsbar-label">Años de excelencia</div>
          </div>
        </div>
      </div>

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
                <div className="program-card-img">
                  <img src={program.image} alt={program.title} />
                  <span className="program-level">Departamentos</span>
                </div>
                <div className="program-card-body">
                  <div className="program-card-title">{program.title}</div>
                  <div className="program-card-desc">{program.description}</div>
                  <div className="program-card-meta">
                    <span className="program-meta-item">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {program.duration}
                    </span>
                    <span className="program-meta-item">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {program.mode}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section careers-section" id="carreras">
        <div className="container">
          <div className="fade-up careers-heading">
            <div className="section-label">Carreras</div>
            <h2 className="section-title">Licenciaturas FECA</h2>
            <p className="section-desc">
              Conoce las carreras que forman profesionales preparados para
              analizar, dirigir y transformar organizaciones públicas y
              privadas.
            </p>
          </div>

          <div className="careers-grid fade-up">
            {careers.map((career) => (
              <a key={career.title} className="career-card" href={career.href}>
                <div className="career-img">
                  <img src={career.image} alt={career.title} />
                </div>
                <div className="career-body">
                  <span className="career-tag">{career.tag}</span>
                  <h3 className="career-title">{career.title}</h3>
                  <p className="career-desc">{career.description}</p>
                  <ul className="career-list">
                    {career.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
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

          <div className="highlights-grid fade-up">
            {highlights.map((highlight) => (
              <article key={highlight.title} className="highlight-card">
                <div className="highlight-icon">{highlight.icon}</div>
                <div className="highlight-title">{highlight.title}</div>
                <div className="highlight-desc">{highlight.description}</div>
              </article>
            ))}
          </div>

          <div className="fade-up teacher-carousel-heading" id="maestros">
            <div className="section-label">Nuestro equipo</div>
            <h3 className="section-title">Directores</h3>
            <p className="section-desc">
              Conoce al equipo que guía la vida académica, administrativa y de
              vinculación de nuestra facultad.
            </p>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="teacher-carousel fade-up"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div className="teacher-carousel-wrapper">
            <div
              ref={trackRef}
              className="teacher-carousel-track"
              onTransitionEnd={handleTransitionEnd}
            >
              {clonedTeachers.map((teacher, idx) => {
                const dist = idx - trackIndex;
                let statusClass = "";
                if (dist === 0) statusClass = "is-center";
                else if (dist === -1) statusClass = "is-prev";
                else if (dist === 1) statusClass = "is-next";
                else if (dist === -2) statusClass = "is-far-prev";
                else if (dist === 2) statusClass = "is-far-next";

                return (
                  <article
                    key={`${teacher.name}-${idx}`}
                    className={`teacher-card ${statusClass}`}
                    onClick={() => moveTo(idx, true)}
                  >
                    <div className="teacher-card-img">
                      <img src={teacher.image} alt={teacher.name} />
                      <div className="teacher-card-hover-overlay">
                        <h4 className="teacher-hover-name">{teacher.name}</h4>
                        <p className="teacher-hover-desc">
                          {teacher.description}
                        </p>
                      </div>
                    </div>
                    <div className="teacher-card-body">
                      <h4 className="teacher-card-name">{teacher.name}</h4>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="teacher-carousel-controls">
            <button
              type="button"
              className="teacher-arrow teacher-prev"
              aria-label="Anterior"
              onClick={handlePrev}
              onMouseEnter={() => {
                hoverIntervalRef.current = setInterval(handlePrev, 600);
              }}
              onMouseLeave={() => {
                clearInterval(hoverIntervalRef.current);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="teacher-arrow teacher-next"
              aria-label="Siguiente"
              onClick={handleNext}
              onMouseEnter={() => {
                hoverIntervalRef.current = setInterval(handleNext, 600);
              }}
              onMouseLeave={() => {
                clearInterval(hoverIntervalRef.current);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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

            <div className="campus-side">
              <a className="campus-mini" href="#/cafeteria">
                <img className="campus-mini-logo" src="/imagenes/cafeca.png" alt="CAFECA" />
                <div className="campus-mini-overlay">CAFECA</div>
              </a>
              <a className="campus-mini" href="#/cultura-campus">
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
          </div>

          <div className="admissions-banner fade-up">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
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
