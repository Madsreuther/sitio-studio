import type { Metadata } from 'next';
import { NarrowContainer } from '@/components/Container';
import { PrimaryButton, Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Page not found',
  description: "Page not found — but the studio is open. Head back to sitiostudio.com.",
};

// Branded 404. Fraunces italic title + Inter prose + the same primary
// button language used on every other CTA, so a stray click into a
// missing path still reads as the brand, not as the framework.
export default function NotFound() {
  return (
    <section className="pt-28 md:pt-40 pb-32 md:pb-44">
      <NarrowContainer className="text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 font-[var(--font-serif)] italic text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]">
          Page not found.
        </h1>
        <p className="mt-7 text-[17px] leading-[1.72] text-[var(--color-ink-soft)] max-w-[44ch] mx-auto">
          Either the URL has a typo or we&apos;ve quietly moved something
          around. The studio is otherwise open as usual.
        </p>
        <div className="mt-10">
          <PrimaryButton href="/">Back to home</PrimaryButton>
        </div>
        <p className="mt-10 text-[13px] text-[var(--color-ink-muted)]">
          If you got here from an email link,{' '}
          <a
            className="underline decoration-[var(--color-earth)] decoration-1 underline-offset-[5px] hover:text-[var(--color-earth)] transition-colors duration-300"
            href="mailto:hello@sitiostudio.com"
            style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
          >
            email us
          </a>{' '}
          and we&apos;ll send you the right one.
        </p>
      </NarrowContainer>
    </section>
  );
}
