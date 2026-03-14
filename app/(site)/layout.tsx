import "@/styles/homepage.css";
import "@/styles/work.css";
import "@/styles/blog.css";
import "@/styles/article.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SiteCursor } from "@/components/site/SiteCursor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
