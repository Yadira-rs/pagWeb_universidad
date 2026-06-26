import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─── Slide data ─────────────────────────────────────────────────────────── */
const DEFAULT_SLIDES = [
  {
    id: "inscripcion",
    badge: "⏰ URGENTE",
    title: "Convocatoria Inscripción julio – agosto 2026",
    subtitle:
      "Abierta la inscripción para todos los programas de licenciatura y posgrado. Promedio mínimo 7.0. ¡No pierdas tu lugar!",
    btnText: "Registrarme ahora",
    btnHref: "#/solicitud",
    emoji: "📋",
    gradient: "linear-gradient(135deg,#3d0009 0%,#951823 55%,#5a0e15 100%)",
    accent: "#e31313",
    accentRgb: "227,19,19",
    variant: "typewriter",
  },
  {
    id: "cultural",
    badge: "🎉 EVENTO",
    title: "Semana Cultural FECA 2026",
    subtitle:
      "Del 16 al 20 de junio · Arte, conferencias, música en vivo y concursos. ¡Entrada libre para toda la comunidad!",
    btnText: "Ver programa completo",
    btnHref: "mailto:informes@feca.ujed.mx",
    emoji: "🎨",
    extraEmojis: ["🎭", "🎵", "✨", "🎪", "🌟"],
    gradient: "linear-gradient(135deg,#200010 0%,#951823 50%,#4a1000 100%)",
    accent: "#b9c7c7",
    accentRgb: "185,199,199",
    variant: "emojis",
  },
  {
    id: "becas",
    badge: "⭐ BECAS",
    title: "Becas universitarias disponibles este semestre",
    subtitle:
      "PRONABES, excelencia académica y movilidad estudiantil. Postúlate antes del cierre del 15 de julio.",
    btnText: "Ver requisitos",
    btnHref: "#/servicios",
    emoji: "⭐",
    gradient: "linear-gradient(135deg,#1a1000 0%,#3d2800 55%,#2a1a00 100%)",
    accent: "#b79a63",
    accentRgb: "183,154,99",
    variant: "blobs",
  },
  {
    id: "empleo",
    badge: "💼 EMPLEO",
    title: "Bolsa de Trabajo FECA: +40 vacantes activas",
    subtitle:
      "Empresas de Durango buscan talento universitario. Tiempo parcial, prácticas profesionales y tiempo completo.",
    btnText: "Ver vacantes",
    btnHref: "#/bolsa-de-trabajo",
    emoji: "🚀",
    extraEmojis: ["💼", "🌟", "💡", "🎯", "🏆"],
    gradient: "linear-gradient(135deg,#2d0000 0%,#951823 45%,#6b0f18 100%)",
    accent: "#a87f3d",
    accentRgb: "168,127,62",
    variant: "particles",
  },
];

/* ─── CSS keyframes (injected once) ─────────────────────────────────────── */
const KF = `
@keyframes acTwinkle{0%,100%{opacity:.08;transform:scale(.6)}50%{opacity:.9;transform:scale(1.35)}}
@keyframes acFloat{0%,100%{transform:translateY(0px) rotate(-6deg)}50%{transform:translateY(-22px) rotate(6deg)}}
@keyframes acBlob{
  0%,100%{transform:translateY(0) scale(1);border-radius:60% 40% 70% 30%/50% 60% 40% 50%}
  33%{transform:translateY(-30px) scale(1.08);border-radius:70% 30% 50% 50%/40% 60% 40% 60%}
  66%{transform:translateY(12px) scale(.93);border-radius:40% 60% 40% 60%/60% 40% 60% 40%}
}
@keyframes acGlow{0%,100%{box-shadow:0 0 0 0 rgba(var(--ac-rgb),.65)}50%{box-shadow:0 0 0 8px rgba(var(--ac-rgb),0)}}
@keyframes acRing{from{stroke-dashoffset:283}to{stroke-dashoffset:0}}
@keyframes acProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes acIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes acCursor{0%,49%{opacity:1}50%,100%{opacity:0}}
`;

