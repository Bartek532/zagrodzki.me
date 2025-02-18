import { Configure } from "react-instantsearch";

import { SuperLink } from "@/components/common/link/super-link";
import { badgeVariants } from "@/components/ui/badge";
import { allCategories } from "@/data/categories";
import { Category } from "@/types";
import { cn } from "@/utils";

type CategoriesProps = {
  readonly categories: Category[];
  readonly activeCategory?: Category;
};

export const Categories = ({ categories, activeCategory }: CategoriesProps) => (
  <>
    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 max-w-xl items-center justify-center">
      {categories.map((category) => (
        <SuperLink
          key={category}
          href={`/blog${activeCategory === category ? "" : `?category=${category}`}`}
          className={cn(
            badgeVariants(),
            "text-xs bg-link/50 hover:bg-link py-1 px-3 text-primary-foreground focus:ring-link",
            { "bg-link": activeCategory === category },
          )}
        >
          {allCategories.find((c) => c.slug === category)?.name}
        </SuperLink>
      ))}
    </div>

    {activeCategory && <Configure filters={`category:${activeCategory}`} />}
  </>
);
