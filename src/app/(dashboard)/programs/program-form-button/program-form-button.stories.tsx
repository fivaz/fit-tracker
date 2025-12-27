import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramFormButton } from "./program-form-button";

const meta = {
component: ProgramFormButton,
} satisfies Meta<typeof ProgramFormButton>;

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