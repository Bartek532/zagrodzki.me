import { fetcher } from "utils/fetcher";

export const getCurrentTrack = async () => {
  return await fetcher("/api/music", { method: "GET" });
};
