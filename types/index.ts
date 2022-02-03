import { allCategories } from "data/categories";
import { allAuthors } from "data/authors";

export type Route = { label: string; path: string };

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: "artist";
  uri: string;
  name: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type Project = {
  type: "project";
  title: string;
  excerpt: string;
  slug: string;
  url: string;
  timeToRead: number;
  publishedAt: string;
  isPublished: boolean;
  repoUrl: string;
  stack: string[];
  image: string;
  author: Author;
};

export type Post = {
  type: "post";
  title: string;
  slug: string;
  excerpt: string;
  timeToRead: number;
  publishedAt: string;
  isPublished: boolean;
  isPopular: boolean;
  category: Category;
  image: string;
  author: Author;
};

export type Category = typeof allCategories[number]["slug"];
export type Author = typeof allAuthors[number]["name"];

export type PromiseValue<T> = T extends PromiseLike<infer R> ? R : T;
export type InferGetStaticPropsType<T extends (...args: any) => any> = PromiseValue<ReturnType<T>> extends infer Temp
  ? Temp extends {
      readonly props: infer P;
    }
    ? P
    : never
  : never;

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
