import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExerciseFormButton } from "./exercise-form-button";

const meta = {
	component: ExerciseFormButton,
} satisfies Meta<typeof ExerciseFormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		programId: "test-program-id",
	},
};
