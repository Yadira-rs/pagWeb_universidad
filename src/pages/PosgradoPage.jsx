import Footer from "../sections/Footer";
import Header from "../sections/Header";

function PosgradoPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const posgradoPrograms = [
    {
      title: "Especialidad en Administración de Hospitales",
      desc: "Documento del programa de especialidad.",
      pdf: "/docs/Plan_estudio_Especialidad_de_Administracion_de_Hospitales.pdf",
    },
    {
      title: "Maestría en Gestión Pública",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Gestion_Publica.pdf",
    },
    {
      title: "Maestría en Gestión de Negocios",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Gestion_de_Negocios.pdf",
    },
    {
      title: "Maestría en Estrategias Contables",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Estrategias_Contables.pdf",
    },
    {
      title: "Maestría en Mercadotecnia",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Mercadotecnia.pdf",
    },
    {
      title: "Maestría en Economía",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Economia.pdf",
    },
    {
      title: "Maestría en Auditoría Gubernamental",
      desc: "Documento del programa de maestría.",
      pdf: "/docs/Plan_estudio_Maestria_en_Auditoria_Gubernamental.pdf",
    },
    {
      title: "Doctorado en Gestión de las Organizaciones",
      desc: "Documento del programa de doctorado.",
      pdf: "/docs/Plan_estudio_Doctorado_en_Gestion_de_las_Organizaciones.pdf",
    },
  ];

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="legacy-program"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <main className="page-wrap">
        <section className="page-hero" style={{ "--hero-image": "url('/imagenes/lic.jpg')" }}>
          <div className="page-hero-inner">
            <div className="page-label">Oferta académica</div>
            <h1 className="page-title">Posgrado</h1>
            <p className="page-desc">
              Programas de formación avanzada para fortalecer la investigación, la
              gestión y el desarrollo profesional.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Documentos</div>
          <h2 className="section-title">Programas de posgrado</h2>
          <p className="section-desc">Selecciona un programa para descargar su documento informativo.</p>

          <div className="grid">
            {posgradoPrograms.map((program) => (
              <article key={program.title} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <a className="btn-primary" href={program.pdf} download style={{ display: "inline-flex", width: "100%", textAlign: "center", justifyContent: "center" }}>
                    Descargar documento
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Informes</div>
          <h2 className="section-title">Contacto</h2>
          <article className="wide-card">
            <div className="contacto">
              <div>
                <strong>Facultad</strong>
                Facultad de Economía, Contaduría y Administración
              </div>
              <div>
                <strong>Teléfono</strong>
                (618) 827-13-65
              </div>
              <div>
                <strong>Ubicación</strong>
                Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo.
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PosgradoPage;
