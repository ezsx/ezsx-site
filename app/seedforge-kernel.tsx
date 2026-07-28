"use client";

import { useEffect, useRef, useState } from "react";

type ModeId = "baseline" | "p6" | "p7";

type Mode = {
  id: ModeId;
  tab: string;
  title: string;
  stage: string;
  metric: string;
  metricLabel: string;
  detail: string;
};

const modes: Mode[] = [
  {
    id: "baseline",
    tab: "baseline",
    title: "RGB predicates",
    stage: "room RGB scan",
    metric: "20.9k",
    metricLabel: "seed/s · initial V100",
    detail:
      "Room pixels and path predicates are resolved from hot RGB tile reads.",
  },
  {
    id: "p6",
    tab: "P6",
    title: "tile metadata",
    stage: "tile metadata",
    metric: "+116.15%",
    metricLabel: "coalmine · vs pre-P6",
    detail:
      "Host-precomputed flags skip tiles that cannot contain room colors.",
  },
  {
    id: "p7",
    tab: "P7 final",
    title: "metadata + bitmap",
    stage: "meta + bit planes",
    metric: "59.5k",
    metricLabel: "seed/s · final V100",
    detail:
      "The P6 skip remains; immutable bit planes replace hot RGB reads without changing canonical output.",
  },
];

const phaseLabels = [
  "dispatching an 8-seed span",
  "running ordered prechecks",
  "assembling Wang tiles",
  "walking a divergent path",
  "feeding the object filter",
  "canonical output verified",
];

type Palette = {
  accent: string;
  foreground: string;
  muted: string;
  quiet: string;
  line: string;
  lineSoft: string;
  surface: string;
};

