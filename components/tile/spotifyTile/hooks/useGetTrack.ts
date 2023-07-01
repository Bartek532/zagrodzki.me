import { useQuery } from "@tanstack/react-query";

import { getTrack } from "../api/getTrack";

export const useGetTrack = () => {
  return useQuery("currentTrack", getTrack);
};
