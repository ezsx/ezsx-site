const work = [
  {
    number: "01",
    name: "Secure connectivity",
    type: "private system",
    description:
      "Server-side control plane for asynchronous configuration issuance and Linux node lifecycle around AmneziaWG and Xray.",
    details: ["Python", "PostgreSQL", "Redis", "Linux"],
  },
  {
    number: "02",
    name: "repo-semantic-mcp",
    type: "public repository",
    href: "https://github.com/ezsx/repo-semantic-mcp",
    description:
      "Code-aware repository retrieval for coding agents: dense + sparse search, weighted RRF, bounded graph expansion, and freshness diagnostics.",
    details: ["Python", "Qdrant", "MCP", "retrieval"],
  },
  {
    number: "03",
    name: "rag_app",
    type: "public repository",
    href: "https://github.com/ezsx/rag_app",
    description:
      "Self-hosted RAG and ReAct with hybrid retrieval, citations, local inference, and an independent evaluation pipeline.",
    details: ["Python", "Qdrant", "LLM", "evaluation"],
  },
  {
    number: "04",
    name: "seedforge",
    type: "public repository",
    href: "https://github.com/ezsx/seedforge",
    description:
      "GPU-assisted exhaustive seed search with correctness gates, resumable heterogeneous-GPU runs, and reproducible results.",
    details: ["CUDA", "profiling", "verification", "GPU"],
  },
];

const systems = [
  {
    name: "backend",
    value: "Python / FastAPI / PostgreSQL / Redis / ClickHouse",
  },
  {
    name: "platform",
    value: "Linux / Docker / Compose / Swarm / Ansible / observability",
  },
  {
    name: "networking",
    value: "AmneziaWG / Xray / routing / firewall / DNS",
  },
  {
    name: "retrieval",
    value: "Qdrant / hybrid search / reranking / evaluation / MCP",
  },
  {
    name: "compute",
    value: "CUDA / profiling / exhaustive search",
  },
];

function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      ↗
    </span>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="site-shell">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="ezsx, home">
            ezsx<span aria-hidden="true">/</span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#work">work</a>
            <a href="#systems">systems</a>
            <a href="#contact">contact</a>
            <a
              href="https://github.com/ezsx"
              target="_blank"
              rel="noreferrer"
            >
              github <Arrow />
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <p className="eyebrow">systems / tools / 2026</p>
            <h1 id="hero-title">ezsx</h1>
            <p className="hero-copy">
              Python systems across backend, Linux infrastructure, secure
              connectivity, retrieval, and GPU compute.
            </p>
            <ul className="focus-list" aria-label="Focus areas">
              <li>backend</li>
              <li>platform</li>
              <li>networking</li>
              <li>retrieval</li>
              <li>compute</li>
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

          <section className="section" id="work" aria-labelledby="work-title">
            <div className="section-heading">
              <h2 id="work-title">Selected work</h2>
              <span>04 systems</span>
            </div>

            <div className="work-list">
              {work.map((item) => (
                <article className="work-item" key={item.name}>
                  <span className="work-number" aria-hidden="true">
                    {item.number}
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
                    <ul aria-label={`${item.name} technologies`}>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section systems-section"
            id="systems"
            aria-labelledby="systems-title"
          >
            <div className="section-heading">
              <h2 id="systems-title">Systems</h2>
              <span>working set</span>
            </div>

            <dl className="systems-list">
              {systems.map((system) => (
                <div className="system-row" key={system.name}>
                  <dt>{system.name}</dt>
                  <dd>{system.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="contact-section"
            id="contact"
            aria-labelledby="contact-title"
          >
            <p className="eyebrow">contact</p>
            <h2 id="contact-title">The shortest path is a direct one.</h2>
            <p>
              GitHub for the work. Email or Telegram for everything else.
            </p>
            <div className="contact-links">
              <a href="https://github.com/ezsx" target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a href="mailto:scdcor@gmail.com">
                Email <Arrow />
              </a>
              <a href="https://t.me/exonys" target="_blank" rel="noreferrer">
                Telegram <Arrow />
              </a>
            </div>
          </section>
        </main>

        <footer>
          <span>ezsx.xx.kg</span>
          <span>built around the work</span>
        </footer>
      </div>
    </>
  );
}
