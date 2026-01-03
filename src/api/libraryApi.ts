import { http } from "./http";
import type { Album, Track, Artist } from "../types/models";

export async function listAlbums(): Promise<Album[]> {
  const res = await http.get("/api/library/albums");
  return res.data;
}

export async function albumTracks(albumId: number): Promise<Track[]> {
  const res = await http.get(`/api/library/albums/${albumId}/tracks`);
  return res.data;
}

export async function listArtists(): Promise<Artist[]> {
  const res = await http.get("/api/library/artists");
  return res.data;
}

export async function getAlbum(id: number): Promise<Album> {
  const res = await http.get(`/api/library/albums/${id}`);
  return res.data;
}