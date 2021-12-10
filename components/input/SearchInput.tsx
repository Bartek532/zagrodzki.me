import styles from "./searchInput.module.scss";
import { memo } from "react";

type SearchInputProps = {
  readonly placeholder: string;
  readonly label: string;
  readonly name: string;
};

export const SearchInput = memo<SearchInputProps>(
  ({ placeholder, label, name }) => {
    return (
      <label className={styles.wrapper}>
        <span className="sr-only">{label}</span>
        <input
          type="search"
          placeholder={placeholder}
          name={name}
          className={styles.input}
        />
      </label>
    );
  }
);

SearchInput.displayName = "SearchInput";
