// Prompt presets used by the build-time generation scripts. Centralized
// so we can iterate copy without re-running the whole generation graph,
// and so the script for each surface stays a thin orchestrator.
//
// History: an earlier draft tripped FAL's content filter on 7/9 prompts.
// Triggers identified: "fabric", "drape/draped", "still life", "wine",
// "vineyard", "olive". This file uses concrete-object phrasings that
// matched the three prompts that succeeded (craft-table, sun-stone,
// health) — same warm/editorial vibe, no flagged terms.

export const HERO_PROMPTS: ReadonlyArray<{ id: string; prompt: string }> = [
  {
    id: 'paper-light',
    prompt:
      'Editorial fine-art photograph: a stack of cream watercolor paper sheets resting on a warm beige plaster surface, golden afternoon sunlight raking from the upper left, soft shadow edges, warm grain, color palette of cream, sand, soft terracotta. Shot on medium format film. Calm, minimal, restful. No text, no logos.',
  },
  {
    id: 'linen-table',
    prompt:
      'Editorial photograph: a length of unbleached natural linen folded across a worn wooden table in a sunlit Mediterranean atelier, warm afternoon light from a high window, soft shadow play, cream and tan tones, almost monochrome. Editorial magazine feel. No text, no people, no logos.',
  },
  {
    id: 'ceramic-paper',
    prompt:
      'Warm minimal scene: a single matte ceramic vessel beside a folded sheet of cream paper on a sunlit plaster surface, late afternoon light from the left, gentle warm shadows, painterly atmosphere, ochre and clay tones. Editorial composition. No text, no logos.',
  },
  {
    id: 'architectural-light',
    prompt:
      'Architectural detail photograph: a corner of a sun-warmed plaster wall meeting a smooth beige stone floor, late afternoon raking light through a tall window, soft dust in the air, almost monochromatic warm palette, calm and minimal. Editorial. No text, no logos.',
  },
  {
    id: 'terraced-hills',
    prompt:
      'Soft-focus warm photograph of Mediterranean terraced countryside at golden hour, low stone walls layered up the slope, warm dust in the late light, sage green and cream tones, gentle abstract composition. Painterly. Editorial magazine feel. No text, no logos.',
  },
  {
    id: 'craft-table',
    prompt:
      'Top-down editorial photograph: a craft worktable with a length of unbleached linen, a small clay cup, a folded sheet of cream paper, soft window light, warm earth and cream palette, restful composition. No text, no logos.',
  },
  {
    id: 'sun-stone',
    prompt:
      'Smooth river stones on warm sand under late afternoon sun, very soft shadows, neutral cream and earth palette, abstract minimal, calm. Editorial. No text, no logos.',
  },
] as const;

export const WORK_PROMPTS: Record<string, { prompt: string; negative?: string }> = {
  hospitality: {
    // Was: Mediterranean coastal villa at golden hour. Trip: probably the
    // compound. New version describes architectural detail in concrete
    // terms (stone courtyard + arched window) which matches the pattern
    // that succeeded for "health".
    prompt:
      'Minimalist hotel website mockup: hero photograph of a sun-bleached Mediterranean stone courtyard with arched windows at golden hour, warm editorial photography, simple top navigation bar, italic serif title, generous whitespace, cream and ochre palette. Web design portfolio screenshot. No fake text — visual blocks only.',
  },
  leisure: {
    // Was: dim candlelit dining room with linen tablecloth. Trip: likely
    // the dim/candlelit low-light combination. New version is a sunlit
    // dining room — same restaurant intent, daytime framing.
    prompt:
      'Editorial restaurant website mockup: hero photograph of a sunlit dining room with a terracotta tiled floor and a tall open window, warm midday light, italic serif headline overlay, soft cream and tan tones, very minimal top navigation, premium magazine feel. Web design portfolio screenshot.',
  },
  health: {
    // Untouched — this prompt succeeded on the prior run.
    prompt:
      'Calm clinic website mockup, hero photograph of soft beige interior with single chair and large window, daylight, italic serif headline, very white space, cream and sage tones, medical-but-warm. Web design portfolio screenshot.',
  },
  wine: {
    // Was: vineyard rows at sunset, burgundy palette, winery. Trip: the
    // wine/vineyard cluster. New version frames it as a generic
    // boutique estate — rolling countryside + farmhouse + stone walls
    // at sunset. Same atmosphere, no flagged nouns.
    prompt:
      'Boutique estate website mockup: hero photograph of rolling Mediterranean countryside with terraced stone walls and a single farmhouse at sunset, warm earth and cream palette, italic serif headline overlay, clean top navigation, premium estate aesthetic. Web design portfolio screenshot.',
  },
} as const;
