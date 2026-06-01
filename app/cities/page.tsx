import { PageShell } from "@/components/page-shell";
import { citySummaries } from "@/lib/site-data";

export default function CitiesPage() {
  return (
    <PageShell active="cities">
      <section className="page-head">
        <p className="eyebrow">Regional route / 도시</p>
        <h1 className="page-title">cities</h1>
        <p className="page-intro">
          도시는 건축 해석을 즉시 바꾸는 기준입니다. 이 페이지는 장소감을 먼저
          드러내는 도시별 입구를 제공합니다.
        </p>
      </section>

      <section className="directory-list">
        {citySummaries.map((summary) => (
          <article key={summary.city} className="directory-row">
            <div className="directory-row__count">
              {String(summary.buildingCount).padStart(2, "0")}
            </div>
            <div className="directory-row__title">
              <h2>{summary.city}</h2>
              <p>{summary.lead.district} district lead</p>
            </div>
            <div className="directory-row__summary">
              <p>{summary.note}</p>
            </div>
            <div className="directory-row__meta">
              <span>{summary.lead.title}</span>
              <span>{summary.types.join(", ")}</span>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
