import { Hero } from "./Hero";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Hero> = {
  title: "Common/Hero",
  component: Hero,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: "Hello, world!",
    description: "This is a description",
  },
};

export default meta;
