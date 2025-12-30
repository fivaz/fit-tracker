import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramEmptyState } from "./program-empty-state";

const meta = {
	component: ProgramEmptyState,
} satisfies Meta<typeof ProgramEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
