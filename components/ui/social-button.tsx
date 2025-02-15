import Image from "next/image";

import { SOCIALS } from "@/utils/consts";

import { Button } from "./button";

type SocialButtonProps = {
  data: typeof SOCIALS[keyof typeof SOCIALS];
};

export const SocialButton = ({ data }: SocialButtonProps) => (
  <Button asChild variant="outline">
    <a href={data.link} target="_blank" rel="noreferrer noopener">
      <Image
        src={`/svg/socials/${data.id}.svg`}
        alt={data.name}
        width={16}
        height={16}
        className="size-3.5 dark:opacity-50 dark:brightness-0 dark:invert"
      />
      Follow me on {data.name}
    </a>
  </Button>
);
