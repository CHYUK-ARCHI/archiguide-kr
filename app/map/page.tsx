import { MapExplorer } from "@/components/map-explorer";
import { PageShell } from "@/components/page-shell";
import { buildings, cityOptions, typeOptions } from "@/lib/site-data";

export default function MapPage() {
  return (
    <PageShell active="map">
      <section className="page-head">
        <p className="eyebrow">Geographic route</p>
        <h1 className="page-title">map</h1>
        <p className="page-intro">
          The map adds a geographic reading layer so the archive can be entered
          by district, city, and regional cluster as well as by name.
        </p>
      </section>

      <MapExplorer
        buildings={buildings}
        cityOptions={cityOptions}
        typeOptions={typeOptions}
      />
    </PageShell>
  );
}
