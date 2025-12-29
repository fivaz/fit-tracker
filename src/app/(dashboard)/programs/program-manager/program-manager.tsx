"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Pencil, Dumbbell, X, ChevronRight } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Program } from "@/generated/prisma/client";
import { ProgramRow } from "@/app/(dashboard)/programs/program-manager/program-row/program-row";

type ProgramManagerProps = {
	programs: Program[];
	isAdding?: boolean;
};

/* --- Main Component --- */
export function ProgramManager({ programs, isAdding }: ProgramManagerProps) {
	return (
		<>
			{/* Program List */}
			<div className="space-y-2">
				<AnimatePresence mode="popLayout">
					{programs.map((program) => (
						<ProgramRow key={program.id} program={program} />
					))}
				</AnimatePresence>

				{programs.length === 0 && !isAdding && (
					<div className="py-16 text-center">
						<Dumbbell className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-700" />
						<p className="text-gray-600 dark:text-gray-500">No programs yet</p>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-600">
							Create your first workout program
						</p>
					</div>
				)}
			</div>

			{/* Delete Confirmation Logic would be handled by the parent state */}
		</>
	);
}
