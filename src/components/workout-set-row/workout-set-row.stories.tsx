import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { parse } from "date-fns";

import { WorkoutSetRow } from "@/components/workout-set-row/workout-set-row";

const meta: Meta<typeof WorkoutSetRow> = {
	title: "Workout/WorkoutSetRow",
	component: WorkoutSetRow,
	parameters: {
		layout: "centered",
	},
	// Use fn() to see the data being sent to the DB in the "Actions" tab
	args: {},
};

export default meta;
type Story = StoryObj<typeof WorkoutSetRow>;

export const Primary: Story = {
	args: {
		index: 0,
		set: {
			id: "set-1",
			reps: 12,
			weight: 60,
			completedAt: new Date(),
			order: 0,
			sessionId: "se-1",
			isPersonalRecord: false,
			exerciseId: "ex-1",
		},
	},
};

export const Completed: Story = {
	args: {
		index: 1,
		set: {
			id: "set-2",
			reps: 10,
			weight: 60,
			completedAt: parse("14:30", "hh:mm", new Date()),
			order: 0,
			sessionId: "se-1",
			isPersonalRecord: false,
			exerciseId: "ex-1",
		},
	},
};

export const Empty: Story = {
	args: {
		index: 2,
		set: {
			id: "set-3",
			reps: 0,
			weight: 0,
			completedAt: null,
			order: 0,
			sessionId: "se-1",
			isPersonalRecord: false,
			exerciseId: "ex-1",
		},
	},
};
