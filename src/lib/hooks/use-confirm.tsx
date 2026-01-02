"use client";

import React from "react";

import { ConfirmContext } from "./confirm-context";

/**
 * Accesses the `confirm` function from the nearest `ConfirmProvider` via ConfirmContext.
 *
 * @returns The `confirm` function provided by the current `ConfirmProvider`.
 * @throws Error if called outside of a `ConfirmProvider` with message "useConfirm must be used within ConfirmProvider".
 */
export function useConfirm() {
	const context = React.useContext(ConfirmContext);
	if (!context) {
		throw new Error("useConfirm must be used within ConfirmProvider");
	}
	return context.confirm;
}