import { directors } from "../data/directorsData";

// Iniciales para el marcador cuando aún no hay foto individual.
function initials(name) {
  return name
    .replace(/^(Dr\.|Dra\.|M\.[A-Z.]+|Ing\.|Lic\.)\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export default function DirectorsList() {
  return (
    <section className="el-section">
      {/* Encabezado */}
      <header className="el-header">
        <p className="el-eyebrow">Nuestro equipo</p>
        <h2 className="el-title">Responsables</h2>
        <div className="el-rule" />
        <p className="el-subtitle">
          Conoce a las personas responsables de cada área del organigrama de la
          facultad.
        </p>
      </header>

      {/* Lista */}
      <ol className="el-list">
        {directors.map((d) => (
          <li key={d.slug} className="el-row">
            <div className="el-photo-wrap">
              {d.image ? (
                <img src={d.image} alt={d.name} className="el-photo" />
              ) : (
                <div className="el-photo el-photo-placeholder" aria-hidden="true">
                  {initials(d.name)}
                </div>
              )}
            </div>

            <div className="el-body">
              <span className="el-role">{d.role}</span>
              <h3 className="el-name">{d.name}</h3>

              <a href={`#/directivos/${d.slug}`} className="el-bio-btn">
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
