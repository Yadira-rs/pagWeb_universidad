// Tarjeta de bienvenida del responsable de un área (foto + cargo + mensaje).
// Se usa en las páginas de Secretaría Académica / Administrativa y en las de
// Académicos / Administrativos. `fadeClass` define qué observador de scroll la
// anima ("pf-fade" o "dp-fade" según la página); vacío = aparece sin animación.
function EncargadoCard({ director, fadeClass = "" }) {
  if (!director?.image) return null;

  const title = director.welcomeTitle || director.roleLabel || director.role;
  const text = director.welcomeText;

  return (
    <section className={`pf-section pf-section-alt ${fadeClass}`.trim()}>
      <div className="pf-container">
        <div className="pf-section-head pf-section-head-center">
          <div className="pf-label">Quién nos atiende</div>
          <h2 className="pf-section-title">{title}</h2>
        </div>
        <div className="encargado-card">
          <div className="encargado-card-photo">
            <img src={director.image} alt={director.name} loading="lazy" />
          </div>
          <div className="encargado-card-body">
            <span className="encargado-card-badge">{title}</span>
            <h3 className="encargado-card-name">{director.name}</h3>
            {text && <p className="encargado-card-quote">"{text}"</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EncargadoCard;
