"use client";

import { motion } from "motion/react";
import { PlayerState } from "@/types/music";

interface EqualizerProps {
  state: PlayerState;
}

export const Equalizer = ({ state }: EqualizerProps) => {
  const bars = [0, 1, 2, 3, 4];
  const isLoading = state === "LOADING";
  const isPlaying = state === "PLAYING";

  const barVariants = {
    playing: (i: number) => ({
      scaleY: [0.2, 1],
      opacity: 1,
      transition: {
        scaleY: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: i * 0.1,
        },
        opacity: { duration: 0.3 },
      },
    }),
    paused: {
      scaleY: 0.2,
      opacity: 1,
      transition: {
        scaleY: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
    loading: {
      scaleY: 0.5,
      opacity: 0.5,
      transition: {
        scaleY: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="absolute bottom-0 flex items-end pl-144 gap-8 h-32">
      {bars.map((i) => (
        <motion.div
          key={i}
          custom={i}
          className="w-8 bg-purple-200 origin-bottom will-change-transform"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variants={barVariants as any}
          initial="paused"
          animate={isLoading ? "loading" : isPlaying ? "playing" : "paused"}
          style={{ height: "100%" }}
        />
      ))}
    </div>
  );
};
