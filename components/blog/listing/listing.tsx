"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { groupBy } from "lodash";
import Image from "next/image";
import { useHits } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { StickyList } from "@/components/common/sections/sticky-list";
import { Post } from "@/types";
import { cn } from "@/utils";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

import { PostThumbnail } from "./thumbnail";

dayjs.extend(customParseFormat);

export const PostsListing = () => {
  const { items } = useHits<Post>();

  const posts = groupBy(items, (post) => dayjs(post.publishedAt, "DD-MM-YYYY").format("YYYY"));

  if (!items.length) {
    return (
      <Section>
        <div className="bg-dashed flex items-center justify-center col-span-2">
          <Image src={DisappointedAvatar} alt="disappointed memoji" />
        </div>
      </Section>
    );
  }

  return Object.entries(posts)
    .reverse()
    .map(([year, posts]) => (
      <StickyList key={year} title={year}>
        {posts.map((post, index) => (
          <PostThumbnail
            key={post.slug}
            post={post}
            className={cn({
              "border-b": index !== posts.length - 1,
            })}
          />
        ))}
      </StickyList>
    ));
};
