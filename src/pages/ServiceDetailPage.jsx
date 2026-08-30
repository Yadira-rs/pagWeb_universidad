import { useEffect, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="3" y="2" width="14" height="18" rx="2" fill="#951823" opacity="0.15"/>
    <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#951823" strokeWidth="1.5" fill="white"/>
    <path d="M14 2v4h4" stroke="#951823" strokeWidth="1.5" fill="none"/>
    <line x1="7" y1="10" x2="15" y2="10" stroke="#951823" strokeWidth="1.2"/>
    <line x1="7" y1="13" x2="15" y2="13" stroke="#951823" strokeWidth="1.2"/>
    <line x1="7" y1="16" x2="12" y2="16" stroke="#951823" strokeWidth="1.2"/>
  </svg>
);

function groupItems(items) {
  const groups = [];
  let current = null;
  items.forEach((item) => {
    if (item.title && item.body) {
      current = { title: item.title, rows: [] };
      groups.push(current);
      current.rows.push({ label: item.body, href: item.href });
    } else if (item.title && !item.body) {
      current = { title: null, rows: [{ label: item.title, href: item.href }] };
      groups.push(current);
    } else {
      if (!current) { current = { title: null, rows: [] }; groups.push(current); }
      current.rows.push({ label: item.body, href: item.href });
    }
  });
  return groups;
}

function DocRow({ href, label, subtitle }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="doc-row"
    >
      <span className="doc-row-icon" aria-hidden="true"><DocIcon /></span>
      <span className="doc-row-text">
        <span className="doc-row-label">{label}</span>
        {subtitle && <span className="doc-row-sub">{subtitle}</span>}
      </span>
    </a>
  );
}

