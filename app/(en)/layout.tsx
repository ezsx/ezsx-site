import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata } from "../content/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="ru_RU" property="og:locale:alternate" />
      </head>
      <body>{children}</body>
    </html>
  );
}
