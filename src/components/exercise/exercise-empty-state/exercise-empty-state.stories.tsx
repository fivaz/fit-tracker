import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExerciseEmptyState } from "./exercise-empty-state";

const meta = {
	component: ExerciseEmptyState,
} satisfies Meta<typeof ExerciseEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
