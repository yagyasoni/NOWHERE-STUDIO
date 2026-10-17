/**
 * Every line of copy on the site lives here so the whole prototype can be
 * re-worded from one file. The studio, its people, its clients and its
 * awards are invented: nothing here refers to a real person, place, company
 * or price. Built as a portfolio prototype by Yagya Soni.
 */
export const brand = {
  name: "Nowhere",
  /** Letters of the wordmark, animated one by one. */
  letters: ["N", "O", "W", "H", "E", "R", "E"],
  mark: ".",
  tagline: "Independent creative studio",
  /** `.example` is reserved for documentation, so this never reaches a real inbox. */
  email: "hello@nowhere.example",
  year: "©2026",
  /** Footer line shown on every breakpoint. */
  footerLine: "A fictional studio, built as a portfolio prototype",
  description:
    "Nowhere is an independent creative studio. Brand identity, websites and digital experiences, campaigns, content and events for fashion, luxury and technology brands that refuse the generic.",
};

/** Where the "book a call" buttons go. */
export const contactUrl = `mailto:${brand.email}?subject=Let%27s%20start%20from%20nowhere`;
export const emailUrl = `mailto:${brand.email}`;

export const nav = [
  { label: "works", href: "/works" },
  { label: "studio", href: "/studio" },
  { label: "awards", href: "/awards" },
  { label: "method", href: "/method" },
  { label: "contact", href: contactUrl, external: true },
];

/** Shown as plain labels only: the prototype links to no real account. */
export const socials = [
  { label: "Linkedin", short: "LKDN" },
  { label: "Instagram", short: "insta" },
  { label: "Behance", short: "behance" },
];

/**
 * Credit in the footer corner and in the page metadata. Rendered as
 * "( built from nowhere by Yagya Soni )", echoing the footer headline.
 */
export const siteCredit = {
  siteBy: [{ name: "Yagya Soni" }],
  siteByPrefix: "built from nowhere by",
  visualsBy: [{ name: "Lorem Picsum & Mixkit", href: "https://picsum.photos" }],
};

export const home = {
  heroLead: ["Not a style, a perspective.", "Because Nowhere is Everywhere."],
  heroCta: "book a call",
  showreelTitle: ["Most brands produce noise.", "We prefer ideas."],
  showreelLabel: "( The side step )",
  showreelText:
    "When every brand can make a thousand images, the rare thing is a point of view. Images carry ideas, experiences shift perception, and brands end up changing how people see the world.",
  worksTitle: ["Good brands speak clearly.", "Great brands surprise."],
  worksCount: "07",
  worksYears: "© 24 . 26",
  studioLabel: "( The Studio )",
  studioText:
    "We called it Nowhere because it started as a paradox: an empty place, open enough to become anywhere. A campaign, a space, an event, a system...",
  studioTail: ["or something", "unexpected."],
  formsTitle: ["Forms follow", "perspective."],
  designLabel: "We design :",
  designList: [
    "Brand identities",
    "Campaigns",
    "Digital experiences",
    "Events",
    "Visual systems",
  ],
  designTail: ["Perspective is where strategy", "meets visual culture."],
  peopleLabel: "Nowhere without people :",
  /** Roles stand in for names: the team is a placeholder, not real people. */
  team: [
    {
      title: "founders & management",
      people: ["Founder 01, Strategy", "Founder 02, Creative", "Studio Director", "Production Lead"],
    },
    {
      title: "creative partners",
      people: ["Art Direction", "Motion & Film", "Creative Development"],
    },
  ],
  glitchLine: "we are nowhere",
  glitchFinal: [
    "We build brand",
    "experiences for",
    "people who are",
    "done with the",
    "ordinary.",
  ],
  footerTitle: ["Let’s start", "from nowhere"],
};

export type FaqItem = { q: string; a: string; href: string };

