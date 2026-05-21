import { ArchitectureArt } from "@/components/architecture-art";
import { PageShell } from "@/components/page-shell";
import { architects, getBuildingsForArchitect } from "@/lib/site-data";

export default function ArchitectsPage() {
  return (
    <PageShell active="architects">
      <section className="page-head">
        <p className="eyebrow">Architects</p>
        <h1 className="page-title">Read the archive through authorship and recurring attitudes.</h1>
        <p className="page-intro">
          Practices are useful not only as names but as threads. This directory begins to show which spatial ideas repeat across place, program, and material.
        </p>
      </section>

      <section className="card-grid">
        {architects.map((architect) => {
          const relatedBuildings = getBuildingsForArchitect(architect.slug);

          return (
            <article key={architect.slug} className="catalog-card">
              <ArchitectureArt
                title={architect.name}
                label={`${architect.city} / founded ${architect.founded}`}
                palette={architect.palette}
                mode="compact"
              />
              <div className="catalog-card__head">
                <p className="catalog-card__meta">{architect.city}</p>
                <h2 className="catalog-card__title">{architect.name}</h2>
              </div>
              <p className="stack-card__focus">{architect.focus}</p>
              <p className="catalog-card__summary">{architect.summary}</p>
              <dl className="detail-list">
                <div>
                  <dt>Founded</dt>
                  <dd>{architect.founded}</dd>
                </div>
                <div>
                  <dt>Linked entries</dt>
                  <dd>{relatedBuildings.length}</dd>
                </div>
                <div>
                  <dt>Sample projects</dt>
                  <dd>{relatedBuildings.map((building) => building.title).join(", ")}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>
    </PageShell>
  );
}
