const { typographyConfig } = require("./lib/typography");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        backdrop: "hsl(var(--backdrop))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        connection: "hsl(var(--connection))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        sky: "hsl(var(--sky))",
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        link: {
          DEFAULT: "hsl(var(--link))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-walsheim)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        heading: ["var(--font-kenfolg)", ...fontFamily.sans],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      typography: typographyConfig,
      boxShadow: {
        tile: "hsla(0, 0%, 0%, 0.08) 0px 1px 4px",
      },
      keyframes: {
        "bar-pulse": {
          "0%": {
            height: "1px",
            marginTop: "0",
          },
          "10%": {
            height: "15px",
            marginTop: "-15px",
          },
          "50%": {
            height: "5px",
            marginTop: "-5px",
          },
          "60%": {
            height: "7px",
            marginTop: "-7px",
          },
          "80%": {
            height: "15px",
            marginTop: "-15px",
          },
          "100%": {
            height: "1px",
            marginTop: "0",
          },
        },
        loading: {
          to: {
            backgroundPositionX: "-20%",
          },
        },
      },
      animation: {
        "bar-pulse": "bar-pulse 1s infinite",
        loading: "loading 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
