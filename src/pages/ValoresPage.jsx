import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const valueSections = [
  {
    eyebrow: "PRINCIPIOS ESENCIALES",
    title: "Valores Fundamentales",
    body: "La base ética que orienta el comportamiento, las decisiones y las relaciones de toda nuestra comunidad universitaria.",
    items: ["Ética", "Honestidad", "Respeto a la dignidad humana"],
    image: "/imagenes/feca-plaza-1.jpg",
  },
  {
    eyebrow: "IDENTIDAD Y COMPROMISO",
    title: "Valores de Pertenencia",
    body: "El orgullo de ser FECA se refleja en el compromiso social, la integridad académica y el liderazgo responsable de cada integrante de nuestra comunidad.",
    items: ["Responsabilidad social", "Sentido de pertenencia", "Compromiso social", "Integridad académica", "Liderazgo"],
    image: "/imagenes/lic.jpg",
  },
  {
    eyebrow: "EXCELENCIA E INCLUSIÓN",
    title: "Valores Sociales y de Excelencia",
    body: "Impulsamos un entorno inclusivo y transformador donde la innovación, la calidad y el respeto a la diversidad son motores de crecimiento.",
    items: ["Equidad", "Igualdad", "Interculturalidad", "Cultura de la paz", "Innovación", "Calidad", "Emprendimiento"],
    image: "/imagenes/feca-entrada.jpg",
  },
];

const STATS = [
  { num: "3", label: "Grupos de valores" },
  { num: "+15", label: "Valores institucionales" },
  { num: "50+", label: "Años de trayectoria" },
  { num: "FECA", label: "Comunidad universitaria" },
];

function ValoresPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
        currentRoute="nosotros"
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
          <div className="pf-hero-badge">Nosotros · FECA</div>
          <h1 className="pf-hero-title">Valores<br />Institucionales</h1>
          <p className="pf-hero-sub">
            Los principios que guían la vida académica, el trabajo institucional y la convivencia
            de toda la comunidad FECA.
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

      {/* ── VALORES ── */}
      {valueSections.map((sec, i) => (
        <section
          key={sec.title}
          className={`pf-section pf-fade ${i % 2 === 0 ? "pf-section-light" : "pf-section-alt"}`}
        >
          <div className="pf-container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
              {/* texto */}
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div className="pf-label">{sec.eyebrow}</div>
                <h2 className="pf-section-title">{sec.title}</h2>
                <p className="pf-section-desc" style={{ marginBottom: 28 }}>{sec.body}</p>
                <div className="pf-chips">
                  {sec.items.map((item) => (
                    <span key={item} className="pf-chip">{item}</span>
                  ))}
                </div>
              </div>
              {/* imagen */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.14)", aspectRatio: "4/3" }}>
                  <img
                    src={sec.image}
                    alt={sec.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ValoresPage;
