"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlbumArtwork } from "./AlbumArtwork";
import { Song } from "@/types/music";

interface PlayerHeaderProps {
  currentSong: Song;
  isPlaying: boolean;
  isLoading: boolean;
}

export const PlayerHeader = ({
  currentSong,
  isPlaying,
  isLoading,
}: PlayerHeaderProps) => {
  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex items-center gap-24 w-full">
      <AlbumArtwork isPlaying={isPlaying} isLoading={isLoading} />

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSong.title}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-16"
          >
            <h2 className="text-lg font-semibold text-neutral-100 leading-tight truncate">
              {currentSong.title}
            </h2>
            <p className="text-sm text-neutral-400 truncate">
              {currentSong.artist}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
