import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { getLicenciatura } from "../data/licenciaturasData";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FactIcon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", width: 22, height: 22 };
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>;
  if (name === "pin") return <svg {...common}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === "doc") return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  return <svg {...common}><path d="M22 10v6" /><path d="M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
}

// Los textos de ingreso vienen como {intro, items, cierre} (lista) o como
// {parrafos} (prosa): en ese caso el primero es la introducción, el último
// el cierre y los de en medio se muestran como tarjetas.
function normalizaIngreso(perfil) {
  if (!perfil.parrafos) return perfil;
  const [intro, ...resto] = perfil.parrafos;
  const cierre = resto.length > 1 ? resto[resto.length - 1] : null;
  const items = cierre ? resto.slice(0, -1) : resto;
  return { intro, items, cierre };
}

const SECCIONES = [
  { id: "lic-acerca", label: "La carrera" },
  { id: "lic-ingreso", label: "Perfil de ingreso" },
  { id: "lic-egreso", label: "Perfil de egreso" },
  { id: "lic-campo", label: "Campo laboral" },
  { id: "lic-plan", label: "Plan de estudios" },
];

export default function LicenciaturaDetailPage({ slug, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const licenciatura = getLicenciatura(slug);
  const observerRef = useRef(null);
  const [activa, setActiva] = useState(SECCIONES[0].id);
  const [fija, setFija] = useState(false);
  const slotRef = useRef(null);

  // .site-shell tiene overflow oculto, lo que rompe position: sticky; por eso
  // la barra se fija a mano cuando su hueco llega debajo del menú superior.
  useEffect(() => {
    const onScroll = () => {
      const top = slotRef.current?.getBoundingClientRect().top ?? 1;
      setFija(top <= 68);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiva(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    SECCIONES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [slug]);

  const irA = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!licenciatura) {
    return (
      <div className="site-shell">
        <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
        <main style={{ padding: "120px 24px", textAlign: "center" }}>
          <p>Licenciatura no encontrada.</p>
          <a href="#/oferta-educativa">← Volver a Oferta Educativa</a>
        </main>
        <Footer logoImage={logoImage} />
      </div>
    );
  }

  const { abbr, name, plan, heroImg, tagline, resumen, perfilIngreso, perfilEgreso, campoLaboral, destacados, planEstudiosHref, mapaCurricularHref, mapaCurricularImg } = licenciatura;
  const ingreso = normalizaIngreso(perfilIngreso);
  const [lead, ...restoResumen] = resumen;
  const frase = restoResumen.length > 1 ? restoResumen[restoResumen.length - 1] : null;
  const cuerpoResumen = frase ? restoResumen.slice(0, -1) : restoResumen;

  const datos = [
    { icon: "clock", label: "Duración", value: "8 semestres" },
    { icon: "pin", label: "Modalidad", value: "Presencial" },
    { icon: "doc", label: "Plan de estudios", value: plan.replace("P", "") },
    { icon: "cap", label: "Grado", value: "Licenciatura" },
  ];

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* HERO */}
      <section className="pf-hero lic-hero" style={{ backgroundImage: `url('${heroImg}')` }}>
        <div className="lic-hero-overlay" />
        <div className="pf-hero-inner lic-hero-inner">
          <a href="#/oferta-educativa" className="lic-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Oferta Educativa
          </a>
          <div className="lic-hero-badges">
            <span className="pf-hero-badge">Licenciatura presencial</span>
            <span className="lic-abbr">{abbr}</span>
          </div>
          <h1 className="pf-hero-title lic-hero-title">{name}</h1>
          <p className="pf-hero-sub lic-hero-sub">{tagline}</p>
        </div>
      </section>

      {/* DATOS RÁPIDOS */}
      <div className="lic-facts-wrap">
        <div className="lic-facts">
          {datos.map((d) => (
            <div key={d.label} className="lic-fact">
              <span className="lic-fact-icon"><FactIcon name={d.icon} /></span>
              <span>
                <span className="lic-fact-label">{d.label}</span>
                <span className="lic-fact-value">{d.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NAVEGACIÓN INTERNA */}
      <div className="lic-subnav-slot" ref={slotRef}>
        <nav className={`lic-subnav${fija ? " is-fixed" : ""}`} aria-label="Secciones de la carrera">
          <div className="lic-subnav-inner">
            {SECCIONES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`lic-subnav-btn${activa === s.id ? " is-active" : ""}`}
                onClick={() => irA(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* LA CARRERA */}
      <section id="lic-acerca" className="pf-section pf-fade">
        <div className="pf-container lic-narrow">
          <div className="pf-label">{abbr} · Plan {plan.replace("P", "")}</div>
          <h2 className="pf-section-title">¿De qué se trata esta carrera?</h2>
          <p className="lic-lead">{lead}</p>
          {cuerpoResumen.map((p) => (
            <p key={p} className="pf-section-desc lic-para">{p}</p>
          ))}
          {frase && <blockquote className="lic-quote">{frase}</blockquote>}
        </div>
      </section>

      {/* PERFIL DE INGRESO */}
      <section id="lic-ingreso" className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="lic-head">
            <div className="pf-label">¿Es esta tu carrera?</div>
            <h2 className="pf-section-title">Perfil de ingreso</h2>
            {ingreso.intro && <p className="pf-section-desc lic-head-desc">{ingreso.intro}</p>}
          </div>
          <div className="lic-grid">
            {ingreso.items.map((item) => (
              <div key={item} className="lic-item">
                <span className="lic-item-icon"><CheckIcon /></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          {ingreso.cierre && <p className="lic-closing">{ingreso.cierre}</p>}
        </div>
      </section>

      {/* PERFIL DE EGRESO */}
      <section id="lic-egreso" className="pf-section pf-fade">
        <div className="pf-container">
          <div className="lic-head">
            <div className="pf-label">Al egresar, serás capaz de</div>
            <h2 className="pf-section-title">Perfil de egreso</h2>
            {perfilEgreso.intro && <p className="pf-section-desc lic-head-desc">{perfilEgreso.intro}</p>}
          </div>
          <div className="lic-grid">
            {perfilEgreso.items.map((item, i) => (
              <div key={item} className="lic-item lic-item-num">
                <span className="lic-item-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          {perfilEgreso.cierre && <p className="lic-closing">{perfilEgreso.cierre}</p>}
        </div>
      </section>

      {/* CAMPO LABORAL */}
      <section id="lic-campo" className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="lic-head">
            <div className="pf-label">¿Dónde puedes trabajar?</div>
            <h2 className="pf-section-title">Campo laboral</h2>
            {campoLaboral.intro && <p className="pf-section-desc lic-head-desc">{campoLaboral.intro}</p>}
          </div>
          <div className="lic-chips">
            {campoLaboral.items.map((item) => (
              <span key={item} className="lic-chip">{item}</span>
            ))}
          </div>
          {campoLaboral.cierre && <p className="lic-closing">{campoLaboral.cierre}</p>}
        </div>
      </section>

      {/* POR QUÉ ESTUDIARLA EN LA FECA */}
      <section className="pf-section pf-fade">
        <div className="pf-container">
          <div className="lic-head">
            <div className="pf-label">Nuestra propuesta</div>
            <h2 className="pf-section-title">¿Por qué estudiarla en la FECA?</h2>
          </div>
          <div className="pf-cards-grid lic-cards">
            {destacados.map((item) => (
              <div key={item} className="pf-card">
                <div className="pf-card-icon pf-card-icon-light"><CheckIcon /></div>
                <p className="pf-card-desc" style={{ color: "#444" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN DE ESTUDIOS */}
      <section id="lic-plan" className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Documentos oficiales</div>
            <h2 className="pf-section-title pf-title-white">Plan de estudios {plan}</h2>
            <p className="pf-section-desc pf-desc-white">
              Consulta el plan de estudios completo y el mapa curricular de {name}.
            </p>
          </div>
          {mapaCurricularImg && (
            <a
              href={mapaCurricularImg}
              target="_blank"
              rel="noopener noreferrer"
              className="lic-map"
              title="Abrir mapa curricular en tamaño completo"
            >
              <img
                src={mapaCurricularImg}
                alt={`Mapa curricular de ${name}, plan ${plan}`}
                loading="lazy"
              />
              <span className="lic-map-hint">Clic para ampliar</span>
            </a>
          )}
          <div className="lic-actions">
            <a href={planEstudiosHref} target="_blank" rel="noopener noreferrer" className="lic-btn lic-btn-solid">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar plan de estudios
            </a>
            <a href={mapaCurricularHref} target="_blank" rel="noopener noreferrer" className="lic-btn lic-btn-ghost">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              Ver mapa curricular (PDF)
            </a>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}
