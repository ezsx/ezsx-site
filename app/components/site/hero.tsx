import type { SiteContent } from "../../content/site";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1 id="hero-title">{content.hero.title}</h1>
      <p className="hero-copy">{content.hero.copy}</p>
      <ul className="focus-list" aria-label={content.hero.focusLabel}>
        {content.hero.focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="route" aria-hidden="true">
        <span className="route-line line-a" />
        <span className="route-line line-b" />
        <span className="route-line line-c" />
        <span className="route-line line-d" />
        <span className="route-node node-a" />
        <span className="route-node node-b" />
        <span className="route-node node-c" />
        <span className="route-node node-d" />
      </div>
    </section>
  );
}
