// Editorial hero backdrop — four overlapping radial gradients in the
// cream/earth/ink palette. No JS, no external dependency. The subtle
// animation is a 24-second sway on the two accent blobs (background-
// position + transform) and is automatically cancelled by
// prefers-reduced-motion via a media query in globals.css.

export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="sitio-hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Paper ground */}
      <div className="absolute inset-0 bg-[var(--color-cream)]" />

      {/* Warm light — top-left, wide + soft */}
      <div className="sitio-hero-blob sitio-hero-blob--a absolute" />

      {/* Earth accent — upper-right, smaller + warmer */}
      <div className="sitio-hero-blob sitio-hero-blob--b absolute" />

      {/* Sage breath — bottom-left, very faint */}
      <div className="sitio-hero-blob sitio-hero-blob--c absolute" />

      {/* Ink vignette — deep-right, holds the composition down */}
      <div className="sitio-hero-blob sitio-hero-blob--d absolute" />

      {/* Paper grain — thin noise to kill banding on cheap panels */}
      <div className="sitio-hero-grain absolute inset-0" />

      {/* Bottom fade into the page so the section joins cleanly */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-cream)]"
      />
    </div>
  );
}
