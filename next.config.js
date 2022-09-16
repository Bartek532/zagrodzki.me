/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-github-btn"]);
const withPWA = require("next-pwa");

module.exports = withPWA(
  withTM({
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
    async rewrites() {
      return [
        {
          source: "/feed",
          destination: "/feed.xml",
        },
      ];
    },

    async redirects() {
      return [
        {
          source: "/new-post",
          destination: "/blog/THE_NEWEST_POST_SLUG_HERE",
          permanent: false,
        },
        {
          source: "/new",
          destination: "/blog/THE_NEWEST_POST_SLUG_HERE",
          permanent: false,
        },
        {
          source: "/newest-post",
          destination: "/blog/THE_NEWEST_POST_SLUG_HERE",
          permanent: false,
        },

        {
          source: "/twitter",
          destination: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`,
          permanent: true,
        },
        {
          source: "/linkedin",
          destination: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`,
          permanent: true,
        },
        {
          source: "/github",
          destination: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
          permanent: true,
        },
        {
          source: "/gumroad",
          destination: `https://zagrodzki.gumroad.com/`,
          permanent: true,
        },
      ];
    },
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
  }),
);
