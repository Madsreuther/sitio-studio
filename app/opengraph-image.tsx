import { ImageResponse } from 'next/og';

// Default OG image served at /opengraph-image — Next picks it up automatically.
// Pages without their own OG image inherit this one.

export const alt = 'sitio studio — beautiful websites for ambitious local businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#F5F1EB',
          color: '#1A1814',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, Times, serif',
            fontSize: 48,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          sitio<span style={{ color: '#A57C52' }}>.</span>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'Georgia, Times, serif',
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              maxWidth: 980,
            }}
          >
            Beautiful websites for
            <br />
            ambitious local businesses.
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 22,
              color: '#6B6558',
              letterSpacing: '0.02em',
            }}
          >
            A Copenhagen studio · delivered in seven days
          </div>
        </div>
      </div>
    ),
    size,
  );
}
