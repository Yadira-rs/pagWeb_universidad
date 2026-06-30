import { useEffect, useState } from "react";
import { IconFacebook, IconInstagram, IconXTwitter, IconTikTok } from './components/SocialIcons';
import "./App.css";
import {
  historyEntries,
  logoImage,
  logoUjedImage,
  missionVisionContent,
  servicePages,
  sectionPages,
} from "./data/siteData";
import { legacyPages } from "./data/legacyPages";
import HistoryPage from "./pages/HistoryPage";
import LegacyAdmissionPage from "./pages/LegacyAdmissionPage";
import LegacyContentPage from "./pages/LegacyContentPage";
import PropedeuticoPage from "./pages/PropedeuticoPage";
import HomePage from "./pages/HomePage";
import MissionVisionPage from "./pages/MissionVisionPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import SingleSectionPage from "./pages/SingleSectionPage";

import FeriaPage from "./pages/FeriaPage";
import Biblioteca from "./pages/Biblioteca";
import LenguasPage from "./pages/LenguasPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BolsaTrabajoPage from "./pages/BolsaTrabajoPage";
import TutoriasPage from "./pages/TutoriasPage";
import OfertaEducativaPage from "./pages/OfertaEducativaPage";
import NosotrosPage from "./pages/NosotrosPage";
import ContraloriaPage from "./pages/ContraloriaPage";
import FinanzasPage from "./pages/FinanzasPage";
import SecretariaAdministrativaPage from "./pages/SecretariaAdministrativaPage";
import ServiciosEscolaresPage from "./pages/ServiciosEscolaresPage";
import CiiedoPage from "./pages/CiiedoPage";
import ValoresPage from "./pages/ValoresPage";
import EgresadosPage from "./pages/EgresadosPage";
import GruposPage from "./pages/GruposPage";
import SatisfactionWidget from "./components/SatisfactionWidget";

function getCurrentRoute() {
  const hash = window.location.hash || "#/";

  if (hash === "#/aviso-de-privacidad") return { page: "privacy" };
  if (hash === "#/terminos-de-uso") return { page: "terms" };
  if (hash === "#/bolsa-de-trabajo") return { page: "bolsa-trabajo" };
  if (hash === "#/historia") return { page: "history" };
  if (hash === "#/mision-vision") return { page: "mission-vision" };

  if (hash === "#/tutorias") return { page: "tutorias" };
  if (hash === "#/oferta-educativa") return { page: "oferta-educativa" };
  if (hash === "#/nosotros") return { page: "nosotros" };
  if (hash === "#/servicios") return { page: "services" };
  if (hash === "#/servicios/contraloria-interna") return { page: "contraloria-interna" };
  if (hash === "#/servicios/finanzas") return { page: "finanzas" };
  if (hash === "#/servicios/secretaria-administrativa") return { page: "secretaria-administrativa" };
  if (hash === "#/servicios/servicios-escolares") return { page: "servicios-escolares" };
  if (hash === "#/feria") return { page: "feria" };
  if (hash === "#/biblioteca") return { page: "biblioteca" };
  if (hash === "#/lenguas") return { page: "lenguas" };
  if (hash === "#/ciiedo") return { page: "ciiedo" };
  if (hash === "#/egresados") return { page: "egresados" };
  if (hash === "#/grupos-representativos") return { page: "grupos" };

  if (legacyPages[hash.replace("#/", "")]) {
    const slug = hash.replace("#/", "");
    const content = legacyPages[slug];
    return { page: content.routeGroup, slug };
  }

  if (hash.startsWith("#/servicios/")) {
    const slug = hash.replace("#/servicios/", "");
    return { page: "service-detail", slug };
  }

  if (hash === "#/nosotros/valores") return { page: "valores" };

  if (hash.startsWith("#/nosotros/")) {
    const slug = hash.replace("#/nosotros/", "");
    return { page: "single-section", slug };
  }

  return { page: "home" };
}

