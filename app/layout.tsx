import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
/* Site + auth styles before theme-override so layout/fonts win; theme-override only sets bg/color */
import "@/styles/homepage.css";
import "@/styles/work.css";
import "@/styles/work-case-study.css";
import "@/styles/work-case-study-globtek-branding.css";
import "@/styles/blog.css";
import "@/styles/article.css";
import "@/styles/expertise.css";
import "@/styles/begin.css";
import "@/styles/studio.css";
import "@/styles/platform.css";
import "@/styles/login.css";
import "@/styles/theme-override.css";

export const metadata: Metadata = {
  title: "BRANSOL — Strategic Design Studio",
  description:
    "We work with organisations whose ambitions demand more than execution.",
};

const GA_ID = "G-CHY7B35XNP";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Do not add inline styles or background/color to html/body — theme lives in globals.css .bransol */
  return (
    <html lang="en" className="bransol">
      <body className="bransol">
        <div className="bransol-root">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="pause-animations-hidden" strategy="afterInteractive">
          {`(function(){var f=function(){document.body.classList.toggle("animations-paused",document.hidden);};document.addEventListener("visibilitychange",f);f();})();`}
        </Script>
        {children}
        </div>
      </body>
    </html>
  );
}
