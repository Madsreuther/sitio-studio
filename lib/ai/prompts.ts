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

// House style for every work-case image: pure editorial photography
// of the BUSINESS, not a website mockup. Flux Schnell does not accept
// a negative_prompt, so anti-text guards have to live inside the
// prompt itself. Repeating the no-text language at the end of each
// prompt is deliberate; Flux weights tail tokens slightly higher and
// repetition reduces the model's tendency to draw signage / menus /
// screens / chalkboards.
const NO_TEXT_TAIL =
  'No text anywhere in the frame. No words, no letters, no signage, no menu boards, no chalkboards, no labels, no logos, no posters, no books, no laptops, no monitors, no screens, no phones, no website, no UI, no mockup, no graphic design, no overlay. Pure photography only.';

export const WORK_PROMPTS: Record<string, { prompt: string; negative?: string }> = {
  hospitality: {
    prompt: [
      'Editorial fine-art photograph of a sun-bleached Mediterranean villa exterior at golden hour:',
      'whitewashed stone walls, an arched doorway, terracotta roof tiles, a gnarled olive tree casting long late-afternoon shadow across a flagstone courtyard.',
      'Warm cream and ochre palette, soft golden light raking from low on the horizon, gentle film grain.',
      'Shot on medium format film, premium travel magazine feel.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  leisure: {
    prompt: [
      'Editorial fine-art photograph of a candlelit restaurant interior in the early evening:',
      'a worn wooden table set for two with linen napkins, two stemmed wine glasses catching warm light, a small ceramic carafe, soft amber bokeh in the background suggesting other tables.',
      'Warm tungsten and amber palette, shallow depth of field, painterly atmosphere.',
      'Shot on medium format film, fine-dining magazine feel.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  health: {
    prompt: [
      'Editorial architectural photograph of a calm modern dental clinic waiting room interior:',
      'a single pale linen armchair beside a tall window, polished concrete floor, a small ceramic vase with a single dried branch, warm daylight pouring across the floor.',
      'Cream and sage palette, minimal, almost monochromatic, generous negative space.',
      'Shot on a tilt-shift lens, calm and reassuring, editorial restraint.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  wine: {
    prompt: [
      'Editorial fine-art photograph of a vineyard at sunset:',
      'rows of mature grapevines climbing a gentle terraced slope, low golden sun behind the hills, two oak barrels resting in the foreground on bare earth, soft dust hanging in the warm air.',
      'Burgundy and amber and dusk-blue palette, painterly, shot on medium format film.',
      'Premium estate magazine feel.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  yoga: {
    prompt: [
      'Editorial fine-art photograph of a quiet yoga studio interior in early morning:',
      'a pale wood floor stretches across the frame, tall industrial-style windows on the far wall, soft golden sunbeams streaming through, one folded grey wool blanket and a single cork block resting on the floor, gentle dust in the air.',
      'Cream and warm grey palette, generous negative space, almost meditative.',
      'Shot on medium format film, calm and minimal.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  coffee: {
    prompt: [
      'Editorial fine-art photograph of an industrial coffee roastery interior in late afternoon:',
      'a large copper drum roaster in the foreground, stacks of unmarked plain burlap sacks behind it, polished concrete floor, a single hanging warehouse pendant lamp casting a pool of warm light, soft steam in the air.',
      'Warm rust and umber palette, gentle haze, painterly atmosphere.',
      'Shot on medium format film, artisan magazine feel.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  architecture: {
    prompt: [
      'Editorial top-down photograph of a clean wooden architecture studio drafting table:',
      'a single brass scale ruler resting diagonally across the bare table, a small ceramic cup holding three mechanical pencils, a brass drafting compass, a folded grey wool throw, soft window light raking from the side.',
      'Crucially the drafting paper is COMPLETELY BLANK and ROLLED CLOSED (no drawings, no diagrams, no annotations, no title blocks, no markings of any kind visible).',
      'Neutral cool palette of pale oak, slate grey, and soft white.',
      'Shot on medium format film, editorial restraint.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
  bakery: {
    prompt: [
      'Editorial fine-art photograph of a warm artisan bakery interior:',
      'three rustic country sourdough loaves resting on a worn wooden counter dusted with flour, a wicker basket of more loaves to the side, warm soft window light from the left, terracotta tile floor, a single brass scale visible in the soft background.',
      'Cream and amber and golden-crust palette, gentle film grain, painterly.',
      'Shot on medium format film, artisan magazine feel.',
      NO_TEXT_TAIL,
    ].join(' '),
  },
} as const;
