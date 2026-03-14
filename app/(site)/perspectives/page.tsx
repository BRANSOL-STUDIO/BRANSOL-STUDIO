"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FEATURED_POST,
  BLOG_POSTS,
  BLOG_FILTERS,
  MOST_READ_SLUGS,
  TOPICS,
  TAGS,
  type BlogPost,
  type BlogCategory,
} from "@/lib/blog-posts";

const ALL_POSTS = [FEATURED_POST, ...BLOG_POSTS];

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/perspectives/${post.slug}`} className="blog-featured-post">
      <div className="blog-fp-img">
        <div className="blog-fp-img-pattern">
          <div className="blog-fp-img-pattern-row">
            <div className="blog-fp-img-pattern-block blog-fp-img-pattern-tall" />
            <div className="blog-fp-img-pattern-block blog-fp-img-pattern-tall" style={{ flex: 2 }} />
          </div>
          <div className="blog-fp-img-pattern-row">
            <div className="blog-fp-img-pattern-block" style={{ flex: 3 }} />
            <div className="blog-fp-img-pattern-block" />
          </div>
          <div className="blog-fp-img-pattern-row">
            <div className="blog-fp-img-pattern-block" />
            <div className="blog-fp-img-pattern-block" />
            <div className="blog-fp-img-pattern-block" />
          </div>
        </div>
        <div className="blog-fp-img-overlay" />
        <div className="blog-fp-img-label">Featured · {post.date}</div>
      </div>
      <div className="blog-fp-body">
        <div>
          <div className="blog-fp-tag">{post.categoryLabel}</div>
          <h2 className="blog-fp-title">{post.title}</h2>
          <p className="blog-fp-excerpt">{post.excerpt}</p>
        </div>
        <div className="blog-fp-footer">
          <div>
            <div className="blog-fp-author-name">{post.author}</div>
            <span className="blog-fp-author-role">{post.authorRole}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span className="blog-fp-date">{post.date}</span>
            <span className="blog-fp-read">
              {post.readTime} read{" "}
              <svg viewBox="0 0 14 14">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.5" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  const catClass = `blog-cat-${post.category}`;
  return (
    <Link
      href={`/perspectives/${post.slug}`}
      className={`blog-article-card ${catClass}`}
      data-category={post.category}
    >
      <div className="blog-ac-img">
        <div className="blog-ac-chrome-bar" />
        <div className="blog-ac-img-inner">
          <div className="blog-ac-img-row">
            <div className="blog-ac-img-block blog-ac-img-block-tall" />
            <div className="blog-ac-img-block blog-ac-img-block-tall" style={{ flex: 2 }} />
          </div>
          <div className="blog-ac-img-row">
            <div className="blog-ac-img-block blog-ac-img-block-short" style={{ flex: 3 }} />
            <div className="blog-ac-img-block blog-ac-img-block-short" />
          </div>
        </div>
        <div className="blog-ac-img-overlay" />
      </div>
      <div className="blog-ac-body">
        <div>
          <div className="blog-ac-meta">
            <span className="blog-ac-category">{post.categoryLabel}</span>
            <span className="blog-ac-read-time">{post.readTime}</span>
          </div>
          <h2 className="blog-ac-title">{post.title}</h2>
          <p className="blog-ac-excerpt">{post.excerpt}</p>
        </div>
        <div className="blog-ac-footer">
          <span className="blog-ac-author">{post.author}</span>
          <span className="blog-ac-date">{post.date}</span>
        </div>
        <div className="blog-ac-arrow">
          <svg viewBox="0 0 11 11">
            <path d="M1 5.5h9M6 1l4.5 4.5L6 10" stroke="currentColor" fill="none" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function PerspectivesPage() {
  const [filter, setFilter] = useState<BlogCategory | "all">("all");

  const filteredPosts = useMemo(() => {
    if (filter === "all") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === filter);
  }, [filter]);

  const mostReadPosts = useMemo(() => {
    return MOST_READ_SLUGS.map((slug) => ALL_POSTS.find((p) => p.slug === slug)).filter(Boolean) as BlogPost[];
  }, []);

  return (
    <div className="blog-page">
      <header className="blog-page-header">
        <div className="blog-page-header-inner">
          <div>
            <span className="blog-eyebrow">Perspectives</span>
            <h1 className="blog-title">
              Strategic
              <br />
              <span className="chrome-text">thinking.</span>
            </h1>
          </div>
          <div>
            <div className="blog-desc">
              <p>
                Design is not decoration. It is a strategic instrument — one that shapes how organisations are
                perceived, how they win work, and how they sustain relevance. These are our views on it.
              </p>
              <p>Published infrequently. Written with intent. No newsletters, no noise.</p>
            </div>
            <div className="blog-meta">
              <span className="blog-meta-item">
                <span className="blog-meta-dot" style={{ background: "var(--iris)" }} />
                Strategy
              </span>
              <span className="blog-meta-item">
                <span className="blog-meta-dot" style={{ background: "var(--aqua)" }} />
                Procurement
              </span>
              <span className="blog-meta-item">
                <span className="blog-meta-dot" style={{ background: "var(--violet)" }} />
                Identity
              </span>
              <span className="blog-meta-item">
                <span className="blog-meta-dot" style={{ background: "var(--gold)" }} />
                Industry
              </span>
              <span className="blog-meta-item">
                <span className="blog-meta-dot" style={{ background: "var(--sky)" }} />
                Digital
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-filter-bar">
        <div className="blog-filter-inner">
          {BLOG_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`blog-filter-btn ${filter === value ? "active" : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-layout">
        <main className="blog-articles-main">
          <FeaturedPostCard post={FEATURED_POST} />

          <div className="blog-articles-grid">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="blog-load-more-wrap">
            <button type="button" className="blog-load-more">
              Load more perspectives
            </button>
          </div>
        </main>

        <aside className="blog-sidebar">
          <div className="blog-sidebar-block">
            <div className="blog-sidebar-label">Most Read</div>
            <div className="blog-pop-list">
              {mostReadPosts.map((post, i) => (
                <Link key={post.slug} href={`/perspectives/${post.slug}`} className="blog-pop-item">
                  <span className="blog-pop-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="blog-pop-content">
                    <div className="blog-pop-title">{post.title}</div>
                    <div className="blog-pop-meta">
                      {post.categoryLabel} · {post.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="blog-sidebar-block">
            <div className="blog-sidebar-label">Topics</div>
            <div className="blog-topic-list">
              {TOPICS.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  className="blog-topic-item"
                  onClick={() => setFilter((t.slug === "brand-identity" ? "identity" : t.slug) as BlogCategory)}
                >
                  <span className="blog-topic-name">{t.name}</span>
                  <span className="blog-topic-count">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="blog-sidebar-block">
            <div className="blog-sidebar-label">Tags</div>
            <div className="blog-tag-cloud">
              {TAGS.map((tag) => (
                <span key={tag} className="blog-tag-item">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="blog-sidebar-block">
            <div className="blog-sidebar-label">Stay Informed</div>
            <div>
              <p className="blog-newsletter-note">
                No newsletters. One message when something worth reading is published.
              </p>
              <input
                type="email"
                className="blog-newsletter-input"
                placeholder="your@organisation.com"
                aria-label="Email for notifications"
              />
              <button type="button" className="blog-newsletter-submit">
                Notify me
              </button>
              <p className="blog-newsletter-legal">
                Your address is not shared. Ever. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
