import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const identityCards = [
  {
    title: "Misión",
    text: "La misión del sistema bibliotecario de la universidad es apoyar a la docencia, la investigación y la difusión de la cultura, administrando los recursos informativos y brindando servicios bibliotecarios de excelencia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      </svg>
    ),
  },
  {
    title: "Visión",
    text: "El sistema bibliotecario será una organización líder capaz de atender todas las demandas de información de sus usuarios, ofreciendo asesorías permanentes para transformar la información en conocimiento.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: "Política de calidad",
    text: "La UJED está comprometida en ofrecer servicios académicos, de investigación, administrativos y culturales de calidad, eficientes y transparentes, con un proceso de mejora continua basado en ISO 9001:2015.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

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

      {/* ── IDENTIDAD ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Identidad institucional</div>
            <h2 className="pf-section-title pf-title-white">Misión, Visión y Calidad</h2>
            <p className="pf-section-desc pf-desc-white">
              Los principios que guían el servicio y la gestión de la Biblioteca FECA.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {identityCards.map((card) => (
              <div key={card.title} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{card.icon}</div>
                <h3 className="pf-card-title">{card.title}</h3>
                <p className="pf-card-desc">{card.text}</p>
              </div>
            ))}
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

      <Footer logoImage={logoImage} />
    </div>
  );
}
