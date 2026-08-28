import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";
import ImageUploadField from "./ImageUploadField";

const TABLE = "testimonios";

const EMPTY_FORM = {
  nombre: "",
  generacion: "",
  carrera: "",
  foto_url: "",
  testimonio: "",
  publicado: true,
};

function TestimoniosManager() {
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
      .order("id", { ascending: false });
    if (err) setError(err.message);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const openNew = () => setForm({ ...EMPTY_FORM });
  const openEdit = (item) => setForm({ ...item });
  const closeForm = () => setForm(null);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.testimonio.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      nombre: form.nombre.trim(),
      generacion: form.generacion?.trim() || null,
      carrera: form.carrera?.trim() || null,
      foto_url: form.foto_url?.trim() || null,
      testimonio: form.testimonio.trim(),
      publicado: !!form.publicado,
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
    if (!window.confirm(`¿Borrar el testimonio de "${item.nombre}"? No se puede deshacer.`)) return;
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

  if (loading) return <p className="admpanel-loading">Cargando testimonios…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Testimonios</h2>
          <p>Historias de egresados y estudiantes que se muestran en el sitio.</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nuevo testimonio</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar testimonio" : "Nuevo testimonio"}</h3>

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
              <span>Generación</span>
              <input
                type="text"
                value={form.generacion || ""}
                onChange={(e) => setForm({ ...form, generacion: e.target.value })}
                placeholder="Ej. 2020"
              />
            </label>
            <label className="admpanel-field">
              <span>Carrera</span>
              <input
                type="text"
                value={form.carrera || ""}
                onChange={(e) => setForm({ ...form, carrera: e.target.value })}
                placeholder="Ej. Lic. en Administración"
              />
            </label>
          </div>

          <ImageUploadField
            label="Foto"
            value={form.foto_url}
            onChange={(url) => setForm({ ...form, foto_url: url })}
          />

          <label className="admpanel-field">
            <span>Testimonio *</span>
            <textarea
              rows={4}
              required
              value={form.testimonio}
              onChange={(e) => setForm({ ...form, testimonio: e.target.value })}
            />
          </label>

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
        <p className="admpanel-empty">Todavía no hay testimonios. Crea el primero con "+ Nuevo testimonio".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Generación</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.foto_url ? <img src={item.foto_url} alt="" className="admpanel-thumb" /> : "—"}</td>
                  <td>{item.nombre}</td>
                  <td>{item.carrera || "—"}</td>
                  <td>{item.generacion || "—"}</td>
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

export default TestimoniosManager;
