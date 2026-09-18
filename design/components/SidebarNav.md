# SidebarNav

**Group:** Navigation  
**Source:** `components/sidebar-nav.tsx`

320px fixed sidebar (collapses to top rail on mobile). Dark frame surface (`frame` = `#000`). Contains the AG pill mark, wordmark/tagline, primary nav links with counts, and EN/KR language toggle.

## Props

```ts
type NavKey = "home" | "buildings" | "architects" | "cities" | "types" | "map" | "search" | "about"
type SidebarNavProps = { active: NavKey }
```

## Usage

```tsx
import SidebarNav from "@/components/sidebar-nav"
<SidebarNav active="architects" />
```

## CSS classes (globals.css)

| Class | Role |
|---|---|
| `.site-header` | 320px fixed sidebar, `background: var(--frame)` |
| `.site-header__mark` | AG pill — `border-radius: 999px`, white bg |
| `.site-header__wordmark` | "archiguide" wordmark text |
| `.site-header__stack` | Nav link list |
| `.site-header__stack-link` | Individual nav link with count |

## Tokens used

`frame`, `ink-faint` (counts), `rule-inverse` (dividers), `paper-soft` (active state)
