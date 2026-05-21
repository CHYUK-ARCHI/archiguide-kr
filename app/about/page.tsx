import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell active="about">
      <section className="page-head">
        <p className="eyebrow">Method</p>
        <h1 className="page-title">Reference-led, not reference-copied.</h1>
        <p className="page-intro">
          The Dutch homepage is valuable because it is unapologetically a guide. It prioritizes orientation, category counts, and representative projects over generic branding. This prototype keeps that product logic while deliberately changing the visual system, layout behavior, and browsing quality.
        </p>
      </section>

      <section className="two-column">
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What was kept</p>
              <h2>Structural strengths</h2>
            </div>
          </div>
          <div className="stack-list">
            <article className="principle-card">
              <p>Persistent side navigation with direct access to architects, buildings, types, and cities.</p>
            </article>
            <article className="principle-card">
              <p>A homepage that behaves like an archive threshold instead of a marketing billboard.</p>
            </article>
            <article className="principle-card">
              <p>A rotating featured sequence that gives the archive an editorial face.</p>
            </article>
          </div>
        </article>

        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What changed</p>
              <h2>Necessary upgrades</h2>
            </div>
          </div>
          <div className="stack-list">
            <article className="principle-card">
              <p>Table layout and fixed widths were replaced with responsive grids and mobile-safe spacing.</p>
            </article>
            <article className="principle-card">
              <p>Old image rotation behavior was reworked into a cleaner, controllable carousel.</p>
            </article>
            <article className="principle-card">
              <p>The visual language was rebuilt around a contemporary editorial palette instead of direct imitation.</p>
            </article>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
