"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { groupBy } from "lodash";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useHits, useInstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { StickyList } from "@/components/common/sections/sticky-list";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import DisappointedAvatar from "../../../public/img/avatars/disappointed.png";

import { PostThumbnail } from "./thumbnail";

import type { Post } from "@/types";

dayjs.extend(customParseFormat);

export const PostsListing = () => {
  const { status } = useInstantSearch();
  const { items } = useHits<Post>();

  const posts = groupBy(items, (post) => dayjs(post.modifiedAt, "DD-MM-YYYY").format("YYYY"));

  if (!items.length) {
    return (
      <Section>
        {status === "loading" ? (
          <div className="bg-dashed col-span-2 flex items-center justify-center py-16 sm:py-24 lg:py-32">
            <Loader2 className="text-primary size-10 animate-spin" />
          </div>
        ) : (
          <div className="bg-dashed col-span-2 flex items-center justify-center">
            <Image src={DisappointedAvatar} alt="disappointed memoji" />
          </div>
        )}
      </Section>
    );
  }

  return Object.entries(posts)
    .reverse()
    .map(([year, posts]) => (
      <StickyList key={year} title={year}>
        {posts.map((post, index) => {
          return (
            <ViewAnimation
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              delay={index * 0.15}
              key={post.slug}
            >
              <PostThumbnail
                post={post}
                className={cn({
                  "border-b": index !== posts.length - 1,
                })}
              />
            </ViewAnimation>
          );
        })}
      </StickyList>
    ));
};
