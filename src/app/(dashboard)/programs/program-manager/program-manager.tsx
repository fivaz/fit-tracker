import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Pencil, Dumbbell, X, ChevronRight } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Program } from "@/generated/prisma/client";

type ProgramManagerProps = {
	programs: Program[];
};

export function ProgramManager({ programs }: ProgramManagerProps) {
	return (
		<>
			{/* Program List */}
			<div className="space-y-2">
				{programs.map((program) => (
					<motion.div
						key={program.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: -100 }}
						className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
					>
						<div className="mb-3 flex items-start justify-between gap-3">
							<div className="min-w-0 flex-1">
								<h3 className="mb-1 font-medium text-gray-900 dark:text-white">{program.name}</h3>
								{program.description && (
									<p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{program.description}</p>
								)}
								<div className="text-sm text-gray-600 dark:text-gray-500">
									{program.exercises.length} exercise{program.exercises.length !== 1 ? "s" : ""}
								</div>
							</div>
							<div className="flex flex-shrink-0 gap-1">
								<button
									onClick={() => handleEdit(program)}
									className="rounded-lg p-2 text-blue-400 transition-colors hover:bg-blue-500/10"
								>
									<Pencil className="h-4 w-4" />
								</button>
								<button
									onClick={() => handleDeleteClick(program)}
									className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						</div>
						<button
							onClick={() => onSelectProgram(program)}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500/10 px-4 py-3 text-blue-400 transition-colors hover:bg-blue-500/20 active:scale-98"
						>
							<Dumbbell className="h-4 w-4" />
							Manage Exercises
							<ChevronRight className="h-4 w-4" />
						</button>
					</motion.div>
				))}

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

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				isOpen={deleteConfirm !== null}
				title="Delete Program"
				message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
				onConfirm={confirmDelete}
				onCancel={() => setDeleteConfirm(null)}
			/>
		</>
	);
}
