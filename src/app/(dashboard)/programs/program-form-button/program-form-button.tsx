"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type ProgramFormButtonProps = {};

export function ProgramFormButton({}: ProgramFormButtonProps) {
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	function handleSubmit() {
		// client-side submit (or server action)
		setIsAdding(false);
	}

	function handleCancel() {
		setIsAdding(false);
		setEditingId(null);
		setFormData({ name: "", description: "" });
	}
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

			{/* Form */}
			<AnimatePresence>
				{isAdding && (
					<motion.form
						initial={{ opacity: 0, height: 0, scale: 0.95 }}
						animate={{ opacity: 1, height: "auto", scale: 1 }}
						exit={{ opacity: 0, height: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						onSubmit={(e) => {
							e.preventDefault();
							// onSubmit();
						}}
						className="space-y-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
					>
						<div className="mb-2 flex items-center justify-between">
							<h3 className="text-lg">{editingId ? "Edit" : "New"} Program</h3>
							<button
								type="button"
								onClick={() => handleCancel()}
								className="rounded-lg p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div>
							<label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">Program Name *</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
								placeholder="e.g., Push Day"
								required
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">Description</label>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								className="min-h-24 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
								placeholder="Add notes about this program..."
							/>
						</div>

						<div className="flex gap-3 pt-2">
							<button
								type="submit"
								className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 active:scale-98"
							>
								{editingId ? "Update" : "Create"}
							</button>
							<button
								type="button"
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
