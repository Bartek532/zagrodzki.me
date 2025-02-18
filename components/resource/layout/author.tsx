import Image from "next/image";
import { memo } from "react";

import { Link } from "@/components/common/link/link";
import { allAuthors } from "data/authors";
import { Author as AuthorType } from "types";

interface AuthorProps {
  readonly name: AuthorType;
}

export const Author = memo<AuthorProps>(({ name }) => {
  const author = allAuthors.find((c) => c.name === name);

  if (!author) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-8 max-w-3xl sm:gap-12 px-6 sm:px-8 lg:px-10 py-10 mx-auto">
      <div className="relative size-28 sm:size-40">
        <Image
          src={author.avatar}
          alt={name}
          fill
          className="rounded-full object-cover object-center"
        />
      </div>

      <div className="flex-1">
        <span className="font-bold mb-3 block text-lg">Written by {author.name}</span>
        <p className="text-muted-foreground leading-relaxed">{author.meta.description}</p>
        <div className="mt-5">
          <Link href={author.meta.about}>Learn more about {author.name.split(" ")[0]}</Link>
        </div>
      </div>
    </div>
  );
});

Author.displayName = "Author";
