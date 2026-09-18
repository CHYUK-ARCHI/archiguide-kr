# BuildingCatalog

**Group:** Content  
**Source:** `app/buildings/page.tsx` + `app/globals.css`

Grid view for browsing buildings with type/city filters and search. Switches between catalog grid (`.catalog-grid`) and archive list (`.archive-row`) modes.

## CSS classes

| Class | Role |
|---|---|
| `.catalog-grid` | 3-column responsive grid |
| `.catalog-card` | Individual card — sharp corners, hover tint |
| `.catalog-controls` | Filter bar — type, city selects + search field |
| `.archive-row` | List mode row |
| `.archive-row--catalog` | Catalog variant row |

## Tokens used

`paper`, `paper-soft` (hover), `rule`, `ink`, `ink-muted`, `ink-faint` (row numbers), `placeholder` (image bg)
