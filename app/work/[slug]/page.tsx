import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, NarrowContainer } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import {
  DisplayHeading,
  Eyebrow,
  Prose,
  PrimaryButton,
  SecondaryButton,
  Rule,
} from '@/components/ui';
import { SelectedWorkThumbnail } from '@/components/placeholders/SelectedWorkThumbnail';
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies';
import { readWorkManifest } from '@/lib/ai/manifest';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: 'Case study not found' };
  return {
    title: `${c.kind}, ${c.region}`,
    description: c.testimonial,
    openGraph: {
      title: `${c.kind}, ${c.region} · sitio studio`,
      description: c.testimonial,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const workManifest = readWorkManifest();
  const ai = workManifest?.[c.variant];

  return (
    <>
      {/* HEADER ──────────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-32 pb-10 md:pb-14">
        <Container>
          <Reveal>
            <Link
              href="/#selected-work"
              className="inline-flex items-center gap-1 text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] hover:text-[var(--color-earth)] transition-colors"
            >
              ← Selected work
            </Link>
          </Reveal>
          <Reveal delayMs={60}>
            <Eyebrow className="mt-8">{c.region} · {c.launchDate}</Eyebrow>
          </Reveal>
          <Reveal delayMs={120}>
            <DisplayHeading className="mt-5 max-w-[18ch]">
              {c.kind}.
            </DisplayHeading>
          </Reveal>
        </Container>
      </section>

      {/* HERO IMAGE ──────────────────────────────────────────────── */}
      <section className="pb-12 md:pb-20">
        <Container>
          <Reveal delayMs={140}>
            <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-[var(--color-cream-deep)] ring-1 ring-[var(--color-rule)]/70">
              <SelectedWorkThumbnail
                variant={c.variant}
                aiSrc={ai ? `/ai-cache/work/${ai.file}` : undefined}
                aiW={ai?.width}
                aiH={ai?.height}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <Rule />

      {/* OVERVIEW + TESTIMONIAL ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <Reveal>
                <Eyebrow>Overview</Eyebrow>
              </Reveal>
              {c.overview.map((para, i) => (
                <Reveal key={i} delayMs={80 + i * 60}>
                  <Prose className="max-w-[58ch]">{para}</Prose>
                </Reveal>
              ))}
            </div>

            <aside className="md:sticky md:top-24 space-y-8">
              <Reveal delayMs={120}>
                <figure className="border-l-2 border-[var(--color-earth)] pl-5">
                  <blockquote className="font-[var(--font-serif)] italic text-[20px] md:text-[22px] leading-[1.5] text-[var(--color-ink)]">
                    &ldquo;{c.testimonial}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[13px] text-[var(--color-ink-muted)]">
                    {c.ownerName}, {c.ownerRole}
                  </figcaption>
                </figure>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <Rule />

      {/* DELIVERABLES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-cream-deep)]">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Deliverables</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <ul className="mt-8 divide-y divide-[var(--color-rule)]/70">
              {c.deliverables.map((d) => (
                <li
                  key={d}
                  className="py-4 text-[16px] leading-[1.6] text-[var(--color-ink)]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </NarrowContainer>
      </section>

      {/* RELATED ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>More work</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASE_STUDIES.filter((other) => other.slug !== c.slug)
                .slice(0, 3)
                .map((other) => {
                  const otherAi = workManifest?.[other.variant];
                  return (
                    <Link
                      key={other.slug}
                      href={`/work/${other.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-[var(--color-cream-deep)] ring-1 ring-[var(--color-rule)]/70 transition-shadow duration-500 ease-out group-hover:ring-[var(--color-earth)]/40 group-hover:shadow-[0_18px_40px_-22px_rgba(26,24,20,0.35)]">
                        <SelectedWorkThumbnail
                          variant={other.variant}
                          aiSrc={otherAi ? `/ai-cache/work/${otherAi.file}` : undefined}
                          aiW={otherAi?.width}
                          aiH={otherAi?.height}
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="font-[var(--font-serif)] italic text-[16px] text-[var(--color-ink)]">
                          {other.kind}
                        </span>
                        <span className="uppercase tracking-[0.2em] text-[10.5px] text-[var(--color-ink-muted)]">
                          {other.region}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[var(--color-ink)] text-[var(--color-cream)]">
        <NarrowContainer className="text-center">
          <Reveal>
            <h2 className="font-[var(--font-serif)] text-[26px] sm:text-[32px] md:text-[40px] leading-[1.12] tracking-[-0.01em]">
              Want a site like this one?
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PrimaryButton href="/contact">Get in touch</PrimaryButton>
              <SecondaryButton href="/#selected-work">More case studies</SecondaryButton>
            </div>
          </Reveal>
        </NarrowContainer>
      </section>

      {/* DISCLAIMER ─────────────────────────────────────────────── */}
      <section className="py-10">
        <Container>
          <p className="text-center text-[11.5px] text-[var(--color-ink-muted)] tracking-wider max-w-[58ch] mx-auto leading-relaxed">
            Names and details lightly anonymized at clients&apos; request.
          </p>
        </Container>
      </section>
    </>
  );
}
