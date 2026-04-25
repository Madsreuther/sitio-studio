'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Lazy-load the actual Three.js Canvas so the initial JS bundle stays
// untouched. The fallback below is the original CSS gradient hero —
// users on prefers-reduced-motion or below the fold see only this.

const Canvas = dynamic(
  () => import('@react-three/fiber').then((m) => m.Canvas),
  { ssr: false },
);

const HeroSceneInner = dynamic(
  () => import('./Scene').then((m) => ({ default: m.HeroScene })),
  { ssr: false },
);

import { HeroBackdrop } from '@/components/HeroBackdrop';

type DeviceTier = 'desktop' | 'mobile';

export function HeroScene3D() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [tier, setTier] = React.useState<DeviceTier>('desktop');
  const [enableParallax, setEnableParallax] = React.useState(false);

  // Reduced-motion + viewport-tier detection.
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    setTier(isMobile ? 'mobile' : 'desktop');
    setEnableParallax(!isMobile && window.matchMedia('(pointer: fine)').matches);

    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Only boot the WebGL context once the hero is on screen — saves the
  // GPU on /about, /process, /pricing visits where the home hero never
  // mounts.
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldMount(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: '0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* CSS gradient mesh — visible during boot + as fallback when
          shouldMount is false (below-fold gating, very old browsers,
          WebGL context loss). The 3D scene mounts on top once ready. */}
      <HeroBackdrop />

      {shouldMount ? (
        <div className="absolute inset-0">
          <Canvas
            shadows={false}
            dpr={[1, tier === 'desktop' ? 2 : 1.5]}
            camera={{ position: [0, 0.2, 5.4], fov: 38, near: 0.1, far: 30 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
          >
            <React.Suspense fallback={null}>
              <HeroSceneInner
                paused={reducedMotion}
                enableParallax={enableParallax}
                tier={tier}
              />
            </React.Suspense>
          </Canvas>
        </div>
      ) : null}
    </div>
  );
}
