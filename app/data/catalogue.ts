export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type AttractionCategory = "Thrill rides" | "Family rides" | "Children's rides" | "Indoor attractions";

export type AttractionDirectoryItem = {
  slug: string;
  parkSlug: string;
  name: string;
  type: string;
  tagline: string;
  status: "Operating" | "Seasonal" | "Closed";
  minimumHeight: string;
  area: string;
  categories: AttractionCategory[];
  heroImage: string;
  imageLabel: string;
  hasGuide: boolean;
};

export type Country = {
  slug: string;
  name: string;
  eyebrow: string;
  introduction: string;
  parkSlugs: string[];
  stats: Array<{ label: string; value: string }>;
  regions: string[];
  parkDirectory: CountryParkDirectoryItem[];
};

export type CountryParkCategory = "Thrill parks" | "Family parks" | "Destination resorts" | "Seaside parks";

export type CountryParkDirectoryItem = {
  slug: string;
  name: string;
  location: string;
  type: string;
  summary: string;
  image: string;
  categories: CountryParkCategory[];
  hasGuide: boolean;
};

export type Park = {
  slug: string;
  countrySlug: string;
  name: string;
  location: string;
  tagline: string;
  summary: string;
  status: "Open" | "Seasonal" | "Closed";
  opened: string;
  operator: string;
  attractionSlugs: string[];
  stats: Array<{ label: string; value: string }>;
  highlights: Array<{ title: string; description: string }>;
  overview: {
    paragraphs: string[];
    tags: string[];
    score: string;
    ratingSignals: Array<{ label: string; value: number }>;
  };
  visit: {
    tickets: { value: string; note: string; href: string };
    openingTimes: { value: string; note: string; href: string };
    weather: { value: string; note: string };
    queues: { value: string; note: string; href: string };
    map: { note: string; href: string };
  };
  timeline: TimelineEntry[];
};

export type Attraction = {
  slug: string;
  parkSlug: string;
  name: string;
  type: string;
  tagline: string;
  summary: string;
  status: "Operating" | "Seasonal" | "Closed";
  opened: string;
  manufacturer: string;
  minimumHeight: string;
  topSpeed: string;
  trackLength: string;
  thrillLevel: string;
  area: string;
  categories: AttractionCategory[];
  heroImage: string;
  imageLabel: string;
  stats: Array<{ label: string; value: string }>;
  overview: {
    paragraphs: string[];
    tags: string[];
    score: string;
    ratingSignals: Array<{ label: string; value: number }>;
    signatureTitle: string;
    signatureDescription: string;
  };
  experienceHeading: string;
  experienceSummary: string;
  experience: Array<{ title: string; description: string }>;
  galleryHeading: string;
  gallerySummary: string;
  galleryCaptions: string[];
  timeline: TimelineEntry[];
};

