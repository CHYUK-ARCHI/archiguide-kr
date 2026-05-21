import { BuildingCatalog } from "@/components/building-catalog";
import { PageShell } from "@/components/page-shell";
import {
  architectNameMap,
  buildings,
  siteStats,
  typeSummaries
} from "@/lib/site-data";

export default function BuildingsPage() {
  const cities = Array.from(new Set(buildings.map((building) => building.city)));
  const types = typeSummaries.map((summary) => summary.type);

  return (
    <PageShell active="buildings">
      <section className="page-head">
        <p className="eyebrow">Primary archive</p>
        <h1 className="page-title">buildings</h1>
        <p className="page-intro">
          Projects remain the clearest doorway into the guide. This list keeps the
          archive readable at a glance while still allowing city and type filtering
          from the top.
        </p>
        <p className="page-footnote">
          {siteStats.buildings} entries across {siteStats.cities} cities and{" "}
          {siteStats.types} types.
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
