import clsx from "clsx";
import { memo, useRef, useState } from "react";

import PauseIcon from "public/svg/pause.svg";
import PlayIcon from "public/svg/play.svg";

import styles from "./video.module.scss";

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
    <figure className={styles.wrapper}>
      <div className={styles.videoWrapper}>
        <video
          className={clsx(styles.video, props.className)}
          {...props}
          ref={ref}
          onClick={togglePlay}
          onMouseLeave={() => setControlsVisible(false)}
          onMouseEnter={() => setControlsVisible(true)}
        />
        <button
          className={clsx(
            styles.control,
            styles.visible && {
              [styles.visible]: controlsVisible,
            },
          )}
        >
          {paused ? <PlayIcon className={styles.icon} /> : <PauseIcon className={styles.icon} />}
        </button>
      </div>
      {alt ? <figcaption className={styles.caption}>{alt}</figcaption> : null}
    </figure>
  );
});

Video.displayName = "Video";
