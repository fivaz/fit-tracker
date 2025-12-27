import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramManager } from "./program-manager";

const meta = {
component: ProgramManager,
} satisfies Meta<typeof ProgramManager>;

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