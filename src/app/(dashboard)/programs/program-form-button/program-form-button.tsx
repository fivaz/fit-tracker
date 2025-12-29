"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { ProgramForm } from "@/app/(dashboard)/programs/program-form-button/program-form/program-form";

export function ProgramFormButton() {
	const [open, setOpen] = useState(false);

	return (
		<div className="mb-4">
			{!open ? (
				<button
					onClick={() => setOpen(true)}
					className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700"
				>
					<Plus className="h-5 w-5" /> New Program
				</button>
			) : (
				<AnimatePresence>
					<ProgramForm onClose={() => setOpen(false)} />
				</AnimatePresence>
			)}
		</div>
	);
}
