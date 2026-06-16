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
    image: "/imagenes/logo-posgrado.png",
    duration: "6 años",
    mode: "Presencial",
    href: "https://posgradofeca.ujed.mx/",
  },
  {
    title: "CELCI",
    description:
      "Desarrolla soluciones tecnológicas de alto impacto con enfoque en inteligencia artificial y ciberseguridad.",
    image: "/imagenes/logo-celci.png",
    imageClass: "program-card-img--celci",
    duration: "4 años",
    mode: "Presencial",
    href: "#/celci",
  },
  {
    title: "CIIEDO",
    description:
      "Forma líderes empresariales con visión estratégica, finanzas, marketing y habilidades directivas.",
    image: "/imagenes/logo-ciiedo.png",
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
    role: "Director FECA",
    area: "Gestión institucional",
    enfoque: "Liderazgo académico",
    description: "Liderando el desarrollo académico y administrativo de la facultad.",
    image: "/imagenes/director.jpeg",
    welcomeMessage:
      "Bienvenidos a la Facultad de Economía, Contaduría y Administración. Es un honor recibirlos en esta comunidad comprometida con la excelencia, la innovación y la formación de profesionistas que transformen su entorno. Aquí encontrarán el apoyo, los recursos y el ambiente necesarios para alcanzar sus metas.",
    education: [
      { degree: "Doctorado en Administración", institution: "UJED" },
      { degree: "Maestría en Gestión Pública", institution: "UNAM" },
      { degree: "Licenciatura en Administración", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Iván",
    role: "Director CIIEDO",
    area: "Vinculación empresarial",
    enfoque: "Programas ejecutivos",
    description: "Impulsa CIIEDO con innovación empresarial, proyectos ejecutivos y equipos directivos.",
    image: "/imagenes/imagen.jpeg",
    welcomeMessage:
      "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial. Les doy la bienvenida a un programa diseñado para desarrollar líderes capaces de tomar decisiones estratégicas con visión global y compromiso social.",
    education: [
      { degree: "Doctorado en Ciencias Económicas", institution: "UNAM" },
      { degree: "Maestría en Administración de Empresas", institution: "ITESM" },
      { degree: "Licenciatura en Economía", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Juan",
    role: "Director CELCI",
    area: "Formación internacional",
    enfoque: "Inglés práctico",
    description: "Fortalece CELCI con aprendizaje de inglés práctico y experiencias internacionales.",
    image: "/imagenes/cafeteria.jpeg",
    welcomeMessage:
      "El CELCI les abre las puertas a un mundo sin fronteras. Aquí aprenderán inglés con un enfoque práctico y vivencial, preparándose para participar en intercambios, colaboraciones internacionales y oportunidades globales que ampliarán su horizonte profesional y personal.",
    education: [
      { degree: "Doctorado en Lingüística Aplicada", institution: "UNAM" },
      { degree: "Maestría en Enseñanza del Inglés", institution: "BUAP" },
      { degree: "Licenciatura en Letras Inglesas", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Luis",
    role: "Director de Posgrado",
    area: "Investigación aplicada",
    enfoque: "Formación avanzada",
    description: "Impulsa posgrado con investigación aplicada y formación académica avanzada.",
    image: "/imagenes/aniversario.jpeg",
    welcomeMessage:
      "El posgrado de la FECA representa el nivel más alto de nuestra oferta académica. Los invito a ser parte de una comunidad de investigadores y especialistas que generan conocimiento con impacto real. Aquí su desarrollo académico no tiene límites.",
    education: [
      { degree: "Doctorado en Ciencias Contables", institution: "UNAM" },
      { degree: "Maestría en Finanzas", institution: "UJED" },
      { degree: "Licenciatura en Contabilidad", institution: "UJED" },
    ],
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    area: "Gestión operativa",
    enfoque: "Excelencia institucional",
    description: "Fortalece la Secretaría Técnica con gestión interna y atención operativa.",
    image: "/imagenes/inicio.png",
    welcomeMessage:
      "La Secretaría Técnica está aquí para garantizar que su experiencia en la FECA sea fluida, organizada y de calidad. Mi compromiso es brindarles el apoyo administrativo que necesitan para que puedan enfocarse plenamente en su formación académica.",
    education: [
      { degree: "Doctorado en Administración Pública", institution: "UJED" },
      { degree: "Maestría en Gestión Organizacional", institution: "IPN" },
      { degree: "Licenciatura en Administración", institution: "UJED" },
    ],
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
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(2);
  const pausedRef = useRef(false);
  const hoverIntervalRef = useRef(null);
  const selectedTeacherRef = useRef(null);

  const openModal = (teacher) => {
    selectedTeacherRef.current = teacher;
    setSelectedTeacher(teacher);
    window.history.pushState({ teacherModal: true }, "", window.location.hash);
  };

  const closeModal = () => {
    selectedTeacherRef.current = null;
    setSelectedTeacher(null);
    pausedRef.current = false;
  };

  useEffect(() => {
    const handlePop = () => {
      if (selectedTeacherRef.current) {
        selectedTeacherRef.current = null;
        setSelectedTeacher(null);
        pausedRef.current = false;
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

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

  useEffect(() => {
    moveTo(2, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="carousel-track">
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
                <div className={`program-card-img${program.imageClass ? ` ${program.imageClass}` : ""}`}>
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
            <h2 className="section-title">Licenciaturas</h2>
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
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
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
                    onClick={() => {
                      if (dist === 0) openModal(teacher);
                      else moveTo(idx, true);
                    }}
                  >
                    <div className="teacher-card-img">
                      <img src={teacher.image} alt={teacher.name} />
                      <div className="teacher-card-hover-overlay">
                        <h4 className="teacher-hover-name">{teacher.name}</h4>
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
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
              onMouseEnter={() => { hoverIntervalRef.current = setInterval(handlePrev, 600); }}
              onMouseLeave={() => { clearInterval(hoverIntervalRef.current); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="teacher-arrow teacher-next"
              aria-label="Siguiente"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
              onMouseEnter={() => { hoverIntervalRef.current = setInterval(handleNext, 600); }}
              onMouseLeave={() => { clearInterval(hoverIntervalRef.current); }}
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

      {selectedTeacher && (
        <div className="teacher-modal-overlay">
          <div className="teacher-modal">
            <button
              className="teacher-modal-close"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <div className="teacher-modal-media">
              <img src={selectedTeacher.image} alt={selectedTeacher.name} />
              <div className="teacher-modal-play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="teacher-modal-play-label">Próximamente</span>
              <div className="teacher-modal-media-overlay">
                <h2 className="teacher-modal-name">{selectedTeacher.name}</h2>
                <span className="teacher-modal-role-badge">{selectedTeacher.role}</span>
              </div>
            </div>

            <div className="teacher-modal-body">
              <div className="teacher-modal-welcome">
                <svg className="teacher-modal-quote-icon" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
                <p className="teacher-modal-welcome-text">{selectedTeacher.welcomeMessage}</p>
              </div>

              <div className="teacher-modal-section">
                <h3 className="teacher-modal-section-title">Formación académica</h3>
                <div className="teacher-modal-education">
                  {selectedTeacher.education.map((item, i) => (
                    <div key={i} className="teacher-modal-edu-item">
                      <span className="teacher-modal-edu-degree">{item.degree}</span>
                      <span className="teacher-modal-edu-institution">{item.institution}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="teacher-modal-meta">
                <div className="teacher-modal-meta-item">
                  <span className="teacher-modal-meta-label">Área</span>
                  <span className="teacher-modal-meta-value">{selectedTeacher.area}</span>
                </div>
                <div className="teacher-modal-meta-item">
                  <span className="teacher-modal-meta-label">Enfoque</span>
                  <span className="teacher-modal-meta-value">{selectedTeacher.enfoque}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
