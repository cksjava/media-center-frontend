import React, { createContext, useContext, useMemo, useState } from "react";
import type { Track } from "../types/models";
import * as playback from "../api/playbackApi";

type PlayerState = {
  queue: Track[];
  queueLabel?: string;
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
};

type PlayerCtx = PlayerState & {
  playQueue: (tracks: Track[], opts?: { startIndex?: number; shuffle?: boolean; label?: string }) => Promise<void>;
  togglePlay: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  stop: () => Promise<void>;
  setVolume: (v: number) => Promise<void>;
};

const Ctx = createContext<PlayerCtx | null>(null);

export function PlayerProvider(props: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueLabel, setQueueLabel] = useState<string | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVol] = useState<number>(() => {
    const v = Number(localStorage.getItem("player.volume") ?? "70");
    return Number.isFinite(v) ? v : 70;
  });

//   const current = queue[currentIndex];

  const api: PlayerCtx = useMemo(
    () => ({
      queue,
      queueLabel,
      currentIndex,
      isPlaying,
      volume,

      async playQueue(tracks, opts) {
        const startIndex = opts?.startIndex ?? 0;
        const shuffle = !!opts?.shuffle;

        setQueueLabel(opts?.label);
        setQueue(tracks);
        setCurrentIndex(startIndex);
        setIsPlaying(true);

        await playback.setQueue(tracks.map((t) => t.id), startIndex, shuffle);
      },

      async togglePlay() {
        const next = !isPlaying;
        setIsPlaying(next);
        await playback.pause(!next);
      },

      async next() {
        setCurrentIndex((i) => Math.min(queue.length - 1, i + 1));
        await playback.nextTrack();
        setIsPlaying(true);
      },

      async prev() {
        setCurrentIndex((i) => Math.max(0, i - 1));
        await playback.prevTrack();
        setIsPlaying(true);
      },

      async stop() {
        setIsPlaying(false);
        await playback.stop();
      },

      async setVolume(v) {
        const vv = Math.max(0, Math.min(100, Math.round(v)));
        setVol(vv);
        localStorage.setItem("player.volume", String(vv));
        await playback.setVolume(vv);
      },
    }),
    [queue, queueLabel, currentIndex, isPlaying, volume]
  );

  return <Ctx.Provider value={api}>{props.children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlayer must be used inside PlayerProvider");
  return v;
}
