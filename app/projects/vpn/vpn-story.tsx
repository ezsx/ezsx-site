import type { Locale } from "../../content/locales";
import { storyLabels } from "../../content/story-labels";
import { vpnContent } from "./content";
import { vpnSceneCopy } from "./scenes";
import { vpnTechnicalCopy } from "./technical-architecture";
import VpnStoryClient from "./vpn-story-client";

export default function VpnStory({ locale }: { locale: Locale }) {
  return (
    <VpnStoryClient
      content={vpnContent[locale]}
      labels={storyLabels[locale]}
      sceneCopy={vpnSceneCopy[locale]}
      technicalCopy={vpnTechnicalCopy[locale]}
    />
  );
}
