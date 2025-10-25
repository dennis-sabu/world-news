"use client";

import { useState } from "react";
import { ExpandableSectionRow } from "./ExpandableSectionRow";
import { NormalizedArticle } from "@/lib/newsApi";

type SectionBundle = {
  title: string;
  articles: NormalizedArticle[];
};

type HomepageSectionsProps = {
  initialSections: SectionBundle[];
  sectionSlugMap: Record<string, string>;
};

export function HomepageSections({ initialSections, sectionSlugMap }: HomepageSectionsProps) {
  const [visibleCount, setVisibleCount] = useState(6); // Show first 6 sections initially
  const [isLoading, setIsLoading] = useState(false);

  const visibleSections = initialSections.slice(0, visibleCount);
  const hasMore = visibleCount < initialSections.length;

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, initialSections.length));
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <div className="mt-16 space-y-16">
        {visibleSections.map((bundle) => {
          const slug = sectionSlugMap[bundle.title];
          return (
            <ExpandableSectionRow
              key={bundle.title}
              title={bundle.title}
              articles={bundle.articles}
              sectionSlug={slug}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center border-t border-neutral-200 pt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="group flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-900 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? "Loading..." : "Load More Sections"}</span>
            <span className={`transition-transform ${isLoading ? "animate-bounce" : "group-hover:translate-y-1"}`}>
              ↓
            </span>
          </button>
        </div>
      )}

      {!hasMore && initialSections.length > 6 && (
        <div className="mt-16 flex justify-center border-t border-neutral-200 pt-12">
          <p className="text-sm text-neutral-500">
            You&apos;ve reached the end of all sections
          </p>
        </div>
      )}
    </>
  );
}
