import { useState } from "react";
import { signIn } from "../lib/useAuth";
import { supabase } from "../lib/supabaseClient";

function ErrorNote({ children }) {
  return (
    <p className="admin-egr-gate-error" key={children}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="13" />
        <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
      </svg>
      {children}
    </p>
  );
}

const EMPTY_ACCESS_REQUEST = {
  nombre: "",
  correo: "",
  cargo: "Docente",
  area: "",
  mensaje: "",
};

function AdminLoginPage() {
  const [mode, setMode] = useState("login"); // login | forgot | register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [accessForm, setAccessForm] = useState(EMPTY_ACCESS_REQUEST);
  const [accessSent, setAccessSent] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // campo trampa: invisible para personas, los bots lo llenan

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

  const handleAccessRequest = async (e) => {
    e.preventDefault();
    if (!accessForm.nombre.trim() || !accessForm.correo.trim()) return;

    // Campo trampa lleno = lo llenó un bot, no una persona: se finge éxito
    // sin guardar nada, así el bot no reintenta ni sabe que fue detectado.
    if (honeypot.trim()) {
      setAccessSent(true);
      return;
    }

    const correo = accessForm.correo.trim();

    setStatus("loading");
    setErrorMsg("");
    try {
      const { error } = await supabase.from("solicitudes_acceso_panel").insert({
        nombre: accessForm.nombre.trim(),
        correo,
        cargo: accessForm.cargo,
        area: accessForm.area.trim() || null,
        mensaje: accessForm.mensaje.trim() || null,
      });
      if (error) throw error;
      setAccessSent(true);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Ocurrió un error al enviar tu solicitud.");
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setStatus("idle");
    setErrorMsg("");
    setResetSent(false);
    setAccessSent(false);
    setAccessForm(EMPTY_ACCESS_REQUEST);
    setHoneypot("");
  };

  if (mode === "register") {
    return (
      <div className="admin-egr-gate">
        <form className="admin-egr-gate-card" onSubmit={handleAccessRequest}>
          <h1 className="admin-egr-gate-title">Solicitar acceso al panel</h1>
          {accessSent ? (
            <p className="admin-egr-gate-sub">
              Recibimos tu solicitud. Alguien del panel la va a revisar y, si procede, te
              va a compartir tu correo y contraseña para entrar.
            </p>
          ) : (
            <>
              <p className="admin-egr-gate-sub">
                Solo para maestros y directivos de la FECA. Tu solicitud queda pendiente de
                revisión: no da acceso de inmediato.
              </p>
              <input
                type="text"
                className="admin-egr-gate-input"
                placeholder="Nombre completo"
                value={accessForm.nombre}
                onChange={(e) => setAccessForm({ ...accessForm, nombre: e.target.value })}
                autoFocus
              />
              <input
                type="email"
                className="admin-egr-gate-input"
                placeholder="Correo electrónico"
                value={accessForm.correo}
                onChange={(e) => setAccessForm({ ...accessForm, correo: e.target.value })}
                autoComplete="username"
              />

              {/* Campo trampa para bots: oculto e inalcanzable para personas
                  (fuera de pantalla, sin tabIndex), pero un bot que llena
                  todos los <input> del formulario sí lo va a completar. */}
              <input
                type="text"
                name="pagina_web"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <select
                className="admin-egr-gate-input"
                value={accessForm.cargo}
                onChange={(e) => setAccessForm({ ...accessForm, cargo: e.target.value })}
              >
                <option value="Docente">Docente</option>
                <option value="Directivo">Directivo</option>
              </select>
              <input
                type="text"
                className="admin-egr-gate-input"
                placeholder="Área o departamento (opcional)"
                value={accessForm.area}
                onChange={(e) => setAccessForm({ ...accessForm, area: e.target.value })}
              />
              <textarea
                className="admin-egr-gate-input admin-egr-gate-textarea"
                placeholder="Mensaje (opcional)"
                rows={3}
                value={accessForm.mensaje}
                onChange={(e) => setAccessForm({ ...accessForm, mensaje: e.target.value })}
              />
              {status === "error" && <ErrorNote>{errorMsg}</ErrorNote>}
              <button type="submit" className="admin-egr-gate-btn" disabled={status === "loading"}>
                {status === "loading" ? "Enviando…" : "Enviar solicitud"}
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
              {status === "error" && <ErrorNote>{errorMsg}</ErrorNote>}
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

        {status === "error" && <ErrorNote>{errorMsg}</ErrorNote>}

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
        <button
          type="button"
          className="admin-egr-gate-linkbtn"
          onClick={() => switchMode("register")}
        >
          ¿Eres maestro o directivo? Solicitar acceso
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
