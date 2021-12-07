export type Route = { label: string; path: string };

export type SpotifyTrack = {
  timestamp: number;
  progress_ms: number;
  current_playing_type: string;
  is_playing: boolean;
  item: {
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: "artist";
  uri: string;
  name: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type Project = {
  name: string;
  slug: string;
  priority: number;
  url: string;
};
