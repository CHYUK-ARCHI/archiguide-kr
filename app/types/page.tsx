import { PageShell } from "@/components/page-shell";
import { typeSummaries } from "@/lib/site-data";

export default function TypesPage() {
  return (
    <PageShell active="types">
      <section className="page-head">
        <p className="eyebrow">Building types</p>
        <h1 className="page-title">Treat program as a lens, not just metadata.</h1>
        <p className="page-intro">
          The original site makes building type a first-class path. That is worth preserving because type reveals how different architects solve similar public or spatial problems.
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
