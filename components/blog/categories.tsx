import { Configure } from "react-instantsearch";

import { SuperLink } from "@/components/common/link/super-link";
import { badgeVariants } from "@/components/ui/badge";
import { allCategories } from "@/data/categories";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import type { Category } from "@/types";

interface CategoriesProps {
  readonly categories: Category[];
  readonly activeCategory?: Category;
}

export const Categories = ({ categories, activeCategory }: CategoriesProps) => (
  <>
    <div className="flex max-w-xl flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5">
      {categories.map((category, index) => (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -4 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={index * 0.1 + 0.2}
          key={category}
        >
          <SuperLink
            href={`/blog${activeCategory === category ? "" : `?category=${category}`}`}
            className={cn(
              badgeVariants(),
              "bg-link/50 px-3 py-1 text-xs text-primary-foreground hover:bg-link focus:ring-link",
              { "bg-link": activeCategory === category },
            )}
          >
            {allCategories.find((c) => c.slug === category)?.name}
          </SuperLink>
        </ViewAnimation>
      ))}
    </div>

    {activeCategory && <Configure filters={`category:${activeCategory}`} />}
  </>
);
