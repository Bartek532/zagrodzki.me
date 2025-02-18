"use client";

import { motion } from "framer-motion";
import { debounce } from "lodash";
import { memo, useMemo, useState } from "react";

import { Popcorn } from "@/components/common/popcorn/popcorn";
import { cn } from "@/utils";
import { MAX_CORNS_COUNT } from "components/common/popcorn/consts";
import { useLocalStorage } from "hooks/useLocalStorage";
import { setLikesBySlug } from "lib/kv/likes";
import { RESOURCE_TYPE } from "types";
import { normalizeCount } from "utils/functions";

import { decrementGivenLikes, getGivenLikes, incrementGivenLikes } from "../utils/given-likes";

type LikesCounterProps = {
  readonly likes: number;
  readonly type: RESOURCE_TYPE;
  readonly slug: string;
};

export const LikesCounter = memo<LikesCounterProps>(({ likes: initialLikes, type, slug }) => {
  const [lastAction, setLastAction] = useState<"+" | "-" | null>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [givenLikesData, setGivenLikesData] = useLocalStorage<string>("likes", "{}");
  const givenLikes = getGivenLikes(givenLikesData, slug);

  const debouncedFetch = useMemo(() => debounce(setLikesBySlug, 1500), []);

  const onLike = async () => {
    if (givenLikes >= MAX_CORNS_COUNT) {
      return;
    }

    setLikes((likes) => likes + 1);
    setLastAction("+");
    setGivenLikesData(incrementGivenLikes(givenLikesData, slug));
    try {
      await debouncedFetch(type, slug, likes + 1);
    } catch (error) {
      setLikes((likes) => likes - 1);
    }
  };

  const onUnlike = async () => {
    if (givenLikes <= 0) {
      return;
    }

    setLikes((likes) => likes - 1);
    setLastAction("-");
    setGivenLikesData(decrementGivenLikes(givenLikesData, slug));
    try {
      await debouncedFetch(type, slug, likes - 1);
    } catch (error) {
      setLikes((likes) => likes + 1);
    }
  };

  return (
    <div className="relative flex gap-4 w-fit">
      <Popcorn width={40} count={givenLikes} onAdd={onLike} onRemove={onUnlike} />
      <span
        className={cn(
          "font-semibold pt-3 opacity-60",
          givenLikes > 0 && "opacity-85 text-destructive",
        )}
      >
        {normalizeCount(givenLikes > likes ? givenLikes : likes)}
      </span>

      {lastAction && (
        <div className="absolute right-0 text-sm top-[20%] translate-x-[calc(100%+2px)] opacity-40 pointer-events-none">
          <motion.div
            animate={{
              opacity: [1, 0],
              y: [0, -10],
            }}
            transition={{
              duration: 0.5,
            }}
            key={likes}
          >
            {givenLikes === MAX_CORNS_COUNT ? "MAX" : `${lastAction}1`}
          </motion.div>
        </div>
      )}
    </div>
  );
});

LikesCounter.displayName = "LikesCounter";
