import { useState } from "react";

function formatFecha(iso) {
  try {
    return new Date(iso).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function AdminEgresadosDocsPage() {
  const [password, setPassword] = useState("");
  const [docs, setDocs] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/egresados-docs-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "No se pudo verificar la contraseña.");
      }
      setDocs(data.docs);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Ocurrió un error.");
    }
  };

  if (!docs) {
    return (
      <div className="admin-egr-gate">
        <form className="admin-egr-gate-card" onSubmit={handleSubmit}>
          <h1 className="admin-egr-gate-title">Documentos de egresados</h1>
          <p className="admin-egr-gate-sub">Acceso restringido. Introduce la contraseña de administración.</p>
          <input
            type="password"
            className="admin-egr-gate-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {status === "error" && <p className="admin-egr-gate-error">{errorMsg}</p>}
          <button type="submit" className="admin-egr-gate-btn" disabled={status === "loading"}>
            {status === "loading" ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-egr-page">
      <div className="admin-egr-header">
        <h1>Documentos de egresados</h1>
        <span className="admin-egr-count">{docs.length} documento{docs.length === 1 ? "" : "s"}</span>
      </div>

      {docs.length === 0 ? (
        <p className="admin-egr-empty">Todavía no hay documentos subidos.</p>
      ) : (
        <div className="admin-egr-table-wrap">
          <table className="admin-egr-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Generación</th>
                <th>Tipo</th>
                <th>Archivo</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.nombre}</td>
                  <td>{doc.carrera || "—"}</td>
                  <td>{doc.generacion || "—"}</td>
                  <td>{doc.tipo || "—"}</td>
                  <td className="admin-egr-filename">{doc.fileName}</td>
                  <td>{formatFecha(doc.fecha)}</td>
                  <td>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="admin-egr-download">
                      Descargar
                    </a>
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

export default AdminEgresadosDocsPage;
