import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const GALLERY_IMAGES = [
  "DSC_5054.JPG",
  "DSC_5091.JPG",
  "DSC_5095.JPG",
  "DSC_5113.JPG",
  "DSC_5134.JPG",
  "DSC_5267.JPG",
  "DSC_5269.JPG",
  "DSC_5273.JPG",
  "DSC_5291.JPG",
  "DSC_5294.JPG",
  "DSC_5296.JPG",
  "DSC_5303.JPG",
  "DSC_5318.JPG",
].map((file) => `/imagenes/directivos/secretaria-academica/${file}`);

const areas = [
  {
    title: "Servicio social",
    desc: "Registro, seguimiento y liberación del servicio social de los estudiantes.",
    href: "#/servicios/servicio-social",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Prácticas profesionales",
    desc: "Vinculación con organizaciones y seguimiento de la práctica profesional.",
    href: "#/servicios/practicas-profesionales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Tutorías",
    desc: "Acompañamiento académico personalizado a lo largo de la trayectoria escolar.",
    href: "#/tutorias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    title: "Servicios escolares",
    desc: "Trámites de inscripción, constancias, kardex y control escolar.",
    href: "#/servicios/servicios-escolares",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

function SecretariaAcademicaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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

      {/* HERO */}
      <section className="pf-hero pf-hero-sm" style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}>
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Secretaría<br />Académica</h1>
          <p className="pf-hero-sub">
            Impulsamos la calidad de los programas educativos, el acompañamiento docente y la formación integral de los estudiantes.
          </p>
        </div>
      </section>

      {/* ÁREAS QUE ATENDEMOS */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Nuestra función</div>
            <h2 className="pf-section-title">Áreas que atendemos</h2>
            <p className="pf-section-desc">
              Coordinamos los procesos académicos que acompañan a estudiantes y docentes a lo largo de su trayectoria en la FECA.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {areas.map((item) => (
              <a key={item.title} href={item.href} className="pf-card" style={{ textDecoration: "none" }}>
                <div className="pf-card-icon pf-card-icon-light">{item.icon}</div>
                <h3 className="pf-card-title" style={{ color: "var(--navy)" }}>{item.title}</h3>
                <p className="pf-card-desc" style={{ color: "#666" }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Nuestro equipo</div>
            <h2 className="pf-section-title">Secretaría Académica en imágenes</h2>
          </div>
          <div className="egr-gallery-grid egr-fade">
            {GALLERY_IMAGES.map((src) => (
              <div key={src} className="egr-gallery-item">
                <img src={src} alt="Secretaría Académica" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-info-box" style={{ textAlign: "center" }}>
            <div className="pf-card-icon pf-card-icon-light" style={{ margin: "0 auto 18px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2 style={{ margin: "0 0 10px" }}>¿Necesitas ayuda?</h2>
            <p style={{ margin: "0 0 18px" }}>
              Escríbenos para dudas sobre programas educativos, docentes o trámites académicos.
            </p>
            <a href="mailto:academica.feca@ujed.mx" className="pf-chip">academica.feca@ujed.mx</a>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default SecretariaAcademicaPage;
