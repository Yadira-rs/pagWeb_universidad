import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import EgresadoUploadModal from "../components/EgresadoUploadModal";
import { supabase } from "../lib/supabaseClient";

/* ── Iconos SVG inline ── */
const IconCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
  </svg>
);

const IconMedal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="12" cy="15" r="6" />
    <path d="M9 10 6 2M15 10l3-8M9.5 15.5 12 13l2.5 2.5" />
  </svg>
);

const IconCertificate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="3" y="3" width="18" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <circle cx="12" cy="9" r="3" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconQuote = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const DOC_CATEGORIES = ["Todos", "Titulación", "Servicio social y prácticas", "Privacidad"];

const DOCUMENTS = [
  { categoria: "Titulación", titulo: "Solicitud de Constancia de Liberación para Titulación", archivo: "/docs/8.- Solicitud de Constancia de Liberación S. para Titulación.pdf" },
  { categoria: "Titulación", titulo: "Requisitos para Informe de Titulación", archivo: "/docs/RequisitosParaInforme.pdf" },
  { categoria: "Titulación", titulo: "Folleto General de Certificaciones", archivo: "/FOLLETO-GENERAL-CERTIFICACIONES.pdf" },
  { categoria: "Servicio social y prácticas", titulo: "Carta de Presentación de Servicio Social", archivo: "/docs/7.- Carta de Presentación Servicio Social.pdf" },
  { categoria: "Servicio social y prácticas", titulo: "Formato de Liberación de Prácticas Profesionales", archivo: "/docs/Formato Ejemplo Carta de Liberacion Practicas Profesionales.pdf" },
  { categoria: "Servicio social y prácticas", titulo: "Liberación por Experiencia Laboral", archivo: "/docs/Liberacion por Experiencia Laboral.pdf" },
  { categoria: "Servicio social y prácticas", titulo: "Liberación del Servicio Social de Pasantes", archivo: "/docs/5.5_Formato_Carta_de_Liberacion_del_Servicio_Social_de_Pasantes.pdf" },
  { categoria: "Privacidad", titulo: "Aviso de Privacidad para Alumnos y Egresados (Integral)", archivo: "/docs/Aviso_de_privacidad_alumnos_y_egresados_integral_1623697828219.pdf" },
  { categoria: "Privacidad", titulo: "Aviso de Privacidad para Alumnos y Egresados (Simplificado)", archivo: "/docs/Aviso_de_privacidad_alumnos_y_egresados_simplificado_1623698005147.pdf" },
];

const STATS = [
  { value: "12,000+", label: "Egresados registrados" },
  { value: "68", label: "Años de trayectoria" },
  { value: "95%", label: "Empleabilidad" },
  { value: "15+", label: "Países con presencia FECA" },
];

