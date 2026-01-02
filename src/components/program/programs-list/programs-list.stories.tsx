import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockProgram } from "@/seed/mock-data";

import { ProgramsList } from "./programs-list";

const meta = {
	component: ProgramsList,
} satisfies Meta<typeof ProgramsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		initialPrograms: [mockProgram],
	},
};

export const Secondary: Story = {
	args: {
		initialPrograms: [mockProgram],
	},
};
