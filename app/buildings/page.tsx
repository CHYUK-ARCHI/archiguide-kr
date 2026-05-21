import { BuildingCatalog } from "@/components/building-catalog";
import { PageShell } from "@/components/page-shell";
import { architectNameMap, buildings, siteStats, typeSummaries } from "@/lib/site-data";

export default function BuildingsPage() {
  const cities = Array.from(new Set(buildings.map((building) => building.city)));
  const types = typeSummaries.map((summary) => summary.type);

  return (
    <PageShell active="buildings">
      <section className="page-head">
        <p className="eyebrow">Buildings</p>
        <h1 className="page-title">Browse the archive through projects first.</h1>
        <p className="page-intro">
          The reference site opens quickly into buildings, and that remains the strongest doorway. This catalog keeps the same bias while making search and filtering cleaner for mobile and future scale.
        </p>
        <p className="page-footnote">
          {siteStats.buildings} pilot entries across {siteStats.cities} cities and {siteStats.types} building types.
        </p>
      </section>

      <BuildingCatalog
        buildings={buildings}
        architectNameMap={architectNameMap}
        cities={cities}
        types={types}
      />
    </PageShell>
  );
}
