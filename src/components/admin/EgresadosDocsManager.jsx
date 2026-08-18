import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const TABLE = "egresados_docs";
const BUCKET = "egresados-docs";

const TIPOS_DOCUMENTO = [
  "Currículum (CV)",
  "Constancia laboral",
  "Foto para galería",
  "Testimonio / historia",
  "Otro",
];

const EMPTY_FORM = { nombre: "", carrera: "", generacion: "", tipo: TIPOS_DOCUMENTO[0] };

function randomSuffix() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Supabase Storage rechaza claves con espacios, acentos u otros caracteres
// fuera de [a-zA-Z0-9._-], así que el nombre de archivo se limpia antes de
// usarlo en la ruta (el nombre original se conserva en file_name).
function sanitizeFileName(name) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  const clean = base
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${clean || "archivo"}${ext}`;
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

function EgresadosDocsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);
  const [form, setForm] = useState(null);
  const [formFile, setFormFile] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const openNew = () => {
    setForm({ ...EMPTY_FORM });
    setFormFile(null);
  };
  const closeForm = () => {
    setForm(null);
    setFormFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !formFile || saving) return;
    setSaving(true);
    setError("");

    try {
      const path = `${randomSuffix()}-${sanitizeFileName(formFile.name)}`;
      const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, formFile);
      if (uploadErr) throw uploadErr;

      const { error: insertErr } = await supabase.from(TABLE).insert({
        nombre: form.nombre.trim(),
        carrera: form.carrera.trim() || null,
        generacion: form.generacion.trim() || null,
        tipo: form.tipo,
        file_path: path,
        file_name: formFile.name,
      });
      if (insertErr) throw insertErr;

      closeForm();
      load();
    } catch (err) {
      setError(err?.message || "No se pudo subir el documento.");
    } finally {
      setSaving(false);
    }
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
        <div className="admpanel-egr-header-actions">
          <span className="admpanel-count-pill">{items.length} documento{items.length === 1 ? "" : "s"}</span>
          <button type="button" className="admpanel-btn-primary" onClick={openNew}>+ Agregar documento</button>
        </div>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>Agregar documento</h3>

          <label className="admpanel-field">
            <span>Nombre *</span>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </label>

          <div className="admpanel-field-row">
            <label className="admpanel-field">
              <span>Carrera</span>
              <input
                type="text"
                value={form.carrera}
                onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                placeholder="Ej. Lic. en Administración"
              />
            </label>
            <label className="admpanel-field">
              <span>Generación</span>
              <input
                type="text"
                value={form.generacion}
                onChange={(e) => setForm({ ...form, generacion: e.target.value })}
                placeholder="Ej. 2020"
              />
            </label>
          </div>

          <label className="admpanel-field">
            <span>Tipo de documento</span>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {TIPOS_DOCUMENTO.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="admpanel-field">
            <span>Archivo *</span>
            <input
              type="file"
              required
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setFormFile(e.target.files?.[0] || null)}
            />
          </label>

          <div className="admpanel-form-actions">
            <button type="button" className="admpanel-btn-secondary" onClick={closeForm}>Cancelar</button>
            <button type="submit" className="admpanel-btn-primary" disabled={saving}>
              {saving ? "Subiendo…" : "Guardar"}
            </button>
          </div>
        </form>
      )}

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
