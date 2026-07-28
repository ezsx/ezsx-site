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
    systemStory: "история системы",
    expandStory: "развернуть историю",
    collapseStory: "свернуть историю",
    nextStage: "следующий этап",
    pause: "пауза",
    replayStory: "повторить историю",
    playStory: "запустить историю",
    technicalAnchors: "технические опоры",
  },
} satisfies Record<Locale, StoryLabels>;
