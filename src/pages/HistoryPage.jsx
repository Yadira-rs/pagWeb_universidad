import { useEffect, useRef } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import HistorySection from "../sections/HistorySection";

function HistoryPage({ entries, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="history"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ── HERO ── */}
      <section
        className="pf-hero pf-hero-sm"
        style={{ backgroundImage: `url('/imagenes/aniversario.jpeg')` }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner" style={{ paddingBottom: 80 }}>
          <div className="pf-hero-badge">Nosotros · FECA</div>
          <h1 className="pf-hero-title">Nuestra<br />Historia</h1>
          <p className="pf-hero-sub">
            Más de 50 años formando profesionales de excelencia en economía, contaduría
            y administración en el estado de Durango.
          </p>
        </div>
      </section>

      {/* ── CONTENIDO HISTÓRICO ── */}
      <HistorySection entries={entries} />

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default HistoryPage;
