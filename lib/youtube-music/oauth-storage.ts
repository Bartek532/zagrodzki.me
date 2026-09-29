import "server-only";

import type { TokenStorage } from "ytmusic-ts";

import env from "@/env.config";

import type { YoutubeMusicOAuthToken } from "./types";

/** Loads OAuth token from env; refresh updates stay in-memory for the current serverless invocation. */
export const youtubeMusicOAuthStorage: TokenStorage = {
  async load() {
    if (!env.YTMUSIC_OAUTH_TOKEN) {
      return null;
    }

    try {
      return JSON.parse(env.YTMUSIC_OAUTH_TOKEN) as YoutubeMusicOAuthToken;
    } catch {
      return null;
    }
  },
  async save() {
    // Intentionally no-op — refresh token in env is enough; access tokens refresh on demand.
  },
  async clear() {},
};
