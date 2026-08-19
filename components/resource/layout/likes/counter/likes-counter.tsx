"use client";

import { motion } from "motion/react";
import { memo, useState } from "react";

import { MAX_CORNS_COUNT } from "@/components/common/popcorn/consts";
import { Popcorn } from "@/components/common/popcorn/popcorn";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { like, unlike } from "@/lib/kv/likes";
import { cn } from "@/utils";
import { normalizeCount } from "@/utils/functions";

import { decrementGivenLikes, getGivenLikes, incrementGivenLikes } from "../utils/given-likes";

import type { RESOURCE_TYPE } from "@/types";

interface LikesCounterProps {
  readonly likes: number;
  readonly type: RESOURCE_TYPE;
  readonly slug: string;
}

export const LikesCounter = memo<LikesCounterProps>(({ likes: initialLikes, type, slug }) => {
  const [lastAction, setLastAction] = useState<"+" | "-" | null>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [givenLikesData, setGivenLikesData] = useLocalStorage<string>("likes", "{}");
  const givenLikes = getGivenLikes(givenLikesData, slug);

  const onLike = async () => {
    if (givenLikes >= MAX_CORNS_COUNT) {
      return;
    }

    setLikes((current) => current + 1);
    setLastAction("+");
    setGivenLikesData(incrementGivenLikes(givenLikesData, slug));
    try {
      await like(type, slug);
    } catch {
      setLikes((current) => current - 1);
    }
  };

  const onUnlike = async () => {
    if (givenLikes <= 0) {
      return;
    }

    setLikes((current) => current - 1);
    setLastAction("-");
    setGivenLikesData(decrementGivenLikes(givenLikesData, slug));
    try {
      await unlike(type, slug);
    } catch {
      setLikes((current) => current + 1);
    }
  };

  return (
    <div className="relative flex w-fit gap-4">
      <Popcorn width={40} count={givenLikes} onAdd={onLike} onRemove={onUnlike} />
      <span
        className={cn(
          "pt-3 font-semibold opacity-60",
          givenLikes > 0 && "text-destructive opacity-85",
        )}
      >
        {normalizeCount(givenLikes > likes ? givenLikes : likes)}
      </span>

      {lastAction && (
        <div className="pointer-events-none absolute top-[20%] right-0 translate-x-[calc(100%+2px)] text-sm opacity-40">
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
