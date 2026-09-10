import Footer from "../sections/Footer";
import Header from "../sections/Header";
import HistorySection from "../sections/HistorySection";

function HistoryPage({ entries, logoImage, newsPanelOpen, setNewsPanelOpen }) {
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
            De la Escuela Comercial Práctica de 1922 a la FECA de hoy: más de seis
            décadas formando profesionales de la economía, la contaduría y la
            administración en el estado de Durango.
          </p>
        </div>
      </section>

      {/* ── CARRUSEL: NUESTRA HISTORIA ── */}
      <HistorySection entries={entries} />

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default HistoryPage;
