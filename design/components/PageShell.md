# PageShell

**Group:** Navigation  
**Source:** `components/page-shell.tsx`

Top-level layout wrapper. Composes `SidebarNav` + `<main>` + `<footer>`. All pages render inside this shell.

## Props

```ts
type PageShellProps = { active: NavKey; children: ReactNode }
```

## Usage

```tsx
import PageShell from "@/components/page-shell"
<PageShell active="buildings">
  {/* page content */}
</PageShell>
```

## DOM structure

```
div.site-shell
  header.site-header       ← SidebarNav (320px fixed left / top rail mobile)
  main.page-main           ← children slot, fluid width
  footer.site-footer       ← branding + lang toggle
```

## Tokens used

`paper` (main bg), `rule` (borders), `frame` (sidebar via SidebarNav)
