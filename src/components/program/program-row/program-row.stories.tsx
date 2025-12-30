import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramRow } from "./program-row";

const meta = {
	component: ProgramRow,
} satisfies Meta<typeof ProgramRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
