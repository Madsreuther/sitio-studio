import { TransitionLink as Link } from '@/components/TransitionLink';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-rule)]/60 mt-24">
      {/* Editorial coda: oversized italic serif mark sits above the
          column grid, fades into the rule, lets the columns breathe. */}
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6 md:px-10 pt-16 md:pt-24 pb-4">
        <Link
          href="/"
          aria-label="sitio studio — home"
          className="block font-[var(--font-serif)] italic text-[64px] sm:text-[88px] md:text-[112px] leading-[0.95] tracking-[-0.025em] text-[var(--color-ink)] transition-colors duration-500"
          style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
        >
          sitio<span className="text-[var(--color-earth)]">.</span>
        </Link>
      </div>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-6 md:px-10 pb-14 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-12">
        <div>
          <p className="max-w-sm text-[14px] leading-[1.72] text-[var(--color-ink-soft)]">
            A Copenhagen-based boutique studio building bespoke websites for
            ambitious local businesses across Southern Europe and beyond.
          </p>
          <a
            href="mailto:hello@sitiostudio.com"
            className="mt-6 inline-block text-[14px] text-[var(--color-ink)] underline decoration-[var(--color-earth)] decoration-1 underline-offset-[6px] hover:text-[var(--color-earth)] transition-colors duration-300"
            style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
          >
            hello@sitiostudio.com
          </a>
        </div>

        <FooterColumn title="Studio">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/process">Process</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Visit">
          <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7]">
            Estaid ApS<br />
            Copenhagen, Denmark
          </p>
        </FooterColumn>

        <FooterColumn title="Elsewhere">
          <FooterLink href="https://www.linkedin.com/" external>
            LinkedIn
          </FooterLink>
          <FooterLink href="https://read.cv/" external>
            Read.cv
          </FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-[var(--color-rule)]/60">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[12px] text-[var(--color-ink-muted)]">
          <span>© {year} Estaid ApS · sitio studio</span>
          <span className="font-[var(--font-serif)] italic">
            Made with care in Copenhagen.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-4">
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  // Underline-on-hover with the earth decoration — same idiom as the
  // hello@ mailto above, so the whole footer shares one link language.
  const className =
    'text-[14px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:underline hover:decoration-[var(--color-earth)] hover:decoration-1 hover:underline-offset-[5px] transition-colors duration-300';
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={href}
        className={className}
        style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
      >
        {children}
      </Link>
    </li>
  );
}
