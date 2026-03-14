"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArticlePageBg } from "@/components/site/ArticlePageBg";
import type { ArticleContent } from "@/lib/article-content";

interface ArticlePageViewProps {
  article: ArticleContent;
  related: ArticleContent[];
}

function HeroIllustration({ colors, slug }: { colors: [string, string, string]; slug: string }) {
  const [bg1, bg2, accent] = colors;
  let seed = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rnd = (n: number) => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(seed % n);
  };
  const rects = Array.from({ length: 12 }, (_, i) => (
    <rect
      key={i}
      x={`${rnd(80) + 5}%`}
      y={`${rnd(70) + 5}%`}
      width={rnd(120) + 40}
      height={rnd(50) + 20}
      fill={accent}
      opacity={(rnd(25) + 5) / 100}
      rx={rnd(4)}
    />
  ));
  return (
    <svg
      className="article-hero-img-svg"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`articleHeroBg-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bg1} />
          <stop offset="100%" stopColor={bg2} />
        </linearGradient>
        <filter id={`articleBlur-${slug}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#articleHeroBg-${slug})`} />
      <g filter={`url(#articleBlur-${slug})`}>{rects}</g>
    </svg>
  );
}

export function ArticlePageView({ article, related }: ArticlePageViewProps) {
  const [progress, setProgress] = useState(0);
  const [activeToc, setActiveToc] = useState<string | null>(null);
  const [shareLabel, setShareLabel] = useState("Share");
  const proseRef = useRef<HTMLDivElement>(null);

  const toc = article?.toc ?? [];

  useEffect(() => {
    function updateProgress() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
      setProgress(pct);

      toc.forEach((t) => {
        const el = document.getElementById(t.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.top > -200) setActiveToc(t.id);
        }
      });
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [toc]);

  function handleShare() {
    navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "").catch(() => {});
    setShareLabel("Copied");
    setTimeout(() => setShareLabel("Share"), 2000);
  }

  return (
    <div className="article-page">
      <ArticlePageBg />
      <div className="article-progress-track">
        <div className="article-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="article-breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/perspectives" className="breadcrumb-back">
            <svg viewBox="0 0 12 12">
              <path d="M10 6H2M5 2L1 6l4 4" stroke="currentColor" fill="none" strokeWidth="1.5" />
            </svg>
            Perspectives
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" style={{ color: article.categoryColor }}>
            {article.category}
          </span>
        </div>
      </div>

      <header className="article-hero">
        <div className="article-hero-inner">
          <div className="article-category-tag" style={{ color: article.categoryColor }}>
            {article.category}
          </div>
          <h1 className="article-hero-title">{article.title}</h1>
          <div className="article-hero-meta">
            <div className="article-meta-author">
              <span className="article-meta-author-name">{article.author}</span>
              <span className="article-meta-author-role">{article.authorRole}</span>
            </div>
            <div className="article-meta-divider" />
            <div className="article-meta-stat">
              <span className="article-meta-stat-val">{article.date}</span>
              <span className="article-meta-stat-label">Published</span>
            </div>
            <div className="article-meta-divider" />
            <div className="article-meta-stat">
              <span className="article-meta-stat-val">{article.readTime}</span>
              <span className="article-meta-stat-label">Reading time</span>
            </div>
            <div className="article-meta-share">
              <button type="button" className="article-share-btn" onClick={handleShare}>
                <svg viewBox="0 0 14 14">
                  <circle cx="11" cy="3" r="1.5" stroke="currentColor" fill="none" />
                  <circle cx="3" cy="7" r="1.5" stroke="currentColor" fill="none" />
                  <circle cx="11" cy="11" r="1.5" stroke="currentColor" fill="none" />
                  <path d="M4.5 6.5l5-3M4.5 7.5l5 3" stroke="currentColor" fill="none" strokeWidth="1.2" />
                </svg>
                {shareLabel}
              </button>
            </div>
          </div>
          <div className="article-hero-img-wrap">
            <div className="article-hero-img">
              <HeroIllustration colors={article.illustrationColor} slug={article.slug} />
            </div>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <article>
          <div
            ref={proseRef}
            className="prose-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="prose-tag-row">
            {article.tags.map((tag) => (
              <span key={tag} className="prose-tag">
                {tag}
              </span>
            ))}
          </div>
        </article>

        <aside className="article-sidebar-wrap">
          <div className="article-sidebar">
            <div className="article-sidebar-panel article-sidebar-progress">
              <span className="article-sidebar-label">Progress</span>
              <div className="article-sidebar-progress-bar">
                <div className="article-sidebar-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="article-sidebar-progress-label">{progress}% read</span>
            </div>

            <div className="article-sidebar-panel">
              <span className="article-sidebar-label">In this article</span>
              <ul className="article-toc-list">
                {toc.map((t) => (
                  <li key={t.id} className={`article-toc-item ${activeToc === t.id ? "active" : ""}`}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="article-sidebar-panel">
              <span className="article-sidebar-label">Read next</span>
              {related.slice(0, 2).map((r) => (
                <Link
                  key={r.slug}
                  href={`/perspectives/${r.slug}`}
                  className="article-sidebar-related-item"
                >
                  <span className="article-sidebar-related-cat" style={{ color: r.categoryColor }}>
                    {r.category}
                  </span>
                  <span className="article-sidebar-related-title">{r.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="article-related-section">
        <div className="article-related-header">
          <h2 className="article-related-title">More perspectives</h2>
          <Link href="/perspectives" className="article-related-all">
            All articles
            <svg viewBox="0 0 11 11">
              <path d="M1 5.5h9M6 1l4.5 4.5L6 10" stroke="currentColor" fill="none" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
        <div className="article-related-grid">
          {related.map((r) => (
            <Link key={r.slug} href={`/perspectives/${r.slug}`} className="article-related-card">
              <div
                className="article-rc-img"
                style={{
                  background: `linear-gradient(135deg, ${r.illustrationColor[0]}, ${r.illustrationColor[1]})`,
                }}
              />
              <div className="article-rc-body">
                <div>
                  <span className="article-rc-cat" style={{ color: r.categoryColor }}>
                    {r.category}
                  </span>
                  <div className="article-rc-title">{r.title}</div>
                </div>
                <div className="article-rc-footer">
                  <span className="article-rc-date">
                    {r.dateShort} · {r.readTime}
                  </span>
                  <div className="article-rc-arrow">
                    <svg viewBox="0 0 11 11">
                      <path d="M1 5.5h9M6 1l4.5 4.5L6 10" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
