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
  title: 'About',
  description:
    'sitio studio is a boutique website studio in Copenhagen, built by two designers with twenty-plus years in digital design and strategy.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 md:pt-28 pb-16">
        <Container>
          <Reveal>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <DisplayHeading className="mt-6 max-w-[20ch]">
              A small studio for small businesses that deserve big care.
            </DisplayHeading>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">
            <Reveal>
              <div
                className="aspect-[4/5] rounded-md overflow-hidden"
                style={{
                  background:
                    'linear-gradient(155deg, #EDE6DB 0%, #C8A37A 55%, #6B4A2E 100%)',
                }}
              />
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal delayMs={80}>
                <SectionHeading>Mads & Jon</SectionHeading>
              </Reveal>
              <Reveal delayMs={140}>
                <Prose>
                  Mads Reuther and Jon Lollike have spent the last two decades
                  designing digital work for brands across Europe —
                  everything from small family ateliers to national retailers,
                  from Copenhagen&apos;s largest publishers to little winemakers
                  in the Douro. Somewhere along the way we noticed the sites
                  we&apos;d pay for didn&apos;t exist for the businesses we loved
                  most. So we started making them.
                </Prose>
              </Reveal>
              <Reveal delayMs={220}>
                <Prose>
                  sitio is a studio in the old sense — small, careful,
                  opinionated, working with a handful of clients at a time.
                  Between us that&apos;s more than twenty years of combined
                  experience in digital design and strategy, and a set of
                  taste standards we aren&apos;t willing to move off of.
                </Prose>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      <section className="py-20 md:py-28">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Why sitio exists</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionHeading className="mt-5">
              Good businesses should not have to look like everyone else.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-8">
              The tools most small businesses default to — Squarespace, Wix,
              Webflow — produce fine, generic, replaceable websites. They are
              honest tools and we respect the companies behind them. But a
              restaurant that&apos;s been feeding its neighborhood for thirty
              years deserves better than a dropdown and a stock photo. A
              dental clinic that&apos;s the best in town should not be
              indistinguishable from the one three blocks away.
            </Prose>
          </Reveal>
          <Reveal delayMs={240}>
            <Prose className="mt-6">
              We use modern tooling — yes, including AI assistance — to do the
              dull work fast, so the design work gets the time it needs. What
              ends up in front of your customers is made by us, on purpose,
              for you.
            </Prose>
          </Reveal>
        </NarrowContainer>
      </section>

      <section className="py-20 md:py-24 bg-[var(--color-cream-deep)]">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>The legal stuff</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionHeading className="mt-5" as="h3">
              sitio studio is a product of Estaid ApS.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-6">
              Estaid ApS is a Copenhagen-registered Danish private limited
              company. VAT-registered in the EU. Invoicing, contracts, and
              deliverables are all handled under the Estaid ApS legal entity.
              If you need a VAT number for accounting, we&apos;ll send one over
              with your first invoice.
            </Prose>
          </Reveal>
        </NarrowContainer>
      </section>

      <section className="py-20 md:py-28 text-center">
        <NarrowContainer>
          <Reveal>
            <SectionHeading>Want to work with us?</SectionHeading>
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
