import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import DocumentUploadField from "./DocumentUploadField";

const TABLE = "noticias_recientes";

const EMPTY_FORM = {
  badge: "",
  fecha_texto: "",
  categoria: "",
  titulo: "",
  resumen: "",
  tipo: "article",
  cuerpo: "",
  documento_url: "",
  publicado: true,
};

function NoticiasManager() {
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
    if (!form.titulo.trim() || !form.fecha_texto.trim() || !form.categoria.trim() || !form.resumen.trim() || !form.cuerpo.trim()) return;
    setSaving(true);
    setError("");

    const payload = {
      badge: form.badge?.trim() || null,
      fecha_texto: form.fecha_texto.trim(),
      categoria: form.categoria.trim(),
      titulo: form.titulo.trim(),
      resumen: form.resumen.trim(),
      tipo: form.tipo,
      cuerpo: form.cuerpo.trim(),
      documento_url: form.documento_url?.trim() || null,
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
    if (!window.confirm(`¿Borrar la noticia "${item.titulo}"? No se puede deshacer.`)) return;
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

  if (loading) return <p className="admpanel-loading">Cargando noticias…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Últimas noticias</h2>
          <p>Aparecen en la ventana emergente "Últimas noticias" del botón de notificaciones (distinta del carrusel "Avisos y Eventos").</p>
        </div>
        <button className="admpanel-btn-primary" onClick={openNew}>+ Nueva noticia</button>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {form && (
        <form className="admpanel-form" onSubmit={handleSave}>
          <h3>{form.id ? "Editar noticia" : "Nueva noticia"}</h3>

          <div className="admpanel-field-row">
            <label className="admpanel-field">
              <span>Categoría *</span>
              <input
                type="text"
                required
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                placeholder="Ej. Admisión, Eventos, Académico"
              />
            </label>
            <label className="admpanel-field">
              <span>Fecha (texto libre) *</span>
              <input
                type="text"
                required
                value={form.fecha_texto}
                onChange={(e) => setForm({ ...form, fecha_texto: e.target.value })}
                placeholder="Ej. 9 jun 2026"
              />
            </label>
          </div>

          <label className="admpanel-field">
            <span>Etiqueta (opcional)</span>
            <input
              type="text"
              value={form.badge || ""}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="Ej. NUEVO"
            />
          </label>

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
            <span>Resumen * (se muestra en la lista)</span>
            <textarea
              rows={2}
              required
              value={form.resumen}
              onChange={(e) => setForm({ ...form, resumen: e.target.value })}
            />
          </label>

          <label className="admpanel-field">
            <span>Tipo</span>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option value="article">Artículo (texto completo)</option>
              <option value="document">Documento (PDF)</option>
            </select>
          </label>

          <label className="admpanel-field">
            <span>{form.tipo === "document" ? "Descripción del documento *" : "Contenido completo *"}</span>
            <textarea
              rows={6}
              required
              value={form.cuerpo}
              onChange={(e) => setForm({ ...form, cuerpo: e.target.value })}
              placeholder={form.tipo === "document" ? "" : "Usa líneas en blanco para separar párrafos."}
            />
          </label>

          {form.tipo === "document" && (
            <DocumentUploadField
              label="Documento (PDF, Word, etc.)"
              value={form.documento_url}
              onChange={(url) => setForm({ ...form, documento_url: url })}
              placeholder="https://... o sube un archivo →"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
          )}

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
        <p className="admpanel-empty">Todavía no hay noticias. Crea la primera con "+ Nueva noticia".</p>
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

export default NoticiasManager;
