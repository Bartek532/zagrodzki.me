import { memo } from "react";

import { Image as CommonImage } from "@/components/common/image";

interface ImageProps {
  readonly src: string;
  readonly alt: string;
  readonly width?: number | `${number}`;
  readonly height?: number | `${number}`;
}

export const Image = memo<ImageProps>(({ src, alt = "", width, height }) => (
  <figure className="w-auto h-auto my-8 -mx-1 relative flex flex-col items-center gap-2 sm:-mx-3">
    <CommonImage
      className="max-w-full rounded-2xl"
      src={src}
      alt={alt}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      decoding="async"
    />
    {alt ? (
      <figcaption className="text-sm italic text-muted-foreground opacity-60 px-4 text-center">
        {alt}
      </figcaption>
    ) : null}
  </figure>
));

Image.displayName = "Image";
