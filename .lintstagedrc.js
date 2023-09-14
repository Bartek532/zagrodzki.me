module.exports = {
  "*.{js,jsx,ts,tsx,md,mdx,graphql,yml,yaml,css,scss,json}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": [() => "eslint --fix"],
};
