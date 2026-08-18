import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ImageUploadField from "./ImageUploadField";

const TABLE = "galeria_fotos";

const EMPTY_FORM = {
  imagen_url: "",
  titulo: "",
  is_active: true,
};

function GaleriaManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from(TABLE)
      .select("*")
      .order("sort_order", { ascending: true });
    if (err) setError(err.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const openNew = () => {
    const maxOrden = items.reduce((max, it) => Math.max(max, it.sort_order ?? 0), -1);
    setForm({ ...EMPTY_FORM, sort_order: maxOrden + 1 });
  };

  const openEdit = (item) => setForm({ ...item });
  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.imagen_url.trim() || !form.titulo.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      imagen_url: form.imagen_url.trim(),
      titulo: form.titulo.trim(),
      is_active: !!form.is_active,
      sort_order: form.sort_order ?? 0,
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
    if (!window.confirm("¿Borrar esta foto de la galería? No se puede deshacer.")) return;
    const { error: err } = await supabase.from(TABLE).delete().eq("id", item.id);
    if (err) setError(err.message);
    else load();
  };

  const toggleActive = async (item) => {
    const { error: err } = await supabase
      .from(TABLE)
      .update({ is_active: !item.is_active })
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
      supabase.from(TABLE).update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from(TABLE).update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    if (err1 || err2) setError(err1?.message || err2?.message);
    load();
  };

  if (loading) return <p className="admpanel-loading">Cargando galería…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Galería — Momentos que enorgullecen</h2>
          <p>Las fotos de la sección "Así se vive" en la página de Egresados.</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nueva foto</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar foto" : "Nueva foto"}</h3>

          <ImageUploadField
            label="Fotografía *"
            value={form.imagen_url}
            onChange={(url) => setForm({ ...form, imagen_url: url })}
          />

          <label className="admpanel-field">
            <span>Título / descripción *</span>
            <input
              type="text"
              value={form.titulo || ""}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ej. Ceremonias de graduación"
            />
          </label>

          <label className="admpanel-checkbox">
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            <span>Activa (visible en el sitio)</span>
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
        <p className="admpanel-empty">Todavía no hay fotos. Sube la primera con "+ Nueva foto".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th></th>
                <th>Vista previa</th>
                <th>Título</th>
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
                  <td><img src={item.imagen_url} alt="" className="admpanel-thumb" /></td>
                  <td>{item.titulo || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className={`admpanel-status-pill ${item.is_active ? "is-on" : "is-off"}`}
                      onClick={() => toggleActive(item)}
                    >
                      {item.is_active ? "Activa" : "Oculta"}
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

export default GaleriaManager;
