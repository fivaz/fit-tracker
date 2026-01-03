import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressView } from "./progress-view";

const meta = {
	title: "Progress View/Progress View",
	component: ProgressView,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ProgressView>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockExercises = [
	{ id: "1", name: "Bench Press" },
	{ id: "2", name: "Squats" },
	{ id: "3", name: "Deadlifts" },
	{ id: "4", name: "Overhead Press" },
];

const mockSessions = [
	{
		id: "session-1",
		startedAt: new Date("2026-01-01"),
		completedAt: new Date("2026-01-01T10:00:00"),
		setLogs: [
			{ id: "1", weight: 100, reps: 10, completedAt: new Date(), exerciseId: "1" },
			{ id: "2", weight: 100, reps: 8, completedAt: new Date(), exerciseId: "1" },
		],
	},
	{
		id: "session-2",
		startedAt: new Date("2026-01-02"),
		completedAt: new Date("2026-01-02T10:00:00"),
		setLogs: [
			{ id: "3", weight: 105, reps: 10, completedAt: new Date(), exerciseId: "1" },
			{ id: "4", weight: 105, reps: 9, completedAt: new Date(), exerciseId: "1" },
		],
	},
	{
		id: "session-3",
		startedAt: new Date("2026-01-03"),
		completedAt: new Date("2026-01-03T10:00:00"),
		setLogs: [
			{ id: "5", weight: 150, reps: 5, completedAt: new Date(), exerciseId: "2" },
			{ id: "6", weight: 150, reps: 5, completedAt: new Date(), exerciseId: "2" },
		],
	},
];

export const WithData: Story = {
	args: {
		exercises: mockExercises,
		sessions: mockSessions,
	},
};

export const EmptyWorkouts: Story = {
	args: {
		exercises: mockExercises,
		sessions: [],
	},
};

export const NoExercises: Story = {
	args: {
		exercises: [],
		sessions: mockSessions,
	},
};

export const SingleExercise: Story = {
	args: {
		exercises: [{ id: "1", name: "Bench Press" }],
		sessions: [
			{
				id: "session-1",
				startedAt: new Date("2026-01-01"),
				completedAt: new Date("2026-01-01T10:00:00"),
				setLogs: [{ id: "1", weight: 100, reps: 10, completedAt: new Date(), exerciseId: "1" }],
			},
		],
	},
};
