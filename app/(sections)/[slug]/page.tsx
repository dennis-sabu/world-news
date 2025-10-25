import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SecondaryFeatureGrid } from "@/components/SecondaryFeatureGrid";
import { SectionRow, SectionRowProps } from "@/components/SectionRow";
import { SubscribersRail } from "@/components/SubscribersRail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import {
  buildPrimaryNav,
  getSectionDefinition,
  listAllSections,
  type SectionSlug,
} from "@/lib/sections";
import { getSectionArticles, NormalizedArticle } from "@/lib/newsApi";

const todayFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const PRIMARY_SLUGS: SectionSlug[] = [
  "news",
  "sport",
  "business",
  "technology",
  "health",
  "science",
  "culture",
  "opinion",
];

function buildSectionRowProps(title: string, articles: NormalizedArticle[]): SectionRowProps | null {
  if (articles.length < 8) {
    return null;
  }

  const [primary, secondary, ...rest] = articles;

  return {
    title,
    primary: {
      category: primary.sourceName,
      title: primary.title,
      date: primary.publishedAt,
      readTime: primary.readTime,
      href: primary.url,
      imageUrl: primary.imageUrl,
      summary: primary.summary,
      imageLabel: primary.categoryLabel,
    },
    secondary: {
      category: secondary.sourceName,
      title: secondary.title,
      summary: secondary.summary,
      date: secondary.publishedAt,
      readTime: secondary.readTime,
      href: secondary.url,
      imageUrl: secondary.imageUrl,
    },
    list: rest.slice(0, 3).map((item) => ({
      title: item.title,
      href: item.url,
      sourceName: item.sourceName,
      date: item.publishedAt,
    })),
  };
}

export function generateStaticParams() {
  return listAllSections().map((section) => ({ slug: section.slug }));
}

export default async function SectionPage({ params }: { params: { slug: string } }) {
  const definition = getSectionDefinition(params.slug);

  if (!definition) {
    notFound();
  }

  const section = definition;

  const activePrimarySlug = PRIMARY_SLUGS.includes(section.slug) ? section.slug : "news";
  const publicationDate = todayFormatter.format(new Date());
  const primaryNav = buildPrimaryNav(activePrimarySlug);

  if (!section.fetch) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />
        <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            {section.title}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            Coming soon
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            We are busy curating a premium library of investigative reports and deep-dive features for our subscribers. Check back soon or follow your favourite sections for the latest updates in the meantime.
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const articles = await getSectionArticles(section.fetch);
  const [heroArticle, ...rest] = articles;
  const featureGrid = rest.slice(0, 6);
  const remainingArticles = rest.slice(6);

  // Build section rows from remaining articles
  const sectionRows: SectionRowProps[] = [];
  const subscriberStories = remainingArticles.slice(0, 3);
  
  // Create section rows in chunks of 8 articles each
  for (let i = 3; i < remainingArticles.length; i += 8) {
    const chunk = remainingArticles.slice(i, i + 8);
    const rowProps = buildSectionRowProps(`More from ${section.title}`, chunk);
    if (rowProps) {
      sectionRows.push(rowProps);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10 space-y-4 border-b border-neutral-200 pb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            {section.title}
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            {section.title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {section.description}
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <HeroSection article={heroArticle ?? null} />
          <SubscribersRail stories={subscriberStories} />
        </div>

        <SecondaryFeatureGrid features={featureGrid} />

        <div className="mt-16 space-y-16">
          {sectionRows.map((row, index) => (
            <SectionRow key={`${section.slug}-row-${index}`} {...row} />
          ))}
        </div>

        {/* Back to Homepage Button */}
        <div className="mt-16 flex justify-center border-t border-neutral-200 pt-12">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full border-2 border-neutral-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to All News</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
