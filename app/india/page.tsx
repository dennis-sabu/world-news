import { HeroSection } from "@/components/HeroSection";
import { SecondaryFeatureGrid } from "@/components/SecondaryFeatureGrid";
import { SubscribersRail } from "@/components/SubscribersRail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InfiniteNewsFeed } from "@/components/InfiniteNewsFeed";
import { buildPrimaryNav } from "@/lib/sections";
import { getSectionArticles } from "@/lib/newsApi";

// Revalidate every 10 minutes
export const revalidate = 600;

const todayFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default async function IndiaPage() {
  const publicationDate = todayFormatter.format(new Date());
  const primaryNav = buildPrimaryNav("india");

  // Fetch India news from RSS feeds
  const [
    generalNews,
    sportsNews,
    businessNews,
    techNews,
    healthNews,
    scienceNews,
    entertainmentNews,
  ] = await Promise.all([
    getSectionArticles({ type: "rss", category: "general", label: "General", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "sports", label: "Sports", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "business", label: "Business", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "technology", label: "Technology", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "health", label: "Health", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "science", label: "Science", pageSize: 100 }),
    getSectionArticles({ type: "rss", category: "entertainment", label: "Entertainment", pageSize: 100 }),
  ]);

  // Combine all articles
  const allArticles = [
    ...generalNews,
    ...sportsNews,
    ...businessNews,
    ...techNews,
    ...healthNews,
    ...scienceNews,
    ...entertainmentNews,
  ];

  const [heroArticle, ...rest] = allArticles;
  const featureGrid = rest.slice(0, 6);
  const subscriberStories = rest.slice(6, 9);
  const remainingArticles = rest.slice(9);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10 space-y-4 border-b border-neutral-200 pb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            India
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            India News
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            National news, policy, and perspectives from across the country.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <HeroSection article={heroArticle ?? null} />
          <SubscribersRail stories={subscriberStories} />
        </div>

        <SecondaryFeatureGrid features={featureGrid} />

        <div className="mt-16">
          <InfiniteNewsFeed initialArticles={remainingArticles} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
