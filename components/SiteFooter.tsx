"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function SiteFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} The Malayalam Times</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-red-600">
            {t("footerPrivacy")}
          </Link>
          <Link href="#" className="hover:text-red-600">
            {t("footerTerms")}
          </Link>
          <Link href="#" className="hover:text-red-600">
            {t("footerContact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
