import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkCaseStudy } from "@/lib/work-case-studies";
import type { WorkProject } from "@/lib/work-projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import WorkGlobtekVehicleBrandingTabs from "@/components/site/WorkGlobtekVehicleBrandingTabs";
import globtekLogoGrey from "@/images/archive/GLOBTEK/BRANDING/Globtek_Logo__greyscale.png";
import globtekLogoOnDark from "@/images/archive/GLOBTEK/BRANDING/Globtek_Logo__on-dark-bg.png";
import globtekLogoColour from "@/images/archive/GLOBTEK/BRANDING/Globtek_Logo__colour.png";
import laptopMockup from "@/images/Generic Mockups/Laptop-Mockup.png";

export default function WorkGlobtekBrandingView({
  caseStudy,
  relatedProjects,
}: {
  caseStudy: WorkCaseStudy;
  relatedProjects: WorkProject[];
}) {
  const cssVars = {
    "--accent": caseStudy.accentColor,
    "--accent-hex": caseStudy.accentHex,
  } as CSSProperties;

  const vehicle = caseStudy.images.vehicle;
  const outdoor = caseStudy.images.outdoor;
  const profiles = caseStudy.images.profiles;
  const website = caseStudy.images.website;
  const mug = caseStudy.images.mug;
  const stationery = caseStudy.images.stationery;

  return (
    <div className="gb-branding-root" style={cssVars}>
      {/* HERO */}
      <section className="gb-hero">
        <div className="gb-breadcrumb">
          <Link href="/work">Work</Link>
          <span className="gb-bc-sep">·</span>
          <span className="gb-bc-current">{caseStudy.sector}</span>
        </div>

        <div className="gb-hero-grid">
          <div>
            <span className="gb-sector-tag">Professional Services</span>
            <h1 className="gb-hero-title">
              {caseStudy.name.split("—")[0].trim()}
              {caseStudy.name.includes("—") ? (
                <>
                  <br />
                  <span className="gb-hero-title-accent">
                    {caseStudy.name.split("—")[1].trim()}
                  </span>
                </>
              ) : null}
            </h1>
            <span className="gb-hero-disc">{caseStudy.disciplineLabel}</span>
            <p className="gb-hero-excerpt">{caseStudy.excerpt}</p>

            <div className="gb-hero-tags">
              {caseStudy.tags.slice(0, 7).map((t) => (
                <span key={t} className="gb-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="gb-hero-stats">
            <div className="gb-stat-row">
              <span className="gb-sr-label">Year</span>
              <span className="gb-sr-val">{caseStudy.year}</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-sr-label">Scope</span>
              <span className="gb-sr-val">{caseStudy.stats.scope}</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-sr-label">Team</span>
              <span className="gb-sr-val">{caseStudy.stats.team}</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-sr-label">Delivery</span>
              <span className="gb-sr-val">{caseStudy.deliverables[0]}</span>
            </div>
          </div>
        </div>

        <div className="gb-hero-divider">
          <span>{caseStudy.num} — Globtek</span>
          <span>{caseStudy.disciplines.join(" · ")}</span>
        </div>
      </section>

      {/* HERO VISUAL */}
      <div className="gb-hero-visual">
        <div className="gb-hero-visual-frame">
          <img
            src={caseStudy.images.hero.src}
            alt=""
            className="gb-hero-visual-img"
          />
        </div>
        <div className="gb-visual-cap">
          <span>Globtek — Fleet Vehicle Identity</span>
          <span>Applied Ingenuity · 2025</span>
        </div>
      </div>

      {/* 01 LOGO DESIGN */}
      <section className="gb-section" id="logo">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">01 — Logo Design</span>
          <h2 className="gb-sec-title">
            The mark.
            <br />
            <span className="gb-sec-title-accent">Applied ingenuity.</span>
          </h2>
        </div>

        <div className="gb-sec-cols">
          <p className="gb-body-text">
            The Globtek wordmark pairs a bold sans-serif with a kinetic globe mark — the
            &lsquo;o&rsquo; in Globtek replaced by a symbol that references both global reach
            and the fluid, dynamic nature of marine environments. The tagline{" "}
            <em>Applied Ingenuity</em> positions the brand at the intersection of expertise
            and innovation.
          </p>
          <p className="gb-body-text" style={{ marginTop: 16 }}>
            The identity works across all contexts the business operates in: vehicle livery
            at motorway speed, A4 letterhead in a boardroom, and a website header on a
            phone screen at a port.
          </p>
        </div>

        <div className="gb-logo-grid">
          <div className="gb-ph gb-ph-dark gb-ph-tall">
            <div className="gb-ph-inner">
              <img
                src={globtekLogoOnDark.src}
                alt=""
                className="gb-logo-img gb-logo-img-dark"
              />
              <span>Wordmark — on dark</span>
            </div>
          </div>
          <div className="gb-ph gb-ph-light gb-ph-tall">
            <div className="gb-ph-inner">
              <img
                src={globtekLogoColour.src}
                alt=""
                className="gb-logo-img gb-logo-img-light"
              />
              <span>Wordmark — colour</span>
            </div>
          </div>
          <div className="gb-ph gb-ph-red gb-ph-tall">
            <div className="gb-ph-inner">
              <img
                src={globtekLogoGrey.src}
                alt=""
                className="gb-logo-img gb-logo-img-red"
              />
              <span>Wordmark — greyscale</span>
            </div>
          </div>
        </div>

        <div className="gb-logo-grid gb-mt-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="gb-ph" style={{ minHeight: 160 }}>
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">o</div>
              <span>Globe mark — standalone icon</span>
            </div>
          </div>
          <div className="gb-ph gb-ph-dark" style={{ minHeight: 160 }}>
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">#</div>
              <span>Globtek Rail — sub-brand lockup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 BRAND SYSTEM */}
      <section className="gb-section" id="brand-system">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">02 — Brand System</span>
          <h2 className="gb-sec-title">
            The system.
            <br />
            <span className="gb-sec-title-accent">Built to scale.</span>
          </h2>
        </div>

        <p className="gb-body-text gb-mt-0" style={{ maxWidth: 640 }}>
          The brand system establishes the rules that keep every touchpoint consistent —
          colour, typography, the wave motif, spacing, and tone. Documented in a guidelines
          set that the Globtek team can hand to any supplier and get consistent output.
        </p>

        {/* Colour palette */}
        <div className="gb-colour-row">
          <div className="gb-swatch" style={{ background: "#e43d30" }}>
            <span className="gb-sw-label">Globtek Red<br />#E43D30</span>
          </div>
          <div className="gb-swatch" style={{ background: "#1a1a2e" }}>
            <span className="gb-sw-label">Deep Navy<br />#1A1A2E</span>
          </div>
          <div className="gb-swatch" style={{ background: "#f5f5f5", color: "#1a1a2e" }}>
            <span className="gb-sw-label" style={{ color: "#1a1a2e" }}>Off-White<br />#F5F5F5</span>
          </div>
          <div className="gb-swatch" style={{ background: "#111111" }}>
            <span className="gb-sw-label">Charcoal<br />#111111</span>
          </div>
          <div className="gb-swatch" style={{ background: "rgba(228,61,48,.35)" }}>
            <span className="gb-sw-label">Red 35%<br />Tint</span>
          </div>
        </div>

        {/* Type specimen placeholder */}
        <div className="gb-type-spec">
          <div className="gb-ph gb-ph-dark" style={{ minHeight: 200 }}>
            <div className="gb-ph-inner">
              <div className="gb-ph-icon" style={{ fontSize: 32 }}>
                Aa
              </div>
              <span>Typography specimen — display + body + mono</span>
            </div>
          </div>
        </div>

        {/* Wave motif / pattern placeholders */}
        <div className="gb-brand-ph-grid">
          <div className="gb-ph gb-ph-dark" style={{ minHeight: 220 }}>
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">~</div>
              <span>Wave motif — brand pattern</span>
            </div>
          </div>
          {mug ? (
            <div className="gb-ph gb-ph-dark" style={{ minHeight: 220 }}>
              <div className="gb-ph-inner">
                <img src={mug.src} alt="" className="gb-ph-media" />
                <span>Merch mockup — mug</span>
              </div>
            </div>
          ) : (
            <div className="gb-ph gb-ph-dark" style={{ minHeight: 220 }}>
              <div className="gb-ph-inner">
                <div className="gb-ph-icon">||</div>
                <span>Brand guidelines spread</span>
              </div>
            </div>
          )}
          <div className="gb-ph gb-ph-dark" style={{ minHeight: 220 }}>
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">||</div>
              <span>Brand guidelines spread</span>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE BRANDING */}
      <section className="gb-section" id="fleet">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">03 — Vehicle Branding</span>
          <h2 className="gb-sec-title">
            Fleet identity.
            <br />
            <span className="gb-sec-title-accent">Moving billboard.</span>
          </h2>
        </div>

        {vehicle ? (
          <>
            <p className="gb-body-text" style={{ maxWidth: 640 }}>
              The fleet wrap applies the Globtek wave motif across vehicle models
              — designed for maximum road presence while staying true to the brand
              identity.
            </p>

            <WorkGlobtekVehicleBrandingTabs vehicle={vehicle} />

            {/* COLLATERAL (included inside 03 like globtek-branding-3.html) */}
            <div className="gb-sec-subheader gb-mt-6">
              <span className="gb-sec-eyebrow">Collateral</span>
              <h3 className="gb-sub-title">
                Event gazebo.
                <br />
                <span className="gb-sub-title-accent">Two colourways.</span>
              </h3>
            </div>

            {outdoor ? (
              <div className="gb-img-grid-2 gb-mt-3">
                <div className="gb-img-item">
                  <img src={outdoor.gazebo1.src} alt="" />
                  <div className="gb-img-cap">Black colourway</div>
                </div>
                <div className="gb-img-item">
                  <img src={outdoor.gazebo2.src} alt="" />
                  <div className="gb-img-cap">Red colourway</div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </section>

      {/* DOCUMENTS / PROFILES */}
      <section className="gb-section gb-mt-6" id="documents">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">04 — Documents</span>
          <h2 className="gb-sec-title">
            Profiles &amp; credentials.
            <br />
            <span className="gb-sec-title-accent">Credentials that close.</span>
          </h2>
        </div>

        <p className="gb-body-text">
          Company profile and rail division credentials mockups, built to align with the same brand rules across formats.
        </p>

        {profiles ? (
          <div className="gb-img-grid-2 gb-mt-3">
            <div className="gb-img-item gb-img-item-padded">
              <img src={profiles.profiles.src} alt="" />
              <div className="gb-img-cap">Company profile</div>
            </div>
            <div className="gb-img-item gb-img-item-padded">
              <img src={profiles.railProfile.src} alt="" />
              <div className="gb-img-cap">Rail division profile</div>
            </div>
          </div>
        ) : null}
      </section>

      {/* STATIONERY */}
      <section className="gb-section gb-mt-6" id="stationery">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">05 — Stationery</span>
          <h2 className="gb-sec-title">
            Every touchpoint.
            <br />
            <span className="gb-sec-title-accent">Letterhead to lanyard.</span>
          </h2>
        </div>

        <p className="gb-body-text" style={{ maxWidth: 640 }}>
          The stationery suite carries the Globtek identity into every professional
          interaction — from the first letter a client receives to the business card
          handed across a table at a port authority meeting.
        </p>

        <div className="gb-img-grid-2" style={{ marginTop: 16 }}>
          <div className="gb-ph gb-ph-dark gb-ph-media-full-tile">
            <div className="gb-ph-inner gb-ph-inner-media-full">
              {stationery?.diaries ? (
                <>
                  <img
                    src={stationery.diaries.src}
                    alt=""
                    className="gb-ph-media gb-ph-media-full"
                  />
                  <span>Stationery diary mockup</span>
                </>
              ) : (
                <>
                  <div className="gb-ph-icon">▤</div>
                  <span>Letterhead &amp; compliment slip</span>
                </>
              )}
            </div>
          </div>
          <div className="gb-ph gb-ph-dark gb-ph-tall">
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">■</div>
              <span>Business cards — front &amp; back</span>
            </div>
          </div>
        </div>

        <div className="gb-brand-ph-grid">
          <div className="gb-ph gb-ph-dark">
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">■</div>
              <span>Email signature</span>
            </div>
          </div>
          <div className="gb-ph gb-ph-dark">
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">■</div>
              <span>Branded envelope</span>
            </div>
          </div>
          <div className="gb-ph gb-ph-dark">
            <div className="gb-ph-inner">
              <div className="gb-ph-icon">■</div>
              <span>ID lanyard / staff ID card</span>
            </div>
          </div>
        </div>
      </section>

      {/* WEBSITE */}
      <section className="gb-section gb-mt-6" id="website">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">06 — Website</span>
          <h2 className="gb-sec-title">
            Credentials-led.
            <br />
            <span className="gb-sec-title-accent">Built to convert.</span>
          </h2>
        </div>

        <p className="gb-body-text">
          A business development tool first — structured around service divisions with a mega-menu that makes complex portfolios immediately navigable.
        </p>

        {website ? (
          <>
            {/* WEBSITE — laptop mockups */}
            <div className="gb-laptop-wrap">
              <div className="gb-laptop-frame">
                <div className="gb-laptop-screen gb-laptop-screen-scroll">
                  <img
                    src={website.homepage.src}
                    alt=""
                    className="gb-laptop-screen-img gb-laptop-screen-img-scroll"
                  />
                </div>
                <img
                  src={laptopMockup.src}
                  alt=""
                  className="gb-laptop-mockup"
                />
              </div>
            </div>

            <div className="gb-img-grid-2 gb-mt-3">
              <div className="gb-laptop-mini">
                <div className="gb-laptop-frame gb-laptop-frame-mini">
                  <div className="gb-laptop-screen">
                    <img
                      src={website.megaMenu.src}
                      alt=""
                      className="gb-laptop-screen-img"
                    />
                  </div>
                  <img
                    src={laptopMockup.src}
                    alt=""
                    className="gb-laptop-mockup"
                  />
                </div>
              </div>

              <div className="gb-laptop-mini">
                <div className="gb-laptop-frame gb-laptop-frame-mini">
                  <div className="gb-laptop-screen">
                    <img
                      src={website.railInfra.src}
                      alt=""
                      className="gb-laptop-screen-img"
                    />
                  </div>
                  <img
                    src={laptopMockup.src}
                    alt=""
                    className="gb-laptop-mockup"
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>

      {/* RELATED */}
      {relatedProjects.length ? (
        <section className="related gb-related">
          <div className="related-header">
            <span className="related-eyebrow">More work</span>
            <h2 className="related-title">Related projects</h2>
          </div>

          <div className="related-grid">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