type TraceSize = {
  width: number;
  height: number;
  dpr: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function ease(value: number) {
  const x = clamp(value);
  return 1 - (1 - x) ** 3;
}

function phaseFromProgress(progress: number) {
  if (progress < 0.14) return 0;
  if (progress < 0.3) return 1;
  if (progress < 0.47) return 2;
  if (progress < 0.81) return 3;
  if (progress < 0.94) return 4;
  return 5;
}

function cssColor(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

function readPalette(): Palette {
  return {
    accent: cssColor("--accent", "#58a6ff"),
    foreground: cssColor("--foreground", "#f0f6fc"),
    muted: cssColor("--muted", "#8b949e"),
    quiet: cssColor("--quiet", "#6e7681"),
    line: cssColor("--line", "#30363d"),
    lineSoft: cssColor("--line-soft", "#21262d"),
    surface: cssColor("--surface", "#161b22"),
  };
}

function activeLanes(bucket: number) {
  const first = (bucket * 7 + 2) % 32;
  const lanes = new Set<number>([
    first,
    (first + 9 + (bucket % 3)) % 32,
    (first + 19 + ((bucket * 2) % 5)) % 32,
  ]);
  if (bucket % 3 === 1) lanes.add((first + 27) % 32);
  return lanes;
}

function drawTrace(
  canvas: HTMLCanvasElement,
  size: TraceSize,
  mode: ModeId,
  progress: number,
  palette: Palette,
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const { width, height, dpr } = size;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);

  const x0 = width * 0.055;
  const x1 = width * 0.205;
  const x2 = width * 0.39;
  const x3 = width * 0.515;
  const x4 = width * 0.815;
  const x5 = width * 0.945;
  const top = 34;
  const bottom = height - 30;
  const laneGap = (bottom - top) / 31;
  const compact = width < 560;

  context.fillStyle = palette.surface;
  context.globalAlpha = 0.28;
  context.fillRect(x2, 16, x3 - x2, height - 32);
  context.globalAlpha = 1;

  context.save();
  context.strokeStyle = palette.line;
  context.lineWidth = 1;
  context.setLineDash([2, 5]);
  for (const x of [x1, x2, x3, x4, x5]) {
    context.beginPath();
    context.moveTo(x, 16);
    context.lineTo(x, height - 16);
    context.stroke();
  }
  context.restore();

  const bucket = Math.floor(clamp((progress - 0.47) / 0.34) * 13);
  const live = activeLanes(bucket);
  const pathProgress = ease((progress - 0.47) / 0.34);
  const tokenStages = [
    { from: 0, to: 0.14, xFrom: x0, xTo: x1 },
    { from: 0.14, to: 0.3, xFrom: x1, xTo: x2 },
    { from: 0.3, to: 0.47, xFrom: x2, xTo: x3 },
    { from: 0.47, to: 0.81, xFrom: x3, xTo: x4 },
    { from: 0.81, to: 0.94, xFrom: x4, xTo: x5 },
  ];
  const tokenStage =
    tokenStages.find((stage) => progress <= stage.to) ??
    tokenStages[tokenStages.length - 1];
  const tokenStageProgress = ease(
    (progress - tokenStage.from) / (tokenStage.to - tokenStage.from),
  );
  const tokenX =
    tokenStage.xFrom +
    (tokenStage.xTo - tokenStage.xFrom) * tokenStageProgress;
  const candidateLane = [...activeLanes(13)][0];

  for (let lane = 0; lane < 32; lane += 1) {
    const y = top + lane * laneGap;

    context.strokeStyle = palette.lineSoft;
    context.globalAlpha = lane % 8 === 0 ? 0.9 : 0.55;
    context.lineWidth = lane % 8 === 0 ? 1 : 0.75;
    context.beginPath();
    context.moveTo(x0, y);
    context.lineTo(x5, y);
    context.stroke();

    if (!compact && lane % 8 === 0) {
      context.globalAlpha = 0.8;
      context.fillStyle = palette.quiet;
      context.font = "9px ui-monospace, monospace";
      context.textAlign = "left";
      context.fillText(String(lane).padStart(2, "0"), 2, y + 3);
    }

    const seedWidth = Math.max(1.5, Math.min(3.5, (x1 - x0 - 12) / 10));
    const seedGap = seedWidth + 1.5;
    const activeSeed = (lane * 5 + 3) % 8;
    for (let seed = 0; seed < 8; seed += 1) {
      context.globalAlpha = seed === activeSeed ? 0.78 : 0.18;
      context.fillStyle =
        seed === activeSeed ? palette.accent : palette.foreground;
      context.fillRect(x0 + 5 + seed * seedGap, y - 1, seedWidth, 2);
    }

    if (mode === "baseline") {
      const cell = Math.max(1.4, laneGap * 0.25);
      for (let bit = 0; bit < 3; bit += 1) {
        context.globalAlpha = 0.2 + bit * 0.13;
        context.fillStyle =
          bit === 1 ? palette.accent : palette.foreground;
        context.fillRect(
          x2 + 7 + bit * (cell + 2),
          y - cell / 2,
          cell,
          cell,
        );
      }
    } else if (mode === "p6") {
      const skipped = (lane * 7 + 3) % 5 !== 0;
      context.globalAlpha = skipped ? 0.25 : 0.75;
      context.strokeStyle = skipped ? palette.quiet : palette.accent;
      context.strokeRect(x2 + 9, y - 2.2, 4.4, 4.4);
      if (skipped) {
        context.beginPath();
        context.moveTo(x2 + 8.5, y + 2.7);
        context.lineTo(x2 + 14, y - 2.7);
        context.stroke();
      }
    } else {
      for (let plane = 0; plane < 2; plane += 1) {
        const on = ((lane >> plane) + lane * 3) % 4 < 2;
        context.globalAlpha = on ? 0.75 : 0.2;
        context.fillStyle = on ? palette.accent : palette.foreground;
        context.fillRect(x2 + 8 + plane * 6, y - 1.7, 3.5, 3.5);
      }
    }

    if (progress >= 0.47) {
      const isLive = live.has(lane);
      context.globalAlpha = isLive ? 0.92 : 0.12;
      context.strokeStyle = isLive ? palette.accent : palette.muted;
      context.lineWidth = isLive ? 1.5 : 0.75;
      context.beginPath();
      context.moveTo(x3, y);
      const segments = 6;
      for (let segment = 1; segment <= segments; segment += 1) {
        const segmentX =
          x3 + ((x4 - x3) * segment * pathProgress) / segments;
        const direction = (lane + segment + bucket) % 3 - 1;
        context.lineTo(segmentX, y + direction * Math.min(2.2, laneGap * 0.28));
      }
      context.stroke();
    }

    const inPath = tokenX >= x3 && tokenX <= x4;
    const tokenLive = !inPath || live.has(lane);
    context.globalAlpha = tokenLive ? 0.78 : 0.12;
    context.fillStyle = tokenLive ? palette.accent : palette.muted;
    const tokenRadius = tokenLive ? 1.8 : 1.2;
    context.beginPath();
    context.arc(tokenX, y, tokenRadius, 0, Math.PI * 2);
    context.fill();

    if (progress > 0.86 && lane === candidateLane) {
      const outputProgress = ease((progress - 0.86) / 0.08);
      const outputX = x4 + (x5 - x4) * outputProgress;
      context.globalAlpha = 0.95;
      context.fillStyle = palette.accent;
      context.fillRect(outputX - 2.5, y - 2.5, 5, 5);
    }
  }

  if (progress >= 0.94) {
    const returnProgress = ease((progress - 0.94) / 0.06);
    const fromY = top + candidateLane * laneGap;
    const controlY = height - 5;
    context.save();
    context.globalAlpha = 0.62;
    context.strokeStyle = palette.accent;
    context.lineWidth = 1;
    context.setLineDash([3, 4]);
    context.beginPath();
    context.moveTo(x5, fromY);
    context.bezierCurveTo(
      x5,
      controlY,
      x1,
      controlY,
      x1,
      bottom,
    );
    context.stroke();
    context.restore();

    const t = returnProgress;
    const oneMinusT = 1 - t;
    const returnX =
      oneMinusT ** 3 * x5 +
      3 * oneMinusT ** 2 * t * x5 +
      3 * oneMinusT * t ** 2 * x1 +
      t ** 3 * x1;
    const returnY =
      oneMinusT ** 3 * fromY +
      3 * oneMinusT ** 2 * t * controlY +
      3 * oneMinusT * t ** 2 * controlY +
      t ** 3 * bottom;
    context.globalAlpha = 0.95;
    context.fillStyle = palette.accent;
    context.beginPath();
    context.arc(returnX, returnY, 2.2, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
}

export default function SeedforgeKernel() {
  const [modeId, setModeId] = useState<ModeId>("p7");
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const mode = modes.find((item) => item.id === modeId) ?? modes[2];

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvasHostRef.current;
    if (!canvas || !host) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorMedia = window.matchMedia("(prefers-color-scheme: dark)");
    let reduce = media.matches;
    let visible = false;
    let finished = reduce;
    let elapsed = reduce ? 7200 : 0;
    let lastTime = 0;
    let frame = 0;
    let currentProgress = reduce ? 1 : 0;
    let palette = readPalette();
    let size: TraceSize = { width: 0, height: 0, dpr: 1 };

    setReducedMotion(reduce);
    setPhase(reduce ? 5 : 0);

    const resize = () => {
      const width = Math.max(280, Math.floor(host.getBoundingClientRect().width));
      const height = width < 520 ? 310 : width < 760 ? 350 : 410;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { width, height, dpr };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      palette = readPalette();
      drawTrace(canvas, size, modeId, currentProgress, palette);
    };

    const stopFrame = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    };

    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || finished || reduce) return;
      if (!lastTime) lastTime = time;
      elapsed += Math.min(time - lastTime, 50);
      lastTime = time;
      currentProgress = clamp(elapsed / 7200);
      drawTrace(canvas, size, modeId, currentProgress, palette);

      const nextPhase = phaseFromProgress(currentProgress);
      setPhase((previous) => (previous === nextPhase ? previous : nextPhase));

      if (currentProgress >= 1) {
        finished = true;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const startFrame = () => {
      if (!frame && visible && !document.hidden && !finished && !reduce) {
        frame = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      if (document.hidden) stopFrame();
      else startFrame();
    };

    const onMotionPreference = (event: MediaQueryListEvent) => {
      reduce = event.matches;
      setReducedMotion(reduce);
      if (reduce) {
        finished = true;
        currentProgress = 1;
        setPhase(5);
        stopFrame();
        drawTrace(canvas, size, modeId, currentProgress, palette);
      } else {
        finished = false;
        elapsed = 0;
        currentProgress = 0;
        setPhase(0);
        startFrame();
      }
    };

    const onColorPreference = () => resize();

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startFrame();
        else stopFrame();
      },
      { threshold: 0.18 },
    );
    intersectionObserver.observe(host);

    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotionPreference);
    colorMedia.addEventListener("change", onColorPreference);

    return () => {
      stopFrame();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotionPreference);
      colorMedia.removeEventListener("change", onColorPreference);
    };
  }, [modeId, run]);

  const chooseMode = (nextMode: ModeId) => {
    setModeId(nextMode);
    setRun((value) => value + 1);
  };

  const replay = () => {
    setRun((value) => value + 1);
  };

  return (
    <article
      className="kernel-story"
      id="seedforge-core"
      aria-labelledby="kernel-title"
    >
      <div className="kernel-intro">
        <div>
          <p className="kernel-kicker">seedforge / CUDA search microscope</p>
          <h3 id="kernel-title">
            One warp. Thirty-two threads. A few active lanes.
          </h3>
        </div>
        <p>
          Each CUDA thread walks a short seed span: ordered prechecks first,
          then Wang worldgen, path validation, spawn hooks, and an incremental
          object filter. The expensive middle is sparse and divergent—not
          limited by peak arithmetic or DRAM bandwidth.
        </p>
      </div>

      <div className="kernel-panel">
        <div className="kernel-toolbar">
          <div className="kernel-status">
            <span className="kernel-status-dot" aria-hidden="true" />
            <span>{phaseLabels[phase]}</span>
          </div>

          <div className="kernel-actions">
            <div
              aria-label="Optimization stage"
              className="kernel-modes"
              role="group"
            >
              {modes.map((item) => (
                <button
                  aria-pressed={item.id === modeId}
                  className={item.id === modeId ? "is-active" : undefined}
                  key={item.id}
                  onClick={() => chooseMode(item.id)}
                  type="button"
                >
                  {item.tab}
                </button>
              ))}
            </div>
            <button
              className="kernel-replay"
              disabled={reducedMotion}
              onClick={replay}
              type="button"
            >
              {reducedMotion ? "motion off" : "replay"}
            </button>
          </div>
        </div>

        <div className="kernel-axis" aria-hidden="true">
          <span>span × 8</span>
          <span>precheck</span>
          <span>{mode.stage}</span>
          <span>DFS path</span>
          <span>filter</span>
        </div>

        <div className="kernel-canvas-host" ref={canvasHostRef}>
          <canvas
            aria-label="Schematic CUDA warp trace with 32 lanes; measured values are described below"
            ref={canvasRef}
            role="img"
          />
        </div>

        <div
          className={`kernel-gate ${phase === 5 ? "is-passed" : ""}`}
        >
          <div>
            <span>optimization release gate</span>
            <strong>CPU == GPU · canonical bytes</strong>
          </div>
          <div aria-live="polite" className="kernel-gate-result">
            <span>seed-block-v2</span>
            <strong>{phase === 5 ? "PASS" : "WAIT"}</strong>
          </div>
        </div>

        <div className="kernel-readouts">
          <div aria-live="polite" className="kernel-mode-readout">
            <span>{mode.title}</span>
            <strong>{mode.metric}</strong>
            <small>{mode.metricLabel}</small>
            <p>{mode.detail}</p>
          </div>

          <dl className="kernel-measures">
            <div>
              <dt>active lanes / instruction</dt>
              <dd>3.08 / 32</dd>
              <span>P6 NCU · coalmine</span>
            </div>
            <div>
              <dt>end-to-end gain</dt>
              <dd>2.85×</dd>
              <span>20.9k → 59.5k seed/s</span>
            </div>
            <div>
              <dt>exhaustive census</dt>
              <dd>2.147B</dd>
              <span>world seeds</span>
            </div>
          </dl>
        </div>

        <div className="kernel-footnote">
          <p>
            Representative execution trace; lane masks are schematic. The
            eight-seed span reflects the final V100 m18/s8 shape; performance
            figures use the coalmine workload.
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
            . A hit returns the unprocessed tail of its thread&apos;s span to
            the host queue; the gate validates releases, not every runtime
            seed.
          </p>
        </div>
      </div>
    </article>
  );
}
