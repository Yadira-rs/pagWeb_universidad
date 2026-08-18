import { useState, useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import {
  IconSoccer, IconBasketball, IconVolleyball, IconChess, IconDance,
  IconTheatre, IconMusic, IconRocket, IconMic, IconTrendingUp, IconGlobe,
  IconTrophy, IconUsers, IconZap, IconStar, IconSparkles, IconMedal,
  IconGraduationCap, IconBook,
} from "../components/Icons";

const CATEGORIAS = ["Todos", "Deportes", "Arte y Cultura", "Académico"];

const GRUPOS = [
  {
    id: 1, categoria: "Deportes",
    nombre: "Fútbol Varonil", apodo: "Lobos FECA",
    descripcion: "Equipo representativo masculino de fútbol soccer. Participamos en los Juegos Universitarios UJED y torneos regionales.",
    icono: <IconSoccer size={34} />, color: "#e31313",
    gradient: "linear-gradient(135deg,#6b0f18 0%,#e31313 100%)",
    miembros: 22, logros: "2.° lugar Juegos UJED 2026",
    contacto: "futbol.varonil@feca.ujed.mx", destacado: true,
  },
  {
    id: 2, categoria: "Deportes",
    nombre: "Fútbol Femenil", apodo: "Lobas FECA",
    descripcion: "Equipo femenil de fútbol soccer con participación activa en torneos interfacultades y campeonatos estatales.",
    icono: <IconSoccer size={34} />, color: "#951823",
    gradient: "linear-gradient(135deg,#4a0810 0%,#951823 100%)",
    miembros: 18, logros: "Semifinalistas UJED 2025",
    contacto: "futbol.femenil@feca.ujed.mx",
  },
  {
    id: 3, categoria: "Deportes",
    nombre: "Basquetbol", apodo: "Águilas FECA",
    descripcion: "Equipo mixto de baloncesto. Entrenamos tres veces por semana y competimos en la liga interfacultades de la UJED.",
    icono: <IconBasketball size={34} />, color: "#a87f3d",
    gradient: "linear-gradient(135deg,#4a3818 0%,#a87f3d 100%)",
    miembros: 24, logros: "1.er lugar femenil UJED 2026",
    contacto: "basquetbol@feca.ujed.mx", destacado: true,
  },
  {
    id: 4, categoria: "Deportes",
    nombre: "Voleibol", apodo: "Rayo FECA",
    descripcion: "Equipo de voleibol varonil y femenil. Participamos en torneos universitarios y abiertos del estado de Durango.",
    icono: <IconVolleyball size={34} />, color: "#b79a63",
    gradient: "linear-gradient(135deg,#5c4d32 0%,#b79a63 100%)",
    miembros: 20, logros: "Participación Juegos UJED 2026",
    contacto: "voleibol@feca.ujed.mx",
  },
  {
    id: 5, categoria: "Deportes",
    nombre: "Ajedrez", apodo: "Club Estrategia FECA",
    descripcion: "Club de ajedrez para todos los niveles. Realizamos torneos internos, talleres de apertura y participamos en torneos abiertos.",
    icono: <IconChess size={34} />, color: "#5f7373",
    gradient: "linear-gradient(135deg,#2f3a3a 0%,#5f7373 100%)",
    miembros: 14, logros: "3.er lugar Torneo Estatal 2025",
    contacto: "ajedrez@feca.ujed.mx", nuevo: true,
  },
  {
    id: 6, categoria: "Arte y Cultura",
    nombre: "Danza Folklórica", apodo: "Ballet Folklórico FECA",
    descripcion: "Grupo de danza folklórica mexicana que representa a la facultad en festivales universitarios, culturales y eventos institucionales.",
    icono: <IconDance size={34} />, color: "#e31313",
    gradient: "linear-gradient(135deg,#6b0f18 0%,#e31313 100%)",
    miembros: 28, logros: "1.er lugar Festival UJED 2025",
    contacto: "danza@feca.ujed.mx", destacado: true,
  },
  {
    id: 7, categoria: "Arte y Cultura",
    nombre: "Teatro Universitario", apodo: "Compañía FECA Teatro",
    descripcion: "Grupo de teatro con obras de autores mexicanos e internacionales. Presentamos temporadas semestrales abiertas a toda la comunidad.",
    icono: <IconTheatre size={34} />, color: "#951823",
    gradient: "linear-gradient(135deg,#4a0810 0%,#951823 100%)",
    miembros: 16, logros: "Mejor obra Muestra UJED 2025",
    contacto: "teatro@feca.ujed.mx",
  },
  {
    id: 8, categoria: "Arte y Cultura",
    nombre: "Coro FECA", apodo: "Voces FECA",
    descripcion: "Coro universitario mixto con repertorio que incluye música folclórica, clásica y contemporánea. No se requiere experiencia previa.",
    icono: <IconMusic size={34} />, color: "#a87f3d",
    gradient: "linear-gradient(135deg,#4a3818 0%,#a87f3d 100%)",
    miembros: 32, logros: "Presentación Gala UJED 2026",
    contacto: "coro@feca.ujed.mx", nuevo: true,
  },
  {
    id: 9, categoria: "Académico",
    nombre: "Club de Emprendimiento", apodo: "StartUp FECA",
    descripcion: "Espacio para desarrollar ideas de negocio, participar en concursos de emprendimiento y conectar con mentores del sector empresarial.",
    icono: <IconRocket size={34} />, color: "#b79a63",
    gradient: "linear-gradient(135deg,#5c4d32 0%,#b79a63 100%)",
    miembros: 45, logros: "2 proyectos financiados en 2025",
    contacto: "startup@feca.ujed.mx", destacado: true,
  },
  {
    id: 10, categoria: "Académico",
    nombre: "Club de Debate", apodo: "Debate FECA",
    descripcion: "Practicamos técnicas de oratoria y debate competitivo. Participamos en torneos nacionales de debate universitario.",
    icono: <IconMic size={34} />, color: "#5f7373",
    gradient: "linear-gradient(135deg,#2f3a3a 0%,#5f7373 100%)",
    miembros: 20, logros: "Finalistas Torneo Nacional 2025",
    contacto: "debate@feca.ujed.mx", destacado: true,
  },
  {
    id: 11, categoria: "Académico",
    nombre: "Club de Finanzas", apodo: "Finance Club FECA",
    descripcion: "Análisis de mercados financieros, simulaciones de bolsa de valores y talleres de inversión personal para estudiantes de economía y administración.",
    icono: <IconTrendingUp size={34} />, color: "#e31313",
    gradient: "linear-gradient(135deg,#6b0f18 0%,#e31313 100%)",
    miembros: 38, logros: "Mejor Club Académico FECA 2025",
    contacto: "finanzas.club@feca.ujed.mx",
  },
  {
    id: 12, categoria: "Académico",
    nombre: "Club de Idiomas", apodo: "Languages FECA",
    descripcion: "Complementa al CELCI practicando inglés, francés y japonés de manera informal mediante conversaciones, películas y actividades culturales.",
    icono: <IconGlobe size={34} />, color: "#951823",
    gradient: "linear-gradient(135deg,#4a0810 0%,#951823 100%)",
    miembros: 27, logros: "Intercambio cultural con Japón 2025",
    contacto: "idiomas.club@feca.ujed.mx",
  },
];

const STATS = [
  { num: "12", label: "Grupos activos" },
  { num: "+280", label: "Estudiantes" },
  { num: "15+", label: "Torneos al año" },
  { num: "1958", label: "Tradición FECA" },
];

const BENEFICIOS = [
  {
    icon: <IconTrophy size={32} />,
    titulo: "Representa a la FECA",
    desc: "Compite a nombre de la facultad en torneos universitarios, estatales y nacionales.",
    grad: "linear-gradient(135deg,#b30000,#e31313)",
    bg: "rgba(227,19,19,0.07)",
  },
  {
    icon: <IconUsers size={32} />,
    titulo: "Haz comunidad",
    desc: "Conoce personas con tus mismos intereses y forma lazos que van más allá del salón de clases.",
    grad: "linear-gradient(135deg,#4a3818,#a87f3d)",
    bg: "rgba(168,127,62,0.08)",
  },
  {
    icon: <IconZap size={32} />,
    titulo: "Desarrolla habilidades",
    desc: "Liderazgo, trabajo en equipo, disciplina y creatividad que complementan tu formación profesional.",
    grad: "linear-gradient(135deg,#2f3a3a,#5f7373)",
    bg: "rgba(185,199,199,0.18)",
  },
];

function GrupoCard({ grupo }) {
  return (
    <div className="gr-card pf-fade" style={{ "--gr-glow": grupo.color }}>
      {grupo.destacado && (
        <div className="gr-badge gr-badge--star"><IconStar size={11} /> Destacado</div>
      )}
      {grupo.nuevo && !grupo.destacado && (
        <div className="gr-badge gr-badge--nuevo"><IconSparkles size={11} /> Nuevos cupos</div>
      )}

      <div className="gr-card-header" style={{ background: grupo.gradient }}>
        <div className="gr-card-emoji-ring">
          <span className="gr-card-emoji">{grupo.icono}</span>
        </div>
        <span className="gr-card-cat">{grupo.categoria}</span>
        <div className="gr-member-row">
          {Array.from({ length: Math.min(4, Math.floor(grupo.miembros / 6)) }).map((_, i) => (
            <div key={i} className="gr-avatar-dot" style={{ marginLeft: i === 0 ? 0 : -8 }} />
          ))}
          <span className="gr-member-count">{grupo.miembros} miembros</span>
        </div>
      </div>

      <div className="gr-card-body">
        <h3 className="gr-card-nombre">{grupo.nombre}</h3>
        <p className="gr-card-apodo" style={{ color: grupo.color }}>{grupo.apodo}</p>
        <p className="gr-card-desc">{grupo.descripcion}</p>
        <div className="gr-logro">
          <span className="gr-logro-ico"><IconMedal size={14} /></span>
          <span className="gr-logro-txt">{grupo.logros}</span>
        </div>
        {/* TODO(retroalimentación FECA): reemplazar este mailto por un link a Google Forms
            (solicitar la URL a Extensión Universitaria) cuando se tenga. */}
        <a
          href={`mailto:${grupo.contacto}`}
          className="gr-card-btn"
          style={{ "--gr-color": grupo.color }}
        >
          ¡Quiero unirme!
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function GruposPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [catActiva, setCatActiva] = useState("Todos");
  const observerRef = useRef(null);

  const gruposFiltrados = catActiva === "Todos"
    ? GRUPOS
    : GRUPOS.filter((g) => g.categoria === catActiva);

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
  }, [catActiva]);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute=""
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section className="pf-hero gr-hero">
        <div className="gr-hero-mesh" aria-hidden="true" />
        <div className="pf-hero-overlay gr-hero-overlay" />

        <div className="gr-hero-deco" aria-hidden="true">
          {[IconSoccer, IconTheatre, IconBasketball, IconDance, IconRocket, IconMusic, IconChess, IconTrendingUp, IconVolleyball, IconMic, IconGlobe, IconTrophy].map((Icon, i) => (
            <span key={i} className="gr-deco-icon" style={{ animationDelay: `${i * 0.55}s` }}><Icon size="1em" strokeWidth={1.5} /></span>
          ))}
        </div>

        <div className="pf-hero-inner" style={{ position: "relative", zIndex: 3 }}>
          <div className="gr-hero-pill"><IconGraduationCap size={14} /> Vida universitaria · FECA UJED</div>
          <h1 className="pf-hero-title gr-hero-title">
            Únete a algo<br />
            <span className="gr-title-gradient">extraordinario</span>
          </h1>
          <p className="pf-hero-sub gr-hero-sub">
            Deporte, arte, cultura y academia. Más de{" "}
            <strong>280 estudiantes</strong> ya forman parte de los grupos representativos.
          </p>
          {/* TODO(retroalimentación FECA): reemplazar estos mailto por un link a Google Forms
              (solicitar la URL a Extensión Universitaria) cuando se tenga. */}
          <div className="pf-hero-ctas">
            <a href="mailto:informes@feca.ujed.mx" className="pf-btn-primary gr-cta-main">
              Quiero participar ahora
            </a>
            <a href="#grupos-lista" className="pf-btn-outline">
              Ver grupos →
            </a>
          </div>
        </div>

        <div className="pf-stats gr-stats-bar">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat gr-stat">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── POR QUÉ UNIRSE ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">¿Por qué unirte?</div>
            <h2 className="pf-section-title">Más que estudiar,<br />vive la universidad</h2>
            <p className="pf-section-desc">
              Los grupos representativos son el corazón de la vida universitaria. Cada estudiante puede unirse, competir y crear recuerdos que duran toda la vida.
            </p>
          </div>
          <div className="gr-beneficios">
            {BENEFICIOS.map((b) => (
              <div
                key={b.titulo}
                className="gr-beneficio-card"
                style={{ "--gr-ben-grad": b.grad, "--gr-ben-bg": b.bg }}
              >
                <div className="gr-ben-icon-wrap">
                  <span className="gr-beneficio-icon">{b.icon}</span>
                </div>
                <h3>{b.titulo}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRUPOS ── */}
      <section id="grupos-lista" className="pf-section pf-section-alt">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Directorio completo</div>
            <h2 className="pf-section-title">Encuentra tu grupo</h2>
            <p className="pf-section-desc">Filtra por categoría y encuentra el espacio perfecto para ti.</p>
          </div>

          <div className="gr-filtros">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                className={`gr-filtro${catActiva === cat ? " gr-filtro--activo" : ""}`}
                onClick={() => setCatActiva(cat)}
              >
                {cat === "Deportes" && <IconSoccer size={14} />}
                {cat === "Arte y Cultura" && <IconTheatre size={14} />}
                {cat === "Académico" && <IconBook size={14} />}
                {cat}
                <span className="gr-filtro-count">
                  {cat === "Todos" ? GRUPOS.length : GRUPOS.filter(g => g.categoria === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="gr-grid">
            {gruposFiltrados.map((grupo) => (
              <GrupoCard key={grupo.id} grupo={grupo} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pf-section pf-section-dark gr-cta-section pf-fade">
        <div className="pf-container">
          <div className="gr-cta-banner">
            <div className="gr-cta-emojis" aria-hidden="true">
              <IconGraduationCap size={32} />
              <IconSparkles size={32} />
              <IconMedal size={32} />
            </div>
            <h2 className="pf-section-title pf-title-white">¿No encuentras tu grupo?</h2>
            <p className="pf-section-desc pf-desc-white">
              Si tienes una idea para un nuevo grupo representativo o quieres proponer una actividad, contáctanos. La FECA apoya la iniciativa estudiantil.
            </p>
            <div className="gr-cta-btns">
              <a href="mailto:informes@feca.ujed.mx" className="pf-btn-primary">
                Proponer un grupo nuevo
              </a>
              <a href="tel:6188271365" className="pf-btn-outline">
                Llamar a informes
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default GruposPage;
