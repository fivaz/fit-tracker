"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ProgramForm } from "@/components/program/program-form-button/program-form/program-form";
import { Button } from "@/components/ui/button";

export function ProgramFormButton() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{!open ? (
				<Button onClick={() => setOpen(true)} className="w-full">
					<Plus className="size-5" /> New Program
				</Button>
			) : (
				<AnimatePresence>
					<ProgramForm onClose={() => setOpen(false)} />
				</AnimatePresence>
			)}
		</div>
	);
}
