"use client";

import algoliasearch from "algoliasearch";
import Image from "next/image";
import { useCallback, useState, memo } from "react";
import {
  InstantSearch,
  connectHits,
  connectStateResults,
} from "react-instantsearch-dom";

import { SearchBox } from "components/common/search/SearchBox";
import { Skeleton } from "components/common/skeleton/Skeleton";
import { env } from "env/client";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

import styles from "./projectsListing.module.scss";
import {
  ProjectThumbnail,
  ProjectThumbnailSkeleton,
} from "./thumbnail/ProjectThumbnail";

import type {
  HitsProvided,
  StateResultsProvided,
} from "react-instantsearch-core";
import type { Project } from "types";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

interface CustomResultsProps extends StateResultsProvided<Project> {
  readonly children: React.ReactNode;
}

const CustomResults = connectStateResults<CustomResultsProps>(
  ({ searchResults, isSearchStalled, children }) => {
    if (isSearchStalled) {
      return (
        <div className={styles.list}>
          {Array(7)
            .fill(null)
            .map((_, i) => (
              <div key={i} className={styles.hit}>
                <ProjectThumbnailSkeleton />
              </div>
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

interface CustomHitsProps extends HitsProvided<Project> {
  readonly currentObjectID: string | null;
  readonly setObjectId: (objectId: string) => void;
  readonly blurredImages: {
    readonly slug: string;
    readonly base64: string;
  }[];
}

export const CustomHits = connectHits<CustomHitsProps, Project>(
  ({ hits, currentObjectID, blurredImages }) => {
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
            <ProjectThumbnail
              project={hit}
              blurredImage={
                blurredImages.find((d) => d.slug === hit.slug)?.base64
              }
            />
          </li>
        ))}
      </ol>
    );
  },
);

interface ProjectsListingProps {
  readonly blurredImages: {
    readonly slug: string;
    readonly base64: string;
  }[];
}

export const ProjectsListing = memo<ProjectsListingProps>(
  ({ blurredImages }) => {
    const [currentObjectID, setObjectId] = useState<string | null>(null);

    const handleInputChange = useCallback(() => {
      setTimeout(() => setObjectId(null), 0);
    }, []);

    return (
      <div className={styles.projects}>
        <InstantSearch
          indexName={env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME}
          searchClient={searchClient}
        >
          <SearchBox
            currentObjectID={currentObjectID}
            onChange={handleInputChange}
          />
          <CustomResults>
            <CustomHits
              currentObjectID={currentObjectID}
              setObjectId={setObjectId}
              blurredImages={blurredImages}
            />
          </CustomResults>
        </InstantSearch>
      </div>
    );
  },
);

export const ProjectsListingSkeleton = () => (
  <div className={styles.projects}>
    <Skeleton h={4.5} w={30} />
    <div className={styles.list}>
      {Array(7)
        .fill(null)
        .map((_, i) => (
          <div key={i} className={styles.hit}>
            <ProjectThumbnailSkeleton />
          </div>
        ))}
    </div>
  </div>
);

ProjectsListing.displayName = "ProjectsListing";
