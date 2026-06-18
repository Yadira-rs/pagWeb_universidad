import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

function MissionVisionPage({ content, logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        currentRoute="mission-vision"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: `url('${content.heroImage}')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Nosotros · FECA</div>
          <h1 className="pf-hero-title">{content.heroTitle}</h1>
          <p className="pf-hero-sub">{content.intro}</p>
        </div>
        <div className="pf-stats" style={{ "--pf-stats-cols": 2 }}>
          <div className="pf-stat">
            <span className="pf-stat-num">1973</span>
            <span className="pf-stat-label">Año de fundación</span>
          </div>
          <div className="pf-stat">
            <span className="pf-stat-num">UJED</span>
            <span className="pf-stat-label">Universidad de referencia</span>
          </div>
        </div>
      </section>

      {/* ── MISIÓN ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="pf-label">{content.mission.eyebrow}</div>
            <h2 className="pf-section-title">{content.mission.title}</h2>
            <p className="pf-section-desc" style={{ marginBottom: content.mission.points?.length ? 28 : 0 }}>
              {content.mission.body}
            </p>
            {content.mission.points?.length ? (
              <div className="pf-chips">
                {content.mission.points.map((p) => (
                  <span key={p} className="pf-chip">{p}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <img
              src="/imagenes/feca-plaza-1.jpg"
              alt="Fachada principal de la FECA"
              style={{ width: "100%", borderRadius: 20, boxShadow: "0 20px 56px rgba(0,0,0,0.14)" }}
            />
          </div>
        </div>
      </section>

      {/* ── VISIÓN ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <img
              src="/imagenes/aniversario.jpeg"
              alt="Comunidad universitaria FECA"
              style={{ width: "100%", borderRadius: 20, boxShadow: "0 20px 56px rgba(0,0,0,0.12)" }}
            />
          </div>
          <div>
            <div className="pf-label">{content.vision.eyebrow}</div>
            <h2 className="pf-section-title">{content.vision.title}</h2>
            <p className="pf-section-desc" style={{ marginBottom: content.vision.points?.length ? 28 : 0 }}>
              {content.vision.body}
            </p>
            {content.vision.points?.length ? (
              <div className="pf-chips">
                {content.vision.points.map((p) => (
                  <span key={p} className="pf-chip">{p}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default MissionVisionPage;
