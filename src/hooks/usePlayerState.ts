"use client";

import { useState, useCallback, useEffect } from "react";
import { PLAYLIST } from "@/data/playlist";
import { PlayerState, Song } from "@/types/music";

interface UsePlayerStateReturn {
  state: PlayerState;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  isLoading: boolean;
  isPlaying: boolean;
  currentSong: Song;
  currentTime: number;
  duration: number;
}

export const usePlayerState = (): UsePlayerStateReturn => {
  const [state, setState] = useState<PlayerState>("PAUSED");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === "PLAYING") {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= PLAYLIST[currentSongIndex].duration) {
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, currentSongIndex]);



  const simulateNetwork = (nextState: PlayerState) => {
    setState("LOADING");
    setTimeout(() => {
      setState(nextState);
    }, 500);
  };

  const play = useCallback(() => {
    if (state === "PLAYING" || state === "LOADING") return;
    simulateNetwork("PLAYING");
  }, [state]);

  const pause = useCallback(() => {
    if (state === "PAUSED" || state === "LOADING") return;
    simulateNetwork("PAUSED");
  }, [state]);

  const togglePlay = useCallback(() => {
    if (state === "LOADING") return;
    if (state === "PLAYING") {
      pause();
    } else {
      play();
    }
  }, [state, play, pause]);

  const nextTrack = useCallback(() => {
    if (state === "LOADING") return;
    setState("LOADING");
    setTimeout(() => {
      setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
      setCurrentTime(0); // Reset time
      setState("PLAYING"); // Auto-play next track
    }, 500);
  }, [state]);

  const prevTrack = useCallback(() => {
    if (state === "LOADING") return;
    setState("LOADING");
    setTimeout(() => {
      setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
      setCurrentTime(0); // Reset time
      setState("PLAYING"); // Auto-play prev track
    }, 500);
  }, [state]);

  const seek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Auto-Next Effect
  useEffect(() => {
    const isSongFinished = currentTime >= PLAYLIST[currentSongIndex].duration;
    
    if (isSongFinished && state === "PLAYING") {
      const timeout = setTimeout(() => {
        nextTrack();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentTime, state, currentSongIndex, nextTrack]);

  return {
    state,
    togglePlay,
    play,
    pause,
    nextTrack,
    prevTrack,
    seek,
    isLoading: state === "LOADING",
    isPlaying: state === "PLAYING",
    currentSong: PLAYLIST[currentSongIndex],
    currentTime,
    duration: PLAYLIST[currentSongIndex].duration,
  };
};
