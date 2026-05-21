import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell active="about">
      <section className="page-head">
        <p className="eyebrow">Archive note</p>
        <h1 className="page-title">method</h1>
        <p className="page-intro">
          Archiguide KR treats architecture as a navigable reading system. The
          archive is structured first, then extended through map, search, and
          public-data fields so the guide can grow without losing clarity.
        </p>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What is kept visible</p>
              <h2>Core archive rules</h2>
            </div>
          </div>
          <div className="stack-list">
            <article className="principle-card">
              <p>Buildings, architects, types, cities, map, and search remain separate entry routes.</p>
            </article>
            <article className="principle-card">
              <p>Counts and categories stay near the surface so the archive can be scanned quickly.</p>
            </article>
            <article className="principle-card">
              <p>The interface is restrained so the structure and the writing remain primary.</p>
            </article>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What is prepared</p>
              <h2>Future expansion</h2>
            </div>
          </div>
          <div className="stack-list">
            <article className="principle-card">
              <p>Google Maps is already wired for coordinate-based browsing and marker selection.</p>
            </article>
            <article className="principle-card">
              <p>Search fields align with Korean building-ledger, GIS, heritage, and tourism data structures.</p>
            </article>
            <article className="principle-card">
              <p>The seed dataset can be replaced gradually without rebuilding the interface foundation.</p>
            </article>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
