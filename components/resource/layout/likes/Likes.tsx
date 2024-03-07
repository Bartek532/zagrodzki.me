import { random } from "lodash";
import { memo } from "react";

import { getResourceLikesBySlug } from "lib/kv/likes";
import { RESOURCE_TYPE } from "types";

import { LikesCounter } from "./counter/LikesCounter";

type LikesProps = {
  readonly type: RESOURCE_TYPE;
  readonly slug: string;
};

export const Likes = memo<LikesProps>(async ({ type, slug }) => {
  const likes = await getResourceLikesBySlug(type, slug);

  return <LikesCounter type={type} slug={slug} likes={likes || random(500, 2000)} />;
});

Likes.displayName = "Likes";
