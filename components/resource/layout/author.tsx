import { memo } from "react";

import { Image } from "@/components/common/image/image";
import { Link } from "@/components/common/link/link";
import { allAuthors } from "@/data/authors";

import type { Author as AuthorType } from "@/types";

interface AuthorProps {
  readonly name: AuthorType;
}

export const Author = memo<AuthorProps>(({ name }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const author = allAuthors.find((c) => c.name === name);

  if (!author) return null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10 sm:flex-row sm:gap-12 sm:px-8 lg:px-10">
      <div className="relative size-28 sm:size-40">
        <Image
          src={author.avatar}
          alt={name}
          fill
          className="rounded-full object-cover object-center"
        />
      </div>

      <div className="flex-1">
        <span className="mb-3 block text-lg font-bold">Written by {author.name}</span>
        <p className="text-muted-foreground leading-relaxed">{author.meta.description}</p>
        <div className="mt-5">
          <Link href={author.meta.about}>Learn more about {author.name.split(" ")[0]}</Link>
        </div>
      </div>
    </div>
  );
});

Author.displayName = "Author";
