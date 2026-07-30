import { useState } from "react";

const LABELS = ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

function SatisfactionWidget() {
  const [open, setOpen]           = useState(false);
  const [rating, setRating]       = useState(0);
  const [hover, setHover]         = useState(0);
  const [comment, setComment]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const active = hover || rating;

  function handleSubmit(e) {
    e.preventDefault();
    if (!rating) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment("");
      }, 400);
    }, 2800);
  }

  return (
    <div className="sw-root">
      {/* ── Panel ── */}
      <div
        className={`sw-panel${open ? " sw-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Encuesta de satisfacción"
      >
        <div className="sw-panel-head">
          <div className="sw-head-left">
            <div className="sw-head-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e31313" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div>
              <p className="sw-panel-title">¿Cómo fue tu experiencia?</p>
              <p className="sw-panel-sub">Tu opinión nos ayuda a mejorar</p>
            </div>
          </div>
          <button className="sw-close" onClick={() => setOpen(false)} aria-label="Cerrar encuesta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {!submitted ? (
          <form className="sw-form" onSubmit={handleSubmit}>
            <p className="sw-question">Califica tu visita al sitio web de la FECA:</p>

            {/* Estrellas */}
            <div className="sw-stars" role="group" aria-label="Calificación">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="sw-star-wrap">
                  <button
                    type="button"
                    className={`sw-star${n <= active ? " sw-star--on" : ""}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={LABELS[n - 1]}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                  <span className={`sw-star-label${n <= active ? " sw-star-label--on" : ""}`}>
                    {LABELS[n - 1]}
                  </span>
                </div>
              ))}
            </div>

            <textarea
              className="sw-textarea"
              placeholder="Comentario opcional (sugerencias, problemas, etc.)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={400}
            />

            <button
              type="submit"
              className={`sw-submit${rating > 0 ? " sw-submit--ready" : ""}`}
              disabled={rating === 0}
            >
              Enviar opinión
            </button>
          </form>
        ) : (
          <div className="sw-thanks">
            <div className="sw-thanks-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="sw-thanks-title">¡Gracias por tu opinión!</p>
            <span className="sw-thanks-sub">Tus comentarios nos ayudan a mejorar el sitio para toda la comunidad FECA.</span>
          </div>
        )}
      </div>

      {/* ── Botón disparador ── */}
      <button
        className={`sw-trigger${open ? " sw-trigger--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar encuesta" : "Abrir encuesta de satisfacción"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="sw-trigger-label">Califica el sitio</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SatisfactionWidget;
