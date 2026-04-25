// Prompt presets used by the build-time generation scripts. Centralized
// so we can iterate copy without re-running the whole generation graph,
// and so the script for each surface stays a thin orchestrator.

export const HERO_PROMPTS: ReadonlyArray<{ id: string; prompt: string }> = [
  {
    id: 'paper-light',
    prompt:
      'Editorial fine-art photograph: warm cream paper textures softly folded, golden hour daylight raking from upper left, abstract minimal still life, soft bokeh, organic shadow play, color palette of cream, sand, terracotta, muted sage. Shot on medium format film. No text, no logos.',
  },
  {
    id: 'draped-fabric',
    prompt:
      'Editorial photograph: cream linen drapes over a wooden surface in a sunlit Mediterranean atelier, warm tan and earth tones, soft natural light from a high window, calm minimal composition, slight grain. No text, no people, no logos.',
  },
  {
    id: 'still-life',
    prompt:
      'Warm minimal still life: a single ceramic vessel and a folded paper sheet on a cream-painted plaster wall, late afternoon light from the left, warm shadows, painterly atmosphere, subtle ochre and clay tones. No text, no logos.',
  },
  {
    id: 'architectural-light',
    prompt:
      'Architectural detail photograph: cream limewashed wall meeting a soft beige floor, raking diagonal sunlight, dust motes, almost monochromatic warm palette, Wabi-sabi calm, very minimal. No text, no logos.',
  },
  {
    id: 'olive-grove',
    prompt:
      'Soft-focus warm photograph of a Mediterranean olive grove at golden hour, dust in the light, sage green and cream, gentle abstract composition. Painterly. Editorial magazine feel. No text, no logos.',
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
    prompt:
      'Minimalist hotel website mockup, hero photograph of a Mediterranean coastal villa at golden hour, warm editorial photography, simple navigation bar at top, italic serif title, generous whitespace, cream and ochre palette. Looks like a high-end web design portfolio screenshot. No fake text — just visual blocks.',
  },
  leisure: {
    prompt:
      'Editorial restaurant website mockup, hero photograph of dim candlelit dining room with linen tablecloth, italic serif headline overlay, soft warm browns and cream, very minimal navigation, premium magazine feel. Web design portfolio screenshot.',
  },
  health: {
    prompt:
      'Calm clinic website mockup, hero photograph of soft beige interior with single chair and large window, daylight, italic serif headline, very white space, cream and sage tones, medical-but-warm. Web design portfolio screenshot.',
  },
  wine: {
    prompt:
      'Boutique winery website mockup, hero photograph of vineyard rows at sunset with mountain backdrop, warm earth and burgundy palette, italic serif headline overlay, clean navigation, premium estate aesthetic. Web design portfolio screenshot.',
  },
} as const;
