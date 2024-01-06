import Link from "next/link";
import { memo } from "react";

import { allCategories } from "data/categories";

import styles from "./categoryCard.module.scss";

import type { Category as CategoryType } from "types";

interface CategoryCardProps {
  readonly category: CategoryType;
}

export const CategoryCard = memo<CategoryCardProps>(({ category }) => (
  <Link href={`/blog?category=${category}`} key={category} className={styles.category}>
    {allCategories.find((c) => c.slug === category)?.name}
  </Link>
));

CategoryCard.displayName = "CategoryCard";
