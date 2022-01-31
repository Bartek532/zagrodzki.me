import { memo } from "react";
import Link from "next/link";

import type { Category as CategoryType } from "types";

import styles from "./categoryCard.module.scss";

type CategoryCardProps = {
  readonly category: CategoryType;
};

export const CategoryCard = memo<CategoryCardProps>(({ category }) => {
  return (
    <Link href={`/blog?category=${encodeURIComponent(category)}`} key={category}>
      <a className={styles.category}>{category}</a>
    </Link>
  );
});

CategoryCard.displayName = "CategoryCard";
