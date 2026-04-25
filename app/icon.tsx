import { ImageResponse } from 'next/og';

// Dynamic favicon — 32×32 cream square with a serif-italic "s." mark.
// Earth dot keeps the wordmark recognizable at favicon scale. Default
// system serif so we don't pay a font fetch on the icon route.

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function Icon() {
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
          fontSize: 28,
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
