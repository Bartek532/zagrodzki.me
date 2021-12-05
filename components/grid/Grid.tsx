import styles from "./grid.module.scss";

type GridProps = { readonly children: React.ReactNode };

export const Grid = ({ children }: GridProps) => {
  return <main className={styles.grid}>{children}</main>;
};
