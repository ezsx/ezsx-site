"use client";

import ProjectStory from "../../components/story/project-story";
import type { StoryLabels } from "../../components/story/story-types";
import type { VpnContent } from "./content";
import { VpnScene, type VpnSceneCopy } from "./scenes";
import VpnTechnicalArchitecture, {
  type VpnTechnicalCopy,
} from "./technical-architecture";

type VpnStoryClientProps = Readonly<{
  content: VpnContent;
  labels: StoryLabels;
  sceneCopy: VpnSceneCopy;
  technicalCopy: VpnTechnicalCopy;
}>;

export default function VpnStoryClient({
  content,
  labels,
  sceneCopy,
  technicalCopy,
}: VpnStoryClientProps) {
  return (
    <ProjectStory
      announceStage
      articleClassName="vpn-story"
      articleId="vpn-control-plane"
      bodyId="vpn-system-story"
      brief={content.brief}
      headlineClassName="vpn-headlines"
      headlines={content.headlines}
      intro={content.intro}
      kicker={content.kicker}
      labels={labels}
      navLabel={content.navLabel}
      proof={content.proof}
      proofClassName="vpn-control-proof"
      renderScene={(stage) => (
        <VpnScene copy={sceneCopy} stage={stage.id} />
      )}
      stageIntervalMs={3900}
      stages={content.stages}
      title={content.title}
      titleId="vpn-story-title"
    >
      <VpnTechnicalArchitecture text={technicalCopy} />
    </ProjectStory>
  );
}
