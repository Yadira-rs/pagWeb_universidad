import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

function PdfCard({ title, subtitle, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        background: "#fff",
        border: "1.5px solid #eee",
        borderRadius: 16,
        padding: "40px 32px",
        textDecoration: "none",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(227,19,19,0.13)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#e31313";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#eee";
      }}
    >
      {/* PDF icon */}
      <div style={{
        width: 64, height: 64, borderRadius: 14,
        background: "linear-gradient(135deg, #9b0000, #e31313)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#e31313", margin: "0 0 8px",
        }}>
          {subtitle}
        </p>
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
          color: "var(--navy)", margin: "0 0 16px", lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600,
          color: "#e31313",
        }}>
          Ver PDF
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

function PrivacyPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      {/* ── HERO ── */}
      <section
        className="pf-hero pf-hero-sm"
        style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1 className="pf-hero-title">Aviso de<br />Privacidad</h1>
          <p className="pf-hero-sub">
            Consulta los avisos de privacidad oficiales conforme a la legislación vigente en materia de protección de datos personales.
          </p>
        </div>
      </section>

      {/* ── ALUMNOS Y EGRESADOS ── */}
      <section className="pf-section pf-fade">
        <div className="pf-container" style={{ maxWidth: 860 }}>
          <div className="pf-section-head pf-section-head-center" style={{ marginBottom: 40 }}>
            <div className="pf-label">Avisos de privacidad</div>
            <h2 className="pf-section-title">Alumnos y Egresados de la Facultad de<br />Economía, Contaduría y Administración</h2>
          </div>

          <div
            className="pf-fade"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Integral"
              href="/docs/Aviso_de_privacidad_alumnos_y_egresados_integral_1623697828219.pdf"
            />
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Simplificado"
              href="/docs/Aviso_de_privacidad_alumnos_y_egresados_simplificado_1623698005147.pdf"
            />
          </div>

        </div>
      </section>

      {/* ── EMPLEADORES ── */}
      <section className="pf-section pf-fade">
        <div className="pf-container" style={{ maxWidth: 860 }}>
          <div className="pf-section-head pf-section-head-center" style={{ marginBottom: 40 }}>
            <div className="pf-label">Avisos de privacidad</div>
            <h2 className="pf-section-title">Empleadores de la Facultad de<br />Economía, Contaduría y Administración</h2>
          </div>

          <div
            className="pf-fade"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Integral"
              href="/docs/Aviso_de_privacidad_empleadores_integral_1623698083976.pdf"
            />
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Simplificado"
              href="/docs/Aviso_de_privacidad_empleadores_simplificado_1623698042433.pdf"
            />
          </div>

        </div>
      </section>

      {/* ── EMPLEADOS ── */}
      <section className="pf-section pf-fade">
        <div className="pf-container" style={{ maxWidth: 860 }}>
          <div className="pf-section-head pf-section-head-center" style={{ marginBottom: 40 }}>
            <div className="pf-label">Avisos de privacidad</div>
            <h2 className="pf-section-title">Empleados de la Facultad de<br />Economía, Contaduría y Administración</h2>
          </div>

          <div
            className="pf-fade"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Integral"
              href="/docs/Aviso_de_privacidad_empleados_integral_1623698106722.pdf"
            />
            <PdfCard
              subtitle="Aviso de privacidad"
              title="Aviso de Privacidad Simplificado"
              href="/docs/Aviso_de_privacidad_empleados_simplificado_1623698064371.pdf"
            />
          </div>

        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PrivacyPage;
