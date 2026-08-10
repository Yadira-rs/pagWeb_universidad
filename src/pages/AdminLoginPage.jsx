import { useState } from "react";
import { signIn } from "../lib/useAuth";
import { supabase } from "../lib/supabaseClient";

function AdminLoginPage() {
  const [mode, setMode] = useState("login"); // login | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const [resetSent, setResetSent] = useState(false);

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

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + "/",
      });
      if (error) throw error;
      setResetSent(true);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Ocurrió un error al enviar el correo.");
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setStatus("idle");
    setErrorMsg("");
    setResetSent(false);
  };

  if (mode === "forgot") {
    return (
      <div className="admin-egr-gate">
        <form className="admin-egr-gate-card" onSubmit={handleResetRequest}>
          <h1 className="admin-egr-gate-title">Recuperar contraseña</h1>
          {resetSent ? (
            <p className="admin-egr-gate-sub">
              Si ese correo tiene una cuenta en el panel, te enviamos un enlace para
              elegir una contraseña nueva. Revisa tu bandeja de entrada (y spam).
            </p>
          ) : (
            <>
              <p className="admin-egr-gate-sub">
                Escribe tu correo y te enviamos un enlace para restablecer tu contraseña.
              </p>
              <input
                type="email"
                className="admin-egr-gate-input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                autoComplete="username"
              />
              {status === "error" && <p className="admin-egr-gate-error">{errorMsg}</p>}
              <button type="submit" className="admin-egr-gate-btn" disabled={status === "loading"}>
                {status === "loading" ? "Enviando…" : "Enviar enlace"}
              </button>
            </>
          )}
          <button
            type="button"
            className="admin-egr-gate-linkbtn"
            onClick={() => switchMode("login")}
          >
            Volver a iniciar sesión
          </button>
        </form>
      </div>
    );
  }

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

        <button
          type="button"
          className="admin-egr-gate-linkbtn"
          onClick={() => switchMode("forgot")}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