const faq = {
  luxurySite: {
    q: "What makes a luxury website work?",
    a: "A luxury website works when every interaction is decided, not decorated. Fewer elements, each one deliberate. The site is not a catalogue; it is the brand's point of view, held in motion. Identity and site should be designed as one piece of work, not two disciplines.",
    href: "#",
  },
  identityTime: {
    q: "How long does a brand identity take?",
    a: "A brand identity takes eight to twelve weeks. Identity and website together: under six months. What sets the pace is how fast decisions are made, not how fast files are produced. For Millgrade, both were delivered in time for a launch at a major trade show.",
    href: "#",
  },
  studioOrAgency: {
    q: "Branding studio or advertising agency?",
    a: "An advertising agency sells campaigns. A branding studio decides what the brand is, then every form follows: name, identity, site, campaign, space. If your problem is that the brand cannot be explained in three sentences, you need the decision first. The campaign comes after.",
    href: "#",
  },
  identityCost: {
    q: "How much does a brand identity cost?",
    a: "At Nowhere, a logotype and a complete brand identity are each quoted as a fixed fee. The price depends on scope: how many forms the identity has to hold, how many markets, how many rounds. No day rates. You know what is included before the work starts.",
    href: "#",
  },
  influencers: {
    q: "Do sponsored influencer posts still work?",
    a: "The dedicated sponsored post is dying. What works is a brand that lives inside content that would stand without it, made by creators who keep their own voice. Partnerships stay declared, always. It is the dedication that stops working, not the transparency.",
    href: "#",
  },
  event: {
    q: "How to design a brand event?",
    a: "Start from what the brand must make people feel in the room, then design everything from it: the concept, the space, the invitation, the content that lives after the night. At Nowhere, the creative concept and design of an event are priced as one fixed fee.",
    href: "#",
  },
  social: {
    q: "Who should create a luxury brand's social content?",
    a: "Someone who holds the brand's point of view, not just its calendar. Social content fails when every post is designed alone. It works when one perspective produces a hundred posts that still look like the same brand. At Nowhere, content and strategy come as a fixed monthly fee.",
    href: "#",
  },
  ai: {
    q: "Can AI be used in luxury branding?",
    a: "Yes, for production. Never for the decision. AI can produce two hundred variations. It cannot choose between two shades of white. At Nowhere, creative direction is human and production runs on the studio's own AI infrastructure, so the time goes to the choices that make the brand.",
    href: "#",
  },
  paid: {
    q: "Do paid social ads work for luxury brands?",
    a: "Yes, when the creative carries the brand. The algorithm decides who sees the ad; what you still control is the creative. Luxury brands lose money on paid social when they buy reach with generic visuals, and win when every ad looks like it could only be theirs.",
    href: "#",
  },
  siteCost: {
    q: "How much does a luxury website cost?",
    a: "At Nowhere, a website or digital experience is quoted as a fixed fee, never by the day. The price depends on how many pages, how much motion and interaction, how many languages, and whether the identity is designed at the same time.",
    href: "#",
  },
  meAndAi: {
    q: "Me & AI: can it really work?",
    a: "Yes, if the brand leads and the AI follows. While leadership hesitates, AI tools already introduce your company to clients, candidates and journalists, with or without you. At Nowhere, brand voice calibration is a short, fixed-fee engagement.",
    href: "#",
  },
  campaignCost: {
    q: "How much does an advertising campaign cost?",
    a: "At Nowhere, a campaign is quoted as a fixed fee for the creative idea and its key formats. Production and media are budgeted separately. One idea, strong enough to survive every format, costs less than five weak ones.",
    href: "#",
  },
  brief: {
    q: "How to brief a branding studio?",
    a: "Write what you can, then say the rest. The written brief is one document. The real brief is usually said out loud, after the meeting. A good studio listens to both, reads your category, and comes back with one direction, not a menu.",
    href: "#",
  },
} satisfies Record<string, FaqItem>;

export const faqSets = {
  home: [faq.luxurySite, faq.identityTime, faq.studioOrAgency, faq.identityCost],
  works: [faq.luxurySite, faq.siteCost, faq.identityCost],
  studio: [faq.influencers, faq.event, faq.social, faq.ai, faq.studioOrAgency],
  awards: [faq.paid, faq.siteCost, faq.luxurySite],
  method: [
    faq.meAndAi,
    faq.campaignCost,
    faq.siteCost,
    faq.brief,
    faq.identityTime,
    faq.identityCost,
  ],
};

