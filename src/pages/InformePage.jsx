import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

// Flipbook de Heyzine con el 1er Informe de Actividades. Si en el futuro se
// genera uno nuevo, basta con reemplazar esta URL y el PDF de descarga.
const FLIPBOOK_URL = "https://heyzine.com/flip-book/57a3d16672.html";
const PDF_DESCARGA = "/docs/1er-informe-actividades-feca.pdf";
const PORTADA = "/imagenes/informe-actividades-portada.jpg";

const EJES = [
  "Eje transversal · Identidad Universitaria",
  "Eje 1 · Educación Integral de Calidad e Innovación Educativa",
  "Eje 2 · Promoción e Impulso a la Investigación y la Innovación",
  "Eje 3 · Vinculación y Extensión con Impacto Social",
  "Eje 4 · Cultura de Paz, Responsabilidad Social e Inclusión",
  "Eje 5 · Infraestructura y Equipamiento para un Espacio Digno",
  "Eje 6 · Gestión Ética y Transparencia",
];

function InformePage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  const revistaRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Ojo: el sitio usa router por hash (#/ruta). Un <a href="#revista"> cambiaría
  // el hash y el router lo interpretaría como "ruta desconocida" → Inicio. Por
  // eso el scroll a la revista se hace con JS sobre la referencia, sin tocar la URL.
  const irARevista = () =>
    revistaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="site-shell informe-page">
      <Header
        logoImage={logoImage}
        currentRoute="informe"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section className="pf-hero pf-hero-sm informe-hero">
        <div className="pf-hero-overlay" />
        <div className="informe-hero-inner">
          <div className="informe-hero-text">
            <div className="pf-hero-badge">Rendición de cuentas · 2025–2026</div>
            <h1 className="pf-hero-title informe-hero-title">
              1<sup>er</sup> Informe<br />de Actividades
            </h1>
            <p className="pf-hero-sub">
              Resultados consolidados del primer año de gestión de la FECA-UJED,
              alineados a los ejes rectores del Plan de Desarrollo de la Unidad
              Académica. Dr. Jesús Guillermo Sotelo Asef.
            </p>
            <div className="pf-hero-ctas">
              <button type="button" className="pf-btn-primary" onClick={irARevista}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Ver revista digital
              </button>
              <a href={PDF_DESCARGA} download className="pf-btn-outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar PDF
              </a>
            </div>
          </div>

          <button type="button" className="informe-hero-cover" onClick={irARevista} aria-label="Ir a la revista digital">
            <img src={PORTADA} alt="Portada del 1er Informe de Actividades de la FECA-UJED" />
          </button>
        </div>
      </section>

      {/* ── REVISTA DIGITAL (flipbook) ── */}
      <section ref={revistaRef} className="pf-section pf-section-light">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Revista digital</div>
            <h2 className="pf-section-title">Hojea el informe completo</h2>
            <p className="pf-section-desc">
              Pasa las páginas como un libro. Usa el botón de pantalla completa
              del visor para una lectura más cómoda.
            </p>
          </div>

          <div className="informe-flip">
            <span className="informe-flip-loading">Cargando la revista…</span>
            <iframe
              src={FLIPBOOK_URL}
              title="1er Informe de Actividades FECA-UJED — revista digital"
              allowFullScreen
              allow="clipboard-write; fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="informe-flip-actions">
            <a href={FLIPBOOK_URL} target="_blank" rel="noreferrer" className="pf-btn-primary informe-btn-dark">
              Abrir la revista en pantalla completa
            </a>
            <a href={PDF_DESCARGA} download className="pf-btn-outline informe-btn-dark">
              Descargar el PDF
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Contenido</div>
            <h2 className="pf-section-title">Estructura del informe</h2>
            <p className="pf-section-desc">
              El documento organiza los logros del periodo en torno a los ejes
              rectores del PDUA.
            </p>
          </div>

          <ol className="informe-ejes">
            {EJES.map((eje, i) => (
              <li key={eje} className="informe-eje">
                <span className="informe-eje-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="informe-eje-text">{eje}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default InformePage;
