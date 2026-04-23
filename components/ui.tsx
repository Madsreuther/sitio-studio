import Link from 'next/link';
import { type ReactNode } from 'react';

export function DisplayHeading({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-[var(--font-serif)] text-[44px] md:text-[64px] leading-[1.04] tracking-[-0.015em] text-[var(--color-ink)] ${className}`}
    >
      {children}
    </h1>
  );
}

export function SectionHeading({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-[var(--font-serif)] text-[30px] md:text-[42px] leading-[1.12] tracking-[-0.01em] text-[var(--color-ink)] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-[11px] uppercase tracking-[0.22em] text-[var(--color-earth)] ${className}`}
    >
      {children}
    </span>
  );
}

export function Prose({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[17px] leading-[1.72] text-[var(--color-ink-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
};

export function PrimaryButton({
  href,
  children,
  className = '',
}: ButtonBaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center h-12 px-6 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] text-[15px] font-medium tracking-wide hover:bg-[var(--color-ink-soft)] transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = '',
}: ButtonBaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center h-12 px-6 rounded-full border border-[var(--color-ink)]/30 text-[var(--color-ink)] text-[15px] font-medium tracking-wide hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)]/[0.03] transition-all ${className}`}
    >
      {children}
    </Link>
  );
}

export function Rule({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t border-[var(--color-rule)] ${className}`}
    />
  );
}
