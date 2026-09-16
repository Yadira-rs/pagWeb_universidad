import { useEffect, useState } from "react";
import { supabase } from "../../lib/apiClient";
import ImageUploadField from "./ImageUploadField";

const TABLE = "ciiedo_imagenes";

// Slots fijos: la página de CIIEDO busca estas imágenes por `slug`, no por
// orden — por eso este manager no es una lista libre (no se pueden crear
// ni borrar entradas), solo reemplazar cada una de las dos.
const SLOTS = [
  { slug: "institucional", titulo: "Información institucional", hint: "Cartel de la columna izquierda (\"Información institucional\")." },
  { slug: "calendario", titulo: "Calendarios y actividades", hint: "Cartel de la columna derecha (\"Calendarios y actividades\") — el que se reemplaza cada cuatrimestre." },
];

function CiiedoImagenesManager() {
  const [rows, setRows] = useState({}); // slug -> row de la base
  const [drafts, setDrafts] = useState({}); // slug -> url en edición
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(""); // slug que se está guardando, o ""

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase.from(TABLE).select("*");
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    const bySlug = {};
    const draftsBySlug = {};
    for (const row of data || []) {
      bySlug[row.slug] = row;
      draftsBySlug[row.slug] = row.imagen_url;
    }
    setRows(bySlug);
    setDrafts(draftsBySlug);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleSave = async (slot) => {
    const url = (drafts[slot.slug] || "").trim();
    if (!url) return;
    setSaving(slot.slug);
    setError("");

    const existing = rows[slot.slug];
    const query = existing
      ? supabase.from(TABLE).update({ imagen_url: url }).eq("id", existing.id)
      : supabase.from(TABLE).insert({ slug: slot.slug, titulo: slot.titulo, imagen_url: url });

    const { error: err } = await query;
    setSaving("");
    if (err) {
      setError(err.message);
      return;
    }
    load();
  };

  if (loading) return <p className="admpanel-loading">Cargando imágenes…</p>;

  return (
    <div className="admpanel-section">
      <div className="admpanel-section-header">
        <div>
          <h2>Imágenes de CIIEDO</h2>
          <p>
            Los dos carteles de la página de CIIEDO. El de "Calendarios y actividades" es el que se reemplaza
            cada cuatrimestre — en cuanto subas uno nuevo aquí, la página lo toma sola.
          </p>
        </div>
      </div>

      {error && <p className="admpanel-error">{error}</p>}

      {SLOTS.map((slot) => (
        <form
          key={slot.slug}
          className="admpanel-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(slot);
          }}
        >
          <h3>{slot.titulo}</h3>
          <p style={{ margin: "-8px 0 12px", color: "var(--gray-mid, #777)", fontSize: 13 }}>{slot.hint}</p>

          <ImageUploadField
            label="Imagen"
            value={drafts[slot.slug] ?? ""}
            onChange={(url) => setDrafts((d) => ({ ...d, [slot.slug]: url }))}
          />

          <div className="admpanel-form-actions">
            <button
              type="submit"
              className="admpanel-btn-primary"
              disabled={saving === slot.slug || !(drafts[slot.slug] || "").trim()}
            >
              {saving === slot.slug ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default CiiedoImagenesManager;
