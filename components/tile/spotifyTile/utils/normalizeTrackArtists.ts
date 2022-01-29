import type { SpotifyArtist } from "types";

export const normalizeTrackArtists = (artists: SpotifyArtist[]) => {
  return (
    artists
      .slice(0, 2)
      .map((artist) => artist.name)
      .join(", ") + (artists.length > 2 ? ` and ${artists.length - 2} more` : "")
  );
};
