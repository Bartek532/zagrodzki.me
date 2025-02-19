"use client";

import { useTheme } from "next-themes";

import { Image } from "@/components/common/image/image";

import type { ImageProps, StaticImageData } from "next/image";

type ThemedImageProps = Omit<ImageProps, "onLoad" | "src"> & {
  light: string | StaticImageData;
  dark: string | StaticImageData;
};

export const ThemedImage = (props: ThemedImageProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Image {...props} alt={props.alt} src={resolvedTheme === "dark" ? props.dark : props.light} />
  );
};
