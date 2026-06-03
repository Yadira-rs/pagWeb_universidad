import { useEffect, useRef, useState } from "react";

const heroSlides = [
  {
    image: "/imagenes/inicio.png",
    titleLines: ["Por una cultura", "de", "innovación y emprendimiento"],
    description:
      "Formamos profesionales con visión global, preparados para liderar en un mundo en constante cambio.",
  },
  {
    image: "/imagenes/aniversario.jpeg",
    logo: "/imagenes/logo-68-aniversario.png",
    logoAlt: "Logo 68 aniversario FECA",
  },
];

const programs = [
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
    image: "/imagenes/imagen.jpeg",
    duration: "4 años",
    mode: "Presencial / En linea",
    href: "#/ciiedo",
  },
  {
    title: "POSGRADO",
    description:
      "Programa con vinculación académica, proyectos aplicados y desarrollo de investigación para perfiles de alto nivel.",
    image: "/imagenes/aniversario.jpeg",
    duration: "6 años",
    mode: "Presencial",
    href: "#/posgrado",
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
      "La facultad fortalece su vinculacion academica con nuevos proyectos de certificacion y mejora continua.",
    date: "15 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Eventos",
    title: "Feria de empleo 2025: mas de 80 empresas buscan talento universitario.",
    date: "10 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Investigacion",
    title:
      "Equipos docentes y estudiantiles impulsan proyectos aplicados con impacto regional.",
    date: "3 de mayo, 2025",
    image:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=900&q=80",
  },
];

