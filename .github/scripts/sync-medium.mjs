#!/usr/bin/env node

/**
 * Sync Medium articles to data/medium.json
 *
 * Fetches the Medium RSS feed, parses each entry, and writes
 * a JSON file that blog.html and index.html consume via Alpine.js.
 *
 * Usage:  node .github/scripts/sync-medium.mjs
 * Deps:   npm install rss-parser (installed by the GitHub Actions workflow)
 */

import Parser from 'rss-parser';
import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FEED_URL = 'https://medium.com/feed/@ekta-sengar';
const OUTPUT_PATH = resolve(__dirname, '../../data/medium.json');

// Articles to exclude from the portfolio (URL slugs)
const EXCLUDED_SLUGS = [
  'the-dying-relationships-605f5bfaea1a',
  'again-i-ovary-acted-period-f38da8304da6',
  'quitting-the-no-to-social-swiping-e63dcf905c1d',
];

// ── Helpers ────────────────────────────────────────────────

/** Strip HTML tags and decode common entities */
function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Remove tracking query params from Medium URLs (e.g. ?source=rss-...) */
function cleanUrl(url = '') {
  try {
    const u = new URL(url);
    u.search = '';
    return u.toString();
  } catch {
    return url;
  }
}

/** Format a raw tag slug into Title Case (e.g. "new-years-resolutions" → "New Years Resolutions") */
function formatTag(tag) {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Estimate read time from HTML content (265 wpm average) */
function estimateReadTime(contentHtml = '') {
  const text = stripHtml(contentHtml);
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 265));
  return `${minutes} min read`;
}

/** Format a date string as "Mon YYYY" (e.g., "Mar 2026") */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/** Truncate a string to ~150 characters at the nearest word boundary */
function truncate(str, max = 150) {
  if (str.length <= max) return str;
  const trimmed = str.slice(0, max);
  const lastSpace = trimmed.lastIndexOf(' ');
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…';
}

// ── Main ───────────────────────────────────────────────────

async function main() {
  const parser = new Parser({
    customFields: {
      item: [['content:encoded', 'contentEncoded'], ['category', 'categories', { keepArray: true }]],
    },
  });

  console.log(`Fetching RSS feed: ${FEED_URL}`);
  const feed = await parser.parseURL(FEED_URL);
  console.log(`Found ${feed.items.length} articles in feed`);

  const articles = feed.items.map((item) => {
    // Pick first category tag, or fall back to "Personal"
    const rawCategories = item.categories || [];
    const rawTag = rawCategories.length > 0 ? rawCategories[0] : 'Personal';
    const tag = typeof rawTag === 'string' ? formatTag(rawTag) : 'Personal';

    // Build description: prefer contentSnippet (auto-stripped by rss-parser),
    // then strip HTML from content:encoded and grab first ~150 chars
    const snippet = (item.contentSnippet || '').trim();
    const contentText = stripHtml(item.contentEncoded || item.content || '');
    const rawDescription = snippet || contentText;
    const description = truncate(rawDescription);

    return {
      title: (item.title || '').trim(),
      url: cleanUrl(item.link || ''),
      date: formatDate(item.pubDate || item.isoDate || ''),
      readTime: estimateReadTime(item.contentEncoded || item.content || item.description || ''),
      tag,
      description,
    };
  });

  // Sort newest-first by pubDate
  const pubDates = new Map(feed.items.map((i) => [cleanUrl(i.link || ''), new Date(i.pubDate || 0)]));
  articles.sort((a, b) => (pubDates.get(b.url) || 0) - (pubDates.get(a.url) || 0));

  // Deduplicate by URL
  const seen = new Set();
  const unique = articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // Remove excluded articles
  const filtered = unique.filter((a) => !EXCLUDED_SLUGS.some((slug) => a.url.includes(slug)));

  const json = JSON.stringify(filtered, null, 2) + '\n';

  // Only write if content actually changed
  let existing = '';
  try {
    existing = readFileSync(OUTPUT_PATH, 'utf-8');
  } catch { /* file doesn't exist yet */ }

  if (existing === json) {
    console.log('No changes detected — medium.json is up to date.');
  } else {
    writeFileSync(OUTPUT_PATH, json, 'utf-8');
    console.log(`Updated ${OUTPUT_PATH} with ${filtered.length} articles (${unique.length - filtered.length} excluded).`);
  }
}

main().catch((err) => {
  console.error('Failed to sync Medium articles:', err.message);
  process.exit(1);
});
