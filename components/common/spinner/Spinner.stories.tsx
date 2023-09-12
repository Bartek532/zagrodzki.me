import { Spinner } from "./Spinner";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Common/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export default meta;
