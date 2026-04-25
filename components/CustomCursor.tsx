'use client';

import * as React from 'react';

// Earth-toned dot trailing the real cursor with smooth lerp.
// Grows + becomes an outline when hovering an interactive element.
// Disabled on touch (pointer: coarse) and on prefers-reduced-motion.

export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const stateRef = React.useRef({
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    visible: false,
    over: false,
    raf: 0,
  });

  React.useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    // Hide the OS cursor only when our custom one is alive.
    document.documentElement.classList.add('sitio-cursor-hide');

    const onMove = (e: PointerEvent) => {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
      if (!stateRef.current.visible) {
        stateRef.current.visible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      stateRef.current.visible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onOverDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive =
        target?.closest(
          'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]',
        ) ?? null;
      const next = !!interactive;
      if (next !== stateRef.current.over) {
        stateRef.current.over = next;
        if (dotRef.current) dotRef.current.dataset.over = next ? 'true' : 'false';
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOverDown);
    document.documentElement.addEventListener('pointerleave', onLeave);

    const tick = () => {
      const s = stateRef.current;
      // 0.18 lerp factor — fast enough to feel direct, slow enough
      // to read as a separate object trailing the cursor.
      s.x += (s.targetX - s.x) * 0.18;
      s.y += (s.targetY - s.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      }
      s.raf = requestAnimationFrame(tick);
    };
    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOverDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('sitio-cursor-hide');
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="sitio-cursor pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ opacity: 0 }}
    />
  );
}
