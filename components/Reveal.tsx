'use client';

import * as React from 'react';

// Minimal IntersectionObserver-based fade-up. Opt-in per node via className.
// Respects prefers-reduced-motion because the keyframe is gated in globals.css.
//
// Polymorphic `as` was removed — every call site in the codebase uses the
// default <div> wrapper, and the polymorphic typing tripped over a stricter
// @types/react bump. Single-element spec is plenty for this surface.
export function Reveal({
  children,
  delayMs = 0,
  className = '',
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sitio-reveal ${shown ? 'sitio-revealed' : ''} ${className}`}
      style={shown && delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
