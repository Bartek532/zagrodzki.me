"use client";

import clsx from "clsx";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

import { Skeleton } from "../skeleton/Skeleton";

import styles from "./image.module.scss";

export const Image = (props: Omit<ImageProps, "onLoadingComplete">) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.skeleton && { [styles.skeleton]: !isLoaded })}>
        <Skeleton />
      </div>
      <div
        className={clsx(styles.fade, styles.loaded && { [styles.loaded]: isLoaded })}
        data-loaded={isLoaded}
      >
        <NextImage {...props} onLoadingComplete={() => setIsLoaded(true)} />
      </div>
    </div>
  );
};
