// Monogram illustration for the Founders block. Pure SVG — no CSS
// gradient, no webfont dependency (serif stack falls back to Georgia).
// When real portraits arrive, swap this component at its two usage sites
// (home page + about page).

export function FoundersIllustration() {
  return (
    <svg
      viewBox="0 0 480 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Mads Reuther & Jon Lollike — founders of sitio studio"
    >
      <defs>
        <linearGradient id="founders-bg" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#F5F1EB" />
          <stop offset="60%" stopColor="#E6D8C0" />
          <stop offset="100%" stopColor="#C49E70" />
        </linearGradient>
        <radialGradient id="founders-glow" cx="25%" cy="22%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground */}
      <rect width="480" height="600" fill="url(#founders-bg)" />
      <rect width="480" height="600" fill="url(#founders-glow)" />

      {/* editorial frame */}
      <rect
        x="32" y="32" width="416" height="536"
        fill="none" stroke="#A57C52" strokeOpacity="0.28" strokeWidth="1"
      />
      <line x1="32" y1="500" x2="448" y2="500" stroke="#A57C52" strokeOpacity="0.4" />

      {/* monogram — M + J in Fraunces italic, earth accent on the plus.
          Centered-ish composition, slightly off-axis for editorial weight. */}
      <g
        fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
        fontStyle="italic"
        letterSpacing="-0.03em"
      >
        <text x="112" y="332" fill="#A57C52" fontSize="220" opacity="0.94">
          M
        </text>
        <text
          x="244" y="300"
          fill="#A57C52"
          fontSize="88"
          fontStyle="normal"
          fontFamily="Fraunces, 'GT Super', Georgia, serif"
          letterSpacing="0"
          opacity="0.9"
        >
          +
        </text>
        <text x="308" y="332" fill="#A57C52" fontSize="220" opacity="0.94">
          J
        </text>
      </g>

      {/* descender */}
      <line x1="112" y1="368" x2="168" y2="368" stroke="#A57C52" strokeWidth="2" />

      {/* foot labels */}
      <g fill="#3C3830">
        <text
          x="72" y="532"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="20"
          fontStyle="italic"
        >
          Mads Reuther
        </text>
        <text
          x="72" y="556"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="20"
          fontStyle="italic"
        >
          Jon Lollike
        </text>
      </g>

      {/* top-right caption */}
      <text
        x="448" y="64"
        fill="#3C3830"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        letterSpacing="0.22em"
        textAnchor="end"
        opacity="0.72"
        style={{ textTransform: 'uppercase' }}
      >
        Founders · Copenhagen
      </text>
    </svg>
  );
}
