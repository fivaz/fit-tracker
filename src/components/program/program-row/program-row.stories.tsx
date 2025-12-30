import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockProgram } from "@/seed/mock-data";

import { ProgramRow } from "./program-row";

const meta = {
	component: ProgramRow,
} satisfies Meta<typeof ProgramRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { program: mockProgram },
};

export const Secondary: Story = {
	args: { program: mockProgram },
};
