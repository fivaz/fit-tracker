import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressHeader } from "./progress-header";

const meta = {
	component: ProgressHeader,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ProgressHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
