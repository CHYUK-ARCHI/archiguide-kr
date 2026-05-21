import type { Metadata } from "next";

import "./globals.css";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "archiguide-kr";
const siteUrl =
  process.env.GITHUB_ACTIONS === "true"
    ? `https://chyuk-archi.github.io/${repositoryName}/`
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Archiguide KR",
    template: "%s | Archiguide KR"
  },
  description:
    "A Korean architecture guide prototype for browsing buildings, architects, cities, and types as one connected archive.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Archiguide KR",
    description:
      "A paper-first architecture guide for reading Korean buildings through projects, cities, types, maps, and search.",
    siteName: "Archiguide KR",
    url: siteUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
