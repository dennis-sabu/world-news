import type { SectionFetchRequest } from "./newsApi";

export type SectionSlug =
  | "news"
  | "sport"
  | "business"
  | "technology"
  | "health"
  | "science"
  | "culture"
  | "opinion"
  | "all"
  | "kerala"
  | "india"
  | "entertainment"
  | "subscriber-only";

export type SectionDefinition = {
  slug: SectionSlug;
  title: string;
  description: string;
  fetch?: SectionFetchRequest;
};

const DEFINITIONS: Record<SectionSlug, SectionDefinition> = {
  news: {
    slug: "news",
    title: "Top News",
    description: "Breaking stories and essential updates from India and the world.",
    fetch: { type: "category", category: "general", label: "News", pageSize: 24 },
  },
  sport: {
    slug: "sport",
    title: "Sport",
    description: "Scores, analysis, and behind-the-scenes reporting across every discipline.",
    fetch: { type: "category", category: "sports", label: "Sport", pageSize: 24 },
  },
  business: {
    slug: "business",
    title: "Business",
    description: "Markets, companies, and policy decisions shaping the economy.",
    fetch: { type: "category", category: "business", label: "Business", pageSize: 24 },
  },
  technology: {
    slug: "technology",
    title: "Technology",
    description: "Innovation, startups, and the digital forces redefining daily life.",
    fetch: { type: "category", category: "technology", label: "Technology", pageSize: 24 },
  },
  health: {
    slug: "health",
    title: "Health",
    description: "Medical research, wellness trends, and public health updates.",
    fetch: { type: "category", category: "health", label: "Health", pageSize: 24 },
  },
  science: {
    slug: "science",
    title: "Science",
    description: "Discoveries from space, earth, and cutting-edge laboratories.",
    fetch: { type: "category", category: "science", label: "Science", pageSize: 24 },
  },
  culture: {
    slug: "culture",
    title: "Culture",
    description: "Cinema, literature, and the arts capturing the cultural moment.",
    fetch: { type: "category", category: "entertainment", label: "Culture", pageSize: 24 },
  },
  opinion: {
    slug: "opinion",
    title: "Opinion",
    description: "Informed commentary and analysis from Kerala, India, and beyond.",
    fetch: {
      type: "query",
      query: "analysis OR opinion Kerala OR India politics",
      label: "Opinion",
      pageSize: 30,
      sortBy: "publishedAt",
    },
  },
  all: {
    slug: "all",
    title: "All Headlines",
    description: "A sweeping digest of the day's most important headlines.",
    fetch: { type: "category", category: "general", label: "Headlines", pageSize: 36 },
  },
  kerala: {
    slug: "kerala",
    title: "Kerala",
    description: "Local developments, politics, and culture from across Kerala.",
    fetch: {
      type: "query",
      query: "Kerala",
      label: "Kerala",
      pageSize: 30,
      sortBy: "publishedAt",
    },
  },
  india: {
    slug: "india",
    title: "India",
    description: "National news, policy, and perspectives from across the country.",
    fetch: {
      type: "country",
      country: "in",
      label: "India",
      pageSize: 36,
    },
  },
  entertainment: {
    slug: "entertainment",
    title: "Entertainment",
    description: "Film, television, music, and celebrity stories making headlines.",
    fetch: { type: "category", category: "entertainment", label: "Entertainment", pageSize: 24 },
  },
  "subscriber-only": {
    slug: "subscriber-only",
    title: "Subscriber Exclusives",
    description: "Premium investigations and deeply reported stories reserved for members.",
  },
};

export function getSectionDefinition(slug: string): SectionDefinition | undefined {
  return DEFINITIONS[slug as SectionSlug];
}

export function getSectionHref(slug: SectionSlug): string {
  return `/${slug}`;
}

export type NavLinkConfig = {
  label: string;
  slug: SectionSlug;
};

const PRIMARY_NAV: NavLinkConfig[] = [
  { label: "News", slug: "news" },
  { label: "Kerala", slug: "kerala" },
  { label: "India", slug: "india" },
  { label: "Business", slug: "business" },
  { label: "Sport", slug: "sport" },
  { label: "Technology", slug: "technology" },
  { label: "Health", slug: "health" },
  { label: "Science", slug: "science" },
  { label: "Culture", slug: "culture" },
  { label: "Entertainment", slug: "entertainment" },
  { label: "Subscriber Only", slug: "subscriber-only" },
];

export type NavItem = {
  label: string;
  href: string;
  slug: SectionSlug;
  active: boolean;
};

function buildNav(config: NavLinkConfig[], activeSlug?: SectionSlug): NavItem[] {
  return config.map(({ label, slug }) => ({
    label,
    slug,
    href: getSectionHref(slug),
    active: Boolean(activeSlug && slug === activeSlug),
  }));
}

export function buildPrimaryNav(activeSlug?: SectionSlug): NavItem[] {
  return buildNav(PRIMARY_NAV, activeSlug);
}

export function listAllSections(): SectionDefinition[] {
  return Object.values(DEFINITIONS);
}
