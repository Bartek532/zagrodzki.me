import { Image } from "@/components/common/image";
import { ThirdsSection } from "@/components/common/sections/thirds";
import { cn } from "@/utils";

import type { Post } from "@/types";

interface FeaturedPostProps {
  readonly post: Post;
}

export const FeaturedPost = ({ post }: FeaturedPostProps) => (
  <ThirdsSection
    title={post.title}
    description={post.excerpt}
    caption="Latest post"
    reverse
    buttons={[
      {
        label: "Keep reading",
        href: `/blog/${post.slug}`,
      },
      {
        label: "View all posts",
        href: "/blog",
      },
    ]}
  >
    <div
      className={cn("bg-dashed relative aspect-video overflow-hidden px-6 pt-6", "sm:px-8 sm:pt-8")}
    >
      <div className="relative h-full w-full">
        <Image src={post.image} alt="" fill className="rounded-t-lg border sm:rounded-t-2xl" />
      </div>
      <div className="dashed-line-top" />
      <div className="dashed-line-left" />
      <div className="dashed-line-right" />
    </div>
  </ThirdsSection>
);
