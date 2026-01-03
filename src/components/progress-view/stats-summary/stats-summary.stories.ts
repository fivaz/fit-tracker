import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatsSummary } from "./stats-summary";

const meta = {
	component: StatsSummary,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		workoutCount: { control: "number" },
	},
} satisfies Meta<typeof StatsSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		latestData: {
			date: "Jan 3",
			maxWeight: 150,
			totalReps: 45,
			volume: 3600,
		},
		workoutCount: 24,
	},
};

export const LowProgress: Story = {
	args: {
		latestData: {
			date: "Jan 3",
			maxWeight: 50,
			totalReps: 10,
			volume: 300,
		},
		workoutCount: 3,
	},
};

export const HighProgress: Story = {
	args: {
		latestData: {
			date: "Jan 3",
			maxWeight: 250,
			totalReps: 100,
			volume: 8500,
		},
		workoutCount: 120,
	},
};
