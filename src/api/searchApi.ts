import { http } from "./http";
import type { SearchResults } from "../types/models";

export async function search(q: string, limit = 10, offset = 0): Promise<SearchResults> {
  const res = await http.get("/api/search", { params: { q, limit, offset } });
  return res.data;
}
