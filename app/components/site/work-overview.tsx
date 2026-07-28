import {
  workStoryHrefs,
  type SiteContent,
} from "../../content/site";
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
          const storyHref = workStoryHrefs[item.id];

          return (
            <article className="work-item" key={item.id}>
              <span className="work-number" aria-hidden="true">
                {itemNumber}
              </span>

              <div className="work-name">
                <h3>
                  {storyHref ? (
                    <a href={storyHref}>
                      {item.name}
                      <span aria-hidden="true" className="work-jump-mark">
                        ↓
                      </span>
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
                {item.repositoryHref ? (
                  <a
                    className="work-repository-link"
                    href={item.repositoryHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {content.work.repositoryLabel} <Arrow />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
