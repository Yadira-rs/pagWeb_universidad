import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { getLicenciatura } from "../data/licenciaturasData";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function LicenciaturaDetailPage({ slug, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const licenciatura = getLicenciatura(slug);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (!licenciatura) {
    return (
      <div className="site-shell">
        <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
        <main style={{ padding: "120px 24px", textAlign: "center" }}>
          <p>Licenciatura no encontrada.</p>
          <a href="#/licenciaturas">← Volver a Licenciaturas</a>
        </main>
        <Footer logoImage={logoImage} />
      </div>
    );
  }

  const { abbr, name, plan, tagline, resumen, perfilIngreso, perfilEgreso, campoLaboral, destacados, planEstudiosHref, mapaCurricularHref } = licenciatura;

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* HERO */}
      <section className="pf-hero pf-hero-sm" style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)" }}>
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <a href="#/licenciaturas" className="dp-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Licenciaturas
          </a>
          <div className="pf-hero-badge">Licenciatura presencial · {plan}</div>
          <h1 className="pf-hero-title">{name}</h1>
          <p className="pf-hero-sub">{tagline}</p>
        </div>
      </section>

      {/* RESUMEN */}
      <section className="pf-section pf-fade">
        <div className="pf-container" style={{ maxWidth: 820 }}>
          <div className="pf-section-head">
            <div className="pf-label">{abbr} · {plan}</div>
            <h2 className="pf-section-title">¿De qué se trata esta carrera?</h2>
            {resumen.map((parrafo) => (
              <p key={parrafo} className="pf-section-desc">{parrafo}</p>
            ))}
          </div>
        </div>
      </section>

      {/* PERFIL DE INGRESO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container" style={{ maxWidth: 820 }}>
          <div className="pf-section-head">
            <div className="pf-label">¿Es esta tu carrera?</div>
            <h2 className="pf-section-title">Perfil de ingreso</h2>
            {perfilIngreso.intro && <p className="pf-section-desc">{perfilIngreso.intro}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {perfilIngreso.items.map((item) => (
              <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#e31313", marginTop: 2 }}><CheckIcon /></span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#444", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          {perfilIngreso.cierre && (
            <p className="pf-section-desc" style={{ marginTop: 20 }}>{perfilIngreso.cierre}</p>
          )}
        </div>
      </section>

      {/* PERFIL DE EGRESO + CAMPO LABORAL */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-two-col" style={{ gap: 40, alignItems: "start" }}>
            <div>
              <div className="pf-label" style={{ marginBottom: 6 }}>Al egresar, serás capaz de</div>
              <h2 className="pf-section-title" style={{ marginBottom: 20 }}>Perfil de egreso</h2>
              {perfilEgreso.intro && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#444", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {perfilEgreso.intro}
                </p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {perfilEgreso.items.map((item) => (
                  <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#e31313", marginTop: 2 }}><CheckIcon /></span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#444", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              {perfilEgreso.cierre && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#444", lineHeight: 1.6, margin: "16px 0 0" }}>
                  {perfilEgreso.cierre}
                </p>
              )}
            </div>

            <div>
              <div className="pf-label" style={{ marginBottom: 6 }}>¿Dónde puedes trabajar?</div>
              <h2 className="pf-section-title" style={{ marginBottom: 20 }}>Campo laboral</h2>
              <div className="pf-chips" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                {campoLaboral.map((item) => (
                  <span key={item} className="pf-chip" style={{ width: "100%", justifyContent: "flex-start", boxSizing: "border-box" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUÉ ESTUDIARLA EN LA FECA */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Nuestra propuesta</div>
            <h2 className="pf-section-title">¿Por qué estudiarla en la FECA?</h2>
          </div>
          <div className="pf-cards-grid pf-fade">
            {destacados.map((item) => (
              <div key={item} className="pf-card">
                <div className="pf-card-icon pf-card-icon-light"><CheckIcon /></div>
                <p className="pf-card-desc" style={{ color: "#444" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN DE ESTUDIOS */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Documentos oficiales</div>
            <h2 className="pf-section-title pf-title-white">Plan de estudios {plan}</h2>
            <p className="pf-section-desc pf-desc-white">
              Consulta el plan de estudios completo y el mapa curricular de {name}.
            </p>
          </div>
          <div className="pf-fade" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={planEstudiosHref} target="_blank" rel="noopener noreferrer" className="pf-btn-primary" style={{ background: "linear-gradient(135deg, #c0050f 0%, #e31313 45%, #9b1020 100%)", color: "#fff" }}>
              Descargar plan de estudios
            </a>
            <a href={mapaCurricularHref} target="_blank" rel="noopener noreferrer" className="pf-btn-outline">
              Ver mapa curricular
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-fade">
        <div className="pf-container" style={{ maxWidth: 720 }}>
          <div className="pf-info-box" style={{ textAlign: "center" }}>
            <div className="pf-card-icon pf-card-icon-light" style={{ margin: "0 auto 18px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.5 19.5 0 0 1 5 12 19.79 19.79 0 0 1 1.14 4.16 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11l-.91.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h2 style={{ margin: "0 0 10px" }}>¿Te interesa estudiar {abbr}?</h2>
            <p style={{ margin: "0 0 18px" }}>
              Llámanos al (618) 827-13-65 o consulta los trámites de inscripción en Servicios Escolares.
            </p>
            <a href="#/servicios/servicios-escolares" className="pf-chip">Ver trámites de inscripción</a>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
