import type { Metadata } from "next";

import { LanguageProvider } from "@/components/language-provider";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
