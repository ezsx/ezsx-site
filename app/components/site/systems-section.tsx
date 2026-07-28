import type { SiteContent } from "../../content/site";

export default function SystemsSection({
  content,
}: {
  content: SiteContent;
}) {
  return (
    <section
      className="section systems-section"
      id="systems"
      aria-labelledby="systems-title"
    >
      <div className="section-heading">
        <h2 id="systems-title">{content.systems.title}</h2>
        <span>{content.systems.subtitle}</span>
      </div>

      <dl className="systems-list">
        {content.systems.items.map((system) => (
          <div className="system-row" key={system.name}>
            <dt>{system.name}</dt>
            <dd>{system.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
