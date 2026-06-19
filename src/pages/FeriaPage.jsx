import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const servicioSocialPartners = [
  { name: "CEDDU", image: "/imagenes/CEDDU.jpeg" },
  { name: "CIIEDO", image: "/imagenes/CIIEDO.jpg" },
  { name: "Coordinación de Investigación", image: "/imagenes/inicio.png" },
  { name: "DIF Municipal", image: "/imagenes/aniversario.jpeg" },
  { name: "Instituto Estatal de las Mujeres", image: "/imagenes/logo.png" },
  { name: "Instituto Municipal de la Mujer", image: "/imagenes/imagen.jpeg" },
];

const practicasProfesionales = [
  { name: "ARAUCO", image: "/imagenes/ARAUCO.jpg" },
  { name: "CEDDU", image: "/imagenes/CEDDU.jpeg" },
  { name: "CIIEDO", image: "/imagenes/CIIEDO.jpg" },
  { name: "Despacho Contable", image: "/imagenes/inicio.png" },
  { name: "NEUMATICS Tool", image: "/imagenes/aniversario.jpeg" },
  { name: "Jefatura de las Carreras", image: "/imagenes/logo.png" },
];

const programa = [
  {
    num: "01",
    title: "Inauguración y oferta de vacantes",
    date: "26 de agosto 2025 · 9:30 a.m.",
    place: "Patio cívico de la FECA",
    desc: "Horario de oferta de vacantes: 10:00 a.m. – 12:00 p.m.",
    note: "* Evento obligatorio para alumnos de 7mo, 8vo y 9no semestre.",
  },
  {
    num: "02",
    title: "Foro informativo",
    date: "26 de agosto 2025 · 12:00 hrs.",
    place: 'Auditorio "C.P. José Félix Rodríguez Frías"',
    desc: '"Los Servicios Sociales y la Experiencia Recepcional, requisitos, pasos a seguir y toda la información al respecto".',
    note: "* Foro obligatorio para alumnos de 1er semestre.",
  },
  {
    num: "03",
    title: "Explora el micrositio",
    date: "Todo el ciclo escolar",
    place: "Sitio web FECA",
    desc: "Consulta durante todo el ciclo las diversas vacantes ofertadas por entidades y empresas para Servicio Social y Experiencia Recepcional.",
    note: null,
  },
];

const STATS = [
  { num: "2025", label: "Edición" },
  { num: "12+", label: "Entidades participantes" },
  { num: "2", label: "Programas disponibles" },
  { num: "FECA", label: "Organizado por" },
];

function FeriaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
    <div className="site-shell feria-page">
      <Header
        logoImage={logoImage}
        currentRoute="feria"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('/imagenes/aniversario.jpeg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Micrositio 2025 · FECA</div>
          <h1 className="pf-hero-title">Feria del<br />Servicio Social</h1>
          <p className="pf-hero-sub">
            Programa 2025 para Servicio Social y Prácticas Profesionales en la Facultad de Economía, Contaduría y Administración.
          </p>
          <div className="pf-hero-ctas">
            <a href="#dinamica" className="pf-btn-primary">Ver programa</a>
            <a href="#servicio-social" className="pf-btn-outline">Entidades participantes</a>
          </div>
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

      {/* ── PROGRAMA ── */}
      <section id="dinamica" className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Programa de la feria</div>
            <h2 className="pf-section-title">
              Feria del Servicio Social y Experiencia Recepcional 2025
            </h2>
            <p className="pf-section-desc">
              Tres momentos clave del proceso que todo alumno de 7mo, 8vo y 9no semestre debe conocer.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="pf-fade">
            {programa.map((p) => (
              <div key={p.num} className="pf-info-box" style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700,
                  color: "rgba(192,0,12,0.12)", lineHeight: 1, flexShrink: 0, userSelect: "none",
                }}>
                  {p.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--navy)", margin: "0 0 8px" }}>
                    {p.title}
                  </h3>
                  <div className="pf-chips" style={{ marginTop: 0, marginBottom: 12 }}>
                    <span className="pf-chip">{p.date}</span>
                    <span className="pf-chip">{p.place}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
                  {p.note && (
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "#e31313", margin: "10px 0 0", fontWeight: 600 }}>{p.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIO SOCIAL ── */}
      <section id="servicio-social" className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Área de Servicio Social</div>
            <h2 className="pf-section-title pf-title-white">Entidades participantes</h2>
            <p className="pf-section-desc pf-desc-white">
              Conoce las instituciones y organizaciones que ofrecen vacantes para Servicio Social.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {servicioSocialPartners.map((item) => (
              <div key={item.name} className="pf-card pf-card-dark" style={{ padding: 0, overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "20px 22px" }}>
                  <h3 className="pf-card-title">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÁCTICAS PROFESIONALES ── */}
      <section id="practicas-profesionales" className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Experiencia Recepcional</div>
            <h2 className="pf-section-title">Prácticas Profesionales</h2>
            <p className="pf-section-desc">
              Consulta las empresas participantes y los proyectos disponibles para realizar tu experiencia recepcional.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {practicasProfesionales.map((item) => (
              <div key={item.name} className="pf-card pf-card-top" style={{ padding: 0, overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "20px 22px" }}>
                  <h3 className="pf-card-title">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default FeriaPage;
