import type { SiteContent } from "../../content/site";
import Arrow from "./arrow";

export default function WorkOverview({ content }: { content: SiteContent }) {
  const itemCount = content.work.items.length
    .toString()
    .padStart(2, "0");

  return (
    <>
      <div className="section-heading">
        <h2 id="work-title">{content.work.title}</h2>
        <span>
          {itemCount} {content.work.countLabel}
        </span>
      </div>

      <div className="work-list">
        {content.work.items.map((item, index) => {
          const itemNumber = (index + 1).toString().padStart(2, "0");

          return (
            <article className="work-item" key={item.id}>
              <span className="work-number" aria-hidden="true">
                {itemNumber}
              </span>

              <div className="work-name">
                <h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.name} <Arrow />
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <span>{item.type}</span>
              </div>

              <div className="work-description">
                <p>{item.description}</p>
                <ul
                  aria-label={`${item.name}: ${content.work.technologiesLabel}`}
                >
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
