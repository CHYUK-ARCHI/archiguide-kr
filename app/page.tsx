import Link from "next/link";

import { FeaturedCarousel } from "@/components/featured-carousel";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  collections,
  focusPrinciples,
  siteStats
} from "@/lib/site-data";

const browseLinks = [
  {
    href: "/buildings",
    label: "Buildings",
    count: siteStats.buildings,
    text: "Browse entries by city, type, material, and architectural intent."
  },
  {
    href: "/architects",
    label: "Architects",
    count: siteStats.architects,
    text: "Track how offices and authors recur across different regions and programs."
  },
  {
    href: "/types",
    label: "Types",
    count: siteStats.types,
    text: "Study how housing, archives, libraries, and civic halls behave as categories."
  },
  {
    href: "/cities",
    label: "Cities",
    count: siteStats.cities,
    text: "Read projects through local contexts instead of treating the archive as placeless."
  },
  {
    href: "/map",
    label: "Map",
    count: siteStats.buildings,
    text: "Place entries on a Google-powered map with WGS84-ready coordinates."
  },
  {
    href: "/search",
    label: "Search",
    count: siteStats.buildings,
    text: "Use advanced filters based on structure, access, heritage, and source system."
  }
];

const homeStats = [
  {
    label: "Pilot buildings",
    value: String(siteStats.buildings).padStart(2, "0")
  },
  {
    label: "Architect practices",
    value: String(siteStats.architects).padStart(2, "0")
  },
  {
    label: "Regional city nodes",
    value: String(siteStats.cities).padStart(2, "0")
  }
];

export default function HomePage() {
  return (
    <PageShell active="home">
      <section className="hero-grid">
        <div className="panel panel--hero">
          <p className="eyebrow">Modern guide prototype</p>
          <h1 className="page-title">
            A Korean architecture guide built as a browsing system, not just a landing page.
          </h1>
          <p className="page-intro">
            The reference site succeeds because it opens with structure: categories, counts, and a rotating sequence of representative projects. This version keeps that editorial logic and translates it into a responsive, extensible product for Korean architecture.
          </p>
          <div className="button-row">
            <Link className="button button--solid" href="/buildings">
              Start with buildings
            </Link>
            <Link className="button button--ghost" href="/about">
              Read the method
            </Link>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Why this shape works</p>
          <div className="stat-strip">
            {homeStats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="panel-copy">
            Instead of copying the original page literally, the goal is to preserve its strengths: immediate orientation, database-first discovery, and a sense that each project belongs to a larger field of relationships.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured projects</p>
            <h2>Editorial entry through a rotating sequence</h2>
          </div>
          <p className="section-heading__copy">
            The original homepage relies on a long-running image sequence. Here, the featured rail becomes a cleaner, more legible way into the archive.
          </p>
        </div>

        <FeaturedCarousel
          buildings={buildings.slice(0, 5)}
          architectNameMap={architectNameMap}
        />
      </section>

      <section className="browse-grid browse-grid--expanded">
        {browseLinks.map((item) => (
          <Link key={item.href} href={item.href} className="browse-card">
            <div className="browse-card__top">
              <span className="browse-card__count">{item.count}</span>
              <span className="browse-card__label">{item.label}</span>
            </div>
            <p>{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated routes</p>
              <h2>Editorial groupings for guided reading</h2>
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
              <p className="eyebrow">Translation principles</p>
              <h2>What we kept from the Dutch guide</h2>
            </div>
          </div>

          <div className="stack-list">
            {focusPrinciples.map((principle) => (
              <article key={principle} className="principle-card">
                <p>{principle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
