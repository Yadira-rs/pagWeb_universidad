import { useEffect, useRef, useState } from "react";
import { logoImage as defaultLogo } from "../data/siteData";
import { searchIndex } from "../data/searchIndex";
import { IconFacebook, IconInstagram, IconXTwitter, IconTikTok } from "../components/SocialIcons";

function Header({ logoImage = defaultLogo, currentRoute, setNewsPanelOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isActive = (href) => currentHash === href || currentHash.startsWith(href + "/");

  const closeMobile = () => setMobileMenuOpen(false);

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

  /* Bloquear scroll y marcar body cuando el menú está abierto */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-nav-open");
    };
  }, [mobileMenuOpen]);

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
              <img className="navbar-ujed-logo" src="/imagenes/logo-ujed.png" alt="UJED logo" />
            </a>
            <a href="#/">
              <img className="navbar-feca-logo" src="/imagenes/logofeca JPG.jpg.jpeg" alt="FECA logo" />
            </a>
          </div>

          <div className="nav-links">
            <div className={`nav-item ${currentRoute === "home" ? "active" : ""}`}>
              <a href="#/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Inicio</a>
            </div>

            <div className={`nav-item ${currentRoute === "legacy-program" ? "active" : ""}`}>
              <a href="#/oferta-educativa">
                Oferta Educativa
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/licenciaturas" className={isActive("#/licenciaturas") ? "active-link" : ""}>Licenciaturas</a>
                <a href="#/licenciaturas-distancia" className={isActive("#/licenciaturas-distancia") ? "active-link" : ""}>Licenciaturas a distancia</a>
                <a href="https://posgradofeca.ujed.mx/" target="_blank" rel="noreferrer">Posgrado</a>
                <a href="#/curso-propedeutico" className={isActive("#/curso-propedeutico") ? "active-link" : ""}>Cursos Propedéutico</a>
                <a href="#/cursos-intersemestrales" className={isActive("#/cursos-intersemestrales") ? "active-link" : ""}>Cursos Intersemestrales</a>
                <a href="#/celci" className={isActive("#/celci") ? "active-link" : ""}>CELCI</a>
                <a href="#/ciiedo" className={isActive("#/ciiedo") ? "active-link" : ""}>CIIEDO</a>
              </div>
            </div>

            <div className={`nav-item ${currentRoute === "services" || currentRoute === "service-detail" ? "active" : ""}`}>
              <a href="#/servicios">
                Servicios
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/servicios/servicios-escolares" className={isActive("#/servicios/servicios-escolares") ? "active-link" : ""}>Servicios escolares</a>
                <a href="#/servicios/servicio-social" className={isActive("#/servicios/servicio-social") ? "active-link" : ""}>Servicio social</a>
                <a href="#/servicios/practicas-profesionales" className={isActive("#/servicios/practicas-profesionales") ? "active-link" : ""}>Prácticas profesionales</a>
                <a href="/docs/LCPEI.pdf" target="_blank" rel="noreferrer">CPEI</a>
                <a href="#/servicios/contraloria-interna" className={isActive("#/servicios/contraloria-interna") ? "active-link" : ""}>Contraloría interna</a>
                <a href="https://mat.ujed.mx/" target="_blank" rel="noreferrer">Tutorías</a>
                <a href="#/biblioteca" className={isActive("#/biblioteca") ? "active-link" : ""}>Biblioteca</a>
              </div>
            </div>

            <div className={`nav-item ${currentRoute === "history" || currentRoute === "mission-vision" || currentRoute === "single-section" ? "active" : ""}`}>
              <a href="#/nosotros">
                Nosotros
                <span className="nav-caret" aria-hidden="true"></span>
              </a>
              <div className="dropdown">
                <a href="#/historia" className={isActive("#/historia") ? "active-link" : ""}>Historia</a>
                <a href="/ORGANIGRAMA-FECA.pdf" target="_blank" rel="noreferrer">Organigrama</a>
                <a href="/PDUA-SILD27.pdf" target="_blank" rel="noreferrer">PDUA</a>
                <a href="#/mision-vision" className={isActive("#/mision-vision") ? "active-link" : ""}>Misión y visión</a>
                <a href="#/nosotros/valores" className={isActive("#/nosotros/valores") ? "active-link" : ""}>Valores</a>
                <a href="#/nosotros/politicas" className={isActive("#/nosotros/politicas") ? "active-link" : ""}>Políticas</a>
                <a href="#/nosotros/ejes-rectores" className={isActive("#/nosotros/ejes-rectores") ? "active-link" : ""}>Ejes rectores</a>
                <a href="#/nosotros/marco-normativo" className={isActive("#/nosotros/marco-normativo") ? "active-link" : ""}>Marco normativo</a>
              </div>
            </div>
          </div>

          <div className="nav-search-wrapper">
            <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">
              <img src="/imagenes/suma_logo.png" alt="SUMA+" className="suma-logo" />
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M2 15h8" />
              <path d="M2 12h6" />
              <path d="M2 18h8" />
            </svg>
          </button>

          {/* Hamburger — solo visible en móvil */}
          <button
            type="button"
            className={`hamburger${mobileMenuOpen ? " is-open" : ""}`}
            ref={hamburgerRef}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Overlay oscuro detrás del menú móvil */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobile} aria-hidden="true" />
      )}

      {/* Menú móvil — drawer lateral */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu${mobileMenuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
      >
        {/* Cabecera del drawer */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-header-brand">
            <span>FECA</span>
            <span>UJED · Menú</span>
          </div>
          <button className="mobile-menu-close" onClick={closeMobile} aria-label="Cerrar menú">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mobile-menu-body">
          {/* Inicio */}
          <a href="#/" className="mobile-nav-link" onClick={closeMobile}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Inicio
          </a>

          {/* Oferta Educativa */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-section-label">Oferta educativa</span>
            <a href="#/licenciaturas" className="mobile-nav-sub" onClick={closeMobile}>Licenciaturas</a>
            <a href="#/licenciaturas-distancia" className="mobile-nav-sub" onClick={closeMobile}>Licenciaturas a distancia</a>
            <a href="https://posgradofeca.ujed.mx/" className="mobile-nav-sub" target="_blank" rel="noreferrer" onClick={closeMobile}>Posgrado</a>
            <a href="#/celci" className="mobile-nav-sub" onClick={closeMobile}>CELCI</a>
            <a href="#/ciiedo" className="mobile-nav-sub" onClick={closeMobile}>CIIEDO</a>
          </div>

          {/* Servicios */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-section-label">Servicios</span>
            <a href="#/servicios" className="mobile-nav-sub" onClick={closeMobile}>Todos los servicios</a>
            <a href="#/biblioteca" className="mobile-nav-sub" onClick={closeMobile}>Biblioteca</a>
            <a href="/docs/LCPEI.pdf" className="mobile-nav-sub" target="_blank" rel="noreferrer" onClick={closeMobile}>CPEI</a>
            <a href="https://mat.ujed.mx/" className="mobile-nav-sub" target="_blank" rel="noreferrer" onClick={closeMobile}>Tutorías</a>
          </div>

          {/* Nosotros */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-section-label">Nosotros</span>
            <a href="#/historia" className="mobile-nav-sub" onClick={closeMobile}>Historia</a>
            <a href="#/mision-vision" className="mobile-nav-sub" onClick={closeMobile}>Misión y visión</a>
            <a href="#/nosotros/valores" className="mobile-nav-sub" onClick={closeMobile}>Valores</a>
            <a href="/ORGANIGRAMA-FECA.pdf" className="mobile-nav-sub" target="_blank" rel="noreferrer" onClick={closeMobile}>Organigrama</a>
          </div>
        </div>

        {/* Pie del drawer: contacto + redes */}
        <div className="mobile-menu-footer">
          <a href="tel:6188271365" className="mobile-contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            (618) 827-13-65
          </a>
          <div className="mobile-social">
            <a href="https://www.facebook.com/FECAUJEDMX/" aria-label="Facebook" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <IconFacebook size={18} />
            </a>
            <a href="https://x.com/fecaujedmx" aria-label="X / Twitter" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <IconXTwitter size={18} />
            </a>
            <a href="https://www.instagram.com/fecaujedmx" aria-label="Instagram" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <IconInstagram size={18} />
            </a>
            <a href="https://www.tiktok.com/@fecaujed.mx" aria-label="TikTok" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <IconTikTok size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
