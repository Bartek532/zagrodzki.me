import { memo } from "react";

import type { Category } from "types";

import { CategoryCard } from "./categoryCard/CategoryCard";
import styles from "./categoriesList.module.scss";

type CategoriesListProps = {
  readonly categories: Category[];
};

export const CategoriesList = memo<CategoriesListProps>(({ categories }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>categories</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <CategoryCard category={category} key={category} />
        ))}
      </div>
    </section>
  );
});

CategoriesList.displayName = "CategoriesList";
