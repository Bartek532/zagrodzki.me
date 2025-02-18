export const typographyConfig = (theme: (path: string) => string) => ({
  DEFAULT: {
    css: {
      "h1, h2, h3, h4, h5, h6": {
        letterSpacing: theme("letterSpacing.tight"),
      },
      "figure, img, video": {
        margin: 0,
      },
      "blockquote p": {
        fontStyle: "normal",
      },
      pre: false,
      code: false,
      "pre code": false,
      "code::before": false,
      "code::after": false,
      a: {
        textDecoration: "none",
      },
    },
  },
  invert: {
    css: {},
  },
});
