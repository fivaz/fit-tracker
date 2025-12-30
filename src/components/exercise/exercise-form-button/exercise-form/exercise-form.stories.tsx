import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExerciseForm } from "./exercise-form";

const meta = {
	component: ExerciseForm,
} satisfies Meta<typeof ExerciseForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
