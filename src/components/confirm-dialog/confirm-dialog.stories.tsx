import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConfirmDialog } from "./confirm-dialog";

const meta = {
	component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
