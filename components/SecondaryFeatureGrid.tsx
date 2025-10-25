"use client";

import Link from "next/link";
import Image from "next/image";
import { NormalizedArticle } from "@/lib/newsApi";
import { useState } from "react";

type SecondaryFeatureGridProps = {
  features: NormalizedArticle[];
};

export function SecondaryFeatureGrid({ features }: SecondaryFeatureGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  if (!features.length) {
    return null;
  }

  return (
    <section className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Link
          key={feature.url}
          href={feature.url}
          className="group"
        >
          <div className="relative h-48 w-full overflow-hidden rounded bg-neutral-200 transition-transform group-hover:scale-[1.01] sm:h-56">
            {feature.imageUrl && !imageErrors[index] ? (
              <Image
                src={feature.imageUrl}
                alt={feature.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading={index < 3 ? "eager" : "lazy"}
                priority={index < 3}
                onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  {feature.sourceName}
                </span>
              </div>
            )}
          </div>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:mt-4">
            {feature.sourceName}
          </span>
          <p className="mt-2 text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-red-600 sm:text-lg">
            {feature.title}
          </p>
        </Link>
      ))}
    </section>
  );
}

// TODO: Rotate secondary highlights automatically once personalization API is ready.
