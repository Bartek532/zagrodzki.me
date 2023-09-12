import styles from "./spinner.module.scss";

export const Spinner = () => (
  <div className={styles.spinner}>
    <span className="sr-only">loading</span>
    <div className={styles.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
