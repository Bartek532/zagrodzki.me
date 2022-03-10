import { fetcher } from "utils/fetcher";

export const getTrack = async () => {
  return await fetcher("/api/music", { method: "GET" });
};
