import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StartWorkout } from "./start-workout";

const meta = {
component: StartWorkout,
} satisfies Meta<typeof StartWorkout>;

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