# Award Yearly Collection Rules

Updated on `2026-06-01`

## Goal

Award data should be collected by `year` first and by `award program` second.

This keeps the archive consistent when multiple award programs are collected in parallel for the same year.

## Why Year First

- architects usually browse recent work in year clusters
- multiple award programs often overlap around the same period
- yearly collection is easier to audit and maintain
- the same building can appear in more than one award context

## Core Principle

The archive does **not** browse by award first.

Awards are:

- supporting metadata
- validation signals
- curation hints

not the main entrance.

Primary browse surfaces remain:

- buildings
- architects
- offices
- Korean architects
- international architects
- cities
- types

## Standard Collection Unit

The standard collection unit is:

- `one year`
- `all tracked award programs for that year`

Example:

- `2025`: collect all tracked awards
- `2024`: collect all tracked awards

## Tracked Award Programs

The current tracked list comes from the user's direction and should be treated as the baseline catalog:

- 한국건축문화대상
- 한국건축전
- 대한민국신진건축사대상
- 대한민국공공건축상
- 대한민국 한옥공모전
- 대한민국 녹색건축대전
- 한국건축가협회상
- 김수근건축상
- 서울특별시건축상
- 부산다운건축상
- 경기도 건축문화상
- 울산광역시 건축상

## One Record Means

For each `year + award program` pair, collection should attempt to capture:

- award result metadata
- awarded architect or office
- associated building or project
- project year if available
- source links
- verification status

## Recommended Intake Sequence

1. Choose a target year
2. Create or update the yearly coverage file
3. For each tracked award in that year:
   - locate official source
   - locate secondary supporting source if needed
   - capture winners or selected works
   - connect architects, offices, and buildings
4. Normalize into entity files
5. Attach the award in relations so it can appear on building detail later

## Verification Levels

Each yearly award record should have one of these statuses:

- `planned`
- `in-progress`
- `verified`
- `partial`
- `blocked`

## Detail Display Rule

When a building is opened, it can show:

- award name
- award year
- result type

But award status should not dominate list pages or the homepage.

## Korean / International Split

The split between Korean and international architects should be driven by:

- architect scope
- office country
- project location if needed

Awards may help curation, but they should not define nationality grouping.

## Practical Rule

If a source only lists architects but not projects:

- store the award result first
- keep the building relation empty or pending
- do not fabricate a building

If a source lists a project but not complete coordinates:

- store the building anyway
- keep coordinates nullable

## Current Target

The immediate target is:

- define one unified yearly collection structure
- register all tracked award programs
- prepare `2025` as the first year-level collection frame
