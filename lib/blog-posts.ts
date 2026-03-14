/**
 * Blog / Perspectives post data (from bransol-blog.html).
 */

export type BlogCategory = "strategy" | "procurement" | "identity" | "industry" | "digital";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  readTime: string;
  date: string;
  dateISO: string;
  author: string;
  authorRole: string;
}

export const BLOG_FILTERS: { value: BlogCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "strategy", label: "Strategy" },
  { value: "procurement", label: "Procurement" },
  { value: "identity", label: "Brand Identity" },
  { value: "industry", label: "Industry" },
  { value: "digital", label: "Digital" },
];

/** Featured post (first in list on the page) */
export const FEATURED_POST: BlogPost = {
  slug: "why-government-design-procurement-is-broken",
  title: "Why Government Design Procurement Is Still Broken — And What It Would Take to Fix It",
  excerpt:
    "South Africa spends billions annually on government communications. A fraction of that produces work that is genuinely fit for purpose. The problem is not creative talent. It is the structure through which that talent is commissioned, evaluated, and paid.",
  category: "procurement",
  categoryLabel: "Procurement",
  readTime: "8 min",
  date: "18 Feb 2026",
  dateISO: "2026-02-18",
  author: "BRANSOL Editorial",
  authorRole: "Studio",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-case-for-design-systems-in-enterprise",
    title: "The Case for Design Systems in Enterprise Organisations",
    excerpt:
      "Enterprise organisations waste millions annually on inconsistent design outputs. A well-governed design system is not a design team luxury — it is a procurement efficiency tool.",
    category: "strategy",
    categoryLabel: "Strategy",
    readTime: "6 min",
    date: "30 Jan 2026",
    dateISO: "2026-01-30",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
  {
    slug: "what-procurement-panels-actually-want",
    title: "What Procurement Panels Actually Want From a Design Agency",
    excerpt:
      "The evaluation criteria for formal design tenders rarely align with what good design actually requires. Here is what committees are really assessing — and how agencies consistently misread it.",
    category: "procurement",
    categoryLabel: "Procurement",
    readTime: "5 min",
    date: "14 Jan 2026",
    dateISO: "2026-01-14",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
  {
    slug: "brand-identity-is-not-a-logo",
    title: "A Brand Identity Is Not a Logo — It Is an Operating System",
    excerpt:
      "Organisations that treat brand identity as a visual exercise routinely underinvest in it and overreact when it fails. The organisations that get lasting value from identity work understand what it actually is.",
    category: "identity",
    categoryLabel: "Brand Identity",
    readTime: "7 min",
    date: "10 Dec 2025",
    dateISO: "2025-12-10",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
  {
    slug: "south-african-design-industry-2026",
    title: "The State of the South African Design Industry Heading Into 2026",
    excerpt:
      "The industry is bifurcating. On one side, commoditised subscription services and AI-assisted production. On the other, a smaller number of studios doing the work that actually requires senior judgement. The middle is disappearing.",
    category: "industry",
    categoryLabel: "Industry",
    readTime: "9 min",
    date: "20 Nov 2025",
    dateISO: "2025-11-20",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
  {
    slug: "why-your-digital-presence-is-your-credentials",
    title: "Your Digital Presence Is Your Credentials Document",
    excerpt:
      "Before any formal engagement, procurement panels, CEOs, and marketing directors will have already assessed your digital presence. Most organisations treat it as a brochure. It is closer to a first interview.",
    category: "digital",
    categoryLabel: "Digital",
    readTime: "5 min",
    date: "08 Oct 2025",
    dateISO: "2025-10-08",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
  {
    slug: "the-cost-of-cheap-design",
    title: "The True Cost of Cheap Design — What Organisations Don't Calculate",
    excerpt:
      "Organisations that choose the lowest-cost design provider rarely calculate the full cost. Rework, inconsistency, delayed approvals, and reputational exposure add up. We have seen the receipts.",
    category: "strategy",
    categoryLabel: "Strategy",
    readTime: "6 min",
    date: "02 Sep 2025",
    dateISO: "2025-09-02",
    author: "BRANSOL Studio",
    authorRole: "Studio",
  },
];

/** Most read (for sidebar) — subset by slug */
export const MOST_READ_SLUGS = [
  "why-government-design-procurement-is-broken",
  "brand-identity-is-not-a-logo",
  "south-african-design-industry-2026",
];

export const TOPICS: { slug: string; name: string; count: number }[] = [
  { slug: "strategy", name: "Strategy", count: 12 },
  { slug: "procurement", name: "Procurement", count: 8 },
  { slug: "brand-identity", name: "Brand Identity", count: 11 },
  { slug: "industry", name: "Industry", count: 6 },
  { slug: "digital", name: "Digital", count: 7 },
];

export const TAGS = [
  "Design Systems",
  "Government",
  "Brand Strategy",
  "Africa",
  "Procurement",
  "Identity",
  "Digital",
  "JSE",
  "Johannesburg",
  "BBBEE",
  "Enterprise",
  "Campaign",
];
