import { memo } from "react";

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

CategoriesList.displayName = "CategoriesList";
