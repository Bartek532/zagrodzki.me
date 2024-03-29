import { memo } from "react";

import { Image } from "components/common/image/Image";
import { Link } from "components/common/link/Link";
import { allAuthors } from "data/authors";
import { Author as AuthorType } from "types";

import styles from "./author.module.scss";

interface AuthorProps {
  readonly name: AuthorType;
}

export const Author = memo<AuthorProps>(({ name }) => {
  const author = allAuthors.find((c) => c.name === name);

  if (!author) return null;

  return (
    <div className={styles.author}>
      <div className={styles.avatar}>
        <Image
          src={author.avatar}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>Written by {author.name}</div>
        <p className={styles.description}>{author.meta.description}</p>
        <div className={styles.learnMore}>
          <Link href={author.meta.about}>Learn more about {author.name.split(" ")[0]}</Link>
        </div>
      </div>
    </div>
  );
});

Author.displayName = "Author";
