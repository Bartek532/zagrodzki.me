import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bart Zagrodzki",
    short_name: "zagrodzki.me",
    description:
      "I'm a software engineer building products to help people lead better lives 🎯 In love with creative solutions - constantly learning and discovering new stuff 📖",
    background_color: "#F7F1F3",
    theme_color: "#855B52",
    start_url: "/?source=pwa",
    display: "standalone",
    icons: [
      {
        src: "/regular-android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/regular-android-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/maskable-android-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
