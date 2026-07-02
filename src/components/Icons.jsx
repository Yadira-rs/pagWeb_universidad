// Iconos de línea (estilo Feather) usados para sustituir emojis en el sitio.
function Svg({ size = 20, strokeWidth = 1.8, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconGraduationCap(props) {
  return (
    <Svg {...props}>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </Svg>
  );
}

export function IconGlobe(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
  );
}

export function IconBook(props) {
  return (
    <Svg {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Svg>
  );
}

export function IconSchool(props) {
  return (
    <Svg {...props}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M4 21h16" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </Svg>
  );
}

export function IconTarget(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </Svg>
  );
}

export function IconSoccer(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5l3.5 2.5-1.3 4h-4.4L8.5 10z" />
      <path d="M12 3.5v4M6 8l2.5 2M18 8l-2.5 2M8.3 18l1-3.6M15.7 18l-1-3.6" />
    </Svg>
  );
}

export function IconBasketball(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
      <path d="M5.6 5.6c3 3 3 9.8 0 12.8M18.4 5.6c-3 3-3 9.8 0 12.8" />
    </Svg>
  );
}

export function IconVolleyball(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c3 3 3 6 0 9s-3 6 0 9" />
      <path d="M4.5 9c4-2 8 0 9 3s5 5 9 3" />
    </Svg>
  );
}

export function IconChess(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="7" r="3" />
      <path d="M9.5 13h5l1.5 4.5h-8z" />
      <path d="M7 21h10" />
      <path d="M8.5 17.5h7" />
    </Svg>
  );
}

export function IconDance(props) {
  return (
    <Svg {...props}>
      <circle cx="13" cy="4" r="2" />
      <path d="M13 6v5" />
      <path d="M13 8l5-2.5" />
      <path d="M13 8l-3.5 2" />
      <path d="M13 11l-4 9" />
      <path d="M13 11l4.5 7" />
    </Svg>
  );
}

export function IconTheatre(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="10" r="6" />
      <circle cx="16" cy="14" r="6" />
      <path d="M7 12c1 1 3 1 4 0" />
      <path d="M14 16c1-1 3-1 4 0" />
    </Svg>
  );
}

export function IconMusic(props) {
  return (
    <Svg {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Svg>
  );
}

export function IconRocket(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Svg>
  );
}

export function IconMic(props) {
  return (
    <Svg {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </Svg>
  );
}

export function IconTrendingUp(props) {
  return (
    <Svg {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </Svg>
  );
}

export function IconTrophy(props) {
  return (
    <Svg {...props}>
      <path d="M8 3h8v4a4 4 0 0 1-8 0z" />
      <path d="M8 4H4v2a4 4 0 0 0 4 4" />
      <path d="M16 4h4v2a4 4 0 0 1-4 4" />
      <path d="M12 11v4" />
      <path d="M8 21h8" />
      <path d="M9 21v-3a3 3 0 0 1 3-3 3 3 0 0 1 3 3v3" />
    </Svg>
  );
}

export function IconUsers(props) {
  return (
    <Svg {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  );
}

export function IconZap(props) {
  return (
    <Svg {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Svg>
  );
}

export function IconStar(props) {
  return (
    <Svg {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Svg>
  );
}

export function IconSparkles(props) {
  return (
    <Svg {...props}>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </Svg>
  );
}

export function IconMedal(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="7" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </Svg>
  );
}
