import type { Locale } from "../../content/locales";
import type { SiteContent } from "../../content/site";
import Arrow from "./arrow";
import LocalePicker from "./locale-picker";

export default function SiteHeader({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={content.nav.home}>
        ezsx<span aria-hidden="true">/</span>
      </a>

      <nav aria-label={content.nav.label}>
        <a href="#work">{content.nav.work}</a>
        <a href="#systems">{content.nav.systems}</a>
        <a href="#contact">{content.nav.contact}</a>
        <a href="https://github.com/ezsx" target="_blank" rel="noreferrer">
          {content.nav.github} <Arrow />
        </a>
        <LocalePicker label={content.localePickerLabel} locale={locale} />
      </nav>
    </header>
  );
}
