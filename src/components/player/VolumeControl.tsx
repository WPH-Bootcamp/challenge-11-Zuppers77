"use client";

import { Volume2, Volume1, Volume, VolumeX } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useSlider } from "@/hooks/useSlider";

export const VolumeControl = () => {
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(60);

  const { containerRef, handlers } = useSlider({
    onChange: (percentage) => {
      setVolume(percentage);
      if (percentage > 0) setIsMuted(false);
    },
  });

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume === 0 ? 50 : prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0)
      return <VolumeX size={16} className="text-neutral-400" />;
    if (volume < 30) return <Volume size={16} className="text-neutral-400" />;
    if (volume < 70) return <Volume1 size={16} className="text-neutral-400" />;
    return <Volume2 size={16} className="text-neutral-400" />;
  };

  const volumeVariants = {
    active: (percent: number) => ({
      scaleX: percent / 100,
      backgroundColor: "var(--color-purple-200)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        backgroundColor: { duration: 0.2 },
      },
    }),
    inactive: (percent: number) => ({
      scaleX: percent / 100,
      backgroundColor: "var(--color-neutral-500)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        backgroundColor: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="flex items-center gap-8 mt-auto group">
      <button
        onClick={toggleMute}
        className="hover:text-purple-200 transition-colors"
      >
        {getVolumeIcon()}
      </button>

      <motion.div
        ref={containerRef}
        {...handlers}
        className="h-4 w-full bg-neutral-800 rounded-full overflow-hidden cursor-pointer relative touch-none"
        initial="inactive"
        whileHover="active"
        animate="inactive"
      >
        <motion.div
          className="h-full rounded-full origin-left will-change-transform"
          variants={volumeVariants}
          custom={volume}
          style={{ width: "100%" }}
        />
      </motion.div>
    </div>
  );
};
