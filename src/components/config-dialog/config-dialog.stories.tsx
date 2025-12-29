import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConfigDialog } from "./config-dialog";

const meta = {
	component: ConfigDialog,
} satisfies Meta<typeof ConfigDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
