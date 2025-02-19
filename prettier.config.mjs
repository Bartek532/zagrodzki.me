import { fileURLToPath } from "url";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
const config = {
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: fileURLToPath(
    new URL("./tailwind.config.js", import.meta.url)
  ),
  tailwindFunctions: ["cn", "cva"],
};

export default config;
