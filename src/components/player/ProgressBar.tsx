"use client";

import { motion } from "motion/react";
import { useSlider } from "@/hooks/useSlider";
import { PlayerState } from "@/types/music";
import { formatTime } from "@/utils";

interface ProgressBarProps {
  state: PlayerState;
  currentTime?: number;
  duration?: number;
  onSeek: (time: number) => void;
}

export const ProgressBar = ({
  state,
  currentTime = 0,
  duration = 0,
  onSeek,
}: ProgressBarProps) => {
  const isPlaying = state === "PLAYING";
  const isLoading = state === "LOADING";

  const { containerRef, handlers, isDragging } = useSlider({
    onChange: (percentage) => {
      if (duration > 0) {
        onSeek(Math.floor((percentage / 100) * duration));
      }
    },
  });

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const progressVariants = {
    playing: (percent: number) => ({
      scaleX: percent / 100,
      backgroundColor: "var(--color-purple-200)",
      opacity: 1,
      transition: {
        scaleX: {
          duration: isDragging || percent === 0 ? 0 : 1,
          ease: "linear",
        },
        backgroundColor: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    }),
    paused: (percent: number) => ({
      scaleX: percent / 100,
      backgroundColor: "var(--color-neutral-500)",
      opacity: 1,
      transition: {
        scaleX: {
          duration: isDragging || percent === 0 ? 0 : 1,
          ease: "linear",
        },
        backgroundColor: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    }),
    loading: {
      scaleX: progressPercent / 100,
      backgroundColor: "var(--color-neutral-500)",
      opacity: 0.5,
      transition: {
        scaleX: { duration: progressPercent === 0 ? 0 : 0.3 },
        backgroundColor: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-20">
      <div
        ref={containerRef}
        {...handlers}
        className="h-8 bg-neutral-800 rounded-full overflow-hidden relative cursor-pointer touch-none"
      >
        <motion.div
          className="h-full origin-left will-change-transform"
          variants={progressVariants}
          custom={progressPercent}
          initial="paused"
          animate={isLoading ? "loading" : isPlaying ? "playing" : "paused"}
          style={{ width: "100%" }}
        />
      </div>
      <div className="flex justify-between text-xs text-neutral-500 font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