export const countries: Country[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    eyebrow: "Island thrills. Legendary stories.",
    introduction:
      "From historic seaside parks to story-led destination resorts, explore the places, attractions and moments that shaped the UK's theme park landscape.",
    parkSlugs: ["alton-towers"],
    stats: [
      { label: "Parks in this preview", value: "06" },
      { label: "Nations to explore", value: "04" },
      { label: "Published park guides", value: "01" },
      { label: "Coverage status", value: "Growing" },
    ],
    regions: ["England", "Scotland", "Wales", "Northern Ireland"],
    parkDirectory: [
      { slug: "alton-towers", name: "Alton Towers Resort", location: "Staffordshire, England", type: "Destination resort", summary: "Woodland, gardens and ambitious attractions across a historic estate.", image: "/images/parks/alton-towers/hero-generated.webp", categories: ["Thrill parks", "Family parks", "Destination resorts"], hasGuide: true },
      { slug: "thorpe-park", name: "Thorpe Park", location: "Surrey, England", type: "Thrill park", summary: "A compact island park shaped around large-scale roller coasters and high-energy days out.", image: "/images/experiences/nemesis-reborn-generated.webp", categories: ["Thrill parks"], hasGuide: false },
      { slug: "chessington-world-of-adventures", name: "Chessington World of Adventures", location: "Surrey, England", type: "Family resort", summary: "Family attractions, themed lands and animal encounters in one connected destination.", image: "/images/experiences/curse-at-alton-manor-generated.webp", categories: ["Family parks", "Destination resorts"], hasGuide: false },
      { slug: "blackpool-pleasure-beach", name: "Blackpool Pleasure Beach", location: "Lancashire, England", type: "Seaside park", summary: "Classic amusement-park character and modern thrills beside the Lancashire coast.", image: "/images/experiences/united-kingdom-hero.webp", categories: ["Thrill parks", "Family parks", "Seaside parks"], hasGuide: false },
      { slug: "legoland-windsor", name: "LEGOLAND Windsor", location: "Berkshire, England", type: "Family park", summary: "Colourful, imaginative rides and discovery experiences designed around younger families.", image: "/images/experiences/octonauts-generated.webp", categories: ["Family parks", "Destination resorts"], hasGuide: false },
      { slug: "drayton-manor", name: "Drayton Manor Resort", location: "Staffordshire, England", type: "Family resort", summary: "A broad family day out combining thrill rides, younger attractions and resort stays.", image: "/images/parks/alton-towers/terrain-coaster-generated.webp", categories: ["Thrill parks", "Family parks", "Destination resorts"], hasGuide: false },
    ],
  },
];

export const parks: Park[] = [
  {
    slug: "alton-towers",
    countrySlug: "united-kingdom",
    name: "Alton Towers Resort",
    location: "Staffordshire, England",
    tagline: "Extraordinary escapes in the heart of England.",
    summary:
      "A landscape-led resort where pioneering thrill rides, gardens and layered storytelling meet across one of Britain's most distinctive park settings.",
    status: "Seasonal",
    opened: "1980",
    operator: "Merlin Entertainments",
    attractionSlugs: ["wicker-man", "nemesis-reborn", "the-smiler", "oblivion"],
    stats: [
      { label: "Theme park era", value: "Since 1980" },
      { label: "Location", value: "Staffordshire" },
      { label: "Setting", value: "Historic estate" },
      { label: "Resort stays", value: "Available" },
      { label: "TPbuzz guide", value: "Preview" },
    ],
    highlights: [
      {
        title: "Landscape-led adventure",
        description: "Woodland, gardens and dramatic terrain make the journey between attractions part of the experience.",
      },
      {
        title: "A record of invention",
        description: "The resort is known for ambitious ride concepts designed around the opportunities and limits of its setting.",
      },
      {
        title: "More than a day park",
        description: "Hotels, waterpark experiences and seasonal events turn a visit into a wider resort stay.",
      },
    ],
    overview: {
      paragraphs: [
        "Alton Towers is shaped by its historic estate. Gardens, woodland paths and dramatic changes in terrain make moving through the resort part of the experience.",
        "Use this overview to check the essentials for your visit, then move straight into the rides and attractions below.",
      ],
      tags: ["Destination resort", "Major thrill rides", "Historic gardens"],
      score: "9.1",
      ratingSignals: [
        { label: "Thrills", value: 92 },
        { label: "Atmosphere", value: 91 },
        { label: "Families", value: 82 },
      ],
    },
    visit: {
      tickets: {
        value: "Book online",
        note: "Advance booking recommended",
        href: "https://www.altontowers.com/tickets-passes/",
      },
      openingTimes: {
        value: "From 10am",
        note: "Closing time varies · check today",
        href: "https://www.altontowers.com/plan-your-visit/before-you-visit/opening-times/",
      },
      weather: {
        value: "Live weather",
        note: "Forecast connection coming soon",
      },
      queues: {
        value: "View queue times",
        note: "Available through the official resort app",
        href: "https://www.altontowers.com/plan-your-visit/resort-information/mobile-app/",
      },
      map: {
        note: "Explore the theme park and wider resort",
        href: "https://www.altontowers.com/plan-your-visit/resort-information/attraction-maps/",
      },
    },
    timeline: [
      { year: "1860", title: "The gardens open", description: "The estate begins welcoming paying visitors to its celebrated grounds." },
      { year: "1980", title: "The Corkscrew era", description: "A new generation of major rides accelerates the park's transformation." },
      { year: "1994", title: "Nemesis arrives", description: "A landmark inverted coaster helps establish the park's modern identity." },
      { year: "2018", title: "Wicker Man awakens", description: "Wood, fire effects and folklore combine in a new headline attraction." },
    ],
  },
];

