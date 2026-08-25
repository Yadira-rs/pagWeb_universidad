import { directors } from "../data/directorsData";

export default function DirectorsList() {
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
    </section>
  );
}