function HomePage({ logoImage, setNewsPanelOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroCurrentSlide, setHeroCurrentSlide] = useState(0);
  const [trackIndex, setTrackIndex] = useState(2);
  const [hasTransition, setHasTransition] = useState(true);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const menu = document.getElementById("mobile-menu");
      const trigger = document.querySelector(".hamburger");
      if (!menu || !trigger) return;

      if (!menu.contains(event.target) && !trigger.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
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

    document.querySelectorAll(".fade-up").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const clonedTeachers = [
    teachers[teachers.length - 2],
    teachers[teachers.length - 1],
    ...teachers,
    teachers[0],
    teachers[1],
  ];

  const handleNext = () => {
    setHasTransition(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setHasTransition(true);
    setTrackIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (trackIndex >= 7) {
      setHasTransition(false);
      setTrackIndex(2);
    } else if (trackIndex <= 1) {
      setHasTransition(false);
      setTrackIndex(6);
    }
  };

  const handleCardClick = (idx) => {
    if (idx !== trackIndex) {
      setHasTransition(true);
      setTrackIndex(idx);
    }
  };

  useEffect(() => {
    if (autoplayPaused) return;
    const intervalId = setInterval(() => {
      setTrackIndex((prev) => prev + 1);
      setHasTransition(true);
    }, 4800);
    return () => clearInterval(intervalId);
  }, [autoplayPaused]);

  return (
    <div className="site-shell">
      <div className={`topbar${scrolled ? " topbar-hidden" : ""}`}>
        <div className="topbar-inner">
          <div className="brand-header">
            <div className="logo-emblem">
              <img src={logoImage} alt="UJED logo" />
            </div>
            <div>
              <div className="brand-title">UJED</div>
              <div className="brand-subtitle">
                Universidad Juarez del Estado de Durango
              </div>
            </div>
          </div>
          <div className="feca-title">
            Facultad de Economia, Contaduria y Administracion
          </div>
        </div>
      </div>

      <nav className={`navbar${scrolled ? " navbar-top" : ""}`}>
        <div className="navbar-inner">
          <a href="#/" className="logo">
            <img
              className="navbar-ujed-logo"
              src="/imagenes/logo-ujed-horizontal-2024.png"
              alt="UJED logo"
            />
          </a>

          <div className="nav-links">
            <div className="nav-item active">
              <a href="#/">Inicio</a>
            </div>
            <div className="nav-item">
              <a href="#/administracion">
                Oferta Educativa
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/administracion">Licenciaturas</a>
                <a href="#/posgrado">Posgrado</a>
                <a href="#/celci">CELCI</a>
                <a href="#/ciiedo">CIIEDO</a>
                <a href="#/servicios">Servicios</a>
                <a href="#/bolsa-de-trabajo">Bolsa de trabajo</a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#/servicios">
                Servicios
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/servicios/servicios-escolares">Servicios escolares</a>
                <a href="#/servicios/servicio-social">Servicio social</a>
                <a href="#/servicios/practicas-profesionales">
                  Prácticas profesionales
                </a>
                <a href="#/bolsa-de-trabajo">Bolsa de trabajo</a>
                <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
                  Registro de egresados
                </a>
              </div>
            </div>
            <div className="nav-item">
              <a href="#/historia">
                Nosotros
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/historia">Historia</a>
                <a href="#/mision-vision">Mision y vision</a>
                <a href="#/nosotros/valores">Valores</a>
                <a href="#/nosotros/politicas">Politicas</a>
                <a href="#/nosotros/ejes-rectores">Ejes rectores</a>
                <a href="#/nosotros/marco-normativo">Marco normativo</a>
              </div>
            </div>
          </div>

          <form className="nav-search" onSubmit={(event) => event.preventDefault()}>
            <input
              type="search"
              name="q"
              placeholder="Buscar programas, carreras o servicios"
            />
            <button type="submit">Buscar</button>
          </form>

          <button
            type="button"
            className="nav-panel-button"
            aria-label="Abrir ultimas noticias"
            onClick={() => setNewsPanelOpen((current) => !current)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
          </button>

          <button
            type="button"
            className="hamburger"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            id="mobile-menu"
            className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
          >
            <a href="#/">Inicio</a>
            <a href="#/administracion">Oferta educativa</a>
            <a href="#/servicios">Servicios</a>
            <a href="#/historia">Nosotros</a>
          </div>
        </div>
      </nav>

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
                        {slide.titleLines ? (
                          slide.titleLines.map((line, lineIndex) => (
                            <span key={line}>
                              {line}
                              {lineIndex < slide.titleLines.length - 1 ? <br /> : null}
                            </span>
                          ))
                        ) : (
                          slide.title
                        )}
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
            <div className="statsbar-label">AÃ±os de excelencia</div>
          </div>
        </div>
      </div>

      <section className="section" id="departamentos">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Oferta academica</div>
            <h2 className="section-title">Departamentos</h2>
            <p className="section-desc">
              Nuestros programas combinan teoria solida con practica profesional,
              impulsados por tecnologia y vinculacion empresarial.
            </p>
          </div>

          <div className="programs-grid fade-up">
            {programs.map((program) => (
              <a key={program.title} className="program-card" href={program.href}>
                <div className="program-card-img">
                  <img src={program.image} alt={program.title} />
                  <span className="program-level">Departamentos</span>
                </div>
                <div className="program-card-body">
                  <div className="program-card-title">{program.title}</div>
                  <div className="program-card-desc">{program.description}</div>
                  <div className="program-card-meta">
                    <span className="program-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {program.duration}
                    </span>
                    <span className="program-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <a href="#/administracion" className="btn-primary">
              Ver todos los programas
            </a>
          </div>
        </div>
      </section>

      <section className="section careers-section" id="carreras">
        <div className="container">
          <div className="fade-up careers-heading">
            <div className="section-label">Carreras</div>
            <h2 className="section-title">Licenciaturas FECA</h2>
            <p className="section-desc">
              Conoce las carreras que forman profesionales preparados para analizar,
              dirigir y transformar organizaciones publicas y privadas.
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
            <div className="section-label">Por que elegirnos</div>
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
          className="teacher-carousel fade-up"
          onMouseEnter={() => setAutoplayPaused(true)}
          onMouseLeave={() => setAutoplayPaused(false)}
        >
          <button
            type="button"
            className="teacher-scroll-down"
            aria-label="Bajar a la siguiente sección"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
          />

          <div className="teacher-carousel-wrapper">
            <div 
              className="teacher-carousel-track" 
              style={{
                "--track-index": String(trackIndex),
                "--track-transition": hasTransition ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
              }}
              onTransitionEnd={handleTransitionEnd}
            >
                {clonedTeachers.map((teacher, idx) => {
                  let statusClass = "";
                  if (idx === trackIndex) statusClass = "is-center";
                  else if (idx === trackIndex - 1) statusClass = "is-prev";
                  else if (idx === trackIndex + 1) statusClass = "is-next";
                  else if (idx === trackIndex - 2) statusClass = "is-far-prev";
                  else if (idx === trackIndex + 2) statusClass = "is-far-next";

                  return (
                    <article
                      key={`${teacher.name}-${idx}`}
                      className={`teacher-card ${statusClass}`}
                      onClick={() => handleCardClick(idx)}
                    >
                      <div className="teacher-card-img">
                        <img src={teacher.image} alt={teacher.name} />
                        <div className="teacher-card-hover-overlay">
                          <p className="teacher-hover-desc">{teacher.description}</p>
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
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button 
                type="button" 
                className="teacher-arrow teacher-next" 
                aria-label="Siguiente"
                onClick={handleNext}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
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
              inspira cada dia
            </h2>
            <p className="section-desc">
              Mas de 40 hectareas de espacios disenados para el aprendizaje, la
              convivencia y el deporte.
            </p>
          </div>

          <div className="campus-grid fade-up">
            <a className="campus-main" href="#/campus-central">
              <img src="/imagenes/aniversario.jpeg" alt="Campus central" />
              <div className="campus-main-overlay">
                <h3>Campus central</h3>
                <p>
                  Biblioteca, auditorio, laboratorios y areas verdes en un entorno
                  ideal para estudiar
                </p>
              </div>
            </a>

            <div className="campus-side">
              <a className="campus-mini" href="#/cafeteria">
                <img src="/imagenes/cafeteria.jpeg" alt="Cafeteria" />
                <div className="campus-mini-overlay">Cafeteria</div>
              </a>
              <a className="campus-mini" href="#/cultura-campus">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=75"
                  alt="Cultura"
                />
                <div className="campus-mini-overlay">
                  Cultura y actividades extracurriculares
                </div>
              </a>
            </div>
          </div>

          <div className="admissions-banner fade-up">
            <div>
              <h2>Listo para dar el siguiente paso?</h2>
              <p>Proceso de admision sencillo y en linea. Resultados en menos de 72 horas.</p>
            </div>
            <a href="#/solicitud" className="btn-primary">
              Iniciar mi solicitud
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="news-heading fade-up">
            <div>
              <div className="section-label">Noticias y eventos</div>
              <h2 className="section-title">Lo mas reciente</h2>
            </div>
            <a href="#" className="news-link">
              Ver todas las noticias
            </a>
          </div>

          <div className="news-grid fade-up">
            {news.map((item) => (
              <article key={item.title} className="news-card">
                <div className="news-card-img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="news-card-body">
                  <span className="news-tag">{item.tag}</span>
                  <div className="news-card-title">{item.title}</div>
                  <div className="news-card-date">{item.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-emblem footer-emblem">
                <img src={logoImage} alt="FECA" />
              </div>
              FECA
            </div>
            <p className="footer-about">
              Formando profesionales de excelencia desde 1958. Comprometidos con la
              innovacion, la investigacion y el desarrollo de Durango.
            </p>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="#">Fanny Anitua y Priv. Loza s/n, C.P. 34000., Durango, Dgo., Mexico</a>
              </li>
              <li>
                <a href="#">(618) 827-13-65</a>
              </li>
              <li>
                <a href="#">informes@universidad.edu.mx</a>
              </li>
              <li>
                <a href="#">Preguntas frecuentes</a>
              </li>
            </ul>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <img src="/imagenes/facebook.png" alt="Facebook" />
              </a>
              <a href="#" aria-label="X">
                <img src="/imagenes/x.png" alt="X" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/imagenes/instagram.jpg" alt="Instagram" />
              </a>
              <a href="#" aria-label="TikTok">
                <img src="/imagenes/tiktok.png" alt="TikTok" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Â© 2026 FECA. Todos los derechos reservados.</span>
          <div className="footer-bottom-links">
            <a href="#">Aviso de privacidad</a>
            <a href="#">Terminos de uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
