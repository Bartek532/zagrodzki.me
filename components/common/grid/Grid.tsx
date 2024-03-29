import styles from "./grid.module.scss";

interface GridProps {
  readonly children: React.ReactNode;
}

export const Grid = ({ children }: GridProps) => <div className={styles.grid}>{children}</div>;