const GALLERY = [
  { image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80", title: "Ceremonias de graduación" },
  { image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=700&q=80", title: "Generaciones FECA" },
  { image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=700&q=80", title: "Entrega de reconocimientos" },
  { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80", title: "Momentos que se quedan" },
  { image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80", title: "Lazos que trascienden" },
  { image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80", title: "Celebrando logros" },
  { image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=80", title: "Familias FECA" },
  { image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=80", title: "Un nuevo comienzo" },
];

const RECOGNITIONS = [
  { icon: <IconCertificate />, title: "Título Profesional", desc: "El documento que acredita oficialmente tu grado académico obtenido en la FECA." },
  { icon: <IconCap />, title: "Cédula Profesional", desc: "Registro ante la SEP que te habilita para ejercer tu profesión en México." },
  { icon: <IconStar />, title: "Mención Honorífica", desc: "Reconocimiento a las trayectorias académicas más destacadas de cada generación." },
  { icon: <IconMedal />, title: "Distinción al Mérito Académico", desc: "Para quienes representan la excelencia y los valores de nuestra facultad." },
];

const TESTIMONIALS = [
  {
    generacion: "Generación 2019",
    carrera: "Contador Público",
    puesto: "Gerente de Finanzas",
    quote: "La FECA me dio las bases para enfrentar retos reales desde el primer día de trabajo.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=300&q=80",
  },
  {
    generacion: "Generación 2017",
    carrera: "Lic. en Administración",
    puesto: "Directora de Proyectos",
    quote: "Lo que aprendí en la facultad sigue guiando cada decisión que tomo hoy en mi carrera.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
  },
  {
    generacion: "Generación 2021",
    carrera: "Lic. en Economía y Negocios Internacionales",
    puesto: "Analista de Comercio Exterior",
    quote: "Gracias a la vinculación internacional de la FECA pude abrirme camino fuera del país.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80",
  },
];

function EgresadosPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [docCategory, setDocCategory] = useState("Todos");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [testimonios, setTestimonios] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    supabase
      .from("testimonios")
      .select("*")
      .eq("publicado", true)
      .order("id", { ascending: false })
      .then(({ data }) => data?.length && setTestimonios(data));

    supabase
      .from("galeria_fotos")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => data?.length && setGaleria(data));
  }, []);

  const testimonialCards = (testimonios.length > 0 ? testimonios : TESTIMONIALS).map((t, i) => ({
    key: t.id ?? i,
    quote: t.testimonio ?? t.quote,
    image: t.foto_url || t.image || null,
    title: t.nombre ?? t.puesto,
    meta: [t.carrera, t.generacion].filter(Boolean).join(" · "),
  }));

  const galleryPhotos = (galeria.length > 0 ? galeria : GALLERY).map((g, i) => ({
    key: g.id ?? i,
    image: g.imagen_url || g.image,
    title: g.titulo ?? g.title,
  }));

  const docsFiltrados = docCategory === "Todos"
    ? DOCUMENTS
    : DOCUMENTS.filter((d) => d.categoria === docCategory);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("egr-visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".egr-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="single-section"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* ══════════ HERO ══════════ */}
      <section className="egr-hero">
        <div
          className="egr-hero-bg"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="egr-hero-gradient" />

        <div className="egr-hero-content">
          <div className="egr-hero-badge egr-fade">
            <IconCap />
            Comunidad de egresados
          </div>
          <h1 className="egr-hero-title egr-fade">
            Orgullo <span className="egr-title-accent">FECA</span>
          </h1>
          <p className="egr-hero-sub egr-fade">
            Fotos, títulos y reconocimientos de las generaciones que han pasado por nuestras aulas.
            Un espacio para recordar, celebrar y seguir construyendo comunidad.
          </p>

        </div>

        <div className="egr-hero-stats egr-fade">
          {STATS.map((stat) => (
            <div key={stat.label} className="egr-hero-stat">
              <span className="egr-hero-stat-value">{stat.value}</span>
              <span className="egr-hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ GALERÍA ══════════ */}
      <section id="egr-galeria" className="egr-section egr-section-cream">
        <div className="egr-container">
          <div className="egr-section-head egr-fade">
            <span className="egr-kicker">Así se vive</span>
            <h2 className="egr-section-title">Momentos que enorgullecen</h2>
            <p className="egr-section-sub">Cada generación deja huella. Estos son algunos de esos momentos.</p>
          </div>

          <div className="egr-gallery-grid egr-fade">
            {galleryPhotos.map((photo) => (
              <div key={photo.key} className="egr-gallery-item">
                <img src={photo.image} alt={photo.title} loading="lazy" />
                <div className="egr-gallery-overlay">
                  <span className="egr-gallery-label">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RECONOCIMIENTOS ══════════ */}
      <section className="egr-section egr-section-dark">
        <div className="egr-container">
          <div className="egr-section-head egr-fade">
            <span className="egr-kicker egr-kicker-light">Logros que perduran</span>
            <h2 className="egr-section-title egr-title-light">Títulos y reconocimientos</h2>
            <p className="egr-section-sub egr-sub-light">
              Cada documento representa años de esfuerzo. Así celebramos el cierre de un ciclo académico.
            </p>
          </div>

          <div className="egr-recognitions-grid egr-fade">
            {RECOGNITIONS.map((item) => (
              <div key={item.title} className="egr-recognition-card">
                <div className="egr-recognition-icon">{item.icon}</div>
                <h3 className="egr-recognition-title">{item.title}</h3>
                <p className="egr-recognition-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ REPOSITORIO DE DOCUMENTOS ══════════ */}
      <section className="egr-section egr-section-cream">
        <div className="egr-container">
          <div className="egr-section-head egr-fade">
            <span className="egr-kicker">Trámites y documentos</span>
            <h2 className="egr-section-title">Repositorio de documentos</h2>
            <p className="egr-section-sub">
              Formatos, avisos y trámites oficiales para egresados, en un solo lugar.
            </p>
            <button
              type="button"
              className="egr-upload-btn"
              onClick={() => setUploadModalOpen(true)}
            >
              <IconFile />
              Subir mis documentos
            </button>
          </div>

          <div className="egr-doc-filtros egr-fade">
            {DOC_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`egr-doc-filtro${docCategory === cat ? " egr-doc-filtro--activo" : ""}`}
                onClick={() => setDocCategory(cat)}
              >
                {cat}
                <span className="egr-doc-filtro-count">
                  {cat === "Todos" ? DOCUMENTS.length : DOCUMENTS.filter((d) => d.categoria === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="egr-doc-grid egr-fade">
            {docsFiltrados.map((doc) => (
              <div key={doc.titulo} className="egr-doc-card">
                <div className="egr-doc-icon"><IconFile /></div>
                <div className="egr-doc-body">
                  <span className="egr-doc-cat">{doc.categoria}</span>
                  <h3 className="egr-doc-title">{doc.titulo}</h3>
                </div>
                <div className="egr-doc-actions">
                  <a href={encodeURI(doc.archivo)} target="_blank" rel="noopener noreferrer" className="egr-doc-btn">
                    <IconEye /> Ver
                  </a>
                  <a href={encodeURI(doc.archivo)} download className="egr-doc-btn egr-doc-btn--outline">
                    <IconDownload /> Descargar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIOS ══════════ */}
      <section className="egr-section egr-section-light">
        <div className="egr-container">
          <div className="egr-section-head egr-fade">
            <span className="egr-kicker">Voces FECA</span>
            <h2 className="egr-section-title">Historias que inspiran</h2>
            <p className="egr-section-sub">
              {testimonios.length > 0
                ? "Voces reales de nuestra comunidad de egresados."
                : "Perfiles de ejemplo — súmate y comparte tu propia historia como egresado."}
            </p>
          </div>

          <div className="egr-testimonials-grid egr-fade">
            {testimonialCards.map((person) => (
              <div key={person.key} className="egr-testimonial-card">
                <IconQuote />
                <p className="egr-testimonial-quote">&ldquo;{person.quote}&rdquo;</p>
                <div className="egr-testimonial-person">
                  {person.image ? (
                    <img src={person.image} alt="" className="egr-testimonial-avatar" />
                  ) : (
                    <div className="egr-testimonial-avatar egr-testimonial-avatar--placeholder">
                      {person.title?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <div className="egr-testimonial-role">{person.title}</div>
                    <div className="egr-testimonial-meta">{person.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />

      {uploadModalOpen && (
        <EgresadoUploadModal onClose={() => setUploadModalOpen(false)} />
      )}
    </div>
  );
}

export default EgresadosPage;
