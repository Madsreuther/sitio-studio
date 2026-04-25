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
  SelectedWorkThumbnail,
  type WorkVariant,
} from '@/components/placeholders/SelectedWorkThumbnail';
import { FoundersIllustration } from '@/components/placeholders/FoundersIllustration';
import { HeroScene3D } from '@/components/HeroScene';
import { HeroAiWash } from '@/components/HeroAiWash';
import { readHeroManifest, readWorkManifest } from '@/lib/ai/manifest';

// Small curated sample list. Images intentionally not wired to live previews
// yet — placeholder gradients keep the page fast and predictable until real
// photography lands.
type Sample = {
  kind: string;
  region: string;
  variant: WorkVariant;
};

// Non-clickable display cards — stock-style imagery showing aesthetic
// across common business types we design for. Intentionally no business
// names and no click-through; the label below each card is the only
// context.
const SAMPLES: Sample[] = [
  { kind: 'Boutique hotel', region: 'Costa del Sol', variant: 'hospitality' },
  { kind: 'Restaurant', region: 'Lisboa', variant: 'leisure' },
  { kind: 'Dental clinic', region: 'Madrid', variant: 'health' },
  { kind: 'Winery', region: 'Mendoza', variant: 'wine' },
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
  // Read at build/render time on the server. Manifest is null until the
  // FAL generator has been run; the wash + work card components no-op
  // in that case and the existing visuals stay in place.
  const heroManifest = readHeroManifest();
  const workManifest = readWorkManifest();

  return (
    <>
      {/* HERO ──────────────────────────────────────────────────────── */}
      <section className="relative isolate pt-20 md:pt-32 pb-24 md:pb-32 overflow-hidden">
        <HeroScene3D />
        <HeroAiWash manifest={heroManifest} />
        {/* Soft cream wash behind the headline so type stays readable
            when a brighter form drifts behind it. radial-gradient sits
            above the canvas (-z-10 below) but under the type stack. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 right-0 -z-[5] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 56% 70% at 28% 42%, rgba(245,241,235,0.78) 0%, rgba(245,241,235,0) 70%)',
          }}
        />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6">
            {SAMPLES.map((s, i) => (
              <Reveal key={`${s.kind}-${s.region}`} delayMs={i * 80}>
                <SampleCard
                  kind={s.kind}
                  region={s.region}
                  variant={s.variant}
                  workManifest={workManifest}
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
            <h2 className="mt-5 font-[var(--font-serif)] text-[30px] sm:text-[36px] md:text-[50px] leading-[1.08] tracking-[-0.01em]">
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

function SampleCard({
  kind,
  region,
  variant,
  workManifest,
}: {
  kind: string;
  region: string;
  variant: WorkVariant;
  workManifest: ReturnType<typeof readWorkManifest>;
}) {
  const ai = workManifest?.[variant];
  return (
    <figure className="block">
      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[var(--color-cream-deep)] ring-1 ring-[var(--color-rule)]/70">
        <SelectedWorkThumbnail
          variant={variant}
          aiSrc={ai ? `/ai-cache/work/${ai.file}` : undefined}
          aiW={ai?.width}
          aiH={ai?.height}
        />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-[var(--font-serif)] italic text-[16px] lg:text-[15px] text-[var(--color-ink)]">
          {kind}
        </span>
        <span className="uppercase tracking-[0.2em] text-[10.5px] text-[var(--color-ink-muted)]">
          {region}
        </span>
      </figcaption>
    </figure>
  );
}

function FoundersPortrait() {
  return (
    <div className="max-w-[280px] mx-auto md:mx-0 md:max-w-none aspect-[4/5] rounded-md overflow-hidden bg-[var(--color-cream-deep)]">
      <FoundersIllustration />
    </div>
  );
}
