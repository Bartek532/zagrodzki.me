import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { ViewAnimation } from "@/providers/view-animation";
import OfflineIcon from "public/svg/offline.svg";
import SpotifyIcon from "public/svg/socials/spotify.svg";

import { fetchLastTrack } from "./api/spotify";
import { TRACK_STATUS } from "./types";

const getTrack = cache(fetchLastTrack, ["spotify"], { revalidate: 60 * 5 });

export const Spotify = async () => {
  const data = await getTrack();

  if (!data) return null;

  const { artists, album, name, external_urls } = data.track;

  return (
    <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-full">
      <a
        href={external_urls.spotify}
        className="w-full bg-card hover:bg-accent border h-full transition-colors group rounded-lg relative shadow-tile overflow-hidden block"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex items-center justify-between h-full">
          <div className="relative p-6 sm:p-8 min-w-0 flex flex-col justify-between h-full">
            <div className="size-9 md:size-11">
              <SpotifyIcon className="text-success" />
            </div>

            <span className="text-success mt-8 flex items-baseline gap-2 text-xs lg:text-sm">
              {data.status !== TRACK_STATUS.ONLINE ? (
                <>
                  <span className="flex  gap-px">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="inline-block w-[3px] h-[1px] bg-success rounded-sm animate-bar-pulse"
                        style={{
                          animationDelay: i === 1 ? "0.5s" : i === 3 ? "1.2s" : "0s",
                        }}
                      />
                    ))}
                  </span>
                  Now playing
                </>
              ) : (
                <>
                  <OfflineIcon className="w-3.5 text-success" />
                  Offline. Last played
                </>
              )}
            </span>

            <h2 className="font-bold text-xl truncate tracking-tight sm:text-2xl">{name}</h2>

            <p className="text-muted-foreground text-sm truncate sm:text-base">
              {artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>

          <div className="w-2/5 self-stretch relative shrink-0">
            <Image
              src={album.images[0].url}
              alt={album.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </a>
    </ViewAnimation>
  );
};
