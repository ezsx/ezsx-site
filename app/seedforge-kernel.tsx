"use client";

import { useEffect, useRef, useState } from "react";
import CudaSearchTrace, {
  CUDA_TRACE_PHASES,
  type CudaPipelineId,
  type CudaTracePhaseId,
} from "./cuda-search-trace";

type StageId = "run" | "prove" | "cover" | "orchestrate" | "publish";

type StoryStage = {
  id: StageId;
  number: string;
  tab: string;
  result: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

const storyStages: StoryStage[] = [
  {
    id: "run",
    number: "01",
    tab: "make it run",
    result: "accepted CUDA run",
    title: "A result-producing CUDA path",
    summary:
      "Build and runtime failures had to be solved before search performance mattered.",
    detail:
      "Native CUDA builds load Noita data, verify the selected device and stream structured progress and hits through a hardened bridge. A failed launch or an empty run is not accepted as work.",
    tags: ["native sm_70 + sm_120", "WAK identity", "structured hit stream"],
  },
  {
    id: "prove",
    number: "02",
    tab: "prove it",
    result: "canonical equality",
    title: "Correctness before speed",
    summary:
      "CPU, V100 and RTX output must converge to the same canonical seed blocks.",
    detail:
      "Whole per-seed blocks preserve duplicates and record order. SHA-256 gates and sampled Telescope comparisons make drift and known residuals visible instead of hiding them behind equal result counts.",
    tags: ["seed-block-v2", "CPU = GPU", "916 comparison cases"],
  },
  {
    id: "cover",
    number: "03",
    tab: "cover the world",
    result: "22 target biomes",
    title: "World coverage, not one map",
    summary:
      "The engine reconstructs Wang worldgen and spawn hooks across all 22 audited target biomes.",
    detail:
      "Production Path A generates the 16 biomes that can create chests while retaining boundary hits in six source-empty targets. Rare boundary and wand residuals remain explicitly documented.",
    tags: ["16 productive sources", "22 accepted targets", "named residuals"],
  },
  {
    id: "orchestrate",
    number: "04",
    tab: "split + recover",
    result: "V100 + RTX",
    title: "One range, two unequal GPUs",
    summary:
      "The scheduler assigns disjoint durable cells by measured biome throughput.",
    detail:
      "Workers are pinned by UUID and fingerprinted against the CUDA image and game data. Finished cells remain immutable; interrupted work returns to the queue, and finalization rejects gaps or overlaps.",
    tags: ["capacity-weighted", "433 / 433 cells", "checkpoint + resume"],
  },
  {
    id: "publish",
    number: "05",
    tab: "prove the result",
    result: "reproducible census",
    title: "A research artifact, not a screenshot",
    summary:
      "Canonical streams become a queryable catalog, leaderboards and hash-pinned evidence.",
    detail:
      "The complete coalmine census covers the supported seed range and preserves result provenance. A separate dual-GPU ROI12 run completed every planned cell with zero missing or invalid work.",
    tags: ["SQLite + leaderboard", "SHA-256 evidence", "zero missing cells"],
  },
];

const biomes = [
  { label: "coal", source: true },
  { label: "coal alt", source: true },
  { label: "excav", source: true },
  { label: "snow cave", source: true },
  { label: "castle", source: true },
  { label: "rain", source: true },
  { label: "rain open", source: true },
  { label: "vault", source: true },
  { label: "crypt", source: true },
  { label: "fungi cave", source: true },
  { label: "fungi", source: true },
  { label: "rain dark", source: true },
  { label: "liquid", source: false },
  { label: "wand", source: false },
  { label: "the end", source: false },
  { label: "the sky", source: false },
  { label: "wizard", source: true },
  { label: "sand", source: false },
  { label: "pyramid", source: false },
  { label: "robobase", source: true },
  { label: "frozen", source: true },
  { label: "meat", source: true },
];

const profileMetrics = [
  { label: "Compute SOL", value: 17.41, display: "17.41%" },
  { label: "DRAM SOL", value: 8, display: "8.00%" },
  { label: "Issue slots busy", value: 20.39, display: "20.39%" },
  { label: "Achieved occupancy", value: 14.66, display: "14.66%" },
];

const cudaPipelines: {
  id: CudaPipelineId;
  label: string;
  value: number;
  display: string;
  detail: string;
}[] = [
  {
    id: "alu",
    label: "ALU / INT",
    value: 7.937,
    display: "7.94%",
    detail: "indices · bitwise · counters",
  },
  {
    id: "fma",
    label: "FMA pipe",
    value: 5.536,
    display: "5.54%",
    detail: "includes FP32 math",
  },
  {
    id: "lsu",
    label: "LSU / LD-ST",
    value: 8.18,
    display: "8.18%",
    detail: "arena · maps · bitsets",
  },
  {
    id: "cbu",
    label: "CBU / control",
    value: 4.204,
    display: "4.20%",
    detail: "gates · branches · retry",
  },
  {
    id: "xu",
    label: "XU / special",
    value: 4.093,
    display: "4.09%",
    detail: "special-function path",
  },
  {
    id: "fp64",
    label: "FP64",
    value: 0.144,
    display: "0.14%",
    detail: "parity-sensitive RNG",
  },
];

function RuntimeScene() {
  return (
    <div className="story-scene runtime-scene">
      <div className="runtime-flow">
        <div className="scene-node">
          <span>source</span>
          <strong>CUDA engine</strong>
        </div>
        <span className="scene-arrow" aria-hidden="true">
          →
        </span>
        <div className="scene-node">
          <span>runtime</span>
          <strong>native build</strong>
        </div>
        <span className="scene-arrow" aria-hidden="true">
          →
        </span>
        <div className="scene-node">
          <span>contract</span>
          <strong>result stream</strong>
        </div>
      </div>

      <div className="runtime-checks">
        <div>
          <span>device identity</span>
          <strong>V100 · sm_70</strong>
          <b>PASS</b>
        </div>
        <div>
          <span>game data</span>
          <strong>data.wak · SHA-256</strong>
          <b>PASS</b>
        </div>
        <div>
          <span>first accepted output</span>
          <strong>progress → hit → done</strong>
          <b>LIVE</b>
        </div>
      </div>
    </div>
  );
}

function ProofScene() {
  return (
    <div className="story-scene proof-scene">
      <div className="byte-streams">
        {["CPU", "V100", "RTX"].map((worker) => (
          <div className="byte-stream" key={worker}>
            <strong>{worker}</strong>
            <div aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <span
                  className={index % 5 === 0 ? "is-marked" : ""}
                  key={index}
                />
              ))}
            </div>
            <small>same seed block</small>
          </div>
        ))}
      </div>

      <div className="canonical-gate">
        <span>canonical bytes · duplicate + order preserving</span>
        <strong>SHA-256 MATCH</strong>
      </div>
    </div>
  );
}

