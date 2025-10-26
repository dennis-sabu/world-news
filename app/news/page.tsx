import { HeroSection } from "@/components/HeroSection";
import { SecondaryFeatureGrid } from "@/components/SecondaryFeatureGrid";
import { SubscribersRail } from "@/components/SubscribersRail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InfiniteNewsFeed } from "@/components/InfiniteNewsFeed";
import { NewsPageHeader } from "@/components/NewsPageHeader";
import { buildPrimaryNav } from "@/lib/sections";
import { getSectionArticles } from "@/lib/newsApi";

const todayFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default async function NewsPage() {
  const publicationDate = todayFormatter.format(new Date());
  const primaryNav = buildPrimaryNav("news");

  // Fetch India, Kerala, and international news
  const [indiaArticles, keralaArticles, generalArticles] = await Promise.all([
    getSectionArticles({
      type: "rss",
      category: "india",
      label: "India",
      pageSize: 30,
    }),
    getSectionArticles({
      type: "rss",
      category: "kerala",
      label: "Kerala",
      pageSize: 20,
    }),
    getSectionArticles({
      type: "rss",
      category: "general",
      label: "News",
      pageSize: 80,
    }),
  ]);

  // Combine articles: India and Kerala first, then international
  const newsArticles = [...indiaArticles, ...keralaArticles, ...generalArticles];

  const [heroArticle, ...rest] = newsArticles;
  const featureGrid = rest.slice(0, 6);
  const subscriberStories = rest.slice(6, 9);
  const remainingArticles = rest.slice(9);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <NewsPageHeader />

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
