function ProgramsSection({ programs }) {
  return (
    <section className="section">
      <div className="container">
        <div className="fade-up">
          <div className="section-label">Oferta académica</div>
          <h2 className="section-title">Departamentos</h2>
          <p className="section-desc">
            Nuestros programas combinan teoría sólida con práctica profesional,
            impulsados por tecnología y vinculación empresarial.
          </p>
        </div>

        <div className="programs-grid fade-up">
          {programs.map((program) => (
            <article key={program.title} className="program-card">
              <div className="program-card-img">
                <img src={program.image} alt={program.title} />
                <span className="program-level">Departamentos</span>
              </div>
              <div className="program-card-body">
                <div className="program-card-title">{program.title}</div>
                <div className="program-card-desc">{program.description}</div>
                <div className="program-card-meta">
                  <span className="program-meta-item">{program.duration}</span>
                  <span className="program-meta-item">{program.mode}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action">
          <a href="#" className="btn-primary">
            Ver todos los programas
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection
