"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/utils";

type VideoProps = { readonly alt?: string } & React.ComponentProps<"video">;

export const Video = ({ alt, ...props }: VideoProps) => {
  const [paused, setPaused] = useState(!props.autoPlay);
  const [controlsVisible, setControlsVisible] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (ref.current) {
      if (ref.current.paused) {
        setControlsVisible(false);
        setPaused(false);
        void ref.current.play();
      } else {
        setControlsVisible(true);
        setPaused(true);
        ref.current.pause();
      }
    }
  };

  return (
    <figure className="relative -mx-1 flex h-auto w-auto flex-col flex-wrap gap-2 sm:-mx-3">
      <div className="relative">
        <video
          className={cn("max-w-full cursor-pointer rounded-2xl", props.className)}
          {...props}
          ref={ref}
          onClick={togglePlay}
          onMouseLeave={() => setControlsVisible(false)}
          onMouseEnter={() => setControlsVisible(true)}
        />
        <button
          className={cn(
            "pointer-events-none absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full border-0 bg-black/50 text-white opacity-0 transition-opacity duration-500 dark:bg-black/75",
            controlsVisible && "opacity-100",
          )}
        >
          {paused ? <Play className="h-1/2 w-1/2" /> : <Pause className="h-1/2 w-1/2" />}
        </button>
      </div>
      {alt ? (
        <figcaption className="px-4 text-center text-sm italic opacity-60">{alt}</figcaption>
      ) : null}
    </figure>
  );
};
