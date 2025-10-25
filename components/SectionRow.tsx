import Link from "next/link";
import Image from "next/image";

export type SectionPrimaryStory = {
  category: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  imageLabel?: string;
  imageUrl?: string;
  summary?: string;
};

export type SectionSecondaryStory = {
  category: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  href: string;
  imageUrl?: string;
};

export type SectionListStory = {
  title: string;
  href: string;
  sourceName?: string;
  date?: string;
  imageUrl?: string;
};

export type SectionRowProps = {
  title: string;
  primary: SectionPrimaryStory;
  secondary: SectionSecondaryStory;
  list: SectionListStory[];
  sectionSlug?: string;
};

export function SectionRow({ title, primary, secondary, list }: SectionRowProps) {
  return (
    <section className="border-t border-neutral-200 pt-8 sm:pt-12">
      <h2 className="mb-4 font-serif text-xl font-bold tracking-tight text-neutral-900 sm:mb-6 sm:text-2xl lg:text-3xl">
        {title}
      </h2>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-10">
        <div className="space-y-4 sm:space-y-6">
          <Link href={primary.href} className="block">
            <div className="relative overflow-hidden rounded bg-neutral-200" style={{ aspectRatio: "4 / 3" }}>
              {primary.imageUrl ? (
                <Image
                  src={primary.imageUrl}
                  alt={primary.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={true}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    {primary.imageLabel || "News"}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                {primary.category}
              </span>
              <p className="text-xl font-semibold leading-snug text-neutral-900">
                {primary.title}
              </p>
              {primary.summary && (
                <p className="text-sm leading-relaxed text-neutral-600">
                  {primary.summary}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                <span>{primary.date}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-400" />
                <span>{primary.readTime}</span>
                {primary.imageLabel && primary.imageUrl && (
                  <span className="hidden sm:inline">{primary.imageLabel}</span>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col justify-between border-neutral-200 lg:border-l lg:pl-6">
          <Link href={secondary.href} className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
              {secondary.category}
            </span>
            <p className="mt-4 text-lg font-semibold leading-snug text-neutral-900">
              {secondary.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {secondary.summary}
            </p>
            <div className="relative mt-4 hidden overflow-hidden rounded bg-neutral-200 sm:block" style={{ aspectRatio: "4 / 3" }}>
              {secondary.imageUrl ? (
                <Image
                  src={secondary.imageUrl}
                  alt={secondary.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                    {secondary.category}
                  </span>
                </div>
              )}
            </div>
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span>{secondary.date}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-400" />
            <span>{secondary.readTime}</span>
          </div>
        </div>

        <div className="space-y-4 border-neutral-200 lg:border-l lg:pl-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900">
            Latest in {title}
          </span>
          <div className="space-y-4">
            {list.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 border-b border-neutral-200 pb-4 last:border-none"
              >
                <div className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-200" style={{ aspectRatio: "1 / 1" }}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[8px] font-semibold uppercase tracking-wider text-neutral-300">
                        {item.sourceName?.substring(0, 3) || "•"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed text-neutral-700 transition-colors group-hover:text-red-600">
                    {item.title}
                  </p>
                  {item.sourceName && (
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      {item.sourceName}
                    </span>
                  )}
                  {item.date && (
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                      {item.date}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// TODO: Replace placeholder blocks with Next/Image once media delivery is wired up.
