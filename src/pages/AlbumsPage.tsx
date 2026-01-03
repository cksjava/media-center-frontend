import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Album } from "../types/models";
import { listAlbums } from "../api/libraryApi";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/common/Card";
import { Cover } from "../components/common/Cover";
import { EmptyState } from "../components/common/EmptyState";
import { SectionHeader } from "../components/common/SectionHeader";

export function AlbumsPage() {
  const nav = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setAlbums(await listAlbums());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AppShell title="Albums">
      <SectionHeader title="Your Library" />

      <div className="mt-4">
        {loading ? (
          <div className="text-sm text-zinc-400">Loading albums…</div>
        ) : albums.length === 0 ? (
          <EmptyState title="No albums found" hint="Run a scan from backend, then refresh." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {albums.map((a) => (
              <Card
                key={a.id}
                onClick={() => nav(`/albums/${a.id}`)}
                className="group cursor-pointer"
              >
                <div className="p-3">
                  {/* Consistent cover sizing/alignment */}
                  <Cover coverPath={a.coverPath ?? null} alt={a.title} size="grid" />

                  <div className="mt-3 min-w-0">
                    <div className="truncate text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white">
                      {a.title}
                    </div>

                    {/* With current Album model, we only reliably have title/cover.
                        This line is intentionally calm and leaves room for future metadata. */}
                    <div className="mt-1 text-xs text-zinc-400">Open album</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
