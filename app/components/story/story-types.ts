import type { ReactNode } from "react";

export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];

export type StoryStage<Id extends string> = Readonly<{
  id: Id;
  tab: string;
  result: string;
  title: string;
  summary: string;
  detail: string;
  tags: readonly string[];
}>;

export type StoryStageSequence<Ids extends readonly string[]> = {
  readonly [Index in keyof Ids]: StoryStage<
    Extract<Ids[Index], string>
  >;
};

export type StoryHeadline = Readonly<{
  label: string;
  value: string;
  detail: string;
}>;

export type StoryProof = Readonly<{
  label: string;
  value: string;
  detail: string;
}>;

export type StoryLabels = Readonly<{
  systemStory: string;
  expandStory: string;
  collapseStory: string;
  nextStage: string;
  pause: string;
  replayStory: string;
  playStory: string;
  technicalAnchors: string;
}>;

export type TechnicalDisclosureLabels = Readonly<{
  expand: string;
  collapse: string;
}>;

export type RenderStoryScene<Id extends string> = (
  stage: StoryStage<Id>,
) => ReactNode;
