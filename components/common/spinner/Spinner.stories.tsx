import { Spinner } from "./Spinner";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Spinner> = {
  title: "Common/Spinner",
  component: Spinner,
};

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export default meta;
