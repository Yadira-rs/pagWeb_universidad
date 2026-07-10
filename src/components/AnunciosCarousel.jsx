import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const STEP = 366; // --card-width (340) + --card-gap (26)
const HALF_CARD = 170;
const TRACK_PAD = 140;

export default function AnunciosCarousel() {
  const [slides, setSlides] = useState([]);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const trackIdxRef = useRef(2);
  const [trackIndex, setTrackIndex] = useState(2);

  useEffect(() => {
    let active = true;
    supabase
      .from("anuncios_noticias")
      .select("tipo, titulo, resumen, fecha_texto, cta_label, cta_href")
      .eq("publicado", true)
      .order("orden", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error("Error cargando anuncios:", error);
          return;
        }
        setSlides(
          (data || []).map((row) => ({
            tipo: row.tipo,
            titulo: row.titulo,
            desc: row.resumen,
            fecha: row.fecha_texto,
            ctaLabel: row.cta_label,
            ctaHref: row.cta_href,
          })),
        );
      });
    return () => {
      active = false;
    };
  }, []);

  const N = slides.length;
  // 2 clones al inicio + N reales + 2 clones al final, igual que el carrusel de directores
  const clonedSlides = useMemo(() => {
    if (N < 2) return [];
    return [slides[N - 2], slides[N - 1], ...slides, slides[0], slides[1]];
  }, [slides, N]);

  const moveTo = (newIdx, animated) => {
    if (!trackRef.current) return;
    if (!animated && carouselRef.current) {
      carouselRef.current.classList.add("no-card-transition");
    }
    trackRef.current.style.transition = animated
      ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
      : "none";
    if (!animated) trackRef.current.getBoundingClientRect();
    trackRef.current.style.transform = `translateX(calc(50vw - ${TRACK_PAD}px - ${newIdx * STEP}px - ${HALF_CARD}px))`;
    trackIdxRef.current = newIdx;
    setTrackIndex(newIdx);
    if (!animated && carouselRef.current) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          carouselRef.current?.classList.remove("no-card-transition"),
        ),
      );
    }
  };

  const handleNext = () => moveTo(trackIdxRef.current + 1, true);
  const handlePrev = () => moveTo(trackIdxRef.current - 1, true);

  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    const idx = trackIdxRef.current;
    if (idx >= N + 2) moveTo(idx - N, false);
    else if (idx <= 1) moveTo(idx + N, false);
  };

  useEffect(() => {
    if (N < 2) return;
    moveTo(2, false);
    const id = window.setInterval(() => moveTo(trackIdxRef.current + 1, true), 4500);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N]);

  if (N < 2) return null;

  return (
    <section className="anuncios-carousel-section">
      <div className="container">
        <div className="fade-up">
          <div className="section-label">Tablero de anuncios</div>
          <h2 className="section-title">Avisos y Eventos</h2>
        </div>
      </div>

      <div ref={carouselRef} className="anuncios-carousel">
        <div className="anuncios-carousel-wrapper">
          <div
            ref={trackRef}
            className="anuncios-carousel-track"
            onTransitionEnd={handleTransitionEnd}
          >
            {clonedSlides.map((s, idx) => {
              const dist = idx - trackIndex;
              let statusClass = "";
              if (dist === 0) statusClass = "is-center";
              else if (dist === -1) statusClass = "is-prev";
              else if (dist === 1) statusClass = "is-next";
              else if (dist === -2) statusClass = "is-far-prev";
              else if (dist === 2) statusClass = "is-far-next";

              return (
                <article
                  key={`${s.titulo}-${idx}`}
                  className={`anuncio-card ${statusClass}`}
                  onClick={() => dist !== 0 && moveTo(idx, true)}
                >
                  <span className="anuncio-tipo">{s.tipo}</span>
                  <h3 className="anuncio-title">{s.titulo}</h3>
                  <p className="anuncio-desc">{s.desc}</p>
                  <div className="anuncio-footer">
                    <span className="anuncio-fecha">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {s.fecha}
                    </span>
                    <a
                      href={s.ctaHref}
                      className="anuncio-cta"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s.ctaLabel} →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="teacher-carousel-controls">
          <button
            type="button"
            className="teacher-arrow teacher-prev"
            aria-label="Anterior"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="teacher-arrow teacher-next"
            aria-label="Siguiente"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="anuncio-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`anuncio-dot ${((trackIndex - 2) % N + N) % N === i ? "anuncio-dot-on" : ""}`}
            onClick={() => moveTo(i + 2, true)}
            aria-label={`Ir al anuncio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
