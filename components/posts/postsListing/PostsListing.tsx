import styles from "./postsListing.module.scss";

export const PostsListing = () => {
  return (
    <div className={styles.posts}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.description}>Everything that I or anyone else has written for my blog ✍️</p>
      </div>
    </div>
  );
};
