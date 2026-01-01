import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgramsContent } from "./programs-content";

const meta = {
component: ProgramsContent,
} satisfies Meta<typeof ProgramsContent>;

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