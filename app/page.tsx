import Link from 'next/link';
import { Container, NarrowContainer } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import {
  DisplayHeading,
  SectionHeading,
  Eyebrow,
  Prose,
  PrimaryButton,
  SecondaryButton,
  Rule,
} from '@/components/ui';
import {
  SelectedWorkIllustration,
  type WorkVariant,
} from '@/components/placeholders/SelectedWorkCard';
import { FoundersIllustration } from '@/components/placeholders/FoundersIllustration';

// Small curated sample list. Images intentionally not wired to live previews
// yet — placeholder gradients keep the page fast and predictable until real
// photography lands.
type Sample = {
  name: string;
  location: string;
  tag: string;
  variant: WorkVariant;
  href: string;
};

const SAMPLES: Sample[] = [
  {
    name: 'Santana Golf',
    location: 'Mijas, Spain',
    tag: 'Leisure',
    variant: 'leisure',
    href: 'https://santana-golf.vercel.app',
  },
  {
    name: 'Clínica Smile',
    location: 'Madrid, Spain',
    tag: 'Health',
    variant: 'health',
    href: '#',
  },
  {
    name: 'Pastisseria Font',
    location: 'Barcelona, Spain',
    tag: 'Hospitality',
    variant: 'hospitality',
    href: '#',
  },
  {
    name: 'Mendoza Wines',
    location: 'Mendoza, Argentina',
    tag: 'Wine & spirits',
    variant: 'wine',
    href: '#',
  },
];

