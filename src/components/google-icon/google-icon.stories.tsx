import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { GoogleIcon } from "./google-icon";

const meta = {
component: GoogleIcon,
} satisfies Meta<typeof GoogleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
};

export const Secondary: Story = {
    args: {
    },
};