import { useState } from "react";
import { useAuth, signOut } from "../lib/useAuth";
import { supabase } from "../lib/supabaseClient";

function AdminResetPasswordPage() {
  const { session, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setStatus("error");
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Ocurrió un error al actualizar la contraseña.");
    }
  };

  const goToLogin = async () => {
    await signOut();
    window.location.hash = "#/admin";
  };

  if (loading) {
    return <div className="admpanel-loading admpanel-loading--full">Cargando…</div>;
  }

  if (!session) {
    return (
      <div className="admin-egr-gate">
        <div className="admin-egr-gate-card">
          <h1 className="admin-egr-gate-title">Enlace no válido</h1>
          <p className="admin-egr-gate-sub">
            Este enlace de recuperación ya se usó o expiró. Pide uno nuevo desde
            la pantalla de inicio de sesión.
          </p>
          <button type="button" className="admin-egr-gate-btn" onClick={() => (window.location.hash = "#/admin")}>
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="admin-egr-gate">
        <div className="admin-egr-gate-card">
          <h1 className="admin-egr-gate-title">Contraseña actualizada</h1>
          <p className="admin-egr-gate-sub">Ya puedes entrar al panel con tu nueva contraseña.</p>
          <button type="button" className="admin-egr-gate-btn" onClick={goToLogin}>
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-egr-gate">
      <form className="admin-egr-gate-card" onSubmit={handleSubmit}>
        <h1 className="admin-egr-gate-title">Elige tu contraseña</h1>
        <p className="admin-egr-gate-sub">Sesión verificada como {session.user.email}.</p>

        <input
          type="password"
          className="admin-egr-gate-input"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="new-password"
        />
        <input
          type="password"
          className="admin-egr-gate-input"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />

        {status === "error" && <p className="admin-egr-gate-error">{errorMsg}</p>}

        <button type="submit" className="admin-egr-gate-btn" disabled={status === "loading"}>
          {status === "loading" ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </div>
  );
}

export default AdminResetPasswordPage;
