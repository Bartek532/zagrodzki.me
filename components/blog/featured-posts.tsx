import { Image } from "@/components/common/image/image";
import { SuperLink } from "@/components/common/link/super-link";
import { Section } from "@/components/common/sections/section";
import { Prose } from "@/components/ui/prose";
import { ViewAnimation } from "@/providers/view-animation";
import { cn, formatDate } from "@/utils";

import type { Post } from "@/types";

interface FeaturedPostsProps {
  readonly posts: Post[];
}

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => (
  <>
    <Section className={cn("bg-dashed p-6", "sm:p-8")}>
      <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} delay={0.2}>
        <Prose>
          <h2 className="mb-2 text-3xl text-balance">Check my other posts 📚</h2>
          <p className="text-pretty">
            If you find this helpful, you can also check out these posts
          </p>
        </Prose>
      </ViewAnimation>
    </Section>

    <Section className="grid grid-cols-1 lg:grid-cols-3">
      {posts.map((post, index, array) => (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.2 + index * 0.2}
          key={post.slug}
        >
          <SuperLink href={`/blog/${post.slug}`}>
            <article
              className={cn(
                "gap-5§ bg-background hover:bg-card dark:hover:bg-accent flex h-full flex-col justify-between p-6 pb-0 transition-colors",
                "sm:p-8 lg:pb-0",
                index < array.length - 1 ? "border-b sm:border-r sm:border-b-0" : "",
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                </div>

                <div className="flex w-fit items-center gap-2 text-sm">
                  <p>{formatDate(post.modifiedAt)}</p>
                  <p>&bull;</p>
                  <p>{Math.round(post.timeToRead)} min read</p>
                </div>
              </div>

              <div className="mt-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={880}
                  className="aspect-120/88 rounded-t-lg"
                />
              </div>
            </article>
          </SuperLink>
        </ViewAnimation>
      ))}
    </Section>
  </>
);