export const attractions: Attraction[] = [
  {
    slug: "wicker-man",
    parkSlug: "alton-towers",
    name: "Wicker Man",
    type: "Wooden roller coaster",
    tagline: "Feed the flames.",
    summary:
      "A modern wooden coaster wrapped in a ritualistic story, where twisting track races through a towering effigy brought to life with light, smoke and fire effects.",
    status: "Operating",
    opened: "2018",
    manufacturer: "Great Coasters International",
    minimumHeight: "1.2 m",
    topSpeed: "44 mph",
    trackLength: "Over 2,000 ft",
    thrillLevel: "High",
    area: "Mutiny Bay",
    categories: ["Thrill rides"],
    heroImage: "/images/experiences/wicker-man-hero.webp",
    imageLabel: "Generated concept image",
    stats: [
      { label: "Top speed", value: "44 mph" },
      { label: "Track length", value: "Over 2,000 ft" },
      { label: "Opened", value: "2018" },
      { label: "Minimum height", value: "1.2 m" },
      { label: "Thrill level", value: "High" },
    ],
    overview: {
      paragraphs: [
        "Wicker Man is built around more than track and timber. Its queue, preshow, soundtrack and central effigy turn a compact wooden coaster into one connected piece of theatre.",
        "Riders move from warnings carved into the landscape to the ceremony inside the preshow, before the train races repeatedly through the six-storey structure at the heart of the story.",
      ],
      tags: ["Best after dark", "High thrill", "Indoor preshow"],
      score: "8.8",
      ratingSignals: [{ label: "Thrill", value: 88 }, { label: "Theming", value: 94 }, { label: "Family", value: 72 }],
      signatureTitle: "Through the flames",
      signatureDescription: "The central structure is both icon and finale.",
    },
    experienceHeading: "A story in three acts.",
    experienceSummary: "From the first symbol in the queue to the final turn, every stage supports the same ritualistic world.",
    experience: [
      {
        title: "The invitation",
        description: "The queue draws guests into a world of symbols, warnings and the mysterious Beornen community.",
      },
      {
        title: "The ceremony",
        description: "A theatrical pre-show establishes the ritual before riders reach the wooden station and board.",
      },
      {
        title: "The run",
        description: "Fast transitions, low turns and repeated encounters with the effigy create a compact, energetic finale.",
      },
    ],
    galleryHeading: "Inside the ritual.",
    gallerySummary: "A temporary image study showing how galleries will feel once licensed and community photography is available.",
    galleryCaptions: ["The effigy", "Into the structure", "After dark"],
    timeline: [
      { year: "2016", title: "Project begins", description: "Early site activity starts the journey towards the park's new wooden coaster." },
      { year: "2017", title: "The structure rises", description: "Track, supports and the central effigy reshape the former flume site." },
      { year: "2018", title: "Wicker Man opens", description: "The attraction welcomes its first riders during the 2018 season." },
      { year: "Today", title: "The ritual continues", description: "Wicker Man remains a distinctive centrepiece of the park's coaster line-up." },
    ],
  },
  {
    slug: "nemesis-reborn",
    parkSlug: "alton-towers",
    name: "Nemesis Reborn",
    type: "Inverted roller coaster",
    tagline: "The legend has evolved.",
    summary: "An intense inverted coaster that dives through a quarry landscape, combining close terrain interaction, four inversions and a renewed creature-led story.",
    status: "Operating",
    opened: "2024 (original 1994)",
    manufacturer: "Bolliger & Mabillard",
    minimumHeight: "1.4 m",
    topSpeed: "81 km/h",
    trackLength: "716 m",
    thrillLevel: "Extreme",
    area: "Forbidden Valley",
    categories: ["Thrill rides"],
    heroImage: "/images/experiences/nemesis-reborn-generated.webp",
    imageLabel: "Generated concept image",
    stats: [
      { label: "Top speed", value: "81 km/h" },
      { label: "Track length", value: "716 m" },
      { label: "Reborn", value: "2024" },
      { label: "Minimum height", value: "1.4 m" },
      { label: "Inversions", value: "4" },
    ],
    overview: {
      paragraphs: [
        "Nemesis Reborn uses the quarry as part of the ride. Track crosses above and below the landscape, bringing rockwork, pathways and near misses unusually close to the train.",
        "The rebuilt coaster retains the shape and intensity associated with the original while surrounding it with a darker visual identity and a renewed Forbidden Valley story.",
      ],
      tags: ["Extreme thrill", "Four inversions", "Terrain coaster"],
      score: "9.3",
      ratingSignals: [{ label: "Thrill", value: 96 }, { label: "Setting", value: 95 }, { label: "Story", value: 86 }],
      signatureTitle: "Into the quarry",
      signatureDescription: "The landscape makes every inversion feel closer and faster.",
    },
    experienceHeading: "Unleashed in three movements.",
    experienceSummary: "Forbidden Valley builds the encounter before the track takes over with relentless, terrain-led pacing.",
    experience: [
      { title: "The warning", description: "The approach frames Nemesis as a creature that containment systems can no longer fully control." },
      { title: "The descent", description: "The lift releases riders directly into the quarry, where track and terrain immediately begin to overlap." },
      { title: "The pursuit", description: "Four inversions and low transitions maintain speed until the train finally returns to the station." },
    ],
    galleryHeading: "Inside Forbidden Valley.",
    gallerySummary: "Generated concept views establish the intended gallery rhythm while licensed attraction photography is sourced.",
    galleryCaptions: ["The creature", "Quarry flight", "Crimson valley"],
    timeline: [
      { year: "1994", title: "Nemesis opens", description: "The original coaster establishes a new landmark within Forbidden Valley." },
      { year: "2022", title: "Transformation begins", description: "The original track reaches the end of its operating chapter and major renewal work starts." },
      { year: "2024", title: "Nemesis Reborn", description: "New track, visual effects and a renewed story bring the attraction back into operation." },
      { year: "Today", title: "The legend continues", description: "Nemesis Reborn remains one of the resort's defining thrill experiences." },
    ],
  },
  {
    slug: "the-smiler",
    parkSlug: "alton-towers",
    name: "The Smiler",
    type: "Multi-inversion roller coaster",
    tagline: "Smile. Always.",
    summary: "A dense steel coaster built around a world-record fourteen inversions, threading two lift hills and relentless track through the industrial architecture of X-Sector.",
    status: "Operating",
    opened: "2013",
    manufacturer: "Gerstlauer",
    minimumHeight: "1.4 m",
    topSpeed: "85 km/h",
    trackLength: "1,170 m",
    thrillLevel: "Extreme",
    area: "X-Sector",
    categories: ["Thrill rides"],
    heroImage: "/images/experiences/the-smiler-generated.webp",
    imageLabel: "Generated concept image",
    stats: [
      { label: "Top speed", value: "85 km/h" },
      { label: "Track length", value: "1,170 m" },
      { label: "Opened", value: "2013" },
      { label: "Minimum height", value: "1.4 m" },
      { label: "Inversions", value: "14" },
    ],
    overview: {
      paragraphs: [
        "The Smiler is designed as visual overload. Track doubles back through the same compact space while optical devices, screens and stark industrial structures compete for attention.",
        "Its fourteen inversions are divided across two lift hills, creating a long, deliberately disorientating sequence rather than a single conventional coaster layout.",
      ],
      tags: ["Fourteen inversions", "Extreme thrill", "X-Sector"],
      score: "9.0",
      ratingSignals: [{ label: "Thrill", value: 95 }, { label: "Intensity", value: 97 }, { label: "Theming", value: 84 }],
      signatureTitle: "Tangled on purpose",
      signatureDescription: "Fourteen inversions turn the entire structure into one visual puzzle.",
    },
    experienceHeading: "Correction in three stages.",
    experienceSummary: "The queue, first lift and second half progressively intensify the same unsettling X-Sector idea.",
    experience: [
      { title: "The process", description: "The queue moves beneath an intimidating web of track, using sound and repeated symbols to build unease." },
      { title: "The first half", description: "A dark opening sequence gives way to rapid inversions before the vertical lift divides the layout." },
      { title: "The correction", description: "The second half accelerates through another dense sequence before the final inversion returns riders to the station." },
    ],
    galleryHeading: "The marmaliser at work.",
    gallerySummary: "Generated concept views preview how future photography will capture the ride's scale, geometry and atmosphere.",
    galleryCaptions: ["The track web", "Into X-Sector", "Fourteen loops"],
    timeline: [
      { year: "2012", title: "Construction begins", description: "A major new coaster starts taking shape alongside Oblivion in X-Sector." },
      { year: "2013", title: "The Smiler opens", description: "The finished attraction introduces a record-setting fourteen-inversion layout." },
      { year: "Today", title: "The record remains", description: "The Smiler continues to be defined by its unique inversion count and compact visual complexity." },
    ],
  },
  {
    slug: "oblivion",
    parkSlug: "alton-towers",
    name: "Oblivion",
    type: "Dive roller coaster",
    tagline: "Don't look down.",
    summary: "The original dive coaster turns one moment of suspense into its entire identity: a pause at the edge followed by a near-vertical plunge into darkness.",
    status: "Operating",
    opened: "1998",
    manufacturer: "Bolliger & Mabillard",
    minimumHeight: "1.4 m",
    topSpeed: "110 km/h",
    trackLength: "373 m",
    thrillLevel: "Extreme",
    area: "X-Sector",
    categories: ["Thrill rides"],
    heroImage: "/images/experiences/oblivion-generated.webp",
    imageLabel: "Generated concept image",
    stats: [
      { label: "Top speed", value: "110 km/h" },
      { label: "Track length", value: "373 m" },
      { label: "Opened", value: "1998" },
      { label: "Minimum height", value: "1.4 m" },
      { label: "Drop", value: "180 ft" },
    ],
    overview: {
      paragraphs: [
        "Oblivion strips the coaster experience back to anticipation and release. Wide shuttles climb into view before turning toward a drop that appears to vanish beneath the ground.",
        "The layout is short, but the architecture, soundtrack and deliberate pause at the edge give the descent a scale far larger than its track length suggests.",
      ],
      tags: ["World first", "Vertical drop", "X-Sector"],
      score: "8.6",
      ratingSignals: [{ label: "Drop", value: 97 }, { label: "Suspense", value: 95 }, { label: "Length", value: 62 }],
      signatureTitle: "The edge of the unknown",
      signatureDescription: "A brief pause makes the plunge feel impossibly long.",
    },
    experienceHeading: "Fear, reduced to three moments.",
    experienceSummary: "Everything in X-Sector points toward the same hole in the ground and the decision to face it.",
    experience: [
      { title: "The question", description: "The queue and preshow repeatedly focus attention on the drop, keeping the track's destination deliberately hidden." },
      { title: "The hold", description: "The shuttle reaches the edge and suspends riders above the opening for one carefully controlled moment." },
      { title: "The plunge", description: "The train accelerates into the tunnel before emerging into a sweeping turn and the final brakes." },
    ],
    galleryHeading: "At the edge.",
    gallerySummary: "Generated concept imagery establishes the stark, monumental treatment planned for the finished gallery.",
    galleryCaptions: ["The hold", "Into darkness", "X-Sector"],
    timeline: [
      { year: "1997", title: "The site transforms", description: "Construction reshapes part of Fantasy World into the severe new environment of X-Sector." },
      { year: "1998", title: "Oblivion opens", description: "The world's first dive coaster introduces its signature vertical-drop experience." },
      { year: "Today", title: "The drop endures", description: "Oblivion remains one of the park's clearest and most recognisable ride concepts." },
    ],
  },
];

