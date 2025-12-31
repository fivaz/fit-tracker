import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { TimeButton } from "./time-button";

const meta = {
	component: TimeButton,
} satisfies Meta<typeof TimeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		time: new Date("2024-01-01T14:30:00"),
		onTimeChange: fn(),
	},
};

export const Secondary: Story = {
	args: {
		time: null,
		onTimeChange: fn(),
	},
};
