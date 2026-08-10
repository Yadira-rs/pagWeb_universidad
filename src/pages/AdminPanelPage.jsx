import { useState } from "react";
import { useAuth, signOut } from "../lib/useAuth";
import AdminLoginPage from "./AdminLoginPage";
import AnunciosManager from "../components/admin/AnunciosManager";
import HeroSlidesManager from "../components/admin/HeroSlidesManager";
import EgresadosDocsManager from "../components/admin/EgresadosDocsManager";
import TestimoniosManager from "../components/admin/TestimoniosManager";
import SolicitudesManager from "../components/admin/SolicitudesManager";
import OpinionesManager from "../components/admin/OpinionesManager";
import AccesoManager from "../components/admin/AccesoManager";
import NoticiasManager from "../components/admin/NoticiasManager";

const TABS = [
  { key: "anuncios", label: "Anuncios y noticias" },
  { key: "noticias", label: "Últimas noticias" },
  { key: "hero", label: "Carrusel de Inicio" },
  { key: "egresados", label: "Documentos de egresados" },
  { key: "testimonios", label: "Testimonios" },
  { key: "solicitudes", label: "Solicitudes de admisión" },
  { key: "opiniones", label: "Opiniones del sitio" },
  { key: "acceso", label: "Solicitudes de acceso" },
];

function AdminPanelPage() {
  const { session, loading, isAuthenticated } = useAuth();
  const [tab, setTab] = useState("anuncios");

  if (loading) {
    return <div className="admpanel-loading admpanel-loading--full">Cargando…</div>;
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="admpanel-page">
      <header className="admpanel-header">
        <div>
          <a className="admpanel-btn-back" href="#/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Volver al sitio
          </a>
          <h1>Panel de administración FECA</h1>
          <p>Sesión iniciada como {session.user.email}</p>
        </div>
        <button className="admpanel-btn-secondary" onClick={() => signOut()}>Cerrar sesión</button>
      </header>

      <nav className="admpanel-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admpanel-tab ${tab === t.key ? "is-active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <p className="admpanel-note">
        El resto de las páginas del sitio se sigue editando desde el panel de
        Supabase (Table Editor). Este panel cubre lo que más cambia seguido.
      </p>

      {tab === "anuncios" ? (
        <AnunciosManager />
      ) : tab === "noticias" ? (
        <NoticiasManager />
      ) : tab === "hero" ? (
        <HeroSlidesManager />
      ) : tab === "egresados" ? (
        <EgresadosDocsManager />
      ) : tab === "testimonios" ? (
        <TestimoniosManager />
      ) : tab === "solicitudes" ? (
        <SolicitudesManager />
      ) : tab === "opiniones" ? (
        <OpinionesManager />
      ) : (
        <AccesoManager />
      )}
    </div>
  );
}

export default AdminPanelPage;
