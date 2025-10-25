import Link from "next/link";
import { NormalizedArticle } from "@/lib/newsApi";

type ArticleListProps = {
  articles: NormalizedArticle[];
  heading?: string;
};

export function ArticleList({ articles, heading }: ArticleListProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="mt-12 space-y-8">
      {heading && (
        <h2 className="font-serif text-xl font-semibold uppercase tracking-[0.2em] text-neutral-800">
          {heading}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.url}
            href={article.url}
            className="group flex flex-col gap-4 border-b border-neutral-200 pb-6"
          >
            <div
              className="h-48 w-full overflow-hidden rounded bg-neutral-200 transition-transform group-hover:scale-[1.01]"
              style={{
                backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                {article.sourceName}
              </span>
              <p className="text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-red-600">
                {article.title}
              </p>
              {article.summary && (
                <p className="text-sm leading-relaxed text-neutral-600">
                  {article.summary}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {article.publishedAt && <span>{article.publishedAt}</span>}
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
