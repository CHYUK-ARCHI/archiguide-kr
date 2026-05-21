import type { ReactNode } from "react";

import { SidebarNav, type NavKey } from "@/components/sidebar-nav";

type PageShellProps = {
  active: NavKey;
  children: ReactNode;
};

export function PageShell({ active, children }: PageShellProps) {
  return (
    <div className="site-shell">
      <SidebarNav active={active} />
      <main className="page-main">{children}</main>
    </div>
  );
}
