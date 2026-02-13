"use client";

import { usePlayerState } from "@/hooks/usePlayerState";
import { Equalizer } from "./player/Equalizer";
import { PlaybackControls } from "./player/PlaybackControls";
import { PlayerHeader } from "./player/PlayerHeader";
import { ProgressBar } from "./player/ProgressBar";
import { VolumeControl } from "./player/VolumeControl";

export default function MusicPlayer() {
  const {
    state,
    togglePlay,
    isPlaying,
    isLoading,
    currentSong,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seek,
  } = usePlayerState();

  return (
    <div
      className={`w-500 h-358 rounded-2xl p-16 flex flex-col relative overflow-hidden transition-[box-shadow,background-color] duration-300 ease ${
        isPlaying
          ? "shadow-playing bg-card-playing"
          : "shadow-idle bg-card-idle"
      }`}
    >
      {/* 1. Header: Cover & Metadata */}
      <PlayerHeader
        currentSong={currentSong}
        isPlaying={isPlaying}
        isLoading={isLoading}
      />

      {/* 2. Equalizer */}
      <div className="relative mb-20 h-24">
        <Equalizer state={state} />
      </div>

      {/* 3. Progress Bar */}
      <ProgressBar
        state={state}
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />

      {/* 4. Playback Controls */}
      <div className="mt-24">
        <PlaybackControls
          state={state}
          onTogglePlay={togglePlay}
          onNext={nextTrack}
          onPrev={prevTrack}
        />
      </div>

      {/* 5. Volume */}
      <VolumeControl />
    </div>
  );
}
