import { useState } from "react";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ProgramForm } from "@/components/program/program-form-button/program-form/program-form";
import { Button } from "@/components/ui/button";
import { buildEmptyProgram } from "@/lib/program/types";

/**
 * Renders a control that toggles between a "New Program" button and a program creation form.
 *
 * @returns A React element that displays a full-width "New Program" button when closed and the program creation form when opened.
 */
export function ProgramFormButton() {
	const [open, setOpen] = useState(false);
	const program = buildEmptyProgram();

	return (
		<div>
			{!open ? (
				<Button onClick={() => setOpen(true)} className="w-full">
					<Plus className="size-5" /> New Program
				</Button>
			) : (
				<AnimatePresence>
					<ProgramForm program={program} onClose={() => setOpen(false)} />
				</AnimatePresence>
			)}
		</div>
	);
}