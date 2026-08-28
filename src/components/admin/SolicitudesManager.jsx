import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";
import { actualizarSolicitud, borrarSolicitud, listarSolicitudes } from "../../lib/admisionesApiClient";

async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

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

function SolicitudesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const token = await getToken();
      const data = await listarSolicitudes(token);
      setItems(data || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const toggleAtendida = async (item) => {
    try {
      const token = await getToken();
      await actualizarSolicitud(item.id, { atendida: !item.atendida }, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Borrar la solicitud de "${item.nombre}"? No se puede deshacer.`)) return;
    try {
      const token = await getToken();
      await borrarSolicitud(item.id, token);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const pendientes = items.filter((it) => !it.atendida).length;

  if (loading) return <p className="admpanel-loading">Cargando solicitudes…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Solicitudes de admisión</h2>
          <p>Personas que llenaron el formulario "Inicia tu solicitud" del sitio.</p>
        </div>
        <span className="admpanel-count-pill">
          {items.length} solicitud{items.length === 1 ? "" : "es"}
          {pendientes ? ` · ${pendientes} pendiente${pendientes === 1 ? "" : "s"}` : ""}
        </span>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {items.length === 0 ? (
        <p className="admpanel-empty">Todavía no hay solicitudes.</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Programa</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>
                    {item.telefono || "—"}
                    {item.correo ? <><br />{item.correo}</> : null}
                  </td>
                  <td>{item.programa || "—"}</td>
                  <td>{item.mensaje || "—"}</td>
                  <td>{formatFecha(item.created_at)}</td>
                  <td>
                    <button
                      type="button"
                      className={`admpanel-status-pill ${item.atendida ? "is-on" : "is-off"}`}
                      onClick={() => toggleAtendida(item)}
                    >
                      {item.atendida ? "Atendida" : "Pendiente"}
                    </button>
                  </td>
                  <td className="admpanel-row-actions">
                    <button type="button" className="admpanel-danger" onClick={() => handleDelete(item)}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SolicitudesManager;
