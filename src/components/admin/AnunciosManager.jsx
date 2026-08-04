import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ImageUploadField from "./ImageUploadField";

const TABLE = "anuncios_noticias";

const EMPTY_FORM = {
  tipo: "Aviso",
  titulo: "",
  resumen: "",
  fecha_texto: "",
  imagen_url: "",
  cta_label: "",
  cta_href: "",
  publicado: true,
};

function AnunciosManager() {
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
    if (!form.titulo.trim() || !form.imagen_url.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      tipo: form.tipo,
      titulo: form.titulo.trim(),
      resumen: form.resumen?.trim() || null,
      fecha_texto: form.fecha_texto?.trim() || null,
      imagen_url: form.imagen_url.trim(),
      cta_label: form.cta_label?.trim() || null,
      cta_href: form.cta_href?.trim() || null,
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
    if (!window.confirm(`¿Borrar el anuncio "${item.titulo}"? No se puede deshacer.`)) return;
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

  if (loading) return <p className="admpanel-loading">Cargando anuncios…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Anuncios y noticias</h2>
          <p>Aparecen en el carrusel "Avisos y Eventos" de la página de Inicio.</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nuevo anuncio</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar anuncio" : "Nuevo anuncio"}</h3>

          <div className="admpanel-field-row">
            <label className="admpanel-field">
              <span>Tipo</span>
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                <option>Aviso</option>
                <option>Evento</option>
                <option>Convocatoria</option>
                <option>Logro</option>
              </select>
            </label>
            <label className="admpanel-field">
              <span>Fecha (texto libre)</span>
              <input
                type="text"
                value={form.fecha_texto || ""}
                onChange={(e) => setForm({ ...form, fecha_texto: e.target.value })}
                placeholder="Ej. 15 de julio, 2026 · 10:00 hrs"
              />
            </label>
          </div>

          <label className="admpanel-field">
            <span>Título *</span>
            <input
              type="text"
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
          </label>

          <label className="admpanel-field">
            <span>Resumen</span>
            <textarea
              rows={3}
              value={form.resumen || ""}
              onChange={(e) => setForm({ ...form, resumen: e.target.value })}
            />
          </label>

          <ImageUploadField
            label="Imagen *"
            value={form.imagen_url}
            onChange={(url) => setForm({ ...form, imagen_url: url })}
          />

          <div className="admpanel-field-row">
            <label className="admpanel-field">
              <span>Texto del botón</span>
              <input
                type="text"
                value={form.cta_label || ""}
                onChange={(e) => setForm({ ...form, cta_label: e.target.value })}
                placeholder="Ej. Registrarme"
              />
            </label>
            <label className="admpanel-field">
              <span>Link del botón</span>
              <input
                type="text"
                value={form.cta_href || ""}
                onChange={(e) => setForm({ ...form, cta_href: e.target.value })}
                placeholder="#/servicios o https://..."
              />
            </label>
          </div>

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
        <p className="admpanel-empty">Todavía no hay anuncios. Crea el primero con "+ Nuevo anuncio".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th></th>
                <th>Imagen</th>
                <th>Título</th>
                <th>Tipo</th>
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
                  <td>{item.titulo}</td>
                  <td>{item.tipo}</td>
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

export default AnunciosManager;
