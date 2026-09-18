# Archiguide KR — Design System

**Source:** [CHYUK-ARCHI/archiguide-kr](https://github.com/CHYUK-ARCHI/archiguide-kr) · commit `a4b26ec`  
**Synced:** 2026-09-18  
**Stack:** Next.js 14 · React 18 · TypeScript · CSS Modules (no Tailwind)

---

## Brand Direction

> "A lightweight archival interface inspired by architectuurgids.nl, cleaner and more international."

Archiguide KR is a Korean architecture archive. The visual language is strictly editorial — white ground, black text, light gray rules. The interface is a *container for content*, never a destination in itself.

**What this system is not:**
- No dark glass, no heavy gradients, no cinematic framing
- No card walls — the primary pattern is a left-nav archive list
- No animation for decoration — motion is slow, sparse, structural

---

## Color

One theme: Light. The palette is near-monochrome with an ink hierarchy on white paper.

| Token | Value | Role |
|---|---|---|
| `paper` | `#ffffff` | Page/content background |
| `paper-soft` | `#d8d8d2` | Nav hover/active state |
| `frame` | `#000000` | Sidebar dark surface |
| `ink` | `#050505` | Primary text |
| `ink-strong` | `#000000` | Maximum contrast text |
| `ink-soft` | `rgba(5,5,5,0.72)` | Secondary body (~7.6:1) |
| `ink-muted` | `rgba(5,5,5,0.56)` | Metadata labels (~4.75:1) |
| `ink-faint` | `rgba(5,5,5,0.28)` | **Decorative only** — ~1.97:1, fails WCAG |
| `rule` | `rgba(5,5,5,0.16)` | Standard border on paper |
| `rule-strong` | `rgba(5,5,5,0.48)` | Stronger divider on paper |
| `rule-inverse` | `rgba(255,255,255,0.18)` | Border on dark frame |
| `tint-hover` | `rgba(5,5,5,0.05)` | Hover fill on paper |
| `placeholder` | `rgba(5,5,5,0.08)` | Image placeholder bg |

---

## Typography

**Primary:** Pretendard Variable (100–900) — loaded from `/fonts/PretendardVariable.ttf`  
**Editorial accent:** Iowan Old Style / Palatino stack (system serif)

### Type Scale

| Style | Size | Weight | Usage |
|---|---|---|---|
| `ui-label` | 12px | 700 | Uppercase meta labels (+`text-transform: uppercase; letter-spacing: 0.2em`) |
| `body` | 16px | 400 | Main reading text |
| `body-medium` | 16px | 500 | Architect names, focused content |
| `display` | 3.2rem *(clamp→1.8–3.2rem)* | 500 | Section headings, card titles |
| `display-lg` | 6.2rem *(clamp→3.2–6.2rem)* | 500 | Page hero titles |
| `editorial-hero` | 5.5rem *(clamp→2.5–5.5rem)* | 400 italic | Home serif hero (Iowan Old Style) |
| `wordmark` | 3rem *(clamp→2.2–3rem)* | 700 | "archiguide" sidebar wordmark |

---

## Spacing

8-step scale derived from globals.css usage. No CSS custom property — applied directly.

| Token | Value | Role |
|---|---|---|
| `space-1` | 4px | Micro — tight item separation |
| `space-2` | 8px | Small — inline items |
| `space-3` | 12px | Row gap |
| `space-4` | 16px | Base unit — standard padding |
| `space-5` | 20px | Card inner padding |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Layout padding |
| `space-16` | 64px | Large gap — hero, footer |

---

## Radius

Sharp corners everywhere — the archive aesthetic. One exception.

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0 | All fields, buttons, cards |
| `radius-pill` | 999px | AG logo mark (`.site-header__mark`) only |

---

## Components

All component previews are **static HTML** (read-only). The Next.js components use `next/link`, React context, and server-side data — no standalone bundle is available without a build step.

| Component | Group | Source |
|---|---|---|
| SidebarNav | Navigation | `components/sidebar-nav.tsx` |
| PageShell | Navigation | `components/page-shell.tsx` |
| BuildingCatalog | Content | `app/buildings/page.tsx` |
| BuildingMedia | Content | `components/building-media.tsx` |
| FeaturedCarousel | Content | `components/feature-carousel.tsx` |
| AdvancedSearch | Controls | `components/catalog-controls.tsx` |
| ArchitectureArt | Display | `app/globals.css (.architecture-art)` |

---

## Layout Patterns

**Desktop:** 320px fixed sidebar (`.site-header`) + fluid content area (`.page-main`)  
**Mobile:** Top rail navigation; sidebar collapses  
**Archive list:** Editorial index rows (`.archive-row`) not card wall  
**Feature row:** `.archive-row--feature` for highlighted entries  
**Catalog grid:** `.catalog-grid` with filter controls (`.catalog-controls`)
