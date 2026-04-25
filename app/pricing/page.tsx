import type { Metadata } from 'next';
import { Container, NarrowContainer } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import {
  DisplayHeading,
  SectionHeading,
  Eyebrow,
  Prose,
  PrimaryButton,
  Rule,
} from '@/components/ui';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'A single flat fee, a monthly subscription, and a seven-day money-back guarantee. No retainers, no surprises.',
};

const INCLUDED = [
  'Custom design (no templates)',
  'Up to 5 content sections + contact form',
  'Native-language copy drafting',
  'Your domain connected (or a fresh one, bought on us)',
  'Fast global hosting · automatic HTTPS',
  'Magic-link editor access for copy + photo swaps',
  'Responsive on every device · accessible by default',
  'Ongoing hosting, backups, security updates',
  'One free content revision per month',
  'Email support with response within 24 hours',
];

const NOT_INCLUDED = [
  'Paid advertising (we&rsquo;ll recommend who to work with)',
  'Original photography (we recommend local photographers)',
  'Long-form copywriting beyond what we draft',
  'E-commerce with more than 10 products',
  'Multi-site platforms or franchise rollouts',
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-20 md:pt-28 pb-16">
        <Container>
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <DisplayHeading className="mt-6 max-w-[20ch]">
              One price. One subscription. Written out in plain Danish.
            </DisplayHeading>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Reveal>
              <PriceCard
                label="One-time"
                amount="€1,000"
                frequency=""
                tagline="Pays for the studio work — design, copy, build, launch."
              />
            </Reveal>
            <Reveal delayMs={80}>
              <PriceCard
                label="Monthly"
                amount="€29"
                frequency="/ month"
                tagline="Keeps it online — fast hosting, SSL, backups, support."
              />
            </Reveal>
          </div>
          <Reveal delayMs={180}>
            <p className="mt-8 text-center text-[13px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              Seven-day money-back guarantee · cancel monthly any time · no lock-in
            </p>
          </Reveal>
          <Reveal delayMs={240}>
            <div className="mt-10 flex justify-center">
              <PrimaryButton href="/contact">Get started →</PrimaryButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <Rule />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <div>
                <Eyebrow>What&apos;s included</Eyebrow>
                <SectionHeading className="mt-5" as="h2">
                  Everything you need to go live.
                </SectionHeading>
                <ul className="mt-8 flex flex-col gap-3">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.7] text-[var(--color-ink-soft)]"
                    >
                      <span
                        aria-hidden
                        className="text-[var(--color-earth)] pt-[0.45em]"
                      >
                        ●
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <div>
                <Eyebrow>What&apos;s not</Eyebrow>
                <SectionHeading className="mt-5" as="h2">
                  Where we&apos;d point you elsewhere.
                </SectionHeading>
                <ul className="mt-8 flex flex-col gap-3">
                  {NOT_INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.7] text-[var(--color-ink-muted)]"
                    >
                      <span
                        aria-hidden
                        className="text-[var(--color-ink-muted)] pt-[0.45em]"
                      >
                        ○
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[14px] leading-[1.7] text-[var(--color-ink-muted)] italic">
                  We&apos;re happy to recommend specialists we&apos;ve worked with
                  before — ask us.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-[var(--color-cream-deep)]">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Guarantee</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionHeading className="mt-5" as="h3">
              Seven days after launch to fall in love — or get your money back.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-8">
              If within seven days of going live you decide sitio wasn&apos;t the
              right fit, we refund the €1,000 design fee in full and pause the
              hosting invoice. We keep the files and archive them for six
              months in case you change your mind.
            </Prose>
          </Reveal>
        </NarrowContainer>
      </section>

      <section className="py-20 md:py-28 text-center">
        <NarrowContainer>
          <Reveal>
            <SectionHeading>Ready when you are.</SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-8">
              <PrimaryButton href="/contact">Start a project →</PrimaryButton>
            </div>
          </Reveal>
        </NarrowContainer>
      </section>
    </>
  );
}

function PriceCard({
  label,
  amount,
  frequency,
  tagline,
}: {
  label: string;
  amount: string;
  frequency: string;
  tagline: string;
}) {
  return (
    <div
      className="rounded-md border border-[var(--color-rule)] bg-[var(--color-cream)] p-8 md:p-10 transition-[border-color,box-shadow,transform] duration-500 hover:border-[var(--color-earth)]/45 hover:shadow-[0_24px_50px_-30px_rgba(165,124,82,0.35)] hover:-translate-y-[2px]"
      style={{ transitionTimingFunction: 'cubic-bezier(0.2,0.7,0.2,1)' }}
    >
      <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-earth)]">
        {label}
      </span>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-[var(--font-serif)] text-[48px] sm:text-[56px] md:text-[72px] leading-none tracking-[-0.02em]">
          {amount}
        </span>
        {frequency ? (
          <span className="text-[16px] text-[var(--color-ink-muted)]">
            {frequency}
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-[15px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[40ch]">
        {tagline}
      </p>
    </div>
  );
}
