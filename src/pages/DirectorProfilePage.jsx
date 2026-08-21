import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { directors } from "../data/directorsData";

export default function DirectorProfilePage({ slug, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const director = directors.find((d) => d.slug === slug);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".dp-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (!director) {
    return (
      <div className="site-shell">
        <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
        <main style={{ padding: "120px 24px", textAlign: "center" }}>
          <p>Directivo no encontrado.</p>
          <a href="#/nosotros/ejes-rectores">← Volver a Directivos</a>
        </main>
        <Footer logoImage={logoImage} />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />

      <main className="dp-main">
        {/* ── HERO ── */}
        <div className="dp-hero">
          <div className="dp-hero-inner">
            {(director.images?.length || director.image) && (
              <div className={`dp-hero-photo-wrap${director.images?.length > 1 ? " dp-hero-photo-wrap--multi" : ""}`}>
                {(director.images?.length ? director.images : [director.image]).map((image) => (
                  <img key={image} src={image} alt={director.name} className="dp-hero-photo" />
                ))}
              </div>
            )}
            <div className="dp-hero-content">
              <a href="#/nosotros/ejes-rectores" className="dp-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Directivos
              </a>
              <h1 className="dp-hero-name">{director.name}</h1>
              <span className="dp-hero-role">{director.roleLabel}</span>
            </div>
          </div>
        </div>

        <div className="dp-body">
          {/* ── CITA ── */}
          <section className="dp-quote-section dp-fade">
            <div className="dp-quote-deco">"</div>
            <blockquote className="dp-blockquote">
              <p>{director.quote}</p>
            </blockquote>
          </section>

          {/* ── FORMACIÓN ACADÉMICA ── */}
          <section className="dp-section dp-fade">
            <div className="dp-section-label">
              <span className="dp-section-rule" />
              FORMACIÓN ACADÉMICA
            </div>
            <ul className="dp-degree-list">
              {director.degrees.map((deg, i) => (
                <li key={i} className="dp-degree-row">
                  <span className="dp-degree-bullet" />
                  <span className="dp-degree-title">{deg.title}</span>
                  <span className="dp-degree-inst">{deg.institution}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── ÁREA Y ENFOQUE ── */}
          <section className="dp-cards-section dp-fade">
            <div className="dp-info-card">
              <span className="dp-info-label">ÁREA</span>
              <span className="dp-info-value">{director.area}</span>
            </div>
            <div className="dp-info-card">
              <span className="dp-info-label">ENFOQUE</span>
              <span className="dp-info-value">{director.enfoque}</span>
            </div>
          </section>

          {/* ── BIO ── */}
          <section className="dp-section dp-fade">
            <div className="dp-section-label">
              <span className="dp-section-rule" />
              TRAYECTORIA
            </div>
            <p className="dp-bio-text">{director.bio.trajectory}</p>
          </section>

          <section className="dp-section dp-fade">
            <div className="dp-section-label">
              <span className="dp-section-rule" />
              GESTIÓN Y ENFOQUE
            </div>
            <p className="dp-bio-text">{director.bio.focus}</p>
          </section>

          {/* ── CONTACTO ── */}
          <section className="dp-contact-section dp-fade">
            <span className="dp-contact-label">Contacto institucional</span>
            <a href={`mailto:${director.bio.contact}`} className="dp-contact-email">
              {director.bio.contact}
            </a>
            <span className="dp-contact-inst">FECA · UJED Durango</span>
          </section>
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}