const PILLARS = [
  {
    step: '01',
    title: 'Discover',
    body:
      'We study your business — reviews, reputation, photography, competitive context. You tell us what you want more of. We come back with direction, not a template.',
  },
  {
    step: '02',
    title: 'Design',
    body:
      'A site that reads like you, not an agency deck. Bespoke layout, thoughtful typography, copy in your language. Two rounds of refinement included.',
  },
  {
    step: '03',
    title: 'Deliver',
    body:
      'Live on your own domain in seven days. Fast, accessible, self-editable. We support it for the life of your subscription — no lock-in, no surprise invoices.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-32 pb-24 md:pb-32">
        <Container>
          <Reveal>
            <Eyebrow>Copenhagen · est. 2024</Eyebrow>
          </Reveal>
          <Reveal delayMs={60}>
            <DisplayHeading className="mt-6 max-w-[18ch]">
              Beautiful websites for ambitious local businesses,
              <span className="text-[var(--color-earth)]"> delivered in seven days.</span>
            </DisplayHeading>
          </Reveal>
          <Reveal delayMs={140}>
            <Prose className="mt-8 max-w-[56ch]">
              We build bespoke sites for the kind of businesses a template
              can&apos;t do justice — restaurants, vineyards, clinics, golf clubs,
              shops in small towns with big reputations. One flat price. No
              lock-in. Made by humans in Copenhagen.
            </Prose>
          </Reveal>
          <Reveal delayMs={220}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <PrimaryButton href="/contact">See your business&apos;s preview →</PrimaryButton>
              <SecondaryButton href="/process">How it works</SecondaryButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <Rule />

      {/* WHAT WE DO — 3 pillars ───────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
            <Reveal>
              <div>
                <Eyebrow>What we do</Eyebrow>
                <SectionHeading className="mt-5">
                  A short, careful process — and a live site at the end.
                </SectionHeading>
              </div>
            </Reveal>
            <div className="flex flex-col">
              {PILLARS.map((p, i) => (
                <Reveal key={p.step} delayMs={i * 90}>
                  <div className="py-8 md:py-10 first:pt-0 border-b last:border-b-0 border-[var(--color-rule)]/70">
                    <div className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-4">
                      <span className="font-[var(--font-serif)] text-[22px] md:text-[26px] text-[var(--color-earth)] tracking-tight pt-1">
                        {p.step}
                      </span>
                      <div>
                        <h3 className="font-[var(--font-serif)] text-[24px] md:text-[30px] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[16px] leading-[1.72] text-[var(--color-ink-soft)] max-w-[54ch]">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* WHO WE SERVE ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[var(--color-cream-deep)]">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Who we serve</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionHeading className="mt-5">
              For businesses built on reputation, not reach.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-8">
              Our clients run small, particular businesses — usually in Southern
              Europe, sometimes further afield. A family restaurant on the
              Costa del Sol. A dental clinic in Madrid. A boutique hotel above
              the Douro. A golf club an hour south of Málaga. Places people
              love, told online the way they deserve to be told.
            </Prose>
          </Reveal>
        </NarrowContainer>
      </section>

      {/* SELECTED WORK ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="flex items-end justify-between gap-8 mb-12">
            <Reveal>
              <div>
                <Eyebrow>Selected work</Eyebrow>
                <SectionHeading className="mt-5">Recent sites.</SectionHeading>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="hidden sm:block text-[13px] text-[var(--color-ink-muted)] max-w-[32ch] leading-relaxed">
                Sample work · early launches. More case studies being written.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {SAMPLES.map((s, i) => (
              <Reveal key={s.name} delayMs={i * 80}>
                <SampleCard
                  name={s.name}
                  location={s.location}
                  tag={s.tag}
                  variant={s.variant}
                  href={s.href}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Rule />

      {/* FROM THE FOUNDERS ────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">
            <Reveal>
              <FoundersPortrait />
            </Reveal>
            <div>
              <Reveal delayMs={80}>
                <Eyebrow>From the founders</Eyebrow>
              </Reveal>
              <Reveal delayMs={140}>
                <SectionHeading className="mt-5 max-w-[22ch]">
                  Danish sensibility, 20+ years of pixels between us.
                </SectionHeading>
              </Reveal>
              <Reveal delayMs={220}>
                <Prose className="mt-7 max-w-[56ch]">
                  sitio studio is Mads Reuther and Jon Lollike — two Copenhagen
                  designers with more than twenty years of combined experience
                  building digital work for brands large and small. We started
                  sitio because local businesses deserve sites that feel made
                  for them, not picked from a dropdown.
                </Prose>
              </Reveal>
              <Reveal delayMs={300}>
                <div className="mt-8">
                  <SecondaryButton href="/about">Read our story →</SecondaryButton>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-28 bg-[var(--color-ink)] text-[var(--color-cream)]">
        <NarrowContainer className="text-center">
          <Reveal>
            <Eyebrow className="text-[var(--color-earth)]">
              Start a project
            </Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-5 font-[var(--font-serif)] text-[34px] md:text-[50px] leading-[1.08] tracking-[-0.01em]">
              Tell us about your business. We&apos;ll reply within 24 hours.
            </h2>
          </Reveal>
          <Reveal delayMs={180}>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center h-12 px-7 rounded-full bg-[var(--color-cream)] text-[var(--color-ink)] text-[15px] font-medium hover:bg-white transition-colors"
              >
                Get in touch
              </Link>
              <a
                href="mailto:hello@sitiostudio.com"
                className="text-[14px] text-[var(--color-cream)]/80 hover:text-[var(--color-cream)] underline decoration-[var(--color-earth)] underline-offset-4"
              >
                hello@sitiostudio.com
              </a>
            </div>
          </Reveal>
        </NarrowContainer>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────

function SampleCard({ name, location, tag, variant, href }: Sample) {
  const isLive = href && href !== '#';
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    isLive ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {children}
      </a>
    ) : (
      <div className="group block">{children}</div>
    );
  return (
    <Wrapper>
      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[var(--color-cream-deep)]">
        <SelectedWorkIllustration
          variant={variant}
          businessName={name}
          region={location}
          tag={tag}
        />
        {isLive ? (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[var(--color-ink)]/85 text-[var(--color-cream)] text-[11px] uppercase tracking-[0.18em] font-medium backdrop-blur">
            Live →
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}

function FoundersPortrait() {
  return (
    <div className="aspect-[4/5] rounded-md overflow-hidden bg-[var(--color-cream-deep)]">
      <FoundersIllustration />
    </div>
  );
}