const NEWS_ITEMS = [
  {
    id: 1,
    badge: "NUEVO",
    date: "9 jun 2026",
    cat: "Admisión",
    title: "Convocatoria de inscripción julio – agosto 2026",
    summary: "Abierta la inscripción para nuevos ingresos a todos los programas de licenciatura y posgrado.",
    type: "article",
    body: "La Facultad de Economía, Contaduría y Administración (FECA) de la UJED abre su convocatoria de inscripción para el ciclo julio – agosto 2026.\n\nPueden participar egresados de bachillerato con promedio mínimo de 7.0. El proceso incluye examen de admisión, entrega de documentos y pago de arancel.\n\nFecha límite de registro: 31 de julio de 2026.\nMayores informes al (618) 827-13-65 o en las instalaciones de la facultad.",
    doc: null,
  },
  {
    id: 2,
    badge: "NUEVO",
    date: "6 jun 2026",
    cat: "Eventos",
    title: "Semana Cultural FECA 2026",
    summary: "Del 16 al 20 de junio: exposiciones, conferencias y actividades artísticas abiertas a toda la comunidad.",
    type: "article",
    body: "La Semana Cultural FECA 2026 se llevará a cabo del 16 al 20 de junio en las instalaciones de la facultad.\n\nActividades programadas:\n• Lunes 16 — Exposición de arte universitario\n• Martes 17 — Conferencia: Economía global y México\n• Miércoles 18 — Concurso de oratoria\n• Jueves 19 — Noche cultural y música en vivo\n• Viernes 20 — Clausura y premiación\n\nEntrada libre para toda la comunidad universitaria.",
    doc: null,
  },
  {
    id: 3,
    badge: null,
    date: "2 jun 2026",
    cat: "Académico",
    title: "Taller de titulación: guía para egresados",
    summary: "Sesiones informativas sobre modalidades de titulación. Inscripción gratuita hasta el 12 de junio.",
    type: "document",
    body: "Consulta el documento oficial con todos los requisitos, modalidades y fechas del proceso de titulación 2026.",
    doc: "/PDUA-SILD27.pdf",
  },
  {
    id: 4,
    badge: null,
    date: "28 may 2026",
    cat: "Deportes",
    title: "Jornadas deportivas interfacultades",
    summary: "Calendario de actividades y resultados de la participación de FECA en los juegos universitarios UJED.",
    type: "article",
    body: "FECA participó en los Juegos Universitarios UJED 2026 con equipos en las disciplinas de fútbol, basquetbol y voleibol.\n\nResultados destacados:\n• Fútbol varonil — 2.° lugar\n• Basquetbol femenil — 1.er lugar\n• Voleibol mixto — participación\n\nFelicitamos a todos los estudiantes y representantes deportivos de nuestra facultad.",
    doc: null,
  },
];

