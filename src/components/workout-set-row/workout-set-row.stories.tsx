import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { parse } from "date-fns";
import { fn } from "storybook/test";

import { WorkoutSetRow } from "@/components/workout-set-row/workout-set-row";

const meta: Meta<typeof WorkoutSetRow> = {
	title: "Workout/WorkoutSetRow",
	component: WorkoutSetRow,
	parameters: {
		layout: "centered",
	},
	// Use fn() to see the data being sent to the DB in the "Actions" tab
	args: {
		onUpdate: fn(),
		onDelete: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof WorkoutSetRow>;

export const Primary: Story = {
	args: {
		index: 0,
		set: {
			id: "set-1",
			reps: "12",
			weight: "60",
			completedAt: new Date(),
		},
	},
};

export const Completed: Story = {
	args: {
		index: 1,
		set: {
			id: "set-2",
			reps: "10",
			weight: "60",
			completedAt: parse("14:30", "hh:mm", new Date()),
		},
	},
};

export const Empty: Story = {
	args: {
		index: 2,
		set: {
			id: "set-3",
			reps: "",
			weight: "",
			completedAt: null,
		},
	},
};
