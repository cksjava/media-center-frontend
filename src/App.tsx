import { Routes, Route, Navigate } from "react-router-dom";
import { AlbumsPage } from "./pages/AlbumsPage";
import { AlbumDetailPage } from "./pages/AlbumDetailPage";
import { PlaylistsPage } from "./pages/PlaylistsPage";
import { PlaylistDetailPage } from "./pages/PlaylistDetailPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { SearchPage } from "./pages/SearchPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/albums" replace />} />
      <Route path="/albums" element={<AlbumsPage />} />
      <Route path="/albums/:albumId" element={<AlbumDetailPage />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<Navigate to="/albums" replace />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
