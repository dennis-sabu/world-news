"use client";

import { useState } from "react";
import { SectionRow, SectionRowProps } from "./SectionRow";
import { NormalizedArticle } from "@/lib/newsApi";

type InfiniteNewsFeedProps = {
  initialArticles: NormalizedArticle[];
};

function buildSectionRowProps(
  articles: NormalizedArticle[]
): SectionRowProps | null {
  if (articles.length < 5) {
    return null;
  }

  const [primary, secondary, ...rest] = articles;

  return {
    title: `Latest News`,
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
    list: rest.slice(0, 6).map((item) => ({
      title: item.title,
      href: item.url,
      sourceName: item.sourceName,
      date: item.publishedAt,
      imageUrl: item.imageUrl,
    })),
  };
}

export function InfiniteNewsFeed({ initialArticles }: InfiniteNewsFeedProps) {
  const [displayCount, setDisplayCount] = useState(300); // Show first 300 articles
  const [isLoading, setIsLoading] = useState(false);

  // Build section rows from articles (each row uses ~8 articles)
  const sectionRows: SectionRowProps[] = [];
  const articlesToShow = initialArticles.slice(0, displayCount);
  
  for (let i = 0; i < articlesToShow.length; i += 8) {
    const chunk = articlesToShow.slice(i, i + 8);
    if (chunk.length >= 5) {
      const rowProps = buildSectionRowProps(chunk);
      if (rowProps) {
        sectionRows.push(rowProps);
      }
    }
  }

  const hasMore = displayCount < initialArticles.length;
  const totalDisplayed = Math.min(displayCount, initialArticles.length);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 300, initialArticles.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-12 lg:mt-16 lg:space-y-16">
        {sectionRows.map((row, index) => (
          <SectionRow key={`news-row-${index}`} {...row} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-neutral-200 pt-8 sm:mt-12 sm:gap-4 sm:pt-12">
          <p className="text-xs text-neutral-500 sm:text-sm">
            Showing {totalDisplayed} of {initialArticles.length} articles
          </p>
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="group flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-sm"
          >
            <span>{isLoading ? "Loading..." : "Load More News"}</span>
            <span className={`transition-transform ${isLoading ? "animate-bounce" : "group-hover:translate-y-1"}`}>
              ↓
            </span>
          </button>
        </div>
      )}

      {!hasMore && initialArticles.length > 0 && (
        <div className="mt-8 flex justify-center border-t border-neutral-200 pt-8 sm:mt-12 sm:pt-12">
          <p className="text-xs text-neutral-500 sm:text-sm">
            You&apos;ve reached the end • {totalDisplayed} articles shown
          </p>
        </div>
      )}
    </>
  );
}
