"use client";

import { useEffect, useRef, useState } from "react";

export type CudaPipelineId = "alu" | "fma" | "lsu" | "cbu" | "xu" | "fp64";

export type CudaTracePhaseId =
  | "dispatch"
  | "precheck"
  | "wang"
  | "path"
  | "hooks"
  | "objects"
  | "filter"
  | "commit";

type CudaTracePhase = {
  id: CudaTracePhaseId;
  number: string;
  axis: string;
  status: string;
  summary: string;
  pipelines: CudaPipelineId[];
};

export const CUDA_TRACE_PHASES: CudaTracePhase[] = [
  {
    id: "dispatch",
    number: "01",
    axis: "span × 8",
    status: "dispatching 64-thread blocks",
    summary: "each CUDA thread receives a short seed span",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "precheck",
    number: "02",
    axis: "optional precheck",
    status: "running configured cheap gates",
    summary: "reject or bypass before world reconstruction",
    pipelines: ["alu", "fma", "cbu", "fp64"],
  },
  {
    id: "wang",
    number: "03",
    axis: "Wang layout",
    status: "building compact tile indices",
    summary: "PRNG, Wang layout and path-bit inputs",
    pipelines: ["alu", "fma", "lsu", "xu", "fp64"],
  },
  {
    id: "path",
    number: "04",
    axis: "path + retry",
    status: "walking sparse traversability paths",
    summary: "bitmap predicates, DFS, visited state and retry",
    pipelines: ["alu", "lsu", "cbu", "xu"],
  },
  {
    id: "hooks",
    number: "05",
    axis: "spawn hooks",
    status: "scanning baked Wang spawn hooks",
    summary: "bounds, room, color, biome and chunk gates",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "objects",
    number: "06",
    axis: "pixel-scene",
    status: "resolving scene and object candidates",
    summary: "descriptor selection and nested spawn indexing",
    pipelines: ["alu", "fma", "lsu", "fp64"],
  },
  {
    id: "filter",
    number: "07",
    axis: "hit filter",
    status: "feeding the incremental filter",
    summary: "match counters accept only requested records",
    pipelines: ["alu", "lsu", "cbu"],
  },
  {
    id: "commit",
    number: "08",
    axis: "binary hit",
    status: "returning the accepted payload",
    summary: "GPU result first; canonical evidence is host-side",
    pipelines: ["alu", "lsu"],
  },
];

const PHASE_STARTS = [0, 0.1, 0.2, 0.36, 0.64, 0.74, 0.83, 0.93];
const PHASE_ENDS = [0.1, 0.2, 0.36, 0.64, 0.74, 0.83, 0.93, 1];
const TRACE_DURATION = 9000;

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

function phaseIndexFromProgress(progress: number) {
  const index = PHASE_ENDS.findIndex((end) => progress <= end);
  return index < 0 ? CUDA_TRACE_PHASES.length - 1 : index;
}

function manualProgress(index: number) {
  return PHASE_STARTS[index] + (PHASE_ENDS[index] - PHASE_STARTS[index]) * 0.72;
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
    muted: cssColor("--muted", "#a0a9b4"),
    quiet: cssColor("--quiet", "#8b949e"),
    line: cssColor("--line", "#30363d"),
    lineSoft: cssColor("--line-soft", "#21262d"),
    surface: cssColor("--surface", "#161b22"),
  };
}

function stageX(progress: number, positions: number[]) {
  const index = phaseIndexFromProgress(progress);
  if (index === positions.length - 1) return positions[index];
  const local = ease(
    (progress - PHASE_STARTS[index]) /
      (PHASE_ENDS[index] - PHASE_STARTS[index]),
  );
  return positions[index] + (positions[index + 1] - positions[index]) * local;
}

function drawCross(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
) {
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x - 2.5, y - 2.5);
  context.lineTo(x + 2.5, y + 2.5);
  context.moveTo(x + 2.5, y - 2.5);
  context.lineTo(x - 2.5, y + 2.5);
  context.stroke();
}

