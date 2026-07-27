import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "ezsx.xx.kg";
  const protocol =
    host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https";
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
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
          url: socialImage,
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
      images: [socialImage],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

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
