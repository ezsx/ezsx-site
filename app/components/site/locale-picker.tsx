import { localeHref, type Locale } from "../../content/locales";

export default function LocalePicker({
  label,
  locale,
}: {
  label: string;
  locale: Locale;
}) {
  return (
    <div aria-label={label} className="locale-picker" role="group">
      <a
        aria-current={locale === "en" ? "page" : undefined}
        href={localeHref.en}
        hrefLang="en"
        lang="en"
      >
        EN
      </a>
      <span aria-hidden="true">/</span>
      <a
        aria-current={locale === "ru" ? "page" : undefined}
        href={localeHref.ru}
        hrefLang="ru"
        lang="ru"
      >
        RU
      </a>
    </div>
  );
}
