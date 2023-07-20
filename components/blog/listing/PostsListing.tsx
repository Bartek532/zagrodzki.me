"use client";

import algoliasearch from "algoliasearch";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { memo, Suspense } from "react";
import {
  InstantSearch,
  connectHits,
  Configure,
  connectStateResults,
} from "react-instantsearch-dom";

import { SearchBox } from "components/common/search/SearchBox";
import { Skeleton } from "components/common/skeleton/Skeleton";
import { allCategories } from "data/categories";
import { env } from "env/client";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

import {
  CategoriesList,
  CategoriesListSkeleton,
} from "../category/list/CategoriesList";
import { PopularPosts, PopularPostsSkeleton } from "../popular/PopularPosts";

import styles from "./postsListing.module.scss";
import {
  PostThumbnail,
  PostThumbnailSkeleton,
} from "./thumbnail/PostThumbnail";

import type { StateResultsProvided } from "react-instantsearch-core";
import type { Post, Category } from "types";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

interface CustomResultsProps extends StateResultsProvided<Post> {
  readonly children: React.ReactNode;
}

const CustomResults = connectStateResults<CustomResultsProps>(
  ({ searchResults, isSearchStalled, children }) => {
    if (isSearchStalled) {
      return (
        <div className={styles.list}>
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <Skeleton h={17} key={i} />
            ))}
        </div>
      );
    }

    if (!searchResults.hits.length) {
      return (
        <div className={styles.empty}>
          <div className={styles.avatar}>
            <Image src={DisappointedAvatar} alt="disappointed memoji" />
          </div>
        </div>
      );
    }

    return children;
  },
);

const CustomHits = connectHits<Post>(({ hits }) => {
  if (!hits.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.avatar}>
          <Image src={DisappointedAvatar} alt="disappointed memoji" />
        </div>
      </div>
    );
  }

  return (
    <ol id="search-hits-list" className={styles.list} role="">
      {hits.map((hit) => (
        <li key={hit.objectID} id={"id" + hit.objectID} className={styles.hit}>
          <PostThumbnail post={hit} />
        </li>
      ))}
    </ol>
  );
});

const Header = () => {
  const searchParams = useSearchParams();

  if (searchParams.has("category")) {
    return (
      <>
        <h2 className={styles.searchedCategory}>
          {
            allCategories.find((c) => c.slug === searchParams.get("category"))
              ?.name
          }
        </h2>
        <Configure filters={`category:${searchParams.get("category") ?? ""}`} />
      </>
    );
  }

  return <SearchBox />;
};

interface PostsListingProps {
  readonly popularPosts: Post[];
  readonly categories: Category[];
}

export const PostsListing = memo<PostsListingProps>(
  ({ popularPosts, categories }) => (
    <div className={styles.posts}>
      <InstantSearch
        indexName={env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME}
        searchClient={searchClient}
      >
        <div className={styles.main}>
          <CategoriesList categories={categories} />
          <PopularPosts posts={popularPosts} />
          <div className={styles.wrapper}>
            <Suspense fallback={<Skeleton h={4.5} />}>
              <Header />
            </Suspense>
            <CustomResults>
              <CustomHits />
            </CustomResults>
          </div>
        </div>
      </InstantSearch>
    </div>
  ),
);

export const PostsListingSkeleton = () => (
  <div className={styles.posts}>
    <div className={styles.main}>
      <CategoriesListSkeleton />
      <PopularPostsSkeleton />
      <div className={styles.wrapper}>
        <Skeleton h={4.5} />
        <div className={styles.list}>
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <PostThumbnailSkeleton key={i} />
            ))}
        </div>
      </div>
    </div>
  </div>
);

PostsListing.displayName = "PostsListing";
