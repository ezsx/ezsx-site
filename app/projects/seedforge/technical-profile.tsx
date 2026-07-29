"use client";

import { useState } from "react";
import TechnicalDisclosure from "../../components/story/technical-disclosure";
import CudaSearchTrace from "./cuda-search-trace";
import type {
  CudaPipelineId,
  CudaTraceCopy,
  CudaTracePhase,
  CudaTracePhaseId,
} from "./cuda-trace-content";
import type { SeedforgeTechnicalCopy } from "./technical-content";

const profileMetrics = [
  { id: "compute", value: 17.41, display: "17.41%" },
  { id: "dram", value: 8, display: "8.00%" },
  { id: "issue", value: 20.39, display: "20.39%" },
  { id: "occupancy", value: 14.66, display: "14.66%" },
] as const;

const cudaPipelines: {
  id: CudaPipelineId;
  label: string;
  value: number;
  display: string;
}[] = [
  { id: "alu", label: "ALU / INT", value: 7.937, display: "7.94%" },
  { id: "fma", label: "FMA pipe", value: 5.536, display: "5.54%" },
  { id: "lsu", label: "LSU / LD-ST", value: 8.18, display: "8.18%" },
  { id: "cbu", label: "CBU / control", value: 4.204, display: "4.20%" },
  { id: "xu", label: "XU / special", value: 4.093, display: "4.09%" },
  { id: "fp64", label: "FP64", value: 0.144, display: "0.14%" },
];


export default function SeedforgeTechnicalProfile({
  text,
  traceCopy,
  tracePhases,
}: {
  text: SeedforgeTechnicalCopy;
  traceCopy: CudaTraceCopy;
  tracePhases: readonly CudaTracePhase[];
}) {
  const [cudaPhase, setCudaPhase] =
    useState<CudaTracePhaseId>("dispatch");
  const [cudaTracePlaying, setCudaTracePlaying] = useState(false);
  const cudaPhaseIndex = tracePhases.findIndex(
    (item) => item.id === cudaPhase,
  );
  const cudaPhaseDetail =
    tracePhases[cudaPhaseIndex] ?? tracePhases[0];

  return (
    <>
      <TechnicalDisclosure
        eyebrow={text.eyebrow}
        labels={{
          expand: text.expand,
          collapse: text.collapse,
        }}
        meta={text.meta}
        title={text.title}
      >
        <div className="profile-body">
          <div className="profile-topology">
            <div className="technical-section-heading">
              <span>{text.hierarchy}</span>
              <strong>{text.snapshot}</strong>
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
                <strong>960 {text.blocks}</strong>
                <small>2 {text.waves}</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>block</span>
                <strong>64 {text.threads}</strong>
                <small>2 {text.warps}</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>warp</span>
                <strong>3.08 / 32</strong>
                <small>{text.activeLanes}</small>
              </div>
            </div>

            <section
              className="sm-pipelines"
              aria-labelledby="sm-pipelines-title"
            >
              <div className="sm-pipelines-heading">
                <span id="sm-pipelines-title">{text.pipelines}</span>
                <strong>{text.pipelinePeak}</strong>
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
                    <small>{text.pipelineDetails[pipeline.id]}</small>
                  </div>
                ))}
              </div>
              <p>{text.counterNote}</p>
            </section>

            <div className="sm-workload-note">
              <strong>{text.workload}</strong>
              <span>{text.workloadDetail}</span>
            </div>

            <div className="final-launch-note">
              <span>{text.finalLaunch}</span>
              <strong>{text.finalLaunchConfig}</strong>
              <small>{text.counterHistory}</small>
            </div>
          </div>

          <div className="profile-pipelines">
            <div className="technical-section-heading">
              <span>{text.pipelineLoad}</span>
              <strong>Nsight Compute · coalmine</strong>
            </div>

            <dl className="profile-bars">
              {profileMetrics.map((metric) => (
                <div key={metric.id}>
                  <dt>
                    <span>{text.metricLabels[metric.id]}</span>
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
                <span>{text.memoryWaits}</span>
                <strong>47.71%</strong>
                <small>{text.memoryWaitShare}</small>
              </div>
              <div>
                <span>{text.queuePressure}</span>
                <strong>36.57%</strong>
                <small>{text.queuePressureShare}</small>
              </div>
            </div>

            <aside aria-label={text.smAria} className="profile-sm-panel">
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
                <span>{text.smCaption}</span>
                <span>{text.representative}</span>
              </div>

              <div className="sm-phase-readout">
                <span>{text.blockStage}</span>
                <strong>
                  {cudaPhaseDetail.number} · {cudaPhaseDetail.axis}
                </strong>
                <small>
                  {cudaPhaseDetail.status}. {text.everySm}
                </small>
              </div>
            </aside>
          </div>
        </div>

        <CudaSearchTrace
          copy={traceCopy}
          onPhaseChange={setCudaPhase}
          onPlaybackChange={setCudaTracePlaying}
          phases={tracePhases}
        />

        <div className="profile-conclusion">
          <div>
            <span>{text.profilerReading}</span>
            <strong>{text.reading}</strong>
          </div>
          <p>{text.conclusion}</p>
        </div>

        <div className="story-notes">
          <p>{text.capacityNote}</p>
          <p>
            {text.upstreamPrefix}{" "}
            <a
              href="https://github.com/pudy248/NoitaSeedSearcherCUDA"
              rel="noreferrer"
              target="_blank"
            >
              {text.upstreamLabel}
            </a>
            . {text.upstreamSuffix}
          </p>
        </div>
      </TechnicalDisclosure>
    </>
  );
}