export const attractionPreviews: AttractionDirectoryItem[] = [
  {
    slug: "th13teen",
    parkSlug: "alton-towers",
    name: "TH13TEEN",
    type: "Family drop coaster",
    tagline: "The forest has found you.",
    status: "Operating",
    minimumHeight: "1.2 m",
    area: "Dark Forest",
    categories: ["Thrill rides", "Family rides"],
    heroImage: "/images/experiences/th13teen-generated.webp",
    imageLabel: "Generated concept image",
    hasGuide: false,
  },
  {
    slug: "the-curse-at-alton-manor",
    parkSlug: "alton-towers",
    name: "The Curse at Alton Manor",
    type: "Haunted dark ride",
    tagline: "She just wants to play.",
    status: "Operating",
    minimumHeight: "0.9 m",
    area: "Gloomy Wood",
    categories: ["Family rides", "Indoor attractions"],
    heroImage: "/images/experiences/curse-at-alton-manor-generated.webp",
    imageLabel: "Generated concept image",
    hasGuide: false,
  },
  {
    slug: "runaway-mine-train",
    parkSlug: "alton-towers",
    name: "Runaway Mine Train",
    type: "Powered family coaster",
    tagline: "Choo choo!",
    status: "Operating",
    minimumHeight: "1.1 m",
    area: "Katanga Canyon",
    categories: ["Family rides"],
    heroImage: "/images/experiences/runaway-mine-train-generated.webp",
    imageLabel: "Generated concept image",
    hasGuide: false,
  },
  {
    slug: "octonauts-rollercoaster-adventure",
    parkSlug: "alton-towers",
    name: "Octonauts Rollercoaster Adventure",
    type: "Junior roller coaster",
    tagline: "A first coaster adventure.",
    status: "Operating",
    minimumHeight: "0.9 m",
    area: "CBeebies Land",
    categories: ["Children's rides", "Family rides"],
    heroImage: "/images/experiences/octonauts-generated.webp",
    imageLabel: "Generated concept image",
    hasGuide: false,
  },
];

export function getCountry(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getPark(slug: string) {
  return parks.find((park) => park.slug === slug);
}

export function getAttraction(slug: string) {
  return attractions.find((attraction) => attraction.slug === slug);
}

export function getParkAttractionDirectory(parkSlug: string): AttractionDirectoryItem[] {
  const publishedGuides = attractions
    .filter((attraction) => attraction.parkSlug === parkSlug)
    .map((attraction) => ({
      slug: attraction.slug,
      parkSlug: attraction.parkSlug,
      name: attraction.name,
      type: attraction.type,
      tagline: attraction.tagline,
      status: attraction.status,
      minimumHeight: attraction.minimumHeight,
      area: attraction.area,
      categories: attraction.categories,
      heroImage: attraction.heroImage,
      imageLabel: attraction.imageLabel,
      hasGuide: true,
    }));

  return [...publishedGuides, ...attractionPreviews.filter((attraction) => attraction.parkSlug === parkSlug)];
}
