import { http } from "./http";
import type { Playlist, PlaylistItem } from "../types/models";

export async function listPlaylists(): Promise<Playlist[]> {
  const res = await http.get("/api/playlists");
  return res.data;
}

export async function playlistItems(playlistId: number): Promise<PlaylistItem[]> {
  const res = await http.get(`/api/playlists/${playlistId}/items`);
  return res.data;
}
