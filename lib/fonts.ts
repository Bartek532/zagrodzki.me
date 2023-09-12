import localFont from "next/font/local";

export const walsheim = localFont({
  src: [
    {
      path: "../public/fonts/GT-Walsheim-Black.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/GT-Walsheim-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../public/fonts/GT-Walsheim-Medium.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/GT-Walsheim-Regular.woff2",
      weight: "normal",
    },
  ],
  display: "swap",
  variable: "--font-walsheim",
});

export const mono = localFont({
  src: "../public/fonts/LeagueMono-Regular.woff2",
  display: "swap",
  variable: "--font-mono",
});

export const kenfolg = localFont({
  src: "../public/fonts/Kenfolg.otf",
  display: "swap",
  variable: "--font-kenfolg",
});

console.log(walsheim, mono, kenfolg);
