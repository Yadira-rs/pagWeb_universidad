import { useState, useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import {
  IconSoccer, IconBasketball, IconVolleyball, IconChess, IconDance,
  IconTheatre, IconMusic, IconRocket, IconMic, IconTrendingUp, IconGlobe,
  IconTrophy, IconUsers, IconZap, IconStar,
  IconGraduationCap,
} from "../components/Icons";

const CATEGORIAS = ["Todos", "Deportes", "Arte y Cultura"];

// Formulario único de inscripción a grupos representativos (Extensión Universitaria).
const FORM_URL = "https://forms.gle/dRe4JxbEzKJ7u3GA9";

const ROJO = "linear-gradient(135deg,#6b0f18 0%,#e31313 100%)";
const ROJO_OSCURO = "linear-gradient(135deg,#4a0810 0%,#951823 100%)";
const ORO = "linear-gradient(135deg,#4a3818 0%,#a87f3d 100%)";
const ARENA = "linear-gradient(135deg,#5c4d32 0%,#b79a63 100%)";
const PIZARRA = "linear-gradient(135deg,#2f3a3a 0%,#5f7373 100%)";

const GRUPOS = [
  { id: 1,  categoria: "Deportes",       nombre: "Ajedrez",              icono: <IconChess size={34} />,      color: "#5f7373", gradient: PIZARRA },
  { id: 2,  categoria: "Arte y Cultura", nombre: "Rondalla",             icono: <IconMusic size={34} />,      color: "#e31313", gradient: ROJO },
  { id: 3,  categoria: "Arte y Cultura", nombre: "Escolta",              icono: <IconStar size={34} />,       color: "#951823", gradient: ROJO_OSCURO },
  { id: 4,  categoria: "Arte y Cultura", nombre: "Banda de guerra",      icono: <IconMusic size={34} />,      color: "#a87f3d", gradient: ORO },
  { id: 5,  categoria: "Deportes",       nombre: "Fútbol",               icono: <IconSoccer size={34} />,     color: "#e31313", gradient: ROJO,       mixto: true },
  { id: 6,  categoria: "Deportes",       nombre: "Voleibol",             icono: <IconVolleyball size={34} />, color: "#b79a63", gradient: ARENA,      mixto: true },
  { id: 7,  categoria: "Deportes",       nombre: "Básquetbol",           icono: <IconBasketball size={34} />, color: "#a87f3d", gradient: ORO,        mixto: true },
  { id: 8,  categoria: "Deportes",       nombre: "Club de boxeo",        icono: <IconZap size={34} />,        color: "#951823", gradient: ROJO_OSCURO },
  { id: 9,  categoria: "Deportes",       nombre: "Club de atletismo",    icono: <IconTrendingUp size={34} />, color: "#5f7373", gradient: PIZARRA },
  { id: 10, categoria: "Arte y Cultura", nombre: "Club de arte y cultura", icono: <IconTheatre size={34} />,  color: "#b79a63", gradient: ARENA },
];

const STATS = [
  { num: "10", label: "Grupos activos" },
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
    <div
      className="gr-card pf-fade"
      style={{ "--gr-glow": grupo.color, "--gr-color": grupo.color }}
    >
      <div className="gr-card-header" style={{ background: grupo.gradient }}>
        <span className="gr-card-cat">{grupo.categoria}</span>
        <div className="gr-card-emoji-ring">
          <span className="gr-card-emoji">{grupo.icono}</span>
        </div>
      </div>

      <div className="gr-card-body">
        <h3 className="gr-card-nombre">{grupo.nombre}</h3>
        {grupo.mixto && <span className="gr-card-tag">Varonil y femenil</span>}

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gr-card-btn"
        >
          Quiero unirme
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

          <p className="gr-nota-mixto">* Disciplina con rama varonil y femenil.</p>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default GruposPage;
