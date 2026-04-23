'use client';

import * as React from 'react';

// Minimal IntersectionObserver-based fade-up. Opt-in per node via className.
// Respects prefers-reduced-motion because the keyframe is gated in globals.css.
export function Reveal({
  children,
  delayMs = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode;
  delayMs?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
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
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`sitio-reveal ${shown ? 'sitio-revealed' : ''} ${className}`}
      style={shown && delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