export const studio = {
  heroTitle: ["Nowhere is a creative", "studio from nowhere."],
  heroCta: "let's chat",
  whoLabel: "( who, what, where )",
  who: "Nowhere is an independent creative studio with no fixed address, which is rather the point. We design brand identities, campaigns, digital experiences, events and visual systems. We work with founders and brand directors in fashion, luxury and technology, in English and in French, from one studio and for clients anywhere.",
  claim: ["Not a style, a perspective.", "Because Nowhere is Everywhere."],
  whatLabel: "( What we do )",
  services: [
    {
      n: "01",
      title: "Brand identities",
      text: "A point of view first, then the name, the signs, the system that carries it everywhere.",
      pic: 1076,
    },
    {
      n: "02",
      title: "Campaigns",
      text: "One idea, strong enough to survive every format.",
      pic: 328,
    },
    {
      n: "03",
      title: "Digital experiences",
      text: "Sites and interfaces where every interaction is decided, never decorated.",
      pic: 1033,
    },
    {
      n: "04",
      title: "Visual systems",
      text: "The rules that let a brand produce for years without diluting.",
      pic: 1073,
    },
    {
      n: "05",
      title: "Events and spaces",
      text: "The brand in three dimensions, from the general concept to the room.",
      pic: 953,
    },
  ],
  howLabel: "( How we work )",
  how: ["Creative direction is human. Production runs on the studio's", "own AI infrastructure."],
  howCta: "our method",
  howNotes: [
    ["AI can produce the two hundred", "variations, not the decision."],
    ["The method has three steps:", "read, decide, hold."],
  ],
  clientsLabel: "( Who we work with )",
  clientsText:
    "Industry, engineering, wellness, specialty coffee, urban planning, crisis management, haptic technology.",
  /** Invented client names, matching the case studies in works.ts. */
  clients: ["Millgrade", "Moveform", "Hearthline", "Touchgrain", "Terrane", "Un_Seen", "Longtemps", "Chimère"],
  allWorksCta: "view All works",
  awardsLabel: "( Awards and recognition )",
  awards: [
    { title: "Fold Archive, landing page honor", count: "x2" },
    { title: "Gridfolio Site of the Day", count: "x1" },
    { title: "Pixelwave Site of the Week", count: "x1" },
    { title: "Typeset Review Webpicks", count: "x1" },
    { title: "Portfolio Honors, curated gallery (Winner)", count: "x1" },
    { title: "Studio Index site of the day", count: "x1" },
    { title: "Nominee site of the month", count: "x1" },
  ],
  awardsCta: "all press and recognition",
  quoteLabel: "( What clients say )",
  quote:
    "“Originality and relevance of the creative proposal. Identity and website delivered in under six months, in time for our launch at a major trade show.”",
  quoteBy: "Marketing director - Millgrade/",
  teamLabel: "( The Team )",
  /** Roles stand in for names: the team is a placeholder, not real people. */
  team: [
    { title: "Founder", lines: ["Founder 01", "Strategy Director"] },
    { title: "Founder", lines: ["Founder 02", "Creative Director"] },
    { title: "management", lines: ["Studio Director", "Production Lead", "Client Lead"] },
    {
      title: "the creatives",
      lines: ["Creative Development", "Art Direction"],
    },
  ],
};

