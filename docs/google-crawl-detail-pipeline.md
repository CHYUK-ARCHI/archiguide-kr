# Google Map, Crawl, and Detail Pipeline

Updated on `2026-06-02`

## Runtime APIs

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- optional `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`

These power the browser-side map only.

## Ingest API

- `GOOGLE_GEOCODING_API_KEY`

This key is for local or CI ingest steps, not for client-side runtime use.

## Pipeline

1. Capture a source page into `data/raw/...`
2. Normalize project records into `data/normalized/...`
3. Batch geocode addresses with Google Geocoding API
4. Export a portable app seed into `data/seeds/archive-content.json`
5. Let the app read the same normalized fields for map markers and building detail pages

## Commands

```bash
npm run ingest:capture -- --url "https://example.com/project" --bucket young-architect-award --slug sample-project
npm run ingest:geocode
npm run ingest:export
```

## Notes

- Marker rendering must use stored coordinates only.
- Unclear addresses should stay in the geocode review queue.
- Original images should only be cached from approved or clearly allowed sources.
- If no approved image exists, the app falls back to a placeholder visual.
