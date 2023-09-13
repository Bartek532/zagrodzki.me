"use client";

import clsx from "clsx";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

import { Skeleton } from "components/common/skeleton/Skeleton";

import styles from "./image.module.scss";

export const Image = (props: Omit<ImageProps, "onLoadingComplete">) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(true);

  console.log(isSkeleton);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.skeleton && { [styles.skeleton]: isSkeleton })}>
        <Skeleton />
      </div>
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
