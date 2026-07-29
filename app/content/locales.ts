export const supportedLocales = ["en", "ru"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeHref: Record<Locale, string> = {
  en: "/",
  ru: "/ru/",
};

export const technicalContentLocale: Record<Locale, Locale> = {
  en: "en",
  ru: "en",
};
