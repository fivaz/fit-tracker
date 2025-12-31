"use client";

import * as React from "react";

import { ConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";

interface ConfirmOptions {
	title: string;
	message?: string;
}

interface ConfirmContextType {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = React.createContext<ConfirmContextType | null>(null);

export function useConfirm() {
	const context = React.useContext(ConfirmContext);
	if (!context) {
		throw new Error("useConfirm must be used within ConfirmProvider");
	}
	return context.confirm;
}

interface ConfirmProviderProps {
	children: React.ReactNode;
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [options, setOptions] = React.useState<ConfirmOptions>({
		title: "",
		message: "",
	});
	const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

	const confirm = React.useCallback((confirmOptions: ConfirmOptions): Promise<boolean> => {
		setOptions(confirmOptions);
		setIsOpen(true);

		return new Promise<boolean>((resolve) => {
			resolveRef.current = resolve;
		});
	}, []);

	const handleConfirm = React.useCallback(() => {
		if (resolveRef.current) {
			resolveRef.current(true);
			resolveRef.current = null;
		}
		setIsOpen(false);
	}, []);

	const handleCancel = React.useCallback(() => {
		if (resolveRef.current) {
			resolveRef.current(false);
			resolveRef.current = null;
		}
		setIsOpen(false);
	}, []);

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			<ConfirmDialog
				isOpen={isOpen}
				title={options.title}
				message={options.message || ""}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</ConfirmContext.Provider>
	);
}
