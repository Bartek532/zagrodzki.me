import { Skeleton } from "./Skeleton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Common/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    w: 10,
    h: 10,
    square: true,
  },
} satisfies Story;

export default meta;
