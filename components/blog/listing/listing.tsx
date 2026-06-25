"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { groupBy } from "lodash";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useHits, useInstantSearch, useSearchBox } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { StickyList } from "@/components/common/sections/sticky-list";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import DisappointedAvatar from "../../../public/img/avatars/disappointed.png";

import { PostThumbnail } from "./thumbnail";

import type { Post } from "@/types";

dayjs.extend(customParseFormat);

interface PostsListingProps {
  readonly initialPosts: Post[];
}

export const PostsListing = ({ initialPosts }: PostsListingProps) => {
  const { status } = useInstantSearch();
  const { items } = useHits<Post>();
  const { query } = useSearchBox();
  const searchParams = useSearchParams();
  const isFiltered = Boolean(query.trim()) || Boolean(searchParams.get("category"));
  const displayItems = isFiltered || items.length > 0 ? items : initialPosts;

  const posts = groupBy(displayItems, (post) =>
    dayjs(post.modifiedAt, "DD-MM-YYYY").format("YYYY"),
  );

  if (!displayItems.length) {
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

  const yearsWithStartIndex = Object.entries(posts)
    .reverse()
    .reduce<{ year: string; yearPosts: Post[]; startIndex: number }[]>(
      (acc, [year, yearPosts]) => {
        const startIndex =
          acc.length === 0
            ? 0
            : (acc[acc.length - 1]?.startIndex ?? 0) + (acc[acc.length - 1]?.yearPosts.length ?? 0);

        acc.push({ year, yearPosts, startIndex });
        return acc;
      },
      [],
    );

  return yearsWithStartIndex.map(({ year, yearPosts, startIndex }) => (
    <StickyList key={year} title={year}>
      {yearPosts.map((post, index) => (
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={(startIndex + index) * 0.15}
          key={post.slug}
        >
          <PostThumbnail
            post={post}
            className={cn({
              "border-b": index !== yearPosts.length - 1,
            })}
          />
        </ViewAnimation>
      ))}
    </StickyList>
  ));
};
