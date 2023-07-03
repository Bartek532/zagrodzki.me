import { memo } from "react";

import styles from "./categoriesList.module.scss";
import { CategoryCard } from "./categoryCard/CategoryCard";

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

CategoriesList.displayName = "CategoriesList";
