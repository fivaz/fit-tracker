import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExerciseSelector } from "./exercise-selector";

const meta = {
	component: ExerciseSelector,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		selectedExerciseId: { control: "text" },
		onExerciseChange: { action: "exercise changed" },
	},
} satisfies Meta<typeof ExerciseSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		exercises: [
			{ id: "1", name: "Bench Press" },
			{ id: "2", name: "Squats" },
			{ id: "3", name: "Deadlifts" },
			{ id: "4", name: "Overhead Press" },
			{ id: "5", name: "Barbell Rows" },
		],
		selectedExerciseId: "",
		onExerciseChange: (id: string) => console.log("Selected exercise:", id),
	},
};

export const WithSelection: Story = {
	args: {
		exercises: [
			{ id: "1", name: "Bench Press" },
			{ id: "2", name: "Squats" },
			{ id: "3", name: "Deadlifts" },
			{ id: "4", name: "Overhead Press" },
			{ id: "5", name: "Barbell Rows" },
		],
		selectedExerciseId: "1",
		onExerciseChange: (id: string) => console.log("Selected exercise:", id),
	},
};

export const SingleExercise: Story = {
	args: {
		exercises: [{ id: "1", name: "Bench Press" }],
		selectedExerciseId: "",
		onExerciseChange: (id: string) => console.log("Selected exercise:", id),
	},
};
