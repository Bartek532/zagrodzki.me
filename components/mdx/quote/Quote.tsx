import { memo } from "react";

import QuoteIcon from "public/svg/quote.svg";

import styles from "./quote.module.scss";

type QuoteProps = {
  readonly text: string;
  readonly author: string;
};

export const Quote = memo<QuoteProps>(({ text, author }) => {
  return (
    <blockquote className={styles.quote}>
      <div className={styles.icon}>
        <QuoteIcon />
      </div>
      <p className={styles.text}>{text}</p>
      <p className={styles.author}>{author}</p>
    </blockquote>
  );
});

Quote.displayName = "Quote";
