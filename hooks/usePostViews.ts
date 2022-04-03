import countapi from "countapi-js";
import { useState, useCallback } from "react";

import { ORIGIN } from "utils/consts";
import type { Post } from "types";

export const usePostViews = () => {
  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const hitPostView = useCallback(async (slug: string) => {
    setIsLoading(true);
    const result = await countapi.hit(ORIGIN, slug);
    setViews(result.value);
    setIsLoading(false);
  }, []);

  const getTotalPostsViews = useCallback(async (posts: Post[]) => {
    setIsLoading(true);
    const views = await posts.reduce(async (sum, post) => {
      const postViews = await countapi.get(ORIGIN, post.slug);

      return (await sum) + postViews.value;
    }, Promise.resolve(0));

    setIsLoading(false);

    return views;
  }, []);

  return { views, isLoading, hitPostView, getTotalPostsViews };
};
