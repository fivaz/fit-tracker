import { AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ConfirmDialogProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onCancel}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
					/>

					{/* Dialog */}
					<div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ type: "spring", duration: 0.3 }}
							className="pointer-events-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
						>
							<div className="mb-4 flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
									<AlertTriangle className="size-5 text-red-500" />
								</div>
								<div className="min-w-0 flex-1">
									<h3 className="mb-1 font-medium text-gray-900 dark:text-white">{title}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
								</div>
							</div>

							<div className="flex gap-3">
								<button
									onClick={onCancel}
									className="flex-1 rounded-xl bg-gray-100 px-4 py-3 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
								>
									Cancel
								</button>
								<button
									onClick={onConfirm}
									className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-white transition-colors hover:bg-red-700"
								>
									Delete
								</button>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
