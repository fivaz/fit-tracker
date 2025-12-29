import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { QuickActions } from "./quick-actions";

const meta = {
	component: QuickActions,
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
