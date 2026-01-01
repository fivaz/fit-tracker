import { useState } from "react";

import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { ProgramForm } from "@/components/program/program-form-button/program-form/program-form";
import { Button } from "@/components/ui/button";
import { Program } from "@/generated/prisma/client";

export function ProgramFormButton() {
	const [open, setOpen] = useState(false);
	const program = { id: "" };

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