const INTERVAL_MS = 4000;

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AnunciosCarousel({ slides = DEFAULT_SLIDES }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(""); // typewriter text
  const pauseRef  = useRef(false);
  const timerRef  = useRef(null);
  const twRef     = useRef(null);

  /* Stable random data (generated once per mount) */
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: 4 + ((i * 4.1) % 90),
        y: 6 + ((i * 7.3) % 80),
        s: 2 + (i % 3),
        delay: (i * 0.38) % 4,
        dur: 1.4 + (i % 3) * 0.7,
      })),
    []
  );

  const emojiPos = useMemo(
    () => [
      { left: "7%",  top: "20%", delay: 0,   dur: 5.5 },
      { left: "83%", top: "18%", delay: 1.8, dur: 4.8 },
      { left: "13%", top: "65%", delay: 3.2, dur: 6   },
      { left: "77%", top: "60%", delay: 0.9, dur: 5.2 },
      { left: "47%", top: "8%",  delay: 2.4, dur: 6.5 },
    ],
    []
  );

  const blobs = useMemo(
    () => [
      { w: 340, h: 300, x: -100, y: -80,  color: "rgba(183,154,99,.20)", delay: 0, dur: 10 },
      { w: 280, h: 260, x: "62%", y: "8%",  color: "rgba(168,127,62,.15)", delay: 3, dur: 12 },
      { w: 220, h: 200, x: "26%", y: "56%", color: "rgba(149,24,36,.18)", delay: 6, dur:  9 },
    ],
    []
  );

  /* ── Timer ── */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pauseRef.current)
        setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL_MS);
  }, [slides.length]);

  const goTo = useCallback(
    (idx) => { setCurrent(idx); startTimer(); },
    [startTimer]
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length]
  );
  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length]
  );

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  /* ── Typewriter (slide 0) ── */
  useEffect(() => {
    clearInterval(twRef.current);
    if (current !== 0) return;
    const text = slides[0].title;
    let i = 0;
    setDisplayed("");
    twRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(twRef.current);
    }, 42);
    return () => clearInterval(twRef.current);
  }, [current, slides]);

  const slide = slides[current];

  /* ─── Inline styles ─────────────────────────────────────────────────── */
  const S = {
    root: {
      position: "relative",
      height: 320,
      overflow: "hidden",
      fontFamily: "inherit",
    },
    slide: (active) => ({
      position: "absolute",
      inset: 0,
      opacity: active ? 1 : 0,
      pointerEvents: active ? "auto" : "none",
      transition: "opacity .48s cubic-bezier(.25,.46,.45,.94), transform .48s cubic-bezier(.25,.46,.45,.94)",
      transform: active ? "translateY(0)" : "translateY(10px)",
    }),
    content: (active, key) => ({
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "0 80px 32px",
      textAlign: "center",
      animation: active ? `acIn .52s cubic-bezier(.25,.46,.45,.94) forwards` : "none",
      /* key forces re-mount → re-triggers animation */
    }),
    badge: (accent, accentRgb) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      background: `rgba(${accentRgb},.18)`,
      border: `1.5px solid ${accent}`,
      color: accent,
      fontFamily: "var(--font-ui,sans-serif)",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: ".15em",
      textTransform: "uppercase",
      padding: "5px 16px",
      borderRadius: 999,
      marginBottom: 14,
      "--ac-rgb": accentRgb,
      animation: "acGlow 2s ease-in-out infinite",
    }),
    title: {
      fontFamily: "var(--font-display,sans-serif)",
      fontSize: "clamp(17px,2.4vw,26px)",
      fontWeight: 700,
      color: "#fff",
      textShadow: "0 2px 18px rgba(0,0,0,.45)",
      margin: "0 0 10px",
      lineHeight: 1.2,
      maxWidth: 640,
    },
    subtitle: {
      fontFamily: "var(--font-body,sans-serif)",
      fontSize: "clamp(12px,1.5vw,14px)",
      color: "rgba(255,255,255,.72)",
      lineHeight: 1.7,
      margin: "0 0 22px",
      maxWidth: 560,
    },
    btn: (accent) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "#fff",
      color: accent,
      fontFamily: "var(--font-ui,sans-serif)",
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: ".04em",
      padding: "10px 26px",
      borderRadius: 999,
      textDecoration: "none",
      boxShadow: "0 6px 22px rgba(0,0,0,.35)",
      transition: "transform .18s, box-shadow .18s",
      flexShrink: 0,
    }),
    arrow: (side) => ({
      position: "absolute",
      top: "50%",
      [side]: 16,
      transform: "translateY(-50%)",
      background: "rgba(255,255,255,.12)",
      border: "1px solid rgba(255,255,255,.22)",
      borderRadius: "50%",
      width: 40, height: 40,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer",
      backdropFilter: "blur(8px)",
      zIndex: 10,
      color: "transparent",
      padding: 0,
    }),
    dots: {
      position: "absolute",
      bottom: 14,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 7,
      zIndex: 10,
    },
    dot: (active, accent) => ({
      width: active ? 28 : 7,
      height: 7,
      borderRadius: 999,
      background: active ? accent : "rgba(255,255,255,.3)",
      border: "none",
      cursor: "pointer",
      padding: 0,
      transition: "width .3s, background .3s",
    }),
    bar: {
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: 3,
      background: "rgba(255,255,255,.1)",
      zIndex: 10,
    },
    barFill: (accent) => ({
      height: "100%",
      background: accent,
      transformOrigin: "left",
      animation: `acProgress ${INTERVAL_MS}ms linear forwards`,
    }),
  };

  /* ─── Render ────────────────────────────────────────────────────────── */
  return (
    <div
      style={S.root}
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      {/* Inject keyframes once */}
      <style>{KF}</style>

      {slides.map((s, i) => {
        const isActive = i === current;

        return (
          <div key={s.id} style={{ ...S.slide(isActive), background: s.gradient }}>

            {/* ── BG: Particles (typewriter + particles variants) ── */}
            {(s.variant === "typewriter" || s.variant === "particles") &&
              particles.map((p) => (
                <span
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: `${p.x}%`, top: `${p.y}%`,
                    width: p.s, height: p.s,
                    borderRadius: "50%",
                    background: s.accent,
                    animation: `acTwinkle ${p.dur}s ${p.delay}s ease-in-out infinite`,
                  }}
                />
              ))}

            {/* ── BG: Floating emojis (emojis + particles variants) ── */}
            {(s.variant === "emojis" || s.variant === "particles") &&
              (s.extraEmojis || []).map((em, ei) => (
                <span
                  key={`${s.id}-em-${ei}`}
                  style={{
                    position: "absolute",
                    left: emojiPos[ei]?.left,
                    top: emojiPos[ei]?.top,
                    fontSize: 28,
                    userSelect: "none",
                    pointerEvents: "none",
                    opacity: 0.65,
                    animation: `acFloat ${emojiPos[ei]?.dur}s ${emojiPos[ei]?.delay}s ease-in-out infinite`,
                  }}
                >
                  {em}
                </span>
              ))}

            {/* ── BG: Organic blobs (blobs variant) ── */}
            {s.variant === "blobs" &&
              blobs.map((b, bi) => (
                <div
                  key={bi}
                  style={{
                    position: "absolute",
                    width: b.w, height: b.h,
                    left: b.x, top: b.y,
                    background: b.color,
                    animation: `acBlob ${b.dur}s ${b.delay}s ease-in-out infinite`,
                    pointerEvents: "none",
                    willChange: "transform",
                  }}
                />
              ))}

            {/* ── Content ── */}
            {/* key change on active forces re-mount → acIn replays */}
            <div
              key={isActive ? `c-${s.id}-on` : `c-${s.id}-off`}
              className="anc-v4-content"
              style={S.content(isActive)}
            >
              {/* Badge */}
              <div style={S.badge(s.accent, s.accentRgb)}>{s.badge}</div>

              {/* Title */}
              <h2 style={S.title}>
                {s.variant === "typewriter"
                  ? (isActive ? displayed : s.title)
                  : s.title}
                {s.variant === "typewriter" && isActive && displayed.length < s.title.length && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: "1em",
                      background: s.accent,
                      marginLeft: 3,
                      verticalAlign: "middle",
                      animation: "acCursor .65s step-start infinite",
                    }}
                  />
                )}
              </h2>

              {/* Subtitle */}
              <p style={S.subtitle}>{s.subtitle}</p>

              {/* CTA */}
              <a href={s.btnHref} style={S.btn(s.accent)}>
                {s.btnText}
                <svg
                  viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  width="13" height="13"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                </svg>
              </a>
            </div>

            {/* ── SVG Ring counter (emojis variant) ── */}
            {s.variant === "emojis" && (
              <svg
                style={{ position: "absolute", top: 18, right: 22, zIndex: 3 }}
                width={64} height={64} viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="7" />
                <circle
                  key={isActive ? `ring-on-${current}` : `ring-off-${i}`}
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke={s.accent}
                  strokeWidth="7"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{
                    animation: isActive
                      ? `acRing ${INTERVAL_MS}ms linear forwards`
                      : "none",
                  }}
                />
                <text x="50" y="58" textAnchor="middle" fill="#fff" fontSize="26">
                  {s.emoji}
                </text>
              </svg>
            )}
          </div>
        );
      })}

      {/* ── Left arrow ── */}
      <button style={S.arrow("left")} onClick={goPrev} aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="18" height="18">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Right arrow ── */}
      <button style={S.arrow("right")} onClick={goNext} aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="18" height="18">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Navigation dots ── */}
      <div style={S.dots}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            style={S.dot(i === current, slide.accent)}
            onClick={() => goTo(i)}
            aria-label={s.badge}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div style={S.bar}>
        <div key={`pb-${current}`} style={S.barFill(slide.accent)} />
      </div>
    </div>
  );
}
