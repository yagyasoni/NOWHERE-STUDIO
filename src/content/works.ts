/**
 * Seven invented case studies. Client names, briefs and credits are made up
 * for this prototype and do not refer to any real company or person.
 */
import { pic } from "./media";

export type GalleryItem = {
  id: number;
  /** Column span on the 12-column gallery grid (12 = full width). */
  span?: 12 | 8 | 6 | 4;
};

export type Work = {
  slug: string;
  title: string;
  number: number;
  tagline: string;
  tags: string;
  year: string;
  description: string;
  concept: string;
  credits: string;
  cover: number;
  gallery: GalleryItem[];
};

export const works: Work[] = [
  {
    slug: "hearthline",
    title: "Hearthline",
    number: 1,
    tagline: "Where taste learns to mean something.",
    tags: "Branding / Packaging / Space design",
    year: "©25 . 26",
    description:
      "A specialty coffee house and roaster: single-origin lots, organic, traceable to the farm, with its own barista school. The founders are travellers and craftspeople first. The trap was obvious: specialty coffee has a house style now, clean but interchangeable, saying nothing of the journey or the hands.",
    concept:
      "So we built taste education into the brand itself. Each origin gets its own story, its own palate, its own reason to slow down, the way a chocolate bar earns a tasting note instead of a label. Warmth came back through texture and hand: materials you want to touch, type that feels drawn rather than set, imagery that smells of the place the bean came from. The result is a house, not a chain. Craft you can taste. Origins you can read.",
    credits: "Identity, packaging and space by Nowhere",
    cover: 766,
    gallery: [
      { id: 766, span: 12 },
      { id: 292, span: 6 },
      { id: 429, span: 6 },
      { id: 42, span: 12 },
      { id: 63, span: 4 },
      { id: 192, span: 8 },
      { id: 395, span: 6 },
      { id: 1060, span: 6 },
      { id: 674, span: 12 },
      { id: 686, span: 6 },
      { id: 365, span: 6 },
    ],
  },
  {
    slug: "terrane",
    title: "Terrane",
    number: 2,
    tagline: "A living instrument for reading the land.",
    tags: "Brand identity / Data design / Digital",
    year: "©25 . 26",
    description:
      "An urban-planning studio that models how a territory breathes: water, heat, movement, soil. Their work is scientific and their clients are political. The brand had to make a hundred layers of data feel like one calm instrument you would trust with a city.",
    concept:
      "We treated the identity as a reading device. A grid that behaves like a survey; a palette borrowed from aerial photography at dawn; type that stays quiet so the data can speak. Every map, deck and report is a view through the same lens, so a mayor and an engineer see the same territory.",
    credits: "Strategy and data design by Nowhere",
    cover: 915,
    gallery: [
      { id: 915, span: 12 },
      { id: 1043, span: 6 },
      { id: 1053, span: 6 },
      { id: 1015, span: 12 },
      { id: 1018, span: 4 },
      { id: 1050, span: 8 },
      { id: 1052, span: 6 },
      { id: 1011, span: 6 },
      { id: 684, span: 12 },
    ],
  },
  {
    slug: "unseen",
    title: "Un_Seen",
    number: 3,
    tagline: "Catch the unexpected: the invisible, made visible.",
    tags: "Art direction / Campaign / Motion",
    year: "©24 . 25",
    description:
      "A crisis-management firm. Discreet by nature, invisible by trade, and tired of looking like a law firm. The brief was a contradiction: be seen by the right people while staying unseen by everyone else.",
    concept:
      "We made invisibility the subject. Images that only resolve when you look twice, a wordmark cut by a single underscore, a campaign shot in the hour when the city is between two lights. The brand appears the way the firm works: late, quiet, exactly when it is needed.",
    credits: "Art direction and campaign by Nowhere",
    cover: 1069,
    gallery: [
      { id: 1069, span: 12 },
      { id: 310, span: 6 },
      { id: 541, span: 6 },
      { id: 1025, span: 12 },
      { id: 537, span: 4 },
      { id: 1083, span: 8 },
      { id: 137, span: 6 },
      { id: 967, span: 6 },
    ],
  },
  {
    slug: "millgrade",
    title: "Millgrade",
    number: 4,
    tagline: "Measured clarity for precision engineering.",
    tags: "Brand identity / Website / Trade show",
    year: "©25 . 26",
    description:
      "A precision-engineering group with forty years of patents and a brand that looked like a PDF. Identity and website were due at the same time, for the same date: a launch at the industry's largest trade show.",
    concept:
      "One decision carried everything: say less, measure more. A modular system built on the group's own tolerances, a typeface chosen for how it reads on a machined panel, and a site that behaves like one of their instruments. Both were delivered in under six months, in time for the show.",
    credits: "Identity and website by Nowhere",
    cover: 1076,
    gallery: [
      { id: 1076, span: 12 },
      { id: 972, span: 6 },
      { id: 1081, span: 6 },
      { id: 134, span: 12 },
      { id: 358, span: 8 },
      { id: 953, span: 4 },
      { id: 1033, span: 6 },
      { id: 364, span: 6 },
      { id: 36, span: 12 },
      { id: 26, span: 6 },
      { id: 491, span: 6 },
    ],
  },
  {
    slug: "touchgrain",
    title: "Touchgrain",
    number: 5,
    tagline: "A brand for the forgotten sense.",
    tags: "Naming / Identity / Product",
    year: "©24 . 25",
    description:
      "A haptic-technology start-up making interfaces you can feel. Every competitor shows a hand touching a screen. Nobody shows what the hand feels. The brand had to give touch a visual language without a single picture of a finger.",
    concept:
      "We designed vibration. A wordmark that ripples, a system of textures mapped to the product's actual haptic patterns, packaging you read with your palm first. The name stays short because touch is immediate. Everything else slows down to let you feel it.",
    credits: "Naming, identity and product by Nowhere",
    cover: 1079,
    gallery: [
      { id: 1079, span: 12 },
      { id: 442, span: 6 },
      { id: 785, span: 6 },
      { id: 1082, span: 12 },
      { id: 660, span: 4 },
      { id: 454, span: 8 },
      { id: 357, span: 6 },
      { id: 175, span: 6 },
      { id: 486, span: 12 },
    ],
  },
  {
    slug: "moveform",
    title: "Moveform",
    number: 6,
    tagline: "Movement, made conscious.",
    tags: "Identity / Campaign / Space",
    year: "©25 . 26",
    description:
      "A wellness brand built on movement rather than stillness: classes, a studio on a quiet side street, a line of objects. The category speaks in whispers and beige. The founders wanted the opposite of a spa.",
    concept:
      "A brand that moves when you do. Type set in motion, a campaign photographed mid-gesture, a space where the signage changes with the light. The system is built from one rule: nothing is ever perfectly still, and nothing is ever loud.",
    credits: "Identity, campaign and space by Nowhere",
    cover: 328,
    gallery: [
      { id: 328, span: 12 },
      { id: 452, span: 6 },
      { id: 390, span: 6 },
      { id: 1035, span: 12 },
      { id: 579, span: 8 },
      { id: 1047, span: 4 },
      { id: 320, span: 6 },
      { id: 826, span: 6 },
    ],
  },
  {
    slug: "chimere",
    title: "Chimère",
    number: 7,
    tagline: "From hazard to horizon: chemistry, reframed.",
    tags: "Campaign / Website / Editorial",
    year: "©25 . 26",
    description:
      "A national federation for the chemical industry, with an image problem older than most of its members. The task was not to make chemistry pretty. It was to make the public look at it again, without looking away.",
    concept:
      "We reframed the subject from danger to transformation. A campaign built on before-and-after pairs, an editorial site that explains one molecule a week, and a visual system that borrows from the lab rather than hiding it. Clear, honest and, for once, curious.",
    credits: "Campaign, website and editorial by Nowhere",
    cover: 1073,
    gallery: [
      { id: 1073, span: 12 },
      { id: 1080, span: 6 },
      { id: 798, span: 6 },
      { id: 152, span: 12 },
      { id: 82, span: 4 },
      { id: 977, span: 8 },
      { id: 803, span: 6 },
      { id: 1069, span: 6 },
    ],
  },
];

export const featuredWorks = works.slice(0, 5);

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function nextWork(current: Work) {
  const sorted = [...works].sort((a, b) => a.number - b.number);
  return sorted.find((w) => w.number > current.number) ?? sorted[0];
}

export function coverUrl(work: Work, w = 1400, h = 1000) {
  return pic(work.cover, w, h);
}
