import { useEffect, useMemo, useState } from "react";
import type { FavoriteRow, Track } from "../types/models";
import { listFavourites, removeFavourite } from "../api/favouritesApi";
import { AppShell } from "../components/layout/AppShell";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { TrackRow } from "../components/common/TrackRow";
import { usePlayer } from "../context/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";

export function FavouritesPage() {
  const player = usePlayer();
  const [rows, setRows] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    try {
      setRows(await listFavourites());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  const tracks: Track[] = useMemo(() => rows.map((r) => r.track), [rows]);

  return (
    <AppShell
      title="Favourites"
      right={
        tracks.length ? (
          <div className="flex items-center gap-2">
            <Button onClick={() => player.playQueue(tracks, { startIndex: 0, shuffle: false, label: "Favourites" })}>
              <FontAwesomeIcon icon={faPlay} /> Play
            </Button>
            <Button variant="ghost" onClick={() => player.playQueue(tracks, { startIndex: 0, shuffle: true, label: "Favourites (Shuffle)" })}>
              <FontAwesomeIcon icon={faShuffle} /> Shuffle
            </Button>
          </div>
        ) : null
      }
    >
      {loading ? (
        <div className="text-sm text-zinc-400">Loading favourites…</div>
      ) : tracks.length === 0 ? (
        <EmptyState title="No favourites yet" hint="Mark tracks as favourite from Search UI (we’ll add that next) or backend." />
      ) : (
        <div className="space-y-2">
          {tracks.map((t, idx) => (
            <TrackRow
              key={t.id}
              track={t}
              index={idx}
              isFavourite={true}
              onToggleFavourite={async () => {
                await removeFavourite(t.id);
                await reload();
              }}
              onPlay={() => player.playQueue(tracks, { startIndex: idx, shuffle: false, label: "Favourites" })}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
