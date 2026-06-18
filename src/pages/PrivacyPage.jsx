import { useEffect, useRef } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const sections = [
  {
    title: "Responsable del tratamiento de datos",
    content: (
      <p>
        La Facultad de Economía, Contaduría y Administración (FECA) de la Universidad Juárez del Estado
        de Durango (UJED), con domicilio en Fanny Anitúa y Priv. Loza s/n, C.P. 34000, Durango, Dgo.,
        México, es responsable del uso y protección de sus datos personales.
      </p>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: "Datos personales que recabamos",
    content: (
      <ul>
        <li>Nombre completo</li>
        <li>Correo electrónico</li>
        <li>Número telefónico</li>
        <li>Matrícula o número de expediente</li>
        <li>Información académica y laboral</li>
      </ul>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: "Finalidades del tratamiento",
    content: (
      <ul>
        <li>Gestión de trámites escolares y académicos</li>
        <li>Envío de información sobre programas, eventos y convocatorias</li>
        <li>Atención de solicitudes y dudas</li>
        <li>Cumplimiento de obligaciones legales y reglamentarias</li>
      </ul>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: "Transferencia de datos",
    content: (
      <p>
        Sus datos no serán transferidos a terceros sin su consentimiento, salvo en los casos previstos
        por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás
        normativa aplicable.
      </p>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Derechos ARCO",
    content: (
      <p>
        Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales
        (derechos ARCO). Para ejercerlos: <br />
        <strong>Correo:</strong> <a href="mailto:informes@feca.ujed.mx">informes@feca.ujed.mx</a> |{" "}
        <strong>Tel:</strong> (618) 827-13-65 |{" "}
        <strong>Domicilio:</strong> Fanny Anitúa y Priv. Loza s/n, Durango, Dgo.
      </p>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    title: "Cambios al aviso de privacidad",
    content: (
      <p>
        Nos reservamos el derecho de efectuar modificaciones o actualizaciones al presente aviso en cualquier
        momento. Los cambios serán publicados en este sitio web.
      </p>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.47"/>
      </svg>
    ),
  },
];

function PrivacyPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header logoImage={logoImage} currentRoute="" setNewsPanelOpen={setNewsPanelOpen} />

      {/* ── HERO ── */}
      <section
        className="pf-hero pf-hero-sm"
        style={{ background: "linear-gradient(135deg, #9b0000 0%, #c0000c 55%, #e31313 100%)" }}
      >
        <div className="pf-hero-inner" style={{ paddingBottom: 64 }}>
          <div className="pf-hero-badge">Facultad de Economía, Contaduría y Administración — UJED</div>
          <h1 className="pf-hero-title">Aviso de<br />Privacidad</h1>
          <p className="pf-hero-sub">
            Conoce cómo protegemos y tratamos tus datos personales conforme a la legislación vigente.
          </p>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container" style={{ maxWidth: 860 }}>
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label">Información legal</div>
            <h2 className="pf-section-title">Tratamiento de datos personales</h2>
            <p className="pf-section-desc">
              La FECA se compromete a proteger tu privacidad y a manejar tu información con responsabilidad.
            </p>
          </div>
          <div className="pf-fade" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {sections.map((sec) => (
              <div key={sec.title} className="pf-info-box" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div className="pf-card-icon pf-card-icon-light" style={{ flexShrink: 0 }}>
                  {sec.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--navy)", margin: "0 0 10px" }}>
                    {sec.title}
                  </h3>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "var(--gray-mid)", marginTop: 32, textAlign: "center" }}>
            Última actualización: junio 2026
          </p>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default PrivacyPage;
