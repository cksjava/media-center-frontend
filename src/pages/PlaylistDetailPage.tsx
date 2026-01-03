import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { PlaylistItem, Track } from "../types/models";
import { playlistItems } from "../api/playlistsApi";
import { AppShell } from "../components/layout/AppShell";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { TrackRow } from "../components/common/TrackRow";
import { usePlayer } from "../context/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";

export function PlaylistDetailPage() {
  const { playlistId } = useParams();
  const id = Number(playlistId);
  const player = usePlayer();

  const [items, setItems] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setItems(await playlistItems(id));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const tracks: Track[] = useMemo(() => items.map((i) => i.track), [items]);
  const title = useMemo(() => `Playlist #${id}`, [id]);

  return (
    <AppShell
      title={title}
      right={
        <div className="flex items-center gap-2">
          <Button onClick={() => player.playQueue(tracks, { startIndex: 0, shuffle: false, label: title })}>
            <FontAwesomeIcon icon={faPlay} /> Play
          </Button>
          <Button variant="ghost" onClick={() => player.playQueue(tracks, { startIndex: 0, shuffle: true, label: `${title} (Shuffle)` })}>
            <FontAwesomeIcon icon={faShuffle} /> Shuffle
          </Button>
        </div>
      }
    >
      {loading ? (
        <div className="text-sm text-zinc-400">Loading tracks…</div>
      ) : tracks.length === 0 ? (
        <EmptyState title="Playlist is empty" />
      ) : (
        <div className="space-y-2">
          {tracks.map((t, idx) => (
            <TrackRow
              key={t.id}
              track={t}
              index={idx}
              onPlay={() => player.playQueue(tracks, { startIndex: idx, shuffle: false, label: title })}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
