"use client";

import type { CSSProperties, ReactNode } from "react";
import type {
  NonEmptyReadonlyArray,
  RenderStoryScene,
  StoryBrief,
  StoryHeadline,
  StoryLabels,
  StoryProof,
  StoryStage,
} from "./story-types";
import { useStoryPlayback } from "./use-story-playback";

type ProjectStoryProps<Id extends string> = Readonly<{
  articleClassName: string;
  articleId: string;
  bodyId: string;
  brief: StoryBrief;
  children: ReactNode;
  headlineClassName?: string;
  headlines: readonly StoryHeadline[];
  intro: readonly string[];
  kicker: string;
  labels: StoryLabels;
  navLabel: string;
  proof: StoryProof;
  proofClassName?: string;
  renderScene: RenderStoryScene<Id>;
  stageIntervalMs: number;
  stages: NonEmptyReadonlyArray<StoryStage<Id>>;
  title: string;
  titleId: string;
  announceStage?: boolean;
}>;

export default function ProjectStory<Id extends string>({
  announceStage = false,
  articleClassName,
  articleId,
  bodyId,
  brief,
  children,
  headlineClassName = "",
  headlines,
  intro,
  kicker,
  labels,
  navLabel,
  proof,
  proofClassName = "",
  renderScene,
  stageIntervalMs,
  stages,
  title,
  titleId,
}: ProjectStoryProps<Id>) {
  const playback = useStoryPlayback({
    stageCount: stages.length,
    intervalMs: stageIntervalMs,
  });
  const stage = stages[playback.activeIndex];
  const stageNumber = (playback.activeIndex + 1)
    .toString()
    .padStart(2, "0");
  const storyStepsStyle = {
    "--story-stage-count": stages.length,
  } as CSSProperties;

  const controlLabel =
    playback.controlAction === "next"
      ? labels.nextStage
      : playback.controlAction === "pause"
        ? labels.pause
        : playback.controlAction === "replay"
          ? labels.replayStory
          : labels.playStory;

  return (
    <article
      className={`project-story ${articleClassName}`}
      aria-labelledby={titleId}
      id={articleId}
      ref={playback.rootRef}
    >
      <div className="project-story-intro">
        <div>
          <p className="project-story-kicker">{kicker}</p>
          <h3 id={titleId}>{title}</h3>
        </div>
        <div>
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section
        aria-labelledby={`${titleId} ${titleId}-brief`}
        className="project-story-brief"
      >
        <div className="project-story-brief-copy">
          <p
            className="project-story-brief-label"
            id={`${titleId}-brief`}
          >
            {brief.label}
          </p>
          <p className="project-story-brief-summary">{brief.summary}</p>
        </div>
        <ol className="project-story-brief-points">
          {brief.points.map((point, index) => (
            <li key={point.label}>
              <span aria-hidden="true">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <strong>{point.label}</strong>
              <p>{point.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="project-story-panel">
        <div className="story-toolbar">
          <button
            aria-controls={bodyId}
            aria-expanded={playback.expanded}
            className="story-disclosure"
            onClick={playback.toggleExpanded}
            type="button"
          >
            <span className="story-status">
              <span className="story-status-dot" aria-hidden="true" />
              <span>
                {labels.systemStory} · {stageNumber} /{" "}
                {stages.length.toString().padStart(2, "0")}
              </span>
            </span>
            <span className="disclosure-cue">
              <span>
                {playback.expanded
                  ? labels.collapseStory
                  : labels.expandStory}
              </span>
              <i aria-hidden="true" className="disclosure-mark">
                {playback.expanded ? "−" : "+"}
              </i>
            </span>
          </button>
          {playback.expanded ? (
            <button
              className="story-control"
              onClick={playback.togglePlayback}
              type="button"
            >
              {controlLabel}
            </button>
          ) : null}
        </div>

        <div
          className="system-story-body"
          hidden={!playback.expanded}
          id={bodyId}
        >
          {announceStage ? (
            <p aria-atomic="true" aria-live="polite" className="sr-only">
              {labels.systemStory} {stageNumber}: {stage.title}
            </p>
          ) : null}

          <ol
            aria-label={navLabel}
            className="story-steps"
            style={storyStepsStyle}
          >
            {stages.map((item, index) => {
              const itemNumber = (index + 1).toString().padStart(2, "0");

              return (
                <li key={item.id}>
                  <button
                    aria-current={
                      index === playback.activeIndex ? "step" : undefined
                    }
                    className={
                      index === playback.activeIndex ? "is-active" : undefined
                    }
                    onClick={() => playback.selectStage(index)}
                    type="button"
                  >
                    <span>{itemNumber}</span>
                    <strong>{item.tab}</strong>
                    <small>{item.result}</small>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="story-stage" key={stage.id}>
            <div className="story-stage-copy">
              <span>
                {stageNumber} · {stage.tab}
              </span>
              <h4>{stage.title}</h4>
              <p className="story-stage-summary">{stage.summary}</p>
              <p className="story-stage-detail">{stage.detail}</p>
              <ul aria-label={`${stage.title} ${labels.technicalAnchors}`}>
                {stage.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="story-stage-visual">{renderScene(stage)}</div>
          </div>

          <dl
            className={`story-headlines ${headlineClassName}`.trim()}
          >
            {headlines.map((headline) => (
              <div key={headline.label}>
                <dt>{headline.label}</dt>
                <dd>{headline.value}</dd>
                <span>{headline.detail}</span>
              </div>
            ))}
          </dl>

          <div
            className={`story-proof ${proofClassName}`.trim()}
          >
            <span>{proof.label}</span>
            <strong>{proof.value}</strong>
            <small>{proof.detail}</small>
          </div>
        </div>

        {children}
      </div>
    </article>
  );
}
