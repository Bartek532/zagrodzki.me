import "server-only";

import { AuthType, OAuthCredentials, YTMusic } from "ytmusic-ts";

import env from "@/env.config";

import { youtubeMusicOAuthStorage } from "./oauth-storage";
import { TRACK_STATUS, type YoutubeMusicTrack } from "./types";

const DEFAULT_DURATION_SECONDS = 180;
const PLAYBACK_BUFFER_SECONDS = 30;

type Thumbnail = { url: string; width?: number; height?: number };

const upscaleThumbnailUrl = (url: string) => {
  if (url.includes("ytimg.com")) {
    return url.replace(/\/(default|mqdefault)\.jpg$/, "/hqdefault.jpg");
  }

  if (url.includes("googleusercontent.com") || url.includes("ggpht.com")) {
    return url
      .replace(/=w\d+-h\d+[^&]*/, "=w544-h544-l90-rj")
      .replace(/=s\d+(-c)?/, "=s544$1");
  }

  return url;
};

const getThumbnailUrl = (thumbnails: Thumbnail[] | null | undefined, videoId: string) => {
  const largest = thumbnails?.reduce<Thumbnail | undefined>((best, thumb) => {
    if (!best) {
      return thumb;
    }

    const bestSize = (best.width ?? 0) * (best.height ?? 0);
    const thumbSize = (thumb.width ?? 0) * (thumb.height ?? 0);

    return thumbSize > bestSize ? thumb : best;
  }, undefined);

  if (largest?.url) {
    return upscaleThumbnailUrl(largest.url);
  }

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

const parsePlayedSecondsAgo = (played?: string) => {
  if (!played) {
    return null;
  }

  const label = played.toLowerCase().trim();

  if (label === "just now") {
    return 0;
  }

  const relativeMatch = label.match(/^(\d+)\s+(second|minute|hour)s?\s+ago$/);

  if (relativeMatch) {
    const value = Number(relativeMatch[1]);
    const unit = relativeMatch[2];

    if (unit === "second") return value;
    if (unit === "minute") return value * 60;
    if (unit === "hour") return value * 3600;
  }

  return null;
};

const isProbablyNowPlaying = (played: string | undefined, durationSeconds?: number) => {
  const secondsAgo = parsePlayedSecondsAgo(played);

  if (secondsAgo === null) {
    return false;
  }

  const duration = (durationSeconds ?? DEFAULT_DURATION_SECONDS) + PLAYBACK_BUFFER_SECONDS;

  return secondsAgo <= duration;
};

const isConfigured = () =>
  Boolean(
    env.YTMUSIC_OAUTH_CLIENT_ID &&
      env.YTMUSIC_OAUTH_CLIENT_SECRET &&
      env.YTMUSIC_OAUTH_TOKEN,
  );

export const fetchYoutubeMusicTrack = async (): Promise<YoutubeMusicTrack | null> => {
  if (!isConfigured()) {
    return null;
  }

  try {
    const credentials = new OAuthCredentials(
      env.YTMUSIC_OAUTH_CLIENT_ID!,
      env.YTMUSIC_OAUTH_CLIENT_SECRET!,
    );

    const client = new YTMusic({
      auth: {
        type: AuthType.OAUTH_CUSTOM_CLIENT,
        credentials,
        storage: youtubeMusicOAuthStorage,
      },
    });

    const [item] = await client.getHistory();

    if (!item?.videoId || !item?.title) {
      return null;
    }

    const played = typeof item.played === "string" ? item.played : undefined;

    return {
      name: item.title,
      artists:
        (item.artists ?? []).map((artist: { name: string }) => artist.name).join(", ") ||
        "Unknown artist",
      thumbnail: getThumbnailUrl(item.thumbnails, item.videoId),
      albumName: item.album?.name || item.title,
      url: `https://music.youtube.com/watch?v=${item.videoId}`,
      status: isProbablyNowPlaying(played, item.duration_seconds)
        ? TRACK_STATUS.ONLINE
        : TRACK_STATUS.OFFLINE,
    };
  } catch {
    return null;
  }
};
