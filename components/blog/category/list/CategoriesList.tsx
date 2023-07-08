import { memo } from "react";

import { Skeleton } from "components/common/skeleton/Skeleton";

import { CategoryCard } from "./card/CategoryCard";
import styles from "./categoriesList.module.scss";

import type { Category } from "types";

interface CategoriesListProps {
  readonly categories: Category[];
}

export const CategoriesList = memo<CategoriesListProps>(({ categories }) => (
  <section className={styles.wrapper}>
    <h2 className={styles.title}>categories</h2>
    <div className={styles.categories}>
      {categories.map((category) => (
        <CategoryCard category={category} key={category} />
      ))}
    </div>
  </section>
));

export const CategoriesListSkeleton = () => (
  <section className={styles.wrapper}>
    <Skeleton h={3} />
    <div className={styles.categories}>
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <Skeleton h={2.5} w={5} key={i} />
        ))}
    </div>
  </section>
);

CategoriesList.displayName = "CategoriesList";
