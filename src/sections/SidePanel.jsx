import { useEffect, useState } from 'react'

function SidePanel() {
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = panelOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [panelOpen])

  return (
    <>
      <button
        type="button"
        className="nav-panel-button nav-panel-floating"
        aria-label="Abrir ultimas noticias"
        onClick={() => setPanelOpen(true)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M7 8h10" />
          <path d="M7 12h10" />
          <path d="M7 16h10" />
        </svg>
      </button>

      <div
        className={`panel-overlay ${panelOpen ? 'open' : ''}`}
        aria-hidden={!panelOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setPanelOpen(false)
          }
        }}
      >
        <aside
          className="slide-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Ultimas noticias y fechas de inscripcion"
        >
          <div className="panel-header">
            <div>
              <h2>Ultimas noticias</h2>
              <p className="panel-header-copy">
                Lo mas reciente del campus y las fechas clave de admision.
              </p>
            </div>
            <button
              type="button"
              className="panel-close"
              aria-label="Cerrar panel"
              onClick={() => setPanelOpen(false)}
            >
              X
            </button>
          </div>

          <section className="panel-section panel-news">
            <h3>Noticias recientes</h3>
            <ul className="panel-list">
              <li className="panel-item">
                <a href="#">Convocatoria de inscripcion julio 2026</a>
                <span>Abierta la inscripcion para nuevos ingresos.</span>
              </li>
              <li className="panel-item">
                <a href="#">Jornadas deportivas y eventos del campus</a>
                <span>Calendario de actividades para toda la comunidad.</span>
              </li>
            </ul>
          </section>

          <section className="panel-section">
            <h3>Fechas de inscripcion</h3>
            <ul className="panel-list">
              <li className="panel-item">
                <strong>Inicio de clases</strong>
                <span>Agosto 2026</span>
              </li>
              <li className="panel-item">
                <strong>Modalidad</strong>
                <span>Presencial | En linea</span>
              </li>
              <li className="panel-item">
                <strong>Cierre de registro</strong>
                <span>31 de julio 2026</span>
              </li>
              <li className="panel-item">
                <strong>Informes</strong>
                <span>(618) 827-13-65</span>
              </li>
            </ul>
          </section>

          <section className="panel-section">
            <h3>Siguenos</h3>
            <div className="panel-social">
              <a href="#" aria-label="Facebook">
                FB
              </a>
              <a href="#" aria-label="Instagram">
                IG
              </a>
              <a href="#" aria-label="X">
                X
              </a>
              <a href="#" aria-label="TikTok">
                TT
              </a>
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}

export default SidePanel
