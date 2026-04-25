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
  title: 'Process',
  description:
    'How a sitio project actually runs — from the first conversation to a live site in seven days.',
};

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    duration: '1 day',
    we: [
      'Study your reviews, photography, and competitive set',
      'Write a short design brief',
      'Suggest a direction — typography, pace, photography mood',
    ],
    you: [
      'A 20-minute call or a single email',
      'Any photography you already love (or none — we can handle that)',
    ],
    body:
      'We look at your business the way a critic looks at a restaurant — carefully, for more than ten seconds, with taste as the starting point.',
  },
  {
    step: '02',
    title: 'Design',
    duration: '2–3 days',
    we: [
      'Build the full site on a preview URL',
      'Write copy in your language, with your voice',
      'Iterate once based on your feedback',
    ],
    you: [
      'A single round of notes on the preview',
      'A yes / not-yet on each section',
    ],
    body:
      'You see the real thing, not a mockup. If something is wrong, we change it — once. Endless rounds burn good work; one sharp round improves it.',
  },
  {
    step: '03',
    title: 'Deliver',
    duration: '1 day',
    we: [
      'Connect your domain (or register a new one)',
      'Deploy on fast global CDN with automatic HTTPS',
      'Set up your self-edit access so you can change copy without us',
    ],
    you: [
      'Your domain, or €15 to let us buy one',
      'Ten minutes to sign off',
    ],
    body:
      'We do not hold your site hostage. You own the domain, we host it, and you can leave at any time with a full copy.',
  },
  {
    step: '04',
    title: 'Support',
    duration: 'Ongoing',
    we: [
      'Keep the site online and fast',
      'Security, backups, SSL renewals',
      'Small copy / photo swaps on request (one per month)',
    ],
    you: [
      'Pay €29/month · cancel any time',
      'Tell us when something changes in your business',
    ],
    body:
      'After launch we stay with you. Your site is a living thing — hours change, menus change, staff change. Small edits stay free so you actually make them.',
  },
];

const FAQS = [
  {
    q: 'Seven days is fast. Is it actually good?',
    a: 'We pre-research your business before the first call so no day is wasted on discovery alone. Our tooling takes care of scaffolding — the design work gets the full attention. The site you launch on day seven is the site we would make in three weeks elsewhere; the difference is how much time we spend waiting.',
  },
  {
    q: 'Do I own the site?',
    a: 'Yes. You own your domain, your content, and the full code. If you ever cancel, we export everything — files, database, images — and send it to you. No hostage situations.',
  },
  {
    q: 'Can I edit it myself after launch?',
    a: 'Yes. You get a magic-link login to a simple editor where you can change copy, swap photos, and update opening hours. For structural changes (new sections, rebranding), we handle those for you.',
  },
  {
    q: 'What if I do not like it?',
    a: 'You have seven days after launch to request a full refund, no questions. After that, a normal month of support is €29 and you can cancel any time.',
  },
  {
    q: 'Can you write the copy?',
    a: 'We draft everything in your site&apos;s language using your reviews, menu, and business type as context. You edit or rewrite anything you want. We do not write long-form marketing copy, ads, or SEO content.',
  },
  {
    q: 'Do you take photos?',
    a: 'Not yet. We use your existing photos, Unsplash where appropriate, and recommend local photographers we trust when the shoot is worth it. Photography rates are separate — typically €300–800 for a half day.',
  },
  {
    q: 'Will I rank higher on Google?',
    a: 'Your site will be fast, accessible, properly structured for search, and submitted to Google Search Console. That is the plumbing. Rankings depend on reviews, links, and local signals over months — we do not promise positions we cannot control.',
  },
  {
    q: 'What languages do you work in?',
    a: 'We design in English and ship in yours — Spanish, Portuguese, Italian, French, German, Croatian, Greek, and others on request. Your customers see the site in their language, not ours.',
  },
  {
    q: 'Can I have multiple languages on one site?',
    a: 'Yes. Common pattern: main language for locals, English for tourists. Switchable from the header.',
  },
  {
    q: 'How does payment work?',
    a: '€1000 flat on signing, €29/month hosting starts the day you go live. Bank transfer or card via Stripe. EU VAT added where applicable.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'The site stops being hosted by us. You get a one-time export of all files and content. You are welcome to host it yourself or move it to another studio — the code is yours.',
  },
  {
    q: 'Do you work with businesses outside Southern Europe?',
    a: 'Yes. Most of our work is in Spain, Italy, Portugal, France and Croatia, but we will happily take on good businesses anywhere. Time zones permitting.',
  },
  {
    q: 'Do you do e-commerce?',
    a: 'Not as a primary focus. Light Stripe-based booking and deposit flows — yes. Full multi-SKU online stores — not our strength. We&apos;ll tell you honestly and point you elsewhere.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="pt-20 md:pt-28 pb-16">
        <Container>
          <Reveal>
            <Eyebrow>Process</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <DisplayHeading className="mt-6 max-w-[20ch]">
              Four unhurried steps. One very short calendar.
            </DisplayHeading>
          </Reveal>
          <Reveal delayMs={160}>
            <Prose className="mt-8 max-w-[58ch]">
              From our first conversation to your live site is typically seven
              business days. Here is exactly what happens in each of them.
            </Prose>
          </Reveal>
        </Container>
      </section>

      <Rule />

      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delayMs={i * 80}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                  <div>
                    <span className="font-[var(--font-serif)] text-[34px] md:text-[48px] text-[var(--color-earth)] leading-none tracking-tight">
                      {s.step}
                    </span>
                    <h2 className="mt-3 font-[var(--font-serif)] text-[30px] md:text-[40px] leading-[1.1] tracking-[-0.01em]">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                      {s.duration}
                    </p>
                  </div>
                  <div>
                    <Prose className="max-w-[58ch]">{s.body}</Prose>
                    <div className="mt-8 grid sm:grid-cols-2 gap-8">
                      <DetailList label="We handle" items={s.we} />
                      <DetailList label="You provide" items={s.you} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-[var(--color-cream-deep)]">
        <NarrowContainer>
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
          </Reveal>
          <Reveal delayMs={80}>
            <SectionHeading className="mt-5">
              Honest answers to what people actually ask.
            </SectionHeading>
          </Reveal>
          <div className="mt-12 flex flex-col">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delayMs={Math.min(i, 8) * 40}>
                <div
                  className="group relative py-6 border-b last:border-b-0 border-[var(--color-rule)]/70 transition-colors duration-300"
                  style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
                >
                  {/* Earth left-rule that fades in on hover. Editorial
                      cue without changing the FAQ rhythm. */}
                  <span
                    aria-hidden
                    className="absolute -left-3 top-7 bottom-6 w-[2px] bg-[var(--color-earth)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <h3 className="font-[var(--font-serif)] text-[20px] md:text-[22px] tracking-[-0.005em] text-[var(--color-ink)]">
                    {f.q}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.72] text-[var(--color-ink-soft)] max-w-[66ch]">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </NarrowContainer>
      </section>

      <section className="py-20 md:py-28 text-center">
        <NarrowContainer>
          <Reveal>
            <SectionHeading>Ready to get your site started?</SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-8">
              <PrimaryButton href="/contact">Tell us about your business →</PrimaryButton>
            </div>
          </Reveal>
        </NarrowContainer>
      </section>
    </>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
        {label}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[var(--color-ink-soft)] leading-[1.6]">
            <span aria-hidden className="text-[var(--color-earth)] mt-[0.35em]">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
