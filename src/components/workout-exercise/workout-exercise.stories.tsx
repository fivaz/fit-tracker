import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockExercise } from "@/seed/mock-data";

import { WorkoutExercise } from "./workout-exercise";

const meta = {
	component: WorkoutExercise,
} satisfies Meta<typeof WorkoutExercise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		exercise: mockExercise,
		sessionId: "session-123",
	},
};

export const Secondary: Story = {
	args: {
		exercise: mockExercise,
		sessionId: "session-123",
	},
};
