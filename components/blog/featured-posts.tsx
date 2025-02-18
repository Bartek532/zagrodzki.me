import { Image } from "@/components/common/image";
import { SuperLink } from "@/components/common/link/super-link";
import { Section } from "@/components/common/sections/section";
import { Prose } from "@/components/ui/prose";
import { cn, formatDate } from "@/utils";
import { Post } from "types";

type FeaturedPostsProps = {
  readonly posts: Post[];
};

export const FeaturedPosts = ({ posts }: FeaturedPostsProps) => (
  <>
    <Section className={cn("bg-dashed p-6", "sm:p-8")}>
      <Prose>
        <h2 className="mb-2 text-3xl text-balance">Check my other posts 📚</h2>
        <p className="text-pretty">If you find this helpful, you can also check out these posts</p>
      </Prose>
    </Section>

    <Section className="grid grid-cols-1 lg:grid-cols-3">
      {posts.map((post, index, array) => (
        <SuperLink href={`/blog/${post.slug}`} key={post.slug}>
          <article
            className={cn(
              "flex flex-col h-full justify-between gap-5§ p-6 pb-0 transition-colors bg-background hover:bg-card dark:hover:bg-accent",
              "sm:p-8 lg:pb-0",
              index < array.length - 1 ? "sm:border-r border-b sm:border-b-0" : "",
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-2xl">{post.title}</h2>
              </div>

              <div className="flex items-center w-fit text-sm gap-2">
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
                className="rounded-t-lg aspect-[120/88]"
              />
            </div>
          </article>
        </SuperLink>
      ))}
    </Section>
  </>
);
