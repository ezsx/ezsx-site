import {
  technicalContentLocale,
  type Locale,
} from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { vpnContent } from "./content";
import { vpnSceneCopy } from "./scenes";
import { vpnTechnicalCopy } from "./technical-architecture";
import VpnStoryClient from "./vpn-story-client";

export default function VpnStory({ locale }: { locale: Locale }) {
  const technicalLocale = technicalContentLocale[locale];

  return (
    <VpnStoryClient
      content={vpnContent[locale]}
      labels={storyLabels[technicalLocale]}
      sceneCopy={vpnSceneCopy[technicalLocale]}
      technicalCopy={vpnTechnicalCopy[technicalLocale]}
    />
  );
}
