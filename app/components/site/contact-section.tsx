import type { SiteContent } from "../../content/site";
import Arrow from "./arrow";

export default function ContactSection({
  content,
}: {
  content: SiteContent;
}) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">{content.contact.eyebrow}</p>
      <h2 id="contact-title">{content.contact.title}</h2>
      <p>{content.contact.copy}</p>
      <div className="contact-links">
        <a href="https://github.com/ezsx" target="_blank" rel="noreferrer">
          {content.contact.github} <Arrow />
        </a>
        <a href="mailto:scdcor@gmail.com">
          {content.contact.email} <Arrow />
        </a>
        <a href="https://t.me/exonys" target="_blank" rel="noreferrer">
          {content.contact.telegram} <Arrow />
        </a>
      </div>
    </section>
  );
}
