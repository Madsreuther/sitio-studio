import { TransitionLink as Link } from '@/components/TransitionLink';
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
      className={`font-[var(--font-serif)] text-[40px] sm:text-[52px] md:text-[64px] leading-[1.04] tracking-[-0.015em] text-[var(--color-ink)] ${className}`}
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

// All transitions use var(--sitio-ease), defined in globals.css. Single
// motion token site-wide so headline rise, page cross-fade, button hover,
// card hover and FAQ row hover all share one curve.

export function PrimaryButton({
  href,
  children,
  className = '',
}: ButtonBaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] text-[15px] font-medium tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:bg-[var(--color-ink-soft)] hover:-translate-y-[1px] hover:shadow-[0_12px_32px_-12px_rgba(165,124,82,0.35)] active:translate-y-0 active:shadow-none ${className}`}
      style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
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
      className={`group inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[var(--color-ink)]/30 text-[var(--color-ink)] text-[15px] font-medium tracking-wide transition-[transform,box-shadow,border-color,background-color] duration-300 hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)]/[0.03] hover:-translate-y-[1px] hover:shadow-[0_12px_32px_-18px_rgba(26,24,20,0.35)] active:translate-y-0 active:shadow-none ${className}`}
      style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
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
