import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TimeButton } from "./time-button";

const meta = {
component: TimeButton,
} satisfies Meta<typeof TimeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
};

export const Secondary: Story = {
    args: {
    },
};