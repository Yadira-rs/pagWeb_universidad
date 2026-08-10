import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../lib/useAuth";

const TABLE = "solicitudes_acceso_panel";

// Debe coincidir con el correo usado en las políticas RLS de
// solicitudes_acceso_panel (database/acceso_panel_admin_principal.sql) —
// solo esta cuenta puede aprobar/rechazar/borrar solicitudes. Si cambias
// de administrador principal, actualiza los dos lugares.
const MAIN_ADMIN_EMAIL = "iris23rs2006@gmail.com";

function formatFecha(iso) {
  try {
    return new Date(iso).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const ESTADO_LABEL = {
  pendiente: "Pendiente",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
};

function AccesoManager() {
  const { session } = useAuth();
  const isMainAdmin = session?.user?.email?.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (err) setError(err.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const setEstado = async (item, estado) => {
    const { error: err } = await supabase.from(TABLE).update({ estado }).eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Borrar la solicitud de "${item.nombre}"? No se puede deshacer.`)) return;
    const { error: err } = await supabase.from(TABLE).delete().eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const pendientes = items.filter((it) => it.estado === "pendiente").length;

  if (loading) return <p className="admpanel-loading">Cargando solicitudes…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Solicitudes de acceso</h2>
          <p>
            Maestros o directivos que pidieron acceso al panel desde la pantalla de login.
            Aprobar aquí no crea la cuenta: sigue siendo necesario darla de alta a mano en
            Supabase → Authentication → Users con el correo de la solicitud.
            {!isMainAdmin && " Solo el administrador principal puede aprobar, rechazar o borrar solicitudes; tú puedes verlas."}
          </p>
        </div>
        <span className="admpanel-count-pill">
          {items.length} solicitud{items.length === 1 ? "" : "es"}
          {pendientes ? ` · ${pendientes} pendiente${pendientes === 1 ? "" : "s"}` : ""}
        </span>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {items.length === 0 ? (
        <p className="admpanel-empty">Todavía no hay solicitudes de acceso.</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Cargo</th>
                <th>Área</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                <th>Estado</th>
                {isMainAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.correo}</td>
                  <td>{item.cargo}</td>
                  <td>{item.area || "—"}</td>
                  <td>{item.mensaje || "—"}</td>
                  <td>{formatFecha(item.created_at)}</td>
                  <td>
                    <span className={`admpanel-status-pill ${item.estado === "aprobada" ? "is-on" : "is-off"}`}>
                      {ESTADO_LABEL[item.estado] || item.estado}
                    </span>
                  </td>
                  {isMainAdmin && (
                    <td className="admpanel-row-actions">
                      {item.estado !== "aprobada" && (
                        <button type="button" onClick={() => setEstado(item, "aprobada")}>Aprobar</button>
                      )}
                      {item.estado !== "rechazada" && (
                        <button type="button" onClick={() => setEstado(item, "rechazada")}>Rechazar</button>
                      )}
                      {item.estado !== "pendiente" && (
                        <button type="button" onClick={() => setEstado(item, "pendiente")}>Reabrir</button>
                      )}
                      <button type="button" className="admpanel-danger" onClick={() => handleDelete(item)}>Borrar</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AccesoManager;
