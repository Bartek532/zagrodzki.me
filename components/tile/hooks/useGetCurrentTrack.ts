import { useQuery } from "react-query";
import { getCurrentTrack } from "../api/getCurrentTrack";

export const useGetCurrentTrack = () => {
  return useQuery("currentTrack", getCurrentTrack);
};
