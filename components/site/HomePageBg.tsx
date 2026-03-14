"use client";

/**
 * Fixed background layer from theme bransol-homepage-6: grid, orbs, aurora, vignette, grain, scan, chrome edge.
 * Renders behind the homepage hero and content.
 */
export function HomePageBg() {
  return (
    <>
      <div className="bg-fixed" aria-hidden>
        <div className="bg-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-orb bg-orb-4" />
        <div className="bg-orb bg-orb-5" />
        <div className="bg-aurora" />
        <div className="bg-vignette" />
        <div className="bg-grain" />
        <div className="bg-scan" />
      </div>
      <div className="chrome-edge" aria-hidden />
    </>
  );
}
