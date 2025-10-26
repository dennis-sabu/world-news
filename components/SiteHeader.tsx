"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { NavItem } from "@/lib/sections";
import { useLanguage } from "@/lib/LanguageContext";

type SiteHeaderProps = {
  dateLabel: string;
  primaryNav: NavItem[];
};

// Helper to check if we're on the client side (React-recommended approach)
const subscribe = () => () => {};
const useHydrated = () => {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
};

export function SiteHeader({ dateLabel, primaryNav }: SiteHeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const mounted = useHydrated();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-3 px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:grid-cols-3 sm:gap-2 sm:px-4 sm:py-4 sm:text-[11px]">
          <div className="flex flex-wrap items-center gap-2 sm:justify-start sm:gap-3">
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center justify-center text-center font-serif text-xl tracking-[0.25em] text-neutral-900 sm:text-2xl sm:tracking-[0.35em] lg:text-3xl">
            <Link href="/" className="transition-colors hover:text-red-600">
              THE WORLD NEWS
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-neutral-600 sm:justify-end sm:gap-3 sm:text-[11px]">
            {/* Language selector (top-right) */}
            {mounted && (
              <div className="flex items-center gap-1">
                <button
                  aria-label="Switch to English"
                  aria-pressed={lang === "en"}
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors focus:outline-none ${
                    lang === "en" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  EN
                </button>
                <button
                  aria-label="Switch to Malayalam"
                  aria-pressed={lang === "ml"}
                  onClick={() => setLang("ml")}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors focus:outline-none ${
                    lang === "ml" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  മ
                </button>
              </div>
            )}

            <Link href="/subscriber-only" className="hover:text-red-600" suppressHydrationWarning>
              {mounted ? t("signIn") : "Sign in"}
            </Link>
            <Link
              href="/subscriber-only"
              className="rounded-full border border-neutral-900 px-3 py-1 text-neutral-900 transition-colors hover:border-red-600 hover:text-red-600"
              suppressHydrationWarning
            >
              {mounted ? t("subscribe") : "Subscribe"}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl overflow-x-auto px-3 scrollbar-hide sm:px-4">
          <nav className="flex items-center gap-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700 sm:gap-6 sm:py-3 sm:text-sm sm:tracking-[0.18em]">
            {primaryNav.map((item) => {
              // Try to translate section names, fallback to original label
              let label = item.label;
              if (mounted) {
                try {
                  const key = item.slug.replace("-", "") as "news" | "kerala" | "india" | "business" | "sport" | "technology" | "health" | "science" | "culture" | "entertainment" | "subscriberOnly";
                  const translated = t(key);
                  if (translated) label = translated;
                } catch {
                  // Use original label if translation fails
                }
              }
              
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`whitespace-nowrap border-b-2 pb-2 transition-colors ${
                    item.active
                      ? "border-red-600 text-red-600"
                      : "border-transparent hover:border-red-500 hover:text-red-600"
                  }`}
                  suppressHydrationWarning
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
