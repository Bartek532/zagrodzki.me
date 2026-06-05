import { Suspense } from "react";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";
import { getTweet } from "react-tweet/api";

import { ThirdsSection } from "@/components/common/sections/thirds";
import env from "@/env.config";
import { cn } from "@/utils";

import type { TweetEntities } from "react-tweet/api";

const TWEET_ID = "1932837053131292672";

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
    title="Launching Envin 🌳"
    description="Introducing Envin — a type-safe, open-source environment validator with live previews and standard schema support. Instantly validate and preview your .env files, in any framework."
    caption="Featured tweet"
    buttons={[
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
