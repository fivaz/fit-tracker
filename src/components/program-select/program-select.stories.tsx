import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramSelect } from "./program-select";

const meta = {
	component: ProgramSelect,
} satisfies Meta<typeof ProgramSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		defaultValue: ["chest", "back"],
	},
};

export const Secondary: Story = {
	args: {
		defaultValue: ["chest"],
	},
};
