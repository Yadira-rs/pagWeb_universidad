import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { directors } from "../data/directorsData";

export default function AcademicosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const secretariaAcademica = directors.find((d) => d.slug === "secretaria-academica");
  const teamMembers = secretariaAcademica?.teamMembers || [];
  const groupPhotos = secretariaAcademica?.teamGroupPhotos || [];
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".dp-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />

      <main className="dp-main">
        <div className="dp-hero">
          <div className="dp-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
            <div className="dp-hero-content">
              <a href="#/directivos/secretaria-academica" className="dp-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Secretaría Académica
              </a>
              <h1 className="dp-hero-name">Académicos</h1>
              <p className="dp-hero-role">Equipo de la Secretaría Académica</p>
            </div>
          </div>
        </div>

        <div className="dp-body acad-body">
          {teamMembers.length > 0 && (
            <section className="dp-section dp-fade">
              <div className="dp-section-label">
                <span className="dp-section-rule" />
                EQUIPO
              </div>
              <div className="acad-members-grid">
                {teamMembers.map((member) => (
                  <div key={member.photo} className="acad-member-card">
                    <div className="acad-member-photo-wrap">
                      <img src={member.photo} alt={member.name} className="acad-member-photo" loading="lazy" />
                    </div>
                    <span className="acad-member-name">{member.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {groupPhotos.length > 0 && (
            <section className="dp-section dp-fade">
              <div className="dp-section-label">
                <span className="dp-section-rule" />
                MOMENTOS DEL EQUIPO
              </div>
              <div className="acad-group-grid">
                {groupPhotos.map((photo, i) => (
                  <div key={photo + i} className="acad-group-photo-wrap">
                    <img src={photo} alt="Equipo de Secretaría Académica" className="acad-group-photo" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}
