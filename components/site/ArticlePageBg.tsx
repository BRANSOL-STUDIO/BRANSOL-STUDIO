"use client";

/**
 * Article page background from theme bransol-article: grid, 2 orbs, scan.
 * No chrome edge on article pages.
 */
export function ArticlePageBg() {
  return (
    <div className="article-bg-wrap" aria-hidden>
      <div className="bg-fixed article-bg">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-scan" />
      </div>
    </div>
  );
}
