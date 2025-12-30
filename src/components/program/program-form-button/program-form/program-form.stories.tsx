import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramForm } from "./program-form";

const meta = {
	component: ProgramForm,
} satisfies Meta<typeof ProgramForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
