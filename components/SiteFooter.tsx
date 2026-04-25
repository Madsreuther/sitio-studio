import { TransitionLink as Link } from '@/components/TransitionLink';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-rule)]/60 mt-24">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        <div>
          <Link
            href="/"
            className="font-[var(--font-serif)] text-[24px] leading-none tracking-tight"
          >
            sitio<span className="text-[var(--color-earth)]">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-[var(--color-ink-muted)]">
            A Copenhagen-based boutique studio building bespoke websites for
            ambitious local businesses across Southern Europe and beyond.
          </p>
          <a
            href="mailto:hello@sitiostudio.com"
            className="mt-5 inline-block text-[14px] text-[var(--color-ink)] underline decoration-[var(--color-earth)] underline-offset-4 hover:text-[var(--color-earth)] transition-colors"
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
        <div className="mx-auto max-w-[1120px] px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[12px] text-[var(--color-ink-muted)]">
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
      <h4 className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-muted)] mb-4">
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
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
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
        className="text-[14px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
