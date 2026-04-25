'use client';

import * as React from 'react';
import { TransitionLink as Link } from '@/components/TransitionLink';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close the drawer on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape + lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-cream)]/85 backdrop-blur-[6px] border-b border-[var(--color-rule)]/60">
      <div className="mx-auto max-w-[1120px] px-5 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="sitio studio — home"
          className="font-[var(--font-serif)] text-[22px] leading-none tracking-tight text-[var(--color-ink)] hover:text-[var(--color-earth)] transition-colors"
        >
          sitio<span className="text-[var(--color-earth)]">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center h-9 px-4 rounded-full bg-[var(--color-ink)] hover:bg-[var(--color-ink-soft)] text-[var(--color-cream)] text-[13px] font-medium tracking-wide transition-colors"
        >
          Start a project
        </Link>

        {/* Mobile trigger — 44px tappable target */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-mobile-drawer"
          className="md:hidden inline-flex items-center justify-center size-11 -mr-2 text-[var(--color-ink)]"
        >
          <BurgerIcon open={open} />
        </button>
      </div>

      {/* Mobile drawer — slide from right, full-height, escape-closable */}
      <div
        id="site-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-[var(--color-ink)]/20 backdrop-blur-[2px]"
          tabIndex={open ? 0 : -1}
        />
        {/* panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[82vw] max-w-[360px] bg-[var(--color-cream)] border-l border-[var(--color-rule)]/60 shadow-[-16px_0_32px_rgba(26,24,20,0.08)] transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-16 px-5 flex items-center justify-between border-b border-[var(--color-rule)]/60">
            <span className="font-[var(--font-serif)] text-[22px] leading-none tracking-tight">
              sitio<span className="text-[var(--color-earth)]">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center size-11 -mr-2 text-[var(--color-ink)]"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between h-12 px-3 -mx-3 rounded-md text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] font-[var(--font-serif)] text-[22px] tracking-tight"
              >
                <span>{item.label}</span>
                <span aria-hidden className="text-[var(--color-earth)]">→</span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center h-12 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] text-[15px] font-medium tracking-wide"
            >
              Start a project
            </Link>
            <a
              href="mailto:hello@sitiostudio.com"
              className="mt-4 text-center text-[14px] text-[var(--color-ink-muted)] underline decoration-[var(--color-earth)] underline-offset-4"
            >
              hello@sitiostudio.com
            </a>
          </nav>
        </aside>
      </div>
    </header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
      <line
        x1="1" y1="2" x2="21" y2="2"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        style={{
          transformOrigin: '11px 2px',
          transform: open ? 'translateY(5px) rotate(45deg)' : 'none',
          transition: 'transform 200ms ease',
        }}
      />
      <line
        x1="1" y1="7" x2="21" y2="7"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 150ms ease' }}
      />
      <line
        x1="1" y1="12" x2="21" y2="12"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        style={{
          transformOrigin: '11px 12px',
          transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none',
          transition: 'transform 200ms ease',
        }}
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
