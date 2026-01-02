import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { subHours } from "date-fns";

import { mockProgram } from "@/seed/mock-data";

import { WorkoutHeader } from "./workout-header";

const meta = {
	component: WorkoutHeader,
} satisfies Meta<typeof WorkoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		sessionId: "session-123",
		startedAt: new Date(),
		programName: mockProgram.name,
	},
};

export const Secondary: Story = {
	args: {
		sessionId: "session-123",
		startedAt: subHours(new Date(), 1),
		programName: mockProgram.name,
	},
};
