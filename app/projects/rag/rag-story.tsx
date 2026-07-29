import {
  technicalContentLocale,
  type Locale,
} from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { ragContent } from "./content";
import RagStoryClient from "./rag-story-client";
import { ragSceneCopy } from "./scenes";
import { ragTechnicalCopy } from "./technical-retrieval";

export default function RagStory({ locale }: { locale: Locale }) {
  const technicalLocale = technicalContentLocale[locale];

  return (
    <RagStoryClient
      content={ragContent[locale]}
      labels={storyLabels[technicalLocale]}
      sceneCopy={ragSceneCopy[technicalLocale]}
      technicalCopy={ragTechnicalCopy[technicalLocale]}
    />
  );
}
