import clsx from "clsx";
import Image from "next/image";
import { Suspense } from "react";

import { Spinner } from "components/common/spinner/Spinner";
import CrossIcon from "public/svg/cross.svg";
import OfflineIcon from "public/svg/offline.svg";
import SpotifyIcon from "public/svg/spotify.svg";

import { fetchLastTrack } from "./api/spotify";
import styles from "./spotifyTile.module.scss";
import { TRACK_STATUS } from "./types";
import { normalizeTitle } from "./utils/normalizeTitle";
import { normalizeTrackArtists } from "./utils/normalizeTrackArtists";

const getTrack = async () => {
  try {
    const data = await fetchLastTrack();

    return { data, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e.message };
    }
    return { data: null, error: "Unexpected error occurred!" };
  }
};

const LoadingFallback = () => (
  <div className={clsx(styles.wrapper, styles.loaderWrapper)}>
    <Spinner />
  </div>
);

const SpotifyData = async () => {
  const { data, error } = await getTrack();

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

  if (!data) return <LoadingFallback />;

  const { artists, album, name, external_urls } = data.track;

  return (
    <a className={clsx(styles.wrapper, styles.dataWrapper)} href={external_urls.spotify}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <SpotifyIcon />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>
            {data.status === TRACK_STATUS.ONLINE ? (
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

export const SpotifyTile = () => (
  <Suspense fallback={<LoadingFallback />}>
    <SpotifyData />
  </Suspense>
);
