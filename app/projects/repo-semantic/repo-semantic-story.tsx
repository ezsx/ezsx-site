import type { Locale } from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { repoSemanticContent } from "./content";
import RepoSemanticStoryClient from "./repo-semantic-story-client";
import { repoSemanticSceneCopy } from "./scenes";
import { repoSemanticTechnicalCopy } from "./technical-context";

export default function RepoSemanticStory({
  locale,
}: {
  locale: Locale;
}) {
  return (
    <RepoSemanticStoryClient
      content={repoSemanticContent[locale]}
      labels={storyLabels[locale]}
      sceneCopy={repoSemanticSceneCopy[locale]}
      technicalCopy={repoSemanticTechnicalCopy[locale]}
    />
  );
}
