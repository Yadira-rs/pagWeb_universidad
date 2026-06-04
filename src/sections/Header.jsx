import { useEffect, useRef, useState } from "react";
import { logoImage as defaultLogo } from "../data/siteData";

function Header({ logoImage = defaultLogo, currentRoute, setNewsPanelOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`topbar${scrolled ? " topbar-hidden" : ""}`}>
        <div className="topbar-inner">
          <div className="feca-title">
            Facultad de Economía, Contaduría y Administración
          </div>
        </div>
      </div>

      <nav className={`navbar${scrolled ? " navbar-top" : ""}`}>
        <div className="navbar-inner">
          <div className="logo">
            <a href="https://www.ujed.mx/" target="_blank" rel="noreferrer">
              <img
                className="navbar-ujed-logo"
                src="/imagenes/logo-ujed.png"
                alt="UJED logo"
              />
            </a>
            <a href="#/">
              <img
                className="navbar-feca-logo"
                src="/imagenes/LOGO_FECA PNG.png"
                alt="FECA logo"
              />
            </a>
          </div>

          <div className="nav-links">
            <div className={`nav-item ${currentRoute === "home" ? "active" : ""}`}>
              <a href="#/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Inicio</a>
            </div>

            <div className={`nav-item ${currentRoute === "legacy-program" ? "active" : ""}`}>
              <a href="#/administracion">
                Oferta Educativa
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/administracion">Licenciaturas</a>
                <a href="#/distancia">Licenciaturas a distancia</a>
                <a href="https://posgradofeca.ujed.mx/" target="_blank" rel="noreferrer">Posgrado</a>
                <a href="#/curso-propedeutico">Cursos Propedéutico</a>
                <a href="#/cursos-intersemestrales">Cursos Intersemestrales</a>
                <a href="#/celci">CELCI</a>
                <a href="#/ciiedo">CIIEDO</a>
                <a href="#/servicios">Servicios</a>
                <a href="#/bolsa-de-trabajo">Bolsa de trabajo</a>
              </div>
            </div>

            <div className={`nav-item ${
              currentRoute === "services" || currentRoute === "service-detail" ? "active" : ""
            }`}>
              <a href="#/servicios">
                Servicios
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/servicios/servicios-escolares">Servicios escolares</a>
                <a href="#/servicios/servicio-social">Servicio social</a>
                <a href="#/servicios/practicas-profesionales">Prácticas profesionales</a>
                <a href="#/tutorias">Tutorías</a>
              </div>
            </div>

            <div className={`nav-item ${
              currentRoute === "history" || currentRoute === "mission-vision" || currentRoute === "single-section" ? "active" : ""
            }`}>
              <a href="#/historia">
                Nosotros
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/historia">Historia</a>
                <a href="/ORGANIGRAMA-FECA.pdf" target="_blank" rel="noreferrer">Organigrama</a>
                <a href="#/nosotros/pdua">PDUA</a>
                <a href="#/mision-vision">Misión y visión</a>
                <a href="#/nosotros/valores">Valores</a>
                <a href="#/nosotros/politicas">Políticas</a>
                <a href="#/nosotros/ejes-rectores">Ejes rectores</a>
                <a href="#/nosotros/marco-normativo">Marco normativo</a>
              </div>
            </div>
          </div>

          <div className="nav-search-wrapper">
            <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
              <img
                src="/imagenes/suma_logo.png"
                alt="SUMA+"
                className="suma-logo"
              />
            </a>
            <form className="nav-search" onSubmit={(event) => event.preventDefault()}>
              <input
                type="search"
                name="q"
                placeholder="Buscar programas, carreras o servicios"
              />
              <button type="submit">Buscar</button>
            </form>
          </div>

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
            <a href="#/servicios">Servicios</a>
            <a href="#/historia">Nosotros</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
