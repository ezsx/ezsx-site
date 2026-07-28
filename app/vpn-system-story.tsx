"use client";

import { useEffect, useRef, useState } from "react";

type VpnStageId = "request" | "queue" | "allocate" | "fleet" | "recover";

type VpnStage = {
  id: VpnStageId;
  number: string;
  tab: string;
  result: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

const vpnStages: VpnStage[] = [
  {
    id: "request",
    number: "01",
    tab: "enter safely",
    result: "trusted device request",
    title: "One connection contract at the edge",
    summary:
      "The public path authenticates the user before any allocation work begins.",
    detail:
      "Nginx accepts the exact Connect Flow route. Auth-service verifies the access token; user-api then derives a stable device identity and resolves the allowed location, policy pool and protocol.",
    tags: ["Connect Flow", "device-bound identity", "policy isolation"],
  },
  {
    id: "queue",
    number: "02",
    tab: "make work durable",
    result: "idempotent PostgreSQL job",
    title: "Retries converge on one job",
    summary:
      "A deterministic request key prevents a reconnect storm from becoming duplicate control-plane work.",
    detail:
      "Redis holds the short-lived pending or ready view. PostgreSQL stores the durable generate_config job; LISTEN/NOTIFY wakes workers quickly while polling remains the delivery fallback.",
    tags: ["HMAC job id", "Redis TTL 180s", "at-least-once"],
  },
  {
    id: "allocate",
    number: "03",
    tab: "allocate capacity",
    result: "one active device slot",
    title: "Claim protocol-ready capacity",
    summary:
      "The worker selects a FREE slot on an ACTIVE node inside a database transaction.",
    detail:
      "Region, policy and protocol metadata constrain the candidate set. Row locks make concurrent allocation safe; AWG consumes a prepared peer while Xray creates its runtime user on demand. The result returns as ready, or as a short pending response while work continues.",
    tags: ["FREE → ALLOCATED", "SKIP LOCKED", "AWG + Xray"],
  },
  {
    id: "fleet",
    number: "04",
    tab: "keep capacity warm",
    result: "protocol-ready node fleet",
    title: "Maintain the fleet before demand arrives",
    summary:
      "A self-rescheduling caretaker keeps usable capacity ahead of the next connection request.",
    detail:
      "Each node and protocol pool has a target FREE reserve. Maintenance workers provision and bootstrap nodes, refill peers, clean stale slots and collect telemetry. A node becomes ACTIVE only after its declared protocol path is actually ready.",
    tags: ["target_free policy", "REFILL + CLEANUP", "truthful ACTIVE"],
  },
  {
    id: "recover",
    number: "05",
    tab: "converge after failure",
    result: "database and nodes agree",
    title: "Treat failure as a normal state transition",
    summary:
      "Leases, retries and reconciliation turn interrupted work into recoverable work.",
    detail:
      "Heartbeats extend live claims; expired leases return to the queue, bounded retries can end in a dead-letter record, and protocol-aware reconciliation repairs drift after node restarts. Draining removes capacity without accepting new allocations.",
    tags: ["lease + heartbeat", "retry + DLQ", "reconcile + drain"],
  },
];

function RequestScene() {
  return (
    <div className="story-scene vpn-scene vpn-request-scene">
      <div className="vpn-request-flow">
        <div className="vpn-component vpn-client-component">
          <span>client</span>
          <strong>mobile / beta</strong>
          <small>Bearer · X-HWID</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component">
          <span>edge</span>
          <strong>Nginx</strong>
          <small>exact route · limits</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component">
          <span>identity</span>
          <strong>auth-service</strong>
          <small>verify access</small>
        </div>
        <i aria-hidden="true" className="vpn-flow-link">
          <b />
        </i>
        <div className="vpn-component is-selected">
          <span>control API</span>
          <strong>user-api</strong>
          <small>source · policy · protocol</small>
        </div>
      </div>

      <div className="vpn-contract-card">
        <div>
          <span>public contract</span>
          <strong>POST /v1/connect-flow/connect</strong>
        </div>
        <div className="vpn-contract-fields">
          <span>user id</span>
          <span>device id</span>
          <span>location</span>
          <span>AWG / Xray</span>
        </div>
      </div>

      <div className="vpn-scene-result">
        <span>authorization boundary</span>
        <strong>no enqueue before identity is verified</strong>
      </div>
    </div>
  );
}

function QueueScene() {
  const rows = [
    ["8841", "generate_config", "leased"],
    ["8842", "generate_config", "runnable"],
    ["8843", "maintenance_task", "runnable"],
  ];

  return (
    <div className="story-scene vpn-scene vpn-queue-scene">
      <div className="vpn-dedupe-path">
        <div>
          <span>request A</span>
          <span>request A′</span>
          <span>request A″</span>
        </div>
        <i aria-hidden="true">→</i>
        <div className="vpn-key-card">
          <span>deterministic HMAC</span>
          <strong>job_4f7…c19</strong>
          <small>one device · one parameter set</small>
        </div>
        <i aria-hidden="true">→</i>
        <div className="vpn-redis-card">
          <span>ephemeral view</span>
          <strong>Redis</strong>
          <small>pending → ready · TTL</small>
        </div>
      </div>

      <div className="vpn-jobq-map">
        <div className="vpn-ledger">
          <div className="vpn-ledger-heading">
            <span>PostgreSQL · jobq.jobs</span>
            <strong>derived from lock + lease</strong>
          </div>
          <div className="vpn-ledger-columns" aria-hidden="true">
            <span>id</span>
            <span>type</span>
            <span>delivery</span>
          </div>
          {rows.map(([id, type, state], index) => (
            <div
              className={`vpn-ledger-row ${index === 0 ? "is-claimed" : ""}`}
              key={id}
            >
              <span>{id}</span>
              <strong>{type}</strong>
              <small>{state}</small>
            </div>
          ))}
        </div>

        <div className="vpn-worker-claim">
          <span>user-worker / 07</span>
          <strong>lease job 8841</strong>
          <small>FOR UPDATE SKIP LOCKED</small>
          <i aria-hidden="true">
            <b />
          </i>
        </div>
      </div>
    </div>
  );
}

function AllocateScene() {
  return (
    <div className="story-scene vpn-scene vpn-allocate-scene">
      <div className="vpn-allocation-transaction">
        <div className="vpn-transaction-heading">
          <span>allocation transaction</span>
          <strong>policy · region · protocol</strong>
        </div>
        <div className="vpn-slot-candidates">
          <div>
            <span>slot 2a1</span>
            <strong>ALLOCATED</strong>
            <small>same device · reusable</small>
          </div>
          <div className="is-picked">
            <span>slot 8c4</span>
            <strong>FREE</strong>
            <small>ACTIVE node · best candidate</small>
          </div>
          <div>
            <span>slot e09</span>
            <strong>FREE</strong>
            <small>different policy</small>
          </div>
        </div>
        <div className="vpn-state-transition">
          <span>FREE</span>
          <i aria-hidden="true">→</i>
          <strong>ALLOCATED</strong>
          <small>one active slot / user + device</small>
        </div>
      </div>

      <div className="vpn-protocol-branches">
        <div>
          <span>protocol handler / AWG</span>
          <strong>prepared peer</strong>
          <small>decrypt stored client config</small>
        </div>
        <div>
          <span>protocol handler / Xray</span>
          <strong>on-demand user</strong>
          <small>apply peer · build client config</small>
        </div>
        <div className="vpn-ready-gate">
          <span>result cache</span>
          <strong>ready</strong>
          <small>200 now · or 202 pending</small>
        </div>
      </div>
    </div>
  );
}

const fleetNodes = [
  { id: "node / ams-01", protocol: "AWG", free: 7, total: 10, state: "active" },
  { id: "node / ams-02", protocol: "AWG + Xray", free: 4, total: 10, state: "refill" },
  { id: "node / pool-03", protocol: "Xray", free: 6, total: 10, state: "active" },
  { id: "node / pool-04", protocol: "AWG", free: 2, total: 10, state: "cleanup" },
];

function FleetScene() {
  return (
    <div className="story-scene vpn-scene vpn-fleet-scene">
      <div className="vpn-caretaker">
        <span>self-rescheduling controller</span>
        <strong>caretaker</strong>
        <div aria-hidden="true" className="vpn-caretaker-ring">
          <i />
          <b />
        </div>
        <small>scan node × protocol pools</small>
        <div className="vpn-caretaker-actions">
          <span>REFILL</span>
          <span>CLEANUP</span>
          <span>TELEMETRY</span>
          <span>RECONCILE</span>
        </div>
      </div>

      <div className="vpn-fleet-grid">
        {fleetNodes.map((node) => (
          <div
            className={node.state !== "active" ? `is-${node.state}` : ""}
            key={node.id}
          >
            <span>{node.id}</span>
            <strong>{node.protocol}</strong>
            <div
              aria-label={`${node.free} of ${node.total} representative slots free`}
              role="img"
            >
              {Array.from({ length: node.total }, (_, index) => (
                <i
                  aria-hidden="true"
                  className={index < node.free ? "is-free" : "is-used"}
                  key={index}
                />
              ))}
            </div>
            <small>
              {node.state === "active" ? `${node.free} FREE · ACTIVE` : node.state.toUpperCase()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecoverScene() {
  return (
    <div className="story-scene vpn-scene vpn-recover-scene">
      <div className="vpn-recovery-track">
        <div>
          <span>worker claim</span>
          <strong>lease_until 12:41:30</strong>
          <small>heartbeat extends live work</small>
        </div>
        <i aria-hidden="true">→</i>
        <div className="is-interrupted">
          <span>process exit</span>
          <strong>heartbeat lost</strong>
          <small>job remains durable</small>
        </div>
        <i aria-hidden="true">↶</i>
        <div className="is-recovered">
          <span>sweeper</span>
          <strong>release + retry</strong>
          <small>another worker may claim</small>
        </div>
      </div>

      <div className="vpn-convergence-map">
        <div>
          <span>database intent</span>
          <strong>ALLOCATED peers</strong>
        </div>
        <i aria-hidden="true" className="vpn-convergence-line">
          <b />
        </i>
        <div className="vpn-reconcile-core">
          <span>protocol-aware</span>
          <strong>RECONCILE</strong>
          <small>compare · repair</small>
        </div>
        <i aria-hidden="true" className="vpn-convergence-line">
          <b />
        </i>
        <div>
          <span>node runtime</span>
          <strong>live peers</strong>
        </div>
      </div>

      <div className="vpn-scene-result">
        <span>terminal paths</span>
        <strong>success · retry/backoff · dead letter · safe drain</strong>
      </div>
    </div>
  );
}

function VpnStageScene({ stage }: { stage: VpnStageId }) {
  if (stage === "request") return <RequestScene />;
  if (stage === "queue") return <QueueScene />;
  if (stage === "allocate") return <AllocateScene />;
  if (stage === "fleet") return <FleetScene />;
  return <RecoverScene />;
}

export default function VpnSystemStory() {
  const [activeStage, setActiveStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(true);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState<"unknown" | "full" | "reduce">("unknown");
  const storyRef = useRef<HTMLElement>(null);
  const hasAutoPlayed = useRef(false);
  const stage = vpnStages[activeStage];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotion(media.matches ? "reduce" : "full");
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    let intersecting = false;
    const updateVisibility = () => setInView(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0 },
    );

    observer.observe(story);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      motion !== "full" ||
      !inView ||
      !storyExpanded ||
      hasAutoPlayed.current
    ) {
      return;
    }
    hasAutoPlayed.current = true;
    setActiveStage(0);
    setPlaying(true);
  }, [inView, motion, storyExpanded]);

  useEffect(() => {
    if (!playing || !inView || motion !== "full") return;
    if (activeStage === vpnStages.length - 1) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(
      () => setActiveStage((current) => current + 1),
      3900,
    );
    return () => window.clearTimeout(timer);
  }, [activeStage, inView, motion, playing]);

  const selectStage = (index: number) => {
    setActiveStage(index);
    setPlaying(false);
  };

  const controlStory = () => {
    if (motion === "reduce") {
      setActiveStage((current) => (current + 1) % vpnStages.length);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (activeStage === vpnStages.length - 1) setActiveStage(0);
    setPlaying(true);
  };

  const toggleStoryDisclosure = () => {
    if (storyExpanded) setPlaying(false);
    setStoryExpanded((current) => !current);
  };

  return (
    <article
      className="vpn-story"
      id="vpn-control-plane"
      aria-labelledby="vpn-story-title"
      ref={storyRef}
    >
      <div className="seedforge-intro vpn-intro">
        <div>
          <p className="seedforge-kicker">
            vpn server / secure connectivity control plane
          </p>
          <h3 id="vpn-story-title">
            From one connection request to a healthy node fleet.
          </h3>
        </div>
        <div>
          <p>
            The system authenticates a device, finds protocol-ready capacity
            and returns an AWG or Xray configuration through one asynchronous
            Connect Flow.
          </p>
          <p>
            The larger job is keeping the control-plane ledger and the Linux
            fleet truthful through retries, restarts, refills, cleanup and
            node lifecycle changes.
          </p>
        </div>
      </div>

      <div className="seedforge-panel vpn-panel">
        <div className="story-toolbar">
          <button
            aria-controls="vpn-system-story"
            aria-expanded={storyExpanded}
            className="story-disclosure"
            onClick={toggleStoryDisclosure}
            type="button"
          >
            <span className="story-status">
              <span className="story-status-dot" aria-hidden="true" />
              <span>
                system story · {stage.number} /{" "}
                {vpnStages.length.toString().padStart(2, "0")}
              </span>
            </span>
            <span className="disclosure-cue">
              <span>{storyExpanded ? "collapse story" : "expand story"}</span>
              <i aria-hidden="true" className="disclosure-mark">
                {storyExpanded ? "−" : "+"}
              </i>
            </span>
          </button>
          {storyExpanded ? (
            <button
              className="story-control"
              onClick={controlStory}
              type="button"
            >
              {motion === "reduce"
                ? "next stage"
                : playing
                  ? "pause"
                  : activeStage === vpnStages.length - 1
                    ? "replay story"
                    : "play story"}
            </button>
          ) : null}
        </div>

        <div
          className="system-story-body"
          hidden={!storyExpanded}
          id="vpn-system-story"
        >
          <p aria-atomic="true" aria-live="polite" className="sr-only">
            VPN story stage {stage.number}: {stage.title}
          </p>
          <ol className="story-steps" aria-label="VPN control-plane system story">
            {vpnStages.map((item, index) => (
              <li key={item.id}>
                <button
                  aria-current={index === activeStage ? "step" : undefined}
                  className={index === activeStage ? "is-active" : undefined}
                  onClick={() => selectStage(index)}
                  type="button"
                >
                  <span>{item.number}</span>
                  <strong>{item.tab}</strong>
                  <small>{item.result}</small>
                </button>
              </li>
            ))}
          </ol>

          <div className="story-stage" key={stage.id}>
            <div className="story-stage-copy">
              <span>
                {stage.number} · {stage.tab}
              </span>
              <h4>{stage.title}</h4>
              <p className="story-stage-summary">{stage.summary}</p>
              <p className="story-stage-detail">{stage.detail}</p>
              <ul aria-label={`${stage.title} technical anchors`}>
                {stage.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="story-stage-visual">
              <VpnStageScene stage={stage.id} />
            </div>
          </div>

          <dl className="seedforge-headlines vpn-headlines">
            <div>
              <dt>protocol paths</dt>
              <dd>2</dd>
              <span>AWG + Xray</span>
            </div>
            <div>
              <dt>delivery contract</dt>
              <dd>at least once</dd>
              <span>idempotent handlers</span>
            </div>
            <div>
              <dt>device invariant</dt>
              <dd>1 active</dd>
              <span>slot / user + device</span>
            </div>
            <div>
              <dt>recovery model</dt>
              <dd>DB first</dd>
              <span>recoverable intent</span>
            </div>
          </dl>

          <div className="orchestration-proof vpn-control-proof">
            <span>separate execution planes</span>
            <strong>user issuance ≠ node maintenance</strong>
            <small>shared jobq · isolated worker pools</small>
          </div>
        </div>

        <details className="cuda-profile vpn-technical" open>
          <summary>
            <span>
              <small>architecture decision / task delivery</small>
              <strong>Why the queue lives in PostgreSQL</strong>
            </span>
            <span className="cuda-summary-actions">
              <span className="cuda-profile-meta">
                core state · jobq · leases · retry · DLQ
              </span>
              <span className="disclosure-cue">
                <span className="disclosure-closed-label">
                  expand architecture
                </span>
                <span className="disclosure-open-label">
                  collapse architecture
                </span>
                <i
                  aria-hidden="true"
                  className="disclosure-mark cuda-disclosure-mark"
                />
              </span>
            </span>
          </summary>

          <div className="vpn-technical-body">
            <section className="vpn-architecture-map" aria-labelledby="vpn-map-title">
              <div className="profile-section-heading">
                <span id="vpn-map-title">control plane / data plane</span>
                <strong>current Connect Flow</strong>
              </div>

              <div className="vpn-plane-row">
                <div>
                  <span>01 · edge</span>
                  <strong>Nginx + auth-service</strong>
                  <small>route · limits · identity</small>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>02 · issue</span>
                  <strong>user-api + Redis</strong>
                  <small>dedupe · pending / ready</small>
                </div>
                <i aria-hidden="true">→</i>
                <div className="is-ledger">
                  <span>03 · durable state</span>
                  <strong>PostgreSQL</strong>
                  <small>core tables + jobq</small>
                </div>
              </div>

              <div className="vpn-worker-split">
                <div>
                  <span>user-worker</span>
                  <strong>generate_config</strong>
                  <small>device-scoped queue</small>
                </div>
                <div className="vpn-worker-rail" aria-hidden="true">
                  <i />
                  <b />
                  <i />
                </div>
                <div>
                  <span>maintenance-worker</span>
                  <strong>node lifecycle</strong>
                  <small>node-scoped queue</small>
                </div>
              </div>

              <div className="vpn-data-plane">
                <span>Linux node fleet / data plane</span>
                <div>
                  <strong>AWG</strong>
                  <strong>Xray</strong>
                  <small>ACTIVE only after protocol-ready bootstrap</small>
                </div>
              </div>
            </section>

            <section className="vpn-queue-anatomy" aria-labelledby="vpn-queue-title">
              <div className="profile-section-heading">
                <span id="vpn-queue-title">durable job anatomy</span>
                <strong>PostgreSQL-backed jobq</strong>
              </div>

              <ol className="vpn-job-lifecycle">
                <li>
                  <span>enqueue</span>
                  <strong>idem_key</strong>
                  <small>optional shared DB transaction</small>
                </li>
                <li>
                  <span>claim</span>
                  <strong>SKIP LOCKED</strong>
                  <small>parallel workers</small>
                </li>
                <li>
                  <span>execute</span>
                  <strong>lease + heartbeat</strong>
                  <small>crash recovery</small>
                </li>
                <li>
                  <span>resolve</span>
                  <strong>success / retry / DLQ</strong>
                  <small>bounded outcome</small>
                </li>
              </ol>

              <div className="vpn-queue-wakeup">
                <div>
                  <span>fast wake-up</span>
                  <strong>LISTEN / NOTIFY</strong>
                </div>
                <i aria-hidden="true">+</i>
                <div>
                  <span>delivery fallback</span>
                  <strong>periodic poll</strong>
                </div>
              </div>

              <div className="vpn-queue-serial">
                <span>per-key serialization</span>
                <strong>
                  {"node:{node_id} · user:{user_id}:device:{device_id}"}
                </strong>
                <small>advisory lock prevents overlapping work for one resource</small>
              </div>
            </section>

            <section className="vpn-queue-decision" aria-labelledby="vpn-decision-title">
              <div>
                <span id="vpn-decision-title">why PostgreSQL fits here</span>
                <h4>A durable task queue, not an event stream.</h4>
                <p>
                  Control-plane work is coupled to relational node, slot and
                  policy state. PostgreSQL keeps those invariants close,
                  supports transactional enqueue where a flow needs it, and
                  provides leases, delayed retry and deduplication without a
                  second durability and backup plane.
                </p>
              </div>

              <div className="vpn-broker-comparison">
                <div className="is-current">
                  <span>current fit</span>
                  <strong>PostgreSQL jobq</strong>
                  <small>state-coupled control-plane tasks</small>
                </div>
                <div>
                  <span>revisit for</span>
                  <strong>RabbitMQ</strong>
                  <small>broker-scale routing, fan-out or message throughput</small>
                </div>
                <div>
                  <span>revisit for</span>
                  <strong>Kafka</strong>
                  <small>replayable event streams and many independent consumers</small>
                </div>
              </div>

              <p className="vpn-decision-caveat">
                Scoped choice, not a universal rule. Long remote handlers also
                consume database connections, so worker concurrency and pool
                headroom are explicit operational constraints.
              </p>
            </section>
          </div>
        </details>

        <div className="seedforge-notes vpn-notes">
          <p>
            Connect Flow is the current public issuance path; legacy{" "}
            <code>/config</code> is not presented as the primary interface.
          </p>
          <p>
            Fleet cards are representative architecture, not live node counts
            or per-node telemetry.
          </p>
        </div>
      </div>
    </article>
  );
}
