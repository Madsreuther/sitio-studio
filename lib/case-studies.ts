import type { WorkVariant } from '@/components/placeholders/SelectedWorkThumbnail';

// Selected Work catalog. The home page renders a carousel of these;
// each /work/[slug] page reads from this same source. Names, exact
// numbers, and quote attributions are lightly anonymized at the
// clients' request — see the disclaimer at the bottom of every
// detail page.

export type CaseStudy = {
  slug: string;
  kind: string;
  region: string;
  variant: WorkVariant;
  launchDate: string;
  ownerName: string;
  ownerRole: string;
  testimonial: string;
  overview: string[]; // 2-3 paragraphs
  deliverables: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'boutique-hotel-costa-del-sol',
    kind: 'Boutique hotel',
    region: 'Costa del Sol',
    variant: 'hospitality',
    launchDate: 'Launched February 2026',
    ownerName: 'Lucia M.',
    ownerRole: 'Owner',
    testimonial:
      'Took some back-and-forth on the booking copy, but the final result reads like our front desk would actually say it. Bookings are up.',
    overview: [
      'A small Andalusian villa with twelve rooms wanted a site that felt more like the place itself: white walls, jasmine on the patio, the late-afternoon light through the courtyard arches. The previous site was a generic booking template that never quite caught how the property actually feels.',
      'We rewrote the room descriptions in the voice the staff use at check-in, leaned into editorial photography of the courtyard and the garden, and hooked the booking flow into their existing PMS so reservations land where the team already works.',
      'The owner reports a lift in direct bookings against the OTAs in the first month. Most of the qualitative feedback has been about the photography reading like a magazine spread instead of a tile gallery.',
    ],
    deliverables: [
      'Bespoke design system (typography, palette, layout grid)',
      'Editorial photography direction for hero and room imagery',
      'Multilingual copy in Spanish and English',
      'Direct-booking integration with existing PMS',
      'Custom domain, hosting, SSL, ongoing AI chat support',
    ],
  },
  {
    slug: 'restaurant-lisboa',
    kind: 'Restaurant',
    region: 'Lisboa',
    variant: 'leisure',
    launchDate: 'Launched March 2026',
    ownerName: 'Tomás A.',
    ownerRole: 'Chef-owner',
    testimonial:
      'The site reads more like our cuisine than a menu. Reservations up about 30% the first month.',
    overview: [
      'A neighbourhood restaurant in Príncipe Real with a tasting menu that changes weekly. The chef wanted the site to feel as considered as the food, not a giant PDF dump of the menu.',
      'We built the site around a single rolling editorial: a paragraph on the week, the current menu typeset as a quiet column, and a reservation widget that does not feel like an interruption. Photography is sparse on purpose.',
      'The kitchen does not need to update the site by hand. A small admin lets the chef paste in next week\'s notes and the site refreshes the same evening.',
    ],
    deliverables: [
      'Editorial layout system tuned for weekly menu updates',
      'Lightweight admin for chef-managed content',
      'Reservation widget integrated with the existing booking provider',
      'Portuguese-first copy with English fallback',
      'Mobile-first design (most reservations come from phones)',
    ],
  },
  {
    slug: 'dental-clinic-madrid',
    kind: 'Dental clinic',
    region: 'Madrid',
    variant: 'health',
    launchDate: 'Launched January 2026',
    ownerName: 'Dr. Elena R.',
    ownerRole: 'Founder',
    testimonial:
      'Felt awkward at first to have AI involved, but the result is calm and precise. Online bookings have made our front desk significantly less hectic.',
    overview: [
      'A modern clinic in Salamanca that did not want to look like a stock-photo medical site. The brief was calm, precise, and reassuring without being sterile.',
      'We leaned into a soft sage-and-cream palette, an editorial layout for the practitioner bios, and a transparent pricing table that the team had not seen on any other clinic site in the city.',
      'Online bookings now handle most first-time patients, which has measurably reduced the time the front desk spends on the phone. The clinic flagged a small drop in no-shows after we added a one-click confirmation flow.',
    ],
    deliverables: [
      'Calm, editorial visual identity',
      'Transparent treatment pricing table',
      'Online booking flow with one-click confirmation',
      'Practitioner bios with editorial photography',
      'GDPR-compliant intake form',
    ],
  },
  {
    slug: 'winery-mendoza',
    kind: 'Winery',
    region: 'Mendoza',
    variant: 'wine',
    launchDate: 'Launched February 2026',
    ownerName: 'Diego P.',
    ownerRole: 'Winemaker',
    testimonial:
      'Wanted something that didn\'t feel like every other winery site. They listened. International shipping integration was straightforward.',
    overview: [
      'A small estate making single-vineyard reds wanted a site that did not lean on the same sunset-vineyard photography every other winery uses. The winemaker is third-generation and the family story is interesting; we built the site around that.',
      'The hero is a long-form essay on the estate, set in a quiet serif column. Bottles are presented as a catalogue, not a shop. Direct shipping to Europe and the US is wired into Stripe and a fulfilment partner the winemaker had already chosen.',
      'Subscriber numbers have grown steadily since launch. The winemaker mentioned that several international buyers cited the site itself as the reason they reached out.',
    ],
    deliverables: [
      'Long-form editorial hero',
      'Bottle catalogue with single-bottle and case purchase',
      'International shipping with Stripe and fulfilment partner',
      'Spanish, English, and basic German copy',
      'Cellar-door visit booking flow',
    ],
  },
  {
    slug: 'yoga-studio-brooklyn',
    kind: 'Yoga studio',
    region: 'Brooklyn',
    variant: 'yoga',
    launchDate: 'Launched March 2026',
    ownerName: 'Sara T.',
    ownerRole: 'Founder',
    testimonial:
      'Class signups got way easier. Took a couple iterations to get the schedule layout right but they kept refining until it worked.',
    overview: [
      'A small studio in Greenpoint with five teachers and a tight weekly schedule. The previous site buried the class times two clicks deep and most signups were happening over Instagram DM.',
      'We built a single-page schedule view that loads in under a second, with one-tap booking and a calendar export the regulars actually use. The visual identity is quiet, with morning light and a lot of negative space.',
      'The schedule layout took three iterations to feel right. The first version was too dense; the second was too airy and required too much scrolling on mobile. The third worked.',
    ],
    deliverables: [
      'Single-page weekly schedule view',
      'One-tap class booking with Stripe',
      'Teacher bios with portrait photography',
      'Calendar export for regulars',
      'Mobile-first design (booking happens on phones)',
    ],
  },
  {
    slug: 'coffee-roastery-reykjavik',
    kind: 'Coffee roastery',
    region: 'Reykjavik',
    variant: 'coffee',
    launchDate: 'Launched December 2025',
    ownerName: 'Jón K.',
    ownerRole: 'Roaster',
    testimonial:
      'We sell directly to subscribers now, which we never had a real way to do before. The shipping flow is simple.',
    overview: [
      'A small roastery in the harbour district had been wholesaling exclusively. They wanted to start a direct subscription line without rebuilding their whole back office.',
      'We built a subscription product around their three house roasts: pick a frequency, pick a grind, ships from their existing warehouse. The shop side of the site is thin on purpose; the editorial side, on the roasting process and the source farms, is where most of the time was spent.',
      'They report subscribers growing month over month. The roaster mentioned the site itself has become a sales tool for the wholesale side too.',
    ],
    deliverables: [
      'Stripe subscription with frequency and grind options',
      'Editorial pages on roasting process and source farms',
      'Wholesale enquiry form for cafes',
      'Icelandic and English copy',
      'Integration with existing fulfilment',
    ],
  },
  {
    slug: 'architecture-studio-athens',
    kind: 'Architecture studio',
    region: 'Athens',
    variant: 'architecture',
    launchDate: 'Launched February 2026',
    ownerName: 'Maria K.',
    ownerRole: 'Principal',
    testimonial: 'Other architects ask who built our site. That\'s the test for me.',
    overview: [
      'A four-person practice with a portfolio that deserved a real editorial treatment, not a Squarespace gallery. The principal wanted each project to feel like a magazine spread, not a tile.',
      'We built a project archive where each entry is a long-form layout: hero photograph, plan drawings, materials list, a paragraph on the brief, and supporting imagery sized for the phone. The home page rotates three featured projects with quiet typography between them.',
      'The studio reports an uptick in incoming enquiries from outside Greece. The principal also mentioned other architects asking who built it.',
    ],
    deliverables: [
      'Editorial project archive with per-project long-form layouts',
      'Plan-drawing presentation tuned for mobile and desktop',
      'Greek and English copy',
      'Press and contact pages',
      'Subtle typographic system across the site',
    ],
  },
  {
    slug: 'bakery-mexico-city',
    kind: 'Bakery',
    region: 'Mexico City',
    variant: 'bakery',
    launchDate: 'Launched January 2026',
    ownerName: 'Carlos R.',
    ownerRole: 'Owner',
    testimonial:
      'The site looks like our shop feels. We were skeptical about AI but the team made adjustments until it was right.',
    overview: [
      'A neighbourhood panadería in Roma Norte with a cult following for their conchas. The owner wanted a site that captured the warmth of the actual shop, not a Yelp listing.',
      'We built a simple weekday-by-weekday schedule of what is in the case, a small online order flow for whole loaves, and a story page on the family history of the bakery. Photography is warm and unfussy.',
      'The shop reports a meaningful lift in pre-orders for whole loaves on weekends. The owner was sceptical about AI in the loop and spent the first revision call asking sharp questions; by the second call he was pointing at copy and asking us to push it further.',
    ],
    deliverables: [
      'Daily case schedule (what is fresh today)',
      'Pre-order flow for whole loaves and special-occasion cakes',
      'Editorial family-history page',
      'Spanish-first copy',
      'Mobile design tuned for in-shop QR scans',
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | null {
  return CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}
