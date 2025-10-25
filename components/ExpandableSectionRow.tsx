"use client";

import { SectionRow, SectionRowProps } from "./SectionRow";
import { NormalizedArticle } from "@/lib/newsApi";

type ExpandableSectionRowProps = {
  title: string;
  articles: NormalizedArticle[];
  sectionSlug?: string;
};

function buildSectionRowProps(
  title: string,
  articles: NormalizedArticle[],
  sectionSlug?: string
): SectionRowProps | null {
  if (articles.length < 5) {
    return null;
  }

  const [primary, secondary, ...rest] = articles;

  return {
    title,
    sectionSlug,
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
    })),
  };
}

export function ExpandableSectionRow({
  title,
  articles,
  sectionSlug,
}: ExpandableSectionRowProps) {
  // First row always shown
  const firstRowProps = buildSectionRowProps(title, articles.slice(0, 15), sectionSlug);
  
  // Additional rows shown when expanded
  const remainingArticles = articles.slice(15);
  const additionalRows: SectionRowProps[] = [];
  
  for (let i = 0; i < remainingArticles.length; i += 8) {
    const chunk = remainingArticles.slice(i, i + 8);
    if (chunk.length >= 5) {
      const rowProps = buildSectionRowProps(title, chunk);
      if (rowProps) {
        additionalRows.push(rowProps);
      }
    }
  }

  if (!firstRowProps) {
    return null;
  }

  return (
    <div className="space-y-16">
      <SectionRow {...firstRowProps} />

      <div className="space-y-16">
        {additionalRows.map((row, index) => (
          <SectionRow key={`${title}-expanded-${index}`} {...row} />
        ))}
      </div>
    </div>
  );
}