function inicialesCA(nombre) {
  const partes = String(nombre).trim().split(/\s+/).filter(Boolean);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

function ServiceDetailPage({
  content,
  logoImage,
  newsPanelOpen,
  setNewsPanelOpen,
}) {
  const [caAbierto, setCaAbierto] = useState(null);

  useEffect(() => {
    if (!caAbierto) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setCaAbierto(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [caAbierto]);

  if (!content) return null;

  const cuerposAcademicos = content.cuerposAcademicos ?? [];

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section className="history-page-hero institutional-hero">
        <div className="history-page-overlay"></div>
        <div className="history-page-inner">
          <h1 className="history-page-title">{content.heroTitle}</h1>
          <p className="mission-vision-hero-copy">{content.intro}</p>
        </div>
      </section>

      {content.encargado && (
        <section className="pf-section pf-section-alt">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Quién nos atiende</div>
              <h2 className="pf-section-title">{content.encargado.role}</h2>
            </div>
            <div className="encargado-card">
              <div className="encargado-card-photo">
                <img src={content.encargado.image} alt={content.encargado.role} />
              </div>
              <div className="encargado-card-body">
                <span className="encargado-card-badge">{content.encargado.role}</span>
                <h3 className="encargado-card-name">{content.encargado.name}</h3>
                {content.encargado.quote && (
                  <p className="encargado-card-quote">"{content.encargado.quote}"</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {cuerposAcademicos.length > 0 && (
        <section className="pf-section pf-section-light">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Investigación</div>
              <h2 className="pf-section-title">Cuerpos Académicos de la FECA</h2>
              <p className="pf-section-desc">
                Selecciona un cuerpo académico para consultar su número de
                registro, líneas de generación y aplicación del conocimiento
                (LGAC) e integrantes.
              </p>
            </div>

            <div className="ca-grid">
              {cuerposAcademicos.map((ca) => (
                <button
                  type="button"
                  key={ca.slug}
                  className="ca-card"
                  onClick={() => setCaAbierto(ca)}
                >
                  {ca.numero && <span className="ca-card-num">{ca.numero}</span>}
                  <span className="ca-card-nombre">{ca.nombre}</span>
                  {ca.grado && <span className="ca-card-grado">{ca.grado}</span>}
                  <span className="ca-card-link">
                    Ver cuerpo académico
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.gallery && content.gallery.length > 0 && (
        <section className="pf-section pf-section-light">
          <div className="pf-container">
            <div className="pf-section-head pf-section-head-center">
              <div className="pf-label">Nuestro equipo</div>
              <h2 className="pf-section-title">Galería</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {content.gallery.map((src) => (
                <div key={src} style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "3/4" }}>
                  <img
                    src={src}
                    alt={content.heroTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="details-page doc-list-page">
        {content.coordinator && (
          <div className="coord-card">
            <div className="coord-card-photo">
              <img src={content.coordinator.image} alt={content.coordinator.badge} />
            </div>
            <div className="coord-card-body">
              <span className="coord-card-badge">{content.coordinator.badge}</span>
              {content.coordinator.name && (
                <h3 className="coord-card-name">{content.coordinator.name}</h3>
              )}
              <p className="coord-card-quote">{content.intro}</p>
            </div>
          </div>
        )}
        {content.items.length === 0 ? null : content.grouped ? (
          groupItems(content.items).map((group, gi) => (
            <div key={gi} className="doc-group">
              {group.title && <h2 className="doc-group-title">{group.title}</h2>}
              <div className="doc-group-body">
                {group.rows.map((row, ri) => (
                  <DocRow key={ri} href={row.href} label={row.label} />
                ))}
              </div>
            </div>
          ))
        ) : (
          content.items.map((item, index) => {
            if (item.href) {
              const label = item.title ?? item.body;
              const subtitle = item.title && item.body ? item.body : null;
              return (
                <DocRow key={index} href={item.href} label={label} subtitle={subtitle} />
              );
            }
            return (
              <div key={index} className="doc-text-block">
                {item.title && <h2 className="doc-section-heading">{item.title}</h2>}
                {item.body && <p className="doc-section-body">{item.body}</p>}
                {item.list && (
                  <ul className="doc-section-list">
                    {item.list.map((li, li_i) => <li key={li_i}>{li}</li>)}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </main>

      {caAbierto && (
        <div
          className="ca-modal-overlay"
          onClick={() => setCaAbierto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={caAbierto.nombre}
        >
          <div className="ca-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ca-modal-close"
              onClick={() => setCaAbierto(null)}
              aria-label="Cerrar"
            >
              &times;
            </button>

            <div className="ca-modal-head">
              {caAbierto.grado && (
                <span className="ca-modal-grado">{caAbierto.grado}</span>
              )}
              <h2 className="ca-modal-title">{caAbierto.nombre}</h2>
            </div>

            <div className="ca-modal-body">
              {caAbierto.numero && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Número de CA</h3>
                  <p className="ca-field-text">{caAbierto.numero}</p>
                </div>
              )}

              {caAbierto.estatus && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Estatus</h3>
                  <p className="ca-field-text">{caAbierto.estatus}</p>
                </div>
              )}

              {caAbierto.lgac && caAbierto.lgac.length > 0 && (
                <div className="ca-field">
                  <h3 className="ca-field-label">
                    Líneas de generación y aplicación del conocimiento
                  </h3>
                  <ol className="ca-field-list">
                    {caAbierto.lgac.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                </div>
              )}

              {caAbierto.objetivo && caAbierto.objetivo.length > 0 && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Objetivo de la LGAC</h3>
                  {caAbierto.objetivo.map((p, i) => (
                    <p key={i} className="ca-field-text">{p}</p>
                  ))}
                </div>
              )}

              {caAbierto.descripcion && caAbierto.descripcion.length > 0 && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Descripción de la LGAC</h3>
                  {caAbierto.descripcion.map((p, i) => (
                    <p key={i} className="ca-field-text">{p}</p>
                  ))}
                </div>
              )}

              {caAbierto.area && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Área de conocimiento</h3>
                  <p className="ca-field-text">{caAbierto.area}</p>
                </div>
              )}

              {caAbierto.disciplinas && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Disciplinas</h3>
                  <p className="ca-field-text">{caAbierto.disciplinas}</p>
                </div>
              )}

              {caAbierto.integrantes && caAbierto.integrantes.length > 0 && (
                <div className="ca-field">
                  <h3 className="ca-field-label">Integrantes</h3>
                  <ul className="ca-integrantes">
                    {caAbierto.integrantes.map((m) => (
                      <li key={m.nombre} className="ca-integrante">
                        <span className="ca-integrante-avatar" aria-hidden="true">
                          {inicialesCA(m.nombre)}
                        </span>
                        <span className="ca-integrante-info">
                          <span className="ca-integrante-nombre">
                            {m.grado} {m.nombre}
                          </span>
                          {m.rol && (
                            <span className="ca-integrante-rol">{m.rol}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!caAbierto.numero &&
                (!caAbierto.lgac || caAbierto.lgac.length === 0) &&
                (!caAbierto.integrantes ||
                  caAbierto.integrantes.length === 0) && (
                  <p className="ca-field-text ca-field-empty">
                    La información detallada de este cuerpo académico se
                    publicará próximamente.
                  </p>
                )}
            </div>
          </div>
        </div>
      )}

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ServiceDetailPage;
