import { NextConfig } from "next";

import "./lib/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
      },
      {
        hostname: "www.gravatar.com",
      },
      {
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },
  rewrites() {
    return Promise.resolve([
      {
        source: "/feed",
        destination: "/feed.xml",
      },
    ]);
  },
  redirects() {
    return Promise.resolve([
      {
        source: "/new-post",
        destination: "/blog/REPLACE_THE_NEWEST_POST_SLUG",
        permanent: false,
      },
      {
        source: "/new",
        destination: "/blog/REPLACE_THE_NEWEST_POST_SLUG",
        permanent: false,
      },
      {
        source: "/post",
        destination: "/blog/REPLACE_THE_NEWEST_POST_SLUG",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: `https://twitter.com/${process.env.NEXT_PUBLIC_X_USERNAME ?? ""}`,
        permanent: true,
      },
      {
        source: "/x",
        destination: `https://x.com/${process.env.NEXT_PUBLIC_X_USERNAME ?? ""}`,
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: `https://www.linkedin.com/in/${
          process.env.NEXT_PUBLIC_LINKEDIN_USERNAME ?? ""
        }`,
        permanent: true,
      },
      {
        source: "/github",
        destination: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? ""}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
