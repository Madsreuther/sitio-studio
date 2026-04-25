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
              transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
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
            />
          </div>

          {/* Warm cream wash for legibility. Sits above the image but
              under the type stack. Spec: rgba(255,232,197,0.4) — kept
              exact so the design intent is reproducible. */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 232, 197, 0.4)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          />

          {/* Extra cream feather toward the upper-left so the headline
              region tilts a touch lighter than the rest of the image,
              regardless of which scene was randomly selected. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 22% 30%, rgba(245,241,235,0.55) 0%, rgba(245,241,235,0) 65%)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 900ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            }}
          />
        </>
      ) : null}
    </div>
  );
}
