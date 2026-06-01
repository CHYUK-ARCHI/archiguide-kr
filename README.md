# Archiguide KR

`archiguide-kr` is a modern Korean architecture guide prototype shaped by the information architecture of [architectuurgids.nl](https://www.architectuurgids.nl/page/home), but rebuilt for contemporary browsing, mobile layouts, and future dataset expansion.

## What Is Included

- A Next.js 14 + TypeScript scaffold
- A left-rail navigation model inspired by the Dutch reference
- A featured-project carousel for editorial entry points
- A Google Maps-ready geography view
- An advanced search screen aligned to public-data facets
- Dedicated routes for buildings, architects, cities, types, map, search, and methodology
- Seed data that validates the information architecture without pretending to be a finished archive
- A normalized Korean architecture data schema informed by official public datasets

## Routes

- `/` home and curated entry
- `/buildings` searchable building catalog
- `/architects` architect directory
- `/cities` city-based browsing
- `/types` building-type browsing
- `/map` Google Maps-based geography view
- `/search` advanced faceted search
- `/about` product intent and reference translation

## Run Locally

```bash
npm install
npm run dev
```

## Environment

Create a local environment file from `.env.example` and set:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` (optional, defaults to `DEMO_MAP_ID`)

## Deployment

The repository is configured for GitHub Pages deployment through GitHub Actions.

- Expected project site URL:
  `https://chyuk-archi.github.io/archiguide-kr/`
- Source branch:
  `main`
- Published Pages branch:
  `gh-pages`
- To enable the live Google map on the deployed site, add a repository secret:
  `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Optionally add a repository variable:
  `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`

## Notes

- The current content is pilot data for layout and product validation.
- The reference analysis that informed this scaffold is documented in [docs/reference-analysis.md](./docs/reference-analysis.md).
- The normalized Korean architecture data model is documented in [docs/korean-architecture-data-schema.md](./docs/korean-architecture-data-schema.md).
- The revised product direction is documented in [docs/product-direction.md](./docs/product-direction.md).
- The revised black-on-white archive design rules are documented in [docs/design-guidelines.md](./docs/design-guidelines.md).
- The new archive DB structure is documented in [docs/data-model.md](./docs/data-model.md).
- The unified yearly award intake rules are documented in [docs/award-yearly-collection-rules.md](./docs/award-yearly-collection-rules.md).
- The first structured acquisition batch is documented in [docs/initial-dataset-young-architect-award.md](./docs/initial-dataset-young-architect-award.md).
- The next logical step is replacing seed data with a structured content source and adding map/search indexing.
