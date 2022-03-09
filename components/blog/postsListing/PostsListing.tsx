import { useState, useCallback, memo } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, connectHits, Configure, connectStateResults } from "react-instantsearch-dom";
import type { HitsProvided } from "react-instantsearch-core";
import Image from "next/image";
import { useRouter } from "next/router";

import { LoaderRing } from "components/common/loader/LoaderRing";
import { allCategories } from "data/categories";
import type { Post, Category } from "types";
import { PostThumbnail } from "components/blog/postsListing/postThumbnail/PostThumbnail";
import { CategoriesList } from "components/category/categoriesList/CategoriesList";
import { PopularPosts } from "components/blog/popularPosts/PopularPosts";
import { SearchBox } from "components/common/searchBox/SearchBox";

import styles from "./postsListing.module.scss";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

interface CustomHitsProps extends HitsProvided<Post> {
  readonly currentObjectID: string | null;
  readonly setObjectId: (objectId: string) => void;
}

export const CustomHits = connectHits<CustomHitsProps, Post>(({ hits, currentObjectID }) => {
  if (!hits.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.avatar}>
          <Image src="/img/avatars/disappointed.png" alt="disappointed memoji" width={421} height={421} />
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
          aria-selected={currentObjectID === hit.objectID ? "true" : "false"}
          id={"id" + hit.objectID}
          className={styles.hit}
        >
          <PostThumbnail post={hit} />
        </li>
      ))}
    </ol>
  );
});

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

export const PostsListing = memo<PostsListingProps>(({ popularPosts, categories }) => {
  const [currentObjectID, setObjectId] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = useCallback(() => {
    setTimeout(() => setObjectId(null), 0);
  }, []);

  return (
    <div className={styles.posts}>
      <InstantSearch indexName="posts" searchClient={searchClient}>
        <div className={styles.main}>
          <CategoriesList categories={categories} />
          <PopularPosts posts={popularPosts} />
          <div className={styles.wrapper}>
            {router.query.category ? (
              <>
                <h2 className={styles.searchedCategory}>
                  {allCategories.find((c) => c.slug === router.query.category)?.name}
                </h2>
                <Configure filters={`category:${router.query.category}`} />
              </>
            ) : (
              <SearchBox currentObjectID={currentObjectID} onChange={handleInputChange} />
            )}
            <LoadingIndicator />
            <CustomHits currentObjectID={currentObjectID} setObjectId={setObjectId} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
});

PostsListing.displayName = "PostsListing";
