import { http } from "./http";

export async function setQueue(trackIds: number[], startIndex = 0, shuffle = false) {
  const res = await http.post("/api/playback/queue", { trackIds, startIndex, shuffle });
  return res.data;
}

export async function nextTrack() {
  const res = await http.post("/api/playback/next");
  return res.data;
}

export async function prevTrack() {
  const res = await http.post("/api/playback/prev");
  return res.data;
}

export async function pause(pause: boolean) {
  const res = await http.post("/api/playback/pause", { pause });
  return res.data;
}

export async function stop() {
  const res = await http.post("/api/playback/stop");
  return res.data;
}

export async function setVolume(volume: number) {
  const res = await http.post("/api/playback/volume", { volume });
  return res.data;
}
