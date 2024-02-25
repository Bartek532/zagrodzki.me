"use client";

import { memo, startTransition, useOptimistic } from "react";

import { Popcorn } from "components/common/popcorn/Popcorn";
import { useLocalStorage } from "hooks/useLocalStorage";
import { like, unlike } from "lib/kv/likes";
import { RESOURCE_TYPE } from "types";
import { normalizeCount } from "utils/functions";

import styles from "./likes.module.scss";
import { decrementGivenLikes, getGivenLikes, incrementGivenLikes } from "./utils/givenLikes";

const MAX_LIKES_TO_GIVE = 10;
type Action = "like" | "unlike";

type LikesProps = {
  readonly likes: number;
  readonly type: RESOURCE_TYPE;
  readonly slug: string;
};

export const Likes = memo<LikesProps>(({ likes, type, slug }) => {
  const [optimisticLikes, changeOptimisticLikes] = useOptimistic(likes, (state, action: Action) => {
    if (action === "like") {
      return state + 1;
    }
    return state - 1;
  });
  const [givenLikesData, setGivenLikesData] = useLocalStorage<string>("likes", "{}");
  const givenLikes = getGivenLikes(givenLikesData, slug);

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
    </div>
  );
});

Likes.displayName = "Likes";
