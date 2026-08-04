import { useState } from "react";
import { signIn } from "../lib/useAuth";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await signIn(email.trim(), password);
      window.location.hash = "#/admin";
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : err?.message || "Ocurrió un error al iniciar sesión."
      );
    }
  };

  return (
    <div className="admin-egr-gate">
      <form className="admin-egr-gate-card" onSubmit={handleSubmit}>
        <h1 className="admin-egr-gate-title">Panel de administración FECA</h1>
        <p className="admin-egr-gate-sub">Inicia sesión con tu correo y contraseña para editar el contenido del sitio.</p>

        <input
          type="email"
          className="admin-egr-gate-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          autoComplete="username"
        />
        <input
          type="password"
          className="admin-egr-gate-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {status === "error" && <p className="admin-egr-gate-error">{errorMsg}</p>}

        <button type="submit" className="admin-egr-gate-btn" disabled={status === "loading"}>
          {status === "loading" ? "Entrando…" : "Entrar"}
        </button>

        <p className="admin-login-help">
          ¿Olvidaste tu contraseña? Pide a quien administra el proyecto en Supabase
          que te reenvíe una invitación desde <strong>Authentication → Users</strong>.
        </p>
      </form>
    </div>
  );
}

export default AdminLoginPage;
