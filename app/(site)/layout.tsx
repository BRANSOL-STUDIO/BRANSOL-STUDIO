/* Site CSS loaded from root layout so order is correct vs theme-override */
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
