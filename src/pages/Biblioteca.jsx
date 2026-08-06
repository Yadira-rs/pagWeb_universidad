import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const collections = [
  "Colección de consulta",
  "Colección de consulta general",
  "Colección UJED",
  "Colección Durango",
  "Colección Antigua",
];

const services = [
  "Préstamo interno",
  "Préstamo externo",
  "Préstamo interbibliotecario",
  "Área de cómputo",
  "Préstamo de cubículos",
  "Recursos digitales y libros electrónicos",
];

const digitalResources = [
  {
    title: "Investigación Económico Administrativa Aplicada",
    image: "/imagenes/qr1.png",
    alt: "Código QR 1 Biblioteca",
  },
  {
    title: "Gestión Financiera y Desarrollo Económico",
    image: "/imagenes/qr2.png",
    alt: "Código QR 2 Biblioteca",
  },
  {
    title: "Recursos digitales Biblioteca",
    image: "/imagenes/qr3.png",
    alt: "Código QR 3 Biblioteca",
  },
];

const STATS = [
  { num: "1973", label: "Año de apertura" },
  { num: "5", label: "Colecciones" },
  { num: "6", label: "Servicios disponibles" },
  { num: "ISO", label: "Calidad 9001:2015" },
];

export default function Biblioteca({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        style={{ backgroundImage: `url('/imagenes/imagen.jpeg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Biblioteca</h1>
          <p className="pf-hero-sub">
            Un espacio dedicado al conocimiento, la investigación y el acceso libre a la información para estudiantes y académicos de la FECA.
          </p>
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

      {/* ── RESPONSABLE ── */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Te damos la bienvenida</div>
            <h2 className="pf-section-title">Responsable de la Biblioteca</h2>
          </div>
          <div className="df-wrap" style={{ padding: 0 }}>
            <div className="df-card df-card--in">
              <div className="df-img-col">
                <img
                  src="/imagenes/guillermo_garza_biblioteca.jpg"
                  alt="Guillermo Garza Calderón"
                  className="df-img"
                />
                <div className="df-img-overlay" />
              </div>
              <div className="df-info-col">
                <span className="df-role-badge">Encargado de Biblioteca</span>
                <h3 className="df-name">Guillermo Garza Calderón</h3>
                <p className="df-desc">
                  "Bienvenidos a la Biblioteca de la FECA. Este es un espacio pensado para
                  acompañarlos en su formación académica: aquí encontrarán los materiales, el
                  apoyo y la atención necesarios para que su paso por la investigación y el
                  estudio sea siempre provechoso."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container bib-historia-grid">
          <div>
            <div className="pf-label">Origen</div>
            <h2 className="pf-section-title">Historia</h2>
            <p className="pf-section-desc" style={{ marginBottom: 20 }}>
              En el año de 1972, el C.P. Guillermo Garza Calderón entrega la dirección de la Escuela
              al C.P. Rubén Vargas Quiñones, llegando a un acto de gran importancia: la inauguración
              del nuevo edificio el 12 de junio de 1973.
            </p>
            <p className="pf-section-desc" style={{ marginBottom: 20 }}>
              El programa inició con una emotiva despedida del antiguo edificio, ubicado en el caserón
              de la UJED, después de la última clase impartida por el C.P. José Félix Rodríguez.
            </p>
            <p className="pf-section-desc">
              El nuevo edificio fue inaugurado por el Gobernador Ing. Alejandro Páez Urquidi, con la
              presencia del Rector Carlos Galindo y el Director Rubén Vargas Quiñones.
            </p>
          </div>
          <div>
            <img
              src="/imagenes/biblioteca_historica.png"
              alt="Biblioteca FECA histórica"
              style={{ width: "100%", borderRadius: 20, boxShadow: "0 20px 56px rgba(0,0,0,0.15)" }}
            />
          </div>
        </div>
      </section>

      {/* ── COLECCIONES Y SERVICIOS ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Recursos disponibles</div>
            <h2 className="pf-section-title">Colecciones y Servicios</h2>
            <p className="pf-section-desc">
              Aunque es una biblioteca compacta, cuenta con los recursos necesarios para apoyar el aprendizaje y la investigación académica.
            </p>
          </div>
          <div className="pf-cards-grid-2 pf-fade">
            {/* Colecciones */}
            <div className="pf-card pf-card-top">
              <div className="pf-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div className="pf-label" style={{ marginBottom: 4 }}>Acervo</div>
              <h3 className="pf-card-title">Colecciones</h3>
              <div className="pf-chips" style={{ marginTop: 8 }}>
                {collections.map((item) => (
                  <span key={item} className="pf-chip">{item}</span>
                ))}
              </div>
            </div>
            {/* Servicios */}
            <div className="pf-card pf-card-top">
              <div className="pf-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="pf-label" style={{ marginBottom: 4 }}>Atención</div>
              <h3 className="pf-card-title">Servicios disponibles</h3>
              <div className="pf-chips" style={{ marginTop: 8 }}>
                {services.map((item) => (
                  <span key={item} className="pf-chip">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECURSOS DIGITALES ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Recursos</div>
            <h2 className="pf-section-title">Biblioteca digital</h2>
            <p className="pf-section-desc">
              Accede a libros completos y material académico desde cualquier dispositivo escaneando los códigos QR.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {digitalResources.map((resource) => (
              <div key={resource.title} className="pf-card pf-card-top" style={{ alignItems: "center", textAlign: "center" }}>
                <h3 className="pf-card-title" style={{ textAlign: "center" }}>{resource.title}</h3>
                <img
                  src={resource.image}
                  alt={resource.alt}
                  style={{ width: 160, height: 160, objectFit: "contain", margin: "0 auto" }}
                />
                <p className="pf-card-desc" style={{ textAlign: "center" }}>Escanea el código QR para acceder al recurso digital.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPOSITORIO INSTITUCIONAL ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Consulta digital</div>
            <h2 className="pf-section-title">Repositorio Institucional UJED</h2>
            <p className="pf-section-desc">
              Este botón te dirige al sitio del <strong>Repositorio Institucional de la UJED</strong>{" "}
              (repositorio.ujed.mx), fuera de la página de la FECA. Ahí podrás consultar y descargar
              tesis, artículos y demás material académico digitalizado por la universidad.
            </p>
          </div>
          <div className="pf-hero-ctas" style={{ justifyContent: "center" }}>
            <a
              href="https://repositorio.ujed.mx/jspui/"
              target="_blank"
              rel="noreferrer"
              className="biblio-repo-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" /><path d="M10 14 21 3" />
              </svg>
              Ir al Repositorio Institucional UJED
            </a>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
