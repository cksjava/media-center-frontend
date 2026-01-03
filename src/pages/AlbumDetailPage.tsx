import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Album, Track } from "../types/models";
import { albumTracks, getAlbum } from "../api/libraryApi";
import { AppShell } from "../components/layout/AppShell";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { TrackRow } from "../components/common/TrackRow";
import { Cover } from "../components/common/Cover";
import { usePlayer } from "../context/PlayerContext";
import { formatDuration } from "../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";

export function AlbumDetailPage() {
  const { albumId } = useParams();
  const id = Number(albumId);
  const player = usePlayer();

  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  const [loadingTracks, setLoadingTracks] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoadingAlbum(true);
        setAlbum(await getAlbum(id));
      } finally {
        setLoadingAlbum(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoadingTracks(true);
        setTracks(await albumTracks(id));
      } finally {
        setLoadingTracks(false);
      }
    })();
  }, [id]);

  const totalDurationSec = useMemo(
    () => tracks.reduce((sum, t) => sum + (t.durationSec ?? 0), 0),
    [tracks]
  );

  const title = album?.title ?? `Album #${id}`;

  return (
    <AppShell title={title}>
      {loadingAlbum ? (
        <div className="text-sm text-zinc-400">Loading album…</div>
      ) : !album ? (
        <EmptyState title="Album not found" />
      ) : (
        <>
          {/* ───────────── Album Header ───────────── */}
          <div className="mb-6 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
            <div className="flex items-center gap-5">
              <Cover
                coverPath={album.coverPath ?? null}
                alt={album.title}
                size="lg"
              />

              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wide text-zinc-400">
                  Album
                </div>

                <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-zinc-50">
                  {album.title}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
                  <span>{tracks.length} tracks</span>

                  {totalDurationSec > 0 && (
                    <>
                      <span>•</span>
                      <span>{formatDuration(totalDurationSec)}</span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button
                    onClick={() =>
                      player.playQueue(tracks, {
                        startIndex: 0,
                        shuffle: false,
                        label: album.title,
                      })
                    }
                    disabled={tracks.length === 0}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    Play
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      player.playQueue(tracks, {
                        startIndex: 0,
                        shuffle: true,
                        label: `${album.title} (Shuffle)`,
                      })
                    }
                    disabled={tracks.length === 0}
                  >
                    <FontAwesomeIcon icon={faShuffle} />
                    Shuffle
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────── Track List ───────────── */}
          {loadingTracks ? (
            <div className="text-sm text-zinc-400">Loading tracks…</div>
          ) : tracks.length === 0 ? (
            <EmptyState title="No tracks in this album" />
          ) : (
            <div className="space-y-2">
              {tracks.map((t, idx) => (
                <TrackRow
                  key={t.id}
                  track={t}
                  index={idx}
                  onPlay={() =>
                    player.playQueue(tracks, {
                      startIndex: idx,
                      shuffle: false,
                      label: album.title,
                    })
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
