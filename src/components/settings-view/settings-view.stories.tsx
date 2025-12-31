import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockUser } from "@/seed/mock-data";

import { SettingsView } from "./settings-view";

const meta = {
	component: SettingsView,
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		user: mockUser,
	},
};
