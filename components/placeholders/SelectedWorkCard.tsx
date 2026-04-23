// Editorial SVG thumbnails for the Selected Work gallery.
// Deterministic — no CSS gradient backgrounds, no dependence on webfonts
// (serif style falls back to a named stack so the card looks right even
// before Fraunces has loaded).

export type WorkVariant = 'leisure' | 'health' | 'hospitality' | 'wine' | 'retail';

type Palette = {
  bgStart: string;
  bgEnd: string;
  ink: string;
  accent: string;
  sage?: string;
};

const PALETTES: Record<WorkVariant, Palette> = {
  leisure: {
    bgStart: '#EDE6DB',
    bgEnd: '#C3A47A',
    ink: '#2A1E12',
    accent: '#8C663D',
  },
  health: {
    bgStart: '#F5F1EB',
    bgEnd: '#D9C7AE',
    ink: '#1A1814',
    accent: '#A57C52',
    sage: '#7C8A6E',
  },
  hospitality: {
    bgStart: '#F1E4CD',
    bgEnd: '#B48869',
    ink: '#2B1B10',
    accent: '#8C5E3D',
  },
  wine: {
    bgStart: '#D9BFA8',
    bgEnd: '#6B3228',
    ink: '#2B0F0A',
    accent: '#E4CBB0',
  },
  retail: {
    bgStart: '#ECE3D4',
    bgEnd: '#A58563',
    ink: '#1A1814',
    accent: '#6B4A2E',
  },
};

export function SelectedWorkIllustration({
  variant,
  businessName,
  region,
  tag,
}: {
  variant: WorkVariant;
  businessName: string;
  region: string;
  tag: string;
}) {
  const p = PALETTES[variant];
  const id = `work-${variant}-${businessName.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${businessName} — sample work in ${region}`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor={p.bgStart} />
          <stop offset="100%" stopColor={p.bgEnd} />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="20%" cy="15%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground */}
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-light)`} />

      {/* subtle magazine frame */}
      <rect
        x="40" y="40" width="720" height="520"
        fill="none" stroke={p.accent} strokeOpacity="0.22" strokeWidth="1"
      />

      {/* layout marks — evoke a site page without faking screenshots */}
      <g opacity="0.85">
        <rect x="72" y="96" width="108" height="2" fill={p.accent} />
        <text
          x="72" y="172"
          fill={p.ink}
          fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
          fontSize="54"
          fontStyle="italic"
          letterSpacing="-0.02em"
        >
          {businessName}
        </text>
        <text
          x="72" y="210"
          fill={p.ink}
          fontFamily="Inter, -apple-system, system-ui, sans-serif"
          fontSize="14"
          letterSpacing="0.22em"
          style={{ textTransform: 'uppercase' }}
          opacity="0.78"
        >
          {region}
        </text>
      </g>

      {/* body columns — magazine-y, not wireframe-y */}
      <g opacity="0.35">
        <rect x="72" y="360" width="220" height="6" fill={p.ink} />
        <rect x="72" y="376" width="260" height="6" fill={p.ink} />
        <rect x="72" y="392" width="170" height="6" fill={p.ink} />
      </g>

      {/* side mark */}
      <g transform="translate(720, 96)" opacity="0.9">
        <circle cx="0" cy="0" r="4" fill={p.accent} />
        <line x1="0" y1="14" x2="0" y2="120" stroke={p.accent} strokeOpacity="0.5" />
      </g>

      {/* tag top-right */}
      <text
        x="760" y="88"
        fill={p.ink}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        letterSpacing="0.22em"
        textAnchor="end"
        opacity="0.72"
        style={{ textTransform: 'uppercase' }}
      >
        {tag}
      </text>
    </svg>
  );
}
