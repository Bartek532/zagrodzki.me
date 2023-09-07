import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    status: "pending",
    children: "Click me!",
  },
};

export const Loading: Story = {
  args: {
    status: "loading",
  },
};

export const Success: Story = {
  args: {
    status: "fullfilled",
    children: "Success!",
  },
};

export const Failure: Story = {
  args: {
    status: "rejected",
    children: "Failure!",
  },
};

export default meta;
