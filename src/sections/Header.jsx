import { useEffect, useRef, useState } from "react";
import { logoImage as defaultLogo } from "../data/siteData";
import { searchIndex } from "../data/searchIndex";

function Header({ logoImage = defaultLogo, currentRoute, setNewsPanelOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
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

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    const results = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
    setSearchResults(results.slice(0, 6));
    setSearchOpen(true);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
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
                src="/imagenes/logofeca JPG.jpg.jpeg"
                alt="FECA logo"
              />
            </a>
          </div>

          <div className="nav-links">
            <div
              className={`nav-item ${currentRoute === "home" ? "active" : ""}`}
            >
              <a
                href="#/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Inicio
              </a>
            </div>

            <div className={`nav-item ${currentRoute === "legacy-program" ? "active" : ""}`}>
              <a href="#/oferta-educativa">
                Oferta Educativa
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/licenciaturas">Licenciaturas</a>
                <a href="#/licenciaturas-distancia">Licenciaturas a distancia</a>
                <a href="https://posgradofeca.ujed.mx/" target="_blank" rel="noreferrer">Posgrado</a>
                <a href="#/curso-propedeutico">Cursos Propedéutico</a>
                <a href="#/cursos-intersemestrales">Cursos Intersemestrales</a>
                <a href="#/celci">CELCI</a>
                <a href="#/ciiedo">CIIEDO</a>
              </div>
            </div>

            <div
              className={`nav-item ${
                currentRoute === "services" || currentRoute === "service-detail"
                  ? "active"
                  : ""
              }`}
            >
              <a href="#/servicios">
                Servicios
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/servicios/servicios-escolares">Servicios escolares</a>
                <a href="#/servicios/servicio-social">Servicio social</a>
                <a href="#/servicios/practicas-profesionales">Prácticas profesionales</a>
                <a href="/docs/LCPEI.pdf" target="_blank" rel="noreferrer">Coordinación de Planeación y Evaluación Institucional</a>
                <a href="#/servicios/contraloria-interna">Contraloría interna</a>
                <a href="https://mat.ujed.mx/" target="_blank" rel="noreferrer">Tutorías</a>
                <a href="#/biblioteca">Biblioteca</a>
                <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">Registro de egresados</a>
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
              <a href="#/nosotros">
                Nosotros
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/historia">Historia</a>
                <a
                  href="/ORGANIGRAMA-FECA.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Organigrama
                </a>
                <a href="/PDUA-SILD27.pdf" target="_blank" rel="noreferrer">PDUA</a>
                <a href="#/mision-vision">Misión y visión</a>
                <a href="#/nosotros/valores">Valores</a>
                <a href="#/nosotros/politicas">Políticas</a>
                <a href="#/nosotros/ejes-rectores">Ejes rectores</a>
                <a href="#/nosotros/marco-normativo">Marco normativo</a>
              </div>
            </div>
          </div>

          <div className="nav-search-wrapper">
            <a
              href="https://sumafeca.ujed.mx/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/imagenes/suma_logo.png"
                alt="SUMA+"
                className="suma-logo"
              />
            </a>
            <div className="nav-search-container" ref={searchRef}>
              <form
                className="nav-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (searchResults.length > 0) {
                    const first = searchResults[0];
                    if (first.href.startsWith("http")) {
                      window.open(first.href, "_blank", "noreferrer");
                    } else {
                      window.location.hash = first.href.replace("#", "");
                    }
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              >
                <input
                  type="text"
                  name="q"
                  placeholder="Buscar programas, carreras o servicio"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="nav-search-clear"
                    aria-label="Limpiar búsqueda"
                    onClick={() => { setSearchQuery(""); setSearchResults([]); setSearchOpen(false); }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
                <button type="submit" className="nav-search-submit" aria-label="Buscar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />
                  </svg>
                </button>
              </form>
              {searchOpen && searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") || item.href.startsWith("/docs/") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") || item.href.startsWith("/docs/") ? "noreferrer" : undefined}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      >
                        <span className="search-dropdown-title">{item.title}</span>
                        <span className="search-dropdown-desc">{item.description}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {searchOpen && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <ul className="search-dropdown">
                  <li className="search-dropdown-empty">Sin resultados para "{searchQuery}"</li>
                </ul>
              )}
            </div>
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h13a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V5Z" />
              <path d="M17 8h3" />
              <path d="M17 12h3" />
              <path d="M8 9h5" />
              <path d="M8 13h5" />
              <path d="M8 17h7" />
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
            <a href="#/licenciaturas">Oferta educativa</a>
            <a href="#/servicios">Servicios</a>
            <a href="/docs/LCPEI.pdf" target="_blank" rel="noreferrer">Coordinación de Planeación y Evaluación Institucional</a>
            <a href="#/biblioteca">Biblioteca</a>
            <a href="#/historia">Nosotros</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
