import { PageShell } from "@/components/page-shell";
import { citySummaries } from "@/lib/site-data";

export default function CitiesPage() {
  return (
    <PageShell active="cities">
      <section className="page-head">
        <p className="eyebrow">Regional route</p>
        <h1 className="page-title">cities</h1>
        <p className="page-intro">
          Cities change the reading of architecture immediately. This route keeps
          regional context visible instead of treating the archive as a placeless
          list.
        </p>
      </section>

      <section className="card-grid">
        {citySummaries.map((summary) => (
          <article key={summary.city} className="catalog-card">
            <div className="city-card__top">
              <span className="city-card__count">{summary.buildingCount}</span>
              <h2 className="catalog-card__title">{summary.city}</h2>
            </div>
            <p className="catalog-card__summary">{summary.note}</p>
            <dl className="detail-list">
              <div>
                <dt>Lead entry</dt>
                <dd>{summary.lead.title}</dd>
              </div>
              <div>
                <dt>District</dt>
                <dd>{summary.lead.district}</dd>
              </div>
              <div>
                <dt>Types</dt>
                <dd>{summary.types.join(", ")}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
