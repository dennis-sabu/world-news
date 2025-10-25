import Parser from "rss-parser";

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const DEFAULT_COUNTRY = "in";
const DEFAULT_REVALIDATE_SECONDS = 600;

// RSS Feed sources for different categories
const RSS_FEEDS: Record<string, string[]> = {
  general: [
    "https://rss.cnn.com/rss/edition.rss",
    "http://feeds.bbci.co.uk/news/rss.xml",
    "https://www.aljazeera.com/xml/rss/all.xml",
  ],
  sports: [
    "https://rss.cnn.com/rss/edition_sport.rss",
    "http://feeds.bbci.co.uk/sport/rss.xml",
  ],
  business: [
    "https://rss.cnn.com/rss/money_latest.rss",
    "http://feeds.bbci.co.uk/news/business/rss.xml",
  ],
  technology: [
    "https://rss.cnn.com/rss/edition_technology.rss",
    "http://feeds.bbci.co.uk/news/technology/rss.xml",
  ],
  health: [
    "https://rss.cnn.com/rss/edition_health.rss",
    "http://feeds.bbci.co.uk/news/health/rss.xml",
  ],
  science: [
    "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
  ],
  entertainment: [
    "https://rss.cnn.com/rss/edition_entertainment.rss",
    "http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
  ],
};

export type NormalizedArticle = {
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  readTime: string;
  sourceName: string;
  categoryLabel: string;
};

export type HomepageNewsPayload = {
  hero: NormalizedArticle | null;
  secondaryHighlights: NormalizedArticle[];
  subscriberStories: NormalizedArticle[];
  sectionBundles: Array<{
    title: string;
    articles: NormalizedArticle[];
  }>;
};

type NewsApiArticle = {
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
  source?: {
    name?: string | null;
  } | null;
};

type NewsApiResponse = {
  status: string;
  totalResults?: number;
  articles?: NewsApiArticle[];
  message?: string;
  code?: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function sanitizeImageUrl(url?: string | null): string | undefined {
  if (!url) {
    return undefined;
  }
  
  // Trim whitespace
  url = url.trim();
  
  // Skip invalid or placeholder URLs
  if (url === '' || 
      url.includes('placeholder') || 
      url.includes('default-image') ||
      url.length < 10) {
    return undefined;
  }
  
  // Handle protocol-relative URLs
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  
  // Upgrade http to https for security
  if (url.startsWith("http://")) {
    return url.replace(/^http:\/\//, "https://");
  }
  
  // Handle relative URLs (though these shouldn't appear in RSS feeds)
  if (url.startsWith("/") && !url.startsWith("//")) {
    return undefined; // Can't resolve without base domain
  }
  
  // Validate it's a proper URL with image extension or https
  if (url.startsWith("https://") || url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    return url;
  }
  
  return undefined;
}

function ensureApiKey(): string {
  const key = process.env.NEWS_API_KEY;
  if (!key) {
    throw new Error("Missing NEWS_API_KEY. Add it to .env.local to enable live news feeds.");
  }
  return key;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    searchParams.append(key, String(value));
  });
  return searchParams.toString();
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function formatPublishedAt(value?: string | null): string {
  if (!value) {
    return "";
  }
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return "";
  }
  return dateFormatter.format(new Date(timestamp));
}

function normalizeArticle(article: NewsApiArticle, categoryLabel: string): NormalizedArticle | null {
  if (!article.title || !article.url) {
    return null;
  }

  const summary = article.description?.trim() || article.content?.replace(/\[.*\]$/, "").trim() || "";
  const publishedAt = formatPublishedAt(article.publishedAt);
  const readTime = estimateReadTime(`${article.description ?? ""} ${article.content ?? ""}`);

  return {
    title: article.title.trim(),
    summary,
    url: article.url,
    imageUrl: sanitizeImageUrl(article.urlToImage),
    publishedAt,
    readTime,
    sourceName: article.source?.name?.trim() || categoryLabel,
    categoryLabel,
  };
}

