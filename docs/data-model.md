# Data Model

Updated on `2026-06-01`

## Data Philosophy

The archive should separate:

- source collection
- normalized records
- app-ready seed data

This keeps the project maintainable when sources expand beyond the first curated set.

## Folder Tree

```text
data/
├─ raw/
│  ├─ young-architect-award/
│  ├─ korean-architects/
│  └─ international-architects/
├─ normalized/
│  ├─ architects/
│  ├─ buildings/
│  ├─ offices/
│  ├─ awards/
│  └─ relations/
└─ seeds/
   ├─ architects.seed.json
   ├─ buildings.seed.json
   ├─ awards.seed.json
   └─ offices.seed.json
```

## Entity Overview

### `architect`

One person.

Key fields:

- `id`
- `name_ko`
- `name_en`
- `country_code`
- `scope`
- `office_ids`
- `bio_ko`
- `bio_en`
- `source_refs`

`scope` should currently be one of:

- `korean`
- `international`

### `office`

One studio or practice.

Key fields:

- `id`
- `name_ko`
- `name_en`
- `country_code`
- `city_ko`
- `city_en`
- `founded_year`
- `website`
- `source_refs`

### `building`

One project or building entry.

Key fields:

- `id`
- `slug`
- `title_ko`
- `title_en`
- `country_code`
- `city_ko`
- `city_en`
- `district_ko`
- `district_en`
- `program_ko`
- `program_en`
- `status_ko`
- `status_en`
- `year`
- `completion_year`
- `architect_ids`
- `office_ids`
- `summary_ko`
- `summary_en`
- `highlight_ko`
- `highlight_en`
- `address_ko`
- `address_en`
- `coordinates`
- `images`
- `source_refs`

### `award`

One award program, award result, or specific recognition record.

Key fields:

- `id`
- `name_ko`
- `name_en`
- `organizer`
- `award_year`
- `category_ko`
- `category_en`
- `result_ko`
- `result_en`
- `source_refs`

### `award_program`

One tracked award program in the baseline catalog.

Key fields:

- `id`
- `slug`
- `name_ko`
- `name_en_working`
- `scope`
- `collection_unit`
- `priority`

### `relations`

These keep the model flexible.

- `architect_building`
- `office_building`
- `building_award`

## Display Rules

- Buildings are the primary archive surface.
- Awards are secondary metadata attached to buildings or architects.
- `scope` determines whether an architect appears under Korean or international browsing.
- The same building can be connected to more than one architect and more than one office.

## Initial Acquisition Rule

For the first dataset batch:

- all entries come from the Young Architect Award orbit
- only verified projects should enter `normalized`
- unverified scraped or hand-copied notes should remain in `raw`

## Suggested Pipeline

1. Save source pages or manually captured notes into `data/raw/...`
2. Normalize names, cities, offices, and project titles into `data/normalized/...`
3. Export a stable subset into `data/seeds/...` for the app

## Year-First Award Structure

Award intake should now be organized with:

- `award program catalog`
- `yearly coverage file`
- `award result records`
- `building award relations`

Recommended normalized award layout:

```text
normalized/awards/
├─ award-programs.json
├─ yearly-template.json
├─ yearly-coverage/
│  ├─ 2025.json
│  ├─ 2024.json
│  └─ ...
└─ ...
```

The yearly coverage file should answer:

- which awards are tracked in that year
- which are already collected
- which are partial
- which are still planned

## Notes About Awards

The user direction is explicit:

- awards must not define the information architecture
- awards should become detail metadata

So the archive should browse:

- project first
- architect second
- award third

not:

- award first
