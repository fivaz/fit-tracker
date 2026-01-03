import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatCard } from "./stat-card";

const meta = {
	component: StatCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		label: { control: "text" },
		value: { control: "text" },
		gradient: { control: "text" },
	},
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MaxWeight: Story = {
	args: {
		label: "Max Weight",
		value: "150 kg",
		gradient: "from-blue-500 to-blue-600",
	},
};

export const Workouts: Story = {
	args: {
		label: "Workouts",
		value: 24,
		gradient: "from-green-500 to-green-600",
	},
};

export const TotalReps: Story = {
	args: {
		label: "Total Reps",
		value: 450,
		gradient: "from-orange-500 to-orange-600",
	},
};

export const Volume: Story = {
	args: {
		label: "Volume",
		value: "3,600 kg",
		gradient: "from-purple-500 to-purple-600",
	},
};
