import type { Metadata } from "next";
import "./globals.css";

const canonicalUrl = new URL("https://ezsx.xx.kg");

export const metadata: Metadata = {
  metadataBase: canonicalUrl,
  title: "ezsx — systems and tools",
  description:
    "Python systems across backend, Linux infrastructure, secure connectivity, retrieval, and GPU compute.",
  applicationName: "ezsx",
  authors: [{ name: "ezsx", url: "https://github.com/ezsx" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ezsx",
    title: "ezsx — systems and tools",
    description:
      "Backend, platform, secure connectivity, retrieval, and GPU compute.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ezsx — backend, platform, retrieval, compute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ezsx — systems and tools",
    description:
      "Backend, platform, secure connectivity, retrieval, and GPU compute.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
