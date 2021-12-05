import styles from "./loaderRing.module.scss";

export const LoaderRing = () => {
  return (
    <div className={styles.loader}>
      <span className="sr-only">loading</span>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
