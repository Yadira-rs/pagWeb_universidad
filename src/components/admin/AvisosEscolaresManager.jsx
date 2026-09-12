import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";

const TABLE = "avisos_escolares";

const CATEGORIAS = ["Inscripciones", "Protocolos", "Exámenes"];

const EMPTY_FORM = {
  categoria: CATEGORIAS[0],
  titulo: "",
  fecha_texto: "",
  descripcion: "",
  publicado: true,
};

function AvisosEscolaresManager() {
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
    if (!form.titulo.trim() || !form.fecha_texto.trim() || !form.categoria.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      categoria: form.categoria.trim(),
      titulo: form.titulo.trim(),
      fecha_texto: form.fecha_texto.trim(),
      descripcion: form.descripcion?.trim() || null,
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
    if (!window.confirm(`¿Borrar el aviso "${item.titulo}"? No se puede deshacer.`)) return;
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

  if (loading) return <p className="admpanel-loading">Cargando avisos…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Avisos de Servicios Escolares</h2>
          <p>Aparecen en la sección "Avisos" de la página de Servicios Escolares: fechas de inscripción, protocolos y exámenes.</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nuevo aviso</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar aviso" : "Nuevo aviso"}</h3>

          <div className="admpanel-field-row">
            <label className="admpanel-field">
              <span>Categoría *</span>
              <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                {CATEGORIAS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="admpanel-field">
              <span>Fecha (texto libre) *</span>
              <input
                type="text"
                required
                value={form.fecha_texto}
                onChange={(e) => setForm({ ...form, fecha_texto: e.target.value })}
                placeholder="Ej. Del 1 al 15 de agosto, 2026"
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
              placeholder="Ej. Periodo de inscripción semestre 2026-B"
            />
          </label>

          <label className="admpanel-field">
            <span>Detalles (opcional)</span>
            <textarea
              rows={3}
              value={form.descripcion || ""}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Requisitos, horarios u otra información adicional."
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
        <p className="admpanel-empty">Todavía no hay avisos. Crea el primero con "+ Nuevo aviso".</p>
      ) : (
        <div className="admpanel-table-wrap">
          <table className="admpanel-table">
            <thead>
              <tr>
                <th></th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fecha</th>
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
                  <td>{item.categoria}</td>
                  <td>{item.fecha_texto}</td>
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

export default AvisosEscolaresManager;
