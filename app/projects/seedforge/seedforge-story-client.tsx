"use client";

import ProjectStory from "../../components/story/project-story";
import type { StoryLabels } from "../../components/story/story-types";
import type { SeedforgeContent } from "./content";
import type {
  CudaTraceCopy,
  CudaTracePhase,
} from "./cuda-trace-content";
import {
  SeedforgeScene,
  type SeedforgeSceneCopy,
} from "./scenes";
import type { SeedforgeTechnicalCopy } from "./technical-content";
import SeedforgeTechnicalProfile from "./technical-profile";

type SeedforgeStoryClientProps = Readonly<{
  content: SeedforgeContent;
  labels: StoryLabels;
  sceneCopy: SeedforgeSceneCopy;
  technicalCopy: SeedforgeTechnicalCopy;
  traceCopy: CudaTraceCopy;
  tracePhases: readonly CudaTracePhase[];
}>;

export default function SeedforgeStoryClient({
  content,
  labels,
  sceneCopy,
  technicalCopy,
  traceCopy,
  tracePhases,
}: SeedforgeStoryClientProps) {
  return (
    <ProjectStory
      articleClassName="seedforge-story"
      articleId="seedforge-core"
      bodyId="seedforge-system-story"
      brief={content.brief}
      headlines={content.headlines}
      intro={content.intro}
      kicker={content.kicker}
      labels={labels}
      navLabel={content.navLabel}
      proof={content.proof}
      renderScene={(stage) => (
        <SeedforgeScene copy={sceneCopy} stage={stage.id} />
      )}
      stageIntervalMs={3600}
      stages={content.stages}
      title={content.title}
      titleId="seedforge-title"
    >
      <SeedforgeTechnicalProfile
        text={technicalCopy}
        traceCopy={traceCopy}
        tracePhases={tracePhases}
      />
    </ProjectStory>
  );
}
