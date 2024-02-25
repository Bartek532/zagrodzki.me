"use client";

import { memo, useOptimistic, useTransition } from "react";

import { Popcorn } from "components/common/popcorn/Popcorn";
import { useLocalStorage } from "hooks/useLocalStorage";
import { like, unlike } from "lib/kv/likes";
import { RESOURCE_TYPE } from "types";
import { normalizeCount } from "utils/functions";

import { decrementGivenLikes, getGivenLikes, incrementGivenLikes } from "../utils/givenLikes";

import styles from "./likesCounter.module.scss";

const MAX_LIKES_TO_GIVE = 10;
type Action = "like" | "unlike";

type LikesCounterProps = {
  readonly likes: number;
  readonly type: RESOURCE_TYPE;
  readonly slug: string;
};

export const LikesCounter = memo<LikesCounterProps>(({ likes, type, slug }) => {
  const [isPending, startTransition] = useTransition();
  const [givenLikesData, setGivenLikesData] = useLocalStorage<string>("likes", "{}");
  const givenLikes = getGivenLikes(givenLikesData, slug);
  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(likes, (state, action: Action) => {
    if (action === "like") {
      return state + 1;
    }
    return state - 1;
  });

  const onLike = async () => {
    if (givenLikes >= MAX_LIKES_TO_GIVE) {
      return;
    }
    startTransition(() => {
      changeOptimisticLikes("like");
    });
    setGivenLikesData(incrementGivenLikes(givenLikesData, slug));
    await like(type, slug);
  };

  const onUnlike = async () => {
    startTransition(() => {
      changeOptimisticLikes("unlike");
    });
    setGivenLikesData(decrementGivenLikes(givenLikesData, slug));
    await unlike(type, slug);
  };

  return (
    <div className={styles.container}>
      <Popcorn width={40} count={givenLikes} onAdd={onLike} onRemove={onUnlike} />
      <span className={styles.text}>{normalizeCount(optimisticLikes)}</span>
      {isPending}
    </div>
  );
});

LikesCounter.displayName = "LikesCounter";
