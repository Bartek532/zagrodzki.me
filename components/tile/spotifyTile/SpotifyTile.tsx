import styles from "./spotifyTile.module.scss";
import { memo } from "react";
import SpotifyIcon from "public/svg/spotify.svg";
import { useGetCurrentTrack } from "../hooks/useGetCurrentTrack";
import cn from "classnames";
import { normalizeTrackArtists } from "../utils/normalizeTrackArtists";
import { normalizeTitle } from "../utils/normalizeTitle";
import type { SpotifyTrack } from "types";
import { LoaderRing } from "components/loader/LoaderRing";
import Image from "next/image";

export const SpotifyTile = () => {
  const { data, isLoading } = useGetCurrentTrack();

  if (!data) {
    return null;
  }

  const {
    item: { artists, album, name, external_urls },
  } = data.track;

  return (
    <a className={styles.wrapper} href={external_urls.spotify}>
      <div className={styles.content}>
        {isLoading ? (
          <LoaderRing />
        ) : (
          <>
            <div className={styles.logo}>
              <SpotifyIcon />
            </div>
            <div className={styles.info}>
              <span className={styles.label}>
                <span className={styles.barWrapper}>
                  <span className={cn(styles.bar, styles.bar1)}></span>
                  <span className={cn(styles.bar, styles.bar2)}></span>
                  <span className={cn(styles.bar, styles.bar3)}></span>
                </span>
                Now playing
              </span>
              <h2 className={styles.title}>{normalizeTitle(name)}</h2>
              <p className={styles.description}>
                {normalizeTrackArtists(artists)}
              </p>
            </div>
            <div className={styles.album}>
              <Image
                src={album.images[0].url}
                width="640"
                height="640"
                alt={album.name}
              />
            </div>
          </>
        )}
      </div>
    </a>
  );
};
