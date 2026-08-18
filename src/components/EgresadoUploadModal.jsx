import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const BUCKET = "egresados-docs";

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

const TIPOS_DOCUMENTO = [
  "Currículum (CV)",
  "Constancia laboral",
  "Foto para galería",
  "Testimonio / historia",
  "Otro",
];

function EgresadoUploadModal({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [generacion, setGeneracion] = useState("");
  const [tipo, setTipo] = useState(TIPOS_DOCUMENTO[0]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !nombre.trim() || status === "uploading") return;

    setStatus("uploading");
    setErrorMsg("");

    try {
      const path = `${randomSuffix()}-${sanitizeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);
      if (uploadError) throw uploadError;

      const { error: metaError } = await supabase.from("egresados_docs").insert({
        nombre: nombre.trim(),
        carrera: carrera.trim() || null,
        generacion: generacion.trim() || null,
        tipo,
        file_path: path,
        file_name: file.name,
      });

      if (metaError) {
        throw new Error("El archivo se subió, pero no se pudo guardar tu información. Intenta de nuevo.");
      }

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Ocurrió un error al subir el archivo. Intenta de nuevo.");
    }
  };

  return (
    <div
      className="egr-upload-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="egr-upload-modal" role="dialog" aria-modal="true" aria-label="Subir mis documentos">
        <div className="egr-upload-modal-header">
          <h2 className="egr-upload-modal-title">Subir mis documentos</h2>
          <button type="button" className="egr-upload-modal-close" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status === "done" ? (
          <div className="egr-upload-success">
            <div className="egr-upload-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>¡Listo, recibimos tu documento!</h3>
            <p>Gracias por compartirlo con la comunidad FECA. Nuestro equipo lo revisará pronto.</p>
            <button type="button" className="egr-btn-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form className="egr-upload-form" onSubmit={handleSubmit}>
            <p className="egr-upload-modal-sub">
              Comparte tu documento con la FECA. Aceptamos PDF, Word e imágenes de hasta 10&nbsp;MB.
            </p>

            <label className="egr-upload-field">
              <span>Nombre completo *</span>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
              />
            </label>

            <div className="egr-upload-field-row">
              <label className="egr-upload-field">
                <span>Carrera</span>
                <input
                  type="text"
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  placeholder="Ej. Lic. en Administración"
                />
              </label>
              <label className="egr-upload-field">
                <span>Generación</span>
                <input
                  type="text"
                  value={generacion}
                  onChange={(e) => setGeneracion(e.target.value)}
                  placeholder="Ej. 2020"
                />
              </label>
            </div>

            <label className="egr-upload-field">
              <span>Tipo de documento</span>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                {TIPOS_DOCUMENTO.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="egr-upload-field egr-upload-file-field">
              <span>Archivo *</span>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && <span className="egr-upload-file-name">{file.name}</span>}
            </label>

            {status === "error" && (
              <p className="egr-upload-error">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="egr-btn-primary egr-upload-submit"
              disabled={status === "uploading"}
            >
              {status === "uploading" ? "Subiendo…" : "Enviar documento"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EgresadoUploadModal;
