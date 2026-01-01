import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExercisesSkeleton } from "@/components/exercise/exercises-skeleton/exercises-skeleton";

const meta = {
	component: ExercisesSkeleton,
} satisfies Meta<typeof ExercisesSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
