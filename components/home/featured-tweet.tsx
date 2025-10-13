import { Tweet } from "react-tweet";

import { ThirdsSection } from "@/components/common/sections/thirds";
import { env } from "@/lib/env";
import { cn } from "@/utils";

export const FeaturedTweet = () => (
  <ThirdsSection
    title="Launching Envin 🌳"
    description="Introducing Envin — a type-safe, open-source environment validator with live previews and standard schema support. Instantly validate and preview your .env files, in any framework."
    caption="Featured tweet"
    buttons={[
      {
        label: "Read on X",
        href: `https://x.com/bzagrodzki/status/1932837053131292672`,
      },
      {
        label: "View all tweets",
        href: `https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`,
      },
    ]}
  >
    <div className={cn("bg-dashed relative flex items-center justify-center p-4", "sm:p-8")}>
      <Tweet id="1932837053131292672" />
    </div>
  </ThirdsSection>
);
