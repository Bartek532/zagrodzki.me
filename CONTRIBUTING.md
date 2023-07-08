# Contribution Guidelines

zagrodzki.me is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/zagrodzki.me/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for zagrodzki.me, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## Content

If you spot a typo or an error, please boldly let me know. **You can also write your own article!** Just put it in `/content` folder and make a PR. It would be good for you to contact me beforehand to discuss the details, but it's not necessary. I can guarantee you that your efforts will be appreciated! Let's make a strong community 💪

## File Structure

Description of the project files and directories.

```bash
├── app/                       # Next.js app directory (v13)
├── components/                # React components
├── content/                   # All .mdx files with content
├── data/                      # Global available data
├── env/                       # Env variables handling (validation)
├── hooks/                     # Shared React hooks
├── lib/                       # Lib files
├── providers/                 # React context global state
├── scripts/                   # Scripts executed during deployment (algolia, redirects, feed)
├── public/                    # All images, icons, fonts
├── styles/                    # All shared styles
├── types/                     # TypeScript types
├── utils/                     # All utilities
├── .env-sample                # Examples of env variables
├── .eslintignore              # Files ignored by ESLint
├── .eslintrc.js               # ESLint configuration file
├── .gitignore                 # Files ignored by git
├── .prettierignore            # Files ignored by Prettier
├── .prettierrc                # Code convention enforced by Prettier
├── build.sh                   # Deployment script
├── next.config.mjs             # Next.js config
├── package.json               # Dependencies and additional information
├── README.md
├── tsconfig.json              # Typescript configuration
└── pnpm-lock.yaml             # Pnpm lockfile
```

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.json) and [Prettier](.prettierrc).

- Semicolons
- Double quotes
- `const` preferred over `let`
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Two space indentation
- React: functional style with Hooks (no classes)
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with strict ESLint rules

## Example component structure

```bash
├── Component/
│   ├── Component.tsx
│   └── component.module.scss
```

```tsx
import styles from "./component.module.scss";
import { memo } from "react";

interface ComponentProps {
  readonly title: string;
}

export const Component = memo<ComponentProps>(({ title }) => {
  return <h1>{title}</h1>;
});

Component.displayName = "Component";
```

## Tech stack

| Tech                                                      | Description                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)             | Static type-checking programming language                           |
| [Next.js 13](https://nextjs.org/)                         | The React Framework for Production                                  |
| [React](https://reactjs.org/)                             | Library for building user interfaces                                |
| [MDX](https://mdxjs.com/)                                 | Markdown for the component era                                      |
| [Algolia](https://www.algolia.com/)                       | Implementing powerful search                                        |
| [Github Actions](https://github.com/features/actions)     | Automations for workflow improvements                               |
| [Framer Motion](https://www.framer.com/motion/)           | Motion library for React                                            |
| [Context API](https://reactjs.org/docs/context.html)      | React structure that enables to share data with multiple components |
| [React Hook Form](https://react-hook-form.com)            | Forms with easy-to-use validation                                   |
| [Vercel KV](https://vercel.com/docs/storage/vercel-kv)    | Durable Redis database                                              |
| [SCSS](https://sass-lang.com)                             | CSS with superpowers                                                |
| [CSS Modules](https://github.com/css-modules/css-modules) | Styles convention in React                                          |
| [Zod](https://zod.dev)                                    | TypeScript-first schema validation with static type inference       |
| [Husky](https://github.comtypicode/husky)                 | Git hooks                                                           |
| [ESLint](https://eslint.org/)                             | TypeScript linting                                                  |
| [Prettier](https://prettier.io/)                          | Code formatter                                                      |
