import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar, Weight } from "lucide-react";

import { EditableField } from "./editable-field";

const meta = {
	component: EditableField,
} satisfies Meta<typeof EditableField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		icon: Weight,
		label: "Body Weight",
		value: "80",
		fieldName: "weight",
		type: "number",
		unit: "kg",
		onSave: async (value) => {
			console.log("Saving weight:", value);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		},
	},
};

export const Secondary: Story = {
	args: {
		icon: Calendar,
		label: "Birth Date",
		value: "1995-06-15",
		fieldName: "dob",
		type: "date",
		onSave: async (value) => {
			console.log("Saving date:", value);
		},
	},
};
