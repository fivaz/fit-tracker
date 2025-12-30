import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockExercise } from "@/seed/mock-data";

import { ExerciseRow } from "./exercise-row";

const meta = {
	component: ExerciseRow,
} satisfies Meta<typeof ExerciseRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { exercise: mockExercise, programId: "1" },
};

export const Secondary: Story = {
	args: { exercise: mockExercise, programId: "1" },
};
