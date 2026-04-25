// Mock website thumbnail — reads as a generic beautiful website of the
// business type. Nav bar + hero title + tagline + CTA + hero visual,
// all in SVG primitives so there is no CSS-background dependency and no
// runtime font requirement (serif stack falls back to Georgia).
//
// The variant key controls the palette so the 4 cards look related but
// distinct. Copy inside the mock is intentionally generic — editorial
// hero headlines, not business names; the business type + location
// lives underneath the card as a caption.

export type WorkVariant = 'leisure' | 'health' | 'hospitality' | 'wine' | 'retail';

type Palette = {
  canvas: string;       // page bg
  surface: string;      // header surface
  ink: string;          // primary text
  muted: string;        // secondary text
  accent: string;       // buttons / accents
  heroStart: string;    // hero image gradient
  heroEnd: string;
};

const PALETTES: Record<WorkVariant, Palette> = {
  leisure: {
    canvas: '#F3ECDE',
    surface: '#E5D8BE',
    ink: '#2B2017',
    muted: '#6E5C47',
    accent: '#8C663D',
    heroStart: '#C8A976',
    heroEnd: '#5D3F24',
  },
  health: {
    canvas: '#F5F1EB',
    surface: '#EDE5D6',
    ink: '#1A1814',
    muted: '#6B6558',
    accent: '#7C8A6E',
    heroStart: '#D8C8AE',
    heroEnd: '#7A6247',
  },
  hospitality: {
    canvas: '#F5E8D1',
    surface: '#E9D6B4',
    ink: '#2B1B10',
    muted: '#6F513A',
    accent: '#A57C52',
    heroStart: '#D6A880',
    heroEnd: '#5A3520',
  },
  wine: {
    canvas: '#EDD9C3',
    surface: '#D7B89A',
    ink: '#2B0F0A',
    muted: '#6B3228',
    accent: '#8C3B2A',
    heroStart: '#B57A5B',
    heroEnd: '#3E120D',
  },
  retail: {
    canvas: '#F0E6D4',
    surface: '#E2D3BA',
    ink: '#1A1814',
    muted: '#6B5E48',
    accent: '#A57C52',
    heroStart: '#C3A880',
    heroEnd: '#5D4530',
  },
};

const MOCK_HEADLINES: Record<WorkVariant, string> = {
  leisure: 'Play where the light stays late.',
  health: 'Care that feels personal again.',
  hospitality: 'An old house, kept generous.',
  wine: 'A vineyard, a family, a patient wait.',
  retail: 'Small things, chosen slowly.',
};

export function SelectedWorkThumbnail({
  variant,
  aiSrc,
  aiW,
  aiH,
}: {
  variant: WorkVariant;
  /** When provided, render an AI-generated PNG mockup instead of the
   *  procedural SVG. Width/height should match the source so next/image
   *  emits the right intrinsic ratio. */
  aiSrc?: string;
  aiW?: number;
  aiH?: number;
}) {
  // AI variant — the path /ai-cache/work/<variant>.png served from the
  // CDN. We render a plain <img> here (not next/image) so the component
  // stays a pure RSC fragment with no client-side hydration.
  if (aiSrc) {
    return (
      <img
        src={aiSrc}
        alt={`Sample ${variant} website mockup`}
        width={aiW ?? 1280}
        height={aiH ?? 960}
        loading="lazy"
        decoding="async"
        className="w-full h-full block object-cover"
      />
    );
  }

  const p = PALETTES[variant];
  const headline = MOCK_HEADLINES[variant];
  const id = `mock-${variant}`;
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Sample ${variant} website thumbnail`}
    >
      <defs>
        <linearGradient id={`${id}-hero`} x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={p.heroStart} />
          <stop offset="100%" stopColor={p.heroEnd} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="25%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* page canvas */}
      <rect width="800" height="600" fill={p.canvas} />

      {/* nav bar */}
      <g>
        <rect x="0" y="0" width="800" height="56" fill={p.surface} />
        {/* logo dot + wordmark slab */}
        <circle cx="40" cy="28" r="6" fill={p.accent} />
        <rect x="54" y="24" width="70" height="8" fill={p.ink} opacity="0.85" rx="1" />
        {/* nav links */}
        <g fill={p.muted}>
          <rect x="560" y="26" width="38" height="6" rx="1" />
          <rect x="612" y="26" width="34" height="6" rx="1" />
          <rect x="660" y="26" width="48" height="6" rx="1" />
        </g>
        {/* CTA pill */}
        <rect x="720" y="18" width="56" height="20" rx="10" fill={p.ink} />
        <rect x="732" y="26" width="32" height="4" rx="1" fill={p.canvas} opacity="0.85" />
      </g>

      {/* hero — left column: title + tagline + CTA */}
      <g>
        <text
          x="56" y="190"
          fill={p.accent}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          letterSpacing="0.24em"
          style={{ textTransform: 'uppercase' }}
        >
          Welcome
        </text>
        <text
          x="56" y="270"
          fill={p.ink}
          fontFamily="Fraunces, 'GT Super', 'Playfair Display', Georgia, serif"
          fontSize="48"
          fontStyle="italic"
          letterSpacing="-0.02em"
        >
          <tspan x="56" dy="0">{headlineFirst(headline)}</tspan>
          <tspan x="56" dy="52">{headlineSecond(headline)}</tspan>
        </text>

        {/* tagline — fake paragraph as muted bars */}
        <g fill={p.muted} opacity="0.75">
          <rect x="56" y="392" width="300" height="6" rx="1" />
          <rect x="56" y="408" width="260" height="6" rx="1" />
          <rect x="56" y="424" width="220" height="6" rx="1" />
        </g>

        {/* CTA button */}
        <g>
          <rect x="56" y="468" width="154" height="40" rx="20" fill={p.ink} />
          <rect x="78" y="484" width="80" height="6" rx="1" fill={p.canvas} opacity="0.9" />
        </g>
        {/* secondary link */}
        <rect x="230" y="484" width="80" height="6" rx="1" fill={p.muted} opacity="0.7" />
      </g>

      {/* hero image — right column */}
      <g>
        <rect x="460" y="96" width="296" height="400" rx="4" fill={`url(#${id}-hero)`} />
        <rect x="460" y="96" width="296" height="400" rx="4" fill={`url(#${id}-glow)`} />
        {/* fake caption tab overlapping image */}
        <g transform="translate(480, 456)">
          <rect width="88" height="20" rx="10" fill={p.canvas} />
          <rect x="12" y="8" width="64" height="4" rx="1" fill={p.ink} opacity="0.6" />
        </g>
      </g>

      {/* page-frame hint at bottom (section divider) */}
      <line x1="56" y1="560" x2="744" y2="560" stroke={p.ink} strokeOpacity="0.12" />
    </svg>
  );
}

function headlineFirst(s: string): string {
  const parts = s.split(' ');
  const mid = Math.ceil(parts.length / 2);
  return parts.slice(0, mid).join(' ');
}
function headlineSecond(s: string): string {
  const parts = s.split(' ');
  const mid = Math.ceil(parts.length / 2);
  return parts.slice(mid).join(' ');
}
