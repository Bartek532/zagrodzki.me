import { z } from "zod";

export const tokensSchemaPayload = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  expires_in: z.number(),
});

export const artistSchema = z.object({
  href: z.string(),
  id: z.string(),
  uri: z.string(),
  name: z.string(),
});

const albumSchema = z.object({
  external_urls: z.object({
    spotify: z.string(),
  }),
  artists: z.array(artistSchema),
  href: z.string(),
  id: z.string(),
  images: z
    .array(
      z.object({
        height: z.number(),
        width: z.number(),
        url: z.string(),
      }),
    )
    .nonempty(),
  name: z.string(),
  total_tracks: z.number(),
  type: z.literal("album"),
  uri: z.string(),
});

export const trackSchema = z.object({
  album: albumSchema,
  artists: z.array(artistSchema),
  duration_ms: z.number(),
  href: z.string(),
  id: z.string(),
  name: z.string(),
  uri: z.string(),
  external_urls: z.object({
    spotify: z.string(),
  }),
});

export const currentlyPlayingPayloadSchema = z.object({
  item: trackSchema,
  is_playing: z.boolean(),
});

export const recentlyPlayedPayloadSchema = z.object({
  items: z
    .array(
      z.object({
        track: trackSchema,
        played_at: z.string(),
      }),
    )
    .nonempty(),
});
