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

export default async function Home() {
  const publicationDate = todayFormatter.format(new Date());
  const primaryNav = buildPrimaryNav("news");

  // Fetch international news from News API (without country filter for global news)
  const [generalNews, sportsNews, businessNews, techNews, healthNews, scienceNews, entertainmentNews] = await Promise.all([
    getSectionArticles({
      type: "category",
      category: "general",
      label: "World News",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "sports",
      label: "Sports",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "business",
      label: "Business",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "technology",
      label: "Technology",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "health",
      label: "Health",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "science",
      label: "Science",
      pageSize: 100,
    }),
    getSectionArticles({
      type: "category",
      category: "entertainment",
      label: "Entertainment",
      pageSize: 100,
    }),
  ]);

  // Combine all international news articles into one feed
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
  const feedArticles = rest.slice(9);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />

      <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[2fr_1fr] lg:gap-10">
          <HeroSection article={heroArticle ?? null} />
          <SubscribersRail stories={subscriberStories} />
        </div>

        <SecondaryFeatureGrid features={featureGrid} />

        <div className="mt-8 sm:mt-12 lg:mt-16">
          <InfiniteNewsFeed initialArticles={feedArticles} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}