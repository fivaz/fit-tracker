import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AppLayout } from "./app-layout";

const meta = {
	component: AppLayout,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { children: <div>test</div> },
};
