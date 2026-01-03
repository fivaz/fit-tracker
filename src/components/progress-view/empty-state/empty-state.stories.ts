import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar, Dumbbell, TrendingUp } from "lucide-react";

import { EmptyState } from "./empty-state";

const meta = {
	component: EmptyState,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		subtitle: { control: "text" },
	},
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoWorkoutData: Story = {
	args: {
		icon: Dumbbell,
		title: "No workout data yet",
		subtitle: "Complete workouts to see your progress",
	},
};

export const SelectExercise: Story = {
	args: {
		icon: TrendingUp,
		title: "Select an exercise",
		subtitle: "View your progress over time",
	},
};

export const NoWorkoutHistory: Story = {
	args: {
		icon: Calendar,
		title: "No workout history yet",
		subtitle: "Complete workouts to track progress",
	},
};
