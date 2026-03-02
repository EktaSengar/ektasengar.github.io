/**
 * Shared utilities for the portfolio site.
 * Alpine.js handles most interactivity inline.
 * This file is for helpers used across pages.
 */

// Reading time estimate (words per minute)
function readingTime(text, wpm = 220) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

// Auto-calculate reading times on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-reading-time]').forEach(el => {
    const article = document.querySelector(el.dataset.readingTime);
    if (article) {
      const minutes = readingTime(article.textContent);
      el.textContent = `${minutes} min read`;
    }
  });
});
