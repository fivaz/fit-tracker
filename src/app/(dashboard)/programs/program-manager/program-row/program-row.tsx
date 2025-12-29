import { Program } from "@/generated/prisma/client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgramForm } from "@/app/(dashboard)/programs/program-form-button/program-form/program-form";
import { ChevronRight, Dumbbell, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type ProgramRowProps = {
	program: Program;
};

export function ProgramRow({ program }: ProgramRowProps) {
	const [isEditing, setIsEditing] = useState(false);

	function onDelete(program: Program) {
		console.log("onDelete", program.id);
	}

	return (
		<div className="relative">
			<AnimatePresence mode="wait">
				{isEditing ? (
					<ProgramForm key="edit-form" program={program} onClose={() => setIsEditing(false)} />
				) : (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
						className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
					>
						<div className="mb-3 flex items-start justify-between gap-3">
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 font-medium text-gray-900 dark:text-white">{program.name}</h3>
								<div className="text-sm text-gray-600 dark:text-gray-500">
									{/*{program.exercises.length} exercise*/}
									{/*{program.exercises.length !== 1 ? "s" : ""}*/}1 exercise
								</div>
							</div>
							<div className="flex shrink-0 gap-1">
								<button
									onClick={() => setIsEditing(true)}
									className="rounded-lg p-2 text-blue-400 transition-colors hover:bg-blue-500/10"
								>
									<Pencil className="h-4 w-4" />
								</button>
								<button
									onClick={() => onDelete(program)}
									className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
						<Link href={`/program/${program.id}`}>
							<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-blue-400 transition-colors hover:bg-blue-500/20 active:scale-98">
								<Dumbbell className="h-4 w-4" />
								Manage Exercises
								<ChevronRight className="h-4 w-4" />
							</button>
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
