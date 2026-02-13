"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface AlbumArtworkProps {
  isPlaying: boolean;
  isLoading: boolean;
}

export const AlbumArtwork = ({ isPlaying, isLoading }: AlbumArtworkProps) => {
  const artworkVariants = {
    playing: {
      scale: 1,
      rotate: 360,
      opacity: 1,
      transition: {
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.3, type: "spring" },
        opacity: { duration: 0.3 },
      },
    },
    paused: {
      scale: 0.95,
      rotate: 0,
      opacity: 1,
      transition: {
        rotate: { duration: 0.5, ease: "linear" },
        scale: { duration: 0.3, type: "spring" },
        opacity: { duration: 0.3 },
      },
    },
    loading: {
      scale: 0.9,
      rotate: 0,
      opacity: 0.5,
      transition: {
        scale: { duration: 0.3, type: "spring" },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`w-120 h-120 rounded-xl bg-cover-gradient shadow-lg flex items-center justify-center`}
        variants={artworkVariants}
        initial="paused"
        animate={isLoading ? "loading" : isPlaying ? "playing" : "paused"}
      >
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src="/images/note.png"
            alt="Album Artwork"
            width={48}
            height={60}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
};
