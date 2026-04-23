import Link from 'next/link';

const NAV = [
  { href: '/process', label: 'Process' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-cream)]/85 backdrop-blur-[6px] border-b border-[var(--color-rule)]/60">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 h-16 flex items-center justify-between">
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

        <Link
          href="/contact"
          className="md:hidden text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        >
          Contact →
        </Link>
      </div>
    </header>
  );
}
