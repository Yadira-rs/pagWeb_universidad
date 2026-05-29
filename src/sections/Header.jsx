import { useEffect, useRef, useState } from "react";

function Header({ logoImage, currentRoute, newsPanelOpen, setNewsPanelOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const menu = mobileMenuRef.current;
      const trigger = hamburgerRef.current;
      if (!menu || !trigger) return;

      if (!menu.contains(event.target) && !trigger.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-header">
            <div className="logo-emblem">
              <img src={logoImage} alt="UJED logo" />
            </div>
            <div>
              <div className="brand-title">UJED</div>
              <div className="brand-subtitle">
                Universidad Juarez del Estado de Durango
              </div>
            </div>
          </div>
          <div className="feca-title">
            Facultad de Economia, Contaduria y Administracion
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#/" className="logo">
            <div className="logo-emblem">
              <img src={logoImage} alt="FECA logo" />
            </div>
            FECA
          </a>

          <div className="nav-links">
            <div
              className={`nav-item ${currentRoute === "home" ? "active" : ""}`}
            >
              <a href="#/">Inicio</a>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "legacy-program" ? "active" : ""
              }`}
            >
              <a href="#/administracion">Oferta Educativa v</a>
              <div className="dropdown">
                <a href="#/administracion">Administración</a>
                <a href="#/contabilidad">Contabilidad</a>
                <a href="#/economia">Economía</a>
                <a href="#/posgrado">Posgrado</a>
                <a href="#/celci">CELCI</a>
                <a href="#/ciiedo">CIIEDO</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "services" ||
                currentRoute === "service-detail" ||
                currentRoute === "bolsa-trabajo"
                  ? "active"
                  : ""
              }`}
            >
              <a href="#/servicios">Servicios v</a>
              <div className="dropdown">
                <a href="#/servicios/servicios-escolares">Servicios escolares</a>
                <a href="#/servicios/servicio-social">Servicio social</a>
                <a href="#/servicios/practicas-profesionales">
                  Practicas profesionales
                </a>
                <a href="#/bolsa-de-trabajo">Bolsa de trabajo</a>
                <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
                  Registro de egresados
                </a>
              </div>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "legacy-campus" ? "active" : ""
              }`}
            >
              <a href="#/campus-central">Vida campus v</a>
              <div className="dropdown">
                <a href="#/campus-central">Campus central</a>
                <a href="#/cafeteria">Cafetería</a>
                <a href="#/cultura-campus">Cultura y actividades</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "legacy-teacher" ? "active" : ""
              }`}
            >
              <a href="#/lucia-herrera">Maestros v</a>
              <div className="dropdown">
                <a href="#/lucia-herrera">Dra. Lucía Herrera</a>
                <a href="#/jorge-salinas">Mtro. Jorge Salinas</a>
                <a href="#/elena-cruz">Mtra. Elena Cruz</a>
                <a href="#/mario-torres">Dr. Mario Torres</a>
                <a href="#/ana-perez">Mtra. Ana Pérez</a>
                <a href="#/luis-gomez">Prof. Luis Gómez</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "legacy-admission" ? "active" : ""
              }`}
            >
              <a href="#/solicitud">Admisión v</a>
              <div className="dropdown">
                <a href="#/solicitud">Inicia tu solicitud</a>
              </div>
            </div>
            <div
              className={`nav-item ${
                currentRoute === "history" ||
                currentRoute === "mission-vision" ||
                currentRoute === "single-section"
                  ? "active"
                  : ""
              }`}
            >
              <a href="#">Nosotros v</a>
              <div className="dropdown">
                <a href="#/historia">Historia</a>
                <a href="#/mision-vision">Mision y vision</a>
                <a href="#/nosotros/valores">Valores</a>
                <a href="#/nosotros/politicas">Politicas</a>
                <a href="#/nosotros/ejes-rectores">Ejes rectores</a>
                <a href="#/nosotros/marco-normativo">Marco normativo</a>
              </div>
            </div>
          </div>

          <form className="nav-search">
            <input
              type="search"
              name="q"
              placeholder="Buscar programas, carreras o servicios"
            />
            <button type="submit">Buscar</button>
          </form>

          <button
            type="button"
            className="nav-panel-button"
            aria-label="Abrir últimas noticias"
            onClick={() => setNewsPanelOpen((current) => !current)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
          </button>

          <button
            type="button"
            className="hamburger"
            ref={hamburgerRef}
            aria-label="Menu"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div
            ref={mobileMenuRef}
            className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
          >
            <a href="#/">Inicio</a>
            <a href="#/administracion">Oferta educativa</a>
            <a href="#/campus-central">Vida campus</a>
            <a href="#/lucia-herrera">Maestros</a>
            <a href="#/servicios">Servicios</a>
            <a href="#/historia">Nuestra historia</a>
            <a href="#/bolsa-de-trabajo">Bolsa de trabajo</a>
            <a href="#/servicios/servicios-escolares">Servicios escolares</a>
            <a href="#/servicios/servicio-social">Servicio social</a>
            <a href="#/servicios/practicas-profesionales">
              Practicas profesionales
            </a>
            <a href="#/solicitud">Solicitud de admisión</a>
            <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
              Registro de egresados
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
