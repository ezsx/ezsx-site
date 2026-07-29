import type { Locale } from "../../content/locales";
import { siteContent } from "../../content/site";
import PixelBattleStory from "../../projects/pixel-battle/pixel-battle-story";
import RagStory from "../../projects/rag/rag-story";
import RepoSemanticStory from "../../projects/repo-semantic/repo-semantic-story";
import SeedforgeStory from "../../projects/seedforge/seedforge-story";
import VpnStory from "../../projects/vpn/vpn-story";
import ContactSection from "./contact-section";
import Hero from "./hero";
import SiteHeader from "./site-header";
import SystemsSection from "./systems-section";
import WorkOverview from "./work-overview";

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];

  return (
    <>
      <a className="skip-link" href="#main">
        {content.skipLink}
      </a>

      <div className="site-shell">
        <SiteHeader content={content} locale={locale} />

        <main id="main">
          <Hero content={content} />

          <section className="section" id="work" aria-labelledby="work-title">
            <WorkOverview content={content} />
            <SeedforgeStory locale={locale} />
            <VpnStory locale={locale} />
            <RagStory locale={locale} />
            <RepoSemanticStory locale={locale} />
            <PixelBattleStory locale={locale} />
          </section>

          <SystemsSection content={content} />
          <ContactSection content={content} />
        </main>

        <footer>
          <span>{content.footer.domain}</span>
          <span>{content.footer.note}</span>
        </footer>
      </div>
    </>
  );
}
