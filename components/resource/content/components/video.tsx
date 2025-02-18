import { memo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/utils";

type VideoProps = { readonly alt?: string } & JSX.IntrinsicElements["video"];

export const Video = memo<VideoProps>(({ alt, ...props }: VideoProps) => {
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
    <figure className="w-auto h-auto -mx-1 sm:-mx-3 relative flex flex-col flex-wrap gap-2 my-8">
      <div className="relative">
        <video
          className={cn("max-w-full rounded-2xl cursor-pointer", props.className)}
          {...props}
          ref={ref}
          onClick={togglePlay}
          onMouseLeave={() => setControlsVisible(false)}
          onMouseEnter={() => setControlsVisible(true)}
        />
        <button
          className={cn(
            "absolute inset-0 size-20 rounded-full border-0 transition-opacity duration-500 bg-black/50 m-auto pointer-events-none opacity-0 text-[--white-200] flex items-center justify-center",
            controlsVisible && "opacity-100",
          )}
        >
          {paused ? <Play className="w-1/2 h-1/2" /> : <Pause className="w-1/2 h-1/2" />}
        </button>
      </div>
      {alt ? (
        <figcaption className="text-sm italic opacity-60 px-4 text-center">{alt}</figcaption>
      ) : null}
    </figure>
  );
});

Video.displayName = "Video";
