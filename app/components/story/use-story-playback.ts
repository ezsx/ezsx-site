"use client";

import { useEffect, useRef, useState } from "react";

type MotionMode = "unknown" | "full" | "reduce";

type StoryPlaybackOptions = Readonly<{
  stageCount: number;
  intervalMs: number;
  initialExpanded?: boolean;
}>;

export function useStoryPlayback({
  stageCount,
  intervalMs,
  initialExpanded = false,
}: StoryPlaybackOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(initialExpanded);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState<MotionMode>("unknown");
  const rootRef = useRef<HTMLElement>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setMotion(media.matches ? "reduce" : "full");
      if (media.matches) setPlaying(false);
    };
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let intersecting = false;
    const updateVisibility = () => setInView(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0 },
    );

    observer.observe(root);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      motion !== "full" ||
      !inView ||
      !expanded ||
      hasAutoPlayed.current
    ) {
      return;
    }
    hasAutoPlayed.current = true;
    setActiveIndex(0);
    setPlaying(true);
  }, [expanded, inView, motion]);

  useEffect(() => {
    if (!playing || !inView || motion !== "full") return;
    if (activeIndex === stageCount - 1) {
      setPlaying(false);
      return;
    }

    const timer = window.setTimeout(
      () => setActiveIndex((current) => current + 1),
      intervalMs,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, inView, intervalMs, motion, playing, stageCount]);

  const selectStage = (index: number) => {
    setActiveIndex(index);
    setPlaying(false);
  };

  const togglePlayback = () => {
    if (motion === "reduce") {
      setActiveIndex((current) => (current + 1) % stageCount);
      return;
    }
    if (playing) {
      setPlaying(false);
      return;
    }
    if (activeIndex === stageCount - 1) setActiveIndex(0);
    setPlaying(true);
  };

  const toggleExpanded = () => {
    if (expanded) setPlaying(false);
    setExpanded((current) => !current);
  };

  const controlAction =
    motion === "reduce"
      ? "next"
      : playing
        ? "pause"
        : activeIndex === stageCount - 1
          ? "replay"
          : "play";

  return {
    activeIndex,
    controlAction,
    expanded,
    motion,
    playing,
    rootRef,
    selectStage,
    toggleExpanded,
    togglePlayback,
  } as const;
}
