import "server-only";
import dayjs from "dayjs";

import { env } from "env/server";

import { TRACK_STATUS } from "../types";
import {
  isCurrentlyPlayingPayload,
  isRecentlyPlayedPayload,
  isTokensPayload,
} from "../utils/validation/validator";

const access = {
  token: "",
  expires: "",
};

export const getAccessToken = async (refreshToken: string) => {
  if (dayjs().isBefore(dayjs(access.expires))) {
    return access.token;
  }

  const params = new URLSearchParams();
  params.append("client_id", env.SPOTIFY_CLIENT_ID);
  params.append("client_secret", env.SPOTIFY_CLIENT_SECRET);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const tokensResponse = await fetch(
    `https://accounts.spotify.com/api/token?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      next: {
        revalidate: 0,
      },
    },
  );

  const tokens: unknown = await tokensResponse.json();

  if (!isTokensPayload(tokens)) {
    return null;
  }

  access.token = tokens.access_token;
  access.expires = dayjs().add(tokens.expires_in, "second").toISOString();

  return tokens.access_token;
};

export const fetchLastTrack = async () => {
  const token = await getAccessToken(env.SPOTIFY_REFRESH_TOKEN);
  if (!token) return null;

  const currentlyPlayingResponse = await fetch(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    },
  );

  const currentlyPlayingData: unknown = await currentlyPlayingResponse.json();

  if (isCurrentlyPlayingPayload(currentlyPlayingData)) {
    return {
      track: currentlyPlayingData.item,
      status: currentlyPlayingData.is_playing
        ? TRACK_STATUS.ONLINE
        : TRACK_STATUS.OFFLINE,
    };
  }

  const recentlyPlayedData = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    },
  );

  if (!isRecentlyPlayedPayload(recentlyPlayedData)) {
    throw new Error("Unexpected error occured!");
  }

  return {
    track: recentlyPlayedData.items[0].track,
    status: TRACK_STATUS.OFFLINE,
  };
};
