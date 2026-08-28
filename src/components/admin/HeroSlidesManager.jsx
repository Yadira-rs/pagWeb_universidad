import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";
import ImageUploadField from "./ImageUploadField";

const TABLE = "hero_slides";

const EMPTY_FORM = {
  image_url: "",
  logo_url: "",
  logo_alt: "",
  logo_light_bg: false,
  is_active: true,
};

function HeroSlidesManager() {
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
    if (!form.image_url.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      image_url: form.image_url.trim(),
      logo_url: form.logo_url?.trim() || null,
      logo_alt: form.logo_alt?.trim() || null,
      logo_light_bg: !!form.logo_light_bg,
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
    if (!window.confirm("¿Borrar esta diapositiva del carrusel? No se puede deshacer.")) return;
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

  if (loading) return <p className="admpanel-loading">Cargando carrusel…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Carrusel de Inicio</h2>
          <p>Las imágenes grandes que rotan arriba de la página de Inicio.</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nueva diapositiva</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar diapositiva" : "Nueva diapositiva"}</h3>

          <ImageUploadField
            label="Imagen de fondo *"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />

          <ImageUploadField
            label="Logo sobre la imagen (opcional)"
            value={form.logo_url}
            onChange={(url) => setForm({ ...form, logo_url: url })}
          />

          <label className="admpanel-field">
            <span>Texto alternativo del logo</span>
            <input
              type="text"
              value={form.logo_alt || ""}
              onChange={(e) => setForm({ ...form, logo_alt: e.target.value })}
              placeholder="Ej. Logo FECA"
            />
          </label>

          <label className="admpanel-checkbox">
            <input
              type="checkbox"
              checked={!!form.logo_light_bg}
              onChange={(e) => setForm({ ...form, logo_light_bg: e.target.checked })}
            />
            <span>El logo necesita un fondo claro detrás (para logos oscuros)</span>
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
        <p className="admpanel-empty">Todavía no hay diapositivas. Crea la primera con "+ Nueva diapositiva".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th></th>
                <th>Vista previa</th>
                <th>Logo</th>
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
                  <td><img src={item.image_url} alt="" className="admpanel-thumb" /></td>
                  <td>{item.logo_alt || "—"}</td>
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

export default HeroSlidesManager;
