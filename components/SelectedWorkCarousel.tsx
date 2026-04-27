'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  SelectedWorkThumbnail,
  type WorkVariant,
} from '@/components/placeholders/SelectedWorkThumbnail';

// Horizontal carousel for the home-page Selected Work section.
// Native scroll-snap does the actual scrolling so the experience
// stays buttery on mobile (touch flick) and predictable on
// desktop (arrow buttons + scroll snap). Card width adapts:
// ~85vw on mobile, ~46% on tablet, ~24% on desktop, so 3-4 cards
// are visible at once on desktop and 1-2 on mobile, matching the
// product spec.

export type CarouselCard = {
  slug: string;
  kind: string;
  region: string;
  variant: WorkVariant;
  aiSrc?: string;
  aiW?: number;
  aiH?: number;
};

export function SelectedWorkCarousel({ cards }: { cards: CarouselCard[] }) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const recalc = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardEls = Array.from(el.children) as HTMLElement[];
    if (cardEls.length === 0) return;
    // Find the card whose left edge is closest to the scroll position.
    const left = el.scrollLeft;
    let nearestIdx = 0;
    let nearestDist = Infinity;
    cardEls.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - left - el.clientLeft);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    });
    setActiveIndex(nearestIdx);
    setCanPrev(left > 4);
    setCanNext(left < el.scrollWidth - el.clientWidth - 4);
  }, []);

  React.useEffect(() => {
    recalc();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => recalc();
    const onResize = () => recalc();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [recalc]);

  function scrollByCards(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const cardEl = el.children[0] as HTMLElement | undefined;
    if (!cardEl) return;
    // Scroll by ~one card plus the gap so successive clicks march
    // through one card at a time on desktop and bigger jumps fall
    // back to the next snap target on mobile.
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    el.scrollBy({ left: (cardEl.offsetWidth + gap) * direction, behavior: 'smooth' });
  }

  function jumpTo(index: number) {
    const el = trackRef.current;
    if (!el) return;
    const cardEls = Array.from(el.children) as HTMLElement[];
    const target = cardEls[index];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - el.clientLeft, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <style>{`
          .sitio-carousel-track::-webkit-scrollbar { display: none; }
        `}</style>
        {cards.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="group block flex-shrink-0 snap-start w-[82vw] sm:w-[46vw] lg:w-[calc((100%-3*1.5rem)/4)]"
          >
            <figure className="block">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[var(--color-cream-deep)] ring-1 ring-[var(--color-rule)]/70 transition-shadow duration-500 ease-out group-hover:ring-[var(--color-earth)]/40 group-hover:shadow-[0_18px_40px_-22px_rgba(26,24,20,0.35)]">
                <SelectedWorkThumbnail
                  variant={c.variant}
                  aiSrc={c.aiSrc}
                  aiW={c.aiW}
                  aiH={c.aiH}
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-[var(--font-serif)] italic text-[16px] lg:text-[15px] text-[var(--color-ink)]">
                  {c.kind}
                </span>
                <span className="uppercase tracking-[0.2em] text-[10.5px] text-[var(--color-ink-muted)]">
                  {c.region}
                </span>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>

      {/* Controls row */}
      <div className="mt-3 flex items-center justify-between gap-4">
        {/* Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Selected work pagination">
          {cards.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${c.kind}`}
              onClick={() => jumpTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-[var(--color-earth)]'
                  : 'w-1.5 bg-[var(--color-ink)]/20 hover:bg-[var(--color-ink)]/40'
              }`}
            />
          ))}
        </div>

        {/* Count + arrows */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] tabular-nums text-[var(--color-ink-muted)] tracking-wider">
            {activeIndex + 1} of {cards.length}
          </span>
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Previous case study"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[var(--color-rule)] text-[var(--color-ink)] transition-all duration-300 hover:border-[var(--color-earth)] hover:text-[var(--color-earth)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--color-rule)] disabled:hover:text-[var(--color-ink)]"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Next case study"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[var(--color-rule)] text-[var(--color-ink)] transition-all duration-300 hover:border-[var(--color-earth)] hover:text-[var(--color-earth)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--color-rule)] disabled:hover:text-[var(--color-ink)]"
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path d="M3 7h8" />
      <path d="M7.5 3.5L11 7l-3.5 3.5" />
    </svg>
  );
}
