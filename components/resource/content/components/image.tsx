import { Image as CommonImage } from "@/components/common/image/image";

interface ImageProps {
  readonly src: string;
  readonly alt: string;
  readonly width?: number | `${number}`;
  readonly height?: number | `${number}`;
}

export const Image = ({ src, alt = "", width, height }: ImageProps) => (
  <figure className="relative -mx-1 flex h-auto w-auto flex-col items-center gap-2 sm:-mx-3">
    <CommonImage
      className="max-w-full rounded-2xl"
      src={src}
      alt={alt}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      decoding="async"
    />
    {alt ? (
      <figcaption className="text-muted-foreground px-4 text-center text-sm italic opacity-60">
        {alt}
      </figcaption>
    ) : null}
  </figure>
);
