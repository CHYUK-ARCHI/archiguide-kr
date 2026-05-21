import { PageShell } from "@/components/page-shell";
import { typeSummaries } from "@/lib/site-data";

export default function TypesPage() {
  return (
    <PageShell active="types">
      <section className="page-head">
        <p className="eyebrow">Program route</p>
        <h1 className="page-title">types</h1>
        <p className="page-intro">
          Building type works as a lens rather than background metadata. This page
          groups projects by program so similar public or spatial problems can be
          read together.
        </p>
      </section>

      <section className="card-grid">
        {typeSummaries.map((summary) => (
          <article key={summary.type} className="catalog-card">
            <div className="city-card__top">
              <span className="city-card__count">{summary.buildingCount}</span>
              <h2 className="catalog-card__title">{summary.type}</h2>
            </div>
            <p className="catalog-card__summary">{summary.note}</p>
            <dl className="detail-list">
              <div>
                <dt>Lead entry</dt>
                <dd>{summary.lead.title}</dd>
              </div>
              <div>
                <dt>Lead city</dt>
                <dd>{summary.lead.city}</dd>
              </div>
              <div>
                <dt>Cities</dt>
                <dd>{summary.cities.join(", ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
