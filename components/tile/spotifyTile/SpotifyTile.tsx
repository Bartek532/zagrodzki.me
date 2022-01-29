import clsx from "clsx";
import Image from "next/image";

import SpotifyIcon from "public/svg/spotify.svg";
import { LoaderRing } from "components/loader/LoaderRing";

import styles from "./spotifyTile.module.scss";
import { useGetCurrentTrack } from "./hooks/useGetCurrentTrack";
import { normalizeTrackArtists } from "./utils/normalizeTrackArtists";
import { normalizeTitle } from "./utils/normalizeTitle";

export const SpotifyTile = () => {
  const { data, error } = useGetCurrentTrack();

  if (error) {
    return null;
  }

  if (!data) {
    return (
      <div className={clsx(styles.wrapper, styles.loaderWrapper)}>
        <LoaderRing />
      </div>
    );
  }

  const { artists, album, name, external_urls } = data.track;

  return (
    <a className={styles.wrapper} href={external_urls.spotify}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <SpotifyIcon />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>
            <span className={styles.barWrapper}>
              <span className={clsx(styles.bar, styles.bar1)}></span>
              <span className={clsx(styles.bar, styles.bar2)}></span>
              <span className={clsx(styles.bar, styles.bar3)}></span>
            </span>
            Now playing
          </span>
          <h2 className={styles.title}>{normalizeTitle(name)}</h2>
          <p className={styles.description}>{normalizeTrackArtists(artists)}</p>
        </div>
        <div className={styles.album}>
          <Image src={album.images[0].url} width="640" height="640" alt={album.name} />
        </div>
      </div>
    </a>
  );
};
