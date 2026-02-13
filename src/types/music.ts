export type PlayerState = "IDLE" | "LOADING" | "PLAYING" | "PAUSED";

export interface Song {
  title: string;
  artist: string;
  coverUrl: string;
  duration: number;
}
