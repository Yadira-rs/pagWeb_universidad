import { useEffect, useState } from "react";
import "./App.css";
import {
  historyEntries,
  logoImage,
  missionVisionContent,
  servicePages,
  sectionPages,
} from "./data/siteData";
import { legacyPages } from "./data/legacyPages";
import HistoryPage from "./pages/HistoryPage";
import LegacyAdmissionPage from "./pages/LegacyAdmissionPage";
import LegacyContentPage from "./pages/LegacyContentPage";
import HomePage from "./pages/HomePage";
import MissionVisionPage from "./pages/MissionVisionPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import SingleSectionPage from "./pages/SingleSectionPage";
import BolsaTrabajoPage from "./pages/BolsaTrabajoPage";

function getCurrentRoute() {
  const hash = window.location.hash || "#/";

  if (hash === "#/historia") return { page: "history" };
  if (hash === "#/mision-vision") return { page: "mission-vision" };
  if (hash === "#/bolsa-de-trabajo") return { page: "bolsa-trabajo" };
  if (hash === "#/servicios") return { page: "services" };

  if (legacyPages[hash.replace("#/", "")]) {
    const slug = hash.replace("#/", "");
    const content = legacyPages[slug];
    return { page: content.routeGroup, slug };
  }

  if (hash.startsWith("#/servicios/")) {
    const slug = hash.replace("#/servicios/", "");
    return { page: "service-detail", slug };
  }

  if (hash.startsWith("#/nosotros/")) {
    const slug = hash.replace("#/nosotros/", "");
    return { page: "single-section", slug };
  }

  return { page: "home" };
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute());
  const [newsPanelOpen, setNewsPanelOpen] = useState(false);

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
    document.title =
      route.page === "history"
        ? "FECA - Historia"
        : route.page === "mission-vision"
          ? "FECA - Mision y Vision"
          : route.page === "bolsa-trabajo"
            ? "FECA - Bolsa de Trabajo"
            : route.page === "services"
              ? "FECA - Servicios"
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
            : route.page === "single-section"
              ? `FECA - ${sectionPages[route.slug]?.heroTitle ?? "Nosotros"}`
              : "FECA - Inicio";
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = newsPanelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [newsPanelOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
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
    route.page === "history" ? (
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
    ) : route.page === "bolsa-trabajo" ? (
      <BolsaTrabajoPage
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
    ) : route.page === "legacy-admission" ? (
      <LegacyAdmissionPage
        content={legacyPages[route.slug]}
        logoImage={logoImage}
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />
    ) : route.page === "legacy-program" ||
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
    ) : route.page === "single-section" ? (
      sectionPages[route.slug] ? (
        <SingleSectionPage
          content={sectionPages[route.slug]}
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

          <section className="panel-section panel-news">
            <h3>Noticias recientes</h3>
            <ul className="panel-list">
              <li className="panel-item">
                <a href="#">Convocatoria de inscripción julio 2026</a>
                <span>Abierta la inscripción para nuevos ingresos.</span>
              </li>
              <li className="panel-item">
                <a href="#">Jornadas deportivas y eventos del campus</a>
                <span>Calendario de actividades para toda la comunidad.</span>
              </li>
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
          </section>

          <section className="panel-section">
            <h3>Síguenos</h3>
            <div className="panel-social">
              <a href="#" aria-label="Facebook">
                FB
              </a>
              <a href="#" aria-label="Instagram">
                IG
              </a>
              <a href="#" aria-label="X">
                X
              </a>
              <a href="#" aria-label="TikTok">
                TT
              </a>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

export default App;