export const awards = {
  title: "Press",
  subtitle: "& awards",
  label: "©25 . 26",
  intro:
    "Nowhere is an independent creative studio. This page lists the awards, selections, articles and client reviews that mention the studio, with a date and a source for each.",
  groups: [
    {
      label: "( Awards )",
      items: [
        { title: "Pixelwave Site of the Week", count: "x1", href: "#" },
        { title: "Gridfolio Site of the Day", count: "x1", href: "#" },
        { title: "Typeset Review Webpicks", count: "x1", href: "#" },
        { title: "Portfolio Honors, curated gallery (Winner)", count: "x1", href: "#" },
        { title: "Studio Index Website of the Day", count: "x1", href: "#" },
        { title: "Nominee Site of the month", count: "x1" },
      ],
    },
    {
      label: "( Selections )",
      items: [
        { title: "Fold Archive, landing page honor", count: "x1", href: "#" },
        { title: "Landing page design feature", count: "x1", href: "#" },
        { title: "Curated selection, design gallery", count: "x1", href: "#" },
        { title: "Website design inspiration feature", count: "x1", href: "#" },
        { title: "Best Website Designs, design directory", count: "x1", href: "#" },
        { title: "Footer selection, footer gallery", count: "x1", href: "#" },
      ],
    },
    {
      label: "( In the press )",
      items: [
        { title: "Weekly Designers Update", count: "x1", href: "#" },
        { title: "Top 10 Branding Agencies, city guide", count: "x1", href: "#" },
        { title: "10 Best Luxury Branding Agencies, industry list", count: "x1", href: "#" },
      ],
    },
    {
      label: "( Directories )",
      items: [
        { title: "Creative agencies directory", href: "#" },
        { title: "Agency profile, agency directory 01", href: "#" },
        { title: "Agency profile, agency directory 02", href: "#" },
        { title: "Company profile, business directory 01", href: "#" },
        { title: "Company profile, business directory 02", href: "#" },
        { title: "Provider profile, review platform", href: "#" },
        { title: "Agency profile, web agencies index", href: "#" },
      ],
    },
  ],
};

export const method = {
  title: "Our",
  subtitle: "method",
  label: ["Three steps.", "Read, decide, hold."],
  intro:
    "We have taken apart about a hundred luxury identities that last. None of them has a style. All of them have a point of view. The style is what happens afterwards. So the method is not about forms. It is about the decision that comes before them.",
  steps: [
    {
      n: "01",
      title: "Read",
      claim: "The written brief is one document.",
      what: "The real brief is said out loud, near the lift, after the meeting. We listen to both. Then we read the category: what every competitor says, and therefore what nobody hears anymore. We read the culture the brand lives in, not the trend it is tempted by. We read what the brand already has and does not see. Most brands are sitting on their best asset.",
      receive: "One page. What the brand is, what it is against, what it can become.",
    },
    {
      n: "02",
      title: "Decide",
      claim: "One point of view. Not three.",
      what: "Agencies present three creative directions. One is real, two are alibis. We present the one we believe in, and we explain why. You can refuse it. You cannot choose between alibis. This is the step AI does not do. AI can produce the two hundred variations. It cannot choose between two shades of white. We can. The two shades were identical. The distinction was essential.",
      receive: "The perspective, written in a few sentences, and the first form that proves it.",
    },
    {
      n: "03",
      title: "Hold",
      claim: "Forms follow perspective.",
      what: "Once the point of view is decided, everything derives from it: the name, the identity, the campaign, the site, the space, the system. Every form is a consequence. Nothing is decorated. Holding also means later. A brand produces for years, with people who were not in the room. So we leave the rules, not just the files: what to do, what never to do, and why.",
      receive: "The identity, the system, the guidelines, and a brand that can keep producing without diluting.",
    },
  ],
  augmentedLabel: "( An augmented studio )",
  augmented:
    "Three humans hold the strategy, the creative direction and every final decision. Around them, AI agents we designed handle scheduling, sales follow-up, publishing and tooling. They prepare, we decide. Every word sent in Nowhere's name is read by a human first.",
  changesLabel: "( What this changes for you )",
  changes:
    "Fewer meetings, one direction, a brand you can explain in three sentences. And a point of view that does not date the way a style does.",
  changesBy: "Marketing director - Millgrade/",
  notLabel: "( What we do not do )",
  not: [
    "Moodboards as a substitute for a decision.",
    "Three directions when one is right.",
    "A new typeface sold as a new perception.",
    "Generic, in any of its forms.",
  ],
};
