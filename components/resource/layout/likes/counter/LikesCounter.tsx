"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { memo, useState } from "react";

import { Popcorn } from "components/common/popcorn/Popcorn";
import { useLocalStorage } from "hooks/useLocalStorage";
import { like, unlike } from "lib/kv/likes";
import { RESOURCE_TYPE } from "types";
import { normalizeCount } from "utils/functions";

import { decrementGivenLikes, getGivenLikes, incrementGivenLikes } from "../utils/givenLikes";

import styles from "./likesCounter.module.scss";

const MAX_LIKES_TO_GIVE = 10;

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

  const onLike = async () => {
    if (givenLikes >= MAX_LIKES_TO_GIVE) {
      return;
    }

    setLikes((likes) => likes + 1);
    setLastAction("+");
    setGivenLikesData(incrementGivenLikes(givenLikesData, slug));
    try {
      await like(type, slug);
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
      await unlike(type, slug);
    } catch (error) {
      setLikes((likes) => likes + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Popcorn width={40} count={givenLikes} onAdd={onLike} onRemove={onUnlike} />
      <span className={clsx(styles.text, givenLikes > 0 && styles.given)}>
        {normalizeCount(likes)}
      </span>

      <div className={styles.wrapper}>
        {lastAction && (
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
            {lastAction}1
          </motion.div>
        )}
      </div>
    </div>
  );
});

LikesCounter.displayName = "LikesCounter";