function CoverageScene() {
  return (
    <div className="story-scene coverage-scene">
      <div className="biome-grid" aria-hidden="true">
        {biomes.map((biome) => (
          <span className={biome.source ? "is-source" : "is-boundary"} key={biome.label}>
            {biome.label}
          </span>
        ))}
      </div>

      <div className="coverage-legend">
        <span>
          <i className="legend-source" aria-hidden="true" />
          <strong>16</strong> productive source biomes
        </span>
        <span>
          <i className="legend-boundary" aria-hidden="true" />
          <strong>6</strong> boundary-only targets retained
        </span>
      </div>

      <div className="coverage-gate">
        <span>sampled independent cross-check</span>
        <strong>916 CUDA ↔ Telescope cases</strong>
        <small>known residuals remain named in the evidence</small>
      </div>
    </div>
  );
}

function OrchestrationScene() {
  const workCells = Array.from({ length: 14 }, (_, index) => index);

  return (
    <div className="story-scene orchestration-scene">
      <div className="work-ledger">
        <span>durable seed-range ledger</span>
        <div aria-hidden="true">
          {workCells.map((cell) => (
            <i
              className={
                cell < 8 ? "is-complete" : cell === 8 ? "is-active" : "is-queued"
              }
              key={cell}
            />
          ))}
        </div>
        <small>disjoint ranges · no gaps · no overlaps</small>
      </div>

      <div className="gpu-workers">
        <div className="gpu-worker v100-worker">
          <div>
            <span>worker 0</span>
            <strong>Tesla V100</strong>
          </div>
          <b>80 SM · sm_70</b>
          <p>59.5k seed/s</p>
          <small>UUID-pinned</small>
        </div>

        <div className="scheduler-node">
          <span>biome-aware</span>
          <strong>scheduler</strong>
          <small>capacity weighted</small>
        </div>

        <div className="gpu-worker rtx-worker">
          <div>
            <span>worker 1</span>
            <strong>RTX 5060 Ti</strong>
          </div>
          <b>36 SM · sm_120</b>
          <p>75.7k seed/s</p>
          <small>UUID-pinned</small>
        </div>
      </div>

      <div className="recovery-line">
        <span>interrupted cell</span>
        <i aria-hidden="true">↶</i>
        <strong>fingerprint → requeue → resume</strong>
      </div>
    </div>
  );
}

