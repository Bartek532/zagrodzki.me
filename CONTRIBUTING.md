# Contribution Guidelines

zagrodzki.me is an open source project, and contributions of any kind are welcome and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/Bartek532/zagrodzki.me/issues) tab and labeled accordingly. Feel free to open bug tickets and make feature requests. Easy bugs and features will be tagged with the `good first issue` label.

## Issues

If you encounter a bug, please file a bug report. If you have a feature to request, please open a feature request. If you would like to work on an issue or feature, there is no need to request permission.

## Pull Requests

In order to create a pull request for TakeNote, follow the GitHub instructions for [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Please link your pull request to an existing issue.

## File Structure

Description of the project files and directories.

```bash
├── components/                # React components
├── content/                   # All .mdx files with content
├── context/                   # React context global state
├── data/                      # Global available data
├── hooks/                     # Shared React hooks
├── lib/                       # Lib files
├── pages/                     # Next.js pages
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
├── generateAlgoliaItems.ts    # Script to generate Algolia index
├── generateFeed.ts            # Script to generate xml and json feed
├── generateNewPostRedirect.ts # Script to generate new post redirect
├── next.config.js             # Next.js config
├── package.json               # Dependencies and additional information
├── README.md
├── tsconfig.json              # Typescript configuration
└── yarn.lock                  # Yarn lockfile
```

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.js) and [Prettier](.prettierrc).

- Semicolons
- Double quotes
- `const` preferred over `let`
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Two space indentation
- React: functional style with Hooks (no classes)
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with no implicitly any

## Example component structure

```bash
├── Component/
│   ├── Component.tsx
│   └── component.module.scss
```

```tsx
import styles from "./component.module.scss";
import { memo } from "react";

type ComponentProps = {
  readonly title: string;
};

export const Component = memo<ComponentProps>(({ title }) => {
  return <h1>{title}</h1>;
});

Component.displayName = "Component";
```

## Tech stack

| Tech                                                      | Description                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)             | Static type-checking programming language                           |
| [Next.js](https://nextjs.org/)                            | The React Framework for Production                                  |
| [React](https://reactjs.org/)                             | Library for building user interfaces                                |
| [MDX](https://mdxjs.com/)                                 | Markdown for the component era                                      |
| [Algolia](https://www.algolia.com/)                       | Implementing search                                                 |
| [Framer Motion](https://www.framer.com/motion/)           | Motion library for React                                            |
| [Context API](https://reactjs.org/docs/context.html)      | React structure that enables to share data with multiple components |
| [React Query](https://react-query.tanstack.com/)          | Performant and powerful data synchronization for React              |
| [React Hook Form](https://react-hook-form.com)            | Forms with easy-to-use validation                                   |
| [SCSS](https://sass-lang.com)                             | CSS with superpowers                                                |
| [CSS Modules](https://github.com/css-modules/css-modules) | Styles convention in React                                          |
| [Husky](https://github.com/typicode/husky)                | Git hooks                                                           |
| [ESLint](https://eslint.org/)                             | TypeScript linting                                                  |
| [Prettier](https://prettier.io/)                          | Code formatter                                                      |
