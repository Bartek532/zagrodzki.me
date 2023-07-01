import Link from "next/link";
import { memo } from "react";

import { allCategories } from "data/categories";
import type { Category as CategoryType } from "types";

import styles from "./categoryCard.module.scss";

interface CategoryCardProps {
  readonly category: CategoryType;
}

export const CategoryCard = memo<CategoryCardProps>(({ category }) => {
  return (
    <Link
      href={`/blog?category=${category}`}
      key={category}
      className={styles.category}
    >
      {allCategories.find((c) => c.slug === category)?.name}
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";
