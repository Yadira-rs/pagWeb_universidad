import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const TABLE = "egresados_docs";
const BUCKET = "egresados-docs";

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

function EgresadosDocsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

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

  const handleDownload = async (item) => {
    setDownloadingId(item.id);
    setError("");
    const { data, error: err } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(item.file_path, 60);
    setDownloadingId(null);
    if (err) {
      setError(err.message);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Borrar el documento de "${item.nombre}"? No se puede deshacer.`)) return;
    setError("");
    const { error: storageErr } = await supabase.storage.from(BUCKET).remove([item.file_path]);
    if (storageErr) {
      setError(storageErr.message);
      return;
    }
    const { error: rowErr } = await supabase.from(TABLE).delete().eq("id", item.id);
    if (rowErr) setError(rowErr.message);
    else load();
  };

  if (loading) return <p className="admpanel-loading">Cargando documentos…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Documentos de egresados</h2>
          <p>CVs, constancias, fotos y testimonios que suben los egresados desde el sitio público.</p>
        </div>
        <span className="admpanel-count-pill">{items.length} documento{items.length === 1 ? "" : "s"}</span>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {items.length === 0 ? (
        <p className="admpanel-empty">Todavía no hay documentos subidos.</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Generación</th>
                <th>Tipo</th>
                <th>Archivo</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.carrera || "—"}</td>
                  <td>{item.generacion || "—"}</td>
                  <td>{item.tipo || "—"}</td>
                  <td className="admin-egr-filename">{item.file_name}</td>
                  <td>{formatFecha(item.created_at)}</td>
                  <td className="admpanel-row-actions">
                    <button type="button" onClick={() => handleDownload(item)} disabled={downloadingId === item.id}>
                      {downloadingId === item.id ? "Abriendo…" : "Descargar"}
                    </button>
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

export default EgresadosDocsManager;
