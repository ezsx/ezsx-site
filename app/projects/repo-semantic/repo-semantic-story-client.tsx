"use client";

import ProjectStory from "../../components/story/project-story";
import type { StoryLabels } from "../../components/story/story-types";
import type { RepoSemanticContent } from "./content";
import {
  RepoSemanticScene,
  type RepoSemanticSceneCopy,
} from "./scenes";
import RepoSemanticTechnicalContext, {
  type RepoSemanticTechnicalCopy,
} from "./technical-context";

type RepoSemanticStoryClientProps = Readonly<{
  content: RepoSemanticContent;
  labels: StoryLabels;
  sceneCopy: RepoSemanticSceneCopy;
  technicalCopy: RepoSemanticTechnicalCopy;
}>;

export default function RepoSemanticStoryClient({
  content,
  labels,
  sceneCopy,
  technicalCopy,
}: RepoSemanticStoryClientProps) {
  return (
    <ProjectStory
      announceStage
      articleClassName="repo-semantic-story"
      articleId="repo-semantic-context"
      bodyId="repo-semantic-system-story"
      headlineClassName="repo-semantic-headlines"
      headlines={content.headlines}
      intro={content.intro}
      kicker={content.kicker}
      labels={labels}
      navLabel={content.navLabel}
      proof={content.proof}
      proofClassName="repo-semantic-baseline-proof"
      renderScene={(stage) => (
        <RepoSemanticScene copy={sceneCopy} stage={stage.id} />
      )}
      stageIntervalMs={4400}
      stages={content.stages}
      title={content.title}
      titleId="repo-semantic-story-title"
    >
      <RepoSemanticTechnicalContext text={technicalCopy} />
    </ProjectStory>
  );
}
