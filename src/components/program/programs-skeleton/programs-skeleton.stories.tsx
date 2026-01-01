import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramsSkeleton } from "./programs-skeleton";

const meta = {
component: ProgramsSkeleton,
} satisfies Meta<typeof ProgramsSkeleton>;

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