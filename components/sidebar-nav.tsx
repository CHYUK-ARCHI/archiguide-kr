import Link from "next/link";

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
  { key: "buildings", href: "/buildings", label: "Buildings" },
  { key: "architects", href: "/architects", label: "Architects" },
  { key: "types", href: "/types", label: "Types" },
  { key: "cities", href: "/cities", label: "Cities" },
  { key: "map", href: "/map", label: "Map" },
  { key: "search", href: "/search", label: "Search" },
  { key: "about", href: "/about", label: "Method" }
] as const;

export function SidebarNav({ active }: SidebarNavProps) {
  return (
    <header className="site-header">
      <div className="site-header__top">
        <p className="site-header__eyebrow">Korean architecture archive</p>
        <Link href="/" className="site-header__brand">
          <span className="site-header__wordmark">ARCHIGUIDE KR</span>
          <span className="site-header__sub">BUILDINGS, CITIES, TYPES, MAP</span>
        </Link>

        <nav className="site-header__links" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`site-header__link${
                  isActive ? " site-header__link--active" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <nav className="site-header__rail" aria-label="Secondary">
        <Link
          href="/"
          className={`site-header__rail-link${
            active === "home" ? " site-header__rail-link--active" : ""
          }`}
        >
          Home
        </Link>
        {navItems.map((item) => {
          const isActive = item.key === active;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`site-header__rail-link${
                isActive ? " site-header__rail-link--active" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
