# Map Structure (OpenStreetMap)

## Decision

Archiguide KR uses OpenStreetMap tiles rendered with Leaflet as the single map engine for both Korean and English experiences.
This replaces the earlier Google Maps decision. No API key or billing account is required.

## Components

```
app/map, app/search, app/architects/young-architect-award
  -> components/osm-map-panel.tsx   (building markers, popups, selection card)
  -> lib/leaflet-loader.ts          (loads Leaflet once, exports tile URL and attribution)
```

- Leaflet 1.9.4 is loaded from unpkg with a pinned version and SRI hashes; it is not bundled.
- Markers are `circleMarker` (building pages) or `divIcon` with the `.award-pin` style (Young Architect Award page).
- Popup content is escaped or built with `textContent`; do not inject raw record strings as HTML.

## OSM tile usage rules (keep these)

- Always show the attribution `© OpenStreetMap contributors` (Leaflet's attribution control does this; do not hide it).
- Use only `https://tile.openstreetmap.org/{z}/{x}/{y}.png` for light, human-driven browsing. No bulk download, no pre-caching, no scraping.
- Keep the default HTTP Referer; do not strip it.
- If traffic grows beyond modest use, move to a hosted tile provider or a self-hosted stack, per the OSM Tile Usage Policy.

## Language

- UI language: controlled by `language-provider`
- Archive labels and metadata: controlled by Archiguide KR data
- Base map labels are whatever OSM renders (local names); they are not switched by UI language.

## Not changed

- `scripts/ingest/geocode-buildings.mjs` still uses the Google Geocoding API (`GOOGLE_GEOCODING_API_KEY`) at build-prep time only.
  Replacing it with Nominatim is a separate decision (Nominatim policy: max 1 request/second, identifying User-Agent).
