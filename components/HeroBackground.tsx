'use client';

import * as React from 'react';
import Image from 'next/image';
import type { HeroManifest } from '@/lib/ai/manifest';
import { HeroBackdrop } from '@/components/HeroBackdrop';

// Full-bleed AI hero background. Reads the build-time manifest, picks
// one entry at random per visit, and renders it as a priority Image
// behind the headline. A warm cream overlay sits above the image to
// keep type legible. Falls back to the CSS gradient mesh
// (HeroBackdrop) when the manifest is empty or the image fails to
// load — never leaves the visitor with a blank hero.

export function HeroBackground({ manifest }: { manifest: HeroManifest | null }) {
  // Choose the entry on mount so server and client agree on the
  // initial empty state (no flicker), and the picked image is the
  // same for the lifetime of this navigation. Math.random on the
  // first client render avoids hydration-mismatch warnings.
  const [pickedFile, setPickedFile] = React.useState<string | null>(null);
  const [errored, setErrored] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!manifest || manifest.entries.length === 0) return;
    const entry = manifest.entries[Math.floor(Math.random() * manifest.entries.length)];
    setPickedFile(entry.file);
  }, [manifest]);

  // Always render the gradient mesh behind everything — it's the
  // permanent fallback. When the AI image loads on top with a graceful
  // fade, the mesh becomes the safety net for context loss / fetch
  // failures.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <HeroBackdrop />

      {pickedFile && !errored ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              opacity: loaded ? 1 : 0,
              transition: 'opacity 700ms var(--sitio-ease)',
            }}
          >
            <Image
              src={`/ai-cache/hero/${pickedFile}`}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={85}
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className="object-cover"
              // De-saturate slightly + drop brightness 4% so even the
              // lightest images (paper-light, terraced-hills) don't
              // wash out the cream overlay above them.
              style={{ filter: 'saturate(0.88) brightness(0.96)' }}
            />
          </div>

          {/* Single diagonal cream wash: heaviest at upper-left where
              the headline lives (0.65), thin at lower-right (0.2).
              Replaces the previous two-layer flat-plus-radial stack —
              one gradient is easier to reason about and reads
              consistently across all 5 source images. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(125deg, rgba(245,241,235,0.65) 0%, rgba(245,241,235,0.42) 45%, rgba(245,241,235,0.2) 100%)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 700ms var(--sitio-ease)',
            }}
          />

          {/* Soft edge bloom — a faint upper-left lift that adds the
              "afternoon light" feel without changing the contrast
              curve under the type. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 55% at 18% 22%, rgba(255,240,210,0.18) 0%, rgba(255,240,210,0) 70%)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 900ms var(--sitio-ease)',
            }}
          />
        </>
      ) : null}
    </div>
  );
}
