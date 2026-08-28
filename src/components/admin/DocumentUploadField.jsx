import { useState } from "react";
import { supabase } from "../../lib/apiClient";

const BUCKET = "site-media";

function randomSuffix() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Campo reutilizable: permite pegar una URL de documento o subir un archivo
// (PDF, Word, etc.) directo desde la computadora. Se guarda en el bucket
// público site-media de Supabase Storage y llena el campo con la URL resultante.
function DocumentUploadField({ label, value, onChange, placeholder, accept }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const path = `${randomSuffix()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err?.message || "No se pudo subir el archivo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="admpanel-field">
      <span>{label}</span>
      <div className="admpanel-image-row">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "https://... o sube un archivo →"}
        />
        <label className="admpanel-upload-btn">
          {uploading ? "Subiendo…" : "Subir archivo"}
          <input type="file" accept={accept} onChange={handleFile} disabled={uploading} hidden />
        </label>
      </div>
      {value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="admpanel-file-link">
          Ver archivo actual
        </a>
      ) : null}
      {error && <span className="admpanel-field-error">{error}</span>}
    </label>
  );
}

export default DocumentUploadField;
