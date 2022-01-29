import { memo } from "react";
import Link from "next/link";

import styles from "./categories.module.scss";

type CategoriesProps = {
  readonly categories: string[];
};

export const Categories = memo<CategoriesProps>(({ categories }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>categories</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <Link href={`/blog?category=${encodeURIComponent(category)}`} key={category}>
            <a className={styles.category}>{category}</a>
          </Link>
        ))}
      </div>
    </section>
  );
});

Categories.displayName = "Categories";
