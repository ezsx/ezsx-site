import {
  technicalContentLocale,
  type Locale,
} from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { pixelBattleContent } from "./content";
import PixelBattleStoryClient from "./pixel-battle-story-client";
import { pixelBattleSceneCopy } from "./scenes";
import { pixelBattleTechnicalCopy } from "./technical-runtime";

export default function PixelBattleStory({
  locale,
}: {
  locale: Locale;
}) {
  const technicalLocale = technicalContentLocale[locale];

  return (
    <PixelBattleStoryClient
      content={pixelBattleContent[locale]}
      labels={storyLabels[technicalLocale]}
      sceneCopy={pixelBattleSceneCopy[technicalLocale]}
      technicalCopy={pixelBattleTechnicalCopy[technicalLocale]}
    />
  );
}
