"use client";

import clsx from "clsx";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

import styles from "./image.module.scss";

export const Image = (props: Omit<ImageProps, "onLoadingComplete">) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);

  return (
    <div className={clsx(styles.container, styles.skeleton && { [styles.skeleton]: isSkeleton })}>
      <div
        className={clsx(styles.fade, styles.loaded && { [styles.loaded]: isLoaded })}
        data-loaded={isLoaded}
        onTransitionEnd={(event) => event.propertyName === "opacity" && setIsSkeleton(false)}
      >
        <NextImage {...props} onLoadingComplete={() => setIsLoaded(true)} />
      </div>
    </div>
  );
};