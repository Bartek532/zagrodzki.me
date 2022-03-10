import clsx from "clsx";
import Image from "next/image";

import SpotifyIcon from "public/svg/spotify.svg";
import OfflineIcon from "public/svg/offline.svg";
import CrossIcon from "public/svg/cross.svg";
import { LoaderRing } from "components/common/loader/LoaderRing";

import styles from "./spotifyTile.module.scss";
import { useGetTrack } from "./hooks/useGetTrack";
import { normalizeTrackArtists } from "./utils/normalizeTrackArtists";
import { normalizeTitle } from "./utils/normalizeTitle";

export const SpotifyTile = () => {
  const { data, error } = useGetTrack();

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <div className={styles.icon}>
            <CrossIcon />
          </div>
          <p className={styles.description}>Something went wrong during fetching!</p>
        </div>
      </div>
    );
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
    <a className={clsx(styles.wrapper, styles.dataWrapper)} href={external_urls.spotify}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <SpotifyIcon />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>
            {data.status === "online" ? (
              <>
                <span className={styles.barWrapper}>
                  <span className={clsx(styles.bar, styles.bar1)}></span>
                  <span className={clsx(styles.bar, styles.bar2)}></span>
                  <span className={clsx(styles.bar, styles.bar3)}></span>
                </span>
                Now playing
              </>
            ) : (
              <>
                <OfflineIcon />
                Offline. Last played
              </>
            )}
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
