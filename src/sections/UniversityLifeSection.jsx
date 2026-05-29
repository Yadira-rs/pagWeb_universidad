function UniversityLifeSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="fade-up">
          <div className="section-label">Vida universitaria</div>
          <h2 className="section-title">Un campus que inspira cada dia</h2>
          <p className="section-desc">
            Mas de 40 hectareas de espacios disenados para el aprendizaje, la
            convivencia y el deporte.
          </p>
        </div>

        <div className="campus-grid fade-up">
          <div className="campus-main">
            <img
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=80"
              alt="Campus central"
            />
            <div className="campus-main-overlay">
              <h3>Campus central</h3>
              <p>
                Biblioteca, auditorio, laboratorios y areas verdes en un entorno
                ideal para estudiar.
              </p>
            </div>
          </div>

          <div className="campus-side">
            <div className="campus-mini">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80"
                alt="Instalaciones deportivas"
              />
              <div className="campus-mini-overlay">Instalaciones deportivas</div>
            </div>
            <div className="campus-mini">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
                alt="Cultura y actividades extracurriculares"
              />
              <div className="campus-mini-overlay">
                Cultura y actividades extracurriculares
              </div>
            </div>
          </div>
        </div>

        <div className="admissions-banner fade-up">
          <div>
            <h2>Listo para dar el siguiente paso?</h2>
            <p>
              Proceso de admision sencillo y en linea. Resultados en menos de 72
              horas.
            </p>
          </div>
          <a href="#" className="btn-primary">
            Iniciar mi solicitud
          </a>
        </div>
      </div>
    </section>
  )
}

export default UniversityLifeSection
