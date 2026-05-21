import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { buildings, collections, siteStats } from "@/lib/site-data";

const browseLinks = [
  {
    href: "/buildings",
    label: "Buildings",
    count: siteStats.buildings,
    text: "Move through the archive project by project, with city and type filtering ready from the first screen."
  },
  {
    href: "/architects",
    label: "Architects",
    count: siteStats.architects,
    text: "Trace recurring authorship, offices, and spatial attitudes across different programs."
  },
  {
    href: "/types",
    label: "Types",
    count: siteStats.types,
    text: "Read libraries, markets, housing, and civic spaces as categories with their own logic."
  },
  {
    href: "/cities",
    label: "Cities",
    count: siteStats.cities,
    text: "See how district, climate, and geography change the reading of architecture."
  },
  {
    href: "/map",
    label: "Map",
    count: siteStats.buildings,
    text: "Open the archive geographically through coordinates, markers, and regional clusters."
  },
  {
    href: "/search",
    label: "Search",
    count: siteStats.buildings,
    text: "Use a schema-based search layer for structure, heritage, access, and source data."
  }
];

const featuredBuildings = buildings.slice(0, 3);

export default function HomePage() {
  return (
    <PageShell active="home">
      <section className="home-hero">
        <h1 className="home-hero__title">
          a guide for reading
          <br />
          korean architecture
        </h1>
        <p className="home-hero__note">
          Browse buildings, architects, types, cities, map layers, and search as
          one connected archive.
        </p>
        <p className="home-hero__meta">pilot dataset / 2026</p>
      </section>

      <section className="manifesto-grid">
        <div className="manifesto-grid__lead">
          <p className="eyebrow">What this guide does</p>
          <h2>
            It turns Korean architecture into a browsable field, not a static
            showcase.
          </h2>
        </div>
        <div className="manifesto-grid__copy">
          <p>
            Archiguide KR starts from the idea that buildings make more sense when
            they are read next to one another. This pilot keeps the archive close
            to the surface: category routes stay visible, search is tied to real
            data fields, and projects can be entered through city, type, map, or
            author.
          </p>
          <p className="manifesto-grid__meta">
            {siteStats.buildings} buildings / {siteStats.architects} architects /{" "}
            {siteStats.cities} cities / {siteStats.types} types
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured buildings</p>
            <h2>Selected entries from the current archive</h2>
          </div>
        </div>

        <div className="archive-list">
          {featuredBuildings.map((building, index) => (
            <article
              key={building.slug}
              className="archive-row archive-row--feature"
            >
              <div className="archive-row__number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="archive-row__title">
                <p className="archive-row__kicker">
                  {[building.city, building.district].join(" / ")}
                </p>
                <h3 className="archive-row__name">{building.title}</h3>
                <p className="archive-row__minor">{building.type}</p>
              </div>
              <div className="archive-row__desc">
                <p>{building.summary}</p>
                <p className="archive-row__highlight">{building.highlight}</p>
              </div>
              <div className="archive-row__meta">
                <span>{building.year}</span>
                <span>{building.status}</span>
                <span>{building.primaryUseLabel}</span>
              </div>
              <div className="archive-row__media">
                <span>IMAGE</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Routes through the archive</p>
            <h2>Primary browsing paths</h2>
          </div>
        </div>

        <div className="browse-grid">
          {browseLinks.map((item) => (
            <Link key={item.href} href={item.href} className="browse-card">
              <div className="browse-card__top">
                <span className="browse-card__label">{item.label}</span>
                <span className="browse-card__count">
                  {String(item.count).padStart(2, "0")}
                </span>
              </div>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated routes</p>
              <h2>Editorial groupings</h2>
            </div>
          </div>

          <div className="stack-list">
            {collections.map((collection) => (
              <article key={collection.slug} className="stack-card">
                <div className="stack-card__top">
                  <h3>{collection.title}</h3>
                  <span>{collection.entries} entries</span>
                </div>
                <p className="stack-card__focus">{collection.focus}</p>
                <p>{collection.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Archive posture</p>
              <h2>What stays visible</h2>
            </div>
          </div>

          <div className="stack-list">
            <article className="principle-card">
              <p>The guide stays readable as a list, a field, and a map at the same time.</p>
            </article>
            <article className="principle-card">
              <p>Counts, categories, and routes remain visible instead of hiding behind a landing-page hero.</p>
            </article>
            <article className="principle-card">
              <p>The visual system is restrained so the archive structure and the writing carry most of the weight.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2>
          explore
          <br />
          the archive
        </h2>
        <Link href="/buildings" className="cta-link">
          <span>Buildings</span>
          <span className="cta-link__arrow">↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
