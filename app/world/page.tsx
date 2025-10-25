import { HeroSection } from "@/components/HeroSection";
import { SecondaryFeatureGrid } from "@/components/SecondaryFeatureGrid";
import { SubscribersRail } from "@/components/SubscribersRail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExpandableSectionRow } from "@/components/ExpandableSectionRow";
import { buildPrimaryNav } from "@/lib/sections";
import { getSectionArticles } from "@/lib/newsApi";

const todayFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default async function WorldPage() {
  const publicationDate = todayFormatter.format(new Date());
  const primaryNav = buildPrimaryNav("world");

  // Fetch world articles
  const worldArticles = await getSectionArticles({
    type: "query",
    query: '"world news" OR global politics OR international affairs',
    label: "World",
    pageSize: 50,
    sortBy: "publishedAt",
  });

  const [heroArticle, ...rest] = worldArticles;
  const featureGrid = rest.slice(0, 6);
  const subscriberStories = rest.slice(6, 9);
  const remainingArticles = rest.slice(9);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <SiteHeader dateLabel={publicationDate} primaryNav={primaryNav} />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10 space-y-4 border-b border-neutral-200 pb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            World
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
            World News
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Geopolitics, diplomacy, and global affairs that shape tomorrow.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <HeroSection article={heroArticle ?? null} />
          <SubscribersRail stories={subscriberStories} />
        </div>

        <SecondaryFeatureGrid features={featureGrid} />

        <div className="mt-16">
          <ExpandableSectionRow
            title="Latest World News"
            articles={remainingArticles}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
