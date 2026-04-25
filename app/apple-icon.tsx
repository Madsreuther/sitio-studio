import { ImageResponse } from 'next/og';

// Apple touch icon — 180×180. Same composition as /icon.tsx but
// scaled up so the home-screen tile reads at iOS / iPadOS sizes.

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F1EB',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          fontSize: 152,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          color: '#1A1814',
          lineHeight: 1,
        }}
      >
        <span>s</span>
        <span style={{ color: '#A57C52' }}>.</span>
      </div>
    ),
    size,
  );
}