function App() {
  const [route, setRoute] = useState(getCurrentRoute());
  const [newsPanelOpen, setNewsPanelOpen] = useState(false);
  const [buzonOpen, setBuzonOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    if (!window.location.hash || window.location.hash === "#") {
      window.history.replaceState(null, "", "#/");
    }
  }, []);

  useEffect(() => {
    function handleMailto(e) {
      const link = e.target.closest('a[href^="mailto:"]');
      if (!link) return;
      e.preventDefault();
      const email = link.getAttribute("href").replace("mailto:", "");
      window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`, "_blank");
    }
    document.addEventListener("click", handleMailto);
    return () => document.removeEventListener("click", handleMailto);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getCurrentRoute());
      setNewsPanelOpen(false);
    };

    handleRouteChange();
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    document.title =
      route.page === "history"
        ? "FECA - Historia"
        : route.page === "mission-vision"
          ? "FECA - Misión y Visión"
            : route.page === "services"
              ? "FECA - Servicios"
              : route.page === "contraloria-interna"
                ? "FECA - Contraloría Interna"
                : route.page === "feria"
                ? "FECA - Feria"
                 : route.page === "biblioteca"
                 ? "FECA - Biblioteca"
                : route.page === "lenguas"
                    ? "FECA - Centro de Lenguas e Internacionalización"
                    : route.page === "legacy-program"
                      ? `FECA - ${legacyPages[route.slug]?.title ?? "Oferta Educativa"}`
                      : route.page === "legacy-campus"
                        ? `FECA - ${legacyPages[route.slug]?.title ?? "Vida universitaria"}`
                        : route.page === "legacy-teacher"
                          ? `FECA - ${legacyPages[route.slug]?.title ?? "Maestros"}`
                          : route.page === "legacy-admission"
                            ? `FECA - ${legacyPages[route.slug]?.title ?? "Solicitud"}`
                            : route.page === "service-detail"
                              ? `FECA - ${servicePages[route.slug]?.heroTitle ?? "Servicios"}`
                              : route.page === "egresados"
                                  ? "FECA - Seguimiento de Egresados"
                                  : route.page === "valores"
                                  ? "FECA - Valores Institucionales"
                                  : route.page === "single-section"
                                ? `FECA - ${sectionPages[route.slug]?.heroTitle ?? "Nosotros"}`
                                : "FECA - Inicio";
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = (newsPanelOpen || buzonOpen) ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [newsPanelOpen, buzonOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .zoom-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [route]);

  const pageContent =
    route.page === "privacy" ? (
      <PrivacyPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "terms" ? (
      <TermsPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "bolsa-trabajo" ? (
      <BolsaTrabajoPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "tutorias" ? (
      <TutoriasPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "oferta-educativa" ? (
      <OfertaEducativaPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "nosotros" ? (
      <NosotrosPage logoImage={logoImage} newsPanelOpen={newsPanelOpen} setNewsPanelOpen={setNewsPanelOpen} />
    ) : route.page === "history" ? (
      <HistoryPage
        entries={historyEntries}
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "mission-vision" ? (
      <MissionVisionPage
        content={missionVisionContent}
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    
    ) : route.page === "services" ? (
      <ServicesPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "contraloria-interna" ? (
      <ContraloriaPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "finanzas" ? (
      <FinanzasPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "secretaria-administrativa" ? (
      <SecretariaAdministrativaPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "servicios-escolares" ? (
      <ServiciosEscolaresPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "feria" ? (
      <FeriaPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
      
    ) : route.page === "lenguas" ? (
      <LenguasPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "ciiedo" ? (
      <CiiedoPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "legacy-admission" ? (
      <LegacyAdmissionPage
        content={legacyPages[route.slug]}
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    
    ) : route.page === "biblioteca" ? (
      <Biblioteca
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.slug === "curso-propedeutico" ? (
      <PropedeuticoPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "cesa" ||
      route.page === "legacy-program" ||
      route.page === "legacy-campus" ||
      route.page === "legacy-teacher" ? (
      <LegacyContentPage
        content={legacyPages[route.slug]}
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "service-detail" ? (
      servicePages[route.slug] ? (
        <ServiceDetailPage
          content={servicePages[route.slug]}
          logoImage={logoImage}
          newsPanelOpen={newsPanelOpen}
          setNewsPanelOpen={setNewsPanelOpen}
        />
      ) : null
    ) : route.page === "egresados" ? (
      <EgresadosPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "grupos" ? (
      <GruposPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "valores" ? (
      <ValoresPage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "single-section" ? (
      sectionPages[route.slug] ? (
        <SingleSectionPage
          content={sectionPages[route.slug]}
          slug={route.slug}
          logoImage={logoImage}
          newsPanelOpen={newsPanelOpen}
          setNewsPanelOpen={setNewsPanelOpen}
        />
      ) : null
    ) : (
      <HomePage
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    );

  return (
    <>
      {pageContent}

      <SatisfactionWidget />

      <a
        className="whatsapp-fab"
        href="https://wa.me/526188271365"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-fab-label">¿Tienes dudas? Escríbenos</span>
      </a>

      <div
        className={`panel-overlay ${newsPanelOpen ? "open" : ""}`}
        aria-hidden={!newsPanelOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setNewsPanelOpen(false);
          }
        }}
      >
        <aside
          className="slide-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Últimas noticias y fechas de inscripción"
        >
          <div className="panel-header">
            <div>
              <h2>Últimas noticias</h2>
              <p className="panel-header-copy">
                Lo más reciente del campus y las fechas clave de admisión.
              </p>
            </div>
            <button
              className="panel-close"
              aria-label="Cerrar panel"
              onClick={() => setNewsPanelOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="panel-red-bar" />

          <div className="panel-body">
          <section className="panel-section panel-news">
            <h3>Noticias recientes</h3>
            <ul className="panel-list">
              {NEWS_ITEMS.map((item) => (
                <li key={item.id} className="panel-item panel-item--news panel-item--clickable" onClick={() => setSelectedNews(item)}>
                  <div className="panel-news-meta">
                    {item.badge && <span className="panel-news-badge">{item.badge}</span>}
                    <span className="panel-news-date">{item.date}</span>
                    <span className="panel-news-cat">{item.cat}</span>
                    {item.type === "document" && (
                      <span className="panel-news-doc-chip">
                        <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11"><path d="M4 0h6l4 4v11a1 1 0 01-1 1H3a1 1 0 01-1-1V1a1 1 0 011-1zm6 1v3h3L10 1zM4 7h8v1H4V7zm0 2h8v1H4V9zm0 2h5v1H4v-1z"/></svg>
                        PDF
                      </span>
                    )}
                  </div>
                  <span className="panel-news-title">{item.title}</span>
                  <span>{item.summary}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel-section">
            <h3>Fechas de inscripción</h3>
            <ul className="panel-list">
              <li className="panel-item">
                <strong>Inicio de clases</strong>
                <span>Agosto 2026</span>
              </li>
              <li className="panel-item">
                <strong>Modalidad</strong>
                <span>Presencial · En línea</span>
              </li>
              <li className="panel-item">
                <strong>Cierre de registro</strong>
                <span>31 de julio 2026</span>
              </li>
              <li className="panel-item">
                <strong>Informes</strong>
                <span>(618) 827-13-65</span>
              </li>
            </ul>
            <button
              className="panel-buzon-btn"
              onClick={() => { setNewsPanelOpen(false); setBuzonOpen(true); }}
            >
              <div className="panel-buzon-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="panel-buzon-text">
                <span className="panel-buzon-title">Buzón de quejas y sugerencias</span>
                <span className="panel-buzon-sub">Tu opinión nos ayuda a mejorar. Haz clic para enviarnos un mensaje.</span>
              </div>
            </button>
          </section>

          <section className="panel-section">
            <h3>Síguenos</h3>
            <div className="panel-social">
              <a className="si-facebook" href="https://www.facebook.com/FECAUJEDMX/" aria-label="Facebook" target="_blank" rel="noreferrer">
                <IconFacebook size={20} />
              </a>
              <a className="si-twitter" href="https://x.com/fecaujedmx" aria-label="X / Twitter" target="_blank" rel="noreferrer">
                <IconXTwitter size={20} />
              </a>
              <a className="si-instagram" href="https://www.instagram.com/fecaujedmx" aria-label="Instagram" target="_blank" rel="noreferrer">
                <IconInstagram size={20} />
              </a>
              <a className="si-tiktok" href="https://www.tiktok.com/@fecaujed.mx" aria-label="TikTok" target="_blank" rel="noreferrer">
                <IconTikTok size={20} />
              </a>
              <a
                className="si-location"
                href="https://maps.app.goo.gl/cn9D7n9UWF9ZckCZ7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver ubicación en Google Maps"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </a>
            </div>
          </section>
          </div>
        </aside>
      </div>

      {/* Modal detalle de noticia */}
      {selectedNews && (
        <div className="buzon-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedNews(null); }}>
          <div className="buzon-modal news-detail-modal" role="dialog" aria-modal="true">
            <div className="buzon-modal-header">
              <div className="buzon-modal-header-left">
                <div className="buzon-modal-icon">
                  {selectedNews.type === "document" ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 2h9l5 5v15a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1zm9 1v4h4L15 3zM8 12h8v1.5H8V12zm0 3h8v1.5H8V15zm0-6h4v1.5H8V9z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  )}
                </div>
                <div>
                  <div className="panel-news-meta" style={{marginBottom: 0}}>
                    {selectedNews.badge && <span className="panel-news-badge">{selectedNews.badge}</span>}
                    <span className="panel-news-date">{selectedNews.date}</span>
                    <span className="panel-news-cat">{selectedNews.cat}</span>
                  </div>
                </div>
              </div>
              <button className="buzon-modal-close" onClick={() => setSelectedNews(null)} aria-label="Cerrar">✕</button>
            </div>

            <div className="news-detail-body">
              <h2 className="news-detail-title">{selectedNews.title}</h2>

              {selectedNews.type === "document" && selectedNews.doc ? (
                <>
                  <p className="news-detail-text">{selectedNews.body}</p>
                  <div className="news-detail-pdf-wrap">
                    <iframe
                      src={selectedNews.doc}
                      className="news-detail-pdf"
                      title={selectedNews.title}
                    />
                  </div>
                  <a href={selectedNews.doc} download className="news-detail-download">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Descargar PDF
                  </a>
                </>
              ) : (
                <div className="news-detail-text">
                  {selectedNews.body.split("\n").map((line, i) => (
                    line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Buzón de quejas y sugerencias */}
      {buzonOpen && (
        <div
          className="buzon-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setBuzonOpen(false); }}
        >
          <div className="buzon-modal" role="dialog" aria-modal="true" aria-label="Buzón de quejas y sugerencias">
            <div className="buzon-modal-header">
              <div className="buzon-modal-header-left">
                <div className="buzon-modal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="buzon-modal-title">Buzón de quejas y sugerencias</h2>
                  <p className="buzon-modal-sub">Tu opinión nos ayuda a mejorar.</p>
                </div>
              </div>
              <button className="buzon-modal-close" onClick={() => setBuzonOpen(false)} aria-label="Cerrar">✕</button>
            </div>

            <div className="buzon-modal-body">
              <div className="buzon-qr-panel">
                <div className="buzon-qr-frame">
                  <img
                    src="/imagenes/buzon_quejas_qr.png"
                    alt="Código QR para ir al Buzón Digital"
                    className="buzon-qr-img"
                  />
                </div>
                <p className="buzon-placeholder-title">Ir al Buzón Digital</p>
                <p className="buzon-placeholder-text">
                  Escanea el código QR con la cámara de tu teléfono o entra directamente al formulario.
                </p>
                <a
                  href="https://docs.google.com/forms/d/12tIL7xltY53SGuAgLSBYthOg0HNjFUwnFmXF5wGZ9mU/edit?ts=6a30599f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buzon-placeholder-email"
                >
                  Abrir Buzón Digital
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
