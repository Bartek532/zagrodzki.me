import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["refractor", "prismjs"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },
  headers() {
    return Promise.resolve([
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]);
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
