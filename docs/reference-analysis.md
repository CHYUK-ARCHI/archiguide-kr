# Reference Analysis

Analyzed on `2026-05-21`

Reference page:
`https://www.architectuurgids.nl/page/home`

## What The Homepage Is Doing Well

- It behaves like an archive entrance, not a generic brand homepage.
- The left rail is the real product: architects, buildings, building types, cities, map, top lists, recent additions, and advanced search are all visible immediately.
- Category counts are exposed directly in the navigation.
- A large rotating project sequence gives the archive a visual front door.
- Secondary editorial material appears below the main entry sequence, including architecture-guide books.

## Concrete Signals Found In The HTML

- The main navigation exposes:
  `ARCHITECTEN (2619)`, `GEBOUWEN (2259)`, `GEBOUWTYPEN (35)`, `STEDEN (704)`, `KAART (2259)`, `TOP 10`, `TOP 100`, `RECENT TOEGEVOEGD`, `UITGEBREID ZOEKEN`
- The homepage hero copy is a direct welcome message instead of a marketing slogan.
- The featured sequence contains `25` slide items.
- The slide rotation advances every `7000ms`.
- The lower section promotes related books as another access point into the archive.

## Weaknesses Worth Avoiding

- The layout relies on table structure and fixed pixel widths.
- Mobile usability is weak; the original page overflows narrow viewports.
- The page depends on older scripts and a relatively brittle slideshow implementation.
- The visual language is functional but dated, with limited hierarchy and very little responsive adaptation.
- Accessibility is uneven, especially around images and mobile layout behavior.

## Translation Decisions For Archiguide KR

- Keep the persistent left navigation as a core product pattern.
- Keep database-first browsing with explicit category counts.
- Keep a featured project sequence on the homepage, but modernize the controls and readability.
- Replace fixed widths with a responsive grid and a mobile-safe stack.
- Replace the bottom “books” block with expandable editorial routes and future curation modules.
- Use Korean-first copy and categories while keeping room for a bilingual layer later.

## Initial Product Structure

- Home: editorial entry plus featured sequence
- Buildings: primary browsing surface
- Architects: authorship-based browsing
- Types: programmatic browsing
- Cities: regional browsing
- About/Method: reference translation and product principles

## Why This Reference Matters

The Dutch site is valuable because it treats architecture as a browsable knowledge system. The goal for `archiguide-kr` is to preserve that system logic while rebuilding the interface for contemporary reading, mobile usage, and future data growth.