async function fetchFromNewsApi(
  endpoint: string,
  params: Record<string, string | number | undefined>,
): Promise<NewsApiArticle[]> {
  const apiKey = ensureApiKey();
  const query = buildQuery(params);
  const url = `${NEWS_API_BASE_URL}/${endpoint}?${query}`;

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`News API request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as NewsApiResponse;
  if (payload.status !== "ok" || !payload.articles) {
    throw new Error(`News API responded with an error: ${payload.message ?? payload.code ?? "unknown"}`);
  }

  return payload.articles;
}

async function fetchTopHeadlines(options: {
  category?: string;
  pageSize?: number;
  country?: string;
  q?: string;
  label?: string;
}): Promise<NormalizedArticle[]> {
  const articles = await fetchFromNewsApi("top-headlines", {
    country: options.country ?? DEFAULT_COUNTRY,
    category: options.category,
    pageSize: options.pageSize ?? 12,
    q: options.q,
  });

  const categoryLabel = options.label ?? (options.category ? capitalize(options.category) : "Top Story");
  return articles
    .map((article) => normalizeArticle(article, categoryLabel))
    .filter((article): article is NormalizedArticle => Boolean(article));
}

async function fetchEverything(options: {
  q: string;
  pageSize?: number;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  label?: string;
}): Promise<NormalizedArticle[]> {
  const articles = await fetchFromNewsApi("everything", {
    q: options.q,
    sortBy: options.sortBy ?? "publishedAt",
    language: "en",
    pageSize: options.pageSize ?? 12,
  });

  return articles
    .map((article) => normalizeArticle(article, options.label ?? "Analysis"))
    .filter((article): article is NormalizedArticle => Boolean(article));
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// RSS Feed parsing functions
interface RssMediaContent {
  $?: { url?: string };
  url?: string;
}

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  enclosure?: {
    url?: string;
    type?: string;
  };
  "media:content"?: RssMediaContent | RssMediaContent[];
  "media:thumbnail"?: RssMediaContent | RssMediaContent[];
  creator?: string;
  description?: string;
  "content:encoded"?: string;
  guid?: string;
}

async function fetchFromRss(category: string, label: string, pageSize: number = 12): Promise<NormalizedArticle[]> {
  const feedUrls = RSS_FEEDS[category] || RSS_FEEDS.general;
  const parser = new Parser({
    customFields: {
      item: [
        ["media:content", "media:content"],
        ["media:thumbnail", "media:thumbnail"],
        ["enclosure", "enclosure"],
        ["dc:creator", "creator"],
        ["content:encoded", "content:encoded"],
      ],
    },
  });

  try {
    const allArticles: NormalizedArticle[] = [];

    for (const feedUrl of feedUrls) {
      try {
        const feed = await parser.parseURL(feedUrl);
        const sourceName = feed.title || label;

        for (const item of feed.items) {
          if (!item.title || !item.link) continue;

          const rssItem = item as unknown as RssItem;
          
          // Extract image URL - try multiple formats
          let imageUrl: string | undefined;
          
          // Try enclosure (common in RSS 2.0)
          if (rssItem.enclosure?.url) {
            const encType = rssItem.enclosure.type?.toLowerCase() || "";
            if (encType.includes("image") || rssItem.enclosure.url.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
              imageUrl = sanitizeImageUrl(rssItem.enclosure.url);
            }
          }
          
          // Try media:content
          if (!imageUrl && rssItem["media:content"]) {
            const mediaContent = Array.isArray(rssItem["media:content"]) 
              ? rssItem["media:content"][0] 
              : rssItem["media:content"];
            if (mediaContent?.$?.url) {
              imageUrl = sanitizeImageUrl(mediaContent.$.url);
            } else if (mediaContent?.url) {
              imageUrl = sanitizeImageUrl(mediaContent.url);
            }
          }
          
          // Try media:thumbnail
          if (!imageUrl && rssItem["media:thumbnail"]) {
            const thumbnail = Array.isArray(rssItem["media:thumbnail"]) 
              ? rssItem["media:thumbnail"][0] 
              : rssItem["media:thumbnail"];
            if (thumbnail?.$?.url) {
              imageUrl = sanitizeImageUrl(thumbnail.$.url);
            } else if (thumbnail?.url) {
              imageUrl = sanitizeImageUrl(thumbnail.url);
            }
          }
          
          // Try extracting from content/description
          if (!imageUrl) {
            const contentHtml = rssItem["content:encoded"] || rssItem.content || rssItem.description || "";
            const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/i);
            if (imgMatch && imgMatch[1]) {
              imageUrl = sanitizeImageUrl(imgMatch[1]);
            }
          }

          // Log for debugging (only in development)
          if (process.env.NODE_ENV === 'development' && allArticles.length < 2) {
            console.log(`RSS Item from ${sourceName}:`, {
              title: item.title?.substring(0, 50),
              hasEnclosure: !!rssItem.enclosure,
              hasMediaContent: !!rssItem["media:content"],
              hasMediaThumbnail: !!rssItem["media:thumbnail"],
              extractedImageUrl: imageUrl?.substring(0, 80),
            });
          }

          const summary = rssItem.contentSnippet || rssItem.description || rssItem.content || "";
          const publishedAt = formatPublishedAt(rssItem.pubDate);
          const readTime = estimateReadTime(summary);

          allArticles.push({
            title: item.title.trim(),
            summary: summary.replace(/<[^>]*>/g, "").trim().substring(0, 200),
            url: item.link,
            imageUrl,
            publishedAt,
            readTime,
            sourceName: sourceName.trim(),
            categoryLabel: label,
          });
        }
      } catch (feedError) {
        console.warn(`Failed to fetch RSS feed ${feedUrl}:`, feedError);
        continue;
      }
    }

    return distinctArticles(allArticles.slice(0, pageSize));
  } catch (error) {
    console.error(`Failed to fetch RSS feeds for ${category}:`, error);
    return [];
  }
}

function distinctArticles(articles: NormalizedArticle[]): NormalizedArticle[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.url)) {
      return false;
    }
    seen.add(article.url);
    return true;
  });
}

function sliceBundle(articles: NormalizedArticle[], count: number): [NormalizedArticle[], NormalizedArticle[]] {
  return [articles.slice(0, count), articles.slice(count)];
}

export type SectionFetchRequest =
  | {
      type: "category";
      category: string;
      country?: string;
      pageSize?: number;
      label?: string;
    }
  | {
      type: "query";
      query: string;
      pageSize?: number;
      sortBy?: "relevancy" | "popularity" | "publishedAt";
      label?: string;
    }
  | {
      type: "country";
      country: string;
      category?: string;
      pageSize?: number;
      label?: string;
    }
  | {
      type: "rss";
      category: string;
      pageSize?: number;
      label?: string;
    };

export async function getSectionArticles(request: SectionFetchRequest): Promise<NormalizedArticle[]> {
  // Try RSS first for better reliability
  if (request.type === "category") {
    const rssArticles = await fetchFromRss(
      request.category,
      request.label || capitalize(request.category),
      request.pageSize || 24
    );
    if (rssArticles.length > 0) {
      return rssArticles;
    }
    // Fallback to News API if RSS fails
    const articles = await fetchTopHeadlines({
      category: request.category,
      country: request.country,
      pageSize: request.pageSize,
      label: request.label,
    });
    return distinctArticles(articles);
  }

  if (request.type === "rss") {
    return fetchFromRss(
      request.category,
      request.label || capitalize(request.category),
      request.pageSize || 24
    );
  }

  if (request.type === "query") {
    const articles = await fetchEverything({
      q: request.query,
      pageSize: request.pageSize,
      sortBy: request.sortBy,
      label: request.label,
    });
    return distinctArticles(articles);
  }

  if (request.type === "country") {
    const articles = await fetchTopHeadlines({
      country: request.country,
      category: request.category,
      pageSize: request.pageSize,
      label: request.label,
    });
    return distinctArticles(articles);
  }

  throw new Error(`Unsupported section request type: ${(request as { type: string }).type}`);
}

export async function getHomepageNews(): Promise<HomepageNewsPayload> {
  try {
    // Fetch from RSS feeds for better reliability - fetch MORE categories
    const [
      generalNews,
      sportsNews,
      businessNews,
      techNews,
      healthNews,
      scienceNews,
      entertainmentNews,
      worldNews,
      indiaNews,
    ] = await Promise.all([
      fetchFromRss("general", "News", 30),
      fetchFromRss("sports", "Sport", 25),
      fetchFromRss("business", "Business", 25),
      fetchFromRss("technology", "Technology", 25),
      fetchFromRss("health", "Health", 25),
      fetchFromRss("science", "Science", 25),
      fetchFromRss("entertainment", "Entertainment", 25),
      fetchFromRss("general", "World", 25),
      fetchFromRss("general", "India", 25),
    ]);

    const uniqueTopHeadlines = distinctArticles(generalNews);

    const [heroList, remainderAfterHero] = sliceBundle(uniqueTopHeadlines, 1);
    const hero = heroList[0] ?? null;

    const [secondaryHighlights, remainderAfterHighlights] = sliceBundle(remainderAfterHero, 3);
    const [subscriberStoriesRaw] = sliceBundle(remainderAfterHighlights, 4);

    const sectionBundles: Array<{ title: string; articles: NormalizedArticle[] }> = [];

    if (sportsNews.length >= 8) {
      sectionBundles.push({ title: "Sport", articles: sportsNews.slice(0, 20) });
    }
    if (businessNews.length >= 8) {
      sectionBundles.push({ title: "Business", articles: businessNews.slice(0, 20) });
    }
    if (techNews.length >= 8) {
      sectionBundles.push({ title: "Technology", articles: techNews.slice(0, 20) });
    }
    if (healthNews.length >= 8) {
      sectionBundles.push({ title: "Health", articles: healthNews.slice(0, 20) });
    }
    if (scienceNews.length >= 8) {
      sectionBundles.push({ title: "Science", articles: scienceNews.slice(0, 20) });
    }
    if (entertainmentNews.length >= 8) {
      sectionBundles.push({ title: "Entertainment", articles: entertainmentNews.slice(0, 20) });
    }
    if (worldNews.length >= 8) {
      sectionBundles.push({ title: "World", articles: worldNews.slice(0, 20) });
    }
    if (indiaNews.length >= 8) {
      sectionBundles.push({ title: "India", articles: indiaNews.slice(0, 20) });
    }

    const subscriberStories = subscriberStoriesRaw.length >= 3
      ? subscriberStoriesRaw.slice(0, 3)
      : generalNews.slice(10, 13);

    return {
      hero,
      secondaryHighlights,
      subscriberStories,
      sectionBundles,
    };
  } catch (error) {
    console.error("Failed to load news feed", error);
    return {
      hero: null,
      secondaryHighlights: [],
      subscriberStories: [],
      sectionBundles: [],
    };
  }
}
