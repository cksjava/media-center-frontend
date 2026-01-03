export type Album = {
  id: number;
  title: string;
  coverPath?: string | null;
  artist?: Artist;
};

export type Artist = {
  id: number;
  name: string;
};

export type Composer = {
  id: number;
  name: string;
};

export type Track = {
  id: number;
  title: string;
  trackNo?: number | null;
  discNo?: number | null;
  year?: number | null;          // ✅ ADD THIS
  durationSec?: number | null;
  filePath?: string;

  albumId?: number | null;
  artistId?: number | null;
  composerId?: number | null;

  // when included
  album?: Album;
  artist?: Artist;
  composer?: Composer;
};

export type Playlist = {
  id: number;
  name: string;
};

export type PlaylistItem = {
  id: number;
  position: number;
  track: Track;
};

export type FavoriteRow = {
  id: number;
  track: Track;
};

export type SearchResults = {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  composers: Composer[];
  // (Optional later) playlists: Playlist[];
};
