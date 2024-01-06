import { z } from "zod";

import {
  artistSchema,
  currentlyPlayingPayloadSchema,
  recentlyPlayedPayloadSchema,
  tokensSchemaPayload,
  trackSchema,
} from "./schema";

export type TokensPayload = z.infer<typeof tokensSchemaPayload>;
export type CurrentlyPlayingPayload = z.infer<typeof currentlyPlayingPayloadSchema>;
export type RecentlyPlayedPayload = z.infer<typeof recentlyPlayedPayloadSchema>;
export type Track = z.infer<typeof trackSchema>;
export type Artist = z.infer<typeof artistSchema>;
