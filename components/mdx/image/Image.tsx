import NextImage from "next/image";
import { memo } from "react";

import styles from "./image.module.scss";

type ImageProps = {
  readonly src: string;
  readonly alt: string;
  readonly width?: string | number;
  readonly height?: string | number;
};

export const Image = memo<ImageProps>(({ src, alt, width = "100%", height }) => {
  return (
    <div className={styles.wrapper}>
      <NextImage
        className={styles.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

Image.displayName = "Image";
