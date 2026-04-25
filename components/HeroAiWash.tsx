'use client';

import * as React from 'react';
import Image from 'next/image';
import type { HeroManifest } from '@/lib/ai/manifest';

// Subtle wash layer between the 3D scene and the CSS gradient backdrop.
// Picks one image at random per visit (via Math.random on mount), fades
// it in, sits at low opacity with a hard mask so the headline stays
// readable. Skipped entirely on prefers-reduced-motion AND when the
// manifest has no entries (i.e. cache hasn't been generated yet).

export function HeroAiWash({ manifest }: { manifest: HeroManifest | null }) {
  const [reduce, setReduce] = React.useState(false);
  const [index, setIndex] = React.useState<number | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (manifest && manifest.entries.length > 0) {
      setIndex(Math.floor(Math.random() * manifest.entries.length));
    }
  }, [manifest]);

  if (!manifest || index === null) return null;
  const entry = manifest.entries[index];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[8] overflow-hidden"
      style={{
        opacity: loaded ? (reduce ? 0.22 : 0.32) : 0,
        transition: 'opacity 1200ms ease-out',
      }}
    >
      <Image
        src={`/ai-cache/hero/${entry.file}`}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        onLoad={() => setLoaded(true)}
        className="object-cover"
        style={{
          /* Mask the image so the upper-left (where the headline sits)
             stays cream-dominant. The wash bleeds in on the right and
             bottom, where it adds atmosphere without flattening type. */
          maskImage:
            'radial-gradient(ellipse 95% 95% at 75% 75%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 95% 95% at 75% 75%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0) 80%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
