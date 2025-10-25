# News Website - Production Deployment Guide

A modern Next.js news aggregator featuring India-specific and international news from multiple sources.

## Features

- 🌍 **Multi-source News Aggregation** - RSS feeds and News API integration
- 🇮🇳 **India-specific Content** - Dedicated India news section
- 📱 **Fully Responsive** - Mobile-first design with optimized layouts
- ⚡ **Fast Image Loading** - Next.js Image optimization with priority loading
- ♾️ **Infinite Scroll** - Load more articles on demand
- 🎨 **Modern UI** - Clean, newspaper-style design
- 🔍 **SEO Optimized** - Meta tags, sitemap, robots.txt

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **News Sources**: News API, RSS feeds (CNN, BBC, Al Jazeera)
- **Image Optimization**: Next.js Image component

## Prerequisites

- Node.js 18+ 
- npm or yarn
- News API key (get from https://newsapi.org/)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEWS_API_KEY=your_newsapi_key_here
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage (international news)
│   ├── india/             # India news page
│   ├── business/          # Business news
│   ├── sport/             # Sports news
│   ├── technology/        # Tech news
│   ├── health/            # Health news
│   ├── science/           # Science news
│   ├── entertainment/     # Entertainment news
│   ├── kerala/            # Kerala-specific news
│   ├── loading.tsx        # Loading state
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── SectionRow.tsx     # Article row layout
│   ├── InfiniteNewsFeed.tsx # Infinite scroll
│   ├── HeroSection.tsx    # Hero article
│   └── ...
├── lib/                   # Utilities
│   └── newsApi.ts         # News fetching logic
└── public/               # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add `NEWS_API_KEY` environment variable
4. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Set environment variables
3. Start server: `npm start`
4. Server runs on port 3000 by default

## Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Priority loading for above-the-fold content
- ✅ Lazy loading for below-the-fold images
- ✅ ISR (Incremental Static Regeneration) - 10 minute revalidation
- ✅ Compression enabled
- ✅ Package imports optimization
- ✅ WebP/AVIF image formats

## API Rate Limits

**News API Free Tier:**
- 100 requests per day
- Data refreshes every 10 minutes (ISR)
- ~14 requests per page load (7 categories × 2)

**Recommendations:**
- Implement caching for production
- Consider upgrading News API plan for higher traffic
- Use RSS feeds as fallback

## Content Sources

### International News (Main Page)
- News API (US/Global headlines)
- RSS: CNN, BBC, Al Jazeera

### India News (India Page)
- News API with `country: "in"` filter
- 8 categories: General, Sports, Business, Tech, Health, Science, Entertainment, India-specific

### Category Pages
- Business, Sports, Technology, Health, Science, Entertainment
- International content from respective sources

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
