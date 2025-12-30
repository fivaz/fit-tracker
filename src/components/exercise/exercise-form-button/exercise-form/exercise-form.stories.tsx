import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockExercise } from "@/seed/mock-data";

import { ExerciseForm } from "./exercise-form";

const meta = {
	component: ExerciseForm,
} satisfies Meta<typeof ExerciseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		exercise: mockExercise,
		onClose: () => {},
		programId: "test-program",
	},
};

export const Secondary: Story = {
	args: {
		exercise: mockExercise,
		onClose: () => {},
		programId: "test-program",
	},
};
