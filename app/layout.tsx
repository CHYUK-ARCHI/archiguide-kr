import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Archiguide KR",
    template: "%s | Archiguide KR"
  },
  description:
    "A Korean architecture guide prototype inspired by the structural clarity of the Dutch architectuurgids reference.",
  metadataBase: new URL("https://archiguide-kr.example"),
  openGraph: {
    title: "Archiguide KR",
    description:
      "A database-first architecture guide for browsing Korean buildings, architects, cities, and types.",
    siteName: "Archiguide KR"
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
