import type { Metadata } from 'next';
import { NarrowContainer } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { DisplayHeading, Eyebrow, Prose } from '@/components/ui';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your business. We reply within 24 hours, in English, Spanish, Italian, French, German or Danish.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-20 md:pt-28 pb-10">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <DisplayHeading className="mt-6">
              Tell us about your business.
            </DisplayHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-6">
              A few lines is plenty. We&apos;ll reply within 24 hours,
              usually sooner. Or email{' '}
              <a
                className="underline decoration-[var(--color-earth)] underline-offset-4 hover:text-[var(--color-earth)] transition-colors"
                href="mailto:hello@sitiostudio.com"
              >
                hello@sitiostudio.com
              </a>{' '}
              directly.
            </Prose>
          </Reveal>
        </NarrowContainer>
      </section>

      <section className="pb-20 md:pb-28">
        <NarrowContainer>
          <Reveal>
            <ContactForm />
          </Reveal>
        </NarrowContainer>
      </section>

      <section className="pb-24 md:pb-32">
        <NarrowContainer>
          <div className="border-t border-[var(--color-rule)] pt-10 grid sm:grid-cols-3 gap-6 text-[14px] text-[var(--color-ink-muted)] leading-[1.7]">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] mb-2">
                Studio
              </h4>
              <p>Estaid ApS<br />Copenhagen · Denmark</p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] mb-2">
                Hours
              </h4>
              <p>Mon–Fri · 09:00–18:00 CET<br />Reply within 24h on weekends.</p>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] mb-2">
                Languages
              </h4>
              <p>EN · DA · ES · IT · FR · DE</p>
            </div>
          </div>
        </NarrowContainer>
      </section>
    </>
  );
}
