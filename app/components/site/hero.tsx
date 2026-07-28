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
        <span className="route-grid" />
        <span className="route-bus" />
        <span className="route-branch" />
        <span className="route-packet is-horizontal" />
        <span className="route-packet is-vertical" />
        {content.hero.focus.map((item, index) => (
          <span
            className={`route-node node-${index + 1}`}
            key={item}
          >
            <i />
            <b>{item}</b>
          </span>
        ))}
      </div>
    </section>
  );
}
