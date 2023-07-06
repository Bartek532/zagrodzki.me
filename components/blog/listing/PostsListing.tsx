"use client";

import algoliasearch from "algoliasearch";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, memo } from "react";
import {
  InstantSearch,
  connectHits,
  Configure,
  connectStateResults,
} from "react-instantsearch-dom";

import { LoaderRing } from "components/common/loader/LoaderRing";
import { SearchBox } from "components/common/search/SearchBox";
import { allCategories } from "data/categories";
import { env } from "env/client";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

import { CategoriesList } from "../category/list/CategoriesList";
import { PopularPosts } from "../popular/PopularPosts";

import styles from "./postsListing.module.scss";
import { PostThumbnail } from "./thumbnail/PostThumbnail";

import type { HitsProvided } from "react-instantsearch-core";
import type { Post, Category } from "types";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

interface CustomHitsProps extends HitsProvided<Post> {
  readonly currentObjectID: string | null;
  readonly setObjectId: (objectId: string) => void;
}

export const CustomHits = connectHits<CustomHitsProps, Post>(
  ({ hits, currentObjectID }) => {
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
      <ol id="search-hits-list" className={styles.list}>
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            role="option"
            aria-describedby="search-details"
            aria-selected={currentObjectID === hit.objectID}
            id={"id" + hit.objectID}
            className={styles.hit}
          >
            <PostThumbnail post={hit} />
          </li>
        ))}
      </ol>
    );
  },
);

interface PostsListingProps {
  readonly popularPosts: Post[];
  readonly categories: Category[];
}

const LoadingIndicator = connectStateResults(({ isSearchStalled }) =>
  isSearchStalled ? (
    <div className={styles.loading}>
      <LoaderRing />
    </div>
  ) : null,
);

export const PostsListing = memo<PostsListingProps>(
  ({ popularPosts, categories }) => {
    const [currentObjectID, setObjectId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const handleInputChange = useCallback(() => {
      setTimeout(() => setObjectId(null), 0);
    }, []);

    return (
      <div className={styles.posts}>
        <InstantSearch
          indexName={env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME}
          searchClient={searchClient}
        >
          <div className={styles.main}>
            <CategoriesList categories={categories} />
            <PopularPosts posts={popularPosts} />
            <div className={styles.wrapper}>
              {searchParams.has("category") ? (
                <>
                  <h2 className={styles.searchedCategory}>
                    {
                      allCategories.find(
                        (c) => c.slug === searchParams.get("category"),
                      )?.name
                    }
                  </h2>
                  <Configure
                    filters={`category:${searchParams.get("category") ?? ""}`}
                  />
                </>
              ) : (
                <SearchBox
                  currentObjectID={currentObjectID}
                  onChange={handleInputChange}
                />
              )}
              <LoadingIndicator />
              <CustomHits
                currentObjectID={currentObjectID}
                setObjectId={setObjectId}
              />
            </div>
          </div>
        </InstantSearch>
      </div>
    );
  },
);

PostsListing.displayName = "PostsListing";