function drawTrace(
  canvas: HTMLCanvasElement,
  size: TraceSize,
  progress: number,
  palette: Palette,
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const { width, height, dpr } = size;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);

  const positions = [0.045, 0.155, 0.285, 0.42, 0.65, 0.755, 0.855, 0.95].map(
    (position) => width * position,
  );
  const top = 34;
  const bottom = height - 32;
  const laneGap = (bottom - top) / 31;
  const currentPhase = phaseIndexFromProgress(progress);
  const tokenX = stageX(progress, positions);
  const pathLanes = new Set([3, 12, 21, 29]);
  const precheckPasses = new Set([0, 3, 7, 12, 16, 21, 24, 29, 31]);
  const candidateLane = 12;
  const compact = width < 620;

  const phaseLeft =
    currentPhase === 0
      ? 0
      : (positions[currentPhase - 1] + positions[currentPhase]) / 2;
  const phaseRight =
    currentPhase === positions.length - 1
      ? width
      : (positions[currentPhase] + positions[currentPhase + 1]) / 2;
  context.globalAlpha = 0.34;
  context.fillStyle = palette.surface;
  context.fillRect(phaseLeft, 16, phaseRight - phaseLeft, height - 32);
  context.globalAlpha = 1;

  context.save();
  context.strokeStyle = palette.line;
  context.lineWidth = 1;
  context.setLineDash([2, 5]);
  for (const x of positions.slice(1)) {
    context.beginPath();
    context.moveTo(x, 16);
    context.lineTo(x, height - 16);
    context.stroke();
  }
  context.restore();

  for (let lane = 0; lane < 32; lane += 1) {
    const y = top + lane * laneGap;
    const passedPrecheck = precheckPasses.has(lane);
    const pathActive = pathLanes.has(lane);

    context.strokeStyle = palette.lineSoft;
    context.globalAlpha = lane % 8 === 0 ? 0.9 : 0.55;
    context.lineWidth = lane % 8 === 0 ? 1 : 0.75;
    context.beginPath();
    context.moveTo(positions[0], y);
    context.lineTo(positions[positions.length - 1], y);
    context.stroke();

    if (!compact && lane % 8 === 0) {
      context.globalAlpha = 0.9;
      context.fillStyle = palette.quiet;
      context.font = "11px ui-monospace, monospace";
      context.textAlign = "left";
      context.fillText(String(lane).padStart(2, "0"), 3, y + 4);
    }

    const seedWidth = Math.max(
      1.5,
      Math.min(3.2, (positions[1] - positions[0] - 12) / 10),
    );
    for (let seed = 0; seed < 8; seed += 1) {
      context.globalAlpha = seed === (lane * 5 + 3) % 8 ? 0.82 : 0.2;
      context.fillStyle =
        seed === (lane * 5 + 3) % 8 ? palette.accent : palette.foreground;
      context.fillRect(
        positions[0] + 4 + seed * (seedWidth + 1.4),
        y - 1,
        seedWidth,
        2,
      );
    }

    if (progress >= PHASE_STARTS[1] && !passedPrecheck) {
      context.globalAlpha = 0.58;
      drawCross(context, positions[1], y, palette.quiet);
    }

    if (progress >= PHASE_STARTS[2] && passedPrecheck) {
      for (let tile = 0; tile < 3; tile += 1) {
        const on = (lane + tile * 3) % 4 !== 0;
        context.globalAlpha = on ? 0.76 : 0.2;
        context.fillStyle = on ? palette.accent : palette.foreground;
        context.fillRect(positions[2] - 6 + tile * 5, y - 2, 3.5, 3.5);
      }
    }

    if (progress >= PHASE_STARTS[3] && passedPrecheck) {
      context.globalAlpha = pathActive ? 0.94 : 0.13;
      context.strokeStyle = pathActive ? palette.accent : palette.muted;
      context.lineWidth = pathActive ? 1.5 : 0.75;
      context.beginPath();
      context.moveTo(positions[3], y);
      const pathProgress = ease(
        (progress - PHASE_STARTS[3]) /
          (PHASE_ENDS[3] - PHASE_STARTS[3]),
      );
      for (let segment = 1; segment <= 7; segment += 1) {
        const segmentX =
          positions[3] +
          ((positions[4] - positions[3]) * segment * pathProgress) / 7;
        const direction = (lane + segment * 2) % 3 - 1;
        context.lineTo(
          segmentX,
          y + direction * Math.min(2.4, laneGap * 0.3),
        );
      }
      context.stroke();
    }

    if (progress >= PHASE_STARTS[4] && pathActive) {
      context.globalAlpha = 0.86;
      context.strokeStyle = palette.accent;
      context.lineWidth = 1;
      context.save();
      context.translate(positions[4], y);
      context.rotate(Math.PI / 4);
      context.strokeRect(-2.7, -2.7, 5.4, 5.4);
      context.restore();
    }

    if (progress >= PHASE_STARTS[5] && pathActive) {
      context.globalAlpha = 0.8;
      context.fillStyle = palette.accent;
      context.fillRect(positions[5] - 4, y - 3, 3, 3);
      context.fillRect(positions[5] + 1, y, 3, 3);
    }

    if (progress >= PHASE_STARTS[6] && pathActive) {
      context.globalAlpha = lane === candidateLane ? 0.96 : 0.18;
      context.strokeStyle =
        lane === candidateLane ? palette.accent : palette.muted;
      context.lineWidth = lane === candidateLane ? 1.5 : 0.8;
      context.strokeRect(positions[6] - 3.5, y - 3.5, 7, 7);
    }

    const eligible =
      currentPhase < 2 ||
      (passedPrecheck && currentPhase < 4) ||
      (pathActive && currentPhase < 6) ||
      (lane === candidateLane && currentPhase >= 6);
    if (eligible) {
      context.globalAlpha = lane === candidateLane ? 0.98 : 0.68;
      context.fillStyle =
        lane === candidateLane ? palette.accent : palette.muted;
      context.beginPath();
      context.arc(tokenX, y, lane === candidateLane ? 2.3 : 1.5, 0, Math.PI * 2);
      context.fill();
    }

    if (progress >= PHASE_STARTS[7] && lane === candidateLane) {
      context.globalAlpha = 0.98;
      context.fillStyle = palette.accent;
      context.fillRect(positions[7] - 3, y - 3, 6, 6);
    }
  }

  if (progress >= PHASE_STARTS[3]) {
    const retryProgress = ease(
      (progress - PHASE_STARTS[3]) /
        (PHASE_ENDS[3] - PHASE_STARTS[3]),
    );
    const retryY = top - 14;
    context.save();
    context.globalAlpha = 0.6;
    context.strokeStyle = palette.accent;
    context.lineWidth = 1;
    context.setLineDash([3, 4]);
    context.beginPath();
    context.moveTo(positions[4], top);
    context.bezierCurveTo(
      positions[4],
      retryY,
      positions[2],
      retryY,
      positions[2],
      top,
    );
    context.stroke();
    context.globalAlpha = 0.95;
    context.fillStyle = palette.accent;
    const retryX =
      positions[4] - (positions[4] - positions[2]) * retryProgress;
    context.beginPath();
    context.arc(retryX, retryY, 2, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  if (progress >= PHASE_STARTS[7]) {
    const returnProgress = ease(
      (progress - PHASE_STARTS[7]) /
        (PHASE_ENDS[7] - PHASE_STARTS[7]),
    );
    const fromY = top + candidateLane * laneGap;
    const controlY = height - 6;
    context.save();
    context.globalAlpha = 0.62;
    context.strokeStyle = palette.accent;
    context.lineWidth = 1;
    context.setLineDash([3, 4]);
    context.beginPath();
    context.moveTo(positions[7], fromY);
    context.bezierCurveTo(
      positions[7],
      controlY,
      positions[0],
      controlY,
      positions[0],
      bottom,
    );
    context.stroke();
    context.globalAlpha = 0.95;
    context.fillStyle = palette.accent;
    const returnX =
      positions[7] - (positions[7] - positions[0]) * returnProgress;
    context.beginPath();
    context.arc(returnX, controlY, 2.2, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  context.globalAlpha = 1;
}

type CudaSearchTraceProps = {
  onPhaseChange: (phase: CudaTracePhaseId) => void;
};

export default function CudaSearchTrace({
  onPhaseChange,
}: CudaSearchTraceProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [manualPhase, setManualPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const phase = CUDA_TRACE_PHASES[phaseIndex];
  const playing = inViewport && !reducedMotion && !paused && !complete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorMedia = window.matchMedia("(prefers-color-scheme: dark)");
    let reduce = motionMedia.matches;
    let visible = false;
    let finished = reduce || progressRef.current >= 1;
    let elapsed = progressRef.current * TRACE_DURATION;
    let lastTime = 0;
    let frame = 0;
    let reportedPhase = -1;
    let progress = reduce ? manualProgress(manualPhase) : progressRef.current;
    let palette = readPalette();
    let size: TraceSize = { width: 0, height: 0, dpr: 1 };

    const reportPhase = (nextPhase: number) => {
      if (reportedPhase === nextPhase) return;
      reportedPhase = nextPhase;
      setPhaseIndex(nextPhase);
      onPhaseChange(CUDA_TRACE_PHASES[nextPhase].id);
    };

    const resize = () => {
      const width = Math.max(280, Math.floor(host.getBoundingClientRect().width));
      const height = width < 520 ? 310 : width < 820 ? 345 : 380;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { width, height, dpr };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      palette = readPalette();
      drawTrace(canvas, size, progress, palette);
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
      progress = clamp(elapsed / TRACE_DURATION);
      progressRef.current = progress;
      reportPhase(phaseIndexFromProgress(progress));
      drawTrace(canvas, size, progress, palette);

      if (progress >= 1) {
        finished = true;
        setComplete(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const startFrame = () => {
      if (
        !frame &&
        visible &&
        !document.hidden &&
        !finished &&
        !reduce &&
        !paused
      ) {
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
      stopFrame();
      if (reduce) {
        finished = true;
        progress = manualProgress(manualPhase);
        progressRef.current = progress;
        setComplete(false);
        setPaused(false);
        reportPhase(manualPhase);
        drawTrace(canvas, size, progress, palette);
      } else {
        finished = false;
        elapsed = 0;
        progress = 0;
        progressRef.current = 0;
        setComplete(false);
        setPaused(false);
        reportPhase(0);
        drawTrace(canvas, size, progress, palette);
        startFrame();
      }
    };

    const onColorPreference = () => resize();

    setReducedMotion(reduce);
    if (reduce) progressRef.current = progress;
    reportPhase(reduce ? manualPhase : phaseIndexFromProgress(progress));
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        setInViewport(visible);
        if (visible) startFrame();
        else stopFrame();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(host);

    document.addEventListener("visibilitychange", onVisibility);
    motionMedia.addEventListener("change", onMotionPreference);
    colorMedia.addEventListener("change", onColorPreference);

    return () => {
      stopFrame();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionMedia.removeEventListener("change", onMotionPreference);
      colorMedia.removeEventListener("change", onColorPreference);
    };
  }, [manualPhase, onPhaseChange, paused, run]);

  const controlTrace = () => {
    if (reducedMotion) {
      setManualPhase((current) => (current + 1) % CUDA_TRACE_PHASES.length);
      return;
    }
    if (!complete) {
      setPaused((current) => !current);
      return;
    }
    progressRef.current = 0;
    setComplete(false);
    setPaused(false);
    setRun((current) => current + 1);
  };

  return (
    <section
      className={`cuda-trace ${playing ? "is-playing" : "is-still"}`}
      aria-labelledby="cuda-trace-title"
    >
      <div className="trace-toolbar">
        <div>
          <span>execution trace / final P7 schematic</span>
          <strong id="cuda-trace-title">One warp through the search</strong>
        </div>
        <div className="trace-toolbar-actions">
          <span
            aria-live={reducedMotion ? "polite" : undefined}
            className="trace-status"
          >
            <i aria-hidden="true" />
            {phase.status}
          </span>
          <button onClick={controlTrace} type="button">
            {reducedMotion
              ? "next stage"
              : complete
                ? "replay trace"
                : paused
                  ? "resume trace"
                  : "pause trace"}
          </button>
        </div>
      </div>

      <div className="trace-workspace">
        <div className="trace-main">
          <ol className="trace-axis" aria-label="CUDA search stages">
            {CUDA_TRACE_PHASES.map((item, index) => (
              <li
                className={index === phaseIndex ? "is-active" : undefined}
                key={item.id}
              >
                <span>{item.number}</span>
                <strong>{item.axis}</strong>
                <small>{item.summary}</small>
              </li>
            ))}
          </ol>

          <div className="trace-canvas-host" ref={hostRef}>
            <canvas
              aria-label="Representative 32-lane CUDA warp trace: dispatch, optional precheck, Wang layout, bitmap path traversal and retry, spawn hooks, pixel-scene and object selection, incremental hit filtering, then a binary result returned to the host"
              ref={canvasRef}
              role="img"
            />
          </div>
        </div>

        <aside
          aria-label="SM residency and representative stage"
          className="trace-sm-panel"
        >
          <div
            aria-hidden="true"
            className={`sm-grid ${playing ? "is-playing" : ""}`}
            data-phase={phase.id}
          >
            {Array.from({ length: 80 }, (_, index) => (
              <span
                className={
                  (index + phaseIndex * 3) % 10 < 2
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
              {phase.number} · {phase.axis}
            </strong>
            <small>
              {phase.status}. Every SM can execute every stage.
            </small>
          </div>
        </aside>
      </div>

      <div className="trace-bottom">
        <ul className="trace-legend" aria-label="Execution trace legend">
          <li><i className="trace-seed" aria-hidden="true" />seed span</li>
          <li><i className="trace-reject" aria-hidden="true" />configured reject</li>
          <li><i className="trace-lane" aria-hidden="true" />active lane</li>
          <li><i className="trace-hit" aria-hidden="true" />accepted binary hit</li>
        </ul>
        <div className="trace-gate">
          <span>release evidence / host side</span>
          <strong>binary payload → canonical bytes → CPU = V100 = RTX</strong>
        </div>
      </div>

      <p className="trace-caveat">
        Sequence, lane masks, SM cohort and duration are schematic—not
        stage-time or per-SM telemetry. Static prechecks are configuration
        dependent; the profiled default coalmine command bypassed them. The
        3.08-lane and pipeline counters are P6 diagnostic context, while this
        trace follows the final P7 search shape.
      </p>
    </section>
  );
}
