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

      {/* monogram — large italic, off-center for editorial feel */}
      <g fill="#1A1814">
        <text
          x="72" y="280"
          fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
          fontSize="180"
          fontStyle="italic"
          letterSpacing="-0.03em"
          opacity="0.92"
        >
          M
        </text>
        <text
          x="230" y="280"
          fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
          fontSize="180"
          fontStyle="italic"
          fill="#A57C52"
          letterSpacing="-0.03em"
          opacity="0.88"
        >
          &amp;
        </text>
        <text
          x="312" y="280"
          fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
          fontSize="180"
          fontStyle="italic"
          letterSpacing="-0.03em"
          opacity="0.92"
        >
          J
        </text>
      </g>

      {/* descender */}
      <line x1="72" y1="320" x2="120" y2="320" stroke="#A57C52" strokeWidth="2" />

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
