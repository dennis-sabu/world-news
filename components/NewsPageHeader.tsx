"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function NewsPageHeader() {
  const { t } = useLanguage();
  
  return (
    <header className="mb-10 space-y-4 border-b border-neutral-200 pb-8 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
        {t("topNews")}
      </span>
      <h1 className="font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
        {t("breakingNews")}
      </h1>
      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        {t("breakingNewsDesc")}
      </p>
    </header>
  );
}
