"use client";

import ProjectStory from "../../components/story/project-story";
import type { StoryLabels } from "../../components/story/story-types";
import type { PixelBattleContent } from "./content";
import {
  PixelBattleScene,
  type PixelBattleSceneCopy,
} from "./scenes";
import PixelBattleTechnicalRuntime, {
  type PixelBattleTechnicalCopy,
} from "./technical-runtime";

type PixelBattleStoryClientProps = Readonly<{
  content: PixelBattleContent;
  labels: StoryLabels;
  sceneCopy: PixelBattleSceneCopy;
  technicalCopy: PixelBattleTechnicalCopy;
}>;

export default function PixelBattleStoryClient({
  content,
  labels,
  sceneCopy,
  technicalCopy,
}: PixelBattleStoryClientProps) {
  return (
    <ProjectStory
      announceStage
      articleClassName="pixel-battle-story"
      articleId="pixel-battle-realtime"
      bodyId="pixel-battle-system-story"
      brief={content.brief}
      headlineClassName="pixel-battle-headlines"
      headlines={content.headlines}
      intro={content.intro}
      kicker={content.kicker}
      labels={labels}
      navLabel={content.navLabel}
      proof={content.proof}
      proofClassName="pixel-battle-proof"
      renderScene={(stage) => (
        <PixelBattleScene copy={sceneCopy} stage={stage.id} />
      )}
      stageIntervalMs={4100}
      stages={content.stages}
      title={content.title}
      titleId="pixel-battle-story-title"
    >
      <PixelBattleTechnicalRuntime text={technicalCopy} />
    </ProjectStory>
  );
}
