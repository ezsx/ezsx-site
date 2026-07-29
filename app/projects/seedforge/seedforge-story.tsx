import {
  technicalContentLocale,
  type Locale,
} from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { seedforgeContent } from "./content";
import {
  cudaTraceCopy,
  getCudaTracePhases,
} from "./cuda-trace-content";
import { seedforgeSceneCopy } from "./scenes";
import SeedforgeStoryClient from "./seedforge-story-client";
import { seedforgeTechnicalCopy } from "./technical-content";

export default function SeedforgeStory({ locale }: { locale: Locale }) {
  const technicalLocale = technicalContentLocale[locale];

  return (
    <SeedforgeStoryClient
      content={seedforgeContent[locale]}
      labels={storyLabels[technicalLocale]}
      sceneCopy={seedforgeSceneCopy[technicalLocale]}
      technicalCopy={seedforgeTechnicalCopy[technicalLocale]}
      traceCopy={cudaTraceCopy[technicalLocale]}
      tracePhases={getCudaTracePhases(technicalLocale)}
    />
  );
}
