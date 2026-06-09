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

      <section className="history-page-hero">
        <div className="history-page-overlay"></div>
        <div className="history-page-inner">
          <h1 className="history-page-title">Nuestra historia</h1>
        </div>
      </section>

      <HistorySection entries={entries} />
      <Footer logoImage={logoImage} />
    </div>
  );
}

export default HistoryPage;
