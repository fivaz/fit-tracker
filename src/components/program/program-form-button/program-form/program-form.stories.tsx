import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockProgram } from "@/seed/mock-data";

import { ProgramForm } from "./program-form";

const meta = {
	component: ProgramForm,
} satisfies Meta<typeof ProgramForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { program: mockProgram, onClose: () => {} },
};

export const Secondary: Story = {
	args: { program: mockProgram, onClose: () => {} },
};
