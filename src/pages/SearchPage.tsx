import { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Input } from "../components/common/Input";
import { Card } from "../components/common/Card";
import { SectionHeader } from "../components/common/SectionHeader";
import { EmptyState } from "../components/common/EmptyState";
import { TrackRow } from "../components/common/TrackRow";
import { Cover } from "../components/common/Cover";
import { Button } from "../components/common/Button";
import type { SearchResults } from "../types/models";
import { search } from "../api/searchApi";
import { usePlayer } from "../context/PlayerContext";
import { albumTracks } from "../api/libraryApi";

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function SearchPage() {
  const player = usePlayer();

  const [q, setQ] = useState("");
  const dq = useDebounced(q, 250);

  const [data, setData] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

//   const [more, setMore] = useState<{ tracks: number; albums: number; artists: number; playlists: number }>({
//     tracks: 10,
//     albums: 10,
//     artists: 10,
//     playlists: 10,
//   });

  useEffect(() => {
    (async () => {
      const query = dq.trim();
      if (!query) {
        setData(null);
        return;
      }
      setLoading(true);
      try {
        setData(await search(query, 10, 0));
      } finally {
        setLoading(false);
      }
    })();
  }, [dq]);

  const tracks = data?.tracks ?? [];
  const albums = data?.albums ?? [];
  const artists = data?.artists ?? [];

  return (
    <AppShell title="Search">
      <div className="max-w-2xl">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tracks, albums, artists, composers…"
        />
      </div>

      <div className="mt-5 space-y-6">
        {!dq.trim() ? (
          <EmptyState title="Search your library" hint="Try an artist, album title, or track name." />
        ) : loading ? (
          <div className="text-sm text-zinc-400">Searching…</div>
        ) : !data ? null : (
          <>
            <div>
              <SectionHeader
                title={`Tracks (${tracks.length})`}
                right={
                  tracks.length ? (
                    <Button variant="ghost" size="sm" onClick={() => player.playQueue(tracks, { startIndex: 0, shuffle: false, label: `Search: ${dq}` })}>
                      Play all
                    </Button>
                  ) : null
                }
              />
              <div className="mt-3 space-y-2">
                {tracks.slice(0, 10).map((t, idx) => (
                  <TrackRow
                    key={t.id}
                    track={t}
                    index={idx}
                    onPlay={() => player.playQueue(tracks, { startIndex: idx, shuffle: false, label: `Search: ${dq}` })}
                  />
                ))}
                {tracks.length > 10 ? <div className="text-xs text-zinc-500">More (pagination UI can be added next).</div> : null}
              </div>
            </div>

            <div>
              <SectionHeader title={`Albums (${albums.length})`} />
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {albums.slice(0, 9).map((a) => (
                  <Card key={a.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <Cover coverPath={a.coverPath ?? null} alt={a.title} size="lg" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{a.title}</div>
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            onClick={async () => {
                              const tr = await albumTracks(a.id);
                              await player.playQueue(tr, { startIndex: 0, shuffle: false, label: a.title });
                            }}
                          >
                            Play
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={async () => {
                              const tr = await albumTracks(a.id);
                              await player.playQueue(tr, { startIndex: 0, shuffle: true, label: `${a.title} (Shuffle)` });
                            }}
                          >
                            Shuffle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <SectionHeader title={`Artists (${artists.length})`} />
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {artists.slice(0, 12).map((a) => (
                  <Card key={a.id} className="p-4">
                    <div className="font-semibold truncate">{a.name}</div>
                    <div className="text-xs text-zinc-400 mt-1">Artist browsing can be added next (endpoint needed).</div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
