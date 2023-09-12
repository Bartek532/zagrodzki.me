import * as React from "react";
import clsx from "clsx";
import { walsheim, mono, kenfolg } from "../lib/fonts";
import "styles/globals.scss";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={clsx(kenfolg.variable, mono.variable, walsheim.variable)}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
