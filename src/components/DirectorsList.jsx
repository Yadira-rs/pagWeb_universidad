import { useState } from "react";
import { directors } from "../data/directorsData";

export default function DirectorsList() {
  const [selectedDirector, setSelectedDirector] = useState(null);

  return (
    <section className="el-section">
      {/* Encabezado */}
      <header className="el-header">
        <p className="el-eyebrow">Nuestro equipo</p>
        <h2 className="el-title">Directivos</h2>
        <div className="el-rule" />
        <p className="el-subtitle">
          Conoce al equipo que guía la vida académica, administrativa
          y de vinculación de nuestra facultad.
        </p>
      </header>

      {/* Lista */}
      <ol className="el-list">
        {directors.map((d, i) => (
          <li key={i} className="el-row">
            {d.image && (
              <div className="el-photo-wrap">
                <img src={d.image} alt={d.name} className="el-photo" />
              </div>
            )}

            <div className="el-body">
              <span className="el-role">{d.role}</span>
              <h3 className="el-name">{d.name}</h3>

              <div className="el-badges">
                {d.degrees.map((deg) => (
                  <span key={deg.title} className="el-badge">{deg.title}</span>
                ))}
              </div>

              <blockquote className="el-quote">
                <p>"{d.quote}"</p>
              </blockquote>

              <a
                href={`#/directivos/${d.slug}`}
                className="el-bio-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Ver Información</span>
              </a>
            </div>
          </li>
        ))}
      </ol>

      {/* Modal de Biografía */}
      {selectedDirector && (
        <div className="dir-modal-overlay" onClick={() => setSelectedDirector(null)}>
          <div className="dir-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="dir-modal-close" onClick={() => setSelectedDirector(null)} aria-label="Cerrar modal">
              &times;
            </button>

            <div className="dir-modal-grid">
              <div className="dir-modal-left">
                {selectedDirector.image && (
                  <div className="dir-modal-photo-wrap">
                    <img src={selectedDirector.image} alt={selectedDirector.name} className="dir-modal-photo" />
                  </div>
                )}
                <span className="dir-modal-role">{selectedDirector.role}</span>
                <h3 className="dir-modal-name">{selectedDirector.name}</h3>

                <div className="dir-modal-contact">
                  <h4>Contacto</h4>
                  <a href={`mailto:${selectedDirector.bio.contact}`}>{selectedDirector.bio.contact}</a>
                  <p>FECA - UJED Durango</p>
                </div>
              </div>

              <div className="dir-modal-right">
                <span className="dir-modal-kicker">Biografía y Trayectoria</span>
                <div className="dir-modal-divider" />

                <blockquote className="dir-modal-quote">
                  <p>"{selectedDirector.quote}"</p>
                </blockquote>

                <div className="dir-modal-bio-content">
                  <section className="dir-modal-bio-section">
                    <h4>Trayectoria Académica y Profesional</h4>
                    <p>{selectedDirector.bio.trajectory}</p>
                  </section>

                  <section className="dir-modal-bio-section">
                    <h4>Enfoque y Gestión</h4>
                    <p>{selectedDirector.bio.focus}</p>
                  </section>

                  <section className="dir-modal-bio-section">
                    <h4>Grados Académicos</h4>
                    <ul className="dir-modal-degrees-list">
                      {selectedDirector.degrees.map((deg, idx) => (
                        <li key={idx}>
                          <span className="dir-modal-bullet">•</span> {deg.title}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="dir-modal-footer">
                  <button className="dir-modal-close-btn" onClick={() => setSelectedDirector(null)}>
                    Cerrar Información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
