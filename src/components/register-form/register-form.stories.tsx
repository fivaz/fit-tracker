import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RegisterForm } from "./register-form";

const meta = {
	component: RegisterForm,
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Secondary: Story = {
	args: {},
};
