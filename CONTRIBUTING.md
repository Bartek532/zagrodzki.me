# Contribution Guidelines

[zagrodzki.me](https://zagrodzki.me) is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/zagrodzki.me/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report.

If you have a feature to request, please open a feature request.

If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for zagrodzki.me, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## Content

If you spot a typo or an error, please boldly let me know.

**You can also write your own article!**

Just put it in `/content` folder and make a PR. It would be good for you to contact me beforehand to discuss the details, but it's not necessary. I can guarantee you that your efforts will be appreciated! Let's make a strong community 💪

## File Structure

Description of the project files and directories.

```bash
├── .github                    # Github workflows and templates
├── .vscode                    # VSCode settings
├── app/                       # Next.js app directory (v13)
├── components/                # React components
├── content/                   # All .mdx files with content
├── data/                      # Global available data
├── hooks/                     # Shared React hooks
├── lib/                       # Lib files
├── providers/                 # React context global state and other providers
├── public/                    # All images, icons, fonts
├── scripts/                   # Scripts executed during deployment (algolia, redirects, feed)
├── styles/                    # All shared styles
├── types/                     # TypeScript types
├── utils/                     # All utilities
├── .env-sample                # Examples of env variables
├── .gitignore                 # Files ignored by git
├── .npmrc                     # NPM configuration
├── .prettierignore            # Files ignored by Prettier
├── build.sh                   # Deployment script
├── eslint.config.mjs          # ESLint configuration file
├── lefthook.yml               # Lefthook git hooks
├── next.config.ts             # Next.js config
├── package.json               # Dependencies and additional information
├── pnpm-lock.yaml             # Pnpm lockfile
├── prettier.config.mjs        # Code convention enforced by Prettier
├── README.md
└── tsconfig.json              # Typescript configuration
```

## Styleguide

Coding conventions are enforced by [ESLint](eslint.config.mjs) and [Prettier](prettier.config.mjs).

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
├── component/
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   └── component.tsx
```

```tsx
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

| Tech                                                   | Description                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)          | Static type-checking programming language                     |
| [Next.js](https://nextjs.org/)                         | The React framework for production                            |
| [React](https://reactjs.org/)                          | Library for building user interfaces                          |
| [MDX](https://mdxjs.com/)                              | Markdown for the component era                                |
| [Algolia](https://www.algolia.com/)                    | Implementing powerful search                                  |
| [Tailwind CSS](https://tailwindcss.com/)               | Utility-first CSS framework                                   |
| [Radix UI](https://www.radix-ui.com/)                  | Accessible and composable headless UI components              |
| [Github Actions](https://github.com/features/actions)  | Automations for workflow improvements                         |
| [Motion](https://www.motion.dev/)                      | Motion library for making animations                          |
| [React Hook Form](https://react-hook-form.com)         | Forms with easy-to-use validation                             |
| [Vercel KV](https://vercel.com/docs/storage/vercel-kv) | Durable Redis database                                        |
| [SCSS](https://sass-lang.com)                          | CSS with superpowers                                          |
| [Zod](https://zod.dev)                                 | TypeScript-first schema validation with static type inference |
| [Lefthook](https://github.com/evilmartians/lefthook)   | Git hooks                                                     |
| [ESLint](https://eslint.org/)                          | TypeScript linting                                            |
| [Prettier](https://prettier.io/)                       | Code formatter                                                |

## Scripts

| Script                                                                             | Description                                                 |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [algolia](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L15)    | Updates Algolia indexes with posts and projects             |
| [build](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L16)      | Builds the whole project                                    |
| [build:next](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L17) | Builds Next.js app                                          |
| [dev](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L18)        | Runs Next.js local development server                       |
| [feed](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L19)       | Generates RSS feed for the blog                             |
| [format](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L20)     | Checks formatting across the project (Prettier)             |
| [format:fix](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L21) | Writes formatting fixes (Lefthook passes staged files)      |
| [lint](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L22)       | Runs ESLint against project files                           |
| [lint:fix](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L23)   | Runs ESLint with `--fix` (Lefthook passes staged files)     |
| [redirect](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L24)   | Generates redirects to the newest post (in next.config.mjs) |
| [start](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L25)      | Starts Next.js server                                       |
| [tsc](https://github.com/Bartek532/zagrodzki.me/blob/main/package.json#L26)        | Runs TypeScript transpilation against project files         |

## Star History 🌟

[![Star History Chart](https://api.star-history.com/svg?repos=Bartek532/zagrodzki.me&type=Date)](https://star-history.com/#Bartek532/zagrodzki.me&Date)
