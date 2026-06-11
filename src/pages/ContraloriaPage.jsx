import Header from "../sections/Header";
import Footer from "../sections/Footer";

function ContraloriaPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      <section
        className="hero small-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45)), url('/imagenes/contraloria_feca.png')",
        }}
      >
        <div className="hero-content">
          <div className="hero-tag">Servicios</div>
          <h1>Contraloría Interna FECA</h1>
          <p>
            Órgano de control, fiscalización y transparencia de la Facultad de Economía, Contaduría y Administración.
          </p>
        </div>
      </section>

      <main>
        <section className="section" style={{ padding: "80px 0" }}>
          <div className="container">
            <div className="fade-up">
              <div className="section-label">Transparencia y Legalidad</div>
              <h2 className="section-title">
                ¿Qué es la
                <br />
                Contraloría Interna?
              </h2>
              <p className="section-desc">
                Es la instancia encargada de promover e implementar mecanismos de control, supervisión, transparencia y rendición de cuentas dentro de la FECA. Trabajamos para asegurar el uso eficiente y honesto de los recursos, impulsando el cumplimiento normativo y abriendo canales de comunicación directa con nuestra comunidad.
              </p>
            </div>

            <div className="contraloria-grid" style={{ marginTop: "48px" }}>
              <div className="contraloria-info">
                <div className="info-box">
                  <h2>Nuestra Misión</h2>
                  <p>
                    Garantizar la correcta aplicación de los lineamientos administrativos y normativos vigentes de la Universidad Juárez del Estado de Durango (UJED) dentro de nuestra facultad. Fomentamos una cultura de legalidad, ética y honestidad que brinde certeza a estudiantes, personal académico y administrativo.
                  </p>
                </div>

                <div className="info-box">
                  <h2>Funciones Principales</h2>
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#666' }}>
                    <li style={{ marginBottom: '12px' }}>
                      <strong>Fiscalización y Auditoría:</strong> Vigilamos y auditamos periódicamente la correcta ejecución de los recursos asignados e ingresos propios de la facultad.
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <strong>Control de Procesos:</strong> Evaluamos el cumplimiento de los reglamentos internos para optimizar la gestión de los trámites y servicios académicos.
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <strong>Rendición de Cuentas:</strong> Impulsamos la transparencia en las actividades y decisiones de la administración escolar.
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <strong>Atención Ciudadana:</strong> Facilitamos la recepción de comentarios para resolver dudas o inconformidades en nuestros servicios.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="contraloria-sidebar">
                <div className="info-box" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--gray-light)' }}>
                  <img 
                    src="/imagenes/contraloria_feca.png" 
                    alt="Contraloría Interna FECA" 
                    style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid var(--gray-light)' }} 
                  />
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ margin: '0 0 12px', color: 'var(--navy)', fontFamily: 'var(--font-display)', fontSize: '20px' }}>Atención al Usuario</h3>
                    <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                      La Contraloría Interna está a tu servicio para resolver cualquier inquietud sobre la gestión de trámites y la transparencia institucional en la facultad.
                    </p>
                    <ul style={{ listStyle: 'none', padding: '0', margin: '0', fontSize: '14px', color: '#444' }}>
                      <li style={{ marginBottom: '8px' }}><strong>Ubicación:</strong> Edificio Administrativo FECA</li>
                      <li style={{ marginBottom: '8px' }}><strong>Horario:</strong> Lunes a Viernes, 8:00 AM - 3:00 PM</li>
                      <li><strong>Contacto:</strong> contraloria@feca.ujed.mx</li>
                    </ul>
                  </div>
                </div>

                <div className="info-box" style={{ background: '#fff', border: '1px solid var(--gray-light)', borderLeft: '4px solid var(--navy)' }}>
                  <h2>Quejas y Sugerencias</h2>
                  <p>
                    Tu voz es indispensable para mejorar nuestra facultad. Si tienes alguna queja, sugerencia o comentario respecto al servicio académico o administrativo, puedes hacerlo llegar de manera confidencial y segura.
                  </p>
                  <div className="info-actions" style={{ marginTop: '24px' }}>
                    <a
                      href="https://www.youtube.com/watch?v=w7w59Zp8bEM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '100%', 
                        padding: '14px 20px', 
                        fontSize: '16px',
                        textDecoration: 'none',
                        textAlign: 'center'
                      }}
                    >
                      Buzón de Quejas y Sugerencias
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default ContraloriaPage;
