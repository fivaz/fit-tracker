import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockExercises } from "@/seed/mock-data";

import { ProgressView } from "./progress-view";

const meta = {
	component: ProgressView,
} satisfies Meta<typeof ProgressView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		exercises: mockExercises,
		sessions: [
			/* Add mock workout sessions here if needed */
		],
	},
};

export const Secondary: Story = {
	args: {
		exercises: mockExercises,
		sessions: [
			/* Add mock workout sessions here if needed */
		],
	},
};
