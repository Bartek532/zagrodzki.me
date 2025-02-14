import Image from "next/image";

import { ThirdsSection } from "@/components/common/sections/thirds";
import { Post } from "@/types";
import { cn } from "@/utils";

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
        label: "View all features",
        href: "/blog",
      },
    ]}
  >
    <div
      className={cn("relative aspect-video overflow-hidden bg-dashed px-4 pt-4", "sm:px-8 sm:pt-8")}
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
