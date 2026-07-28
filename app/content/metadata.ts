import type { Metadata } from "next";
import { localeHref, type Locale } from "./locales";

const canonicalUrl = new URL("https://ezsx.xx.kg");

const metadataCopy = {
  en: {
    title: "ezsx — systems and tools",
    description:
      "Python systems across backend, Linux infrastructure, secure connectivity, retrieval, and GPU compute.",
    openGraphDescription:
      "Backend, platform, secure connectivity, retrieval, and GPU compute.",
    imageAlt: "ezsx — backend, platform, retrieval, compute",
    openGraphLocale: "en_US",
  },
  ru: {
    title: "ezsx — системы и инструменты",
    description:
      "Python-системы: бэкенд, Linux-инфраструктура, защищённые подключения, retrieval и GPU-вычисления.",
    openGraphDescription:
      "Бэкенд, платформа, защищённые подключения, retrieval и GPU-вычисления.",
    imageAlt: "ezsx — бэкенд, платформа, retrieval, вычисления",
    openGraphLocale: "ru_RU",
  },
} as const;

export function buildMetadata(locale: Locale): Metadata {
  const copy = metadataCopy[locale];
  const path = localeHref[locale];

  return {
    metadataBase: canonicalUrl,
    title: copy.title,
    description: copy.description,
    applicationName: "ezsx",
    authors: [{ name: "ezsx", url: "https://github.com/ezsx" }],
    alternates: {
      canonical: path,
      languages: {
        en: localeHref.en,
        ru: localeHref.ru,
        "x-default": localeHref.en,
      },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "ezsx",
      title: copy.title,
      description: copy.openGraphDescription,
      locale: copy.openGraphLocale,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.openGraphDescription,
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}
