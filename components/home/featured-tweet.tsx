import { Tweet } from "react-tweet";

import { ThirdsSection } from "@/components/common/sections/thirds";
import { env } from "@/env/client";
import { cn } from "@/utils";

export const FeaturedTweet = () => (
  <ThirdsSection
    title="3D Particles"
    description="Exploring new ways to enhance the user experience of my product - adding 3D particles to the home call to action related to the community."
    caption="Featured tweet"
    buttons={[
      {
        label: "Read on X",
        href: `https://x.com/bzagrodzki/status/1885364950128091487`,
      },
      {
        label: "View all tweets",
        href: `https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`,
      },
    ]}
  >
    <div className={cn("relative flex items-center justify-center bg-dashed p-4", "sm:p-8")}>
      <Tweet id="1885364950128091487" />
    </div>
  </ThirdsSection>
);
