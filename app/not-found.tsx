"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="font-serif text-6xl font-bold text-neutral-900">404</h1>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            {t("notFoundTitle")}
          </h2>
          <p className="text-neutral-600">
            {t("notFoundDescription")}
          </p>
        </div>

        <Link
          href="/"
          className="inline-block rounded-full border-2 border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-600 hover:border-red-600"
        >
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}
