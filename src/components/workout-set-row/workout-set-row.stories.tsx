import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WorkoutSetRow } from "./workout-set-row";

const meta = {
component: WorkoutSetRow,
} satisfies Meta<typeof WorkoutSetRow>;

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