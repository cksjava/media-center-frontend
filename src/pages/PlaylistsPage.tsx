import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Playlist } from "../types/models";
import { listPlaylists } from "../api/playlistsApi";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/common/Card";
import { EmptyState } from "../components/common/EmptyState";

export function PlaylistsPage() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setRows(await listPlaylists());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AppShell title="Playlists">
      {loading ? (
        <div className="text-sm text-zinc-400">Loading playlists…</div>
      ) : rows.length === 0 ? (
        <EmptyState title="No playlists yet" hint="Create playlists from backend for now; we can add UI later." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rows.map((p) => (
            <Card key={p.id} className="p-4 hover:bg-zinc-900/70 transition">
              <button className="w-full text-left" onClick={() => nav(`/playlists/${p.id}`)}>
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-xs text-zinc-400 mt-1">Open playlist</div>
              </button>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
