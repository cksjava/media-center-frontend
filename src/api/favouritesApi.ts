import { http } from "./http";
import type { FavoriteRow } from "../types/models";

export async function listFavourites(): Promise<FavoriteRow[]> {
  const res = await http.get("/api/favourites");
  return res.data;
}

export async function addFavourite(trackId: number) {
  const res = await http.post(`/api/favourites/${trackId}`);
  return res.data;
}

export async function removeFavourite(trackId: number) {
  const res = await http.delete(`/api/favourites/${trackId}`);
  return res.data;
}
