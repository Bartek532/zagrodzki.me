import { memo } from "react";
import Link from "next/link";

import type { Category as CategoryType } from "types";
import { allCategories } from "data/categories";

import styles from "./categoryCard.module.scss";

type CategoryCardProps = {
  readonly category: CategoryType;
};

export const CategoryCard = memo<CategoryCardProps>(({ category }) => {
  return (
    <Link href={`/blog?category=${category}`} key={category}>
      <a className={styles.category}>{allCategories.find((c) => c.slug === category)?.name}</a>
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";
