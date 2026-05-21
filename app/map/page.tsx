import { MapExplorer } from "@/components/map-explorer";
import { PageShell } from "@/components/page-shell";
import { buildings, cityOptions, typeOptions } from "@/lib/site-data";

export default function MapPage() {
  return (
    <PageShell active="map">
      <section className="page-head">
        <p className="eyebrow">Map</p>
        <h1 className="page-title">Google Maps as the geographic reading layer.</h1>
        <p className="page-intro">
          The Dutch reference emphasizes category browsing. This map adds the missing geographic layer so Korean architecture can also be read by proximity, coast, district, and regional cluster.
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
