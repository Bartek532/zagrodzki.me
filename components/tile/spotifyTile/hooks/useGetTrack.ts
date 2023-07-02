import { useQuery } from "@tanstack/react-query";

import { fetchLastTrack } from "../api/spotify";

export const useGetTrack = () =>
  useQuery({
    queryKey: ["last-played-track"],
    queryFn: () => fetchLastTrack(),
    keepPreviousData: true,
  });
