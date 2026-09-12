import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";
import DocumentUploadField from "./DocumentUploadField";

const TABLE = "cursos_intersemestrales_docs";

const EMPTY_FORM = {
  titulo: "Oferta Intersemestral",
  descripcion: "",
  boton_label: "Descargar oferta",
  archivo_url: "",
  publicado: true,
};

function IntersemestralesDocsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null); // null = cerrado, {} = nuevo, {...} = editando
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from(TABLE)
      .select("*")
      .order("orden", { ascending: true });
    if (err) setError(err.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const openNew = () => {
    const maxOrden = items.reduce((max, it) => Math.max(max, it.orden ?? 0), -1);
    setForm({ ...EMPTY_FORM, orden: maxOrden + 1 });
  };

  const openEdit = (item) => setForm({ ...item });

  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.archivo_url.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion?.trim() || null,
      boton_label: form.boton_label?.trim() || "Descargar oferta",
      archivo_url: form.archivo_url.trim(),
      publicado: !!form.publicado,
      orden: form.orden ?? 0,
    };

    const query = form.id
      ? supabase.from(TABLE).update(payload).eq("id", form.id)
      : supabase.from(TABLE).insert(payload);

    const { error: err } = await query;
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setForm(null);
    load();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Borrar "${item.titulo}"? No se puede deshacer.`)) return;
    const { error: err } = await supabase.from(TABLE).delete().eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const togglePublicado = async (item) => {
    const { error: err } = await supabase
      .from(TABLE)
      .update({ publicado: !item.publicado })
      .eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const move = async (index, direction) => {
    const otherIndex = index + direction;
    if (otherIndex < 0 || otherIndex >= items.length) return;
    const a = items[index];
    const b = items[otherIndex];
    setError("");
    const [{ error: err1 }, { error: err2 }] = await Promise.all([
      supabase.from(TABLE).update({ orden: b.orden }).eq("id", a.id),
      supabase.from(TABLE).update({ orden: a.orden }).eq("id", b.id),
    ]);
    if (err1 || err2) setError(err1?.message || err2?.message);
    load();
  };

  if (loading) return <p className="admpanel-loading">Cargando documentos…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Oferta Intersemestral</h2>
          <p>
            Reemplaza la tarjeta "Oferta Intersemestral" de la página de Cursos Intersemestrales.
            Mientras no haya ningún documento publicado aquí, la página sigue mostrando el PDF fijo
            de siempre.
          </p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nuevo documento</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar documento" : "Nuevo documento"}</h3>

          <label className="admpanel-field">
            <span>Título *</span>
            <input
              type="text"
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ej. Oferta Intersemestral"
            />
          </label>

          <label className="admpanel-field">
            <span>Descripción</span>
            <textarea
              rows={2}
              value={form.descripcion || ""}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Ej. Descarga el documento con las materias disponibles, horarios y docentes para el periodo intersemestral."
            />
          </label>

          <label className="admpanel-field">
            <span>Texto del botón</span>
            <input
              type="text"
              value={form.boton_label}
              onChange={(e) => setForm({ ...form, boton_label: e.target.value })}
              placeholder="Ej. Descargar oferta"
            />
          </label>

          <DocumentUploadField
            label="Documento (PDF) *"
            value={form.archivo_url}
            onChange={(url) => setForm({ ...form, archivo_url: url })}
            placeholder="https://... o sube un archivo →"
            accept=".pdf,.doc,.docx"
          />

          <label className="admpanel-checkbox">
            <input
              type="checkbox"
              checked={!!form.publicado}
              onChange={(e) => setForm({ ...form, publicado: e.target.checked })}
            />
            <span>Publicado (visible en el sitio)</span>
          </label>

          <div className="admpanel-form-actions">
            <button type="button" className="admpanel-btn-secondary" onClick={closeForm}>Cancelar</button>
            <button type="submit" className="admpanel-btn-primary" disabled={saving}>
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="admpanel-empty">Todavía no hay ningún documento aquí. Crea el primero con "+ Nuevo documento".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th></th>
                <th>Título</th>
                <th>Botón</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="admpanel-reorder">
                    <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Subir">↑</button>
                    <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Bajar">↓</button>
                  </td>
                  <td>{item.titulo}</td>
                  <td>{item.boton_label}</td>
                  <td>
                    <button
                      type="button"
                      className={`admpanel-status-pill ${item.publicado ? "is-on" : "is-off"}`}
                      onClick={() => togglePublicado(item)}
                    >
                      {item.publicado ? "Publicado" : "Oculto"}
                    </button>
                  </td>
                  <td className="admpanel-row-actions">
                    <button type="button" onClick={() => openEdit(item)}>Editar</button>
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

export default IntersemestralesDocsManager;
