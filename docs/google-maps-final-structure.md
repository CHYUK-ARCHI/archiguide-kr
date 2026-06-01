# Google Maps Final Structure

## Decision

Archiguide KR uses Google Maps as the single map engine for both Korean and English experiences.

We do not split providers by language.

## Why this is the final direction

- One map SDK keeps the app simpler than mixing Kakao, Naver, and OSM stacks.
- The project needs custom archive data more than it needs provider-specific base map behavior.
- Building names, architect names, filters, awards, and descriptions are controlled by our own data layer, so bilingual support is handled at the product layer rather than by the basemap alone.
- Google Maps already covers the required core features:
  - interactive map
  - markers
  - info windows
  - viewport fitting
  - optional places and geocoding expansion later

## Product rule

- Basemap: Google Maps
- UI language: controlled by `language-provider`
- Archive labels and metadata: controlled by Archiguide KR data
- Marker and detail card copy: localized by our app

## Architecture

```text
app/map/page.tsx
  -> components/map-explorer.tsx
    -> components/google-map-panel.tsx
      -> Google Maps JS API loader
      -> Marker rendering
      -> InfoWindow rendering

lib/site-data.ts
  -> building coordinates
  -> localized names and summaries
  -> filters and linked metadata
```

## Responsibilities

### `components/google-map-panel.tsx`

- Loads the Google Maps JavaScript API once
- Uses the current app language when requesting the script
- Renders map, markers, and selected state
- Opens an info window using localized building data

### `components/map-explorer.tsx`

- Owns filtering and list-to-map interaction
- Chooses which building is selected
- Sends filtered building records to the map panel

### `lib/site-data.ts`

- Holds archive coordinates
- Holds localized building labels and summaries
- Remains map-provider agnostic

## Environment

Required:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

Optional:

```env
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=...
```

## Security rule

The browser key is not treated as secret. It must be protected with referrer restrictions and API restrictions.

Recommended referrers:

- `http://localhost:3000/*`
- `https://chyuk-archi.github.io/*`

Recommended API restriction:

- `Maps JavaScript API`

## Future extensions

- Marker clustering
- Place search enrichment
- Building detail route integration
- Award overlays
- Curated architectural tours

## Non-goals for now

- Separate provider by language
- Provider switching UI
- Self-hosted OSM tile stack
- Kakao/Naver dual maintenance
