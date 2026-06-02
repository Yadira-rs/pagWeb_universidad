import { useEffect, useRef, useState } from "react";
import {
  logoImage as defaultLogo,
  logoUjedHorizontalImage,
} from "../data/siteData";

function Header({ logoImage = defaultLogo, currentRoute, setNewsPanelOpen }) {
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
            <img
              className="brand-lockup"
              src={logoUjedHorizontalImage}
              alt="UJED Universidad Juarez del Estado de Durango"
            />
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
            <div className={`nav-item ${currentRoute === "home" ? "active" : ""}`}>
              <a href="#/">Inicio</a>
            </div>

            <div className={`nav-item ${currentRoute === "legacy-program" ? "active" : ""}`}>
              <a href="#/licenciaturas">Oferta Educativa</a>
            </div>

            <div className={`nav-item ${
              currentRoute === "services" || currentRoute === "service-detail" ? "active" : ""
            }`}>
              <a href="#/servicios">Servicios</a>
            </div>

            <div className={`nav-item ${
              currentRoute === "history" || currentRoute === "mission-vision" || currentRoute === "single-section" ? "active" : ""
            }`}>
              <a href="#/nosotros">Nosotros</a>
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
            <a href="#/licenciaturas">Oferta Educativa</a>
            <a href="#/servicios">Servicios</a>
            <a href="#/nosotros">Nosotros</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
