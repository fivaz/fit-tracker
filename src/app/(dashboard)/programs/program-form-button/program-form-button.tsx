"use client";

import { Plus, X } from "lucide-react";
import { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ProgramFormButtonProps {
	children: ReactNode;
}

export function ProgramFormButton({ children }: ProgramFormButtonProps) {
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
					<motion.div
						initial={{ opacity: 0, height: 0, scale: 0.95 }}
						animate={{ opacity: 1, height: "auto", scale: 1 }}
						exit={{ opacity: 0, height: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="relative overflow-hidden"
					>
						<button
							type="button"
							onClick={() => setIsAdding(false)}
							className="absolute top-0 right-0 z-10 m-2 rounded-lg p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
						>
							<X className="h-5 w-5" />
						</button>

						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
