"use client";

import ProjectStory from "../../components/story/project-story";
import type { StoryLabels } from "../../components/story/story-types";
import type { RagContent } from "./content";
import { RagScene, type RagSceneCopy } from "./scenes";
import RagTechnicalRetrieval, {
  type RagTechnicalCopy,
} from "./technical-retrieval";

type RagStoryClientProps = Readonly<{
  content: RagContent;
  labels: StoryLabels;
  sceneCopy: RagSceneCopy;
  technicalCopy: RagTechnicalCopy;
}>;

export default function RagStoryClient({
  content,
  labels,
  sceneCopy,
  technicalCopy,
}: RagStoryClientProps) {
  return (
    <ProjectStory
      announceStage
      articleClassName="rag-story"
      articleId="rag-evidence-system"
      bodyId="rag-system-story"
      headlineClassName="rag-headlines"
      headlines={content.headlines}
      intro={content.intro}
      kicker={content.kicker}
      labels={labels}
      navLabel={content.navLabel}
      proof={content.proof}
      proofClassName="rag-benchmark-proof"
      renderScene={(stage) => (
        <RagScene copy={sceneCopy} stage={stage.id} />
      )}
      stageIntervalMs={4200}
      stages={content.stages}
      title={content.title}
      titleId="rag-story-title"
    >
      <RagTechnicalRetrieval text={technicalCopy} />
    </ProjectStory>
  );
}
