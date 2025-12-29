"use client";

import { Plus, X } from "lucide-react";
import { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createProgram } from "@/app/(dashboard)/programs/program-form-button/program-form/action";

export function ProgramFormButton() {
	const [isAdding, setIsAdding] = useState(false);

	return (
		<div>
			{!isAdding && (
				<button
					onClick={() => setIsAdding(true)}
					className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 p-4 text-white transition-colors hover:bg-blue-700 active:scale-98"
				>
					<Plus className="h-5 w-5" />
					New Program
				</button>
			)}

			<AnimatePresence>
				{isAdding && (
					<motion.form
						initial={{ opacity: 0, height: 0, scale: 0.95 }}
						animate={{ opacity: 1, height: "auto", scale: 1 }}
						exit={{ opacity: 0, height: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						action={createProgram}
						className="relative space-y-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
					>
						<div className="mb-2 flex items-center justify-between">
							<h3 className="text-lg font-semibold">New Program</h3>
							<button
								type="button"
								onClick={() => setIsAdding(false)}
								className="rounded-lg p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-600 dark:text-gray-400">
								Program Name *
							</label>
							<input
								type="text"
								name="name"
								placeholder="e.g., Push Day"
								required
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
							/>
						</div>

						<div className="flex gap-3 pt-2">
							<button
								type="submit"
								className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:scale-98"
							>
								Create Program
							</button>
							<button
								type="button"
								onClick={() => setIsAdding(false)}
								className="rounded-xl bg-gray-200 px-6 py-3 text-gray-900 transition-colors hover:bg-gray-300 active:scale-98 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
							>
								Cancel
							</button>
						</div>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	);
}
