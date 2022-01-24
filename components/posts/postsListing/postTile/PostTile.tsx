import styles from "./PostTile.module.scss";
import { memo } from "react";
import type { Post } from "types";

type PostTileProps = {
  readonly post: Post;
};

export const PostTile = memo<PostTileProps>(({ post }) => {
  return <h1>{post.title}</h1>;
});

PostTile.displayName = "PostTile";
