import type { StoryLabels } from "../components/story/story-types";
import type { Locale } from "./locales";

export const storyLabels = {
  en: {
    systemStory: "system story",
    expandStory: "expand story",
    collapseStory: "collapse story",
    nextStage: "next stage",
    pause: "pause",
    replayStory: "replay story",
    playStory: "play story",
    technicalAnchors: "technical anchors",
  },
  ru: {
    systemStory: "system story",
    expandStory: "развернуть схему",
    collapseStory: "свернуть схему",
    nextStage: "следующий этап",
    pause: "пауза",
    replayStory: "повторить",
    playStory: "запустить",
    technicalAnchors: "технические детали",
  },
} satisfies Record<Locale, StoryLabels>;
