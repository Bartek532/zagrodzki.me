"use client";

import algoliasearch from "algoliasearch";
import Image from "next/image";
import { InstantSearch, connectHits, connectStateResults } from "react-instantsearch-dom";

import { SearchBox } from "components/common/input/search/SearchBox";
import { Skeleton } from "components/common/skeleton/Skeleton";
import { env } from "env/client";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

import { ArchiveCheckbox } from "./archive/ArchiveCheckbox";
import styles from "./projectsListing.module.scss";
import { ProjectThumbnail, ProjectThumbnailSkeleton } from "./thumbnail/ProjectThumbnail";

import type { HitsProvided, StateResultsProvided } from "react-instantsearch-core";
import type { Project } from "types";

const FEATURED_PROJECT = "rssmarkable";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);

interface CustomResultsProps extends StateResultsProvided<Project> {
  readonly children: React.ReactElement;
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

export const CustomHits = connectHits<HitsProvided<Project>, Project>(({ hits }) => {
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
    <ol id="search-hits-list" className={styles.list} role="list">
      {hits.map((hit) => (
        <li key={hit.objectID} id={"id" + hit.objectID} className={styles.hit}>
          <ProjectThumbnail project={hit} featured={hit.slug === FEATURED_PROJECT} />
        </li>
      ))}
    </ol>
  );
});

export const ProjectsListing = () => (
  <div className={styles.projects}>
    <InstantSearch
      indexName={env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME}
      searchClient={searchClient}
    >
      <div className={styles.search}>
        <SearchBox />
        <ArchiveCheckbox
          attribute="archived"
          value={false}
          defaultRefinement={false}
          label="show only active projects"
        />
      </div>

      <CustomResults>
        <CustomHits />
      </CustomResults>
    </InstantSearch>
  </div>
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
