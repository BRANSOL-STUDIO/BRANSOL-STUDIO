import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkCaseStudy } from "@/lib/work-case-studies";
import type { WorkProject } from "@/lib/work-projects";
import { ProjectCard } from "@/components/site/ProjectCard";

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

        <p className="gb-body-text">
          The fleet wrap applies the Globtek wave motif across vehicle models — designed for maximum road presence while staying true to the brand identity.
        </p>

        {vehicle ? (
          <>
            <div className="gb-img-grid-2">
              <div className="gb-img-item">
                <img src={vehicle.left.src} alt="" />
                <div className="gb-img-cap">BT-50 · Left side</div>
              </div>
              <div className="gb-img-item">
                <img src={vehicle.right.src} alt="" />
                <div className="gb-img-cap">BT-50 · Right side</div>
              </div>
            </div>

            <div className="gb-img-grid-2 gb-mt-3">
              <div className="gb-img-item">
                <img src={vehicle.front.src} alt="" />
                <div className="gb-img-cap">BT-50 · Front 3/4</div>
              </div>
              <div className="gb-img-item">
                <img src={vehicle.back.src} alt="" />
                <div className="gb-img-cap">BT-50 · Rear 3/4</div>
              </div>
            </div>

            <div className="gb-img-contained gb-mt-3">
              <img src={vehicle.polo.src} alt="" />
              <div className="gb-img-cap">Polo · Full wrap</div>
            </div>
          </>
        ) : null}
      </section>

      {/* OUTDOOR / EVENT */}
      <section className="gb-section gb-mt-6" id="outdoor">
        <div className="gb-sec-header">
          <span className="gb-sec-eyebrow">Outdoor Collateral</span>
          <h2 className="gb-sec-title">
            Two colourways.
            <br />
            <span className="gb-sec-title-accent">Same system, two moods.</span>
          </h2>
        </div>

        <p className="gb-body-text">
          Event and environmental applications keep the brand consistent across real-world daylight, materials, and visibility requirements.
        </p>

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
            <div className="gb-web-frame">
              <div className="gb-web-bar">
                <div className="gb-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="gb-url">globtek.co.za</div>
              </div>
              <img src={website.homepage.src} alt="" />
            </div>

            <div className="gb-img-grid-2 gb-mt-3">
              <div className="gb-web-frame gb-web-frame-sm">
                <div className="gb-web-bar gb-web-bar-sm">
                  <div className="gb-dots gb-dots-sm">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="gb-url gb-url-sm">Mega menu</div>
                </div>
                <img src={website.megaMenu.src} alt="" />
              </div>
              <div className="gb-web-frame gb-web-frame-sm">
                <div className="gb-web-bar gb-web-bar-sm">
                  <div className="gb-dots gb-dots-sm">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="gb-url gb-url-sm">Rail infrastructure</div>
                </div>
                <img src={website.railInfra.src} alt="" />
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

