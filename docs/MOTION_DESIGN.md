# Motion Design

How motion works on sitiostudio.com, and how to add to it without
breaking the language.

## Philosophy

Aesop, not Apple. Stillness with purpose. Every motion should feel
**considered, slow, and editorial** — never showy. If a motion makes
the visitor notice it before noticing the content, it has failed.

Three rules:

1. **One easing curve.** Everything that moves uses
   `cubic-bezier(0.2, 0.7, 0.2, 1)`, exposed as `var(--sitio-ease)`.
   No other curves.
2. **Three durations.** `--sitio-dur-fast` (200ms), `--sitio-dur-mid`
   (320ms), `--sitio-dur-slow` (500ms). Reach for these tokens
   first; if a movement needs something else, ask whether the
   movement is wrong, not the duration.
3. **Reduced motion is non-negotiable.** Every animation in the
   codebase respects `prefers-reduced-motion: reduce` either via
   `@media` gates in `globals.css` or via component-level
   `useState` checks. Test by enabling the OS setting and visiting
   every page.

## Token reference

```css
:root {
  --sitio-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --sitio-dur-fast: 200ms;   /* hover state changes */
  --sitio-dur-mid:  320ms;   /* most transitions */
  --sitio-dur-slow: 500ms;   /* card lifts, image fades */
}
```

Inline use:

```tsx
<button
  className="transition-transform duration-300 hover:-translate-y-[1px]"
  style={{ transitionTimingFunction: 'var(--sitio-ease)' }}
>
```

Tailwind's arbitrary `transition-timing-function` doesn't accept
CSS variables cleanly, so we set the timing function via inline
`style`. Annoying but correct.

## Existing motion surfaces

### Site-wide

| Surface | Behavior | Implementation |
|---------|----------|----------------|
| Page navigation | Cross-fade between routes | `components/TransitionLink.tsx` + `::view-transition-*` keyframes in `globals.css` |
| Custom cursor | 10px earth dot lerps after the real cursor; grows to 32px hollow ring on interactive elements | `components/CustomCursor.tsx` |
| Body color tint | Cream variable shifts ~5% by local hour band | `components/TimeOfDayTint.tsx` |

### Hero (`/`)

| Surface | Behavior | Implementation |
|---------|----------|----------------|
| Background image | Random AI image fades up over 700ms once `next/image` reports load | `components/HeroBackground.tsx` |
| Headline | Per-letter rise + variable-weight breath, 28ms stagger | `components/AnimatedHeadline.tsx`, `.sitio-letter` keyframes in `globals.css` |
| Cream wash | 700ms fade-in tracked to the image | inline transitions |

### Reveal-on-scroll

`components/Reveal.tsx` wraps any block in an IntersectionObserver
that adds the `sitio-revealed` class on first intersection. The
wrapped block fades up (`opacity 0 → 1`, `translateY 12px → 0`)
over 700ms.

Use it on any section heading, eyebrow, prose block, image, or
CTA. **Don't** use it on form inputs or interactive controls —
the user should not have to wait for the input to fade in before
typing.

```tsx
<Reveal delayMs={80}>
  <SectionHeading>Selected work</SectionHeading>
</Reveal>
```

`delayMs` should ladder small offsets within a single section
(0 → 80 → 160 → 240) so a section "uncurtains" rather than all
nodes appearing at once.

### Hover micro-interactions

Buttons (`PrimaryButton`, `SecondaryButton`) lift `-1px` and pick
up a faint earth-glow shadow on hover, return to baseline on
active. Pricing cards lift `-2px` with the same shadow language.
Selected-work cards apply a `1.025` scale to the image and the
ring shifts to `earth/45`. FAQ rows on `/process` reveal a 2px
earth left-rule on hover.

Pattern: lift, never grow. Shadow, never glow. Ink and earth,
never accent colors.

## Adding new motion

Before you write `transition: …`, ask:

1. Is there an existing pattern I can match? Buttons already lift,
   cards already shadow — extend before you invent.
2. Does it survive `prefers-reduced-motion`? Either gate the rule
   inside a `@media (prefers-reduced-motion: reduce) { … }` block
   in `globals.css` or check the `matchMedia` value in JS.
3. Does it use `var(--sitio-ease)` and one of the duration tokens?

If yes to all three, ship it. If no to any, fix it before shipping.

## Future Lottie integration

We considered Lottie in an earlier session and deferred. The site
holds its restraint without it; it's not a missing feature.

If we add Lottie later, the constraints are:

- **Total Lottie payload < 100 KB** across all animations on a
  page. Per-file < 20 KB ideally.
- **No Lottie in the hero.** The hero already has 1 motion layer
  (variable-weight type), 1 image fade, and 1 cream wash. A 4th
  motion system stacked there is the recipe for noise.
- **OK in process icons, CTA hover affordances, and section
  transitions.** These are quiet contexts where one Lottie can
  read as intentional craft rather than as bundle bloat.
- **Respect `prefers-reduced-motion`.** `lottie-react` exposes
  `lottieRef.current.pause()` — call it on mount when reduced
  motion is on, leave the static first frame visible.
- **Curate, don't grab.** Most free Lotties on lottiefiles.com
  are bright/geometric/generic. Pick from a real curation pass:
  warm palette, slow timing, organic motion. Reject anything
  that looks like a SaaS dashboard explainer.
- **Store in `public/lottie/{category}/{name}.json`** so they
  ship from the CDN with no external dep at runtime. Categories
  we'd start with: `process/`, `cta/`, `transition/`.

Don't add Lottie to keep up with competitors who use it. Add it
only when a specific surface earns it.

## Testing checklist before shipping a motion change

- [ ] Open the page, watch the change — does it draw your eye away
      from the content? If yes, slow it down or remove it.
- [ ] Toggle `prefers-reduced-motion` in OS settings. Does the
      change disappear cleanly?
- [ ] Mobile (375px). Does the motion still read, or is it cramped?
- [ ] Lighthouse on `/`. Did Performance drop more than 2 points?
- [ ] One full nav cycle (home → about → process → pricing →
      contact → home). Does the motion language read as one voice?
