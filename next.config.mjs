/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["i.scdn.co"],
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
        destination: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME ?? ""}`,
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
      {
        source: "/gumroad",
        destination: `https://${process.env.NEXT_PUBLIC_GUMROAD_USERNAME ?? ""}.gumroad.com`,
        permanent: true,
      },
    ]);
  },
};

export default withPWA(nextConfig);
