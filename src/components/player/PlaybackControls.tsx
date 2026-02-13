"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PlayerState } from "@/types/music";

interface PlaybackControlsProps {
  state: PlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PlaybackControls = ({
  state,
  onTogglePlay,
  onNext,
  onPrev,
}: PlaybackControlsProps) => {
  const isPlaying = state === "PLAYING";
  const isLoading = state === "LOADING";

  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState(false);

  const controlVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
    mainHover: { scale: 1.05 },
    mainTap: { scale: 0.95 },
  };

  return (
    <div className="flex items-center justify-center gap-16">
      {/* Shuffle */}
      <motion.button
        variants={controlVariants}
        whileTap="tap"
        onClick={() => setShuffle(!isShuffle)}
        className={`p-8 rounded-md transition-colors ${
          isShuffle ? "text-purple-200" : "text-neutral-400 hover:text-white"
        }`}
      >
        <Shuffle size={20} />
      </motion.button>

      {/* Prev */}
      <motion.button
        variants={controlVariants}
        whileTap="tap"
        onClick={onPrev}
        className="p-8 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <SkipBack size={20} />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        variants={controlVariants}
        whileHover="mainHover"
        whileTap="mainTap"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onTogglePlay}
        disabled={isLoading}
        className={`w-56 h-56 rounded-full flex items-center justify-center transition-colors ${
          isLoading
            ? "bg-neutral-500 cursor-not-allowed"
            : isPlaying
              ? "bg-purple-200"
              : "bg-purple-300"
        }`}
      >
        {isPlaying || isLoading ? (
          <Pause size={24} className="text-white" />
        ) : (
          <Play size={24} className="text-white" />
        )}
      </motion.button>

      {/* Next */}
      <motion.button
        variants={controlVariants}
        whileTap="tap"
        onClick={onNext}
        className="p-8 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <SkipForward size={20} />
      </motion.button>

      {/* Repeat */}
      <motion.button
        variants={controlVariants}
        whileTap="tap"
        onClick={() => setRepeat(!isRepeat)}
        className={`p-8 rounded-md transition-colors ${
          isRepeat ? "text-purple-200" : "text-neutral-400 hover:text-white"
        }`}
      >
        <Repeat size={20} />
      </motion.button>
    </div>
  );
};
