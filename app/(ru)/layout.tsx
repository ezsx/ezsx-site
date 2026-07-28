import type { Metadata } from "next";
import "../globals.css";
import { buildMetadata } from "../content/metadata";

export const metadata: Metadata = buildMetadata("ru");

export default function RussianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta content="en_US" property="og:locale:alternate" />
      </head>
      <body>{children}</body>
    </html>
  );
}
