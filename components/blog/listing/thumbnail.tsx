import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { SuperLink } from "@/components/common/link/super-link";
import { Prose } from "@/components/ui/prose";
import { allCategories } from "@/data/categories";
import { Post } from "@/types";
import { cn } from "@/utils";

type PostThumbnailProps = {
  readonly post: Post;
  readonly className?: string;
};

export const PostThumbnail = ({ post, className }: PostThumbnailProps) => (
  <SuperLink href={`/blog/${post.slug}`} key={post.slug}>
    <motion.article
      className={cn(
        "flex flex-col  justify-between gap-8 p-6 transition-colors bg-background hover:bg-card dark:hover:bg-accent",
        "sm:p-8",
        className,
      )}
      layout
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-2xl">{post.title}</h2>
        </div>
        <Prose>
          <p className="leading-normal text-pretty">{post.excerpt}</p>
        </Prose>

        <div className="mt-3 flex justify-between items-end">
          <div className="flex items-center w-fit  gap-2">
            <span>{allCategories.find((c) => c.slug === post.category)?.name}</span>
            &bull;
            <span>{Math.round(post.timeToRead)} minutes</span>
          </div>

          <div className="flex items-center gap-1.5 border rounded-lg px-4 py-1.5">
            <span className="text-sm">Read more</span>
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </div>
    </motion.article>
  </SuperLink>
);
