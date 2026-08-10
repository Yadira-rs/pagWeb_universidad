import { useEffect, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { supabase } from "../lib/supabaseClient";

export default function AvisoDetailPage({ id, logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [aviso, setAviso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("anuncios_noticias")
      .select("tipo, titulo, resumen, fecha_texto, imagen_url, cta_label, cta_href")
      .eq("id", id)
      .eq("publicado", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setAviso(data);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="site-shell">
        <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
        <main style={{ padding: "120px 24px", textAlign: "center" }}>
          <p>Cargando…</p>
        </main>
        <Footer logoImage={logoImage} />
      </div>
    );
  }

  if (!aviso) {
    return (
      <div className="site-shell">
        <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
        <main style={{ padding: "120px 24px", textAlign: "center" }}>
          <p>Este aviso ya no está disponible.</p>
          <a href="#/">← Volver al Inicio</a>
        </main>
        <Footer logoImage={logoImage} />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />

      <main className="dp-main">
        <div className="dp-hero">
          <div className="dp-hero-inner">
            <div className="dp-hero-photo-wrap">
              <img src={aviso.imagen_url} alt={aviso.titulo} className="dp-hero-photo" />
            </div>
            <div className="dp-hero-content">
              <a href="#/" className="dp-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Inicio
              </a>
              <h1 className="dp-hero-name">{aviso.titulo}</h1>
              <span className="dp-hero-role">{aviso.tipo}</span>
            </div>
          </div>
        </div>

        <div className="dp-body">
          {aviso.resumen && (
            <section className="dp-section">
              <div className="dp-section-label">
                <span className="dp-section-rule" />
                INFORMACIÓN
              </div>
              <p className="dp-bio-text">{aviso.resumen}</p>
            </section>
          )}

          {aviso.fecha_texto && (
            <section className="dp-cards-section">
              <div className="dp-info-card">
                <span className="dp-info-label">FECHA</span>
                <span className="dp-info-value">{aviso.fecha_texto}</span>
              </div>
            </section>
          )}

          {aviso.cta_href && (
            <a href={aviso.cta_href} className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              {aviso.cta_label || "Ver más"}
            </a>
          )}
        </div>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}
