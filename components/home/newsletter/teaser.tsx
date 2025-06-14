import { Image } from "@/components/common/image/image";

import { TeaserTitle } from "./teaser-title";

const gravatars = [
  "27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
  "09abd59eb5653a7183ba812b8261f48b",
  "aa99b351245441b8ca95d54a52d2998c",
  "fab9f6ea398e4c042e274df505383b458fbdb12272ab025cd2f275f1fb716da3",
  "44cffd4ad9a44b797edcd00eb94b384bd4817fd046d95210766e863a562c57de",
];

export const Teaser = () => (
  <div className="flex flex-col gap-4">
    <TeaserTitle contacts={100} />
    <div className="flex items-center -space-x-2">
      {gravatars.map((hash) => (
        <Image
          key={hash}
          src={`https://www.gravatar.com/avatar/${hash}?d=404`}
          alt=""
          width={40}
          height={40}
          className="ring-secondary h-8 w-8 rounded-full object-cover ring-2"
        />
      ))}
      <div className="bg-card ring-secondary z-10 flex h-8 w-8 items-center justify-center rounded-full ring-2">
        <span className="text-muted-foreground text-[8px]">
          +{new Intl.NumberFormat("en-US", { notation: "compact" }).format(90)}
        </span>
      </div>
    </div>
  </div>
);
