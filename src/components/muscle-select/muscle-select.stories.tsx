import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MuscleSelect } from "./muscle-select";

const meta = {
	component: MuscleSelect,
} satisfies Meta<typeof MuscleSelect>;

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
