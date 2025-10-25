import Link from "next/link";
import { NormalizedArticle } from "@/lib/newsApi";
import { getSectionHref } from "@/lib/sections";

type SubscribersRailProps = {
  stories: NormalizedArticle[];
};

export function SubscribersRail({ stories }: SubscribersRailProps) {
  if (!stories.length) {
    return null;
  }

  return (
    <aside className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900">
          Subscribers only
        </h2>
        <Link
          href={getSectionHref("subscriber-only")}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600"
        >
          {"View all ->"}
        </Link>
      </div>
      <div className="space-y-5">
        {stories.map((story) => (
          <Link
            key={story.url}
            href={story.url}
            className="group flex items-start gap-4 border-b border-neutral-200 pb-4 last:border-none"
          >
            {story.imageUrl ? (
              <div
                className="mt-1 h-16 w-16 shrink-0 rounded bg-neutral-200"
                style={{
                  backgroundImage: `url(${story.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded bg-neutral-100">
                <span className="text-[8px] font-semibold uppercase tracking-wider text-neutral-300">
                  {story.sourceName?.substring(0, 3) || "•"}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed text-neutral-700 transition-colors group-hover:text-red-600">
                {story.title}
              </p>
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {story.sourceName}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

// TODO: Link viewer to subscription marketing page when paywall integration is complete.
