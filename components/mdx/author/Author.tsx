import { memo } from "react";

import { allAuthors } from "data/authors";

import { Link } from "../link/Link";

import styles from "./author.module.scss";

type AuthorProps = {
  readonly name: typeof allAuthors[number]["name"];
};

export const Author = memo<AuthorProps>(({ name }) => {
  const author = allAuthors.find((c) => c.name === name)!;

  return (
    <div className={styles.author}>
      <div className={styles.avatar} style={{ backgroundImage: `url(${author.avatarUrl})` }}></div>

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
