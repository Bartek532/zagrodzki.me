import { Suspense } from "react";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet } from "react-tweet/api";

import { ThirdsSection } from "@/components/common/sections/thirds";
import env from "@/env.config";
import { cn } from "@/utils";

import type { TweetEntities } from "react-tweet/api";

const TWEET_ID = "2048091983328223415";

const defaultEntities = (entities?: TweetEntities): TweetEntities => ({
  hashtags: entities?.hashtags ?? [],
  user_mentions: entities?.user_mentions ?? [],
  urls: entities?.urls ?? [],
  symbols: entities?.symbols ?? [],
  ...(entities?.media ? { media: entities.media } : {}),
});

const FeaturedTweetEmbed = async () => {
  const tweet = await getTweet(TWEET_ID).catch(() => undefined);

  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={{ ...tweet, entities: defaultEntities(tweet.entities) }} />;
};

export const FeaturedTweet = () => (
  <ThirdsSection
    title="Launching Loading UI ⏳"
    description="If your loading state is just a spinning icon, this one's for you. 35+ shadcn-compatible components with the simplest API — install, customize, plug in. Free, open-source, and ready to ship."
    caption="Featured tweet"
    buttons={[
      {
        label: "Try Loading UI",
        href: "https://loading-ui.com",
      },
      {
        label: "Read on X",
        href: `https://x.com/bzagrodzki/status/${TWEET_ID}`,
      },
      {
        label: "View all tweets",
        href: `https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`,
      },
    ]}
  >
    <div className={cn("bg-dashed relative flex items-center justify-center p-4", "sm:p-8")}>
      <Suspense fallback={null}>
        <FeaturedTweetEmbed />
      </Suspense>
    </div>
  </ThirdsSection>
);
