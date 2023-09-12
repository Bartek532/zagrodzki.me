import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta  = {
  title: "Design system/Common/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    status: "pending",
    children: "Click me!",
  },
} satisfies Story;

export const Loading = {
  args: {
    status: "loading",
  },
} satisfies Story;

export const Success = {
  args: {
    status: "fullfilled",
    children: "Success!",
  },
} satisfies Story;

export const Failure = {
  args: {
    status: "rejected",
    children: "Failure!",
  },
} satisfies Story;

export default meta;
