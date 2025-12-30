import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";

import { ConfirmDialog } from "./confirm-dialog";

const meta = {
	component: ConfirmDialog,
	parameters: {
		layout: "centered",
	},
	// Use fn() to log actions in the Storybook "Actions" panel
	args: {
		onConfirm: fn(),
		onCancel: fn(),
	},
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteAccount: Story = {
	args: {
		isOpen: true,
		title: "Delete Account",
		message:
			"Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
	},
};

export const DiscardChanges: Story = {
	args: {
		isOpen: true,
		title: "Discard Changes",
		message:
			"You have unsaved changes. Are you sure you want to leave this page? Your progress will be lost.",
	},
};
