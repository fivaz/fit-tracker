import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExerciseRow } from "./exercise-row";

const meta = {
	component: ExerciseRow,
} satisfies Meta<typeof ExerciseRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
