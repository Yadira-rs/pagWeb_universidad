import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";

const TABLE = "calificaciones";

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

function Estrellas({ n }) {
  return (
    <span aria-label={`${n} de 5`}>
      {"★".repeat(n)}
      <span style={{ opacity: 0.25 }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

function OpinionesManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from(TABLE)
      .select("*")
      .order("creado_en", { ascending: false });
    if (err) setError(err.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleDelete = async (item) => {
    if (!window.confirm("¿Borrar esta opinión? No se puede deshacer.")) return;
    const { error: err } = await supabase.from(TABLE).delete().eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const promedio = items.length
    ? (items.reduce((sum, it) => sum + (it.puntuacion || 0), 0) / items.length).toFixed(1)
    : null;

  if (loading) return <p className="admpanel-loading">Cargando opiniones…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Opiniones del sitio</h2>
          <p>Respuestas de la encuesta "¿Cómo fue tu experiencia?" que aparece en todo el sitio.</p>
        </div>
        <span className="admpanel-count-pill">
          {items.length} opinión{items.length === 1 ? "" : "es"}
          {promedio ? ` · promedio ${promedio}/5` : ""}
        </span>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {items.length === 0 ? (
        <p className="admpanel-empty">Todavía no hay opiniones registradas.</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th>Calificación</th>
                <th>Comentario</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td><Estrellas n={item.puntuacion || 0} /></td>
                  <td>{item.comentario || "—"}</td>
                  <td>{formatFecha(item.creado_en)}</td>
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

export default OpinionesManager;
