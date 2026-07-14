export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type Country = {
  slug: string;
  name: string;
  eyebrow: string;
  introduction: string;
  parkSlugs: string[];
  stats: Array<{ label: string; value: string }>;
  regions: string[];
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
  stats: Array<{ label: string; value: string }>;
  experience: Array<{ title: string; description: string }>;
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
      { label: "Parks in this preview", value: "01" },
      { label: "Featured attractions", value: "01" },
      { label: "Featured park origins", value: "1860" },
      { label: "Coverage status", value: "Growing" },
    ],
    regions: ["England", "Scotland", "Wales", "Northern Ireland"],
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
    attractionSlugs: ["wicker-man"],
    stats: [
      { label: "Grounds first opened", value: "1860" },
      { label: "Location", value: "Staffordshire" },
      { label: "Setting", value: "Historic estate" },
      { label: "TPbuzz coverage", value: "Preview" },
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
    stats: [
      { label: "Ride type", value: "Wooden coaster" },
      { label: "Opened", value: "2018" },
      { label: "Minimum height", value: "1.2 m" },
      { label: "Manufacturer", value: "GCI" },
    ],
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
    timeline: [
      { year: "2016", title: "Project begins", description: "Early site activity starts the journey towards the park's new wooden coaster." },
      { year: "2017", title: "The structure rises", description: "Track, supports and the central effigy reshape the former flume site." },
      { year: "2018", title: "Wicker Man opens", description: "The attraction welcomes its first riders during the 2018 season." },
      { year: "Today", title: "The ritual continues", description: "Wicker Man remains a distinctive centrepiece of the park's coaster line-up." },
    ],
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
