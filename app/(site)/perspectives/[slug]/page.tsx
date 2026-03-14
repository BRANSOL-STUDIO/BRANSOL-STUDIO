import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from "@/lib/article-content";
import { ArticlePageView } from "./ArticlePageView";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function getSlug(params: PageProps["params"]): Promise<string> {
  const p = await Promise.resolve(params);
  return typeof p === "object" && p !== null && "slug" in p ? p.slug : "";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await getSlug(params);
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not found" };
  return {
    title: `${article.title} — BRANSOL Perspectives`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  try {
    const slug = await getSlug(params);
    if (!slug) notFound();
    const article = getArticleBySlug(slug);
    if (!article) notFound();
    const related = getRelatedArticles(article, 3);
    return <ArticlePageView article={article} related={related} />;
  } catch (err) {
    console.error("Article page error:", err);
    notFound();
  }
}
