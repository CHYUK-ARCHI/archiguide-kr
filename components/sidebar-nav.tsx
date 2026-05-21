import Link from "next/link";

import { siteStats } from "@/lib/site-data";

export type NavKey =
  | "home"
  | "buildings"
  | "architects"
  | "cities"
  | "types"
  | "map"
  | "search"
  | "about";

type SidebarNavProps = {
  active: NavKey;
};

const navItems = [
  { key: "home", href: "/", label: "Home", count: null },
  { key: "architects", href: "/architects", label: "Architects", count: siteStats.architects },
  { key: "buildings", href: "/buildings", label: "Buildings", count: siteStats.buildings },
  { key: "types", href: "/types", label: "Types", count: siteStats.types },
  { key: "cities", href: "/cities", label: "Cities", count: siteStats.cities },
  { key: "map", href: "/map", label: "Map", count: siteStats.buildings },
  { key: "search", href: "/search", label: "Search", count: null },
  { key: "about", href: "/about", label: "Method", count: null }
] as const;

export function SidebarNav({ active }: SidebarNavProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <p className="sidebar__eyebrow">Pilot Archive / KR</p>
        <Link href="/" className="sidebar__wordmark">
          Archiguide KR
        </Link>
        <p className="sidebar__lede">
          A Korean architecture guide prototype that treats buildings, cities, and types as one connected browsing system.
        </p>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`}
            >
              <span>{item.label}</span>
              {item.count !== null ? <span className="sidebar__count">{item.count}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__note">
        <p className="sidebar__note-title">Reference translation</p>
        <p>
          The Dutch reference uses a persistent left rail, hard category counts, and a featured image sequence. This version keeps that structure but rewrites the experience for mobile, Korean copy, and future data expansion.
        </p>
      </div>

      <div className="sidebar__foot">
        <span className="sidebar__badge">Seed dataset</span>
        <span className="sidebar__meta">Map and advanced search now use a Google Maps-ready schema.</span>
      </div>
    </aside>
  );
}