function PublishScene() {
  return (
    <div className="story-scene publish-scene">
      <div className="census-range">
        <div>
          <span>complete coalmine census</span>
          <strong>1 → 2,147,483,645</strong>
        </div>
        <div className="census-progress" aria-hidden="true">
          <span />
        </div>
        <small>100% of the supported range</small>
      </div>

      <div className="evidence-results">
        <div>
          <strong>3,332,208</strong>
          <span>great chests cataloged</span>
        </div>
        <div>
          <strong>55 / 55</strong>
          <span>known natural Orb seeds</span>
        </div>
        <div>
          <strong>433 / 433</strong>
          <span>accepted dual-GPU ROI12 cells</span>
        </div>
      </div>

      <div className="artifact-row">
        <span>canonical stream</span>
        <span>records.sqlite3</span>
        <span>leaderboard.csv</span>
        <span>hash manifest</span>
      </div>
    </div>
  );
}

function StageScene({ stage }: { stage: StageId }) {
  if (stage === "run") return <RuntimeScene />;
  if (stage === "prove") return <ProofScene />;
  if (stage === "cover") return <CoverageScene />;
  if (stage === "orchestrate") return <OrchestrationScene />;
  return <PublishScene />;
}

export default function SeedforgeKernel() {
  const [activeStage, setActiveStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState<"unknown" | "full" | "reduce">("unknown");
  const [cudaPhase, setCudaPhase] =
    useState<CudaTracePhaseId>("dispatch");
  const [cudaTracePlaying, setCudaTracePlaying] = useState(false);
  const storyRef = useRef<HTMLElement>(null);
  const hasAutoPlayed = useRef(false);
  const stage = storyStages[activeStage];
  const cudaPhaseIndex = CUDA_TRACE_PHASES.findIndex(
    (item) => item.id === cudaPhase,
  );
  const cudaPhaseDetail =
    CUDA_TRACE_PHASES[cudaPhaseIndex] ?? CUDA_TRACE_PHASES[0];

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
    if (motion !== "full" || !inView || hasAutoPlayed.current) return;
    hasAutoPlayed.current = true;
    setActiveStage(0);
    setPlaying(true);
  }, [inView, motion]);

  useEffect(() => {
    if (!playing || !inView || motion !== "full") return;
    if (activeStage === storyStages.length - 1) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(
      () => setActiveStage((current) => current + 1),
      3600,
    );
    return () => window.clearTimeout(timer);
  }, [activeStage, inView, motion, playing]);

  const selectStage = (index: number) => {
    setActiveStage(index);
    setPlaying(false);
  };

  const controlStory = () => {
    if (motion === "reduce") {
      setActiveStage((current) => (current + 1) % storyStages.length);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (activeStage === storyStages.length - 1) setActiveStage(0);
    setPlaying(true);
  };

  return (
    <article
      className="seedforge-story"
      id="seedforge-core"
      aria-labelledby="seedforge-title"
      ref={storyRef}
    >
      <div className="seedforge-intro">
        <div>
          <p className="seedforge-kicker">seedforge / verified GPU search</p>
          <h3 id="seedforge-title">
            From an upstream CUDA engine to a reliable two-GPU research system.
          </h3>
        </div>
        <div>
          <p>
            A Noita seed deterministically defines a world. Seedforge
            reconstructs billions of those worlds on GPU, checks 22 target
            biomes for rare objects, and keeps only canonical, recoverable
            results.
          </p>
          <p>
            The central work was making the inherited path operational,
            accurate, complete and crash-safe. Kernel profiling and tuning came
            after that foundation worked end to end.
          </p>
        </div>
      </div>

      <div className="seedforge-panel">
        <div className="story-toolbar">
          <div className="story-status">
            <span className="story-status-dot" aria-hidden="true" />
            <span>
              system story · {stage.number} / {storyStages.length.toString().padStart(2, "0")}
            </span>
          </div>
          <button className="story-control" onClick={controlStory} type="button">
            {motion === "reduce"
              ? "next stage"
              : playing
                ? "pause"
                : activeStage === storyStages.length - 1
                  ? "replay story"
                  : "play story"}
          </button>
        </div>

        <ol className="story-steps" aria-label="Seedforge system story">
          {storyStages.map((item, index) => (
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
            <span>{stage.number} · {stage.tab}</span>
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
            <StageScene stage={stage.id} />
          </div>
        </div>

        <dl className="seedforge-headlines">
          <div>
            <dt>audited world coverage</dt>
            <dd>22 / 22</dd>
            <span>target biomes</span>
          </div>
          <div>
            <dt>native workers</dt>
            <dd>2 GPUs</dd>
            <span>V100 + RTX 5060 Ti</span>
          </div>
          <div>
            <dt>measured capacity*</dt>
            <dd>135.2k</dd>
            <span>coalmine seed/s</span>
          </div>
          <div>
            <dt>completed census</dt>
            <dd>2.147B</dd>
            <span>world seeds scanned</span>
          </div>
        </dl>

        <div className="orchestration-proof">
          <span>dual-GPU orchestration proof</span>
          <strong>ROI12 · 433 / 433 accepted cells</strong>
          <small>0 missing · 0 invalid · resumable ledger</small>
        </div>

        <details className="cuda-profile" open>
          <summary>
            <span>
              <small>technical layer / profiler</small>
              <strong>Inspect the CUDA worker</strong>
            </span>
            <span>
              V100 · 80 SM · 960 × 64 · 3.08 / 32 lanes
            </span>
          </summary>

          <div className="profile-body">
            <div className="profile-topology">
              <div className="profile-section-heading">
                <span>launch hierarchy</span>
                <strong>P6 diagnostic snapshot</strong>
              </div>

              <div className="topology-chain">
                <div>
                  <span>GPU</span>
                  <strong>V100</strong>
                  <small>80 SM</small>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>grid</span>
                  <strong>960 blocks</strong>
                  <small>2 waves</small>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>block</span>
                  <strong>64 threads</strong>
                  <small>2 warps</small>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>warp</span>
                  <strong>3.08 / 32</strong>
                  <small>active lanes</small>
                </div>
              </div>

              <div
                aria-hidden="true"
                className={`sm-grid ${cudaTracePlaying ? "is-playing" : ""}`}
                data-phase={cudaPhase}
              >
                {Array.from({ length: 80 }, (_, index) => (
                  <span
                    className={
                      (index + cudaPhaseIndex * 3) % 10 < 2
                        ? "is-cohort"
                        : undefined
                    }
                    key={index}
                  >
                    {Array.from({ length: 6 }, (_, slot) => (
                      <i
                        key={slot}
                        style={{
                          animationDelay: `${(index % 10) * 32 + slot * 75}ms`,
                        }}
                      />
                    ))}
                  </span>
                ))}
              </div>
              <div className="sm-caption">
                <span>80 SM × up to 6 resident blocks · P6 register limit</span>
                <span>representative cohort · not per-SM telemetry</span>
              </div>

              <div className="sm-phase-readout">
                <span>representative block stage</span>
                <strong>
                  {cudaPhaseDetail.number} · {cudaPhaseDetail.axis}
                </strong>
                <small>
                  {cudaPhaseDetail.status}. Every SM can execute every stage.
                </small>
              </div>

              <section
                className="sm-pipelines"
                aria-labelledby="sm-pipelines-title"
              >
                <div className="sm-pipelines-heading">
                  <span id="sm-pipelines-title">instruction pipelines</span>
                  <strong>P6 whole kernel · % active-cycle peak</strong>
                </div>
                <div className="sm-pipeline-grid">
                  {cudaPipelines.map((pipeline) => (
                    <div
                      className={
                        cudaPhaseDetail.pipelines.includes(pipeline.id)
                          ? "is-phase-affinity"
                          : undefined
                      }
                      key={pipeline.id}
                    >
                      <span>{pipeline.label}</span>
                      <strong>{pipeline.display}</strong>
                      <i aria-hidden="true">
                        <b style={{ width: `${pipeline.value}%` }} />
                      </i>
                      <small>{pipeline.detail}</small>
                    </div>
                  ))}
                </div>
                <p>
                  Source-informed phase highlight; measured values remain
                  whole-kernel. These independent peak-utilization counters do
                  not sum to 100%. FMA is not a pure FP32 counter. FP16, Tensor
                  and TEX were 0% in this snapshot.
                </p>
              </section>

              <div className="sm-workload-note">
                <strong>mixed irregular workload</strong>
                <span>
                  INT / memory / control dominate; FP64 is a narrow
                  game-parity path, not the bottleneck.
                </span>
              </div>

              <div className="final-launch-note">
                <span>final P7 launch</span>
                <strong>1440 blocks × 64 · 3 waves · span 8</strong>
                <small>The counters shown here predate that final kernel.</small>
              </div>
            </div>

            <div className="profile-pipelines">
              <div className="profile-section-heading">
                <span>pipeline / load</span>
                <strong>Nsight Compute · coalmine</strong>
              </div>

              <dl className="profile-bars">
                {profileMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>
                      <span>{metric.label}</span>
                      <strong>{metric.display}</strong>
                    </dt>
                    <dd>
                      <span style={{ width: `${metric.value}%` }} />
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="stall-metrics">
                <div>
                  <span>dependent memory waits</span>
                  <strong>47.71%</strong>
                  <small>long_scoreboard sample share</small>
                </div>
                <div>
                  <span>instruction queue pressure</span>
                  <strong>36.57%</strong>
                  <small>lg_throttle sample share</small>
                </div>
              </div>
            </div>
          </div>

          <CudaSearchTrace
            onPhaseChange={setCudaPhase}
            onPlaybackChange={setCudaTracePlaying}
          />

          <div className="profile-conclusion">
            <div>
              <span>profiler reading</span>
              <strong>Sparse, divergent and latency / issue limited.</strong>
            </div>
            <p>
              Peak compute and DRAM remain mostly idle. A historical P3
              differential isolated pathfinding plus retry at 83.8%; the P6
              counters above profile the whole kernel, and neither number is
              final-P7 stage-time attribution. Dependent memory work, queue
              pressure and only 3–4 active lanes still show meaningful
              headroom.
            </p>
          </div>
        </details>

        <div className="seedforge-notes">
          <p>
            * 59.5k V100 + 75.7k RTX 5060 Ti, measured independently on the
            coalmine workload before orchestration overhead.
          </p>
          <p>
            Seedforge extends the{" "}
            <a
              href="https://github.com/pudy248/NoitaSeedSearcherCUDA"
              rel="noreferrer"
              target="_blank"
            >
              upstream NoitaSeedSearcherCUDA engine
            </a>
            . Telescope parity is a sampled independent cross-check; documented
            residuals are not presented as exhaustive game parity.
          </p>
        </div>
      </div>
    </article>
  );
}
