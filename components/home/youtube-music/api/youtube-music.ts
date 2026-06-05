import "server-only";

import { AuthType, YTMusic } from "ytmusic-ts";

import env from "@/env.config";

import { TRACK_STATUS } from "../types";

const DEFAULT_DURATION_SECONDS = 180;
const PLAYBACK_BUFFER_SECONDS = 30;

type Thumbnail = { url: string; width?: number; height?: number };

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
  if (!played) {
    return false;
  }

  const label = played.toLowerCase().trim();

  // History groups by shelf ("Today", "Yesterday", …) — not an exact timestamp.
  if (label === "today" || label === "earlier today") {
    return true;
  }

  const secondsAgo = parsePlayedSecondsAgo(played);

  if (secondsAgo === null) {
    return false;
  }

  const duration = (durationSeconds ?? DEFAULT_DURATION_SECONDS) + PLAYBACK_BUFFER_SECONDS;

  return secondsAgo <= duration;
};

export const fetchLastTrack = async () => {
  if (!env.YTMUSIC_COOKIE) {
    return null;
  }

  try {
    const client = new YTMusic({
      auth: { type: AuthType.BROWSER, cookie: env.YTMUSIC_COOKIE },
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
