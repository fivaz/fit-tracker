import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Logo } from "./logo";

const meta = {
	component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
