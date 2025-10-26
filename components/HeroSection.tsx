"use client";

import Link from "next/link";
import Image from "next/image";
import { NormalizedArticle } from "@/lib/newsApi";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type HeroSectionProps = {
  article: NormalizedArticle | null;
};

export function HeroSection({ article }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  if (!article) {
    return (
      <article className="grid gap-6 rounded border border-dashed border-neutral-200 p-6 text-sm text-neutral-500">
        <p>{t("noContentAvailable")}</p>
      </article>
    );
  }

  return (
    <article className="grid gap-4 sm:gap-6 lg:grid-cols-[1.8fr_2.2fr]">
      <Link
        href={article.url}
        className="relative block overflow-hidden rounded bg-neutral-200"
        style={{ aspectRatio: "4 / 3" }}
      >
        {article.imageUrl && !imageError ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover"
            priority={true}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              No Image Available
            </span>
          </div>
        )}
        <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.2em] text-neutral-100 mix-blend-difference">
          {t("leadPhoto")}
        </span>
      </Link>

      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            {article.sourceName}
          </span>
          <h1 className="mt-2 font-serif text-xl font-bold leading-snug text-neutral-900 sm:mt-4 sm:text-2xl lg:text-3xl">
            {article.title}
          </h1>
          {article.summary && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base">
              {article.summary}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:mt-6 sm:gap-3 sm:text-[11px]">
          {article.publishedAt && <span>{article.publishedAt}</span>}
          <span className="h-1 w-1 rounded-full bg-neutral-400" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

// TODO: Enhance hero section with category filters once user personalization is available.
