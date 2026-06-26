import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const STATS = [
  { num: "40,000+", label: "Egresados registrados" },
  { num: "95%", label: "Índice de empleabilidad" },
  { num: "3", label: "Licenciaturas" },
  { num: "68", label: "Años de trayectoria" },
];

const CARRERAS = ["Todas", "Contador Público", "Licenciado en Administración", "Lic. en Economía y Negocios Internacionales"];
const GENERACIONES = ["Todas", "2020–2024", "2015–2019", "2010–2014", "Antes de 2010"];

const EGRESADOS_MUESTRA = [
  {
    nombre: "Ana Fernández Torres",
    carrera: "Contador Público",
    generacion: "2019",
    empresa: "Deloitte México",
    puesto: "Auditora Senior",
    sector: "Consultoría",
    ciudad: "Durango",
    iniciales: "AF",
  },
  {
    nombre: "Carlos Reyes Valles",
    carrera: "Licenciado en Administración",
    generacion: "2021",
    empresa: "Grupo Lala",
    puesto: "Gerente de Operaciones",
    sector: "Industria alimentaria",
    ciudad: "Durango",
    iniciales: "CR",
  },
  {
    nombre: "Laura Medina Ochoa",
    carrera: "Lic. en Economía y Negocios Internacionales",
    generacion: "2018",
    empresa: "Banco de México",
    puesto: "Analista Económica",
    sector: "Sector financiero",
    ciudad: "Ciudad de México",
    iniciales: "LM",
  },
  {
    nombre: "Rodrigo Salas Domínguez",
    carrera: "Contador Público",
    generacion: "2022",
    empresa: "SAT",
    puesto: "Inspector Fiscal",
    sector: "Sector público",
    ciudad: "Durango",
    iniciales: "RS",
  },
  {
    nombre: "María José Olvera",
    carrera: "Licenciado en Administración",
    generacion: "2020",
    empresa: "CEMEX",
    puesto: "Coordinadora RH",
    sector: "Construcción",
    ciudad: "Monterrey",
    iniciales: "MO",
  },
  {
    nombre: "Diego Ríos Herrera",
    carrera: "Lic. en Economía y Negocios Internacionales",
    generacion: "2017",
    empresa: "Banco Azteca",
    puesto: "Director Regional",
    sector: "Sector financiero",
    ciudad: "Guadalajara",
    iniciales: "DR",
  },
];

const SECTORES = [
  { icon: "💼", label: "Consultoría y finanzas", pct: 38 },
  { icon: "🏛️", label: "Sector público", pct: 22 },
  { icon: "🏭", label: "Industria y manufactura", pct: 20 },
  { icon: "🌐", label: "Comercio internacional", pct: 12 },
  { icon: "📊", label: "Otros sectores", pct: 8 },
];

const FORM_INITIAL = {
  nombre: "", apellidos: "", correo: "", telefono: "",
  matricula: "", generacion: "", carrera: "",
  empresa: "", puesto: "", sector: "", ciudad: "",
  areaAfin: "",
};

function EgresadosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  const [tab, setTab] = useState("registro");
  const [form, setForm] = useState(FORM_INITIAL);
  const [enviado, setEnviado] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("Todas");
  const [filtroGen, setFiltroGen] = useState("Todas");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setForm(FORM_INITIAL);
    window.setTimeout(() => setEnviado(false), 6000);
  };

  const egresadosFiltrados = EGRESADOS_MUESTRA.filter((eg) => {
    const q = busqueda.toLowerCase();
    const coincideBusqueda =
      !q ||
      eg.nombre.toLowerCase().includes(q) ||
      eg.empresa.toLowerCase().includes(q) ||
      eg.puesto.toLowerCase().includes(q) ||
      eg.ciudad.toLowerCase().includes(q);

    const coincideCarrera = filtroCarrera === "Todas" || eg.carrera === filtroCarrera;

    const coincideGen =
      filtroGen === "Todas" ||
      (filtroGen === "2020–2024" && Number(eg.generacion) >= 2020) ||
      (filtroGen === "2015–2019" && Number(eg.generacion) >= 2015 && Number(eg.generacion) <= 2019) ||
      (filtroGen === "2010–2014" && Number(eg.generacion) >= 2010 && Number(eg.generacion) <= 2014) ||
      (filtroGen === "Antes de 2010" && Number(eg.generacion) < 2010);

    return coincideBusqueda && coincideCarrera && coincideGen;
  });

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      {/* ── HERO ── */}
      <section
        className="pf-hero"
        style={{ backgroundImage: "url('/imagenes/feca-entrada.jpg')" }}
      >
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Comunidad · FECA</div>
          <h1 className="pf-hero-title">
            Seguimiento de<br />Egresados
          </h1>
          <p className="pf-hero-sub">
            Mantente conectado con la comunidad FECA. Registra tu trayectoria profesional,
            accede al directorio de egresados y fortalece tu red de contactos.
          </p>
          <div className="pf-hero-ctas">
            <a href="#form-egresado" className="pf-btn-primary">Registrarme</a>
            <a href="#directorio" className="pf-btn-outline">Ver directorio</a>
          </div>
        </div>
        <div className="pf-stats">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ¿POR QUÉ REGISTRARSE? ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Beneficios</div>
            <h2 className="pf-section-title">¿Por qué mantener tus datos actualizados?</h2>
            <p className="pf-section-desc">
              Tu información nos ayuda a mejorar los programas académicos y a conectarte
              con oportunidades que impulsen tu carrera profesional.
            </p>
          </div>

          <div className="pf-cards-grid pf-fade">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "Red de contactos",
                desc: "Conéctate con más de 40,000 egresados activos en empresas líderes del país y el mundo.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                ),
                title: "Bolsa de trabajo",
                desc: "Accede a vacantes exclusivas para egresados FECA compartidas por empresas aliadas.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                ),
                title: "Educación continua",
                desc: "Recibe información sobre diplomados, cursos y posgrados con descuentos especiales para exalumnos.",
              },
            ].map((c) => (
              <div key={c.title} className="pf-card pf-card-top">
                <div className="pf-card-icon">{c.icon}</div>
                <h3 className="pf-card-title">{c.title}</h3>
                <p className="pf-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <section className="pf-section pf-section-alt pf-fade" id="form-egresado">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Formulario</div>
            <h2 className="pf-section-title">Registra tu información</h2>
            <p className="pf-section-desc">
              Completa el formulario con tus datos actuales. Solo toma 2 minutos.
            </p>
          </div>

          <div className="eg-form-card pf-fade">
            <div className="eg-tabs">
              <button
                className={`eg-tab ${tab === "registro" ? "eg-tab--active" : ""}`}
                onClick={() => setTab("registro")}
              >
                Nuevo registro
              </button>
              <button
                className={`eg-tab ${tab === "actualizar" ? "eg-tab--active" : ""}`}
                onClick={() => setTab("actualizar")}
              >
                Actualizar mis datos
              </button>
            </div>

            {enviado ? (
              <div className="eg-success">
                <div className="eg-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="32" height="32">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="eg-success-title">¡Registro recibido!</h3>
                <p className="eg-success-desc">
                  Tus datos han sido registrados correctamente. En breve recibirás un correo de confirmación.
                  Gracias por mantenerte conectado con la comunidad FECA.
                </p>
              </div>
            ) : (
              <form className="eg-form" onSubmit={handleSubmit}>
                <div className="eg-form-section-title">Datos personales</div>
                <div className="eg-grid-2">
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-nombre">Nombre(s) *</label>
                    <input
                      id="eg-nombre"
                      name="nombre"
                      className="eg-input"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Ej. María José"
                      required
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-apellidos">Apellidos *</label>
                    <input
                      id="eg-apellidos"
                      name="apellidos"
                      className="eg-input"
                      value={form.apellidos}
                      onChange={handleChange}
                      placeholder="Ej. Ramírez Torres"
                      required
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-correo">Correo electrónico *</label>
                    <input
                      id="eg-correo"
                      name="correo"
                      type="email"
                      className="eg-input"
                      value={form.correo}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-telefono">Teléfono</label>
                    <input
                      id="eg-telefono"
                      name="telefono"
                      type="tel"
                      className="eg-input"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="(618) 000-0000"
                    />
                  </div>
                </div>

                <div className="eg-form-section-title" style={{ marginTop: 28 }}>Datos académicos</div>
                <div className="eg-grid-3">
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-matricula">Número de matrícula</label>
                    <input
                      id="eg-matricula"
                      name="matricula"
                      className="eg-input"
                      value={form.matricula}
                      onChange={handleChange}
                      placeholder="Ej. 180045"
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-generacion">Año de egreso *</label>
                    <input
                      id="eg-generacion"
                      name="generacion"
                      type="number"
                      min="1958"
                      max="2030"
                      className="eg-input"
                      value={form.generacion}
                      onChange={handleChange}
                      placeholder="Ej. 2022"
                      required
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-carrera">Carrera *</label>
                    <select
                      id="eg-carrera"
                      name="carrera"
                      className="eg-input eg-select"
                      value={form.carrera}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una carrera</option>
                      <option>Contador Público</option>
                      <option>Licenciado en Administración</option>
                      <option>Lic. en Economía y Negocios Internacionales</option>
                      <option>Posgrado</option>
                    </select>
                  </div>
                </div>

                <div className="eg-form-section-title" style={{ marginTop: 28 }}>Situación laboral actual</div>
                <div className="eg-grid-2">
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-empresa">Empresa / Institución</label>
                    <input
                      id="eg-empresa"
                      name="empresa"
                      className="eg-input"
                      value={form.empresa}
                      onChange={handleChange}
                      placeholder="Ej. Deloitte México"
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-puesto">Puesto actual</label>
                    <input
                      id="eg-puesto"
                      name="puesto"
                      className="eg-input"
                      value={form.puesto}
                      onChange={handleChange}
                      placeholder="Ej. Contador Senior"
                    />
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-sector">Sector</label>
                    <select
                      id="eg-sector"
                      name="sector"
                      className="eg-input eg-select"
                      value={form.sector}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un sector</option>
                      <option>Consultoría y auditoría</option>
                      <option>Sector financiero y bancario</option>
                      <option>Sector público / Gobierno</option>
                      <option>Industria y manufactura</option>
                      <option>Comercio y servicios</option>
                      <option>Comercio internacional</option>
                      <option>Educación e investigación</option>
                      <option>Emprendimiento propio</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="eg-field">
                    <label className="eg-label" htmlFor="eg-ciudad">Ciudad</label>
                    <input
                      id="eg-ciudad"
                      name="ciudad"
                      className="eg-input"
                      value={form.ciudad}
                      onChange={handleChange}
                      placeholder="Ej. Durango"
                    />
                  </div>
                </div>

                <div className="eg-field eg-field-full" style={{ marginTop: 16 }}>
                  <label className="eg-label">¿Trabajas en un área afín a tu carrera? *</label>
                  <div className="eg-radio-group">
                    {["Sí", "No", "Trabajo independiente / Emprendimiento"].map((op) => (
                      <label key={op} className="eg-radio-label">
                        <input
                          type="radio"
                          name="areaAfin"
                          value={op}
                          checked={form.areaAfin === op}
                          onChange={handleChange}
                          className="eg-radio"
                        />
                        {op}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="eg-form-actions">
                  <button type="submit" className="pf-btn-primary eg-submit-btn">
                    {tab === "registro" ? "Enviar registro" : "Actualizar datos"}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className="eg-form-note">
                    * Campos obligatorios. Tu información es confidencial y solo se usará con fines institucionales.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── DIRECTORIO ── */}
      <section className="pf-section pf-section-light pf-fade" id="directorio">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Comunidad</div>
            <h2 className="pf-section-title">Directorio de egresados</h2>
            <p className="pf-section-desc">
              Conoce la trayectoria de quienes forman parte de la comunidad FECA alrededor del mundo.
            </p>
          </div>

          <div className="eg-dir-filters pf-fade">
            <div className="eg-search-wrap">
              <svg className="eg-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="eg-search"
                type="search"
                placeholder="Buscar por nombre, empresa o ciudad…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <select
              className="eg-filter-select"
              value={filtroCarrera}
              onChange={(e) => setFiltroCarrera(e.target.value)}
            >
              {CARRERAS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              className="eg-filter-select"
              value={filtroGen}
              onChange={(e) => setFiltroGen(e.target.value)}
            >
              {GENERACIONES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          {egresadosFiltrados.length === 0 ? (
            <div className="eg-empty pf-fade">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>No se encontraron egresados con esos filtros.</p>
            </div>
          ) : (
            <div className="eg-dir-grid pf-fade">
              {egresadosFiltrados.map((eg) => (
                <article key={eg.nombre} className="eg-dir-card">
                  <div className="eg-dir-avatar">{eg.iniciales}</div>
                  <div className="eg-dir-info">
                    <h4 className="eg-dir-nombre">{eg.nombre}</h4>
                    <span className="eg-dir-carrera">{eg.carrera} · {eg.generacion}</span>
                    <div className="eg-dir-trabajo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      {eg.puesto} — {eg.empresa}
                    </div>
                    <div className="eg-dir-meta">
                      <span className="eg-dir-chip">{eg.sector}</span>
                      <span className="eg-dir-ciudad">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {eg.ciudad}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="eg-dir-note pf-fade">
            Este es un directorio de muestra. Al conectar la base de datos, aparecerán los perfiles reales de egresados que hayan dado su consentimiento para ser mostrados.
          </p>
        </div>
      </section>

      {/* ── ESTADÍSTICAS DE EMPLEABILIDAD ── */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Impacto</div>
            <h2 className="pf-section-title pf-title-white">Empleabilidad de nuestros egresados</h2>
            <p className="pf-section-desc pf-desc-white">
              El 95% de nuestros egresados se integra al mercado laboral dentro de los primeros 6 meses
              después de graduarse.
            </p>
          </div>

          <div className="eg-sectores pf-fade">
            {SECTORES.map((s) => (
              <div key={s.label} className="eg-sector-item">
                <div className="eg-sector-header">
                  <span className="eg-sector-icon">{s.icon}</span>
                  <span className="eg-sector-label">{s.label}</span>
                  <span className="eg-sector-pct">{s.pct}%</span>
                </div>
                <div className="eg-sector-bar">
                  <div className="eg-sector-fill" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUMA+ CTA ── */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div className="eg-cta-banner">
            <div className="eg-cta-left">
              <div className="pf-label">Plataforma oficial</div>
              <h2 className="pf-section-title">SUMA+ FECA</h2>
              <p className="pf-section-desc" style={{ marginBottom: 28 }}>
                La plataforma institucional de egresados de la UJED. Regístrate para acceder a
                bolsa de trabajo, red de contactos y noticias exclusivas del sector.
              </p>
              <a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer" className="pf-btn-primary">
                Ir a SUMA+ FECA
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div className="eg-cta-graphic">
              <div className="eg-cta-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="64" height="64">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="eg-cta-num">40,000+</span>
              <span className="eg-cta-sublabel">egresados en la red</span>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default EgresadosPage;
