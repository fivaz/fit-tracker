import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressChart } from "./progress-chart";

const meta = {
	component: ProgressChart,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		dataKey: { control: "select", options: ["maxWeight", "totalReps", "volume"] },
		color: { control: "color" },
		unit: { control: "text" },
	},
} satisfies Meta<typeof ProgressChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
	{ date: "Jan 1", maxWeight: 100, totalReps: 20, volume: 2000 },
	{ date: "Jan 2", maxWeight: 105, totalReps: 22, volume: 2310 },
	{ date: "Jan 3", maxWeight: 110, totalReps: 25, volume: 2750 },
	{ date: "Jan 4", maxWeight: 108, totalReps: 24, volume: 2592 },
	{ date: "Jan 5", maxWeight: 115, totalReps: 26, volume: 2990 },
	{ date: "Jan 6", maxWeight: 120, totalReps: 28, volume: 3360 },
	{ date: "Jan 7", maxWeight: 125, totalReps: 30, volume: 3750 },
];

export const MaxWeightProgress: Story = {
	args: {
		data: sampleData,
		dataKey: "maxWeight",
		title: "Max Weight Progress",
		color: "#3b82f6",
		unit: "(kg)",
	},
};

export const VolumeProgress: Story = {
	args: {
		data: sampleData,
		dataKey: "volume",
		title: "Total Volume Progress",
		color: "#10b981",
		unit: "(kg)",
	},
};

export const RepsProgress: Story = {
	args: {
		data: sampleData,
		dataKey: "totalReps",
		title: "Total Reps Progress",
		color: "#f59e0b",
		unit: "",
	},
};

export const MinimalData: Story = {
	args: {
		data: [
			{ date: "Jan 1", maxWeight: 100, totalReps: 20, volume: 2000 },
			{ date: "Jan 2", maxWeight: 110, totalReps: 25, volume: 2750 },
		],
		dataKey: "maxWeight",
		title: "Max Weight Progress",
		color: "#3b82f6",
		unit: "(kg)",
	},
};
