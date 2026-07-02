import { useEffect, useRef, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

/* ── Iconos SVG inline ── */
const IconCoffee = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const IconFood = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const IconSnack = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);

const CATEGORY_ICONS = {
  "Bebidas": <IconCoffee />,
  "Comida": <IconFood />,
  "Snacks": <IconSnack />,
};

const CATEGORY_COLORS = {
  "Bebidas": { bg: "linear-gradient(135deg,#7b1218,#951823)", light: "rgba(123,18,24,0.08)", border: "rgba(123,18,24,0.18)" },
  "Comida":  { bg: "linear-gradient(135deg,#9b0000,#e31313)", light: "rgba(155,0,0,0.08)",   border: "rgba(155,0,0,0.18)"   },
  "Snacks":  { bg: "linear-gradient(135deg,#3a0c10,#7b1218)", light: "rgba(58,12,16,0.08)",  border: "rgba(58,12,16,0.18)"  },
};

/* ── Componente contador animado ── */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const target = parseInt(value) || 0;
          if (!target) { setCount(value); return; }
          let start = 0;
          const duration = 1200;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{typeof count === "number" ? count.toLocaleString() : count}{suffix}</span>;
}

/* ── Tarjeta de menú ── */
function MenuCard({ categoria, items }) {
  const colors = CATEGORY_COLORS[categoria] || CATEGORY_COLORS["Bebidas"];
  const Icon = CATEGORY_ICONS[categoria];

  return (
    <div className="cafeca-menu-card">
      <div className="cafeca-menu-card-header" style={{ background: colors.bg }}>
        <div className="cafeca-menu-card-icon">{Icon}</div>
        <h3 className="cafeca-menu-card-title">{categoria}</h3>
      </div>
      <ul className="cafeca-menu-card-list">
        {items.map((item) => (
          <li key={item.nombre} className="cafeca-menu-card-item">
            <span className="cafeca-menu-card-item-name">{item.nombre}</span>
            <span className="cafeca-menu-card-item-dots" aria-hidden="true" />
            <span className="cafeca-menu-card-item-price">${item.precio}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Galería Masonry animada ── */
function GallerySection({ gallery }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="cafeca-gallery-grid">
      {gallery.map((photo, i) => (
        <div
          key={photo.title}
          className={`cafeca-gallery-item cafeca-gallery-item-${i + 1}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ "--hover": hovered === i ? 1 : 0 }}
        >
          <img src={photo.image} alt={photo.title} loading="lazy" />
          <div className="cafeca-gallery-overlay">
            <span className="cafeca-gallery-label">{photo.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Componente principal ── */
function CafecaPage({ content, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("cafeca-visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".cafeca-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!content) return null;

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute={content.routeGroup}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ══════════ HERO ══════════ */}
      <section className="cafeca-hero">
        <div
          className="cafeca-hero-bg"
          style={{ backgroundImage: `url('${content.heroImage}')` }}
        />
        <div className="cafeca-hero-gradient" />

        <div className="cafeca-hero-content">
          <div className="cafeca-hero-badge cafeca-fade">
            <span className="cafeca-hero-badge-dot" />
            {content.kicker}
          </div>
          <h1 className="cafeca-hero-title cafeca-fade">{content.title}</h1>
          <p className="cafeca-hero-sub cafeca-fade">{content.intro}</p>

          <div className="cafeca-hero-cta-row cafeca-fade">
            <a href="#cafeca-menu" className="cafeca-btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById("cafeca-menu")?.scrollIntoView({ behavior: "smooth" }); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>
              Ver menú
            </a>
            <a href="#cafeca-info" className="cafeca-btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById("cafeca-info")?.scrollIntoView({ behavior: "smooth" }); }}>
              Más información
            </a>
          </div>
        </div>

        {/* Stats flotantes */}
        {content.stats && (
          <div className="cafeca-hero-stats cafeca-fade">
            {content.stats.map((stat) => (
              <div key={stat.label} className="cafeca-hero-stat">
                <span className="cafeca-hero-stat-label">{stat.label}</span>
                <span className="cafeca-hero-stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="cafeca-hero-scroll">
          <span />
        </div>
      </section>

      {/* ══════════ GALERÍA ══════════ */}
      {content.gallery && (
        <section className="cafeca-section cafeca-section-cream">
          <div className="cafeca-container">
            <div className="cafeca-section-head cafeca-fade">
              <span className="cafeca-kicker">Así se vive</span>
              <h2 className="cafeca-section-title">Un rincón con sabor universitario</h2>
              <p className="cafeca-section-sub">El lugar favorito para recargar energías entre clases</p>
            </div>
            <GallerySection gallery={content.gallery} />
          </div>
        </section>
      )}

      {/* ══════════ MENÚ ══════════ */}
      {content.menu && (
        <section id="cafeca-menu" className="cafeca-section cafeca-section-dark">
          <div className="cafeca-container">
            <div className="cafeca-section-head cafeca-fade">
              <span className="cafeca-kicker cafeca-kicker-light">Lo que ofrecemos</span>
              <h2 className="cafeca-section-title cafeca-title-light">Nuestro menú</h2>
              <p className="cafeca-section-sub cafeca-sub-light">Precios accesibles pensados para la comunidad universitaria</p>
            </div>

            <div className="cafeca-menu-grid cafeca-fade">
              {content.menu.map((cat) => (
                <MenuCard key={cat.categoria} categoria={cat.categoria} items={cat.items} />
              ))}
            </div>

            {content.menuNote && (
              <p className="cafeca-menu-note cafeca-fade">{content.menuNote}</p>
            )}
          </div>
        </section>
      )}

      {/* ══════════ INFO + PANELES ══════════ */}
      {content.panels && (
        <section id="cafeca-info" className="cafeca-section cafeca-section-light">
          <div className="cafeca-container">
            <div className="cafeca-section-head cafeca-fade">
              <span className="cafeca-kicker">Información</span>
              <h2 className="cafeca-section-title">Todo lo que necesitas saber</h2>
            </div>

            <div className="cafeca-panels-grid cafeca-fade">
              {content.panels.filter((p) => !p.items).map((panel) => (
                <div key={panel.title} className={`cafeca-panel cafeca-panel-text ${panel.variant === "contact" ? "cafeca-panel-contact" : ""}`}>
                  <div className="cafeca-panel-icon-wrap">
                    {panel.variant === "contact" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    )}
                  </div>
                  <h3 className="cafeca-panel-title">{panel.title}</h3>
                  <p className="cafeca-panel-body">{panel.body}</p>
                </div>
              ))}

              {content.panels.filter((p) => p.items).map((panel) => (
                <div key={panel.title} className="cafeca-panel cafeca-panel-list">
                  <div className="cafeca-panel-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  </div>
                  <h3 className="cafeca-panel-title">{panel.title}</h3>
                  <ul className="cafeca-panel-list-items">
                    {panel.items.map((item) => (
                      <li key={item}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="cafeca-cta cafeca-fade">
        <div className="cafeca-container">
          <div className="cafeca-cta-inner">
            <div className="cafeca-cta-icon"><IconCoffee /></div>
            <h2 className="cafeca-cta-title">¿Hambre entre clases?</h2>
            <p className="cafeca-cta-sub">Visítanos durante la jornada académica y encuentra el sabor que buscas</p>
            <a href="#/" className="cafeca-btn-primary cafeca-btn-large" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Regresar al inicio
            </a>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default CafecaPage;
