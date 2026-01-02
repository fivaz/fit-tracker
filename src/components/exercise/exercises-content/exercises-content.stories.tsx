import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExercisesContent } from "@/components/exercise/exercises-content/exercises-content";

const meta = {
	component: ExercisesContent,
} satisfies Meta<typeof ExercisesContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
