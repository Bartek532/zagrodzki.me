export enum TRACK_STATUS {
  OFFLINE = "offline",
  ONLINE = "online",
}

export type YoutubeMusicOAuthToken = {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
};

export type YoutubeMusicTrack = {
  name: string;
  artists: string;
  thumbnail: string;
  albumName: string;
  url: string;
  status: TRACK_STATUS;
};
