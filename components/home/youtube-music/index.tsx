import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { ViewAnimation } from "@/providers/view-animation";

import OfflineIcon from "../../../public/svg/offline.svg";
import YouTubeMusicIcon from "../../../public/svg/socials/youtube-music.svg";

import { fetchLastTrack } from "./api/youtube-music";
import { TRACK_STATUS } from "./types";

const getTrack = cache(fetchLastTrack, ["youtube-music"], { revalidate: 60 * 5 });

export const YouTubeMusic = async () => {
  const track = await getTrack();

  if (!track) return null;

  return (
    <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-full">
      <a
        href={track.url}
        className="group bg-card shadow-tile hover:bg-accent relative block h-full w-full overflow-hidden rounded-lg border transition-colors"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex h-full items-center justify-between">
          <div className="relative flex h-full min-w-0 flex-col justify-between p-6 sm:p-8">
            <div className="size-9 md:size-11">
              <YouTubeMusicIcon className="text-red-500" />
            </div>

            <span className="mt-8 flex items-baseline gap-2 text-xs text-red-500 lg:text-sm">
              {track.status === TRACK_STATUS.ONLINE ? (
                <>
                  <span className="flex gap-px">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="animate-bar-pulse inline-block h-[1px] w-[3px] rounded-sm bg-red-500"
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
                  <OfflineIcon className="w-3.5 text-red-500" />
                  Offline. Last played
                </>
              )}
            </span>

            <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{track.name}</h2>

            <p className="text-muted-foreground truncate text-sm sm:text-base">{track.artists}</p>
          </div>

          {track.thumbnail && (
            <div className="relative w-2/5 shrink-0 self-stretch">
              <Image
                src={track.thumbnail}
                alt={track.albumName}
                fill
                sizes="(max-width: 640px) 40vw, 240px"
                quality={90}
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </a>
    </ViewAnimation>
  );
};
